export const dynamic = 'force-dynamic';

import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowDown,
  ArrowUpRight,
  BookOpen,
  Crown as CrownIcon,
  Flag,
  Landmark,
  MapPin,
  Play,
  Shield,
  Sparkles,
  Sword,
} from 'lucide-react';
import {
  type Character,
  type Collection,
  type Crown,
  type Guardian,
  type Realm,
} from '@/data/content';
import {graphService} from '@/lib/semantic-graph';
import {
  getLocalizedPublishedData,
  getLocalizedPublishedEntity,
  getPublishedData,
} from '@/lib/cms-public';
import { getCharacterMedia } from '@/lib/media-repository';
import { getCharacterNarrative } from '@/lib/character-narrative';
import { mediaAlt, mediaSrc } from '@/lib/media';
import { Reveal } from '@/components/CharacterExperience';
import {
  CharacterHeroMedia,
  CodexGallery,
  RunicAttributes,
  SculptureViewer,
  type CodexGalleryAsset,
} from '@/components/CharacterCodex';
import { MarketplaceGrid } from '@/components/marketplace/Marketplace';
import type { Marketplace, MarketplaceListing } from '@/types/marketplace';
import { localizedAlternates, localizedPath } from '@/lib/i18n';
import { requestLocale } from '@/lib/locale-server';
import { localeDiagnostics } from '@/lib/localized-content';
import {
  characterCodexCopy,
  characterModels,
  characterPortraits,
  characterVideos,
} from '@/data/character-codex';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const [{ slug }, locale] = await Promise.all([params, requestLocale()]);
  const character = (
    await getLocalizedPublishedEntity<Character>('characters', slug, locale)
  )?.data;
  const canonical = localizedPath(locale, 'characters', slug);
  return {
    title: character?.name || 'Character',
    description: character?.summary,
    alternates: {
      canonical,
      languages: localizedAlternates('characters', slug),
    },
    openGraph: {
      title: character?.name,
      description: character?.summary,
      images: [mediaSrc(character?.image, 'full')],
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const [{ slug }, locale] = await Promise.all([params, requestLocale()]);
  const characterResults = await getLocalizedPublishedData<Character>(
    'characters',
    locale,
  );
  const characters = characterResults.map((result) => result.data);
  const index = characters.findIndex((character) => character.slug === slug);
  const character = characters[index];
  const characterResult = characterResults[index];
  if (!character) notFound();

  const [
    media,
    marketplaces,
    allListings,
    collectionResults,
    guardianResults,
    crownResults,
    realmResults,
  ] = await Promise.all([
    getCharacterMedia(slug),
    getPublishedData<Marketplace>('marketplaces'),
    getPublishedData<MarketplaceListing>('marketplaceListings'),
    getLocalizedPublishedData<Collection>('collections', locale),
    getLocalizedPublishedData<Guardian>('guardians', locale),
    getLocalizedPublishedData<Crown>('crowns', locale),
    getLocalizedPublishedData<Realm>('realms', locale),
  ]);

  const collections = collectionResults.map((result) => result.data);
  const guardians = guardianResults.map((result) => result.data);
  const crowns = crownResults.map((result) => result.data);
  const realms = realmResults.map((result) => result.data);
  const collection = collections.find(
    (item) => item.slug === character.collection,
  );
  const guardian = guardians.find((item) => item.name === character.guardian);
  const crown = crowns.find((item) => item.name === character.crown);
  const realm = realms.find((item) => item.name === character.realm);
  const narrative = getCharacterNarrative(character, index, locale);
  const copy = characterCodexCopy[locale];
  const main = media.primary || character.image;
  const heroImage = characterPortraits[slug] || mediaSrc(main, 'full');
  const videos = characterVideos[slug] || [];
  const model = characterModels[slug];
  const listings = allListings.filter(
    (listing) => listing.entityId === character.slug,
  );
  const available = listings.find((listing) => listing.status === 'available');

  const timelineSource = character.timeline || [];
  const storyChapters = [
    narrative.origin,
    narrative.rise,
    narrative.fall,
    narrative.current,
    narrative.legacy,
  ]
    .map((text, chapterIndex) => ({
      text,
      title: copy.storyParts[chapterIndex],
    }))
    .filter((chapter) => chapter.text.trim().length > 0);

  const galleryCandidates = [
    heroImage,
    main,
    ...media.gallery,
    ...character.gallery,
  ];
  const galleryAssets = galleryCandidates.reduce<CodexGalleryAsset[]>(
    (assets, image, galleryIndex) => {
      const src = mediaSrc(image, 'full');
      if (assets.some((asset) => asset.src === src)) return assets;
      assets.push({
        id:
          typeof image === 'string'
            ? `${character.slug}-${galleryIndex}`
            : image.id,
        src,
        alt: mediaAlt(image, `${copy.portrait} ${character.name}`),
        caption:
          typeof image === 'string'
            ? character.name
            : image.caption || character.name,
        category:
          galleryIndex === 0 ? copy.portraitCategory : copy.studyCategory,
      });
      return assets;
    },
    [],
  );

  const relations = [
    collection && {
      id: 'collection',
      label: collection.name,
      type: copy.relationTypes.collection,
      detail: collection.description,
      href: localizedPath(locale, 'collections', collection.slug),
      icon: <Flag />,
    },
    realm && {
      id: 'realm',
      label: realm.name,
      type: copy.relationTypes.realm,
      detail: realm.summary,
      href: localizedPath(locale, 'realms', realm.slug),
      icon: <Landmark />,
    },
    guardian && {
      id: 'guardian',
      label: guardian.name,
      type: copy.relationTypes.guardian,
      detail: guardian.summary,
      href: localizedPath(locale, 'guardians', guardian.slug),
      icon: <Shield />,
    },
    crown && {
      id: 'crown',
      label: crown.name,
      type: copy.relationTypes.crown,
      detail: crown.concept,
      href: localizedPath(locale, 'crowns', crown.slug),
      icon: <CrownIcon />,
    },
    character.weapon && {
      id: 'weapon',
      label: character.weapon,
      type: copy.relationTypes.weapon,
      detail: character.technicalSheet[0],
      icon: <Sword />,
    },
    ...(character.allies || []).map((relationSlug) => {
      const ally = characters.find((item) => item.slug === relationSlug);
      return (
        ally && {
          id: `ally-${ally.slug}`,
          label: ally.name,
          type: copy.relationTypes.ally,
          detail: ally.summary,
          href: localizedPath(locale, 'characters', ally.slug),
          icon: <Shield />,
        }
      );
    }),
    ...(character.enemies || []).map((relationSlug) => {
      const enemy = characters.find((item) => item.slug === relationSlug);
      return (
        enemy && {
          id: `enemy-${enemy.slug}`,
          label: enemy.name,
          type: copy.relationTypes.enemy,
          detail: enemy.summary,
          href: localizedPath(locale, 'characters', enemy.slug),
          icon: <Sword />,
        }
      );
    }),
  ].filter(Boolean) as Array<{
    id: string;
    label: string;
    type: string;
    detail: string;
    href?: string;
    icon: React.ReactNode;
  }>;

  const relatedCharacters = graphService.related(character.slug,2)
    .filter((entity)=>entity.kind==='character')
    .map((entity)=>characters.find((item)=>item.slug===entity.slug))
    .filter((item):item is Character=>Boolean(item))
    .slice(0,4);

  return (
    <article
      className="character-codex"
      style={
        {
          '--codex-accent': collection?.accent || narrative.palette[1],
        } as React.CSSProperties
      }
      {...localeDiagnostics(characterResult)}
    >
      {available ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Product',
              name: character.name,
              image: heroImage,
              description: character.summary,
              offers: {
                '@type': 'Offer',
                url: available.url,
                price: available.price,
                priceCurrency: available.currency,
                availability: 'https://schema.org/InStock',
              },
            }),
          }}
        />
      ) : null}

      <header className="codex-hero">
        <CharacterHeroMedia
          image={heroImage}
          alt={`${copy.portrait} ${character.name}`}
          video={videos[0]?.src}
        />
        <div className="codex-hero-atmosphere" aria-hidden="true" />
        <div className="codex-hero-grain" aria-hidden="true" />
        <div className="container codex-hero-copy">
          <span className="codex-kicker">
            <BookOpen /> {copy.archive} ·{' '}
            {collection?.name || character.collection}
          </span>
          <h1>{character.name}</h1>
          <h2>{narrative.epicTitle}</h2>
          <blockquote>{narrative.quote}</blockquote>
          <div className="codex-hero-facts">
            <span>
              <MapPin /> {character.realm || copy.unknownRealm}
            </span>
            <span>
              <Sparkles /> {character.status}
            </span>
            <span>
              <Shield /> {character.guardian || copy.independent}
            </span>
            <span>
              <CrownIcon /> {character.crown || narrative.symbol}
            </span>
          </div>
        </div>
        <a className="codex-scroll" href="#summary" aria-label={copy.summary}>
          <ArrowDown />
        </a>
      </header>

      <nav className="codex-chapter-nav" aria-label={copy.navigate}>
        <div className="container">
          {[
            'summary',
            'story',
            'timeline',
            'personality',
            'attributes',
            'relations',
            'gallery',
            'miniature',
          ].map((id, navIndex) => (
            <a href={`#${id}`} key={id}>
              <span>{String(navIndex + 1).padStart(2, '0')}</span>
              {copy.nav[navIndex]}
            </a>
          ))}
        </div>
      </nav>

      <Reveal>
        <section className="codex-section codex-summary" id="summary">
          <div className="container codex-summary-grid">
            <div>
              <span className="codex-index">I</span>
              <span className="codex-kicker">{copy.summary}</span>
              <h2>{narrative.subtitle}</h2>
            </div>
            <p className="codex-lead">{character.summary}</p>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="codex-section codex-dark" id="story">
          <div className="container">
            <CodexHeading
              index="II"
              eyebrow={copy.chronicle}
              title={narrative.epicTitle}
            />
            <div className="codex-story-grid">
              {storyChapters.map(({ text, title }, storyIndex) => (
                <article key={title}>
                  <span>{String(storyIndex + 1).padStart(2, '0')}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="codex-section" id="timeline">
          <div className="container">
            <CodexHeading
              index="III"
              eyebrow={copy.timeline}
              title={copy.timelineTitle}
            />
            <div className="codex-timeline">
              {timelineSource.map((event, eventIndex) => (
                <article key={`${event.year}-${eventIndex}`}>
                  <div>
                    <Sparkles />
                  </div>
                  <small>{event.year}</small>
                  <span>{copy.timelineParts[eventIndex] || copy.current}</span>
                  <h3>{event.title}</h3>
                  <p>{event.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="codex-section codex-dark" id="personality">
          <div className="container">
            <CodexHeading
              index="IV"
              eyebrow={copy.personality}
              title={copy.personalityTitle}
            />
            <div className="personality-manuscript">
              <blockquote>
                <Sparkles />
                <span>{copy.testimony}</span>
                <p>{narrative.quote}</p>
              </blockquote>
              <div className="personality-facets">
                <PersonalityFacet
                  title={copy.virtues}
                  items={narrative.virtues}
                  tone="light"
                />
                <PersonalityFacet
                  title={copy.flaws}
                  items={narrative.flaws}
                  tone="shadow"
                />
                <PersonalityFacet
                  title={copy.fears}
                  items={narrative.fears}
                  tone="shadow"
                />
                <PersonalityFacet
                  title={copy.goals}
                  items={narrative.goals}
                  tone="light"
                />
                <PersonalityFacet
                  title={copy.rumors}
                  items={narrative.rumors}
                  tone="gold"
                />
                <PersonalityFacet
                  title={copy.motivations}
                  items={[narrative.current]}
                  tone="gold"
                />
                <PersonalityFacet
                  title={copy.oaths}
                  items={[narrative.legacy]}
                  tone="gold"
                />
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section
          className="codex-section codex-attributes-section"
          id="attributes"
        >
          <div className="container">
            <CodexHeading
              index="V"
              eyebrow={copy.attributes}
              title={copy.attributesTitle}
            />
            <RunicAttributes
              traits={narrative.traits}
              label={copy.attributesLabel}
            />
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="codex-section codex-dark" id="relations">
          <div className="container">
            <CodexHeading
              index="VI"
              eyebrow={copy.relations}
              title={copy.relationsTitle}
            />
            <div className="codex-relations">
              <div className="relation-center">
                <Image src={heroImage} alt="" fill sizes="240px" />
                <strong>{character.name}</strong>
              </div>
              <div className="relation-list">
                {relations.map((relation) => {
                  const content = (
                    <>
                      <span>{relation.icon}</span>
                      <div>
                        <small>{relation.type}</small>
                        <h3>{relation.label}</h3>
                        <p>{relation.detail}</p>
                      </div>
                      {relation.href ? <ArrowUpRight /> : null}
                    </>
                  );
                  return relation.href ? (
                    <Link href={relation.href} key={relation.id}>
                      {content}
                    </Link>
                  ) : (
                    <article key={relation.id}>{content}</article>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {galleryAssets.length ? (
        <Reveal>
          <section className="codex-section" id="gallery">
            <div className="container">
              <CodexHeading
                index="VII"
                eyebrow={copy.gallery}
                title={copy.galleryTitle}
              />
              <CodexGallery
                assets={galleryAssets}
                allLabel={copy.all}
                closeLabel={copy.close}
                filterLabel={copy.filters}
                openLabel={copy.openImage}
              />
            </div>
          </section>
        </Reveal>
      ) : null}

      {videos.length ? (
        <Reveal>
          <section className="codex-section codex-dark">
            <div className="container">
              <CodexHeading
                index="VIII"
                eyebrow={copy.films}
                title={copy.filmsTitle}
              />
              <div className="codex-film-grid">
                {videos.map((video) => (
                  <figure key={video.src}>
                    <video
                      controls={false}
                      loop
                      muted
                      playsInline
                      preload="none"
                      poster={heroImage}
                    >
                      <source src={video.src} type="video/mp4" />
                    </video>
                    <figcaption>
                      <Play /> {video.caption}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </section>
        </Reveal>
      ) : null}

      {model ? (
        <Reveal>
          <section className="codex-section codex-model-section">
            <div className="container">
              <CodexHeading
                index="VIII"
                eyebrow={copy.model}
                title={copy.modelTitle}
              />
              <div className="codex-model-grid">
                <SculptureViewer
                  src={model.src}
                  label={`${copy.modelTitle}: ${character.name}`}
                  loadingLabel={copy.modelLoading}
                  errorLabel={copy.modelError}
                  rotateLabel={copy.rotate}
                  zoomLabel={copy.zoom}
                  fullscreenLabel={copy.fullscreen}
                />
                <aside>
                  <span className="codex-kicker">{copy.wireframe}</span>
                  <h3>{character.name}</h3>
                  <p>
                    {character.printInfo.orientation}.{' '}
                    {character.printInfo.notes}
                  </p>
                  <dl>
                    <div>
                      <dt>{copy.source}</dt>
                      <dd>{model.sourceFormat}</dd>
                    </div>
                    <div>
                      <dt>{copy.optimizedPoints}</dt>
                      <dd>{model.points.toLocaleString(locale)}</dd>
                    </div>
                    <div>
                      <dt>{copy.scale}</dt>
                      <dd>{character.scale}</dd>
                    </div>
                  </dl>
                </aside>
              </div>
            </div>
          </section>
        </Reveal>
      ) : null}

      <Reveal>
        <section className="codex-miniature" id="miniature">
          <div className="container codex-miniature-layout">
            <div className="codex-miniature-media">
              <Image
                src={heroImage}
                alt={`${copy.miniatureTitle}: ${character.name}`}
                fill
                sizes="(max-width: 760px) 100vw, 58vw"
              />
              <div className="codex-miniature-shade" />
            </div>
            <div className="codex-miniature-copy">
              <span className="codex-kicker">{copy.miniature}</span>
              <h2>{copy.miniatureTitle}</h2>
              <p>{character.relatedMiniature}</p>
              <dl className="codex-specs">
                <div>
                  <dt>{copy.scale}</dt>
                  <dd>{character.scale}</dd>
                </div>
                <div>
                  <dt>{copy.construction}</dt>
                  <dd>{character.multipart ? copy.yes : copy.no}</dd>
                </div>
                <div>
                  <dt>{copy.parts}</dt>
                  <dd>{character.printInfo.parts}</dd>
                </div>
                <div>
                  <dt>{copy.supports}</dt>
                  <dd>{character.printInfo.supports}</dd>
                </div>
                <div>
                  <dt>{copy.printStatus}</dt>
                  <dd>
                    {character.lycheeReady ? copy.ready : copy.validating}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section
          className="codex-section codex-dark codex-process"
          id="process"
        >
          <div className="container">
            <CodexHeading
              index="IX"
              eyebrow={copy.process}
              title={copy.processTitle}
            />
            <ol className="creative-process">
              {copy.processSteps.map((step, stepIndex) => (
                <li key={step}>
                  <span>{String(stepIndex + 1).padStart(2, '0')}</span>
                  <strong>{step}</strong>
                </li>
              ))}
            </ol>
            {character.prompt ? (
              <div className="official-prompt">
                <span className="codex-kicker">{copy.promptLabel}</span>
                <blockquote>{character.prompt}</blockquote>
              </div>
            ) : null}
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="codex-section codex-dark codex-art-bible">
          <div className="container">
            <CodexHeading
              index="X"
              eyebrow={copy.artBible}
              title={copy.artTitle}
            />
            <div className="art-bible-grid">
              <div className="codex-palette">
                {narrative.palette.map((color) => (
                  <i key={color} style={{ background: color }}>
                    <span>{color}</span>
                  </i>
                ))}
              </div>
              <div className="art-bible-notes">
                <p>
                  <strong>{copy.silhouette}</strong>
                  {narrative.silhouette}
                </p>
                <p>
                  <strong>{copy.materials}</strong>
                  {narrative.materials.join(' · ')}
                </p>
                <p>
                  <strong>{copy.influences}</strong>
                  {narrative.influences.join(' · ')}
                </p>
                <div>
                  <strong>{copy.rules}</strong>
                  <ul>
                    {narrative.rules.map((rule) => (
                      <li key={rule}>{rule}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {realm ? (
        <section className="codex-territory">
          <div className="container">
            <span className="codex-kicker">{copy.territory}</span>
            <h2>{realm.name}</h2>
            <p>{realm.summary}</p>
            <Link href={localizedPath(locale, 'realms', realm.slug)}>
              <MapPin /> {copy.territoryCta} <ArrowUpRight />
            </Link>
          </div>
        </section>
      ) : null}

      {listings.length ? (
        <Reveal>
          <section className="codex-section codex-store">
            <div className="container">
              <CodexHeading
                index="X"
                eyebrow={copy.available}
                title={copy.storeTitle}
              />
              <p className="codex-store-lead">{copy.storeText}</p>
              <MarketplaceGrid
                listings={listings}
                marketplaces={marketplaces}
                locale={locale}
              />
            </div>
          </section>
        </Reveal>
      ) : null}

      <section className="codex-section codex-related">
        <div className="container">
          <CodexHeading
            index="XI"
            eyebrow={copy.related}
            title={copy.relatedTitle}
          />
          <div className="related-codex-grid">
            {relatedCharacters.map((related) => (
              <Link
                href={localizedPath(locale, 'characters', related.slug)}
                key={related.slug}
              >
                <Image
                  src={mediaSrc(related.image, 'card')}
                  alt={`${copy.portrait} ${related.name}`}
                  fill
                  sizes="(max-width: 700px) 100vw, 25vw"
                />
                <span>
                  <small>{related.title || copy.current}</small>
                  <strong>{related.name}</strong>
                  <ArrowUpRight />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}

function CodexHeading({
  index,
  eyebrow,
  title,
}: {
  index: string;
  eyebrow: string;
  title: string;
}) {
  return (
    <header className="codex-heading">
      <span>{index}</span>
      <div>
        <small>{eyebrow}</small>
        <h2>{title}</h2>
      </div>
    </header>
  );
}

function PersonalityFacet({
  title,
  items,
  tone,
}: {
  title: string;
  items: string[];
  tone: string;
}) {
  return (
    <section className={`personality-facet ${tone}`}>
      <h3>{title}</h3>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}
