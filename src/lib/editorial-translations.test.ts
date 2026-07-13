import {describe,expect,it} from 'vitest';
import {characters,collections,crowns,gallery,guardians,news,realms,timeline,weapons} from '@/data/content';
import {marketplaces,marketplaceListings} from '@/data/marketplaces';
import {artBibleSeeds,printGuideSeeds,withEditorialTranslations} from '@/data/editorial-translations';
import {translationCoverage} from './localized-content';
import type {CmsEntityType} from '@/types/cms';

const seeds:Partial<Record<CmsEntityType,unknown[]>>={characters,collections,crowns,gallery,guardians,news,realms,timeline,weapons,marketplaces,marketplaceListings,artBible:artBibleSeeds,printGuide:printGuideSeeds};

describe('editorial translations',()=>{
  it.each(['en','es'] as const)('publishes complete %s fields for every official seed',locale=>{
    for(const [entity,items] of Object.entries(seeds) as [CmsEntityType,unknown[]][]){
      for(const item of items){const localized=withEditorialTranslations(entity,item as Record<string,unknown>),coverage=translationCoverage(entity,localized,locale);expect(coverage,JSON.stringify({entity,slug:String(localized.slug||localized.id),locale})).toMatchObject({status:'published',complete:true,missingFields:[]});}
    }
  });
});
