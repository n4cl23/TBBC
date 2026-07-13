import 'server-only';
import type {CmsEntityType} from '@/types/cms';
import type {Locale} from './i18n';
import {resolveLocalizedEntity,type LocalizedResult} from './localized-content';
import {listCmsRecords} from './cms-repository';
export async function getPublishedData<T>(entity:CmsEntityType):Promise<T[]>{return (await listCmsRecords(entity)).filter(x=>x.status==='published').map(x=>x.data as T)}
export async function getLocalizedPublishedData<T extends object>(entity:CmsEntityType,locale:Locale):Promise<Array<LocalizedResult<T>>>{return (await listCmsRecords(entity)).filter(x=>x.status==='published').map(x=>resolveLocalizedEntity(entity,x.data as T,locale))}
export async function getLocalizedPublishedEntity<T extends object>(entity:CmsEntityType,slug:string,locale:Locale):Promise<LocalizedResult<T>|undefined>{return (await getLocalizedPublishedData<T>(entity,locale)).find(x=>{const data=x.data as Record<string,unknown>;return String(data.slug||data.id)===slug})}
