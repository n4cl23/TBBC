import 'server-only';
import {canonEntities, canonGraphEdges} from '@/data/canon-registry';
import {getPublishedData} from '@/lib/cms-public';

export const livingAtlasSections = ['realms','fortresses','ruins','temples','villages','biomes','food-chain','flora','fauna'] as const;
export type LivingAtlasSection = (typeof livingAtlasSections)[number];
export type LivingAtlasEntry = {id:string;title:string;realm:string|null;biome:string|null;species:string|null;danger:boolean|null;habitat:string|null;summary:string|null};
type Data = Record<string, unknown>;
const locationSection:Record<string,LivingAtlasSection|undefined>={Fortaleza:'fortresses',Ruínas:'ruins',Templo:'temples',Floresta:'biomes'};
const text=(value:unknown)=>typeof value==='string'&&value.trim()?value.trim():null;
const name=(data:Data)=>text(data.name)||text(data.title)||text(data.slug)||'Registro canônico';
export const livingAtlasCopy:Record<LivingAtlasSection,{title:string;description:string;empty:string}>={
  realms:{title:'Reinos',description:'Os seis reinos publicados no CMS canônico.',empty:'Nenhum reino canônico publicado.'},fortresses:{title:'Fortalezas',description:'Locais classificados como Fortaleza no Canon.',empty:'Nenhuma fortaleza canônica publicada.'},ruins:{title:'Ruínas',description:'Locais classificados como Ruínas no Canon.',empty:'Nenhuma ruína canônica publicada.'},temples:{title:'Templos',description:'Locais classificados como Templo no Canon.',empty:'Nenhum templo canônico publicado.'},villages:{title:'Vilas',description:'Vilas exigem registro canônico explícito.',empty:'O Canon atual não registra vilas.'},biomes:{title:'Biomas',description:'Biomas com local canônico explicitamente classificado.',empty:'O Canon atual não registra biomas adicionais.'},'food-chain':{title:'Cadeia alimentar',description:'Relações predatórias registradas no grafo canônico.',empty:'O Canon atual não registra relações predatórias.'},flora:{title:'Flora',description:'Registros botânicos explicitamente publicados no Canon.',empty:'O Canon atual não registra flora como entidade.'},fauna:{title:'Fauna',description:'Criaturas publicadas no CMS e ligadas a habitat canônico.',empty:'Nenhuma criatura canônica publicada.'},
};
export async function getLivingAtlas(section:LivingAtlasSection):Promise<LivingAtlasEntry[]>{
  const [realms,locations,creatures]=await Promise.all([getPublishedData<Data>('realms'),getPublishedData<Data>('locations'),getPublishedData<Data>('creatures')]);
  const canonicalRealms=canonEntities.filter(item=>item.kind==='realm');
  const realmById=new Map(canonicalRealms.map(item=>[item.canonicalId,name(item.data)]));
  const realmBySlug=new Map(canonicalRealms.map(item=>[item.slug,name(item.data)]));
  const realm=(data:Data)=>realmById.get(text(data.realmId)||'')||realmBySlug.get(text(data.realmId)||'')||null;
  if(section==='realms')return realms.map((data,index)=>({id:`realm-${text(data.slug)||index}`,title:name(data),realm:name(data),biome:text(data.architecture),species:null,danger:null,habitat:null,summary:text(data.summary)}));
  if(section==='fauna')return creatures.map((data,index)=>({id:`creature-${text(data.slug)||index}`,title:name(data),realm:realm(data),biome:null,species:text(data.category),danger:null,habitat:text(data.habitat),summary:text(data.summary)}));
  if(section==='food-chain')return canonGraphEdges.filter(edge=>edge.kind==='preys-on').map(edge=>({id:edge.id,title:edge.id,realm:null,biome:null,species:null,danger:null,habitat:null,summary:'Relação predatória canônica.'}));
  if(section==='flora'||section==='villages')return [];
  return locations.flatMap((data,index)=>{const kind=text(data.kind),mapped=kind?locationSection[kind]:undefined;if(mapped!==section)return[];return[{id:`location-${text(data.slug)||index}`,title:name(data),realm:realm(data),biome:section==='biomes'?kind:null,species:null,danger:typeof data.danger==='boolean'?data.danger:null,habitat:null,summary:kind?`Classificação canônica: ${kind}.`:null}]});
}
