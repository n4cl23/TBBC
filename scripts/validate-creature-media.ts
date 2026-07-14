import { createHash } from 'node:crypto';
import { mkdir, readFile, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

type SourceManifest = { creatures: Array<{ slug: string; sourceFilename: string; sourceSha256: string; outputs: string[] }> };
const root = process.cwd();
const sha = (buffer: Buffer) => createHash('sha256').update(buffer).digest('hex');

async function main() {
  const source = JSON.parse(await readFile(path.join(root, 'reports', 'creature-media-source-manifest.json'), 'utf8')) as SourceManifest;
  const rows: Array<Record<string, unknown>> = [], errors: string[] = [], warnings: string[] = [], heroHashes = new Map<string, string>();
  for (const creature of source.creatures) {
    const assets: Array<Record<string, unknown>> = [];
    const expectedAltText = path.basename(creature.sourceFilename, path.extname(creature.sourceFilename)).trim();
    if (!expectedAltText) errors.push(`${creature.slug}: missing alt-text source`);
    for (const url of creature.outputs) {
      const file = path.join(root, 'public', ...url.split('/').filter(Boolean)), role = path.basename(file, '.webp');
      try {
        const [buffer, info, fileStat] = await Promise.all([readFile(file), sharp(file).metadata(), stat(file)]);
        const digest = sha(buffer);
        if (fileStat.size === 0 || info.format !== 'webp' || !info.width || !info.height) errors.push(`${creature.slug}/${role}: invalid WebP`);
        if (!url.includes(`/${creature.slug}/`)) errors.push(`${creature.slug}/${role}: path does not match slug`);
        if (role === 'hero') { const owner = heroHashes.get(digest); if (owner) errors.push(`${creature.slug}: hero duplicates ${owner}`); heroHashes.set(digest, creature.slug); }
        assets.push({ role, url, bytes: fileStat.size, width: info.width, height: info.height, sha256: digest, valid: true });
      } catch { errors.push(`${creature.slug}/${role}: missing or unreadable`); assets.push({ role, url, valid: false }); }
    }
    warnings.push(`${creature.slug}: no validated public GLB; honest preparation state required`);
    rows.push({ slug: creature.slug, sourceFilename: creature.sourceFilename, sourceSha256: creature.sourceSha256, expectedAltText, assets, galleryPublished: 1, publicGlb: false, status: 'image-ready' });
  }
  if (source.creatures.length !== 34) errors.push(`expected 34 creatures, found ${source.creatures.length}`);
  const report = { valid: errors.length === 0, expected: 34, checked: source.creatures.length, uniqueHeroes: heroHashes.size, errors, warnings, creatures: rows };
  await mkdir(path.join(root, 'reports'), { recursive: true });
  await mkdir(path.join(root, 'docs'), { recursive: true });
  await writeFile(path.join(root, 'reports', 'creature-media-validation.json'), `${JSON.stringify(report, null, 2)}\n`);
  const table = rows.map((row) => `| ${row.slug} | hero/card/thumbnail | 1 painted render | preparation | image-ready |`).join('\n');
  await writeFile(path.join(root, 'reports', 'creature-media-validation.md'), `# Creature media validation\n\n- Checked: ${source.creatures.length}/34\n- Unique hero files: ${heroHashes.size}/34\n- Errors: ${errors.length}\n- Public GLBs: 0 (honest preparation state)\n\n| Creature | Public images | Gallery | 3D | Status |\n|---|---|---|---|---|\n${table}\n`);
  await writeFile(path.join(root, 'docs', 'creature-media-audit.md'), `# Creature media audit\n\nBefore this correction, all 34 records used the shared \`/images/bestiary/beasts-hero.webp\`. The preserved 1024×1024 PNG masters were matched by normalized filename and converted to optimized, slug-scoped WebP derivatives. No master was overwritten.\n\n## Publication policy\n\n- Hero, card and thumbnail must be readable WebP files under the creature slug.\n- A realm placeholder is allowed only with an explicit “art in preparation” badge.\n- A gallery reflects its real item count; a single render is never duplicated to simulate a set.\n- A 3D viewer requires a published \`.glb\`, MIME \`model/gltf-binary\` and non-zero size. Source-only masters remain private.\n\n| Creature | Before | Current derivatives | Gallery | Public GLB | Priority |\n|---|---|---|---|---|---|\n${rows.map((row) => `| ${row.slug} | Shared generic hero | hero/card/thumbnail | 1 | No | GLB optimization |`).join('\n')}\n`);
  console.log(`Validated ${source.creatures.length} creature records: ${errors.length} errors, ${warnings.length} expected GLB warnings.`);
  if (errors.length) process.exitCode = 1;
}
main().catch((error) => { console.error(error); process.exitCode = 1; });
