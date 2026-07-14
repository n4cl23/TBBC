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
const realmPlaceholder = (realmId: RealmId) => `/placeholders/creatures/${realmId === 'kingdom-of-the-abyss' ? 'abyss' : realmId}.webp`;
const creatureImage = (slug: string, role: 'hero' | 'card' | 'thumbnail') => `/images/creatures/${slug}/${role}.webp`;

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

const editorialSummaries: Record<string, [string, string, string]> = {
  'ice-wolves': ['Entre as geleiras setentrionais, a alcateia de cristal caça em silêncio, seguindo vibrações sob a neve antes que a presa perceba sua aproximação.', 'Across the northern glaciers, the crystal pack hunts in silence, following vibrations beneath the snow before its prey senses the pursuit.', 'Entre los glaciares septentrionales, la manada de cristal caza en silencio, siguiendo vibraciones bajo la nieve antes de que la presa advierta su llegada.'],
  'frost-troll': ['O Quebra-Geleiras abre passagens com os punhos e transforma fendas ancestrais em covis onde o frio conserva troféus de eras esquecidas.', 'The Glacier Breaker opens passages with its fists and turns ancient crevasses into lairs where cold preserves trophies from forgotten ages.', 'El Rompeglaciares abre pasos con los puños y convierte grietas ancestrales en guaridas donde el frío conserva trofeos de eras olvidadas.'],
  'crystal-bear': ['Cristais crescem sobre a pelagem do urso como uma armadura viva, tilintando segundos antes de sua investida romper o branco da paisagem.', 'Crystals grow across the bear’s fur like living armor, chiming seconds before its charge tears through the white landscape.', 'Cristales crecen sobre el pelaje del oso como una armadura viva y tintinean segundos antes de que su carga rompa el paisaje blanco.'],
  'frost-drake': ['O Frost Drake raspa as asas nas escarpas para cobri-las de geada cortante, depois mergulha pelos desfiladeiros sem produzir uma única sombra.', 'The Frost Drake drags its wings across the cliffs to coat them in cutting rime, then dives through the ravines without casting a shadow.', 'El Frost Drake roza sus alas contra los riscos para cubrirlas de escarcha cortante y luego se lanza por los desfiladeros sin proyectar sombra.'],
  'snow-wraith': ['Quando a nevasca apaga os marcos do caminho, o cavaleiro sem degelo surge entre os flocos e conduz viajantes para trilhas que já não existem.', 'When the blizzard erases every trail marker, the Thawless Rider appears among the flakes and leads travelers onto roads that no longer exist.', 'Cuando la ventisca borra los hitos del camino, el Jinete sin Deshielo aparece entre los copos y guía a los viajeros hacia rutas que ya no existen.'],
  'frost-mammoth': ['O peregrino de marfim percorre a mesma rota há séculos, carregando no dorso líquens raros e fragmentos de santuários soterrados.', 'The Ivory Pilgrim has followed the same route for centuries, carrying rare lichens and fragments of buried sanctuaries upon its back.', 'El Peregrino de Marfil recorre la misma ruta desde hace siglos, llevando sobre el lomo líquenes raros y fragmentos de santuarios sepultados.'],
  'ice-giant': ['Cada passo do Martelo do Norte compacta a neve em muralhas; quando ele ergue a arma, avalanches inteiras aguardam o golpe.', 'Every step of the Hammer of the North compacts snow into walls; when it raises its weapon, entire avalanches wait for the blow.', 'Cada paso del Martillo del Norte compacta la nieve en murallas; cuando alza el arma, avalanchas enteras esperan el golpe.'],
  'tempest-hawk': ['O falcão lê correntes invisíveis acima de Stormreach e desce apenas quando um clarão revela a presa contra as nuvens.', 'The hawk reads invisible currents above Stormreach and descends only when a flash outlines its prey against the clouds.', 'El halcón lee corrientes invisibles sobre Stormreach y desciende solo cuando un relámpago recorta a su presa contra las nubes.'],
  'storm-griffin': ['O vigia das torres circula os obeliscos de bronze e decide, pelo som do vento nas penas, quem pode cruzar as rotas altas.', 'The Tower Warden circles the bronze obelisks and judges, by the sound of wind through its feathers, who may cross the high roads.', 'El Vigía de las Torres rodea los obeliscos de bronce y decide, por el sonido del viento entre sus plumas, quién puede cruzar las rutas altas.'],
  'lightning-serpent': ['A serpente desenha um único arco luminoso entre nuvens e penhascos; o trovão chega somente depois que sua cauda abandona a pedra.', 'The serpent draws a single luminous arc between cloud and cliff; thunder arrives only after its tail leaves the stone.', 'La serpiente dibuja un único arco luminoso entre nubes y acantilados; el trueno llega solo después de que su cola abandona la roca.'],
  'thunder-golem': ['Forjado para permanecer imóvel, o golem desperta quando as torres perdem carga e devolve à cidade a tempestade acumulada em seu núcleo.', 'Forged to remain motionless, the golem wakes when the towers lose charge and returns the storm stored inside its core to the city.', 'Forjado para permanecer inmóvil, el gólem despierta cuando las torres pierden carga y devuelve a la ciudad la tormenta acumulada en su núcleo.'],
  'sky-whale': ['A baleia celeste navega sob as nuvens pesadas, recolhendo água e sementes no ventre antes de derramá-las sobre vales distantes.', 'The sky whale sails beneath heavy clouds, gathering water and seeds in its belly before releasing them over distant valleys.', 'La ballena celeste navega bajo nubes pesadas, recoge agua y semillas en su vientre y las libera sobre valles lejanos.'],
  'storm-dragon': ['A Coroa da Tormenta não persegue intrusos: ela fecha o céu ao redor deles até que toda direção pareça levar ao mesmo relâmpago.', 'The Tempest Crown does not chase intruders; it closes the sky around them until every direction seems to lead into the same lightning strike.', 'La Corona de la Tormenta no persigue intrusos; cierra el cielo a su alrededor hasta que toda dirección parece conducir al mismo relámpago.'],
  'iron-golem': ['O Juramento Forjado patrulha muralhas que já foram reconstruídas ao seu redor, obedecendo a uma ordem gravada antes da atual dinastia.', 'The Forged Oath patrols walls that have been rebuilt around it, obeying an order engraved before the current dynasty.', 'El Juramento Forjado patrulla murallas reconstruidas a su alrededor y obedece una orden grabada antes de la dinastía actual.'],
  'cave-troll': ['O Devorador de Minas escuta picaretas através da rocha e segue o eco até apagar lanternas, trilhos e qualquer saída conhecida.', 'The Mine Eater hears pickaxes through stone and follows the echo until lanterns, rails, and every known exit go dark.', 'El Devorador de Minas escucha picos a través de la roca y sigue el eco hasta apagar lámparas, rieles y toda salida conocida.'],
  'forge-beast': ['A fera da fornalha recolhe escória incandescente entre as mandíbulas e a comprime em placas novas para reparar o próprio corpo.', 'The Furnace Beast gathers glowing slag in its jaws and presses it into new plates to repair its own body.', 'La Bestia de la Forja recoge escoria ardiente entre sus mandíbulas y la comprime en placas nuevas para reparar su propio cuerpo.'],
  'stone-giant': ['O Pilar Errante atravessa túneis sem se curvar; mineiros reconhecem sua aproximação quando a poeira sobe do chão antes do primeiro passo.', 'The Wandering Pillar crosses tunnels without bending; miners know it approaches when dust rises before the first footfall.', 'El Pilar Errante atraviesa túneles sin inclinarse; los mineros reconocen su llegada cuando el polvo se eleva antes del primer paso.'],
  'lava-drake': ['A Asa da Forja repousa dentro das chaminés vulcânicas e emerge coberta por uma película de magma que endurece durante o voo.', 'The Forge Wing rests inside volcanic chimneys and emerges beneath a film of magma that hardens during flight.', 'El Ala de la Forja descansa dentro de chimeneas volcánicas y emerge cubierta por una película de magma que endurece durante el vuelo.'],
  'ent': ['O Tronco Desperto leva décadas para atravessar uma clareira, mas nenhuma árvore cai em seu caminho: raízes e pedras cedem antes de sua chegada.', 'The Waking Trunk takes decades to cross a clearing, yet no tree falls in its path; roots and stones yield before it arrives.', 'El Tronco Despierto tarda décadas en cruzar un claro, pero ningún árbol cae a su paso: raíces y piedras ceden antes de su llegada.'],
  'dryad': ['A Voz da Seiva muda de rosto com as estações e fala através de folhas feridas, oferecendo cura somente a quem devolve algo vivo à floresta.', 'The Voice of Sap changes face with the seasons and speaks through wounded leaves, offering healing only to those who return something living to the forest.', 'La Voz de la Savia cambia de rostro con las estaciones y habla a través de hojas heridas, ofreciendo cura solo a quien devuelve algo vivo al bosque.'],
  'ancient-wolf': ['O caçador das raízes não segue cheiro nem pegadas; ele encontra a presa pelas interrupções que cada movimento provoca no silêncio do bosque.', 'The Root Hunter follows neither scent nor tracks; it finds prey through the interruptions every movement makes in the forest’s silence.', 'El Cazador de las Raíces no sigue olores ni huellas; encuentra a su presa por las interrupciones que cada movimiento provoca en el silencio del bosque.'],
  'forest-spirit': ['O Sussurro Verde reúne luz entre galhos ocos e assume formas diferentes para afastar lenhadores, crianças perdidas ou exércitos invasores.', 'The Green Whisper gathers light inside hollow branches and takes different forms to turn away loggers, lost children, or invading armies.', 'El Susurro Verde reúne luz entre ramas huecas y adopta formas distintas para alejar leñadores, niños perdidos o ejércitos invasores.'],
  'moss-colossus': ['A Ruína que Caminha carrega muros e altares sob o musgo; quando se ergue, arqueólogos perdem um sítio e a floresta ganha uma montanha.', 'The Walking Ruin carries walls and altars beneath its moss; when it rises, archaeologists lose a site and the forest gains a mountain.', 'La Ruina que Camina lleva muros y altares bajo el musgo; cuando se alza, los arqueólogos pierden un sitio y el bosque gana una montaña.'],
  'treant-elder': ['O Primeiro Anel conserva nomes em cada camada do tronco e convoca as árvores mais antigas quando um juramento feito no bosque é quebrado.', 'The First Ring keeps names in every layer of its trunk and summons the oldest trees when an oath made in the grove is broken.', 'El Primer Anillo conserva nombres en cada capa de su tronco y convoca a los árboles más antiguos cuando se rompe un juramento hecho en el bosque.'],
  'kraken': ['O Sonho das Profundezas permanece imóvel sob ruínas submersas até que sinos, âncoras ou sangue façam seus tentáculos confundirem memória com fome.', 'The Dream Below lies still beneath drowned ruins until bells, anchors, or blood make its tentacles confuse memory with hunger.', 'El Sueño de las Profundidades permanece inmóvil bajo ruinas sumergidas hasta que campanas, anclas o sangre hacen que sus tentáculos confundan memoria con hambre.'],
  'sea-serpent': ['A Espinha da Maré acompanha correntes frias junto ao fundo e sobe em espiral quando navios atravessam seu caminho migratório.', 'The Spine of the Tide follows cold currents along the seabed and spirals upward when ships cross its migration route.', 'La Espina de la Marea sigue corrientes frías junto al fondo y asciende en espiral cuando los barcos cruzan su ruta migratoria.'],
  'leviathan': ['A Montanha Submersa passa anos coberta por coral; somente o deslocamento das marés revela que o arquipélago marcado nos mapas está respirando.', 'The Sunken Mountain spends years beneath coral; only the shifting tides reveal that the archipelago drawn on maps is breathing.', 'La Montaña Sumergida pasa años cubierta de coral; solo el movimiento de las mareas revela que el archipiélago dibujado en los mapas está respirando.'],
  'deep-horror': ['O habitante sem nome observa por olhos distribuídos em torno do corpo e apaga sua bioluminescência no instante em que percebe ter sido visto.', 'The Nameless Dweller watches through eyes set around its body and extinguishes its bioluminescence the instant it realizes it has been seen.', 'El Habitante sin Nombre observa con ojos distribuidos alrededor del cuerpo y apaga su bioluminiscencia en el instante en que comprende que ha sido visto.'],
  'coral-titan': ['O Jardim de Pedra avança lentamente pelo leito oceânico, oferecendo abrigo a cardumes até que uma ameaça desperte suas mãos de recife.', 'The Stone Garden moves slowly across the ocean floor, sheltering shoals until a threat awakens its reef-shaped hands.', 'El Jardín de Piedra avanza lentamente por el fondo oceánico, dando refugio a bancos de peces hasta que una amenaza despierta sus manos de arrecife.'],
  'fire-drake': ['A Brasa Alada caça rente às dunas de cinza, usando o próprio calor para erguer correntes que sustentam seus mergulhos longos.', 'The Winged Ember hunts low over ash dunes, using its own heat to raise currents that sustain its long dives.', 'La Brasa Alada caza al ras de las dunas de ceniza y usa su propio calor para elevar corrientes que sostienen sus largos descensos.'],
  'ash-demon': ['O Príncipe da Cinza reúne fuligem em torno de ossos antigos e muda de tamanho conforme encontra memórias de incêndios maiores.', 'The Ash Prince gathers soot around ancient bones and changes size as it discovers memories of greater fires.', 'El Príncipe de la Ceniza reúne hollín alrededor de huesos antiguos y cambia de tamaño al encontrar recuerdos de incendios mayores.'],
  'sand-worm': ['A Boca das Dunas percebe passos a quilômetros e altera o relevo por baixo da areia, conduzindo caravanas para o centro de sua emboscada.', 'The Mouth of the Dunes senses footsteps from miles away and reshapes the ground beneath the sand, steering caravans into the center of its ambush.', 'La Boca de las Dunas percibe pasos a kilómetros y altera el relieve bajo la arena, guiando caravanas hacia el centro de su emboscada.'],
  'phoenix': ['A Última Chama renasce apenas quando o fogo ao redor se apaga por completo, levando nas novas penas as cores do lugar onde morreu.', 'The Last Flame is reborn only after every surrounding fire has gone out, carrying in its new feathers the colors of the place where it died.', 'La Última Llama renace solo cuando todo fuego cercano se apaga por completo y lleva en sus nuevas plumas los colores del lugar donde murió.'],
  'magma-titan': ['O Coração da Caldeira permanece fundido sob uma crosta de obsidiana; cada movimento abre rios breves que redesenham os Ermos Abrasados.', 'The Caldera Heart remains molten beneath an obsidian crust; every movement opens brief rivers that redraw the Scorched Wastes.', 'El Corazón de la Caldera permanece fundido bajo una corteza de obsidiana; cada movimiento abre ríos breves que redibujan los Yermos Abrasados.'],
};

const categoryNames: Record<Locale, Record<CreatureCategory, string>> = {
  'pt-br': { beast: 'besta', dragon: 'dragão', spirit: 'espírito', construct: 'constructo', colossus: 'colosso', giant: 'gigante', aberration: 'aberração', elemental: 'elemental', predator: 'predador', guardian: 'guardião' },
  en: { beast: 'beast', dragon: 'dragon', spirit: 'spirit', construct: 'construct', colossus: 'colossus', giant: 'giant', aberration: 'aberration', elemental: 'elemental', predator: 'predator', guardian: 'guardian' },
  es: { beast: 'bestia', dragon: 'dragón', spirit: 'espíritu', construct: 'constructo', colossus: 'coloso', giant: 'gigante', aberration: 'aberración', elemental: 'elemental', predator: 'depredador', guardian: 'guardián' },
};

function narrative(seed: CreatureSeed, locale: Locale, summary: string) {
  const realm = creatureRealmProfiles[seed.realmId];
  if (locale === 'pt-br') {
    return {
      summary,
      lore: `${summary} Seu epíteto nasceu de testemunhos preservados por cartógrafos, caçadores e guardiões que sobreviveram ao mesmo território.`,
      behavior: `Seus movimentos seguem os ciclos de ${realm.name}: observa primeiro, delimita o território e só então revela o recurso que tornou a espécie memorável.`,
      relationToRealm: `${seed.name} participa do equilíbrio de ${realm.name}; sua ausência altera rotas, presas e ritos ligados à Coroa.`,
      historicalRecord: `O registro mais confiável combina marcas no terreno, relatos independentes e o estudo da anatomia representada no arquivo oficial.`,
    };
  }
  if (locale === 'en') {
    return {
      summary,
      lore: `${summary} Its epithet grew from accounts preserved by cartographers, hunters, and guardians who survived the same territory.`,
      behavior: `Its movements follow the cycles of ${realm.name}: it observes first, marks its territory, and only then reveals the trait that made the species memorable.`,
      relationToRealm: `${seed.name} belongs to the balance of ${realm.name}; its absence changes routes, prey, and rites bound to the Crown.`,
      historicalRecord: `The most reliable record combines marks in the terrain, independent accounts, and study of the anatomy shown in the official archive.`,
    };
  }
  return {
    summary,
    lore: `${summary} Su epíteto nació de testimonios conservados por cartógrafos, cazadores y guardianes que sobrevivieron al mismo territorio.`,
    behavior: `Sus movimientos siguen los ciclos de ${realm.name}: primero observa, delimita el territorio y solo entonces revela el recurso que hizo memorable a la especie.`,
    relationToRealm: `${seed.name} forma parte del equilibrio de ${realm.name}; su ausencia altera rutas, presas y ritos vinculados a la Corona.`,
    historicalRecord: `El registro más fiable combina marcas en el terreno, relatos independientes y el estudio de la anatomía representada en el archivo oficial.`,
  };
}

function translation(seed: CreatureSeed, locale: Locale): CreatureTranslation {
  const realm = creatureRealmProfiles[seed.realmId], category = categoryNames[locale][seed.category];
  const index = locale === 'pt-br' ? 0 : locale === 'en' ? 1 : 2;
  const refined = narrative(seed, locale, editorialSummaries[seed.slug][index]);
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
    summary: refined.summary,
    lore: refined.lore,
    origin: copy.origin,
    behavior: refined.behavior,
    habitat: realm.habitat[locale],
    diet: copy.diet,
    weaknesses: copy.weaknesses,
    abilities: copy.abilities,
    seoTitle: `${seed.name} — ${seed.epithet[index]} | Bestiary of Asterheim`,
    seoDescription: refined.summary,
    imageAlt: `${seed.name}, ${seed.epithet[index]}, ${realm.name}.`,
    captions: [copy.caption],
    relationToRealm: refined.relationToRealm,
    historicalRecord: refined.historicalRecord,
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
    editorialStatus: 'published',
    productionStatus: 'modeling',
    assetReadiness: ['image-ready'],
    featured: Boolean(seed.featured),
    image: creatureImage(seed.slug, 'hero'),
    heroImage: creatureImage(seed.slug, 'hero'),
    cardImage: creatureImage(seed.slug, 'card'),
    thumbnail: creatureImage(seed.slug, 'thumbnail'),
    gallery: [{ id: `${seed.slug}:painted`, type: 'painted', url: creatureImage(seed.slug, 'hero'), mimeType: 'image/webp', width: 1600, height: 1600, published: true }],
    fallbackImage: realmPlaceholder(seed.realmId),
    usesPlaceholder: false,
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
  const {
    translations: _translations,
    prompt: _prompt,
    visualDirection: _visualDirection,
    silhouette: _silhouette,
    forbiddenElements: _forbiddenElements,
    ...base
  } = creature;
  void [_translations, _prompt, _visualDirection, _silhouette, _forbiddenElements];
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
    relationToRealm: resolved.relationToRealm,
    historicalRecord: resolved.historicalRecord,
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
  published: creatures.filter((item) => item.editorialStatus === 'published').length,
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
      relationToRealm: record.relationToRealm,
      historicalRecord: record.historicalRecord,
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
