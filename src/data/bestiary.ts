export type Threat = 'Moderate' | 'High' | 'Severe' | 'Cataclysmic';

export interface BeastRecord {
  slug: string;
  name: string;
  scientific: string;
  epithet: string;
  realm: string;
  crown: string;
  guardian: string;
  habitat: string;
  category: string;
  threat: Threat;
  element: string;
  height: string;
  weight: string;
  lifespan: string;
  firstSeen: string;
  image: string;
  position: string;
  chronicle: string;
  behavior: string;
  weaknesses: string[];
  resistances: string[];
  attacks: string[];
  drops: string[];
  history: string;
  curiosities: string;
  legends: string;
  relations: string;
  guardianBond: string;
  worldImpact: string;
}

export const beastCategories = [
  'All records',
  'Ancient Beasts',
  'Forest Creatures',
  'Abyss Creatures',
  'Undead',
  'Dragons',
  'Titans',
  'Demons',
  'Cursed Animals',
  'Legendary Creatures',
  'Mythical Guardians',
] as const;

export const beasts: BeastRecord[] = [
  {
    slug: 'varkhul',
    name: 'Varkhul',
    scientific: 'Varkhulus caldera',
    epithet: 'The Ember-Treader',
    realm: 'Frost Kingdom',
    crown: 'Frost Crown',
    guardian: 'Vhaldris',
    habitat: 'Blackstone passes above the northern tree line',
    category: 'Ancient Beasts',
    threat: 'Severe',
    element: 'Stone · Ember',
    height: '5.8 m at shoulder',
    weight: '19–23 tonnes',
    lifespan: 'Estimated 640 years',
    firstSeen: 'Winter Ledger, 317 A.F.',
    image: '/images/bestiary/varkhul-field-record.webp',
    position: 'The ruined watch of Kaldr, north-east pass',
    chronicle:
      'Few survived the first meeting with the Varkhul. Its footprints remain warm for weeks, even when the mountain snow has buried every road.',
    behavior:
      'It migrates beneath blizzards and tests fortress walls with patient, deliberate blows. It hunts no more than it needs, but remembers every wound.',
    weaknesses: [
      'Throat plates during a roar',
      'Resonant silver bells',
      'Rapid changes in altitude',
    ],
    resistances: ['Common steel', 'Frost and pressure', 'Siege fire'],
    attacks: ['Caldera charge', 'Basalt sweep', 'Ember wake'],
    drops: ['Living basalt shard', 'Varkhul marrow', 'Heat-marked claw'],
    history:
      'Three northern treaties were signed only because neither army dared cross its winter route. The abandoned watchtowers of Kaldr still bear the shape of its shoulders.',
    curiosities:
      'Old guides place bread on warm tracks; by dawn it rises without flame.',
    legends:
      'Some say the first Varkhul slept beneath the Frost Crown before Vhaldris claimed it.',
    relations:
      'Carrion drakes follow at a distance. Frost wolves become silent when it passes.',
    guardianBond:
      'Vhaldris diverts it from the Archive Glacier, never commands it.',
    worldImpact:
      'Closes northern trade for six weeks each winter and has determined the borders of three baronies.',
  },
  {
    slug: 'aegis',
    name: 'Aegis',
    scientific: 'Aquila regalis aetheris',
    epithet: 'The First Sky King',
    realm: 'Stormreach',
    crown: 'Storm Crown',
    guardian: 'Vaelor',
    habitat: 'Lightning spires and high basalt nests',
    category: 'Mythical Guardians',
    threat: 'High',
    element: 'Storm · Iron',
    height: '4.2 m',
    weight: '1.1 tonnes',
    lifespan: 'Over 300 years',
    firstSeen: 'Pilgrim Sky-Charts, 88 A.F.',
    image: '/images/characters/aegis.png',
    position: 'The shattered western aerie',
    chronicle:
      'When Aegis circles a battlefield, banners fall before the first soldier does. Even thunder appears to wait for its cry.',
    behavior:
      'Territorial, observant and fiercely protective of old Stormreach roads.',
    weaknesses: ['Grounding chains', 'Wing joints'],
    resistances: ['Lightning', 'Gale force'],
    attacks: ['Skyfall', 'Crown talon', 'Thunder cry'],
    drops: ['Royal pinion', 'Storm glass'],
    history:
      'Its migrations once decided the sailing season of the eastern fleets.',
    curiosities: 'It collects broken spearheads, never coins.',
    legends: 'The first crown was carried between its talons.',
    relations: 'Hunts cliff drakes; tolerates white pegasi.',
    guardianBond: 'Vaelor reads its flight as an omen.',
    worldImpact:
      'Protects coastal caravans when Stormreach keeps its ancient offerings.',
  },
  {
    slug: 'fenrir',
    name: 'Fenrir',
    scientific: 'Lupus noctivorus',
    epithet: 'The Moon Devourer',
    realm: 'Frost Kingdom',
    crown: 'Frost Crown',
    guardian: 'Vhaldris',
    habitat: 'Frozen grave-forests and royal cairns',
    category: 'Cursed Animals',
    threat: 'Severe',
    element: 'Frost · Shadow',
    height: '4.9 m',
    weight: '2.8 tonnes',
    lifespan: 'Unknown',
    firstSeen: 'The Black Moon Chronicle',
    image: '/images/characters/fenrir.png',
    position: 'Cairns beyond the pale forest',
    chronicle:
      'No hunter has heard Fenrir approach. They hear only the ravens leaving, and then the snow beneath them begins to darken.',
    behavior:
      'Follows royal bloodlines across generations and never crosses running meltwater.',
    weaknesses: ['Sun-forged bronze', 'Running water'],
    resistances: ['Cold', 'Fear rites'],
    attacks: ['Moonless pounce', 'Grave howl', 'Crown rend'],
    drops: ['Night-fur', 'Hollow horn'],
    history:
      'Its pursuit ended two northern dynasties without ever entering a city.',
    curiosities: 'Its shadow points toward the moon.',
    legends: 'Fenrir swallowed a fragment of the winter moon.',
    relations: 'Ravens announce its wake; lesser wolves abandon territory.',
    guardianBond: 'Vhaldris contains its hunger during eclipses.',
    worldImpact:
      'Royal travel stops during black moons; succession rites are held behind running water.',
  },
  {
    slug: 'aster',
    name: 'Aster',
    scientific: 'Cervus mundiradix',
    epithet: 'The World Heart',
    realm: 'Elder Forest',
    crown: 'Oak Crown',
    guardian: 'Yggor',
    habitat: 'Root sanctuaries where no axe will sound',
    category: 'Forest Creatures',
    threat: 'Moderate',
    element: 'Life · Amber',
    height: '3.7 m',
    weight: '890 kg',
    lifespan: 'Reborn every 90 years',
    firstSeen: 'Green Testament, First Leaf',
    image: '/images/characters/aster.png',
    position: 'Moving with the Worldroot bloom',
    chronicle:
      'Where Aster rests, old graves flower. Those who raise a bow against it discover roots already wound around their boots.',
    behavior:
      'Gentle until sacred growth is harmed; travels with the hidden seasons.',
    weaknesses: ['Blight salt', 'Iron struck from dead trees'],
    resistances: ['Poison', 'Nature magic'],
    attacks: ['Rootbind', 'Antler bloom', 'Verdant pulse'],
    drops: ['Never harvested; fallen antler only'],
    history: 'Peace routes through Elder Forest follow its migration.',
    curiosities: 'Flowers on its antlers match plants extinct elsewhere.',
    legends: 'Its heartbeat is the forest heard from below.',
    relations: 'Shelters small spirits and orphaned beasts.',
    guardianBond: 'Yggor protects its cycle, not its body.',
    worldImpact:
      'Its path determines harvests, pilgrimage and the legal borders of woodland clans.',
  },
  {
    slug: 'skywind',
    name: 'Skywind',
    scientific: 'Equus alaris infinitum',
    epithet: 'Sovereign of the Endless Sky',
    realm: 'Stormreach',
    crown: 'Storm Crown',
    guardian: 'Vaelor',
    habitat: 'Cloud roads above the eastern cliffs',
    category: 'Legendary Creatures',
    threat: 'High',
    element: 'Wind · Aether',
    height: '2.6 m',
    weight: '720 kg',
    lifespan: '180 years',
    firstSeen: 'Mariner’s Oath, 209 A.F.',
    image: '/images/characters/skywind.png',
    position: 'The cloud-break above High Vael',
    chronicle:
      'Sailors know Skywind by the sudden stillness before its wings open. For one breath, even the sea forgets to move.',
    behavior: 'Appears before impossible journeys and refuses all riders.',
    weaknesses: ['Black iron nets', 'Confined stone'],
    resistances: ['Wind', 'Falling'],
    attacks: ['Gale stride', 'Aether kick', 'White squall'],
    drops: ['Naturally shed sky-feather'],
    history:
      'One sighting redirected the evacuation of High Vael and saved nine hundred lives.',
    curiosities: 'Its hoofprints appear on vertical stone.',
    legends: 'The horizon is the trail left by its first flight.',
    relations: 'Aegis yields the upper winds to it.',
    guardianBond:
      'Vaelor never summons Skywind; he asks the storm to make room.',
    worldImpact:
      'Its appearances alter expedition routes and are treated as binding omens by pilots.',
  },
];

export const realmRecords = [
  {
    name: 'Ironhold',
    count: 17,
    danger: 'High',
    dominant: 'Chainmaw',
    x: 25,
    y: 48,
  },
  {
    name: 'Frost Kingdom',
    count: 23,
    danger: 'Severe',
    dominant: 'Varkhul',
    x: 47,
    y: 19,
  },
  {
    name: 'Elder Forest',
    count: 31,
    danger: 'Veiled',
    dominant: 'Aster',
    x: 44,
    y: 51,
  },
  {
    name: 'Stormreach',
    count: 19,
    danger: 'High',
    dominant: 'Aegis',
    x: 76,
    y: 29,
  },
  {
    name: 'Kingdom of the Abyss',
    count: 28,
    danger: 'Cataclysmic',
    dominant: 'Thalassor',
    x: 77,
    y: 70,
  },
  {
    name: 'Scorched Wastes',
    count: 14,
    danger: 'Cataclysmic',
    dominant: 'Ash Titan',
    x: 43,
    y: 79,
  },
];
