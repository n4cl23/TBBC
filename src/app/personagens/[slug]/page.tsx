export const dynamic = 'force-dynamic';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  type Character,
  type Collection,
  type Crown,
  type Guardian,
  type Realm,
  type TimelineEvent,
} from '@/data/content';
import { getLocalizedPublishedData, getLocalizedPublishedEntity, getPublishedData } from '@/lib/cms-public';
import { getCharacterMedia } from '@/lib/media-repository';
import { getCharacterNarrative } from '@/lib/character-narrative';
import { mediaSrc } from '@/lib/media';
import { RelationshipGraph } from '@/components/RelationshipGraph';
import { AsterheimMap } from '@/components/AsterheimMap';
import {
  CollectionCast,
  CreativeProcess,
  OfficialPrompt,
  Reveal,
  TraitMeters,
} from '@/components/CharacterExperience';
import { Figure, Specs } from '@/components/UI';
import { MarketplaceGrid } from '@/components/marketplace/Marketplace';
import type { Marketplace, MarketplaceListing } from '@/types/marketplace';
import { localizedAlternates, localizedPath } from '@/lib/i18n';
import { requestLocale } from '@/lib/locale-server';
import { localeDiagnostics } from '@/lib/localized-content';
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const [{ slug }, locale] = await Promise.all([params, requestLocale()]),
    c = (await getLocalizedPublishedEntity<Character>('characters', slug, locale))?.data,
    canonical = localizedPath(locale, 'characters', slug);
  return {
    title: c?.name || 'Personagem',
    description: c?.summary,
    alternates: { canonical, languages: localizedAlternates('characters', slug) },
    openGraph: {
      title: c?.name,
      description: c?.summary,
      images: [
        typeof c?.image === 'string'
          ? c.image
          : '/images/hero/banner-chronicles.webp',
      ],
    },
  };
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const [{ slug }, locale] = await Promise.all([params, requestLocale()]),
    characterResults = await getLocalizedPublishedData<Character>('characters', locale),
    characters = characterResults.map((x) => x.data),
    index = characters.findIndex((x) => x.slug === slug),
    c = characters[index], characterResult = characterResults[index];
  if (!c) notFound();
  const [media, marketplaces, allListings, collectionResults, guardianResults, crownResults, realmResults, timelineResults] = await Promise.all([
      getCharacterMedia(slug),
      getPublishedData<Marketplace>('marketplaces'),
      getPublishedData<MarketplaceListing>('marketplaceListings'),
      getLocalizedPublishedData<Collection>('collections', locale),
      getLocalizedPublishedData<Guardian>('guardians', locale),
      getLocalizedPublishedData<Crown>('crowns', locale),
      getLocalizedPublishedData<Realm>('realms', locale),
      getLocalizedPublishedData<TimelineEvent>('timeline', locale),
    ]),
    main = media.primary || c.image,
    collections = collectionResults.map((x)=>x.data), guardians = guardianResults.map((x)=>x.data), crowns = crownResults.map((x)=>x.data), realms = realmResults.map((x)=>x.data), timeline = timelineResults.map((x)=>x.data),
    collection = collections.find((x) => x.slug === c.collection),
    guardian = guardians.find((x) => x.name === c.guardian),
    crown = crowns.find((x) => x.name === c.crown),
    realm = realms.find((x) => x.name === c.realm),
    narrative = getCharacterNarrative(c, index),
    events = [
      timeline[index % timeline.length],
      timeline[(index + 2) % timeline.length],
    ],
    listings = allListings.filter((x) => x.entityId === c.slug),
    available = listings.find((x) => x.status === 'available');
  return (
    <article className="character-book" {...localeDiagnostics(characterResult)}>
      {available && <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({'@context':'https://schema.org','@type':'Product',name:c.name,image:mediaSrc(main,'full'),description:c.summary,offers:{'@type':'Offer',url:available.url,price:available.price,priceCurrency:available.currency,availability:'https://schema.org/InStock'}})}}/>}
      <header className="character-hero">
        <Image
          src={mediaSrc(main, 'full')}
          alt={`Retrato de ${c.name}`}
          fill
          priority
          sizes="100vw"
          style={{ objectFit: 'cover' }}
        />
        <div className="character-hero-shade" />
        <div className="container character-hero-copy">
          <span className="eyebrow">{collection?.name || c.collection}</span>
          <h1 className="serif">{c.name}</h1>
          <h2>{narrative.epicTitle}</h2>
          <blockquote>{narrative.quote}</blockquote>
          <div className="hero-facts">
            <span>{c.realm || 'Sem reino'}</span>
            <span>{c.status}</span>
            <span>{c.guardian || 'Caminho independente'}</span>
            <span>{c.crown || narrative.symbol}</span>
          </div>
        </div>
      </header>
      <Reveal>
        <section className="chapter chapter-story">
          <div className="container">
            <span className="chapter-number">I</span>
            <span className="eyebrow">A crônica</span>
            <h2 className="serif">{narrative.subtitle}</h2>
            <p className="story-lead">{c.summary}</p>
            <div className="story-columns">
              {[
                ['Origem', narrative.origin],
                ['Ascensão', narrative.rise],
                ['Queda', narrative.fall],
                ['Estado atual', narrative.current],
                ['Legado', narrative.legacy],
              ].map(([title, text]) => (
                <section key={title}>
                  <h3 className="serif">{title}</h3>
                  <p>{text}</p>
                </section>
              ))}
            </div>
          </div>
        </section>
      </Reveal>
      <Reveal>
        <section className="chapter dark-chapter">
          <div className="container grid">
            <div>
              <span className="chapter-number">II</span>
              <span className="eyebrow">Personalidade</span>
              <h2 className="serif">Virtudes, sombras e desejos</h2>
              <TraitMeters traits={narrative.traits} />
            </div>
            <div className="lore-notes">
              {[
                ['Virtudes', narrative.virtues],
                ['Defeitos', narrative.flaws],
                ['Medos', narrative.fears],
                ['Objetivos', narrative.goals],
              ].map(([title, items]) => (
                <div key={title as string}>
                  <h3 className="serif">{title as string}</h3>
                  <ul>
                    {(items as string[]).map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Reveal>
      <Reveal>
        <section className="chapter">
          <div className="container">
            <span className="chapter-number">III</span>
            <span className="eyebrow">Lendas e rumores</span>
            <div className="grid">
              {[
                ['Curiosidades', narrative.curiosities],
                ['Lendas', narrative.legends],
                ['Rumores', narrative.rumors],
              ].map(([title, items]) => (
                <div className="artbook-note" key={title as string}>
                  <h2 className="serif">{title as string}</h2>
                  {(items as string[]).map((x) => (
                    <p key={x}>{x}</p>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>
      </Reveal>
      <Reveal>
        <section className="chapter dark-chapter">
          <div className="container">
            <span className="chapter-number">IV</span>
            <span className="eyebrow">Momentos relacionados</span>
            <div className="character-timeline">
              {events.map((e) => (
                <div key={e.id}>
                  <small>{e.year}</small>
                  <h3 className="serif">{e.title}</h3>
                  <p>{e.summary}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Reveal>
      <Reveal>
        <section className="chapter">
          <div className="container">
            <span className="chapter-number">V</span>
            <span className="eyebrow">World Graph</span>
            <h2 className="serif">Relações que moldam a lenda</h2>
            <RelationshipGraph
              character={c}
              collectionName={collection?.name || c.collection}
            />
          </div>
        </section>
      </Reveal>
      <Reveal>
        <section className="chapter dark-chapter">
          <div className="container">
            <span className="chapter-number">VI</span>
            <span className="eyebrow">Da ideia à matéria</span>
            <h2 className="serif">Processo criativo</h2>
            <CreativeProcess />
            <OfficialPrompt prompt={c.prompt} />
          </div>
        </section>
      </Reveal>
      <Reveal>
        <section className="chapter">
          <div className="container">
            <span className="chapter-number">VII</span>
            <span className="eyebrow">Miniatura</span>
            <div className="grid">
              <Figure src={main} alt={`Miniatura de ${c.name}`} />
              <div>
                <h2 className="serif">{c.relatedMiniature}</h2>
                <Specs
                  items={[
                    ['Escala', c.scale],
                    ['Multipart', c.multipart ? 'Sim' : 'Não'],
                    ['Peças', c.printInfo.parts],
                    ['Suportes', c.printInfo.supports],
                    ['Lychee', c.lycheeReady ? 'Pronto' : 'Em validação'],
                    ['Status', c.status],
                  ]}
                />
                <p className="muted">
                  {c.printInfo.orientation}. {c.printInfo.notes}
                </p>
              </div>
            </div>
          </div>
        </section>
      </Reveal>
      {media.gallery.length > 0 && (
        <Reveal>
          <section className="chapter dark-chapter">
            <div className="container">
              <span className="chapter-number">VIII</span>
              <span className="eyebrow">Galeria</span>
              <h2 className="serif">Estudos e versões</h2>
              <div className="grid">
                {media.gallery.map((x) => (
                  <Figure key={x.id} src={x} />
                ))}
              </div>
            </div>
          </section>
        </Reveal>
      )}
      <Reveal>
        <section className="chapter">
          <div className="container">
            <span className="chapter-number">IX</span>
            <span className="eyebrow">Art Bible</span>
            <div className="grid">
              <div>
                <h2 className="serif">Linguagem visual</h2>
                <div className="character-palette">
                  {narrative.palette.map((x) => (
                    <i
                      key={x}
                      style={{ background: x }}
                      aria-label={`Cor ${x}`}
                    />
                  ))}
                </div>
                <p>
                  <strong>Silhueta:</strong> {narrative.silhouette}
                </p>
                <p>
                  <strong>Materiais:</strong> {narrative.materials.join(', ')}
                </p>
                <p>
                  <strong>Influências:</strong>{' '}
                  {narrative.influences.join(', ')}
                </p>
              </div>
              <ul>
                {narrative.rules.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </Reveal>
      {realm && (
        <Reveal>
          <section className="chapter dark-chapter">
            <div className="container">
              <span className="eyebrow">Território</span>
              <h2 className="serif">{realm.name}</h2>
              <AsterheimMap />
              <p>
                <Link className="button ghost" href={localizedPath(locale,'realms',realm.slug)}>
                  Conhecer arquitetura e história
                </Link>
              </p>
            </div>
          </section>
        </Reveal>
      )}
      {listings.length > 0 && <Reveal><section className="chapter dark-chapter"><div className="container"><span className="chapter-number">X</span><span className="eyebrow">Available now</span><h2 className="serif">Download STL</h2><p className="muted">Escolha o canal oficial e obtenha os arquivos desta miniatura.</p><MarketplaceGrid listings={listings} marketplaces={marketplaces}/></div></section></Reveal>}
      <section className="chapter collection-finale">
        <div className="container">
          <span className="eyebrow">Outros nomes sob o mesmo estandarte</span>
          <h2 className="serif">{collection?.name}</h2>
          <CollectionCast
            characters={characters.filter((x) => x.collection === c.collection)}
            current={c.slug}
          />
        </div>
      </section>
    </article>
  );
}
