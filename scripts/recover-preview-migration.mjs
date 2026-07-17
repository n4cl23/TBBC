import fs from 'node:fs/promises';
import {Client} from 'pg';

const migration='20260717000000_postgres_cms_foundation';
const url=process.env.DATABASE_URL_UNPOOLED;
if(!url||process.env.NEON_BRANCH_NAME!=='preview'||process.env.GITHUB_ENVIRONMENT!=='preview')throw new Error('Preview recovery guard failed.');
if(process.env.GITHUB_REF==='refs/heads/main'||process.env.PRODUCTION_DATABASE_URL)throw new Error('Production guard rejected recovery.');

const client=new Client({connectionString:url,application_name:'preview-migration-controlled-recovery'});
const requiredTables=['CanonVersion','CanonSnapshot','ChangeSet','RestoreOperation','MediaVariant'];
const emptyTables=['WorldEntity','SemanticRelation','MediaAsset','AuditLog',...requiredTables];
const requiredConstraintsAbsent=['SemanticRelation_source_fkey','SemanticRelation_target_fkey','SemanticRelation_timelineEvent_fkey','CanonSnapshot_canonVersionId_fkey','MediaVariant_mediaId_fkey'];
const requiredColumns=['AuditLog.newVersion','AuditLog.origin','AuditLog.previousVersion','AuditLog.relationId','AuditLog.requestId','MediaAsset.checksum','MediaAsset.durationMs','MediaAsset.provenance','MediaAsset.publicUrl','MediaAsset.storageKey','SemanticRelation.metadata','WorldEntity.createdBy','WorldEntity.deletedAt','WorldEntity.revision','WorldEntity.updatedBy'];

await client.connect();
try{
  const migrationRow=(await client.query('SELECT finished_at,rolled_back_at FROM "_prisma_migrations" WHERE migration_name=$1 ORDER BY started_at DESC LIMIT 1',[migration])).rows[0];
  if(!migrationRow)throw new Error('Failed migration record is absent.');
  const tables=new Set((await client.query("SELECT tablename FROM pg_catalog.pg_tables WHERE schemaname='public'")).rows.map(row=>row.tablename));
  const partialState=!migrationRow.finished_at&&!migrationRow.rolled_back_at;
  const neutralizedState=!migrationRow.finished_at&&migrationRow.rolled_back_at;
  if(!partialState&&!neutralizedState)throw new Error('Migration record does not match a recoverable Preview state.');
  for(const table of partialState?emptyTables:['WorldEntity','SemanticRelation','MediaAsset','AuditLog']){
    if(!tables.has(table))throw new Error(`Required table is absent: ${table}`);
    const count=Number((await client.query(`SELECT count(*)::int AS count FROM "${table}"`)).rows[0].count);
    if(count!==0)throw new Error(`Recovery aborted: ${table} is not empty.`);
  }
  const columns=new Set((await client.query("SELECT table_name||'.'||column_name AS key FROM information_schema.columns WHERE table_schema='public'")).rows.map(row=>row.key));
  for(const column of requiredColumns){
    if(partialState&&!columns.has(column))throw new Error(`Expected partial column is absent: ${column}`);
    if(neutralizedState&&columns.has(column))throw new Error(`Unexpected partial column remains: ${column}`);
  }
  const canonicalType=(await client.query("SELECT data_type FROM information_schema.columns WHERE table_schema='public' AND table_name='WorldEntity' AND column_name='canonicalId'")).rows[0]?.data_type;
  if(canonicalType!=='text')throw new Error('WorldEntity.canonicalId no longer matches the audited text type.');
  const constraints=new Set((await client.query("SELECT conname FROM pg_constraint c JOIN pg_namespace n ON n.oid=c.connamespace WHERE n.nspname='public'")).rows.map(row=>row.conname));
  for(const name of requiredConstraintsAbsent)if(constraints.has(name))throw new Error(`Unexpected foreign key exists: ${name}`);

  if(neutralizedState){
    for(const table of requiredTables)if(tables.has(table))throw new Error(`Unexpected partial table remains: ${table}`);
    process.stdout.write('PREVIEW_ROLLBACK=ALREADY_NEUTRALIZED\nAFFECTED_DATA_ROWS=0\n');
  }else{
    const sql=await fs.readFile('prisma/recovery/20260717000000_postgres_cms_foundation.rollback.sql','utf8');
    await client.query('BEGIN');
    try{
      await client.query(sql);
      const remaining=Number((await client.query("SELECT count(*)::int AS count FROM pg_catalog.pg_tables WHERE schemaname='public' AND tablename=ANY($1::text[])",[requiredTables])).rows[0].count);
      if(remaining!==0)throw new Error('Partial tables remain after rollback SQL.');
      await client.query('COMMIT');
    }catch(error){await client.query('ROLLBACK');throw error;}
    process.stdout.write('PREVIEW_ROLLBACK=PASSED\nAFFECTED_DATA_ROWS=0\n');
  }
}finally{await client.end();}
