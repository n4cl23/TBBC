import type {
  CanonAlias,
  CanonEvent,
  CanonRelation,
  CanonRealmId,
  CanonRole,
} from '@/types/canon';

export const CANON_VERSION = '1.0.0';
export const CANON_UPDATED_AT = '2026-07-14T00:00:00.000Z';

export const officialRealms: ReadonlyArray<{
  id: CanonRealmId;
  name: string;
  element: string;
  principle: string;
  crown: string;
  guardian: string;
}> = [
  {id:'ironhold',name:'Ironhold',element:'Ferro',principle:'Ordem e dever',crown:'iron-crown',guardian:'king-aldric'},
  {id:'frost-kingdom',name:'Frost Kingdom',element:'Gelo',principle:'Memória e preservação',crown:'frost-crown',guardian:'vhaldris'},
  {id:'elder-forest',name:'Elder Forest',element:'Vida',principle:'Ciclo e equilíbrio',crown:'oak-crown',guardian:'yggor'},
  {id:'stormreach',name:'Stormreach',element:'Tempestade',principle:'Mudança e vigilância',crown:'storm-crown',guardian:'vaelor'},
  {id:'kingdom-of-the-abyss',name:'Kingdom of the Abyss',element:'Oceano',principle:'Conhecimento e memória',crown:'abyss-crown',guardian:'nereus'},
  {id:'scorched-wastes',name:'Scorched Wastes',element:'Cinzas',principle:'Sacrifício e consequência',crown:'dragon-crown',guardian:'last-dragon-slayer'},
];

export const canonAliases: CanonAlias[] = [
  {alias:'abyss',canonicalSlug:'kingdom-of-the-abyss',kind:'realm',reason:'source-folder'},
  {alias:'reino-do-abismo',canonicalSlug:'kingdom-of-the-abyss',kind:'realm',locale:'pt-br',reason:'translation'},
  {alias:'mammoth',canonicalSlug:'frost-mammoth',kind:'creature',reason:'source-folder'},
  {alias:'skywind-the-storm-sovereign',canonicalSlug:'skywind',kind:'character',reason:'legacy'},
  {alias:'aster-the-world-heart',canonicalSlug:'aster',kind:'character',reason:'legacy'},
  {alias:'fenrir-the-moon-devourer',canonicalSlug:'fenrir',kind:'character',reason:'legacy'},
  {alias:'aegis-the-first-sky-king',canonicalSlug:'aegis',kind:'character',reason:'legacy'},
];

export const officialRoles: Record<string, CanonRole[]> = {
  'king-aldric':['guardian','sovereign'],
  vhaldris:['guardian'],
  yggor:['guardian','primordial'],
  vaelor:['guardian'],
  nereus:['guardian'],
  'last-dragon-slayer':['guardian','hunter'],
  aegis:['sovereign','primordial'],
  aster:['primordial'],
  fenrir:['primordial'],
  skywind:['sovereign','primordial'],
  'lion-of-slag':['secondary-boss'],
};

export const officialFactions = [
  {slug:'black-banner-company',name:'The Black Banner Company',subtype:'company',roles:['mercenary'],status:'canonical'},
  {slug:'brotherhood-of-hunters',name:'A Irmandade dos Caçadores',subtype:'brotherhood',roles:['hunter'],status:'canonical'},
  {slug:'company-of-explorers',name:'Companhia dos Exploradores',subtype:'company',roles:['explorer'],status:'canonical'},
  {slug:'artisans-guild',name:'Guilda dos Artesãos',subtype:'guild',roles:['artisan'],status:'canonical'},
  {slug:'merchants-guild',name:'Guilda dos Mercadores',subtype:'guild',roles:['merchant'],status:'canonical'},
  {slug:'order-of-chroniclers',name:'Ordem dos Cronistas',subtype:'order',roles:['chronicler'],status:'canonical'},
] as const;

export const officialGuilds = officialFactions.filter((faction) => faction.subtype === 'guild');

export const officialBossEncounters = [
  {slug:'lion-of-slag-ironhold',name:'Leão de Escória',subjectKind:'creature',subjectSlug:'lion-of-slag',role:'secondary-boss',realmId:'ironhold',status:'review',note:'Encontro formal; publicação depende de consolidação da criatura e validação dos assets.'},
  {slug:'aster-world-heart',name:'Aster — The World Heart',subjectKind:'character',subjectSlug:'aster',role:'boss',realmId:'elder-forest',status:'review',note:'Papel de encontro possível; Aster permanece entidade primordial.'},
] as const;

export const canonEvents: CanonEvent[] = [
  {id:'event:awakening-six-forces',slug:'awakening-six-forces',era:'Primeira Era',year:null,displayYear:'Antes dos registros',title:'O Despertar das Seis Forças',summary:'Ferro, gelo, vida, tempestade, oceano e fogo passam a moldar Asterheim.',causes:[],consequences:['foundation-six-realms'],participants:[],realms:[],confidence:'legendary',status:'canonical'},
  {id:'event:foundation-six-realms',slug:'foundation-six-realms',era:'Era das Coroas',year:1,displayYear:'Ano 1',title:'A Fundação dos Seis Reinos',summary:'Comunidades erguem fortalezas e santuários ao redor das seis Coroas.',causes:['awakening-six-forces'],consequences:['night-of-chains'],participants:[],realms:['ironhold','frost-kingdom','elder-forest','stormreach','kingdom-of-the-abyss','scorched-wastes'],confidence:'confirmed',status:'canonical'},
  {id:'event:night-of-chains',slug:'night-of-chains',era:'Queda dos Reinos',year:418,displayYear:'Ano 418',title:'A Noite das Correntes',summary:'A aliança das Coroas se rompe; Ironhold resiste ao primeiro grande cerco, mas não cai.',causes:['foundation-six-realms'],consequences:['war-of-the-skies'],participants:[{kind:'realm',slug:'ironhold'}],realms:['ironhold'],confidence:'confirmed',status:'canonical'},
  {id:'event:war-of-the-skies',slug:'war-of-the-skies',era:'Guerra dos Céus',year:511,displayYear:'Ano 511',title:'A Guerra dos Céus',summary:'Homens e dragões disputam o futuro das Coroas; Stormreach é devastada e as atuais Scorched Wastes começam a queimar.',causes:['night-of-chains'],consequences:['last-dragon','covenant-of-guardians'],participants:[{kind:'realm',slug:'stormreach'},{kind:'realm',slug:'scorched-wastes'}],realms:['stormreach','scorched-wastes'],confidence:'confirmed',status:'canonical'},
  {id:'event:last-dragon',slug:'last-dragon',era:'Guerra dos Céus',year:590,displayYear:'Ano 590',title:'A Queda do Último Dragão',summary:'O portador de Dragon’s Oath encerra a guerra e transforma uma vitória militar em dívida moral.',causes:['war-of-the-skies'],consequences:['covenant-of-guardians'],participants:[{kind:'character',slug:'last-dragon-slayer'}],realms:['scorched-wastes'],confidence:'confirmed',status:'canonical'},
  {id:'event:covenant-of-guardians',slug:'covenant-of-guardians',era:'Pacto dos Guardiões',year:603,displayYear:'Ano 603',title:'O Pacto dos Guardiões',summary:'Os seis vínculos são reconhecidos como um único pacto. Vínculos anteriores, como os de Vhaldris e Nereus, são formalizados em vez de recriados.',causes:['war-of-the-skies','last-dragon'],consequences:['raising-black-banner'],participants:[{kind:'character',slug:'king-aldric'},{kind:'character',slug:'vhaldris'},{kind:'character',slug:'yggor'},{kind:'character',slug:'vaelor'},{kind:'character',slug:'nereus'},{kind:'character',slug:'last-dragon-slayer'}],realms:['ironhold','frost-kingdom','elder-forest','stormreach','kingdom-of-the-abyss','scorched-wastes'],confidence:'confirmed',status:'canonical'},
  {id:'event:raising-black-banner',slug:'raising-black-banner',era:'Atualidade',year:742,displayYear:'Ano 742',title:'O Estandarte Negro é Erguido',summary:'A Black Banner Company reúne indícios de uma sétima força enquanto Ironhold sofre sua queda definitiva.',causes:['covenant-of-guardians'],consequences:[],participants:[{kind:'faction',slug:'black-banner-company'},{kind:'realm',slug:'ironhold'}],realms:['ironhold'],confidence:'confirmed',status:'canonical'},
];

export const canonRelations: CanonRelation[] = officialRealms.flatMap((realm) => [
  {id:`relation:${realm.guardian}:protects:${realm.id}`,from:{kind:'character' as const,slug:realm.guardian},to:{kind:'realm' as const,slug:realm.id},kind:'protects' as const,bidirectional:false,status:'canonical' as const},
  {id:`relation:${realm.guardian}:bound-to:${realm.crown}`,from:{kind:'character' as const,slug:realm.guardian},to:{kind:'artifact' as const,slug:realm.crown},kind:'bound-to' as const,bidirectional:true,status:'canonical' as const},
]);

export const canonicalTaxonomy = {
  entityKinds: ['realm','location','faction','character','creature','artifact','event','collection'],
  rules: {
    guardian: 'Papel de personagem ligado por juramento a uma Coroa; não é espécie nem categoria de criatura.',
    boss: 'Papel de encontro ou produto ligado a uma entidade; não altera o tipo ontológico da entidade.',
    guild: 'Papel/subtipo de facção com função profissional ou econômica.',
    collection: 'Agrupamento editorial ou comercial; só é canônico quando também referencia uma facção ou evento canônico.',
    timeline: 'Projeção ordenada de eventos canônicos; eventos são a fonte de verdade.',
  },
} as const;

export function resolveCanonAlias(kind: CanonAlias['kind'], value: string) {
  const normalized = value.trim().toLowerCase();
  return canonAliases.find((item) => item.kind === kind && item.alias === normalized)?.canonicalSlug ?? normalized;
}
