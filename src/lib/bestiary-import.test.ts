import { describe, expect, it } from 'vitest';
import { classifyCreatureAsset, destinationFor, duplicateChecksums, normalizeAssetName, suggestedCreature, type ScannedAsset } from './bestiary-import';

describe('bestiary import contract', () => {
  it('normalizes source naming without changing the original', () => {
    expect(normalizeAssetName('Frost Mammoth — Painted')).toBe('frost-mammoth-painted');
    expect(suggestedCreature(['Frost Kingdom', 'Mammoth', 'Frost Mammoth.glb'], ['frost-mammoth'])).toBe('frost-mammoth');
  });

  it('classifies supported formats and leaves unknown files alone', () => {
    expect(classifyCreatureAsset('.GLB')).toBe('GLB');
    expect(classifyCreatureAsset('.stl')).toBe('STL');
    expect(classifyCreatureAsset('.mp4')).toBe('video');
    expect(classifyCreatureAsset('.exe')).toBeUndefined();
  });

  it('detects checksum collisions and computes a controlled destination', () => {
    const asset: ScannedAsset = { sourcePath: 'source', relativePath: 'Kraken.glb', filename: 'Kraken.glb', extension: '.glb', sizeBytes: 10, checksum: 'same', creatureSlug: 'kraken', realmSlug: 'kingdom-of-the-abyss', type: 'GLB', valid: true, notes: [] };
    expect(duplicateChecksums([asset, { ...asset, filename: 'copy.glb' }])).toHaveLength(1);
    expect(destinationFor(asset)).toBe('bestiary/kingdom-of-the-abyss/kraken/models/kraken.glb');
  });
});
