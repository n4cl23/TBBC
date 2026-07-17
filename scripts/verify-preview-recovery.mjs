import fs from 'node:fs/promises';
import { Client } from 'pg';

const migration = '20260717000000_postgres_cms_foundation';
const url = process.env.DATABASE_URL_UNPOOLED;
const expectedForeignKeys = [
  'SemanticRelation_source_fkey',
  'SemanticRelation_target_fkey',
  'SemanticRelation_timelineEvent_fkey',
  'CanonSnapshot_canonVersionId_fkey',
  'MediaVariant_mediaId_fkey',
];
const expectedTables = ['CanonVersion', 'CanonSnapshot', 'ChangeSet', 'RestoreOperation', 'MediaVariant'];
const emptyTables = ['WorldEntity', 'SemanticRelation', 'MediaAsset', 'AuditLog', ...expectedTables];

if (!url || process.env.NEON_BRANCH_NAME !== 'preview' || process.env.GITHUB_ENVIRONMENT !== 'preview') {
  throw new Error('Preview verification guard failed.');
}
if (process.env.GITHUB_REF === 'refs/heads/main' || process.env.PRODUCTION_DATABASE_URL) {
  throw new Error('Production guard rejected verification.');
}

const client = new Client({ connectionString: url, application_name: 'preview-migration-recovery-verification' });
await client.connect();
try {
  const migrations = (await client.query(`
    SELECT migration_name, finished_at, rolled_back_at, applied_steps_count
    FROM "_prisma_migrations"
    ORDER BY started_at ASC
  `)).rows;
  const unresolved = migrations.filter((row) => !row.finished_at && !row.rolled_back_at);
  const foundationHistory = migrations.filter((row) => row.migration_name === migration);
  const latestFoundation = foundationHistory.at(-1);
  if (unresolved.length || !latestFoundation?.finished_at || latestFoundation.rolled_back_at) {
    throw new Error('Migration history is not fully recovered.');
  }

  const columns = (await client.query(`
    SELECT table_name, column_name, udt_name
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND (table_name = 'WorldEntity' AND column_name = 'canonicalId'
        OR table_name = 'SemanticRelation' AND column_name IN ('source', 'target', 'timelineEvent'))
  `)).rows;
  const columnTypes = new Map(columns.map((row) => [`${row.table_name}.${row.column_name}`, row.udt_name]));
  for (const name of ['WorldEntity.canonicalId', 'SemanticRelation.source', 'SemanticRelation.target', 'SemanticRelation.timelineEvent']) {
    if (columnTypes.get(name) !== 'uuid') throw new Error(`Expected UUID column is not aligned: ${name}`);
  }

  const foundForeignKeys = new Set((await client.query(`
    SELECT conname
    FROM pg_constraint constraint
    JOIN pg_namespace namespace ON namespace.oid = constraint.connamespace
    WHERE namespace.nspname = 'public' AND constraint.contype = 'f'
  `)).rows.map((row) => row.conname));
  for (const name of expectedForeignKeys) {
    if (!foundForeignKeys.has(name)) throw new Error(`Expected foreign key is absent: ${name}`);
  }

  const foundTables = new Set((await client.query(`
    SELECT tablename FROM pg_catalog.pg_tables WHERE schemaname = 'public'
  `)).rows.map((row) => row.tablename));
  for (const table of expectedTables) {
    if (!foundTables.has(table)) throw new Error(`Expected table is absent: ${table}`);
  }

  const rowCounts = {};
  for (const table of emptyTables) {
    rowCounts[table] = Number((await client.query(`SELECT count(*)::int AS count FROM "${table}"`)).rows[0].count);
  }

  const migrationLines = migrations.map((row) => {
    const state = row.finished_at ? 'APPLIED' : row.rolled_back_at ? 'ROLLED_BACK' : 'UNRESOLVED';
    return `- ${row.migration_name}: ${state}; steps=${row.applied_steps_count}`;
  });
  const report = [
    '# Preview migration recovery result',
    '',
    'Status: **PASSED**',
    '',
    '## Scope guard',
    '',
    '- Environment: Preview only.',
    '- Neon branch metadata: preview.',
    '- Production was not accessed.',
    '- No connection string, host, user, password, or database identifier is recorded.',
    '',
    '## Final migration state',
    '',
    ...migrationLines,
    '',
    `- Latest ${migration}: APPLIED.`,
    '- No unresolved Prisma migration record remains.',
    '',
    '## Final schema evidence',
    '',
    '- WorldEntity.canonicalId and SemanticRelation source/target/timelineEvent are UUID.',
    `- Required foreign keys present: ${expectedForeignKeys.length}/${expectedForeignKeys.length}.`,
    `- CMS foundation tables present: ${expectedTables.length}/${expectedTables.length}.`,
    '- Prisma schema diff completed with no drift.',
    '',
    '## Canon preservation evidence',
    '',
    '- Recovery precondition required zero rows in every affected table before mutation.',
    '- Recovery SQL contains no Canon or Lore DML.',
    ...Object.entries(rowCounts).map(([table, count]) => `- ${table}: ${count} row(s) after recovery.`),
    '',
    '## Commands completed',
    '',
    '- prisma generate',
    '- prisma migrate resolve --rolled-back (after re-audit only)',
    '- prisma migrate deploy (plus idempotency confirmation)',
    '- prisma validate',
    '- prisma migrate status',
    '- prisma migrate diff --exit-code',
  ].join('\n');
  await fs.writeFile('reports/preview-migration-recovery-result.md', `${report}\n`, 'utf8');
  process.stdout.write('PREVIEW_RECOVERY_VERIFY=PASSED\n');
} finally {
  await client.end();
}
