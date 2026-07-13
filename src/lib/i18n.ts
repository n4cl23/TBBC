export const locales = ['pt-br', 'en', 'es'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'pt-br';
export const localeConfig = {
  'pt-br': { html: 'pt-BR', label: 'Português', short: 'PT', date: 'pt-BR' },
  en: { html: 'en', label: 'English', short: 'EN', date: 'en-US' },
  es: { html: 'es', label: 'Español', short: 'ES', date: 'es-ES' },
} as const;
export const routeNames = {
  home: { 'pt-br': '', en: '', es: '' },
  universe: { 'pt-br': 'universo', en: 'universe', es: 'universo' },
  collections: { 'pt-br': 'colecoes', en: 'collections', es: 'colecciones' },
  characters: { 'pt-br': 'personagens', en: 'characters', es: 'personajes' },
  guardians: { 'pt-br': 'guardioes', en: 'guardians', es: 'guardianes' },
  crowns: { 'pt-br': 'coroas', en: 'crowns', es: 'coronas' },
  realms: { 'pt-br': 'reinos', en: 'realms', es: 'reinos' },
  gallery: { 'pt-br': 'galeria', en: 'gallery', es: 'galeria' },
  news: { 'pt-br': 'novidades', en: 'news', es: 'noticias' },
  about: { 'pt-br': 'sobre', en: 'about', es: 'acerca' },
  contact: { 'pt-br': 'contato', en: 'contact', es: 'contacto' },
  marketplaces: {
    'pt-br': 'marketplaces',
    en: 'marketplaces',
    es: 'marketplaces',
  },
  artBible: { 'pt-br': 'art-bible', en: 'art-bible', es: 'art-bible' },
  print: { 'pt-br': 'impressao-3d', en: '3d-printing', es: 'impresion-3d' },
} as const;
type RouteKey = keyof typeof routeNames;
export const dictionary = {
  'pt-br': {
    nav: {
      universe: 'Universo',
      collections: 'Coleções',
      characters: 'Personagens',
      guardians: 'Guardiões',
      crowns: 'Coroas',
      realms: 'Reinos',
      gallery: 'Galeria',
      marketplaces: 'Marketplaces',
    },
    language: 'Idioma',
    openMenu: 'Abrir menu',
    closeMenu: 'Fechar menu',
    metaDescription:
      'Miniaturas colecionáveis e crônicas do mundo original de Asterheim.',
    tagline: 'Um mundo contado em resina.',
  },
  en: {
    nav: {
      universe: 'Universe',
      collections: 'Collections',
      characters: 'Characters',
      guardians: 'Guardians',
      crowns: 'Crowns',
      realms: 'Realms',
      gallery: 'Gallery',
      marketplaces: 'Marketplaces',
    },
    language: 'Language',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    metaDescription:
      'Collectible miniatures and chronicles from the original world of Asterheim.',
    tagline: 'A world told in resin.',
  },
  es: {
    nav: {
      universe: 'Universo',
      collections: 'Colecciones',
      characters: 'Personajes',
      guardians: 'Guardianes',
      crowns: 'Coronas',
      realms: 'Reinos',
      gallery: 'Galería',
      marketplaces: 'Marketplaces',
    },
    language: 'Idioma',
    openMenu: 'Abrir menú',
    closeMenu: 'Cerrar menú',
    metaDescription:
      'Miniaturas coleccionables y crónicas del mundo original de Asterheim.',
    tagline: 'Un mundo contado en resina.',
  },
} as const;
export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}
export function localizedPath(locale: Locale, key: RouteKey, slug?: string) {
  return `/${locale}/${routeNames[key][locale]}${slug ? `/${slug}` : ''}`.replace(
    /\/$/,
    locale === defaultLocale && key === 'home' ? `/${locale}` : '',
  );
}
export function routeKeyFromSegment(segment: string): RouteKey | undefined {
  return (Object.keys(routeNames) as RouteKey[]).find((key) =>
    Object.values(routeNames[key]).includes(segment as never),
  );
}
export function switchLocalePath(pathname: string, next: Locale) {
  const parts = pathname.split('/').filter(Boolean),
    current = isLocale(parts[0] || '')
      ? (parts.shift() as Locale)
      : defaultLocale,
    segment = parts.shift() || '',
    key = routeKeyFromSegment(segment) || 'home',
    slug = parts.join('/');
  void current;
  return localizedPath(next, key, slug || undefined);
}
export function detectLocale(acceptLanguage: string | null): Locale {
  const raw = (acceptLanguage || '').toLowerCase();
  if (raw.startsWith('en') || raw.includes(',en')) return 'en';
  if (raw.startsWith('es') || raw.includes(',es')) return 'es';
  return defaultLocale;
}
export function formatPrice(amount: number, currency: string, locale: Locale) {
  return new Intl.NumberFormat(localeConfig[locale].date, {
    style: 'currency',
    currency,
  }).format(amount);
}
export function localizedAlternates(key: RouteKey, slug?: string) {
  return {
    'pt-BR': localizedPath('pt-br', key, slug),
    en: localizedPath('en', key, slug),
    es: localizedPath('es', key, slug),
    'x-default': localizedPath('pt-br', key, slug),
  };
}
