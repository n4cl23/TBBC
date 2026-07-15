import {describe, expect, it} from 'vitest';
import {canonEntities, canonGraphEdges, canonicalUuid, getCanonEntity} from './canon-registry';
describe('canonical registry',()=>{
  it('gives every entity complete immutable metadata',()=>{
    expect(canonEntities.length).toBeGreaterThan(100);
    for(const entity of canonEntities){expect(entity.canonicalId).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-5[0-9a-f]{3}-a[0-9a-f]{3}-[0-9a-f]{12}$/);expect(entity.aliases).toBeInstanceOf(Array);expect(entity.version).toBe('1.1.0');expect(entity.createdAt).toBeTruthy();expect(entity.updatedAt).toBeTruthy();}
    expect(new Set(canonEntities.map((entity)=>entity.canonicalId)).size).toBe(canonEntities.length);
  });
  it('has no orphaned graph references',()=>{const ids=new Set(canonEntities.map((entity)=>entity.canonicalId));for(const relation of canonGraphEdges){expect(ids.has(relation.fromId)).toBe(true);expect(ids.has(relation.toId)).toBe(true);}});
  it('keeps UUIDs stable and resolves aliases',()=>{expect(canonicalUuid('realm','ironhold')).toBe(canonicalUuid('realm','ironhold'));expect(getCanonEntity('realm','abyss')?.slug).toBe('kingdom-of-the-abyss');});
});
