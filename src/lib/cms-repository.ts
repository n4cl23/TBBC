import 'server-only';
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import {
  characters,
  collections,
  guardians,
  realms,
  crowns,
  weapons,
  timeline,
  gallery,
  news,
  marketplaces,
  marketplaceListings,
  creatureCmsSeeds,
  canonAliases,
  canonEvents,
  officialBossEncounters,
  officialFactions,
  officialGuilds,
  getCanonEntity,
} from '@/data/canon-registry';
import {artBibleSeeds, printGuideSeeds, withEditorialTranslations} from '@/data/editorial-translations';
import {semanticRelations} from '@/lib/semantic-graph';
import {prisma} from '@/lib/prisma';
import type {SemanticRelation as DatabaseSemanticRelation,SemanticRelationVersion as DatabaseSemanticRelationVersion} from '@prisma/client';
import type {
  AuditEntry,
  CmsDatabase,
  CmsEntityType,
  CmsRecord,
  PublicationStatus,
} from '@/types/cms';
const dbPath = path.join(process.cwd(), 'src', 'data', 'cms.json');
const seeds: Partial<Record<CmsEntityType, unknown[]>> = {
  characters,
  collections,
  guardians,
  realms,
  crowns,
  weapons,
  timeline,
  gallery,
  news,
  marketplaces,
  marketplaceListings,
  creatures: creatureCmsSeeds,
  events: canonEvents,
  factions: [...officialFactions],
  guilds: [...officialGuilds],
  bossEncounters: [...officialBossEncounters],
  canonAliases,
  semanticRelations,
  artBible: artBibleSeeds,
  printGuide: printGuideSeeds,
};
async function readDb(): Promise<CmsDatabase> {
  try {
    return JSON.parse(await readFile(dbPath, 'utf8')) as CmsDatabase;
  } catch {
    return { records: [], versions: [], audit: [] };
  }
}
async function writeDb(db: CmsDatabase) {
  await writeFile(dbPath, JSON.stringify(db, null, 2), 'utf8');
}
function baseRecords(entity: CmsEntityType): CmsRecord[] {
  const now = new Date().toISOString();
  return (seeds[entity] || []).map((item) => {
    const raw = item as Record<string, unknown>,
      data = withEditorialTranslations(entity, raw),
      slug = String(data.slug || data.id);
    return {
      id: getCanonEntity(canonKind(entity), slug)?.canonicalId || `seed:${entity}:${slug}`,
      entity,
      slug,
      canonicalSlug: slug,
      canonStatus: String(raw.status || '') === 'canonical' ? 'canonical' : 'review',
      data,
      status: 'published',
      version: 1,
      createdAt: now,
      updatedAt: now,
      publishedAt: now,
    };
  });
}
function canonKind(entity: CmsEntityType) {
  if (entity === 'realms') return 'realm' as const;
  if (entity === 'guardians' || entity === 'characters') return 'character' as const;
  if (entity === 'creatures') return 'creature' as const;
  if (entity === 'crowns' || entity === 'weapons') return 'artifact' as const;
  if (entity === 'events' || entity === 'timeline') return 'event' as const;
  if (entity === 'factions' || entity === 'guilds') return 'faction' as const;
  if (entity === 'collections') return 'collection' as const;
  return 'collection' as const;
}
export async function listCmsRecords(entity: CmsEntityType) {
  if(entity==='semanticRelations'){
    const stored=await prisma.semanticRelation.findMany({orderBy:{updatedAt:'desc'}});
    const overrides=stored.map((item:DatabaseSemanticRelation):CmsRecord=>({id:item.id,entity,slug:`${item.source}-${item.relationType.toLowerCase()}-${item.target}`,canonicalSlug:undefined,canonStatus:item.status,data:{source:item.source,target:item.target,relationType:item.relationType,weight:item.weight,description:item.description,status:item.status,timelineEvent:item.timelineEvent,startEra:item.startEra,endEra:item.endEra,importance:item.importance,canonical:item.canonical,aliases:item.aliases},status:item.publicationStatus,version:item.version,createdAt:item.createdAt.toISOString(),updatedAt:item.updatedAt.toISOString(),publishedAt:item.publicationStatus==='published'?item.updatedAt.toISOString():undefined}));
    const keys=new Set(overrides.map((record)=>`${record.data.source}:${record.data.relationType}:${record.data.target}`));
    return [...baseRecords(entity).filter((record)=>!keys.has(`${record.data.source}:${record.data.relationType}:${record.data.target}`)),...overrides];
  }
  const db = await readDb(),
    overrides = db.records.filter((x) => x.entity === entity),
    overrideSlugs = new Set(overrides.map((x) => x.slug));
  return [
    ...baseRecords(entity).filter((x) => !overrideSlugs.has(x.slug)),
    ...overrides,
  ];
}
export async function getCmsRecord(entity: CmsEntityType, id: string) {
  return (await listCmsRecords(entity)).find(
    (x) => x.id === id || x.slug === id,
  );
}
function diff(before: Record<string, unknown>, after: Record<string, unknown>) {
  return [...new Set([...Object.keys(before), ...Object.keys(after)])]
    .filter((k) => JSON.stringify(before[k]) !== JSON.stringify(after[k]))
    .map((field) => ({ field, before: before[field], after: after[field] }));
}
async function audit(
  db: CmsDatabase,
  entry: Omit<AuditEntry, 'id' | 'timestamp'>,
) {
  db.audit.unshift({
    ...entry,
    id: crypto.randomUUID(),
    timestamp: new Date().toISOString(),
  });
}
export async function saveCmsRecord(
  entity: CmsEntityType,
  input: {
    id?: string;
    slug: string;
    data: Record<string, unknown>;
    status: PublicationStatus;
  },
  context: { actor: string; ip: string; operation?: AuditEntry['operation'] },
) {
  if(entity==='semanticRelations'){
    const data=input.data,source=String(data.source),target=String(data.target),relationType=String(data.relationType),existing=await prisma.semanticRelation.findUnique({where:{source_target_relationType:{source,target,relationType}}}),version=(existing?.version||0)+1;
    const saved=await prisma.$transaction(async(transaction)=>{const relation=await transaction.semanticRelation.upsert({where:{source_target_relationType:{source,target,relationType}},create:{source,target,relationType,weight:Number(data.weight),description:String(data.description||''),status:String(data.status||'review') as 'draft'|'review'|'canonical'|'retconned'|'archived',timelineEvent:data.timelineEvent?String(data.timelineEvent):null,startEra:data.startEra?String(data.startEra):null,endEra:data.endEra?String(data.endEra):null,importance:String(data.importance||'supporting') as 'contextual'|'supporting'|'major'|'critical',canonical:Boolean(data.canonical),aliases:Array.isArray(data.aliases)?data.aliases.map(String):[],publicationStatus:input.status,version},update:{weight:Number(data.weight),description:String(data.description||''),status:String(data.status||'review') as 'draft'|'review'|'canonical'|'retconned'|'archived',timelineEvent:data.timelineEvent?String(data.timelineEvent):null,startEra:data.startEra?String(data.startEra):null,endEra:data.endEra?String(data.endEra):null,importance:String(data.importance||'supporting') as 'contextual'|'supporting'|'major'|'critical',canonical:Boolean(data.canonical),aliases:Array.isArray(data.aliases)?data.aliases.map(String):[],publicationStatus:input.status,version}});await transaction.semanticRelationVersion.create({data:{relationId:relation.id,version,data:JSON.parse(JSON.stringify(data)),status:input.status,actor:context.actor}});return relation});
    return {id:saved.id,entity,slug:input.slug,data,status:saved.publicationStatus,canonStatus:saved.status,version:saved.version,createdAt:saved.createdAt.toISOString(),updatedAt:saved.updatedAt.toISOString()} as CmsRecord;
  }
  const db = await readDb(),
    existing = input.id
      ? await getCmsRecord(entity, input.id)
      : await getCmsRecord(entity, input.slug),
    now = new Date().toISOString(),
    record: CmsRecord = {
      id: existing?.id.startsWith('seed:')
        ? crypto.randomUUID()
        : existing?.id || crypto.randomUUID(),
      entity,
      slug: input.slug,
      canonicalSlug: input.slug,
      canonStatus: (input.data.canonStatus as CmsRecord['canonStatus']) || existing?.canonStatus || 'review',
      data: input.data,
      status: input.status,
      version: (existing?.version || 0) + 1,
      createdAt: existing?.createdAt || now,
      updatedAt: now,
      publishedAt: input.status === 'published' ? now : existing?.publishedAt,
    };
  db.records = db.records.filter(
    (x) =>
      x.id !== record.id && !(x.entity === entity && x.slug === record.slug),
  );
  db.records.push(record);
  db.versions.push({
    id: crypto.randomUUID(),
    recordId: record.id,
    entity,
    version: record.version,
    data: record.data,
    status: record.status,
    createdAt: now,
    actor: context.actor,
  });
  await audit(db, {
    actor: context.actor,
    ip: context.ip,
    entity,
    recordId: record.id,
    operation: context.operation || (existing ? 'update' : 'create'),
    changes: diff(existing?.data || {}, record.data),
  });
  await writeDb(db);
  return record;
}
export async function deleteCmsRecord(
  entity: CmsEntityType,
  id: string,
  context: { actor: string; ip: string },
) {
  if(entity==='semanticRelations'){await prisma.semanticRelation.delete({where:{id}});return;}
  const db = await readDb(),
    existing = await getCmsRecord(entity, id);
  if (!existing) throw new Error('Registro não encontrado.');
  db.records = db.records.filter((x) => x.id !== existing.id);
  await audit(db, {
    ...context,
    entity,
    recordId: existing.id,
    operation: 'delete',
    changes: [{ field: 'record', before: existing.data, after: null }],
  });
  await writeDb(db);
}
export async function duplicateCmsRecord(
  entity: CmsEntityType,
  id: string,
  context: { actor: string; ip: string },
) {
  const source = await getCmsRecord(entity, id);
  if (!source) throw new Error('Registro não encontrado.');
  return saveCmsRecord(
    entity,
    {
      slug: `${source.slug}-copia-${Date.now().toString().slice(-5)}`,
      data: {
        ...source.data,
        name: `${String(source.data.name || source.slug)} — Cópia`,
      },
      status: 'draft',
    },
    { ...context, operation: 'duplicate' },
  );
}
export async function listAudit() {
  return (await readDb()).audit;
}
export async function listVersions(entity: CmsEntityType, id: string) {
  if(entity==='semanticRelations'){return (await prisma.semanticRelationVersion.findMany({where:{relationId:id},orderBy:{version:'desc'}})).map((item:DatabaseSemanticRelationVersion)=>({id:item.id,recordId:item.relationId,entity,version:item.version,data:item.data as Record<string,unknown>,status:item.status,createdAt:item.createdAt.toISOString(),actor:item.actor}));}
  const record = await getCmsRecord(entity, id);
  if (!record) return [];
  return (await readDb()).versions
    .filter((x) => x.entity === entity && x.recordId === record.id)
    .sort((a, b) => b.version - a.version);
}
export async function restoreVersion(
  entity: CmsEntityType,
  id: string,
  versionId: string,
  context: { actor: string; ip: string },
) {
  if(entity==='semanticRelations'){
    const version=await prisma.semanticRelationVersion.findUnique({where:{id:versionId}}),record=await prisma.semanticRelation.findUnique({where:{id}});
    if(!version||!record)throw new Error('Versão não encontrada.');
    return saveCmsRecord(entity,{id,slug:`${record.source}-${record.relationType.toLowerCase()}-${record.target}`,data:version.data as Record<string,unknown>,status:version.status},{...context,operation:'restore'});
  }
  const db = await readDb(),
    version = db.versions.find(
      (x) => x.id === versionId && x.entity === entity,
    ),
    record = await getCmsRecord(entity, id);
  if (!version || !record) throw new Error('Versão não encontrada.');
  return saveCmsRecord(
    entity,
    {
      id: record.id,
      slug: record.slug,
      data: version.data,
      status: version.status,
    },
    { ...context, operation: 'restore' },
  );
}
