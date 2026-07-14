import type { CmsEntityType } from '@/types/cms';
import type { Locale } from '@/lib/i18n';
import type { StoredTranslation } from '@/lib/localized-content';
import {
  createCharacterEditorial,
  createCharacterPrompt,
} from '@/data/character-editorial';

type Fields = Record<string, unknown>;
type EditorialLocale = Exclude<Locale, 'pt-br'>;

const collectionCopy: Record<
  string,
  Record<EditorialLocale, [string, string]>
> = {
  'black-banner-company': {
    en: [
      'The Black Banner Company',
      'Veterans, assassins, scouts, and unlikely creatures march beneath a single banner.',
    ],
    es: [
      'The Black Banner Company',
      'Veteranos, asesinos, exploradores y criaturas improbables marchan bajo un mismo estandarte.',
    ],
  },
  'broken-mug-tavern': {
    en: [
      'The Broken Mug Tavern',
      'A tavern where travelers, musicians, and living legends share the same table.',
    ],
    es: [
      'The Broken Mug Tavern',
      'Una taberna donde viajeros, músicos y leyendas vivientes comparten la misma mesa.',
    ],
  },
  'iron-tankard-tavern': {
    en: [
      'Iron Tankard Tavern',
      'Locals, strangers, and creatures gather beneath the weight of iron tankards.',
    ],
    es: [
      'Iron Tankard Tavern',
      'Habitantes, forasteros y criaturas se reúnen bajo el peso de las jarras de hierro.',
    ],
  },
  'legends-of-the-realm': {
    en: [
      'Legends of the Realm',
      'Great figures and entities whose choices reshaped the history of Asterheim.',
    ],
    es: [
      'Legends of the Realm',
      'Grandes figuras y entidades cuyas decisiones cambiaron la historia de Asterheim.',
    ],
  },
  'beasts-of-asterheim': {
    en: [
      'Beasts of Asterheim',
      'Primeval creatures that carry the continent’s oldest, wildest memories.',
    ],
    es: [
      'Beasts of Asterheim',
      'Criaturas primordiales que guardan las memorias más antiguas y salvajes del continente.',
    ],
  },
  'six-crowns': {
    en: [
      'The Six Crowns of Asterheim',
      'Six ancestral relics bound to the fundamental forces of the world.',
    ],
    es: [
      'The Six Crowns of Asterheim',
      'Seis reliquias ancestrales vinculadas a las fuerzas fundamentales del mundo.',
    ],
  },
};

const realmCopy: Record<string, Record<EditorialLocale, Fields>> = {
  ironhold: {
    en: {
      summary: 'A fortress where an oath is worth more than blood.',
      architecture:
        'Monumental gates, black-stone walls, chains, and iron bastions.',
      symbol: 'Iron Lion',
      color: 'Black, iron, crimson, and gold',
    },
    es: {
      summary: 'Una fortaleza donde un juramento vale más que la sangre.',
      architecture:
        'Puertas monumentales, murallas de piedra negra, cadenas y bastiones de hierro.',
      symbol: 'León de Hierro',
      color: 'Negro, hierro, carmesí y oro',
    },
  },
  'frost-kingdom': {
    en: {
      summary:
        'The north preserves memories the rest of the world chose to forget.',
      architecture:
        'Frozen altars, runic halls, and fortresses carved from glacial stone.',
      symbol: 'White Dragon',
      color: 'White, glacial blue, and silver',
    },
    es: {
      summary:
        'El norte conserva memorias que el resto del mundo decidió olvidar.',
      architecture:
        'Altares helados, salones rúnicos y fortalezas talladas en piedra glacial.',
      symbol: 'Dragón Blanco',
      color: 'Blanco, azul glacial y plata',
    },
  },
  'elder-forest': {
    en: {
      summary: 'An ancient forest that decides who may cross its roots.',
      architecture:
        'Living sanctuaries and forgotten ruins claimed by roots and amber.',
      symbol: 'Sacred Oak',
      color: 'Bark, moss green, and amber',
    },
    es: {
      summary: 'Un bosque antiguo que decide quién puede cruzar sus raíces.',
      architecture:
        'Santuarios vivos y ruinas olvidadas conquistadas por raíces y ámbar.',
      symbol: 'Roble Sagrado',
      color: 'Corteza, verde musgo y ámbar',
    },
  },
  stormreach: {
    en: {
      summary: 'Cliffbound sentinels speak with storms above a restless sea.',
      architecture:
        'Sea cliffs, lightning obelisks, and exposed bronze altars.',
      symbol: 'Storm Spear',
      color: 'Black bronze, electric blue, and charcoal',
    },
    es: {
      summary:
        'Centinelas de los acantilados hablan con las tormentas sobre un mar inquieto.',
      architecture:
        'Acantilados, obeliscos de relámpagos y altares de bronce expuestos.',
      symbol: 'Lanza de la Tormenta',
      color: 'Bronce negro, azul eléctrico y carbón',
    },
  },
  'kingdom-of-the-abyss': {
    en: {
      summary: 'A realm suspended between tides, dreams, and drowned cities.',
      architecture:
        'Sunken ruins, tide-worn lighthouses, and maritime sanctuaries.',
      symbol: 'Kraken',
      color: 'Turquoise, deep green, and weathered bronze',
    },
    es: {
      summary: 'Un reino suspendido entre mareas, sueños y ciudades ahogadas.',
      architecture:
        'Ruinas sumergidas, faros erosionados y santuarios marítimos.',
      symbol: 'Kraken',
      color: 'Turquesa, verde profundo y bronce envejecido',
    },
  },
  'scorched-wastes': {
    en: {
      summary: 'The wound left behind when the Age of Dragons came to an end.',
      architecture:
        'Burned citadels, volcanic stone, and roads buried beneath ash.',
      symbol: 'Dragon Skull',
      color: 'Volcanic ash, ember red, and bone',
    },
    es: {
      summary: 'La herida que quedó cuando terminó la Era de los Dragones.',
      architecture:
        'Ciudadelas quemadas, piedra volcánica y caminos sepultados bajo ceniza.',
      symbol: 'Cráneo de Dragón',
      color: 'Ceniza volcánica, rojo brasa y hueso',
    },
  },
};

const guardianCopy: Record<
  string,
  Record<EditorialLocale, [string, string, string, string, string]>
> = {
  'king-aldric': {
    en: [
      'The Last Sovereign of Ironhold',
      'The last king stands before the shattered gate, unwilling to abandon his oath.',
      'When the gate chains failed, Aldric dismissed his guard and remained alone. The Iron Crown did not grant victory—only enough time for his people to escape.',
      'Iron',
      'Honor',
    ],
    es: [
      'El Último Soberano de Ironhold',
      'El último rey permanece ante la puerta destruida, incapaz de abandonar su juramento.',
      'Cuando cedieron las cadenas de la puerta, Aldric despidió a su guardia y permaneció solo. La Corona de Hierro no le concedió la victoria, sino tiempo para que su pueblo escapara.',
      'Hierro',
      'Honor',
    ],
  },
  vhaldris: {
    en: [
      'Eternal Guardian of the Frost Crown',
      'An ancient white dragon fused with the sanctuary it has guarded for a thousand years.',
      'Vhaldris became part of the glacier so the memory of the north would never vanish. Its scales are runes now, and its breath preserves the final archive of the First Age.',
      'Ice',
      'Preservation',
    ],
    es: [
      'Guardián Eterno de la Corona de Hielo',
      'Un antiguo dragón blanco unido al santuario que protege desde hace mil años.',
      'Vhaldris se convirtió en parte del glaciar para que la memoria del norte jamás desapareciera. Sus escamas ahora son runas y su aliento conserva el último archivo de la Primera Era.',
      'Hielo',
      'Preservación',
    ],
  },
  yggor: {
    en: [
      'Eternal Guardian of the Oak Crown',
      'The primeval spirit rooted within the sanctuary of the Oak Crown.',
      'Yggor remembers every fallen tree and every seed yet to be born. Its body grows and decays in cycles, but its roots never leave the forest’s heart.',
      'Life',
      'Balance',
    ],
    es: [
      'Guardián Eterno de la Corona del Roble',
      'El espíritu primordial enraizado en el santuario de la Corona del Roble.',
      'Yggor recuerda cada árbol caído y cada semilla que aún no ha nacido. Su cuerpo crece y se marchita en ciclos, pero sus raíces nunca abandonan el corazón del bosque.',
      'Vida',
      'Equilibrio',
    ],
  },
  vaelor: {
    en: [
      'Storm Warden',
      'The immortal bond between the sky, the sea, and the Storm Crown.',
      'Vaelor watches the place where cloud and sea become one. Every bolt crossing his spear carries a message from distant borders that only he can read.',
      'Storm',
      'Vigilance',
    ],
    es: [
      'Guardián de la Tormenta',
      'El vínculo inmortal entre el cielo, el océano y la Corona de la Tormenta.',
      'Vaelor vigila el lugar donde nube y mar se vuelven uno. Cada rayo que cruza su lanza trae un mensaje de fronteras distantes que solo él sabe leer.',
      'Tormenta',
      'Vigilancia',
    ],
  },
  nereus: {
    en: [
      'The Kraken Caller',
      'The last priest able to understand the presence sleeping beneath the deep.',
      'Nereus does not command the Kraken; he translates its dreams. Each invocation costs him a human memory, and he has already forgotten the faces of those he tried to save.',
      'Ocean',
      'Knowledge',
    ],
    es: [
      'El Invocador del Kraken',
      'El último sacerdote capaz de comprender la presencia que duerme en las profundidades.',
      'Nereus no gobierna al Kraken: traduce sus sueños. Cada invocación le cuesta un recuerdo humano y ya olvidó los rostros de quienes intentó salvar.',
      'Océano',
      'Conocimiento',
    ],
  },
  'last-dragon-slayer': {
    en: [
      'Bearer of the Dragon’s Oath',
      'The warrior who ended the Age of Dragons and carries the burden of their extinction.',
      'Praised as a savior, he crosses the burned fields in search of an egg that may have survived his blade. His crown celebrates no conquest; it records a necessary crime.',
      'Ash',
      'Sacrifice',
    ],
    es: [
      'Portador del Juramento del Dragón',
      'El guerrero que terminó la Era de los Dragones y carga con el peso de su extinción.',
      'Celebrado como salvador, cruza los campos quemados buscando un huevo que quizá sobrevivió a su espada. Su corona no celebra una conquista: registra un crimen necesario.',
      'Ceniza',
      'Sacrificio',
    ],
  },
};

const crownCopy: Record<
  string,
  Record<EditorialLocale, [string, string, string, string, string]>
> = {
  'iron-crown': {
    en: [
      'Black iron',
      'Order',
      'A heavy geometric structure shaped by fortresses and lions.',
      'Forged from the first six links that sealed the gate of Ironhold.',
      'Authority as a burden, never an ornament.',
    ],
    es: [
      'Hierro negro',
      'Orden',
      'Una estructura pesada y geométrica inspirada en fortalezas y leones.',
      'Forjada con los primeros seis eslabones que sellaron la puerta de Ironhold.',
      'La autoridad como carga, nunca como ornamento.',
    ],
  },
  'frost-crown': {
    en: [
      'Ancient silver and primeval ice',
      'Preservation',
      'An open crown with six crystalline points, never a mask or visor.',
      'Born when the first winter froze a single drop of the Celestial Sea.',
      'To preserve is to remain still while the world changes.',
    ],
    es: [
      'Plata antigua y hielo primordial',
      'Preservación',
      'Una corona abierta con seis puntas cristalinas, nunca una máscara o visor.',
      'Nació cuando el primer invierno congeló una gota del Mar Celeste.',
      'Preservar es permanecer inmóvil mientras el mundo cambia.',
    ],
  },
  'oak-crown': {
    en: [
      'Living wood from the World Tree',
      'Life',
      'Branches, roots, moss, and amber woven into a living circlet.',
      'It grew around the first oath spoken beneath the World Tree.',
      'Life as a cycle, not permanence.',
    ],
    es: [
      'Madera viva del Árbol del Mundo',
      'Vida',
      'Ramas, raíces, musgo y ámbar entrelazados en un aro vivo.',
      'Creció alrededor del primer juramento pronunciado bajo el Árbol del Mundo.',
      'La vida como ciclo, no como permanencia.',
    ],
  },
  'storm-crown': {
    en: [
      'Lightning-scarred black bronze',
      'Change',
      'Asymmetric points shaped like captured bolts of lightning.',
      'Recovered from a broken obelisk during the storm that lasted a hundred years.',
      'Every stability carries the seed of rupture.',
    ],
    es: [
      'Bronce negro marcado por rayos',
      'Cambio',
      'Puntas asimétricas como relámpagos capturados.',
      'Recuperada de un obelisco partido durante la tormenta que duró cien años.',
      'Toda estabilidad contiene la semilla de una ruptura.',
    ],
  },
  'abyss-crown': {
    en: [
      'Abyssal bronze, coral, and ocean relics',
      'Knowledge',
      'Curving forms drawn from tentacles and the motion of deep tides.',
      'Found inside a drowned city that rose from the sea for a single night.',
      'Deep knowledge always changes the one who finds it.',
    ],
    es: [
      'Bronce abisal, coral y reliquias oceánicas',
      'Conocimiento',
      'Formas curvas inspiradas en tentáculos y mareas profundas.',
      'Hallada dentro de una ciudad ahogada que emergió del mar durante una sola noche.',
      'El conocimiento profundo siempre transforma a quien lo encuentra.',
    ],
  },
  'dragon-crown': {
    en: [
      'Horn, bone, and black steel',
      'End of an age',
      'A severe relic forged from the remains of the last dragon.',
      'Assembled in silence from fragments of the creature that ended the Age of Dragons.',
      'A victory that should never be celebrated.',
    ],
    es: [
      'Cuerno, hueso y acero negro',
      'Fin de una era',
      'Una reliquia severa forjada con los restos del último dragón.',
      'Montada en silencio con fragmentos de la criatura que terminó la Era de los Dragones.',
      'Una victoria que jamás debería celebrarse.',
    ],
  },
};

const timelineCopy: Record<
  string,
  Record<EditorialLocale, [string, string, string, string]>
> = {
  first: {
    en: [
      'First Age',
      'The awakening of the six forces',
      'Iron, ice, life, storm, ocean, and fire begin shaping the continent.',
      'Before the records',
    ],
    es: [
      'Primera Era',
      'El despertar de las seis fuerzas',
      'Hierro, hielo, vida, tormenta, océano y fuego comienzan a moldear el continente.',
      'Antes de los registros',
    ],
  },
  second: {
    en: [
      'Second Age',
      'The realms raise their borders',
      'Fortresses and sanctuaries rise around the ancestral artifacts.',
      'Year 1',
    ],
    es: [
      'Segunda Era',
      'Los reinos levantan sus fronteras',
      'Fortalezas y santuarios surgen alrededor de los artefactos ancestrales.',
      'Año 1',
    ],
  },
  fall: {
    en: [
      'Fall of the Realms',
      'The oaths are broken',
      'Alliances fail, and the Crowns begin choosing their Guardians.',
      'Year 418',
    ],
    es: [
      'Caída de los Reinos',
      'Los juramentos se rompen',
      'Las alianzas fracasan y las Coronas comienzan a elegir a sus Guardianes.',
      'Año 418',
    ],
  },
  dragons: {
    en: [
      'Age of Dragons',
      'The sky becomes a battlefield',
      'Dragons and mortals fight over the future of the six forces.',
      'Year 511',
    ],
    es: [
      'Era de los Dragones',
      'El cielo se convierte en campo de batalla',
      'Dragones y mortales disputan el futuro de las seis fuerzas.',
      'Año 511',
    ],
  },
  guardians: {
    en: [
      'Rise of the Guardians',
      'Six sacrifices preserve the balance',
      'Each Guardian accepts a bond they can never abandon.',
      'Year 603',
    ],
    es: [
      'Ascenso de los Guardianes',
      'Seis sacrificios preservan el equilibrio',
      'Cada Guardián acepta un vínculo que nunca podrá abandonar.',
      'Año 603',
    ],
  },
  now: {
    en: [
      'Present Day',
      'The Black Banner is raised',
      'Mercenaries and chroniclers discover signs of a seventh force.',
      'Year 742',
    ],
    es: [
      'Actualidad',
      'El Estandarte Negro se alza',
      'Mercenarios y cronistas descubren señales de una séptima fuerza.',
      'Año 742',
    ],
  },
};

const weaponCopy: Record<string, Record<EditorialLocale, [string, string]>> = {
  'iron-oath': {
    en: ['Royal sword', 'Forged from the metal of Ironhold’s first gate.'],
    es: [
      'Espada real',
      'Forjada con el metal de la primera puerta de Ironhold.',
    ],
  },
  'worldroot-staff': {
    en: ['Staff', 'A living branch that has never shed its leaves.'],
    es: ['Bastón', 'Una rama viva que jamás perdió sus hojas.'],
  },
  'thunder-spear': {
    en: ['Spear', 'It draws lightning before the storm is born.'],
    es: ['Lanza', 'Atrae el rayo antes de que nazca la tormenta.'],
  },
  'abyss-trident': {
    en: ['Trident', 'It lets its bearer hear what sleeps beneath the tides.'],
    es: ['Tridente', 'Permite escuchar aquello que duerme bajo las mareas.'],
  },
  'dragons-oath': {
    en: ['Blade', 'The final weapon tempered in dragonfire.'],
    es: ['Hoja', 'La última arma templada en fuego de dragón.'],
  },
};

function characterFields(item: Fields, locale: EditorialLocale): Fields {
  const name = String(item.name);
  const title = item.title ? String(item.title) : '';
  const en = locale === 'en';
  const seedEditorial = createCharacterEditorial(
    String(item.slug),
    name,
    '',
    '',
    locale,
  );
  const summary = seedEditorial.subtitle;
  const story = seedEditorial.currentState;
  return {
    name,
    ...(title && { title }),
    summary,
    story,
    ...createCharacterEditorial(
      String(item.slug),
      name,
      summary,
      story,
      locale,
    ),
    prompt: createCharacterPrompt(String(item.slug), name, locale),
    technicalSheet: en
      ? [
          'Digital sculpt for resin printing',
          'Separate narrative base',
          'Details scaled for a clear physical read',
        ]
      : [
          'Escultura digital para impresión en resina',
          'Base narrativa separada',
          'Detalles dimensionados para una lectura física clara',
        ],
    printInfo: en
      ? {
          orientation: 'Suggested tilt between 25° and 40°',
          supports: 'Medium supports on structural points',
          parts: 'Body and base supplied separately',
          notes: 'Validate islands and drainage before printing.',
        }
      : {
          orientation: 'Inclinación sugerida entre 25° y 40°',
          supports: 'Soportes medios en puntos estructurales',
          parts: 'Cuerpo y base suministrados por separado',
          notes: 'Validar islas y drenaje antes de imprimir.',
        },
    relatedMiniature: en
      ? `${name} — narrative edition`
      : `${name} — edición narrativa`,
    imageAlt: en
      ? `Character portrait of ${name}`
      : `Retrato del personaje ${name}`,
  };
}

function fieldsFor(
  entity: CmsEntityType,
  item: Fields,
  locale: EditorialLocale,
): Fields {
  const slug = String(item.slug || item.id);
  if (entity === 'characters') return characterFields(item, locale);
  if (entity === 'collections') {
    const [name, description] = collectionCopy[slug][locale],
      status =
        locale === 'en'
          ? (
              {
                'Em desenvolvimento': 'In development',
                Conceito: 'Concept',
                Legado: 'Legacy',
                Planejado: 'Planned',
              } as Record<string, string>
            )[String(item.status)] || item.status
          : (
              {
                'Em desenvolvimento': 'En desarrollo',
                Conceito: 'Concepto',
                Legado: 'Legado',
                Planejado: 'Planificado',
              } as Record<string, string>
            )[String(item.status)] || item.status;
    return { name, description, status };
  }
  if (entity === 'realms')
    return { name: item.name, ...realmCopy[slug][locale] };
  if (entity === 'guardians') {
    const [title, summary, story, element, virtue] = guardianCopy[slug][locale];
    return {
      name: item.name,
      title,
      summary,
      story,
      element,
      virtue,
      symbol:
        realmCopy[String(item.realm).toLowerCase().replaceAll(' ', '-')]?.[
          locale
        ]?.symbol || item.symbol,
      prompt:
        locale === 'en'
          ? `Cinematic guardian miniature of ${item.name}, monumental silhouette, realm materials, and a base shaped by sacrifice.`
          : `Miniatura cinematográfica del guardián ${item.name}, silueta monumental, materiales de su reino y una base marcada por el sacrificio.`,
    };
  }
  if (entity === 'crowns') {
    const [material, element, visual, history, concept] =
      crownCopy[slug][locale];
    return {
      name: item.name,
      material,
      element,
      visual,
      history,
      concept,
      prompt:
        locale === 'en'
          ? `Open ceremonial crown of ${material}; artifact proportions, no mask, no helmet.`
          : `Corona ceremonial abierta de ${material}; proporciones de artefacto, sin máscara ni yelmo.`,
    };
  }
  if (entity === 'weapons') {
    const [type, legend] = weaponCopy[slug][locale];
    return { name: item.name, type, legend };
  }
  if (entity === 'timeline') {
    const [era, title, summary, year] = timelineCopy[slug][locale];
    return { era, title, summary, year };
  }
  if (entity === 'gallery')
    return {
      title: item.title,
      alt:
        locale === 'en'
          ? `Official Asterheim artwork: ${item.title}`
          : `Arte oficial de Asterheim: ${item.title}`,
      caption:
        locale === 'en'
          ? `A visual record from the living archive of Asterheim.`
          : `Un registro visual del archivo vivo de Asterheim.`,
    };
  if (entity === 'news')
    return locale === 'en'
      ? {
          title: 'The banner has been raised',
          excerpt: 'The living archive of Asterheim begins.',
          date: 'July 12, 2026',
        }
      : {
          title: 'El estandarte se ha alzado',
          excerpt: 'Comienza el archivo vivo de Asterheim.',
          date: '12 de julio de 2026',
        };
  if (entity === 'marketplaces')
    return {
      name:
        slug === 'official-store'
          ? locale === 'en'
            ? 'Official Store'
            : 'Tienda Oficial'
          : item.name,
      description:
        locale === 'en'
          ? `Official distribution channel for The Black Banner Chronicles miniatures and printable models.`
          : `Canal oficial de distribución de miniaturas y modelos imprimibles de The Black Banner Chronicles.`,
    };
  if (entity === 'marketplaceListings')
    return {
      title: item.title,
      license: locale === 'en' ? 'Personal use' : 'Uso personal',
      ...(item.notes
        ? {
            notes:
              locale === 'en' ? 'Instant download' : 'Descarga instantánea',
          }
        : {}),
    };
  if (entity === 'artBible' || entity === 'printGuide')
    return item[locale] as Fields;
  return { name: item.name };
}

export function withEditorialTranslations(
  entity: CmsEntityType,
  item: Fields,
): Fields {
  const current = (item.translations || {}) as Partial<
    Record<Locale, StoredTranslation>
  >;
  const now = '2026-07-13T00:00:00.000Z';
  return {
    ...item,
    translations: {
      ...current,
      en: {
        fields: fieldsFor(entity, item, 'en'),
        status: 'published',
        version: 1,
        updatedAt: now,
      },
      es: {
        fields: fieldsFor(entity, item, 'es'),
        status: 'published',
        version: 1,
        updatedAt: now,
      },
    },
  };
}

export const artBibleSeeds: Fields[] = [
  {
    slug: 'official-art-bible',
    name: 'Art Bible',
    title: 'The visual and narrative laws of Asterheim',
    summary:
      'A living reference for silhouette, material, story, scale, and production.',
    chapters: [
      'Manifesto',
      'Universe',
      'Realms',
      'Guardians',
      'Crowns',
      'Characters',
      'Scale',
      'Silhouettes and weapons',
      'Narrative bases',
      'Materials and palettes',
      'Printing rules',
      'Creative pipeline',
    ],
    en: {
      name: 'Art Bible',
      title: 'The visual and narrative laws of Asterheim',
      summary:
        'A living reference for silhouette, material, story, scale, and production.',
      chapters: [
        'Manifesto',
        'Universe',
        'Realms',
        'Guardians',
        'Crowns',
        'Characters',
        'Scale',
        'Silhouettes and weapons',
        'Narrative bases',
        'Materials and palettes',
        'Printing rules',
        'Creative pipeline',
      ],
    },
    es: {
      name: 'Biblia de Arte',
      title: 'Las leyes visuales y narrativas de Asterheim',
      summary:
        'Una referencia viva de silueta, material, historia, escala y producción.',
      chapters: [
        'Manifiesto',
        'Universo',
        'Reinos',
        'Guardianes',
        'Coronas',
        'Personajes',
        'Escala',
        'Siluetas y armas',
        'Bases narrativas',
        'Materiales y paletas',
        'Reglas de impresión',
        'Flujo creativo',
      ],
    },
  },
];

export const printGuideSeeds: Fields[] = [
  {
    slug: 'resin-miniature-guide',
    name: 'Guia de impressão em resina',
    title: 'Da orientação à cura final',
    summary:
      'Parâmetros editoriais e técnicos para preservar a leitura de cada miniatura.',
    instructions: [
      'Oriente a peça entre 25° e 40°.',
      'Use suportes médios nos pontos estruturais.',
      'Valide ilhas, cavidades e drenagem.',
      'Lave, cure e inspecione antes de montar.',
    ],
    en: {
      name: 'Resin Printing Guide',
      title: 'From orientation to final cure',
      summary:
        'Editorial and technical parameters that preserve the visual read of every miniature.',
      instructions: [
        'Angle the piece between 25° and 40°.',
        'Use medium supports on structural points.',
        'Validate islands, cavities, and drainage.',
        'Wash, cure, and inspect before assembly.',
      ],
    },
    es: {
      name: 'Guía de Impresión en Resina',
      title: 'De la orientación al curado final',
      summary:
        'Parámetros editoriales y técnicos que preservan la lectura visual de cada miniatura.',
      instructions: [
        'Inclina la pieza entre 25° y 40°.',
        'Usa soportes medios en puntos estructurales.',
        'Valida islas, cavidades y drenaje.',
        'Lava, cura e inspecciona antes del montaje.',
      ],
    },
  },
];
