import { createHash } from 'node:crypto';
import { readdir, mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const creatureSlugs = [
  'ice-wolves', 'frost-troll', 'crystal-bear', 'frost-drake', 'snow-wraith', 'frost-mammoth', 'ice-giant',
  'tempest-hawk', 'storm-griffin', 'lightning-serpent', 'thunder-golem', 'sky-whale', 'storm-dragon',
  'iron-golem', 'cave-troll', 'forge-beast', 'stone-giant', 'lava-drake',
  'ent', 'dryad', 'ancient-wolf', 'forest-spirit', 'moss-colossus', 'treant-elder',
  'kraken', 'sea-serpent', 'leviathan', 'deep-horror', 'coral-titan',
  'fire-drake', 'ash-demon', 'sand-worm', 'phoenix', 'magma-titan',
] as const;
const placeholderNames = ['frost-kingdom', 'stormreach', 'ironhold', 'elder-forest', 'abyss', 'scorched-wastes'] as const;

function argument(name: string) { const index = process.argv.indexOf(name); return index >= 0 ? process.argv[index + 1] : undefined; }
function normalize(value: string) { return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/\.[^.]+$/, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); }
async function files(root: string): Promise<string[]> { const entries = await readdir(root, { withFileTypes: true }); return (await Promise.all(entries.map((entry) => entry.isDirectory() ? files(path.join(root, entry.name)) : [path.join(root, entry.name)]))).flat(); }

async function main() {
  const source = argument('--source'), placeholders = argument('--placeholders');
  if (!source || !placeholders) throw new Error('Use --source <folder> --placeholders <folder>.');
  const pngs = (await files(path.resolve(source))).filter((file) => path.extname(file).toLowerCase() === '.png');
  const manifest: Array<Record<string, unknown>> = [];
  for (const slug of creatureSlugs) {
    const matches = pngs.filter((file) => normalize(path.basename(file)) === slug);
    if (matches.length !== 1) throw new Error(`${slug}: expected one PNG, found ${matches.length}.`);
    const sourceFile = matches[0], buffer = await readFile(sourceFile), metadata = await sharp(buffer).metadata();
    const destination = path.join(process.cwd(), 'public', 'images', 'creatures', slug);
    await mkdir(destination, { recursive: true });
    await Promise.all([
      sharp(buffer).resize(1200, 1200, { fit: 'inside', withoutEnlargement: true }).webp({ quality: 88, effort: 5 }).toFile(path.join(destination, 'hero.webp')),
      sharp(buffer).resize(720, 720, { fit: 'cover' }).webp({ quality: 82, effort: 5 }).toFile(path.join(destination, 'card.webp')),
      sharp(buffer).resize(320, 320, { fit: 'cover' }).webp({ quality: 78, effort: 5 }).toFile(path.join(destination, 'thumbnail.webp')),
    ]);
    manifest.push({ slug, sourceFilename: path.basename(sourceFile), sourceSha256: createHash('sha256').update(buffer).digest('hex'), width: metadata.width, height: metadata.height, outputs: [`/images/creatures/${slug}/hero.webp`, `/images/creatures/${slug}/card.webp`, `/images/creatures/${slug}/thumbnail.webp`] });
  }
  const placeholderOut = path.join(process.cwd(), 'public', 'placeholders', 'creatures');
  await mkdir(placeholderOut, { recursive: true });
  for (const name of placeholderNames) await sharp(path.join(path.resolve(placeholders), `${name}.png`)).resize(1024, 1024, { fit: 'cover' }).webp({ quality: 82, effort: 5 }).toFile(path.join(placeholderOut, `${name}.webp`));
  const reports = path.join(process.cwd(), 'reports');
  await mkdir(reports, { recursive: true });
  await writeFile(path.join(reports, 'creature-media-source-manifest.json'), `${JSON.stringify({ generatedAt: new Date().toISOString(), source: 'external-preserved-master', creatures: manifest }, null, 2)}\n`);
  console.log(`Prepared ${manifest.length} creature media sets and ${placeholderNames.length} realm placeholders.`);
}
main().catch((error) => { console.error(error); process.exitCode = 1; });
