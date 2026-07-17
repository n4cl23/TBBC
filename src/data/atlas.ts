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
export type AtlasMode='physical'|'political'|'historical'|'commercial'|'climate';
export type AtlasLayer='routes'|'rivers'|'mountains'|'fortresses'|'ruins'|'ports'|'forests'|'mines'|'forges'|'capitals'|'pois';
export type AtlasPoint={slug:string;realm:string;name:string;kind:string;category:AtlasFilter;x:number;y:number;description:string;danger?:boolean;related?:string[]};
export type AtlasFeature={id:string;realm:string;layer:AtlasLayer;x:number;y:number;label:string;description:string};
export type AtlasLine={id:string;layer:'routes'|'rivers';d:string;label:string;era?:AtlasEra};
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
export const atlasModeLabels:Record<AtlasMode,string>={physical:'Físico',political:'Político',historical:'Histórico',commercial:'Comercial',climate:'Climático'};
export const atlasLayerLabels:Record<AtlasLayer,string>={routes:'Rotas',rivers:'Rios',mountains:'Montanhas',fortresses:'Fortalezas',ruins:'Ruínas',ports:'Portos',forests:'Florestas',mines:'Minas',forges:'Forjas',capitals:'Capitais',pois:'POIs'};
export const atlasModeLayers:Record<AtlasMode,AtlasLayer[]>={
  physical:['rivers','mountains','forests'],political:['capitals','fortresses','pois'],historical:['ruins','fortresses','pois'],commercial:['routes','ports','mines','forges','capitals'],climate:['rivers','mountains','forests','ports'],
};
const feature=(realm:string,layer:AtlasLayer,x:number,y:number,label:string):AtlasFeature=>({id:`${realm}-${layer}`,realm,layer,x,y,label,description:`Anotação cartográfica derivada para a camada ${atlasLayerLabels[layer]}. Não constitui nova entidade canônica.`});
export const atlasFeatures:AtlasFeature[]=[
  feature('ironhold','mountains',19,35,'Relevo elevado'),feature('ironhold','fortresses',27,45,'Defesas territoriais'),feature('ironhold','mines',18,51,'Atividade mineral'),feature('ironhold','forges',31,50,'Distrito de forjas'),
  feature('frost-kingdom','mountains',47,13,'Cordões glaciais'),feature('frost-kingdom','rivers',57,28,'Curso glacial'),feature('frost-kingdom','ruins',61,20,'Vestígios antigos'),
  feature('stormreach','mountains',82,22,'Picos de tempestade'),feature('stormreach','fortresses',78,34,'Defesas de altitude'),feature('stormreach','ports',88,39,'Ancoradouros orientais'),
  feature('elder-forest','forests',56,52,'Mata ancestral'),feature('elder-forest','ruins',65,56,'Vestígios sob o dossel'),feature('elder-forest','rivers',48,58,'Curso florestal'),
  feature('scorched-wastes','mountains',31,72,'Escarpas vulcânicas'),feature('scorched-wastes','mines',25,82,'Extração profunda'),feature('scorched-wastes','ruins',43,81,'Vestígios da Fratura'),
  feature('kingdom-of-the-abyss','ports',76,68,'Portos de maré'),feature('kingdom-of-the-abyss','rivers',67,76,'Correntes continentais'),feature('kingdom-of-the-abyss','ruins',86,81,'Vestígios submersos'),
  ...atlasRealms.map(realm=>feature(realm.slug,'capitals',realm.x,realm.y,realm.experience?.capital||realm.name)),
  ...atlasPoints.filter(point=>point.category==='locations').map(point=>({id:`${point.realm}-poi-${point.slug}`,realm:point.realm,layer:'pois' as const,x:point.x,y:point.y,label:point.name,description:point.description})),
];
export const atlasLines:AtlasLine[]=[
  {id:'northern-road',layer:'routes',d:'M25 43 Q38 30 50 20 T78 31',label:'Eixo comercial setentrional'},
  {id:'southern-road',layer:'routes',d:'M25 43 Q38 62 35 75 T78 72',label:'Eixo comercial meridional'},
  {id:'forest-road',layer:'routes',d:'M25 43 Q42 48 57 49 T78 31',label:'Travessia central'},
  {id:'glacial-river',layer:'rivers',d:'M50 12 Q54 24 57 39 T66 67',label:'Bacia glacial'},
  {id:'western-river',layer:'rivers',d:'M38 31 Q33 48 28 61 T35 88',label:'Bacia ocidental'},
  {id:'fracture-front',layer:'routes',d:'M11 62 Q34 54 55 64 T91 58',label:'Frente histórica da Fratura',era:'fracture'},
];
export function findAtlasPoint(realm:string,point:string){return atlasPoints.find(x=>x.realm===realm&&x.slug===point)}
