import type { MetadataRoute } from 'next';
import {
  collections,
  characters,
  guardians,
  realms,
  crowns,
} from '@/data/content';
import { marketplaces } from '@/data/marketplaces';
import { locales, localizedPath, type Locale } from '@/lib/i18n';
const base = 'https://blackbannerchronicles.com';
function entry(
  paths: Record<Locale, string>,
  locale: Locale,
): MetadataRoute.Sitemap[number] {
  return {
    url: `${base}${paths[locale]}`,
    alternates: {
      languages: {
        'pt-BR': `${base}${paths['pt-br']}`,
        en: `${base}${paths.en}`,
        es: `${base}${paths.es}`,
      },
    },
  };
}
export default function sitemap(): MetadataRoute.Sitemap {
  const rows: Array<Record<Locale, string>> = [];
  for (const key of [
    'home',
    'universe',
    'collections',
    'characters',
    'guardians',
    'crowns',
    'realms',
    'artBible',
    'print',
    'gallery',
    'news',
    'about',
    'contact',
    'marketplaces',
  ] as const)
    rows.push(
      Object.fromEntries(
        locales.map((locale) => [locale, localizedPath(locale, key)]),
      ) as Record<Locale, string>,
    );
  for (const [key, items] of [
    ['collections', collections],
    ['characters', characters],
    ['guardians', guardians],
    ['crowns', crowns],
    ['realms', realms],
    ['marketplaces', marketplaces],
  ] as const)
    for (const item of items)
      rows.push(
        Object.fromEntries(
          locales.map((locale) => [
            locale,
            localizedPath(locale, key, item.slug),
          ]),
        ) as Record<Locale, string>,
      );
  return rows.flatMap((paths) => locales.map((locale) => entry(paths, locale)));
}
