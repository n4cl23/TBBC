import {canonEntityKinds,canonRealmIds,canonRoles,type CanonEntityKind,type CanonRealmId,type CanonRole} from '@/types/canon';
import type {CmsEntityType} from '@/types/cms';
export type CanonValidationResult={ok:true}|{ok:false;message:string};
const isStringArray=(value:unknown):value is string[]=>Array.isArray(value)&&value.every(item=>typeof item==='string');
export function validateCanonPayload(entity:CmsEntityType,data:Record<string,unknown>):CanonValidationResult{
  if(entity==='events'){
    if(typeof data.title!=='string'||typeof data.summary!=='string')return {ok:false,message:'Evento exige título e resumo.'};
    if(data.realms&&!isStringArray(data.realms))return {ok:false,message:'Reinos do evento devem ser uma lista de slugs.'};
    if(isStringArray(data.realms)&&data.realms.some(realm=>!canonRealmIds.includes(realm as CanonRealmId)))return {ok:false,message:'Evento referencia um reino não canônico.'};
  }
  if(entity==='canonAliases'){
    if(typeof data.alias!=='string'||typeof data.canonicalSlug!=='string')return {ok:false,message:'Alias exige alias e canonicalSlug.'};
    if(!canonEntityKinds.includes(data.kind as CanonEntityKind))return {ok:false,message:'Alias usa tipo ontológico inválido.'};
  }
  if(entity==='bossEncounters'){
    if(!['boss','secondary-boss'].includes(String(data.role)))return {ok:false,message:'Encontro deve usar papel boss ou secondary-boss.'};
    if(!canonEntityKinds.includes(data.subjectKind as CanonEntityKind))return {ok:false,message:'Encontro referencia tipo ontológico inválido.'};
  }
  if(data.roles&&(!isStringArray(data.roles)||data.roles.some(role=>!canonRoles.includes(role as CanonRole))))return {ok:false,message:'Um ou mais papéis canônicos são inválidos.'};
  return {ok:true};
}
