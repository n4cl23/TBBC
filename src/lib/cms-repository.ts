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
} from '@/data/content';
import {marketplaces, marketplaceListings} from '@/data/marketplaces';
import {artBibleSeeds, printGuideSeeds, withEditorialTranslations} from '@/data/editorial-translations';
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
      id: `seed:${entity}:${slug}`,
      entity,
      slug,
      data,
      status: 'published',
      version: 1,
      createdAt: now,
      updatedAt: now,
      publishedAt: now,
    };
  });
}
export async function listCmsRecords(entity: CmsEntityType) {
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
