import { createHash } from 'node:crypto';
import { createReadStream } from 'node:fs';
import {
  copyFile,
  mkdir,
  open,
  readdir,
  stat,
  writeFile,
} from 'node:fs/promises';
import path from 'node:path';
import {
  classifyCreatureAsset,
  destinationFor,
  duplicateChecksums,
  normalizeAssetName,
  suggestedCreature,
  type ScannedAsset,
} from '../src/lib/bestiary-import.ts';

const knownSlugs = [
  'ice-wolves', 'frost-troll', 'crystal-bear', 'frost-drake', 'snow-wraith', 'frost-mammoth', 'ice-giant',
  'tempest-hawk', 'storm-griffin', 'lightning-serpent', 'thunder-golem', 'sky-whale', 'storm-dragon',
  'iron-golem', 'cave-troll', 'forge-beast', 'stone-giant', 'lava-drake',
  'ent', 'dryad', 'ancient-wolf', 'forest-spirit', 'moss-colossus', 'treant-elder',
  'kraken', 'sea-serpent', 'leviathan', 'deep-horror', 'coral-titan',
  'fire-drake', 'ash-demon', 'sand-worm', 'phoenix', 'magma-titan',
];

const realmAliases: Record<string, string> = {
  'frost-kingdom': 'frost-kingdom',
  stormreach: 'stormreach',
  ironhold: 'ironhold',
  'elder-forest': 'elder-forest',
  abyss: 'kingdom-of-the-abyss',
  'kingdom-of-the-abyss': 'kingdom-of-the-abyss',
  'scorched-wastes': 'scorched-wastes',
};

function argument(name: string) {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : undefined;
}

async function walk(root: string): Promise<string[]> {
  const result: string[] = [];
  for (const entry of await readdir(root, { withFileTypes: true })) {
    const target = path.join(root, entry.name);
    if (entry.isDirectory()) result.push(...(await walk(target)));
    else if (entry.isFile()) result.push(target);
  }
  return result;
}

function hashFile(filename: string) {
  return new Promise<string>((resolve, reject) => {
    const hash = createHash('sha256');
    createReadStream(filename)
      .on('error', reject)
      .on('data', (chunk) => hash.update(chunk))
      .on('end', () => resolve(hash.digest('hex')));
  });
}

async function validateFile(filename: string, extension: string, size: number) {
  const handle = await open(filename, 'r');
  try {
    const header = Buffer.alloc(Math.min(84, size));
    await handle.read(header, 0, header.length, 0);
    if (extension === '.png') {
      const valid = header.subarray(1, 4).toString('ascii') === 'PNG';
      return { valid, notes: valid && header.length >= 24 ? [`${header.readUInt32BE(16)}x${header.readUInt32BE(20)}`] : [] };
    }
    if (extension === '.glb') {
      const declared = header.length >= 12 ? header.readUInt32LE(8) : 0;
      const valid = header.subarray(0, 4).toString('ascii') === 'glTF' && header.readUInt32LE(4) === 2 && declared === size;
      return { valid, notes: [`GLB2 declared=${declared}`] };
    }
    if (extension === '.stl') {
      const triangles = header.length >= 84 ? header.readUInt32LE(80) : 0;
      const valid = 84 + triangles * 50 === size;
      return { valid, notes: [`binary triangles=${triangles}`] };
    }
    if (extension === '.mp4') {
      const valid = header.subarray(4, 8).toString('ascii') === 'ftyp';
      return { valid, notes: ['MP4 ftyp'] };
    }
    return { valid: true, notes: [] as string[] };
  } finally {
    await handle.close();
  }
}

async function scan(source: string) {
  const files = await walk(source), results: ScannedAsset[] = [];
  for (const filename of files.toSorted()) {
    const metadata = await stat(filename), relativePath = path.relative(source, filename), parts = relativePath.split(path.sep);
    const extension = path.extname(filename).toLowerCase(), creatureSlug = suggestedCreature(parts, knownSlugs);
    const top = normalizeAssetName(parts[0] || ''), realmSlug = realmAliases[top];
    const validation = await validateFile(filename, extension, metadata.size);
    const notes = [...validation.notes];
    if (!creatureSlug) notes.push('unrecognized-creature');
    if (!realmSlug) notes.push('outside-bestiary-taxonomy');
    results.push({
      sourcePath: filename,
      relativePath,
      filename: path.basename(filename),
      extension,
      sizeBytes: metadata.size,
      checksum: await hashFile(filename),
      creatureSlug,
      realmSlug,
      type: classifyCreatureAsset(extension),
      valid: validation.valid,
      notes,
    });
  }
  return results;
}

async function applyImport(source: string, destination: string, items: ScannedAsset[]) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const planned = items.map((item) => ({ ...item, destination: destinationFor(item) }));
  const manifest = { version: 1, mode: 'apply', createdAt: new Date().toISOString(), source, destination, items: planned };
  await mkdir(destination, { recursive: true });
  const manifestPath = path.join(destination, `bestiary-import-manifest-${timestamp}.json`);
  await writeFile(manifestPath, JSON.stringify(manifest, null, 2), { encoding: 'utf8', flag: 'wx' });
  for (const item of planned) {
    if (!item.destination || !item.creatureSlug) continue;
    const target = path.resolve(destination, item.destination);
    if (!target.startsWith(path.resolve(destination) + path.sep)) throw new Error(`Unsafe destination: ${target}`);
    await mkdir(path.dirname(target), { recursive: true });
    await copyFile(item.sourcePath, target, 1 /* COPYFILE_EXCL */);
  }
  return manifestPath;
}

async function main() {
  const source = argument('--source'), apply = process.argv.includes('--apply'), dryRun = process.argv.includes('--dry-run') || !apply;
  if (!source) throw new Error('Use --source "<folder>".');
  const root = path.resolve(source), items = await scan(root), duplicates = duplicateChecksums(items);
  const identified = items.filter((item) => item.creatureSlug).length;
  const summary = {
    mode: dryRun ? 'dry-run' : 'apply',
    source: root,
    files: items.length,
    bytes: items.reduce((total, item) => total + item.sizeBytes, 0),
    valid: items.filter((item) => item.valid).length,
    invalid: items.filter((item) => !item.valid).length,
    identified,
    unidentified: items.length - identified,
    duplicateGroups: duplicates.length,
    creatures: new Set(items.map((item) => item.creatureSlug).filter(Boolean)).size,
  };
  console.log(JSON.stringify(summary, null, 2));
  for (const item of items) console.log(`${item.valid ? 'OK' : 'INVALID'}\t${item.creatureSlug || 'UNMATCHED'}\t${item.checksum.slice(0, 12)}\t${item.relativePath}`);
  if (dryRun) return;
  const destination = argument('--destination');
  if (!destination) throw new Error('--apply requires --destination. Existing files are never overwritten.');
  console.log(`Manifest: ${await applyImport(root, path.resolve(destination), items)}`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
