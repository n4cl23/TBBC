import { describe, expect, it } from 'vitest';
import { isSafePublicAssetUrl, publicCreatureAssets, selectCreatureImage, selectPublicCreatureGlb } from './creature-assets';
import type { CreatureAsset } from '@/types/creature';

const base: CreatureAsset = { id: 'asset', creatureId: 'kraken', type: 'GLB', filename: 'kraken.glb', mimeType: 'model/gltf-binary', sizeBytes: 10, version: 1, isPrimary: true, isPublic: true, checksum: 'abc', createdAt: '', updatedAt: '' };

describe('creature asset publication boundary', () => {
  it('rejects local, traversal, and insecure URLs', () => {
    expect(isSafePublicAssetUrl('C:\\masters\\kraken.glb')).toBe(false);
    expect(isSafePublicAssetUrl('file:///masters/kraken.glb')).toBe(false);
    expect(isSafePublicAssetUrl('/models/../private.glb')).toBe(false);
    expect(isSafePublicAssetUrl('http://example.com/model.glb')).toBe(false);
    expect(isSafePublicAssetUrl('/models/kraken.glb')).toBe(true);
    expect(isSafePublicAssetUrl('https://cdn.example.com/kraken.glb')).toBe(true);
  });

  it('only selects explicitly public assets', () => {
    const privateAsset = { ...base, id: 'private', url: '/private/kraken.glb', isPublic: false };
    const publicAsset = { ...base, id: 'public', url: '/models/kraken.glb' };
    expect(publicCreatureAssets([privateAsset, publicAsset])).toEqual([publicAsset]);
    expect(selectPublicCreatureGlb({ publicGlbUrl: 'C:\\masters\\kraken.glb' })).toBeUndefined();
    expect(selectPublicCreatureGlb({ publicGlbUrl: '/models/kraken.glb' })).toBe('/models/kraken.glb');
  });

  it('uses a safe image fallback when no public render exists', () => {
    expect(selectCreatureImage([], '/images/bestiary/beasts-hero.webp')).toBe('/images/bestiary/beasts-hero.webp');
  });
});
