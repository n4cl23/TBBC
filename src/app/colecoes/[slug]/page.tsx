export const dynamic = 'force-dynamic';
import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { collections, type Character, type Collection } from '@/data/content';
import { listCharacterMedia } from '@/lib/media-repository';
import { mediaSrc } from '@/lib/media';
import { CharacterPoster } from '@/components/CharacterPoster';
import {
  getLocalizedPublishedData,
  getLocalizedPublishedEntity,
  getPublishedData,
} from '@/lib/cms-public';
import { formatPrice, localizedAlternates, localizedPath } from '@/lib/i18n';
import { requestLocale } from '@/lib/locale-server';
import { localeDiagnostics } from '@/lib/localized-content';
import type { Marketplace, MarketplaceListing } from '@/types/marketplace';
import { BeastsExperience } from '@/components/BeastsExperience';

export function generateStaticParams() {
  return collections.map((x) => ({ slug: x.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const [{ slug }, locale] = await Promise.all([params, requestLocale()]);
  const result = await getLocalizedPublishedEntity<Collection>(
    'collections',
    slug,
    locale,
  );
  const collection = result?.data;
  const canonical = localizedPath(locale, 'collections', slug);
  const isBestiary = slug === 'beasts-of-asterheim';
  const title = isBestiary
    ? 'Beasts of Asterheim — The Official Bestiary'
    : collection?.name || 'Collection';
  const description = isBestiary
    ? 'The surviving field records of the creatures that haunt the Six Realms of Asterheim.'
    : collection?.description;
  return {
    title,
    description,
    alternates: {
      canonical,
      languages: localizedAlternates('collections', slug),
    },
    openGraph: {
      title,
      description,
      locale: locale === 'pt-br' ? 'pt_BR' : locale,
      images: isBestiary ? ['/images/bestiary/beasts-hero.webp'] : undefined,
    },
    twitter: isBestiary
      ? {
          card: 'summary_large_image',
          title,
          description,
          images: ['/images/bestiary/beasts-hero.webp'],
        }
      : undefined,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const [{ slug }, locale] = await Promise.all([params, requestLocale()]);
  if (slug === 'beasts-of-asterheim') return <BeastsExperience />;
  const [collectionResult, characterResults, media, markets, listings] =
    await Promise.all([
      getLocalizedPublishedEntity<Collection>('collections', slug, locale),
      getLocalizedPublishedData<Character>('characters', locale),
      listCharacterMedia(),
      getPublishedData<Marketplace>('marketplaces'),
      getPublishedData<MarketplaceListing>('marketplaceListings'),
    ]);
  if (!collectionResult) notFound();
  const collection = collectionResult.data;
  const characters = characterResults
    .map((x) => x.data)
    .filter((x) => x.collection === slug);
  const cover = characters[0]
    ? media[characters[0].slug]?.primary || characters[0].image
    : '/images/hero/banner-chronicles.webp';
  const copy =
    locale === 'en'
      ? {
          chapter: 'Collection',
          chronicles: 'chronicles',
          saga: 'A saga told through characters and resin.',
          cast: 'Meet the cast',
          people: 'Characters in the saga',
          title: 'One banner. Many destinies.',
          progress: 'Collection progress',
          journey: 'From concept to marketplace',
          missing: 'Not announced yet',
        }
      : locale === 'es'
        ? {
            chapter: 'Colección',
            chronicles: 'crónicas',
            saga: 'Una saga contada en personajes y resina.',
            cast: 'Conocer el elenco',
            people: 'Personajes de la saga',
            title: 'Un estandarte. Muchos destinos.',
            progress: 'Progreso de la colección',
            journey: 'Del concepto al marketplace',
            missing: 'Aún no anunciado',
          }
        : {
            chapter: 'Coleção',
            chronicles: 'crônicas',
            saga: 'Uma saga contada em personagens e resina.',
            cast: 'Conhecer o elenco',
            people: 'Personagens da saga',
            title: 'Um estandarte. Muitos destinos.',
            progress: 'Progressão da coleção',
            journey: 'Do conceito ao marketplace',
            missing: 'Ainda não anunciado',
          };
  return (
    <article
      className="collection-book"
      style={{ '--collection': collection.accent } as React.CSSProperties}
      {...localeDiagnostics(collectionResult)}
    >
      <header className="collection-hero">
        <Image
          src={mediaSrc(cover, 'full')}
          alt={String(
            (collection as Collection & { imageAlt?: string }).imageAlt ||
              collection.name,
          )}
          fill
          priority
          sizes="100vw"
        />
        <div />
        <div className="container">
          <span className="eyebrow">
            {copy.chapter} · {collection.count} {copy.chronicles}
          </span>
          <h1 className="serif">{collection.name}</h1>
          <blockquote>“{collection.description}”</blockquote>
          <p>
            {collection.status} · {copy.saga}
          </p>
          <a className="button" href="#collection-cast">
            {copy.cast}
          </a>
        </div>
      </header>
      <section id="collection-cast" className="legend-section">
        <div className="container">
          <span className="eyebrow">{copy.people}</span>
          <h2 className="serif collection-title">{copy.title}</h2>
          <div className="poster-grid">
            {characters.map((character, index) => (
              <CharacterPoster
                key={character.slug}
                name={character.name}
                title={character.title || character.scale}
                quote={character.summary}
                href={localizedPath(locale, 'characters', character.slug)}
                image={media[character.slug]?.primary || character.image}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>
      <section className="legend-section legend-dark">
        <div className="container">
          <span className="eyebrow">{copy.progress}</span>
          <h2 className="serif collection-title">{copy.journey}</h2>
          <div className="collection-progress">
            {characters.map((character) => {
              const listing = listings.find(
                  (x) => x.entityId === character.slug,
                ),
                market = markets.find((x) => x.id === listing?.marketplaceId);
              return (
                <div className="collection-progress-row" key={character.slug}>
                  <span aria-hidden>
                    {listing?.status === 'available'
                      ? '✓'
                      : listing?.status === 'coming-soon'
                        ? '◷'
                        : '○'}
                  </span>
                  <strong>{character.name}</strong>
                  <small>{market?.name || copy.missing}</small>
                  <small>
                    {listing
                      ? formatPrice(listing.price, listing.currency, locale)
                      : character.status}
                  </small>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </article>
  );
}
