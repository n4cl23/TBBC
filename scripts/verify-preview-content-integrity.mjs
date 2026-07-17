import fs from 'node:fs/promises';
import { Client } from 'pg';

const url = process.env.DATABASE_URL_UNPOOLED;
if (!url || process.env.NEON_BRANCH_NAME !== 'preview' || process.env.GITHUB_ENVIRONMENT !== 'preview') {
  throw new Error('Preview content-integrity guard failed.');
}
if (process.env.GITHUB_REF === 'refs/heads/main' || process.env.PRODUCTION_DATABASE_URL) {
  throw new Error('Production guard rejected content-integrity checks.');
}

const client = new Client({ connectionString: url, application_name: 'preview-content-integrity' });
const scalar = async (sql) => Number((await client.query(sql)).rows[0].count);
await client.connect();
try {
  const checks = {
    orphanRelations: await scalar('SELECT count(*)::int AS count FROM "SemanticRelation" sr LEFT JOIN "WorldEntity" src ON src."canonicalId" = sr.source LEFT JOIN "WorldEntity" tgt ON tgt."canonicalId" = sr.target WHERE src.id IS NULL OR tgt.id IS NULL'),
    prohibitedLoops: await scalar('SELECT count(*)::int AS count FROM "SemanticRelation" WHERE source = target'),
    duplicateSlugs: await scalar('SELECT count(*)::int AS count FROM (SELECT type, slug FROM "WorldEntity" GROUP BY type, slug HAVING count(*) > 1) duplicates'),
    brokenMedia: await scalar("SELECT count(*)::int AS count FROM \"MediaAsset\" WHERE btrim(src) = '' OR btrim(\"publicUrl\") = '' OR btrim(\"storageKey\") = '' OR btrim(checksum) = ''"),
    orphanTranslations: await scalar('SELECT count(*)::int AS count FROM "ContentTranslation" translation LEFT JOIN "WorldEntity" entity ON entity.id = translation."entityId" WHERE entity.id IS NULL'),
    duplicateTranslations: await scalar('SELECT count(*)::int AS count FROM (SELECT "entityId", locale FROM "ContentTranslation" GROUP BY "entityId", locale HAVING count(*) > 1) duplicates'),
    invalidTaxonomies: await scalar("SELECT count(*)::int AS count FROM \"EntityRole\" role LEFT JOIN \"WorldEntity\" entity ON entity.id = role.\"entityId\" WHERE entity.id IS NULL OR btrim(role.role) = ''"),
  };
  const failures = Object.entries(checks).filter(([, count]) => count !== 0);
  const report = [
    '# Preview Database Gate — content integrity',
    '',
    'Scope: Preview only. No Production access and no secrets recorded.',
    '',
    '| Check | Failures |',
    '| --- | ---: |',
    ...Object.entries(checks).map(([name, count]) => `| ${name} | ${count} |`),
    '',
    `Result: **${failures.length ? 'FAILED' : 'PASSED'}**`,
  ].join('\n');
  await fs.writeFile('reports/preview-database-gate-integrity.md', `${report}\n`, 'utf8');
  if (failures.length) throw new Error(`Preview content integrity failed: ${failures.map(([name]) => name).join(', ')}`);
  process.stdout.write('PREVIEW_CONTENT_INTEGRITY=PASSED\n');
} finally {
  await client.end();
}
