import type { Locale } from '@/lib/i18n';
import { beasts, type BeastRecord, type Threat } from './bestiary';

type LocalizedBeast = Partial<
  Omit<BeastRecord, 'slug' | 'scientific' | 'image' | 'category' | 'threat'>
>;

export const categoryLabels: Record<Locale, Record<string, string>> = {
  'pt-br': {
    'All records': 'Todos os registros',
    'Ancient Beasts': 'Bestas Antigas',
    'Forest Creatures': 'Criaturas da Floresta',
    'Abyss Creatures': 'Criaturas do Abismo',
    Undead: 'Mortos-vivos',
    Dragons: 'Dragões',
    Titans: 'Titãs',
    Demons: 'Demônios',
    'Cursed Animals': 'Animais Amaldiçoados',
    'Legendary Creatures': 'Criaturas Lendárias',
    'Mythical Guardians': 'Guardiões Míticos',
  },
  en: Object.fromEntries(
    [
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
    ].map((value) => [value, value]),
  ),
  es: {
    'All records': 'Todos los registros',
    'Ancient Beasts': 'Bestias Antiguas',
    'Forest Creatures': 'Criaturas del Bosque',
    'Abyss Creatures': 'Criaturas del Abismo',
    Undead: 'No muertos',
    Dragons: 'Dragones',
    Titans: 'Titanes',
    Demons: 'Demonios',
    'Cursed Animals': 'Animales Malditos',
    'Legendary Creatures': 'Criaturas Legendarias',
    'Mythical Guardians': 'Guardianes Míticos',
  },
};

export const threatLabels: Record<Locale, Record<Threat | 'Veiled', string>> = {
  'pt-br': {
    Moderate: 'Moderada',
    High: 'Alta',
    Severe: 'Severa',
    Cataclysmic: 'Cataclísmica',
    Veiled: 'Velado',
  },
  en: {
    Moderate: 'Moderate',
    High: 'High',
    Severe: 'Severe',
    Cataclysmic: 'Cataclysmic',
    Veiled: 'Veiled',
  },
  es: {
    Moderate: 'Moderada',
    High: 'Alta',
    Severe: 'Severa',
    Cataclysmic: 'Catastrófica',
    Veiled: 'Velado',
  },
};

export const realmLabels: Record<Locale, Record<string, string>> = {
  'pt-br': {
    Ironhold: 'Ironhold',
    'Frost Kingdom': 'Reino do Gelo',
    'Elder Forest': 'Floresta Anciã',
    Stormreach: 'Stormreach',
    'Kingdom of the Abyss': 'Reino do Abismo',
    'Scorched Wastes': 'Ermos Abrasados',
  },
  en: {
    Ironhold: 'Ironhold',
    'Frost Kingdom': 'Frost Kingdom',
    'Elder Forest': 'Elder Forest',
    Stormreach: 'Stormreach',
    'Kingdom of the Abyss': 'Kingdom of the Abyss',
    'Scorched Wastes': 'Scorched Wastes',
  },
  es: {
    Ironhold: 'Ironhold',
    'Frost Kingdom': 'Reino del Hielo',
    'Elder Forest': 'Bosque Antiguo',
    Stormreach: 'Stormreach',
    'Kingdom of the Abyss': 'Reino del Abismo',
    'Scorched Wastes': 'Yermos Abrasados',
  },
};

const translations: Record<'pt-br' | 'es', Record<string, LocalizedBeast>> = {
  'pt-br': {
    varkhul: {
      epithet: 'O Caminhante das Brasas',
      realm: 'Reino do Gelo',
      crown: 'Coroa do Gelo',
      habitat: 'Passagens de pedra negra acima da linha de árvores do norte',
      element: 'Pedra · Brasa',
      height: '5,8 m até o ombro',
      weight: '19–23 toneladas',
      lifespan: 'Estimados 640 anos',
      firstSeen: 'Registro de Inverno, 317 D.F.',
      position: 'A torre arruinada de Kaldr, passagem nordeste',
      chronicle:
        'Poucos sobreviveram ao primeiro encontro com o Varkhul. Suas pegadas permanecem quentes por semanas, mesmo quando a neve da montanha já cobriu todas as estradas.',
      behavior:
        'Migra sob nevascas e testa muralhas com golpes pacientes e deliberados. Não caça além do necessário, mas se lembra de cada ferida.',
      weaknesses: [
        'Placas da garganta durante o rugido',
        'Sinos de prata ressonantes',
        'Mudanças rápidas de altitude',
      ],
      resistances: ['Aço comum', 'Gelo e pressão', 'Fogo de cerco'],
      attacks: [
        'Investida da caldeira',
        'Varredura de basalto',
        'Rastro de brasas',
      ],
      drops: [
        'Fragmento de basalto vivo',
        'Medula de Varkhul',
        'Garra marcada pelo calor',
      ],
      history:
        'Três tratados do norte só foram assinados porque nenhum exército ousou cruzar sua rota de inverno. As torres abandonadas de Kaldr ainda carregam a forma de seus ombros.',
      curiosities:
        'Guias antigos deixam pão sobre pegadas quentes; ao amanhecer ele cresce sem chama.',
      legends:
        'Dizem que o primeiro Varkhul dormia sob a Coroa do Gelo antes de Vhaldris reclamá-la.',
      relations:
        'Dragões carniceiros seguem à distância. Lobos do gelo ficam em silêncio quando ele passa.',
      guardianBond:
        'Vhaldris o desvia da Geleira do Arquivo, mas nunca o comanda.',
      worldImpact:
        'Fecha o comércio do norte por seis semanas a cada inverno e definiu as fronteiras de três baronatos.',
    },
    aegis: {
      epithet: 'O Primeiro Rei dos Céus',
      habitat: 'Agulhas de relâmpago e ninhos altos de basalto',
      crown: 'Coroa da Tempestade',
      element: 'Tempestade · Ferro',
      height: '4,2 m',
      weight: '1,1 tonelada',
      lifespan: 'Mais de 300 anos',
      firstSeen: 'Cartas Celestes dos Peregrinos, 88 D.F.',
      position: 'O ninho ocidental despedaçado',
      chronicle:
        'Quando Aegis circula um campo de batalha, os estandartes caem antes do primeiro soldado. Até o trovão parece esperar por seu grito.',
      behavior:
        'Territorial, observador e ferozmente protetor das antigas estradas de Stormreach.',
      weaknesses: ['Correntes de aterramento', 'Articulações das asas'],
      resistances: ['Relâmpagos', 'Força de vendaval'],
      attacks: ['Queda celeste', 'Garra da coroa', 'Grito do trovão'],
      drops: ['Pena real', 'Vidro de tempestade'],
      history:
        'Suas migrações já determinaram a temporada de navegação das frotas orientais.',
      curiosities: 'Coleciona pontas de lança quebradas, nunca moedas.',
      legends: 'A primeira coroa foi carregada entre suas garras.',
      relations: 'Caça dragões de penhasco; tolera pégasos brancos.',
      guardianBond: 'Vaelor lê seu voo como um presságio.',
      worldImpact:
        'Protege caravanas costeiras quando Stormreach mantém suas antigas oferendas.',
    },
    fenrir: {
      epithet: 'O Devorador da Lua',
      realm: 'Reino do Gelo',
      crown: 'Coroa do Gelo',
      habitat: 'Florestas-túmulo congeladas e cairns reais',
      element: 'Gelo · Sombra',
      height: '4,9 m',
      weight: '2,8 toneladas',
      lifespan: 'Desconhecida',
      firstSeen: 'A Crônica da Lua Negra',
      position: 'Cairns além da floresta pálida',
      chronicle:
        'Nenhum caçador ouviu Fenrir se aproximar. Eles ouvem apenas os corvos partindo, e então a neve sob seus pés começa a escurecer.',
      behavior:
        'Segue linhagens reais através das gerações e nunca cruza água corrente de degelo.',
      weaknesses: ['Bronze forjado ao sol', 'Água corrente'],
      resistances: ['Frio', 'Ritos de medo'],
      attacks: ['Salto sem lua', 'Uivo da sepultura', 'Rasgo da coroa'],
      drops: ['Pelo noturno', 'Chifre oco'],
      history:
        'Sua perseguição encerrou duas dinastias do norte sem jamais entrar em uma cidade.',
      curiosities: 'Sua sombra aponta para a lua.',
      legends: 'Fenrir engoliu um fragmento da lua de inverno.',
      relations:
        'Corvos anunciam seu rastro; lobos menores abandonam o território.',
      guardianBond: 'Vhaldris contém sua fome durante os eclipses.',
      worldImpact:
        'Viagens reais cessam durante luas negras; ritos de sucessão ocorrem atrás de água corrente.',
    },
    aster: {
      epithet: 'O Coração do Mundo',
      realm: 'Floresta Anciã',
      crown: 'Coroa de Carvalho',
      habitat: 'Santuários de raízes onde nenhum machado ressoa',
      element: 'Vida · Âmbar',
      height: '3,7 m',
      weight: '890 kg',
      lifespan: 'Renasce a cada 90 anos',
      firstSeen: 'Testamento Verde, Primeira Folha',
      position: 'Movendo-se com a floração da Raiz do Mundo',
      chronicle:
        'Onde Aster repousa, túmulos antigos florescem. Quem ergue um arco contra ele descobre raízes já enroladas aos pés.',
      behavior:
        'Gentil até que o crescimento sagrado seja ferido; viaja com as estações ocultas.',
      weaknesses: ['Sal da praga', 'Ferro extraído de árvores mortas'],
      resistances: ['Veneno', 'Magia natural'],
      attacks: [
        'Prisão de raízes',
        'Florescer dos chifres',
        'Pulso verdejante',
      ],
      drops: ['Nunca colhido; apenas galhadas caídas'],
      history: 'Rotas de paz pela Floresta Anciã acompanham sua migração.',
      curiosities:
        'As flores em seus chifres correspondem a plantas extintas em outros lugares.',
      legends: 'Seu coração é a floresta ouvida de baixo.',
      relations: 'Abriga pequenos espíritos e feras órfãs.',
      guardianBond: 'Yggor protege seu ciclo, não seu corpo.',
      worldImpact:
        'Seu caminho determina colheitas, peregrinações e as fronteiras legais dos clãs da floresta.',
    },
    skywind: {
      epithet: 'Soberano do Céu Infinito',
      crown: 'Coroa da Tempestade',
      habitat: 'Estradas de nuvens acima dos penhascos orientais',
      element: 'Vento · Éter',
      height: '2,6 m',
      weight: '720 kg',
      lifespan: '180 anos',
      firstSeen: 'Juramento do Marinheiro, 209 D.F.',
      position: 'A abertura nas nuvens sobre High Vael',
      chronicle:
        'Marinheiros reconhecem Skywind pelo silêncio repentino antes que suas asas se abram. Por um instante, até o mar esquece de se mover.',
      behavior:
        'Surge antes de jornadas impossíveis e recusa todos os cavaleiros.',
      weaknesses: ['Redes de ferro negro', 'Pedra confinada'],
      resistances: ['Vento', 'Quedas'],
      attacks: ['Passo do vendaval', 'Coice de éter', 'Rajada branca'],
      drops: ['Pena celeste caída naturalmente'],
      history:
        'Um avistamento mudou a evacuação de High Vael e salvou novecentas vidas.',
      curiosities: 'Suas pegadas aparecem em pedra vertical.',
      legends: 'O horizonte é a trilha deixada por seu primeiro voo.',
      relations: 'Aegis cede a ele os ventos superiores.',
      guardianBond:
        'Vaelor nunca convoca Skywind; pede à tempestade que abra espaço.',
      worldImpact:
        'Suas aparições alteram rotas de expedição e são tratadas como presságios obrigatórios pelos pilotos.',
    },
  },
  es: {
    varkhul: {
      epithet: 'El Caminante de las Brasas',
      realm: 'Reino del Hielo',
      crown: 'Corona de Hielo',
      habitat: 'Pasos de piedra negra sobre la línea de árboles del norte',
      element: 'Piedra · Brasa',
      height: '5,8 m hasta el hombro',
      weight: '19–23 toneladas',
      lifespan: 'Unos 640 años',
      firstSeen: 'Registro de Invierno, 317 D.F.',
      position: 'La atalaya en ruinas de Kaldr, paso noreste',
      chronicle:
        'Pocos sobrevivieron al primer encuentro con el Varkhul. Sus huellas permanecen calientes durante semanas, incluso cuando la nieve de la montaña ha cubierto todos los caminos.',
      behavior:
        'Migra bajo las ventiscas y prueba las murallas con golpes pacientes y deliberados. No caza más de lo necesario, pero recuerda cada herida.',
      weaknesses: [
        'Placas de la garganta durante el rugido',
        'Campanas resonantes de plata',
        'Cambios rápidos de altitud',
      ],
      resistances: ['Acero común', 'Hielo y presión', 'Fuego de asedio'],
      attacks: [
        'Embestida de caldera',
        'Barrido de basalto',
        'Estela de brasas',
      ],
      drops: [
        'Fragmento de basalto vivo',
        'Médula de Varkhul',
        'Garra marcada por el calor',
      ],
      history:
        'Tres tratados del norte se firmaron porque ningún ejército se atrevió a cruzar su ruta invernal. Las torres abandonadas de Kaldr aún conservan la forma de sus hombros.',
      curiosities:
        'Los viejos guías dejan pan sobre huellas calientes; al amanecer crece sin llama.',
      legends:
        'Dicen que el primer Varkhul durmió bajo la Corona de Hielo antes de que Vhaldris la reclamara.',
      relations:
        'Dragones carroñeros lo siguen a distancia. Los lobos de hielo callan cuando pasa.',
      guardianBond:
        'Vhaldris lo desvía del Glaciar del Archivo, pero nunca lo comanda.',
      worldImpact:
        'Cierra el comercio del norte durante seis semanas cada invierno y definió las fronteras de tres baronías.',
    },
    aegis: {
      epithet: 'El Primer Rey del Cielo',
      habitat: 'Agujas de relámpagos y altos nidos de basalto',
      crown: 'Corona de la Tormenta',
      element: 'Tormenta · Hierro',
      height: '4,2 m',
      weight: '1,1 toneladas',
      lifespan: 'Más de 300 años',
      firstSeen: 'Cartas Celestes del Peregrino, 88 D.F.',
      position: 'El nido occidental destrozado',
      chronicle:
        'Cuando Aegis rodea un campo de batalla, los estandartes caen antes que el primer soldado. Hasta el trueno parece esperar su grito.',
      behavior:
        'Territorial, observador y feroz protector de los antiguos caminos de Stormreach.',
      weaknesses: ['Cadenas de puesta a tierra', 'Articulaciones de las alas'],
      resistances: ['Relámpagos', 'Fuerza de vendaval'],
      attacks: ['Caída celeste', 'Garra de la corona', 'Grito del trueno'],
      drops: ['Pluma real', 'Vidrio de tormenta'],
      history:
        'Sus migraciones decidieron una vez la temporada de navegación de las flotas orientales.',
      curiosities: 'Colecciona puntas de lanza rotas, nunca monedas.',
      legends: 'La primera corona fue llevada entre sus garras.',
      relations: 'Caza dragones de acantilado; tolera pegasos blancos.',
      guardianBond: 'Vaelor interpreta su vuelo como un augurio.',
      worldImpact:
        'Protege las caravanas costeras cuando Stormreach mantiene sus antiguas ofrendas.',
    },
    fenrir: {
      epithet: 'El Devorador de la Luna',
      realm: 'Reino del Hielo',
      crown: 'Corona de Hielo',
      habitat: 'Bosques sepulcrales helados y túmulos reales',
      element: 'Hielo · Sombra',
      height: '4,9 m',
      weight: '2,8 toneladas',
      lifespan: 'Desconocida',
      firstSeen: 'La Crónica de la Luna Negra',
      position: 'Túmulos más allá del bosque pálido',
      chronicle:
        'Ningún cazador oyó acercarse a Fenrir. Solo oyen marcharse a los cuervos y luego la nieve bajo sus pies empieza a oscurecerse.',
      behavior:
        'Sigue linajes reales durante generaciones y nunca cruza agua corriente del deshielo.',
      weaknesses: ['Bronce forjado al sol', 'Agua corriente'],
      resistances: ['Frío', 'Ritos de miedo'],
      attacks: ['Salto sin luna', 'Aullido de tumba', 'Desgarro de corona'],
      drops: ['Pelaje nocturno', 'Cuerno hueco'],
      history:
        'Su persecución acabó con dos dinastías del norte sin entrar jamás en una ciudad.',
      curiosities: 'Su sombra apunta hacia la luna.',
      legends: 'Fenrir se tragó un fragmento de la luna invernal.',
      relations:
        'Los cuervos anuncian su rastro; los lobos menores abandonan el territorio.',
      guardianBond: 'Vhaldris contiene su hambre durante los eclipses.',
      worldImpact:
        'Los viajes reales se detienen durante las lunas negras; los ritos de sucesión se celebran tras agua corriente.',
    },
    aster: {
      epithet: 'El Corazón del Mundo',
      realm: 'Bosque Antiguo',
      crown: 'Corona de Roble',
      habitat: 'Santuarios de raíces donde no suena ningún hacha',
      element: 'Vida · Ámbar',
      height: '3,7 m',
      weight: '890 kg',
      lifespan: 'Renace cada 90 años',
      firstSeen: 'Testamento Verde, Primera Hoja',
      position: 'Siguiendo la floración de la Raíz del Mundo',
      chronicle:
        'Donde Aster descansa, florecen tumbas antiguas. Quienes alzan un arco contra él descubren raíces ya enredadas en sus pies.',
      behavior:
        'Amable hasta que se daña el crecimiento sagrado; viaja con las estaciones ocultas.',
      weaknesses: ['Sal de plaga', 'Hierro extraído de árboles muertos'],
      resistances: ['Veneno', 'Magia natural'],
      attacks: ['Prisión de raíces', 'Floración de astas', 'Pulso verde'],
      drops: ['Nunca cosechado; solo astas caídas'],
      history: 'Las rutas de paz por el Bosque Antiguo siguen su migración.',
      curiosities:
        'Las flores de sus astas corresponden a plantas extintas en otros lugares.',
      legends: 'Su latido es el bosque escuchado desde abajo.',
      relations: 'Protege pequeños espíritus y bestias huérfanas.',
      guardianBond: 'Yggor protege su ciclo, no su cuerpo.',
      worldImpact:
        'Su camino determina cosechas, peregrinaciones y las fronteras legales de los clanes del bosque.',
    },
    skywind: {
      epithet: 'Soberano del Cielo Infinito',
      crown: 'Corona de la Tormenta',
      habitat: 'Caminos de nubes sobre los acantilados orientales',
      element: 'Viento · Éter',
      height: '2,6 m',
      weight: '720 kg',
      lifespan: '180 años',
      firstSeen: 'Juramento del Marinero, 209 D.F.',
      position: 'La abertura de nubes sobre High Vael',
      chronicle:
        'Los marineros reconocen a Skywind por la quietud repentina antes de que abra sus alas. Por un instante, hasta el mar olvida moverse.',
      behavior:
        'Aparece antes de viajes imposibles y rechaza a todos los jinetes.',
      weaknesses: ['Redes de hierro negro', 'Piedra confinada'],
      resistances: ['Viento', 'Caídas'],
      attacks: ['Paso de vendaval', 'Coz de éter', 'Turbonada blanca'],
      drops: ['Pluma celeste caída naturalmente'],
      history:
        'Un avistamiento cambió la evacuación de High Vael y salvó novecientas vidas.',
      curiosities: 'Sus huellas aparecen en piedra vertical.',
      legends: 'El horizonte es el rastro de su primer vuelo.',
      relations: 'Aegis le cede los vientos superiores.',
      guardianBond:
        'Vaelor nunca invoca a Skywind; pide a la tormenta que le abra paso.',
      worldImpact:
        'Sus apariciones cambian las rutas de expedición y los pilotos las consideran augurios vinculantes.',
    },
  },
};

export function localizedBeasts(locale: Locale): BeastRecord[] {
  if (locale === 'en') return beasts;
  return beasts.map((beast) => ({
    ...beast,
    ...translations[locale][beast.slug],
  }));
}

export const bestiaryMeta = {
  'pt-br': {
    title: 'Feras de Asterheim — O Bestiário Oficial',
    description:
      'Os registros de campo sobreviventes das criaturas que assombram os Seis Reinos de Asterheim.',
  },
  en: {
    title: 'Beasts of Asterheim — The Official Bestiary',
    description:
      'The surviving field records of the creatures that haunt the Six Realms of Asterheim.',
  },
  es: {
    title: 'Bestias de Asterheim — El Bestiario Oficial',
    description:
      'Los registros de campo supervivientes de las criaturas que acechan los Seis Reinos de Asterheim.',
  },
} satisfies Record<Locale, { title: string; description: string }>;

export const bestiaryUi = {
  'pt-br': {
    heroNoun: 'Feras',
    heroPrep: 'de',
    heroAlt: 'Uma besta colossal com chifres observando uma floresta em ruínas',
    quote: '“Toda lenda começa com um sobrevivente.”',
    explore: 'Explorar o Bestiário',
    folio: 'Fólio I',
    restricted: 'Arquivo Restrito',
    warning: 'Um aviso aos que viram estas páginas',
    leaves: 'As folhas sobreviventes',
    intro1:
      'Por séculos, desbravadores, caçadores reais e sobreviventes sem nome registraram as criaturas dos Seis Reinos. A maioria das páginas se perdeu no fogo, no sal e em mãos assustadas. O que restou forma agora o Bestiário oficial de Asterheim.',
    intro2:
      'Não leia apenas como estudioso. Cada marca foi paga com uma vida; cada mapa foi traçado a partir de uma estrada da qual alguém não retornou.',
    keeper: 'Guardião do Arquivo Negro',
    warmInk: '“Se a tinta aquecer, feche o livro.”',
    kaldrNote: '— nota encontrada no fólio de Kaldr',
    territories: 'Territórios e migração',
    mapTitle: 'O mapa das criaturas',
    mapText:
      'Seis coroas. Seis reinos. Nenhuma fronteira jamais deteve o que vive além da luz das tochas.',
    mapAlt: 'Mapa dos Seis Reinos de Asterheim',
    species: 'espécies registradas',
    danger: 'Perigo',
    dominant: 'Dominante',
    hover: 'Passe pelos selos reais para revelar informações de campo',
    taxonomy: 'Taxonomia prohibita',
    index: 'O índice proibido',
    indexText:
      'A classificação segue o último decreto do Conselho das Seis Coroas.',
    categories: 'Categorias de criaturas',
    record: 'Registro',
    threat: 'ameaça',
    empty:
      'As folhas sobreviventes não contêm registros liberados nesta classificação.',
    lastSighting: 'Último avistamento confirmado',
    royalRecord: 'Registro real de campo · Acesso restrito',
    labels: [
      'Reino',
      'Habitat',
      'Classe',
      'Ameaça',
      'Elemento',
      'Altura',
      'Peso',
      'Longevidade',
      'Primeiro registro',
    ],
    observed: 'Comportamento observado',
    consequence: 'História e consequência',
    world: 'O mundo ao redor',
    weaknesses: 'Fraquezas',
    resistances: 'Resistências',
    attacks: 'Ataques',
    remains: 'Restos raros',
    curiosity: 'Curiosidade',
    legend: 'Lenda',
    other: 'Outras feras',
    recovered: 'Evidências recuperadas',
    deadLeft: 'O que os mortos deixaram',
    evidenceText:
      'Fragmentos catalogados de locais onde a criatura foi vista — ou onde algo sobreviveu a ela.',
    sealed: 'Arquivo Negro · Selado',
    end: 'Fim do fólio sobrevivente',
    removed1: 'Algumas páginas não foram perdidas.',
    removed2: 'Elas foram removidas.',
    returnMap: 'Voltar ao mapa',
    evidence: [
      ['PEGADA 07', 'O calor permaneceu sob 28 cm de neve.'],
      ['GARRA 03', 'Pedra negra riscada sem resíduo metálico.'],
      ['OVO 02', 'A casca responde a trovões distantes.'],
      ['CRÂNIO 14', 'Encontrado voltado para a Coroa do Gelo.'],
      ['PLACA 09', 'Aço de Ironhold, dobrado para dentro.'],
      ['LÂMINA 21', 'Fio vitrificado em um único sopro.'],
      ['RUÍNA 05', 'Nenhuma marca de ferramenta na abertura.'],
      ['AVISTAMENTO 32', 'Depoimento selado pela Coroa.'],
    ],
  },
  en: {
    heroNoun: 'Beasts',
    heroPrep: 'of',
    heroAlt: 'A colossal antlered beast watching from ruined woodland',
    quote: '“Every legend begins with a survivor.”',
    explore: 'Explore the Bestiary',
    folio: 'Folio I',
    restricted: 'Restricted Archive',
    warning: 'A warning to those who turn these pages',
    leaves: 'The surviving leaves',
    intro1:
      'For centuries, pathfinders, royal hunters and nameless survivors recorded the creatures of the Six Realms. Most pages were lost to fire, salt and frightened hands. What remains now forms the official Bestiary of Asterheim.',
    intro2:
      'Read not as a scholar alone. Every mark was purchased with a life, every map drawn from a road someone failed to return by.',
    keeper: 'Keeper of the Black Archive',
    warmInk: '“If the ink turns warm, close the book.”',
    kaldrNote: '— note found in the Kaldr folio',
    territories: 'Territories & migration',
    mapTitle: 'The creature map',
    mapText:
      'Six crowns. Six realms. No border has ever stopped what lives beyond the torchlight.',
    mapAlt: 'Map of the Six Realms of Asterheim',
    species: 'recorded species',
    danger: 'Danger',
    dominant: 'Dominant',
    hover: 'Hover the royal seals to reveal field intelligence',
    taxonomy: 'Taxonomia prohibita',
    index: 'The forbidden index',
    indexText:
      'Classification follows the last decree of the Six Crown Council.',
    categories: 'Creature categories',
    record: 'Record',
    threat: 'threat',
    empty:
      'The surviving leaves contain no unsealed record in this classification.',
    lastSighting: 'Last confirmed sighting',
    royalRecord: 'Royal field record · Eyes only',
    labels: [
      'Realm',
      'Habitat',
      'Class',
      'Threat',
      'Element',
      'Height',
      'Weight',
      'Lifespan',
      'First record',
    ],
    observed: 'Observed behavior',
    consequence: 'History & consequence',
    world: 'The world around it',
    weaknesses: 'Weaknesses',
    resistances: 'Resistances',
    attacks: 'Attacks',
    remains: 'Rare remains',
    curiosity: 'Curiosity',
    legend: 'Legend',
    other: 'Other beasts',
    recovered: 'Recovered evidence',
    deadLeft: 'What the dead left behind',
    evidenceText:
      'Catalogued fragments from sites where the creature was seen — or where something survived it.',
    sealed: 'Black Archive · Sealed',
    end: 'End of surviving folio',
    removed1: 'Some pages were not lost.',
    removed2: 'They were removed.',
    returnMap: 'Return to the map',
    evidence: [
      ['FOOTPRINT 07', 'Heat remained beneath 11 inches of snow.'],
      ['CLAW 03', 'Blackstone scored without metal residue.'],
      ['OVUM 02', 'Shell responds to distant thunder.'],
      ['SKULL 14', 'Found facing the Frost Crown.'],
      ['PLATE 09', 'Ironhold steel, folded inward.'],
      ['BLADE 21', 'Edge vitrified in a single breath.'],
      ['RUIN 05', 'No tool marks on the breach.'],
      ['SIGHTING 32', 'Witness account sealed by the Crown.'],
    ],
  },
  es: {
    heroNoun: 'Bestias',
    heroPrep: 'de',
    heroAlt: 'Una bestia colosal con astas observando un bosque en ruinas',
    quote: '“Toda leyenda comienza con un superviviente.”',
    explore: 'Explorar el Bestiario',
    folio: 'Folio I',
    restricted: 'Archivo Restringido',
    warning: 'Una advertencia para quienes pasan estas páginas',
    leaves: 'Las hojas supervivientes',
    intro1:
      'Durante siglos, exploradores, cazadores reales y supervivientes sin nombre registraron las criaturas de los Seis Reinos. La mayoría de las páginas se perdieron entre fuego, sal y manos temerosas. Lo que queda forma ahora el Bestiario oficial de Asterheim.',
    intro2:
      'No leas solo como erudito. Cada marca se pagó con una vida; cada mapa se trazó desde un camino del que alguien no regresó.',
    keeper: 'Guardián del Archivo Negro',
    warmInk: '“Si la tinta se calienta, cierra el libro.”',
    kaldrNote: '— nota hallada en el folio de Kaldr',
    territories: 'Territorios y migración',
    mapTitle: 'El mapa de las criaturas',
    mapText:
      'Seis coronas. Seis reinos. Ninguna frontera detuvo jamás lo que vive más allá de las antorchas.',
    mapAlt: 'Mapa de los Seis Reinos de Asterheim',
    species: 'especies registradas',
    danger: 'Peligro',
    dominant: 'Dominante',
    hover: 'Pasa sobre los sellos reales para revelar información de campo',
    taxonomy: 'Taxonomia prohibita',
    index: 'El índice prohibido',
    indexText:
      'La clasificación sigue el último decreto del Consejo de las Seis Coronas.',
    categories: 'Categorías de criaturas',
    record: 'Registro',
    threat: 'amenaza',
    empty:
      'Las hojas supervivientes no contienen registros liberados en esta clasificación.',
    lastSighting: 'Último avistamiento confirmado',
    royalRecord: 'Registro real de campo · Acceso restringido',
    labels: [
      'Reino',
      'Hábitat',
      'Clase',
      'Amenaza',
      'Elemento',
      'Altura',
      'Peso',
      'Longevidad',
      'Primer registro',
    ],
    observed: 'Comportamiento observado',
    consequence: 'Historia y consecuencia',
    world: 'El mundo que lo rodea',
    weaknesses: 'Debilidades',
    resistances: 'Resistencias',
    attacks: 'Ataques',
    remains: 'Restos raros',
    curiosity: 'Curiosidad',
    legend: 'Leyenda',
    other: 'Otras bestias',
    recovered: 'Evidencias recuperadas',
    deadLeft: 'Lo que dejaron los muertos',
    evidenceText:
      'Fragmentos catalogados de lugares donde se vio a la criatura — o donde algo sobrevivió a ella.',
    sealed: 'Archivo Negro · Sellado',
    end: 'Fin del folio superviviente',
    removed1: 'Algunas páginas no se perdieron.',
    removed2: 'Fueron retiradas.',
    returnMap: 'Volver al mapa',
    evidence: [
      ['HUELLA 07', 'El calor permaneció bajo 28 cm de nieve.'],
      ['GARRA 03', 'Piedra negra rayada sin residuo metálico.'],
      ['HUEVO 02', 'La cáscara responde a truenos lejanos.'],
      ['CRÁNEO 14', 'Hallado mirando hacia la Corona de Hielo.'],
      ['PLACA 09', 'Acero de Ironhold, plegado hacia dentro.'],
      ['HOJA 21', 'Filo vitrificado en un solo aliento.'],
      ['RUINA 05', 'Sin marcas de herramienta en la brecha.'],
      ['AVISTAMIENTO 32', 'Testimonio sellado por la Corona.'],
    ],
  },
} satisfies Record<Locale, Record<string, string | string[] | string[][]>>;
