import {describe,expect,it} from 'vitest';
import {atlasFeatures,atlasLayerLabels,atlasLines,atlasModeLayers,atlasPoints,atlasRealms} from './atlas';

describe('professional atlas catalogue',()=>{
  it('covers every requested cartographic layer',()=>{const available=new Set([...atlasFeatures.map(item=>item.layer),...atlasLines.map(item=>item.layer)]);expect(Object.keys(atlasLayerLabels).every(layer=>available.has(layer as never))).toBe(true)});
  it('keeps every annotation inside a canonical realm and map bounds',()=>{const realms=new Set(atlasRealms.map(realm=>realm.slug));for(const feature of atlasFeatures){expect(realms.has(feature.realm)).toBe(true);expect(feature.x).toBeGreaterThanOrEqual(0);expect(feature.x).toBeLessThanOrEqual(100);expect(feature.y).toBeGreaterThanOrEqual(0);expect(feature.y).toBeLessThanOrEqual(100)}});
  it('keeps five navigable modes and valid point records',()=>{expect(Object.keys(atlasModeLayers)).toHaveLength(5);expect(atlasPoints.every(point=>atlasRealms.some(realm=>realm.slug===point.realm))).toBe(true)});
});
