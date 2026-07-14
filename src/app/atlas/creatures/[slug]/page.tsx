import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CreatureRecord } from '@/components/CreatureRecord';
import { creatures, findCreature, localizeCreature } from '@/data/creatures';
import { localizedAlternates, localizedPath } from '@/lib/i18n';
import { requestLocale } from '@/lib/locale-server';
import { SITE_URL } from '@/lib/site';

export function generateStaticParams() { return creatures.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const [{ slug }, locale] = await Promise.all([params, requestLocale()]), record = findCreature(slug);
  if (!record) return { title: 'Creature' };
  const creature = localizeCreature(record, locale), canonical = localizedPath(locale, 'atlas', `creatures/${slug}`);
  return { title: creature.seoTitle, description: creature.seoDescription, alternates: { canonical, languages: localizedAlternates('atlas', `creatures/${slug}`) }, openGraph: { type: 'article', title: creature.name, description: creature.summary, url: canonical, images: [{ url: creature.heroImage, alt: creature.imageAlt }] }, twitter: { card: 'summary_large_image', title: creature.name, description: creature.summary, images: [creature.heroImage] } };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const [{ slug }, locale] = await Promise.all([params, requestLocale()]), record = findCreature(slug);
  if (!record) notFound();
  const creature = localizeCreature(record, locale), threatOrder = ['low', 'moderate', 'high', 'extreme', 'catastrophic', 'variable'];
  const related = creatures.filter((item) => item.slug !== slug).map((item) => ({ item, score: (item.realmId === record.realmId ? 6 : 0) + (item.category === record.category ? 3 : 0) + Math.max(0, 2 - Math.abs(threatOrder.indexOf(item.threatLevel) - threatOrder.indexOf(record.threatLevel))) + (item.featured ? 1 : 0) })).sort((a, b) => b.score - a.score || a.item.name.localeCompare(b.item.name)).slice(0, 4).map(({ item }) => localizeCreature(item, locale));
  const url = `${SITE_URL}${localizedPath(locale, 'atlas', `creatures/${slug}`)}`;
  const work = { '@context': 'https://schema.org', '@type': 'CreativeWork', name: creature.name, alternateName: creature.epithet, description: creature.summary, image: `${SITE_URL}${creature.heroImage}`, url, inLanguage: locale, isPartOf: { '@type': 'CreativeWorkSeries', name: 'The Black Banner Chronicles' }, about: { '@type': 'Thing', name: creatureRealmProfilesName(record.realmId) } };
  const breadcrumbs = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Atlas', item: `${SITE_URL}${localizedPath(locale, 'atlas')}` }, { '@type': 'ListItem', position: 2, name: 'Creatures', item: `${SITE_URL}${localizedPath(locale, 'atlas', 'creatures')}` }, { '@type': 'ListItem', position: 3, name: creature.name, item: url }] };
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(work).replaceAll('<', '\\u003c') }}/><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs).replaceAll('<', '\\u003c') }}/><CreatureRecord creature={creature} related={related} locale={locale}/></>;
}

function creatureRealmProfilesName(realmId: string) { return realmId.split('-').map((part) => part[0]?.toUpperCase() + part.slice(1)).join(' '); }
