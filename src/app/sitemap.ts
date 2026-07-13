import type { MetadataRoute } from 'next';
import {
  collections,
  characters,
  guardians,
  realms,
  crowns,
} from '@/data/content';
import {marketplaces} from '@/data/marketplaces';
export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://blackbannerchronicles.com',
    staticRoutes = [
      '',
      'universo',
      'colecoes',
      'personagens',
      'guardioes',
      'coroas',
      'reinos',
      'art-bible',
      'impressao-3d',
      'galeria',
      'novidades',
      'sobre',
      'contato',
      'marketplaces',
    ];
  return [
    ...staticRoutes.map((x) => ({ url: `${base}/${x}` })),
    ...collections.map((x) => ({ url: `${base}/colecoes/${x.slug}` })),
    ...characters.map((x) => ({ url: `${base}/personagens/${x.slug}` })),
    ...guardians.map((x) => ({ url: `${base}/guardioes/${x.slug}` })),
    ...crowns.map((x) => ({ url: `${base}/coroas/${x.slug}` })),
    ...realms.map((x) => ({ url: `${base}/reinos/${x.slug}` })),
    ...marketplaces.map((x) => ({url:`${base}/marketplaces/${x.slug}`})),
  ];
}
