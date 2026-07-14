import type { Creature, CreatureAsset } from '@/types/creature';

const PRIVATE_PATH = /^(?:[a-z]:[\\/]|\\\\|file:|\.\.[\\/])/i;

export function isSafePublicAssetUrl(value?: string) {
  if (!value || PRIVATE_PATH.test(value) || value.includes('..')) return false;
  if (value.startsWith('/')) return true;
  try {
    const url = new URL(value);
    return url.protocol === 'https:';
  } catch {
    return false;
  }
}

export function publicCreatureAssets(assets: CreatureAsset[]) {
  return assets.filter(
    (asset) => asset.isPublic && isSafePublicAssetUrl(asset.url),
  );
}

export function selectPublicGlb(assets: CreatureAsset[]) {
  return publicCreatureAssets(assets)
    .filter((asset) => asset.type === 'GLB')
    .toSorted((a, b) => Number(b.isPrimary) - Number(a.isPrimary) || b.version - a.version)[0];
}

export function selectCreatureImage(
  assets: CreatureAsset[],
  fallback: string,
) {
  return (
    publicCreatureAssets(assets)
      .filter((asset) => ['hero', 'thumbnail', 'painted-render'].includes(asset.type))
      .toSorted((a, b) => Number(b.isPrimary) - Number(a.isPrimary) || b.version - a.version)[0]
      ?.url || fallback
  );
}

export function selectPublicCreatureGlb(creature: Pick<Creature, 'publicGlbUrl'>) {
  return isSafePublicAssetUrl(creature.publicGlbUrl) ? creature.publicGlbUrl : undefined;
}

export function selectPublicCreatureImage(creature: Pick<Creature, 'image'>) {
  return isSafePublicAssetUrl(creature.image) ? creature.image : undefined;
}
