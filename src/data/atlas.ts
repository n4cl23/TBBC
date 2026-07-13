import {crowns,guardians,realms} from './content';
import {realmExperiences} from './realm-experience';

export const atlasEras=[
  {id:'first',label:'Primeira Era',year:'Antes dos registros',description:'As Coroas despertam e as primeiras fronteiras ainda n\u00e3o existem.'},
  {id:'crowns',label:'Era das Coroas',year:'Ano 301',description:'Reinos, santuÃ¡rios e estradas antigas atravessam o continente.'},
  {id:'fracture',label:'Era da Fratura',year:'Ano 590',description:'A guerra dos drag\u00f5es altera costas, florestas e montanhas.'},
  {id:'current',label:'Era Atual',year:'Ano 742',description:'Ru\u00ednas voltam a respirar e os Guardi\u00f5es sentem o equil\u00edbrio ruir.'},
] as const;
export type AtlasEra=(typeof atlasEras)[number]['id'];
export type AtlasFilter='realms'|'guardians'|'crowns'|'characters'|'collections'|'marketplace'|'creatures'|'bosses'|'locations';
export type AtlasPoint={slug:string;realm:string;name:string;kind:string;category:AtlasFilter;x:number;y:number;description:string;danger?:boolean;related?:string[]};
const layout:Record<string,{x:number;y:number;path:string;weather:string}>={
  ironhold:{x:25,y:43,path:'M5 29 L20 17 L38 25 L42 47 L34 64 L13 61 L4 46 Z',weather:'embers'},
  'frost-kingdom':{x:50,y:20,path:'M27 7 L68 4 L77 17 L69 32 L42 36 L29 26 Z',weather:'snow'},
  stormreach:{x:78,y:31,path:'M67 12 L91 11 L98 30 L89 48 L71 44 L63 29 Z',weather:'storm'},
  'elder-forest':{x:57,y:49,path:'M37 30 L68 29 L76 46 L69 68 L44 68 L34 51 Z',weather:'mist'},
  'scorched-wastes':{x:35,y:75,path:'M7 58 L43 57 L59 73 L55 94 L17 94 L4 78 Z',weather:'ash'},
  'kingdom-of-the-abyss':{x:78,y:72,path:'M62 44 L91 43 L99 61 L94 91 L61 96 L52 73 Z',weather:'tide'},
};
function slugify(value:string){return value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'')}
function category(kind:string):AtlasFilter{const raw=kind.toLowerCase();if(raw.includes('boss')||raw.includes('perigosa'))return 'bosses';if(raw.includes('criatura')||raw.includes('fauna'))return 'creatures';return 'locations'}
export const atlasRealms=realms.map(realm=>{const frame=layout[realm.slug],experience=realmExperiences[realm.slug],guardian=guardians.find(x=>x.realm===realm.name),crown=crowns.find(x=>x.realm===realm.name);return {...realm,...frame,experience,guardian,crown}});
export const atlasPoints:AtlasPoint[]=atlasRealms.flatMap(realm=>{
  const locations=(realm.experience?.locations||[]).map(location=>({slug:slugify(location.name),realm:realm.slug,name:location.name,kind:location.kind,category:category(location.kind),x:realm.x+(location.x-50)*.24,y:realm.y+(location.y-50)*.18,description:`${location.kind} de ${realm.name}. ${realm.summary}`,danger:location.danger,related:[realm.guardian?.name,realm.crown?.name].filter(Boolean) as string[]}));
  const guardian=realm.guardian?[{slug:`guardian-${realm.guardian.slug}`,realm:realm.slug,name:realm.guardian.name,kind:'GuardiÃ£o',category:'guardians' as const,x:realm.x-2.5,y:realm.y+1.5,description:realm.guardian.summary,related:[realm.crown?.name||'']}]:[];
  const crown=realm.crown?[{slug:`crown-${realm.crown.slug}`,realm:realm.slug,name:realm.crown.name,kind:'Coroa',category:'crowns' as const,x:realm.x+2.8,y:realm.y-1.2,description:realm.crown.history,related:[realm.guardian?.name||'']}]:[];
  const creatures=(realm.experience?.creatures||[]).map((creature,index)=>({slug:slugify(creature.name),realm:realm.slug,name:creature.name,kind:creature.kind,category:category(creature.kind),x:realm.x+(index?5:-5),y:realm.y+6+index*2,description:creature.description,related:[realm.name]}));
  return [...locations,...guardian,...crown,...creatures];
});
export function findAtlasPoint(realm:string,point:string){return atlasPoints.find(x=>x.realm===realm&&x.slug===point)}
