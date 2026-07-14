import { atlasPoints } from './atlas';
import type {
  Creature,
  CreatureCategory,
  CreatureStatus,
  CreatureThreatLevel,
  CreatureTranslation,
  LocalizedCreature,
} from '@/types/creature';
import type { Locale } from '@/lib/i18n';

const STAMP = '2026-07-14T00:00:00.000Z';
const FALLBACK_IMAGE = '/images/bestiary/beasts-hero.webp';

type RealmId =
  | 'frost-kingdom'
  | 'stormreach'
  | 'ironhold'
  | 'elder-forest'
  | 'kingdom-of-the-abyss'
  | 'scorched-wastes';

type CreatureSeed = {
  slug: string;
  name: string;
  realmId: RealmId;
  category: CreatureCategory;
  threatLevel: CreatureThreatLevel;
  epithet: [string, string, string];
  featured?: boolean;
  status?: CreatureStatus;
};

export const creatureRealmIds: RealmId[] = [
  'frost-kingdom',
  'stormreach',
  'ironhold',
  'elder-forest',
  'kingdom-of-the-abyss',
  'scorched-wastes',
];

export const creatureRealmProfiles: Record<
  RealmId,
  {
    name: string;
    guardianId: string;
    crownId: string;
    materials: string[];
    palette: string[];
    visual: string;
    habitat: Record<Locale, string>;
  }
> = {
  'frost-kingdom': {
    name: 'Frost Kingdom',
    guardianId: 'vhaldris',
    crownId: 'frost-crown',
    materials: ['gelo primordial', 'pedra glacial', 'prata antiga'],
    palette: ['#e9f4f7', '#91c5da', '#3d6578', '#18242b'],
    visual: 'Cristais controlados, neve aderida e runas de preservação.',
    habitat: {
      'pt-br': 'Geleiras, passagens setentrionais e santuários congelados.',
      en: 'Glaciers, northern passes, and frozen sanctuaries.',
      es: 'Glaciares, pasos septentrionales y santuarios congelados.',
    },
  },
  stormreach: {
    name: 'Stormreach',
    guardianId: 'vaelor',
    crownId: 'storm-crown',
    materials: ['bronze negro', 'basalto', 'cristal de tempestade'],
    palette: ['#0b1218', '#4d83aa', '#78d7ed', '#a67642'],
    visual: 'Silhuetas aerodinâmicas, descarga contida e pedra exposta ao vento.',
    habitat: {
      'pt-br': 'Penhascos, obeliscos e rotas de nuvens de Stormreach.',
      en: 'Cliffs, obelisks, and cloud roads across Stormreach.',
      es: 'Acantilados, obeliscos y rutas de nubes de Stormreach.',
    },
  },
  ironhold: {
    name: 'Ironhold',
    guardianId: 'king-aldric',
    crownId: 'iron-crown',
    materials: ['ferro negro', 'basalto', 'bronze de forja'],
    palette: ['#111313', '#595751', '#a94432', '#b38a51'],
    visual: 'Massa pesada, placas funcionais e linguagem de fortificação.',
    habitat: {
      'pt-br': 'Minas, forjas, muralhas e cavernas sob Ironhold.',
      en: 'Mines, forges, walls, and caverns beneath Ironhold.',
      es: 'Minas, forjas, murallas y cavernas bajo Ironhold.',
    },
  },
  'elder-forest': {
    name: 'Elder Forest',
    guardianId: 'yggor',
    crownId: 'oak-crown',
    materials: ['madeira viva', 'musgo', 'âmbar', 'pedra antiga'],
    palette: ['#26331f', '#79945b', '#987247', '#d0a85b'],
    visual: 'Crescimento orgânico, raízes estruturais e assimetria natural.',
    habitat: {
      'pt-br': 'Bosques antigos, clareiras rituais e ruínas tomadas por raízes.',
      en: 'Ancient groves, ritual clearings, and root-bound ruins.',
      es: 'Bosques antiguos, claros rituales y ruinas cubiertas de raíces.',
    },
  },
  'kingdom-of-the-abyss': {
    name: 'Kingdom of the Abyss',
    guardianId: 'nereus',
    crownId: 'abyss-crown',
    materials: ['coral', 'bronze oxidado', 'pedra abissal'],
    palette: ['#071b1d', '#3e968c', '#54c4bd', '#77516f'],
    visual: 'Anatomia marinha, curvas profundas e bioluminescência parcimoniosa.',
    habitat: {
      'pt-br': 'Ruínas submersas, fossas oceânicas e costas do Reino do Abismo.',
      en: 'Sunken ruins, ocean trenches, and the shores of the Abyss Kingdom.',
      es: 'Ruinas sumergidas, fosas oceánicas y costas del Reino del Abismo.',
    },
  },
  'scorched-wastes': {
    name: 'Scorched Wastes',
    guardianId: 'last-dragon-slayer',
    crownId: 'dragon-crown',
    materials: ['basalto', 'obsidiana', 'osso', 'magma'],
    palette: ['#171412', '#57241b', '#b45f3f', '#f18a32'],
    visual: 'Anatomia marcada pelo calor, cinza e fissuras luminosas controladas.',
    habitat: {
      'pt-br': 'Caldeiras, dunas de cinza e ruínas vulcânicas dos Ermos Abrasados.',
      en: 'Calderas, ash dunes, and volcanic ruins across the Scorched Wastes.',
      es: 'Calderas, dunas de ceniza y ruinas volcánicas de los Yermos Abrasados.',
    },
  },
};

const seeds: CreatureSeed[] = [
  { slug: 'ice-wolves', name: 'Ice Wolves', realmId: 'frost-kingdom', category: 'predator', threatLevel: 'high', epithet: ['A Matilha de Cristal', 'The Crystal Pack', 'La Manada de Cristal'], featured: true },
  { slug: 'frost-troll', name: 'Frost Troll', realmId: 'frost-kingdom', category: 'giant', threatLevel: 'high', epithet: ['O Quebra-Geleiras', 'The Glacier Breaker', 'El Rompeglaciares'] },
  { slug: 'crystal-bear', name: 'Crystal Bear', realmId: 'frost-kingdom', category: 'beast', threatLevel: 'high', epithet: ['A Garra Lapidada', 'The Faceted Claw', 'La Garra Tallada'] },
  { slug: 'frost-drake', name: 'Frost Drake', realmId: 'frost-kingdom', category: 'dragon', threatLevel: 'extreme', epithet: ['A Asa da Geada', 'The Rime Wing', 'El Ala de Escarcha'] },
  { slug: 'snow-wraith', name: 'Snow Wraith', realmId: 'frost-kingdom', category: 'spirit', threatLevel: 'extreme', epithet: ['O Cavaleiro Sem Degelo', 'The Thawless Rider', 'El Jinete sin Deshielo'] },
  { slug: 'frost-mammoth', name: 'Frost Mammoth', realmId: 'frost-kingdom', category: 'beast', threatLevel: 'moderate', epithet: ['O Peregrino de Marfim', 'The Ivory Pilgrim', 'El Peregrino de Marfil'] },
  { slug: 'ice-giant', name: 'Ice Giant', realmId: 'frost-kingdom', category: 'giant', threatLevel: 'catastrophic', epithet: ['O Martelo do Norte', 'The Hammer of the North', 'El Martillo del Norte'] },
  { slug: 'tempest-hawk', name: 'Tempest Hawk', realmId: 'stormreach', category: 'predator', threatLevel: 'moderate', epithet: ['O Olho do Vendaval', 'The Gale Eye', 'El Ojo del Vendaval'] },
  { slug: 'storm-griffin', name: 'Storm Griffin', realmId: 'stormreach', category: 'guardian', threatLevel: 'high', epithet: ['O Vigia das Torres', 'The Tower Warden', 'El Vigía de las Torres'] },
  { slug: 'lightning-serpent', name: 'Lightning Serpent', realmId: 'stormreach', category: 'elemental', threatLevel: 'catastrophic', epithet: ['A Espiral do Relâmpago', 'The Lightning Coil', 'La Espiral del Relámpago'], featured: true, status: 'art-review' },
  { slug: 'thunder-golem', name: 'Thunder Golem', realmId: 'stormreach', category: 'construct', threatLevel: 'extreme', epithet: ['A Bigorna Celeste', 'The Sky Anvil', 'El Yunque Celeste'] },
  { slug: 'sky-whale', name: 'Sky Whale', realmId: 'stormreach', category: 'beast', threatLevel: 'moderate', epithet: ['O Navegante das Nuvens', 'The Cloud Navigator', 'El Navegante de las Nubes'] },
  { slug: 'storm-dragon', name: 'Storm Dragon', realmId: 'stormreach', category: 'dragon', threatLevel: 'catastrophic', epithet: ['A Coroa da Tormenta', 'The Tempest Crown', 'La Corona de la Tormenta'] },
  { slug: 'iron-golem', name: 'Iron Golem', realmId: 'ironhold', category: 'construct', threatLevel: 'extreme', epithet: ['O Juramento Forjado', 'The Forged Oath', 'El Juramento Forjado'], featured: true },
  { slug: 'cave-troll', name: 'Cave Troll', realmId: 'ironhold', category: 'giant', threatLevel: 'high', epithet: ['O Devorador de Minas', 'The Mine Eater', 'El Devorador de Minas'] },
  { slug: 'forge-beast', name: 'Forge Beast', realmId: 'ironhold', category: 'construct', threatLevel: 'extreme', epithet: ['A Fera da Fornalha', 'The Furnace Beast', 'La Bestia de la Forja'] },
  { slug: 'stone-giant', name: 'Stone Giant', realmId: 'ironhold', category: 'giant', threatLevel: 'high', epithet: ['O Pilar Errante', 'The Wandering Pillar', 'El Pilar Errante'] },
  { slug: 'lava-drake', name: 'Lava Drake', realmId: 'ironhold', category: 'dragon', threatLevel: 'extreme', epithet: ['A Asa da Forja', 'The Forge Wing', 'El Ala de la Forja'] },
  { slug: 'ent', name: 'Ent', realmId: 'elder-forest', category: 'spirit', threatLevel: 'moderate', epithet: ['O Tronco Desperto', 'The Waking Trunk', 'El Tronco Despierto'] },
  { slug: 'dryad', name: 'Dryad', realmId: 'elder-forest', category: 'spirit', threatLevel: 'variable', epithet: ['A Voz da Seiva', 'The Voice of Sap', 'La Voz de la Savia'] },
  { slug: 'ancient-wolf', name: 'Ancient Wolf', realmId: 'elder-forest', category: 'predator', threatLevel: 'high', epithet: ['O Caçador das Raízes', 'The Root Hunter', 'El Cazador de Raíces'] },
  { slug: 'forest-spirit', name: 'Forest Spirit', realmId: 'elder-forest', category: 'spirit', threatLevel: 'variable', epithet: ['O Sussurro Verde', 'The Green Whisper', 'El Susurro Verde'] },
  { slug: 'moss-colossus', name: 'Moss Colossus', realmId: 'elder-forest', category: 'colossus', threatLevel: 'extreme', epithet: ['A Ruína que Caminha', 'The Walking Ruin', 'La Ruina que Camina'], featured: true },
  { slug: 'treant-elder', name: 'Treant Elder', realmId: 'elder-forest', category: 'guardian', threatLevel: 'catastrophic', epithet: ['O Primeiro Anel', 'The First Ring', 'El Primer Anillo'] },
  { slug: 'kraken', name: 'Kraken', realmId: 'kingdom-of-the-abyss', category: 'aberration', threatLevel: 'catastrophic', epithet: ['O Sonho das Profundezas', 'The Dream Below', 'El Sueño de las Profundidades'], featured: true },
  { slug: 'sea-serpent', name: 'Sea Serpent', realmId: 'kingdom-of-the-abyss', category: 'predator', threatLevel: 'extreme', epithet: ['A Espinha da Maré', 'The Spine of the Tide', 'La Espina de la Marea'] },
  { slug: 'leviathan', name: 'Leviathan', realmId: 'kingdom-of-the-abyss', category: 'colossus', threatLevel: 'catastrophic', epithet: ['A Montanha Submersa', 'The Sunken Mountain', 'La Montaña Sumergida'] },
  { slug: 'deep-horror', name: 'Deep Horror', realmId: 'kingdom-of-the-abyss', category: 'aberration', threatLevel: 'extreme', epithet: ['O Habitante sem Nome', 'The Nameless Dweller', 'El Habitante sin Nombre'] },
  { slug: 'coral-titan', name: 'Coral Titan', realmId: 'kingdom-of-the-abyss', category: 'colossus', threatLevel: 'high', epithet: ['O Jardim de Pedra', 'The Stone Garden', 'El Jardín de Piedra'] },
  { slug: 'fire-drake', name: 'Fire Drake', realmId: 'scorched-wastes', category: 'dragon', threatLevel: 'extreme', epithet: ['A Brasa Alada', 'The Winged Ember', 'La Brasa Alada'] },
  { slug: 'ash-demon', name: 'Ash Demon', realmId: 'scorched-wastes', category: 'aberration', threatLevel: 'extreme', epithet: ['O Príncipe da Cinza', 'The Ash Prince', 'El Príncipe de la Ceniza'] },
  { slug: 'sand-worm', name: 'Sand Worm', realmId: 'scorched-wastes', category: 'predator', threatLevel: 'high', epithet: ['A Boca das Dunas', 'The Mouth of the Dunes', 'La Boca de las Dunas'] },
  { slug: 'phoenix', name: 'Phoenix', realmId: 'scorched-wastes', category: 'elemental', threatLevel: 'variable', epithet: ['A Última Chama', 'The Last Flame', 'La Última Llama'], featured: true },
  { slug: 'magma-titan', name: 'Magma Titan', realmId: 'scorched-wastes', category: 'colossus', threatLevel: 'catastrophic', epithet: ['O Coração da Caldeira', 'The Caldera Heart', 'El Corazón de la Caldera'] },
];

const categoryNames: Record<Locale, Record<CreatureCategory, string>> = {
  'pt-br': { beast: 'besta', dragon: 'dragão', spirit: 'espírito', construct: 'constructo', colossus: 'colosso', giant: 'gigante', aberration: 'aberração', elemental: 'elemental', predator: 'predador', guardian: 'guardião' },
  en: { beast: 'beast', dragon: 'dragon', spirit: 'spirit', construct: 'construct', colossus: 'colossus', giant: 'giant', aberration: 'aberration', elemental: 'elemental', predator: 'predator', guardian: 'guardian' },
  es: { beast: 'bestia', dragon: 'dragón', spirit: 'espíritu', construct: 'constructo', colossus: 'coloso', giant: 'gigante', aberration: 'aberración', elemental: 'elemental', predator: 'depredador', guardian: 'guardián' },
};

function translation(seed: CreatureSeed, locale: Locale): CreatureTranslation {
  const realm = creatureRealmProfiles[seed.realmId], category = categoryNames[locale][seed.category];
  const index = locale === 'pt-br' ? 0 : locale === 'en' ? 1 : 2;
  const copy = locale === 'pt-br'
    ? {
        summary: `${seed.name} é uma presença ${category} registrada em ${realm.name}, reconhecida por sua silhueta e pelo impacto que deixa no território.`,
        lore: `Os cronistas das Seis Coroas tratam ${seed.name} como parte viva da história de ${realm.name}. Cada avistamento altera rotas, ritos e decisões de quem habita a região.`,
        origin: `Surgiu das forças antigas que moldaram ${realm.name}; sua origem permanece ligada à Coroa e às transformações do reino.`,
        behavior: `Protege o próprio território, reage a mudanças ambientais e evita confronto sem propósito, exceto quando seu domínio é ameaçado.`,
        diet: seed.category === 'construct' ? 'Não se alimenta; converte calor, minerais ou energia rúnica.' : seed.category === 'spirit' || seed.category === 'elemental' ? 'Absorve energia natural e resíduos mágicos do território.' : 'Alimenta-se de fauna, minerais ou matéria orgânica disponível no habitat.',
        weaknesses: ['Ruptura do vínculo territorial', 'Exposição do núcleo ou das juntas', 'Mudança brusca do ambiente'],
        abilities: ['Domínio territorial', 'Ataque de assinatura', 'Resistência adaptada ao reino'],
        caption: `Render pintado oficial de ${seed.name}.`,
      }
    : locale === 'en'
      ? {
          summary: `${seed.name} is a ${category} presence recorded in ${realm.name}, known by its silhouette and the impact it leaves across the territory.`,
          lore: `Chroniclers of the Six Crowns regard ${seed.name} as a living part of ${realm.name}'s history. Each sighting changes routes, rites, and local decisions.`,
          origin: `It emerged from the ancient forces that shaped ${realm.name}; its origin remains bound to the Crown and the realm's transformations.`,
          behavior: `It guards its territory, reacts to environmental change, and avoids purposeless conflict unless its domain is threatened.`,
          diet: seed.category === 'construct' ? 'It does not feed; it converts heat, minerals, or runic energy.' : seed.category === 'spirit' || seed.category === 'elemental' ? 'It absorbs natural energy and magical residue from its territory.' : 'It feeds on fauna, minerals, or organic matter available in its habitat.',
          weaknesses: ['Disruption of its territorial bond', 'Exposed core or joints', 'Abrupt environmental change'],
          abilities: ['Territorial control', 'Signature attack', 'Realm-adapted resistance'],
          caption: `Official painted render of ${seed.name}.`,
        }
      : {
          summary: `${seed.name} es una presencia ${category} registrada en ${realm.name}, reconocida por su silueta y por el impacto que deja en el territorio.`,
          lore: `Los cronistas de las Seis Coronas consideran a ${seed.name} una parte viva de la historia de ${realm.name}. Cada avistamiento altera rutas, ritos y decisiones locales.`,
          origin: `Surgió de las fuerzas antiguas que dieron forma a ${realm.name}; su origen permanece ligado a la Corona y a las transformaciones del reino.`,
          behavior: `Protege su territorio, reacciona a los cambios ambientales y evita conflictos sin propósito salvo cuando su dominio está amenazado.`,
          diet: seed.category === 'construct' ? 'No se alimenta; convierte calor, minerales o energía rúnica.' : seed.category === 'spirit' || seed.category === 'elemental' ? 'Absorbe energía natural y residuos mágicos de su territorio.' : 'Se alimenta de fauna, minerales o materia orgánica disponible en su hábitat.',
          weaknesses: ['Ruptura del vínculo territorial', 'Núcleo o articulaciones expuestas', 'Cambio ambiental brusco'],
          abilities: ['Dominio territorial', 'Ataque característico', 'Resistencia adaptada al reino'],
          caption: `Render pintado oficial de ${seed.name}.`,
        };
  return {
    id: `${seed.slug}:${locale}`,
    creatureId: seed.slug,
    locale,
    name: seed.name,
    epithet: seed.epithet[index],
    summary: copy.summary,
    lore: copy.lore,
    origin: copy.origin,
    behavior: copy.behavior,
    habitat: realm.habitat[locale],
    diet: copy.diet,
    weaknesses: copy.weaknesses,
    abilities: copy.abilities,
    seoTitle: `${seed.name} — ${seed.epithet[index]} | Bestiary of Asterheim`,
    seoDescription: copy.summary,
    imageAlt: `${seed.name}, ${seed.epithet[index]}, ${realm.name}.`,
    captions: [copy.caption],
    status: 'published',
    version: 1,
    createdAt: STAMP,
    updatedAt: STAMP,
  };
}

function makeCreature(seed: CreatureSeed): Creature {
  const primary = translation(seed, 'pt-br'), realm = creatureRealmProfiles[seed.realmId];
  const point = atlasPoints.find((item) => item.realm === seed.realmId);
  const lightningRule = seed.slug === 'lightning-serpent'
    ? 'Corpo em S; somente a ponta da cauda toca um único penhasco; anatomia totalmente visível; sem pilares atravessando o corpo; ocupação mínima de 80%.'
    : 'Criatura ocupa 75–85% da composição; cenário secundário; anatomia e silhueta inteiramente legíveis.';
  return {
    id: seed.slug,
    slug: seed.slug,
    name: primary.name,
    epithet: primary.epithet,
    realmId: seed.realmId,
    category: seed.category,
    threatLevel: seed.threatLevel,
    summary: primary.summary,
    lore: primary.lore,
    origin: primary.origin,
    behavior: primary.behavior,
    habitat: primary.habitat,
    diet: primary.diet,
    weaknesses: primary.weaknesses,
    abilities: primary.abilities,
    visualDirection: `${realm.visual} ${lightningRule}`,
    silhouette: seed.slug === 'lightning-serpent' ? 'S amplo, contínuo e sem obstruções.' : 'Leitura imediata em miniatura e contraste claro entre corpo e base.',
    materials: realm.materials,
    palette: realm.palette,
    forbiddenElements: ['elementos flutuantes sem suporte', 'efeitos que ocultem anatomia', 'cenário atravessando o corpo', 'high-poly no bundle público'],
    guardianId: realm.guardianId,
    crownId: realm.crownId,
    relatedCharacters: [realm.guardianId],
    relatedEvents: [],
    relatedLocations: point ? [`${point.realm}/${point.slug}`] : [],
    status: seed.status || 'ready',
    featured: Boolean(seed.featured),
    image: FALLBACK_IMAGE,
    imageSourceAvailable: true,
    glbSourceAvailable: true,
    stlSourceAvailable: true,
    prompt: `Collectible resin miniature of ${seed.name}. ${realm.visual} ${lightningRule} Neutral presentation background, integrated base, no floating elements.`,
    technical: {
      multipart: false,
      baseIncluded: true,
      supportStatus: 'unknown',
      lycheeReady: false,
      printStatus: 'unverified',
      notes: 'Master STL and high-poly GLB found in the audited source. Scale, supports, resin volume, print time, and physical validation are pending.',
    },
    habitats: point ? [{ creatureId: seed.slug, locationId: `${point.realm}/${point.slug}`, rarity: seed.threatLevel === 'catastrophic' ? 'legendary' : 'rare', population: 'Não documentada', season: 'Variável', notes: primary.habitat, kind: 'primary' }] : [],
    marketplace: [{ platform: 'creality-cloud', availability: 'production', featured: false }],
    translations: { en: translation(seed, 'en'), es: translation(seed, 'es') },
    createdAt: STAMP,
    updatedAt: STAMP,
  };
}

export const creatures: Creature[] = seeds.map(makeCreature);

export function findCreature(slug: string) {
  return creatures.find((creature) => creature.slug === slug);
}

export function localizeCreature(creature: Creature, locale: Locale): LocalizedCreature {
  const translated = locale === 'pt-br' ? translation(seeds.find((seed) => seed.slug === creature.slug)!, 'pt-br') : creature.translations[locale];
  const resolved = translated || translation(seeds.find((seed) => seed.slug === creature.slug)!, 'pt-br');
  const { translations: _translations, ...base } = creature;
  void _translations;
  return {
    ...base,
    name: resolved.name,
    epithet: resolved.epithet,
    summary: resolved.summary,
    lore: resolved.lore,
    origin: resolved.origin,
    behavior: resolved.behavior,
    habitat: resolved.habitat,
    diet: resolved.diet,
    weaknesses: resolved.weaknesses,
    abilities: resolved.abilities,
    seoTitle: resolved.seoTitle,
    seoDescription: resolved.seoDescription,
    imageAlt: resolved.imageAlt,
    captions: resolved.captions,
    locale,
  };
}

export function localizedCreatures(locale: Locale) {
  return creatures.map((creature) => localizeCreature(creature, locale));
}

export const creatureCoverage = {
  expected: 34,
  registered: creatures.length,
  withImageSource: creatures.filter((item) => item.imageSourceAvailable).length,
  withGlbSource: creatures.filter((item) => item.glbSourceAvailable).length,
  withPublicGlb: creatures.filter((item) => Boolean(item.publicGlbUrl)).length,
  withStlSource: creatures.filter((item) => item.stlSourceAvailable).length,
  withLore: creatures.filter((item) => Boolean(item.lore)).length,
  translated: creatures.filter((item) => item.translations.en?.status === 'published' && item.translations.es?.status === 'published').length,
  published: creatures.filter((item) => item.status === 'published').length,
  marketplaceAvailable: creatures.filter((item) => item.marketplace.some((listing) => listing.availability === 'available')).length,
};

function cmsTranslation(record: CreatureTranslation) {
  return {
    fields: {
      name: record.name,
      epithet: record.epithet,
      summary: record.summary,
      lore: record.lore,
      origin: record.origin,
      behavior: record.behavior,
      habitat: record.habitat,
      diet: record.diet,
      weaknesses: record.weaknesses,
      abilities: record.abilities,
      seoTitle: record.seoTitle,
      seoDescription: record.seoDescription,
      imageAlt: record.imageAlt,
      captions: record.captions,
    },
    status: record.status,
    version: record.version,
    updatedAt: record.updatedAt,
  };
}

export const creatureCmsSeeds = creatures.map((creature) => {
  const { translations, ...base } = creature;
  return {
    ...base,
    translations: {
      en: cmsTranslation(translations.en!),
      es: cmsTranslation(translations.es!),
    },
  };
});

export { categoryNames as creatureCategoryLabels };
