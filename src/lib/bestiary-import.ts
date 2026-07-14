import type { CreatureAssetType } from '@/types/creature';

const aliases: Record<string, string> = {
  mammoth: 'frost-mammoth',
  'frost-mammoth': 'frost-mammoth',
  abyss: 'kingdom-of-the-abyss',
};

export function normalizeAssetName(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[—–]/g, '-')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-+/g, '-');
}

export function suggestedCreature(pathParts: string[], knownSlugs: string[]) {
  const candidates = pathParts
    .flatMap((part) => [normalizeAssetName(part), normalizeAssetName(part.replace(/\.[^.]+$/, ''))])
    .map((candidate) => aliases[candidate] || candidate);
  return knownSlugs.find((slug) => candidates.includes(slug));
}

export function classifyCreatureAsset(extension: string): CreatureAssetType | undefined {
  const ext = extension.toLowerCase();
  if (ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.webp') return 'painted-render';
  if (ext === '.stl') return 'STL';
  if (ext === '.obj') return 'OBJ';
  if (ext === '.mtl') return 'MTL';
  if (ext === '.glb') return 'GLB';
  if (ext === '.gltf') return 'GLTF';
  if (ext === '.lys' || ext === '.lychee') return 'LYS';
  if (ext === '.mp4' || ext === '.webm' || ext === '.mov') return 'video';
  if (ext === '.pdf') return 'assembly-guide';
  return undefined;
}

export type ScannedAsset = {
  sourcePath: string;
  relativePath: string;
  filename: string;
  extension: string;
  sizeBytes: number;
  checksum: string;
  creatureSlug?: string;
  realmSlug?: string;
  type?: CreatureAssetType;
  valid: boolean;
  notes: string[];
};

export function duplicateChecksums(items: ScannedAsset[]) {
  const groups = new Map<string, ScannedAsset[]>();
  for (const item of items) groups.set(item.checksum, [...(groups.get(item.checksum) || []), item]);
  return [...groups.values()].filter((group) => group.length > 1);
}

export function destinationFor(asset: ScannedAsset) {
  if (!asset.creatureSlug || !asset.realmSlug || !asset.type) return undefined;
  const folder = ['STL', 'supported-STL', 'OBJ', 'MTL', 'LYS'].includes(asset.type)
    ? 'models'
    : asset.type === 'video'
      ? 'gallery'
      : asset.type === 'GLB' || asset.type === 'GLTF'
        ? 'models'
        : 'hero';
  return `bestiary/${asset.realmSlug}/${asset.creatureSlug}/${folder}/${normalizeAssetName(asset.filename.replace(/\.[^.]+$/, ''))}${asset.extension.toLowerCase()}`;
}
