import {describe,expect,it} from 'vitest';
import {canonAliases,canonEvents,canonRelations,officialRealms,resolveCanonAlias} from './canon';

describe('official canon',()=>{
  it('defines exactly six unique realms, crowns and guardians',()=>{
    expect(officialRealms).toHaveLength(6);
    expect(new Set(officialRealms.map(x=>x.id)).size).toBe(6);
    expect(new Set(officialRealms.map(x=>x.crown)).size).toBe(6);
    expect(new Set(officialRealms.map(x=>x.guardian)).size).toBe(6);
  });
  it('keeps canonical events chronologically ordered',()=>{
    const years=canonEvents.filter(x=>x.year!==null).map(x=>x.year as number);
    expect(years).toEqual([...years].sort((a,b)=>a-b));
    expect(canonEvents.every(x=>x.status==='canonical')).toBe(true);
  });
  it('resolves legacy aliases without creating duplicate entities',()=>{
    expect(resolveCanonAlias('realm','abyss')).toBe('kingdom-of-the-abyss');
    expect(resolveCanonAlias('creature','mammoth')).toBe('frost-mammoth');
    expect(new Set(canonAliases.map(x=>`${x.kind}:${x.alias}`)).size).toBe(canonAliases.length);
  });
  it('links each guardian to a realm and a crown',()=>{
    expect(canonRelations).toHaveLength(12);
  });
});
