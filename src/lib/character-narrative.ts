import type { Character } from '@/data/content';
import type { Locale } from '@/lib/i18n';

export type CharacterNarrative = {
  epicTitle: string;
  subtitle: string;
  quote: string;
  origin: string;
  rise: string;
  fall: string;
  current: string;
  legacy: string;
  curiosities: string[];
  legends: string[];
  rumors: string[];
  virtues: string[];
  flaws: string[];
  fears: string[];
  goals: string[];
  traits: { label: string; value: number }[];
  symbol: string;
  palette: string[];
  silhouette: string;
  materials: string[];
  influences: string[];
  rules: string[];
};

const paletteByCollection: Record<string, string[]> = {
  'black-banner-company': ['#171813', '#782e2c', '#b99352', '#77736b'],
  'broken-mug-tavern': ['#1a1510', '#8c5b32', '#c09a58', '#5d4432'],
  'iron-tankard-tavern': ['#111312', '#676964', '#a47a43', '#50352a'],
  'legends-of-the-realm': ['#0c1012', '#789bab', '#7e473b', '#b49a6b'],
  'beasts-of-asterheim': ['#11170f', '#657b4a', '#8a6a3b', '#7595a1'],
};

const language = {
  'pt-br': {
    titles: [
      'A Lâmina sem Pátria',
      'O Eco da Última Marcha',
      'A Voz sob as Cinzas',
      'O Juramento Inquebrável',
      'A Sombra entre Estandartes',
      'O Coração da Forja',
      'A Sentinela sem Muralhas',
      'O Nome que a Noite Recorda',
    ],
    quotes: [
      'Toda promessa cobra um preço',
      'Nenhuma lâmina conhece a verdade inteira',
      'O mundo recorda aquilo que tentamos enterrar',
      'Sobreviver também pode ser uma forma de juramento',
      'Há batalhas vencidas apenas por quem decide permanecer',
    ],
    motifs: [
      'ferro',
      'cinza',
      'âmbar',
      'gelo',
      'raízes',
      'tempestade',
      'maré',
      'sangue',
    ],
    wounds: [
      'uma promessa quebrada',
      'a perda de seu primeiro lar',
      'um nome apagado dos registros',
      'a batalha que ninguém admite ter ocorrido',
      'uma escolha feita tarde demais',
      'o medo de repetir o passado',
    ],
    subtitle: (motif: string) => `Uma crônica marcada por ${motif} e memória.`,
    quote: (opening: string, subject: string) =>
      `“${opening}; ${subject} aprendeu isso antes de todos.”`,
    origin: (subject: string, motif: string) =>
      `Antes de receber o nome pelo qual Asterheim o conhece, ${subject} viveu à margem dos grandes juramentos. Foi ali, entre necessidade e ${motif}, que aprendeu a observar o preço escondido nas escolhas dos poderosos.`,
    rise: (summary: string) =>
      `Sua ascensão começou quando recusou a saída mais segura. ${summary} Esse gesto percorreu estradas e tavernas antes que os cronistas compreendessem quem havia mudado o curso daquela noite.`,
    fall: (wound: string) =>
      `A reputação trouxe aliados, mas também expôs ${wound}. O momento de maior força tornou-se a origem de uma dúvida que nenhuma armadura ou lenda conseguiu ocultar.`,
    current: (story: string, subject: string) =>
      `Hoje, ${story} Cada novo passo aproxima ${subject} de uma resposta talvez mais perigosa que a pergunta.`,
    legacy: (subject: string) =>
      `O legado de ${subject} não será medido por territórios conquistados, mas por aqueles que aprenderam a agir de modo diferente depois de cruzar seu caminho.`,
    virtues: [
      'Lealdade',
      'Paciência',
      'Coragem',
      'Disciplina',
      'Honra',
      'Empatia',
      'Vigilância',
      'Prudência',
    ],
    flaws: ['Teimosia', 'Desconfiança', 'Orgulho', 'Impulsividade'],
    fear: (wound: string) => [
      `Tornar-se exatamente aquilo contra o qual decidiu lutar.`,
      `Descobrir que ${wound} poderia ter sido evitada.`,
    ],
    goals: [
      'Concluir o juramento que o restante de Asterheim considera impossível.',
      'Preservar ao menos uma verdade antes que a próxima era a transforme em mito.',
    ],
    traits: [
      'Honra',
      'Lealdade',
      'Crueldade',
      'Sabedoria',
      'Força',
      'Influência',
    ],
    symbols: [
      'Lâmina partida',
      'Corvo de ferro',
      'Chama velada',
      'Raiz coroada',
      'Lua ferida',
      'Moeda negra',
    ],
    silhouette: (asymmetric: boolean, shoulder: boolean) =>
      `Massa principal ${asymmetric ? 'assimétrica' : 'vertical'}, ponto focal na região ${shoulder ? 'dos ombros' : 'da arma'} e base que sugere movimento interrompido.`,
    materials: (motif: string, leather: boolean) => [
      motif,
      'aço envelhecido',
      leather ? 'couro gasto' : 'tecido pesado',
    ],
    influences: [
      'fortificações de Asterheim',
      'ferramentas medievais funcionais',
      'narrativa ambiental',
    ],
    rules: [
      'Nenhum ornamento sem função narrativa',
      'A arma deve permanecer estruturalmente imprimível',
      'A base revela o instante anterior à cena',
    ],
  },
  en: {
    titles: [
      'The Blade Without a Homeland',
      'Echo of the Last March',
      'The Voice Beneath the Ashes',
      'The Unbroken Oath',
      'The Shadow Between Banners',
      'The Heart of the Forge',
      'The Wall-less Sentinel',
      'The Name the Night Remembers',
    ],
    quotes: [
      'Every promise demands a price',
      'No blade knows the whole truth',
      'The world remembers what we tried to bury',
      'Survival can also be an oath',
      'Some battles are won only by those who remain',
    ],
    motifs: [
      'iron',
      'ash',
      'amber',
      'frost',
      'roots',
      'storm',
      'tide',
      'blood',
    ],
    wounds: [
      'a broken promise',
      'the loss of a first home',
      'a name erased from the records',
      'the battle no one admits happened',
      'a choice made too late',
      'the fear of repeating the past',
    ],
    subtitle: (motif: string) => `A chronicle marked by ${motif} and memory.`,
    quote: (opening: string, subject: string) =>
      `“${opening}; ${subject} learned that before anyone else.”`,
    origin: (subject: string, motif: string) =>
      `Before Asterheim knew this name, ${subject} lived beyond the reach of the great oaths. There, between necessity and ${motif}, came the first lesson in the hidden price of powerful choices.`,
    rise: (summary: string) =>
      `The ascent began with a refusal to take the safest path. ${summary} The deed crossed roads and taverns before the chroniclers understood who had changed the course of that night.`,
    fall: (wound: string) =>
      `Reputation brought allies, but also exposed ${wound}. The moment of greatest strength became the source of a doubt no armor or legend could conceal.`,
    current: (story: string, subject: string) =>
      `Today, ${story} Every new step brings ${subject} closer to an answer that may be more dangerous than the question.`,
    legacy: (subject: string) =>
      `${subject}'s legacy will not be measured in conquered lands, but in those who learned to act differently after crossing this path.`,
    virtues: [
      'Loyalty',
      'Patience',
      'Courage',
      'Discipline',
      'Honor',
      'Empathy',
      'Vigilance',
      'Prudence',
    ],
    flaws: ['Stubbornness', 'Distrust', 'Pride', 'Impulsiveness'],
    fear: (wound: string) => [
      'Becoming the very thing once sworn to fight.',
      `Discovering that ${wound} could have been prevented.`,
    ],
    goals: [
      'Complete the oath the rest of Asterheim considers impossible.',
      'Preserve at least one truth before the next age turns it into myth.',
    ],
    traits: ['Honor', 'Loyalty', 'Cruelty', 'Wisdom', 'Strength', 'Influence'],
    symbols: [
      'Broken blade',
      'Iron raven',
      'Veiled flame',
      'Crowned root',
      'Wounded moon',
      'Black coin',
    ],
    silhouette: (asymmetric: boolean, shoulder: boolean) =>
      `${asymmetric ? 'Asymmetric' : 'Vertical'} primary mass, focal point at the ${shoulder ? 'shoulders' : 'weapon'}, and a base suggesting interrupted motion.`,
    materials: (motif: string, leather: boolean) => [
      motif,
      'aged steel',
      leather ? 'worn leather' : 'heavy cloth',
    ],
    influences: [
      'Asterheim fortifications',
      'functional medieval tools',
      'environmental storytelling',
    ],
    rules: [
      'No ornament without narrative purpose',
      'The weapon must remain structurally printable',
      'The base reveals the instant before the scene',
    ],
  },
  es: {
    titles: [
      'La Hoja sin Patria',
      'El Eco de la Última Marcha',
      'La Voz bajo las Cenizas',
      'El Juramento Inquebrantable',
      'La Sombra entre Estandartes',
      'El Corazón de la Forja',
      'El Centinela sin Murallas',
      'El Nombre que Recuerda la Noche',
    ],
    quotes: [
      'Toda promesa exige un precio',
      'Ninguna hoja conoce toda la verdad',
      'El mundo recuerda aquello que intentamos enterrar',
      'Sobrevivir también puede ser un juramento',
      'Hay batallas que solo gana quien decide quedarse',
    ],
    motifs: [
      'hierro',
      'ceniza',
      'ámbar',
      'hielo',
      'raíces',
      'tormenta',
      'marea',
      'sangre',
    ],
    wounds: [
      'una promesa rota',
      'la pérdida de su primer hogar',
      'un nombre borrado de los registros',
      'la batalla que nadie admite que ocurrió',
      'una decisión tomada demasiado tarde',
      'el miedo a repetir el pasado',
    ],
    subtitle: (motif: string) => `Una crónica marcada por ${motif} y memoria.`,
    quote: (opening: string, subject: string) =>
      `“${opening}; ${subject} lo aprendió antes que nadie.”`,
    origin: (subject: string, motif: string) =>
      `Antes de recibir el nombre por el que Asterheim lo conoce, ${subject} vivió al margen de los grandes juramentos. Allí, entre necesidad y ${motif}, aprendió el precio oculto de las decisiones de los poderosos.`,
    rise: (summary: string) =>
      `El ascenso comenzó al rechazar la salida más segura. ${summary} El gesto recorrió caminos y tabernas antes de que los cronistas comprendieran quién había cambiado aquella noche.`,
    fall: (wound: string) =>
      `La reputación trajo aliados, pero también expuso ${wound}. El momento de mayor fuerza se convirtió en una duda que ninguna armadura o leyenda pudo ocultar.`,
    current: (story: string, subject: string) =>
      `Hoy, ${story} Cada nuevo paso acerca a ${subject} a una respuesta quizá más peligrosa que la pregunta.`,
    legacy: (subject: string) =>
      `El legado de ${subject} no se medirá en tierras conquistadas, sino en quienes aprendieron a actuar de otro modo tras cruzarse en su camino.`,
    virtues: [
      'Lealtad',
      'Paciencia',
      'Coraje',
      'Disciplina',
      'Honor',
      'Empatía',
      'Vigilancia',
      'Prudencia',
    ],
    flaws: ['Terquedad', 'Desconfianza', 'Orgullo', 'Impulsividad'],
    fear: (wound: string) => [
      'Convertirse exactamente en aquello contra lo que decidió luchar.',
      `Descubrir que ${wound} podría haberse evitado.`,
    ],
    goals: [
      'Cumplir el juramento que el resto de Asterheim considera imposible.',
      'Preservar al menos una verdad antes de que la próxima era la convierta en mito.',
    ],
    traits: [
      'Honor',
      'Lealtad',
      'Crueldad',
      'Sabiduría',
      'Fuerza',
      'Influencia',
    ],
    symbols: [
      'Hoja rota',
      'Cuervo de hierro',
      'Llama velada',
      'Raíz coronada',
      'Luna herida',
      'Moneda negra',
    ],
    silhouette: (asymmetric: boolean, shoulder: boolean) =>
      `Masa principal ${asymmetric ? 'asimétrica' : 'vertical'}, foco en la región ${shoulder ? 'de los hombros' : 'del arma'} y base que sugiere movimiento interrumpido.`,
    materials: (motif: string, leather: boolean) => [
      motif,
      'acero envejecido',
      leather ? 'cuero gastado' : 'tejido pesado',
    ],
    influences: [
      'fortificaciones de Asterheim',
      'herramientas medievales funcionales',
      'narrativa ambiental',
    ],
    rules: [
      'Ningún adorno sin función narrativa',
      'El arma debe seguir siendo estructuralmente imprimible',
      'La base revela el instante anterior a la escena',
    ],
  },
} as const;

function hash(value: string) {
  return [...value].reduce(
    (result, character) => (result * 31 + character.charCodeAt(0)) >>> 0,
    7,
  );
}

export function getCharacterNarrative(
  character: Character,
  index = 0,
  locale: Locale = 'pt-br',
): CharacterNarrative {
  const h = hash(character.slug);
  const copy = language[locale];
  const motif = copy.motifs[h % copy.motifs.length];
  void index;
  return {
    epicTitle: character.title || character.name,
    subtitle: character.subtitle || '',
    quote: character.quote || '',
    origin: character.origin || '',
    rise: character.rise || '',
    fall: character.conflict || '',
    current: character.currentState || '',
    legacy: character.legacy || '',
    curiosities: [],
    legends: [],
    rumors: character.rumors || [],
    virtues: character.personality?.virtues || [],
    flaws: character.personality?.flaws || [],
    fears: character.personality?.fears || [],
    goals: character.personality?.goals || [],
    traits: copy.traits.map((label, traitIndex) => ({
      label,
      value: [
        45 + (h % 51),
        40 + ((h >> 2) % 56),
        8 + ((h >> 4) % 55),
        32 + ((h >> 6) % 64),
        38 + ((h >> 8) % 59),
        25 + ((h >> 10) % 70),
      ][traitIndex],
    })),
    symbol: character.symbol || '',
    palette: paletteByCollection[character.collection] || [
      '#111312',
      '#77736b',
      '#b99352',
      '#782e2c',
    ],
    silhouette: copy.silhouette(Boolean(h % 2), Boolean(h % 3)),
    materials: copy.materials(motif, Boolean(h % 2)),
    influences: [...copy.influences],
    rules: [...copy.rules],
  };
}
