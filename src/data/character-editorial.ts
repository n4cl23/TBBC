import type { Locale } from '@/lib/i18n';

export type CharacterTimelineEntry = {
  year: string;
  title: string;
  description: string;
};
export type CharacterPersonality = {
  virtues: string[];
  flaws: string[];
  fears: string[];
  goals: string[];
};
export type CharacterEditorial = {
  subtitle: string;
  quote: string;
  origin: string;
  rise: string;
  conflict: string;
  currentState: string;
  legacy: string;
  symbol: string;
  rumors: string[];
  personality: CharacterPersonality;
  timeline: CharacterTimelineEntry[];
};

type LocalText = [pt: string, en: string, es: string];
type Profile = {
  calling: LocalText;
  wound: LocalText;
  purpose: LocalText;
  symbol: LocalText;
};
const diacritics: Partial<Record<Locale, Record<string, string>>> = {
  'pt-br': {
    cronica: 'crônica',
    ceu: 'céu',
    proxima: 'próxima',
    ultimo: 'último',
    ultima: 'última',
    lamina: 'lâmina',
    silencio: 'silêncio',
    apos: 'após',
    forca: 'força',
    vocacao: 'vocação',
    ascensao: 'ascensão',
    comecou: 'começou',
    porem: 'porém',
    ninguem: 'ninguém',
    decidiu: 'decidiu',
    ja: 'já',
    encontrou: 'encontrou',
    unico: 'único',
    registro: 'registro',
    reputacao: 'reputação',
    conquistada: 'conquistada',
    coracao: 'coração',
    raizes: 'raízes',
    relampago: 'relâmpago',
    prisao: 'prisão',
    barril: 'barril',
    fundacao: 'fundação',
    muralha: 'muralha',
    irmao: 'irmão',
    inundacao: 'inundação',
    proteger: 'proteger',
  },
  es: {
    cronica: 'crónica',
    proxima: 'próxima',
    ultimo: 'último',
    ultima: 'última',
    cancion: 'canción',
    melodia: 'melodía',
    vocacion: 'vocación',
    ascenso: 'ascenso',
    comenzo: 'comenzó',
    ningun: 'ningún',
    unico: 'único',
    encontro: 'encontró',
    reputacion: 'reputación',
    corazon: 'corazón',
    raices: 'raíces',
    relampago: 'relámpago',
    inundacion: 'inundación',
    proteccion: 'protección',
    decision: 'decisión',
    compania: 'compañía',
    campana: 'campaña',
    anos: 'años',
    sueno: 'sueño',
    puno: 'puño',
    lenadores: 'leñadores',
  },
};
function polish(value: string, locale: Locale) {
  const replacements = diacritics[locale] || {};
  return value.replace(
    /[A-Za-z]+/g,
    (word) => replacements[word.toLowerCase()] || word,
  );
}
const t = (value: LocalText, locale: Locale) =>
  polish(value[locale === 'pt-br' ? 0 : locale === 'en' ? 1 : 2], locale);

const profiles: Record<string, Profile> = {
  'black-fang-mercenary': {
    calling: [
      'a retirada que salva uma companhia',
      'the retreat that saves a company',
      'la retirada que salva una compania',
    ],
    wound: [
      'tres estandartes perdidos',
      'three lost banners',
      'tres estandartes perdidos',
    ],
    purpose: [
      'trazer todos de volta',
      'bring everyone home',
      'hacer que todos regresen',
    ],
    symbol: [
      'presa negra partida',
      'broken black fang',
      'colmillo negro partido',
    ],
  },
  'iron-bull': {
    calling: [
      'a forca que rompe correntes',
      'the strength that breaks chains',
      'la fuerza que rompe cadenas',
    ],
    wound: [
      'os anos nas pedreiras',
      'the years in the quarries',
      'los anos en las canteras',
    ],
    purpose: [
      'libertar quem ainda luta nas arenas',
      'free those still fighting in the pits',
      'liberar a quienes aun luchan en las arenas',
    ],
    symbol: [
      'elo de ferro aberto',
      'open iron link',
      'eslabon de hierro abierto',
    ],
  },
  'silent-ash': {
    calling: [
      'a leitura do silencio apos o fogo',
      'reading the silence after fire',
      'leer el silencio despues del fuego',
    ],
    wound: [
      'a voz tomada pela floresta',
      'the voice taken by the forest',
      'la voz tomada por el bosque',
    ],
    purpose: [
      'impedir a proxima emboscada',
      'prevent the next ambush',
      'impedir la proxima emboscada',
    ],
    symbol: [
      'folha coberta de cinza',
      'ash-covered leaf',
      'hoja cubierta de ceniza',
    ],
  },
  'red-viper': {
    calling: [
      'a morte que evita uma guerra',
      'the death that prevents a war',
      'la muerte que evita una guerra',
    ],
    wound: [
      'um contrato cumprido tarde demais',
      'a contract fulfilled too late',
      'un contrato cumplido demasiado tarde',
    ],
    purpose: [
      'escolher o ultimo alvo',
      'choose the final target',
      'elegir el ultimo objetivo',
    ],
    symbol: [
      'fita rubra em espiral',
      'spiraled crimson ribbon',
      'cinta roja en espiral',
    ],
  },
  durgan: {
    calling: [
      'a forja mantida acesa sob cerco',
      'the forge kept burning under siege',
      'la forja mantenida viva durante el asedio',
    ],
    wound: ['a bigorna partida', 'the broken anvil', 'el yunque partido'],
    purpose: [
      'forjar uma lamina que nao falhe',
      'forge a blade that will not fail',
      'forjar una hoja que no falle',
    ],
    symbol: [
      'martelo sobre uma estrela',
      'hammer over a star',
      'martillo sobre una estrella',
    ],
  },
  'old-garrick': {
    calling: [
      'o mapa escrito com nomes',
      'the map written with names',
      'el mapa escrito con nombres',
    ],
    wound: [
      'a coluna que nao retornou',
      'the column that never returned',
      'la columna que nunca regreso',
    ],
    purpose: [
      'encerrar a ultima campanha sem baixas',
      'end the last campaign without casualties',
      'terminar la ultima campana sin bajas',
    ],
    symbol: ['estandarte costurado', 'stitched banner', 'estandarte cosido'],
  },
  elias: {
    calling: [
      'a verdade que muda sob a luz das Coroas',
      'truth that changes beneath the Crowns',
      'la verdad que cambia bajo las Coronas',
    ],
    wound: [
      'uma pagina arrancada do arquivo',
      'a page torn from the archive',
      'una pagina arrancada del archivo',
    ],
    purpose: [
      'preservar a versao que os reis apagaram',
      'preserve the version kings erased',
      'preservar la version que los reyes borraron',
    ],
    symbol: [
      'pena atravessando um olho',
      'quill crossing an eye',
      'pluma atravesando un ojo',
    ],
  },
  morwen: {
    calling: [
      'a cura que reconhece o veneno',
      'healing that recognizes poison',
      'la cura que reconoce el veneno',
    ],
    wound: [
      'um jardim queimado pelo medo',
      'a garden burned by fear',
      'un jardin quemado por el miedo',
    ],
    purpose: [
      'replantar sementes de todos os reinos',
      'replant seeds from every realm',
      'replantar semillas de todos los reinos',
    ],
    symbol: [
      'folha dividida em duas cores',
      'leaf divided in two colors',
      'hoja dividida en dos colores',
    ],
  },
  finn: {
    calling: [
      'a aposta que alimenta uma companhia',
      'the wager that feeds a company',
      'la apuesta que alimenta una compania',
    ],
    wound: [
      'uma divida com o cobrador errado',
      'a debt to the wrong collector',
      'una deuda con el cobrador equivocado',
    ],
    purpose: [
      'comprar a liberdade do estandarte',
      'buy the banner freedom',
      'comprar la libertad del estandarte',
    ],
    symbol: [
      'moeda marcada por quatro cortes',
      'coin marked by four cuts',
      'moneda marcada por cuatro cortes',
    ],
  },
  'rat-king': {
    calling: [
      'a rede invisivel sob as tavernas',
      'the invisible network beneath taverns',
      'la red invisible bajo las tabernas',
    ],
    wound: [
      'a primeira toca inundada',
      'the first flooded den',
      'la primera madriguera inundada',
    ],
    purpose: [
      'encontrar a passagem sob Ironhold',
      'find the passage beneath Ironhold',
      'encontrar el paso bajo Ironhold',
    ],
    symbol: [
      'coroa de cobre torta',
      'crooked copper crown',
      'corona de cobre torcida',
    ],
  },
  boris: {
    calling: [
      'a porta aberta depois da meia-noite',
      'the door left open after midnight',
      'la puerta abierta despues de medianoche',
    ],
    wound: [
      'um hospede que nunca voltou',
      'a guest who never returned',
      'un huesped que nunca regreso',
    ],
    purpose: [
      'manter a Broken Mug neutra',
      'keep the Broken Mug neutral',
      'mantener neutral la Broken Mug',
    ],
    symbol: [
      'caneca com uma alca quebrada',
      'mug with a broken handle',
      'jarra con un asa rota',
    ],
  },
  lily: {
    calling: [
      'os segredos recolhidos entre mesas',
      'secrets gathered between tables',
      'los secretos recogidos entre mesas',
    ],
    wound: [
      'uma carta escondida no assoalho',
      'a letter hidden beneath the floor',
      'una carta oculta bajo el suelo',
    ],
    purpose: [
      'descobrir quem comprou o silencio da cidade',
      'discover who bought the city silence',
      'descubrir quien compro el silencio de la ciudad',
    ],
    symbol: [
      'bandeja com uma lua gravada',
      'tray engraved with a moon',
      'bandeja grabada con una luna',
    ],
  },
  hugo: {
    calling: [
      'o fogo que transforma escassez em banquete',
      'the fire that turns scarcity into a feast',
      'el fuego que convierte escasez en banquete',
    ],
    wound: [
      'a cozinha perdida na marcha do norte',
      'the kitchen lost in the northern march',
      'la cocina perdida en la marcha del norte',
    ],
    purpose: [
      'servir a receita que encerrou um motim',
      'serve the recipe that ended a mutiny',
      'servir la receta que termino un motin',
    ],
    symbol: [
      'faca sobre tres brasas',
      'knife over three embers',
      'cuchillo sobre tres brasas',
    ],
  },
  rowan: {
    calling: [
      'a cancao que guarda nomes proibidos',
      'the song that keeps forbidden names',
      'la cancion que guarda nombres prohibidos',
    ],
    wound: [
      'o verso removido de sua balada',
      'the verse cut from the ballad',
      'el verso borrado de su balada',
    ],
    purpose: [
      'cantar a historia completa diante da corte',
      'sing the whole story before the court',
      'cantar la historia completa ante la corte',
    ],
    symbol: [
      'corda partida de alaude',
      'broken lute string',
      'cuerda rota de laud',
    ],
  },
  'old-bran': {
    calling: [
      'a memoria da mesa mais antiga',
      'the memory of the oldest table',
      'la memoria de la mesa mas antigua',
    ],
    wound: [
      'quarenta invernos sem uma resposta',
      'forty winters without an answer',
      'cuarenta inviernos sin respuesta',
    ],
    purpose: [
      'reconhecer o viajante de seu ultimo sonho',
      'recognize the traveler from his last dream',
      'reconocer al viajero de su ultimo sueno',
    ],
    symbol: [
      'chave gasta pelo polegar',
      'thumb-worn key',
      'llave gastada por el pulgar',
    ],
  },
  milo: {
    calling: [
      'os caminhos que apenas os cavalos conhecem',
      'the roads only horses know',
      'los caminos que solo conocen los caballos',
    ],
    wound: [
      'um potro levado pelos cobradores',
      'a foal taken by debt collectors',
      'un potro llevado por cobradores',
    ],
    purpose: [
      'abrir uma rota segura para os fugitivos',
      'open a safe route for fugitives',
      'abrir una ruta segura para fugitivos',
    ],
    symbol: [
      'ferradura com uma asa',
      'winged horseshoe',
      'herradura con un ala',
    ],
  },
  olaf: {
    calling: [
      'a gentileza escondida em tamanho colossal',
      'gentleness hidden in colossal size',
      'la bondad oculta en un tamano colosal',
    ],
    wound: [
      'a ponte que cedeu sob seus pes',
      'the bridge that broke beneath him',
      'el puente que cedio bajo sus pies',
    ],
    purpose: [
      'provar que pode proteger sem destruir',
      'prove he can protect without destroying',
      'demostrar que puede proteger sin destruir',
    ],
    symbol: [
      'barril envolto por duas maos',
      'barrel held by two hands',
      'barril entre dos manos',
    ],
  },
  'borin-stonebrew': {
    calling: [
      'a cerveja maturada em pedra',
      'ale matured in stone',
      'cerveza madurada en piedra',
    ],
    wound: [
      'a receita roubada de seu cla',
      'the recipe stolen from his clan',
      'la receta robada a su clan',
    ],
    purpose: [
      'recuperar o barril da fundacao',
      'recover the founding barrel',
      'recuperar el barril fundador',
    ],
    symbol: [
      'runa gravada numa caneca',
      'rune carved into a tankard',
      'runa tallada en una jarra',
    ],
  },
  'brakk-stonehide': {
    calling: [
      'a muralha que escolheu caminhar',
      'the wall that chose to walk',
      'la muralla que eligio caminar',
    ],
    wound: [
      'uma cicatriz que nao pertence a nenhuma arma',
      'a scar made by no known weapon',
      'una cicatriz de ninguna arma conocida',
    ],
    purpose: [
      'descobrir o metal que rompeu sua pele',
      'discover the metal that pierced his hide',
      'descubrir el metal que atraveso su piel',
    ],
    symbol: [
      'punho dentro de um hexagono',
      'fist inside a hexagon',
      'puno dentro de un hexagono',
    ],
  },
  'elias-crow': {
    calling: [
      'as mensagens levadas por corvos',
      'messages carried by ravens',
      'los mensajes llevados por cuervos',
    ],
    wound: [
      'um selo real falsificado',
      'a forged royal seal',
      'un sello real falsificado',
    ],
    purpose: [
      'identificar o autor da ordem negra',
      'identify the author of the black order',
      'identificar al autor de la orden negra',
    ],
    symbol: [
      'corvo com um selo no bico',
      'raven holding a seal',
      'cuervo con un sello en el pico',
    ],
  },
  'finn-coppercoin': {
    calling: [
      'o troco que revela uma fraude',
      'change that reveals a fraud',
      'el cambio que revela un fraude',
    ],
    wound: [
      'a moeda que sempre retorna',
      'the coin that always returns',
      'la moneda que siempre regresa',
    ],
    purpose: [
      'quebrar a maldicao do cobre',
      'break the copper curse',
      'romper la maldicion del cobre',
    ],
    symbol: [
      'moeda com duas faces iguais',
      'coin with twin faces',
      'moneda con dos caras iguales',
    ],
  },
  'gerhard-blackwolf': {
    calling: [
      'a caca conduzida sem matilha',
      'the hunt conducted without a pack',
      'la caza realizada sin manada',
    ],
    wound: [
      'o uivo ouvido dentro das muralhas',
      'the howl heard inside the walls',
      'el aullido oido dentro de las murallas',
    ],
    purpose: [
      'encontrar a fera que usa seu nome',
      'find the beast using his name',
      'encontrar la bestia que usa su nombre',
    ],
    symbol: [
      'lobo sob uma porta de ferro',
      'wolf beneath an iron gate',
      'lobo bajo una puerta de hierro',
    ],
  },
  'grukk-iron-mug': {
    calling: [
      'a diplomacia resolvida com uma caneca',
      'diplomacy settled with a tankard',
      'la diplomacia resuelta con una jarra',
    ],
    wound: [
      'um brinde que iniciou uma guerra',
      'a toast that started a war',
      'un brindis que inicio una guerra',
    ],
    purpose: [
      'reunir os chefes para um ultimo brinde',
      'gather the chiefs for one last toast',
      'reunir a los jefes para un ultimo brindis',
    ],
    symbol: [
      'caneca amassada por um punho',
      'tankard dented by a fist',
      'jarra abollada por un puno',
    ],
  },
  'iron-tankard-waitress': {
    calling: [
      'a ordem perfeita no salao mais brutal',
      'perfect order in the roughest hall',
      'el orden perfecto en la sala mas brutal',
    ],
    wound: [
      'um nome abandonado no avental',
      'a name abandoned with the apron',
      'un nombre abandonado en el delantal',
    ],
    purpose: [
      'escolher quando revelar sua patente',
      'choose when to reveal her rank',
      'elegir cuando revelar su rango',
    ],
    symbol: [
      'colher cruzada com uma adaga',
      'spoon crossed with a dagger',
      'cuchara cruzada con una daga',
    ],
  },
  lyra: {
    calling: [
      'uma melodia capaz de acalmar metal',
      'a melody able to calm metal',
      'una melodia capaz de calmar metal',
    ],
    wound: [
      'a nota que despertou a armadura',
      'the note that woke the armor',
      'la nota que desperto la armadura',
    ],
    purpose: [
      'terminar a cancao antes do colosso despertar',
      'finish the song before the colossus wakes',
      'terminar la cancion antes de que despierte el coloso',
    ],
    symbol: [
      'lira cercada por limalha',
      'lyre circled by iron filings',
      'lira rodeada de limaduras',
    ],
  },
  'morwen-iron-tankard': {
    calling: [
      'as ervas que crescem entre paralelepipedos',
      'herbs growing between cobbles',
      'las hierbas que crecen entre adoquines',
    ],
    wound: [
      'um antidoto vendido como veneno',
      'an antidote sold as poison',
      'un antidoto vendido como veneno',
    ],
    purpose: [
      'limpar seu nome sem expor o paciente',
      'clear her name without exposing the patient',
      'limpiar su nombre sin exponer al paciente',
    ],
    symbol: [
      'frasco envolto por espinhos',
      'vial wrapped in thorns',
      'frasco envuelto en espinas',
    ],
  },
  'rat-king-external': {
    calling: [
      'o reino de tuneis alem da muralha',
      'the tunnel kingdom beyond the wall',
      'el reino de tuneles tras la muralla',
    ],
    wound: [
      'uma coroa disputada por sete ninhadas',
      'a crown contested by seven litters',
      'una corona disputada por siete camadas',
    ],
    purpose: [
      'unir as tocas antes da inundacao',
      'unite the dens before the flood',
      'unir las madrigueras antes de la inundacion',
    ],
    symbol: [
      'sete caudas em circulo',
      'seven tails in a circle',
      'siete colas en circulo',
    ],
  },
  'sir-aldren': {
    calling: [
      'a honra testada fora da corte',
      'honor tested beyond the court',
      'el honor probado fuera de la corte',
    ],
    wound: [
      'um duelo vencido pela causa errada',
      'a duel won for the wrong cause',
      'un duelo ganado por la causa equivocada',
    ],
    purpose: [
      'devolver a espada a familia derrotada',
      'return the sword to the defeated family',
      'devolver la espada a la familia derrotada',
    ],
    symbol: [
      'escudo com a faixa invertida',
      'shield with an inverted band',
      'escudo con la banda invertida',
    ],
  },
  'tavern-mimic': {
    calling: [
      'a fome que aprendeu a esperar',
      'hunger that learned to wait',
      'el hambre que aprendio a esperar',
    ],
    wound: [
      'o primeiro cacador que o chamou de amigo',
      'the first hunter who called it friend',
      'el primer cazador que lo llamo amigo',
    ],
    purpose: [
      'proteger o salao que lhe deu abrigo',
      'protect the hall that sheltered it',
      'proteger la sala que le dio refugio',
    ],
    symbol: [
      'fechadura com dentes',
      'toothed keyhole',
      'cerradura con dientes',
    ],
  },
  'the-fallen-king': {
    calling: [
      'o trono abandonado para salvar uma cidade',
      'the throne abandoned to save a city',
      'el trono abandonado para salvar una ciudad',
    ],
    wound: [
      'a condenacao dos sobreviventes',
      'the survivors condemnation',
      'la condena de los supervivientes',
    ],
    purpose: [
      'libertar os mortos de seu ultimo juramento',
      'release the dead from their final oath',
      'liberar a los muertos de su ultimo juramento',
    ],
    symbol: ['coroa virada para baixo', 'upturned crown', 'corona invertida'],
  },
  'the-last-dragon-slayer': {
    calling: [
      'a vitoria que encerrou uma especie',
      'the victory that ended a species',
      'la victoria que termino una especie',
    ],
    wound: [
      'o silencio apos o ultimo rugido',
      'the silence after the last roar',
      'el silencio tras el ultimo rugido',
    ],
    purpose: [
      'encontrar o ovo que desmente sua lenda',
      'find the egg that disproves his legend',
      'encontrar el huevo que desmiente su leyenda',
    ],
    symbol: [
      'lamina diante de um ovo rachado',
      'blade before a cracked egg',
      'hoja ante un huevo agrietado',
    ],
  },
  'the-ancient-giant': {
    calling: [
      'a memoria carregada nas montanhas',
      'memory carried by mountains',
      'la memoria cargada por las montanas',
    ],
    wound: [
      'a cidade erguida sobre seu irmao',
      'a city built upon his brother',
      'una ciudad construida sobre su hermano',
    ],
    purpose: [
      'mover a fronteira sem esmagar seus habitantes',
      'move the border without crushing its people',
      'mover la frontera sin aplastar a sus habitantes',
    ],
    symbol: [
      'montanha com um olho fechado',
      'mountain with a closed eye',
      'montana con un ojo cerrado',
    ],
  },
  'the-vampire-lord': {
    calling: [
      'a corte sustentada por noites emprestadas',
      'a court sustained by borrowed nights',
      'una corte sostenida por noches prestadas',
    ],
    wound: [
      'o retrato que continua envelhecendo',
      'the portrait that keeps aging',
      'el retrato que sigue envejeciendo',
    ],
    purpose: [
      'negociar o amanhecer que lhe foi roubado',
      'bargain for the dawn stolen from him',
      'negociar el amanecer que le fue robado',
    ],
    symbol: [
      'calice sob um sol negro',
      'chalice beneath a black sun',
      'caliz bajo un sol negro',
    ],
  },
  'the-forest-guardian': {
    calling: [
      'o limite que as raizes decidiram defender',
      'the boundary the roots chose to defend',
      'el limite que las raices eligieron defender',
    ],
    wound: [
      'a clareira que ainda nao cicatrizou',
      'the clearing that has not healed',
      'el claro que aun no ha sanado',
    ],
    purpose: [
      'julgar a ultima estrada dos lenhadores',
      'judge the woodcutters final road',
      'juzgar el ultimo camino de los lenadores',
    ],
    symbol: [
      'galho fechando uma pegada',
      'branch closing over a footprint',
      'rama cerrandose sobre una huella',
    ],
  },
  'the-demon-prince': {
    calling: [
      'uma heranca infernal recusada',
      'an infernal inheritance refused',
      'una herencia infernal rechazada',
    ],
    wound: [
      'o nome verdadeiro gravado em sua pele',
      'the true name carved into his skin',
      'el nombre verdadero grabado en su piel',
    ],
    purpose: [
      'destruir o trono que ainda o convoca',
      'destroy the throne that still summons him',
      'destruir el trono que aun lo convoca',
    ],
    symbol: [
      'chifre cercado por uma corrente',
      'horn encircled by a chain',
      'cuerno rodeado por una cadena',
    ],
  },
  'the-white-dragon': {
    calling: [
      'o inverno guardado sob as escamas',
      'winter kept beneath the scales',
      'el invierno guardado bajo las escamas',
    ],
    wound: [
      'um santuario violado por colecionadores',
      'a sanctuary violated by collectors',
      'un santuario profanado por coleccionistas',
    ],
    purpose: [
      'devolver ao gelo os nomes roubados',
      'return the stolen names to the ice',
      'devolver al hielo los nombres robados',
    ],
    symbol: [
      'escama com seis pontas',
      'six-pointed scale',
      'escama de seis puntas',
    ],
  },
  'the-kraken-caller': {
    calling: [
      'os sonhos traduzidos das profundezas',
      'dreams translated from the depths',
      'los suenos traducidos desde las profundidades',
    ],
    wound: [
      'cada rosto perdido numa invocacao',
      'each face lost in an invocation',
      'cada rostro perdido en una invocacion',
    ],
    purpose: [
      'pronunciar o ultimo chamado sem esquecer a si mesmo',
      'speak the final call without forgetting himself',
      'pronunciar la ultima llamada sin olvidarse de si mismo',
    ],
    symbol: [
      'tridente dentro de uma pupila',
      'trident inside a pupil',
      'tridente dentro de una pupila',
    ],
  },
  'the-iron-colossus': {
    calling: [
      'a fortaleza que despertou com passos',
      'the fortress that awoke on legs',
      'la fortaleza que desperto con pasos',
    ],
    wound: [
      'a ordem incompleta no nucleo',
      'the incomplete order in its core',
      'la orden incompleta en su nucleo',
    ],
    purpose: [
      'descobrir qual cidade deveria proteger',
      'discover which city it was meant to protect',
      'descubrir que ciudad debia proteger',
    ],
    symbol: [
      'torre sobre duas pegadas',
      'tower above two footprints',
      'torre sobre dos huellas',
    ],
  },
  aegis: {
    calling: [
      'o ceu que se recusou a ser aprisionado',
      'the sky that refused imprisonment',
      'el cielo que rechazo ser aprisionado',
    ],
    wound: [
      'a primeira asa presa por uma torre',
      'the first wing caught by a tower',
      'la primera ala atrapada por una torre',
    ],
    purpose: [
      'derrubar as gaiolas sem ferir quem vive abaixo',
      'break the cages without harming those below',
      'derribar las jaulas sin herir a quienes viven abajo',
    ],
    symbol: [
      'asa atravessando uma coroa',
      'wing crossing a crown',
      'ala atravesando una corona',
    ],
  },
  fenrir: {
    calling: [
      'a fome alimentada por promessas quebradas',
      'hunger fed by broken promises',
      'el hambre alimentada por promesas rotas',
    ],
    wound: [
      'o primeiro eclipse sem matilha',
      'the first eclipse without a pack',
      'el primer eclipse sin manada',
    ],
    purpose: [
      'devorar o juramento que o mantem acorrentado',
      'devour the oath that keeps him chained',
      'devorar el juramento que lo mantiene encadenado',
    ],
    symbol: [
      'lua presa entre duas presas',
      'moon caught between two fangs',
      'luna atrapada entre dos colmillos',
    ],
  },
  aster: {
    calling: [
      'o pulso subterraneo do continente',
      'the subterranean pulse of the continent',
      'el pulso subterraneo del continente',
    ],
    wound: [
      'a raiz cortada sob a primeira cidade',
      'the root severed beneath the first city',
      'la raiz cortada bajo la primera ciudad',
    ],
    purpose: [
      'reconectar a floresta antes do proximo despertar',
      'reconnect the forest before the next awakening',
      'reconectar el bosque antes del proximo despertar',
    ],
    symbol: [
      'coracao cercado por raizes',
      'heart encircled by roots',
      'corazon rodeado de raices',
    ],
  },
  skywind: {
    calling: [
      'a tempestade lida antes de nascer',
      'the storm read before it is born',
      'la tormenta leida antes de nacer',
    ],
    wound: [
      'uma pena guardada como trofeu real',
      'a feather kept as a royal trophy',
      'una pluma guardada como trofeo real',
    ],
    purpose: [
      'desviar o vendaval que apagaria a costa',
      'turn the gale that would erase the coast',
      'desviar el vendaval que borraria la costa',
    ],
    symbol: [
      'pena dividindo um relampago',
      'feather splitting a lightning bolt',
      'pluma dividiendo un relampago',
    ],
  },
};

const virtues: Record<Locale, string[]> = {
  'pt-br': [
    'Lealdade',
    'Coragem',
    'Prudencia',
    'Compaixao',
    'Disciplina',
    'Tenacidade',
  ],
  en: [
    'Loyalty',
    'Courage',
    'Prudence',
    'Compassion',
    'Discipline',
    'Tenacity',
  ],
  es: [
    'Lealtad',
    'Coraje',
    'Prudencia',
    'Compasion',
    'Disciplina',
    'Tenacidad',
  ],
};
const flaws: Record<Locale, string[]> = {
  'pt-br': ['Teimosia', 'Desconfianca', 'Orgulho', 'Impulsividade'],
  en: ['Stubbornness', 'Distrust', 'Pride', 'Impulsiveness'],
  es: ['Terquedad', 'Desconfianza', 'Orgullo', 'Impulsividad'],
};
function hash(value: string) {
  return [...value].reduce((n, c) => (n * 33 + c.charCodeAt(0)) >>> 0, 11);
}

export function createCharacterEditorial(
  slug: string,
  name: string,
  summary: string,
  story: string,
  locale: Locale = 'pt-br',
): CharacterEditorial {
  const profile = profiles[slug];
  if (!profile)
    throw new Error(`Missing editorial profile for character: ${slug}`);
  const calling = t(profile.calling, locale),
    wound = t(profile.wound, locale),
    purpose = t(profile.purpose, locale),
    symbol = t(profile.symbol, locale),
    h = hash(slug);
  const copy =
    locale === 'pt-br'
      ? {
          subtitle: `Uma crônica sobre ${calling}.`,
          quote: `"Nenhuma lenda permanece inteira quando ${name} entra em cena."`,
          origin: `Antes do nome circular por Asterheim, ${name} foi moldado por ${calling}. ${story}`,
          rise: `A ascensao comecou quando essa vocacao deixou de ser segredo. ${summary}`,
          conflict: `Toda conquista, porem, devolve ${name} a ${wound}; essa e a fissura que nenhum triunfo conseguiu fechar.`,
          current: `Agora, ${name} avanca para ${purpose}, mesmo sabendo que o caminho pode desfazer a reputacao conquistada.`,
          legacy: `Se tiver sucesso, seu legado sera lembrado por ${purpose}; se falhar, ${symbol} sera o unico registro da tentativa.`,
          rumor: `Corre entre cronistas que ${name} ja encontrou uma resposta sobre ${wound} e decidiu esconde-la.`,
          years: [
            'Antes dos registros',
            'Primeiro juramento',
            'A ruptura',
            'Atualidade',
          ],
          titles: [
            'A marca inicial',
            'O nome atravessa fronteiras',
            'A ferida retorna',
            'O proximo movimento',
          ],
        }
      : locale === 'en'
        ? {
            subtitle: `A chronicle of ${calling}.`,
            quote: `"No legend remains whole once ${name} enters the scene."`,
            origin: `Before the name traveled across Asterheim, ${name} was shaped by ${calling}. ${story}`,
            rise: `The rise began when that calling ceased to be a secret. ${summary}`,
            conflict: `Every victory, however, returns ${name} to ${wound}; no triumph has closed that fracture.`,
            current: `Now ${name} moves toward ${purpose}, knowing the road may undo the reputation already earned.`,
            legacy: `Success will make ${purpose} the legacy; failure will leave ${symbol} as the sole record of the attempt.`,
            rumor: `Chroniclers whisper that ${name} already found an answer about ${wound} and chose to hide it.`,
            years: [
              'Before the records',
              'First oath',
              'The fracture',
              'Present day',
            ],
            titles: [
              'The first mark',
              'The name crosses borders',
              'The wound returns',
              'The next move',
            ],
          }
        : {
            subtitle: `Una crónica sobre ${calling}.`,
            quote: `"Ninguna leyenda permanece intacta cuando ${name} entra en escena."`,
            origin: `Antes de que el nombre recorriera Asterheim, ${name} fue moldeado por ${calling}. ${story}`,
            rise: `El ascenso comenzo cuando esa vocacion dejo de ser un secreto. ${summary}`,
            conflict: `Toda victoria, sin embargo, devuelve a ${name} a ${wound}; ningun triunfo ha cerrado esa grieta.`,
            current: `Ahora ${name} avanza hacia ${purpose}, sabiendo que el camino puede deshacer la reputacion conquistada.`,
            legacy: `El exito convertira ${purpose} en su legado; el fracaso dejara ${symbol} como unico registro del intento.`,
            rumor: `Los cronistas susurran que ${name} ya encontro una respuesta sobre ${wound} y decidio ocultarla.`,
            years: [
              'Antes de los registros',
              'Primer juramento',
              'La ruptura',
              'Actualidad',
            ],
            titles: [
              'La primera marca',
              'El nombre cruza fronteras',
              'La herida regresa',
              'El proximo movimiento',
            ],
          };
  const descriptions = [copy.origin, copy.rise, copy.conflict, copy.current];
  return {
    subtitle: copy.subtitle,
    quote: copy.quote,
    origin: copy.origin,
    rise: copy.rise,
    conflict: copy.conflict,
    currentState: copy.current,
    legacy: copy.legacy,
    symbol,
    rumors: [copy.rumor],
    personality: {
      virtues: [
        virtues[locale][h % virtues[locale].length],
        virtues[locale][(h + 3) % virtues[locale].length],
      ],
      flaws: [flaws[locale][h % flaws[locale].length]],
      fears: [wound],
      goals: [purpose],
    },
    timeline: copy.titles.map((title, index) => ({
      year: copy.years[index],
      title: `${title}: ${name}`,
      description: descriptions[index],
    })),
  };
}

export function createCharacterPrompt(
  slug: string,
  name: string,
  locale: Locale = 'pt-br',
) {
  const profile = profiles[slug];
  if (!profile)
    throw new Error(`Missing editorial profile for character: ${slug}`);
  const calling = t(profile.calling, locale);
  const purpose = t(profile.purpose, locale);
  const symbol = t(profile.symbol, locale);
  if (locale === 'en')
    return `Narrative miniature of ${name}; the silhouette expresses ${calling}; ${symbol} is the only ceremonial motif; functional equipment and a scenic base capture the instant before ${purpose}.`;
  if (locale === 'es')
    return `Miniatura narrativa de ${name}; la silueta expresa ${calling}; ${symbol} es el único motivo ceremonial; equipo funcional y una base escénica capturan el instante antes de ${purpose}.`;
  return `Miniatura narrativa de ${name}; a silhueta expressa ${calling}; ${symbol} é o único motivo cerimonial; equipamento funcional e uma base cênica registram o instante anterior a ${purpose}.`;
}
