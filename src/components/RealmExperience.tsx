import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowDown,
  ArrowUpRight,
  Compass,
  MapPin,
  Shield,
  Skull,
  Sparkles,
} from 'lucide-react';
import { CharacterPoster } from './CharacterPoster';
import { MarketplaceGrid } from './marketplace/Marketplace';
import { RealmCrest } from './WorldIdentity';
import type { RealmExperience as Experience } from '@/data/canon-registry';
import type {
  Character,
  Crown,
  GalleryItem,
  Guardian,
  Realm,
} from '@/data/canon-registry';
import type { Marketplace, MarketplaceListing } from '@/types/marketplace';
import { mediaSrc } from '@/lib/media';
export function RealmExperience({
  realm,
  experience,
  guardian,
  crown,
  characters,
  gallery,
  markets,
  listings,
}: {
  realm: Realm;
  experience: Experience;
  guardian?: Guardian;
  crown?: Crown;
  characters: Character[];
  gallery: GalleryItem[];
  markets: Marketplace[];
  listings: MarketplaceListing[];
}) {
  const guardianArt = guardian
      ? `/images/guardians/${guardian.slug}.png`
      : '/images/hero/banner-chronicles.webp',
    realmListings = listings.filter(
      (x) =>
        characters.some((c) => c.slug === x.entityId) ||
        x.entityId === realm.slug,
    );
  return (
    <article
      className="realm-book"
      style={{ '--realm': realm.accent } as React.CSSProperties}
    >
      <header className="realm-hero">
        <Image
          src={guardianArt}
          alt={`Atmosfera de ${realm.name}`}
          fill
          priority
          sizes="100vw"
        />
        <div className="realm-hero-atmosphere" />
        <div className="realm-particles" />
        <div className="container realm-hero-copy">
          <RealmCrest name={realm.name} color={realm.accent} />
          <span className="eyebrow">
            {experience.element} · {guardian?.name || 'Território ancestral'}
          </span>
          <h1 className="serif">{realm.name}</h1>
          <h2>{experience.subtitle}</h2>
          <blockquote>“{experience.quote}”</blockquote>
          <div className="realm-hero-facts">
            <span>
              <Shield /> {guardian?.name || 'Sem Guardião'}
            </span>
            <span>
              <Sparkles /> {crown?.name || 'Coroa perdida'}
            </span>
            <span>
              <Compass /> {experience.capital}
            </span>
          </div>
          <a className="button" href="#realm-intro">
            Entrar no território <ArrowDown />
          </a>
        </div>
      </header>
      <section id="realm-intro" className="realm-section realm-intro">
        <div className="container realm-prose">
          <span className="realm-section-number">I</span>
          <div>
            <span className="eyebrow">Origem e influência</span>
            <h2 className="serif">Um território que mudou Asterheim</h2>
            <p className="realm-lead">{experience.origin}</p>
            <div className="realm-story-grid">
              <p>
                <strong>Fundação</strong>
                {experience.foundation}
              </p>
              <p>
                <strong>Influência</strong>
                {experience.influence}
              </p>
              <p>
                <strong>Atmosfera</strong>
                {experience.atmosphere}
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="realm-section realm-dark">
        <div className="container">
          <SectionHead
            number="II"
            eyebrow="Cartografia territorial"
            title={`Além das fronteiras de ${realm.name}`}
          />
          <RealmMap experience={experience} color={realm.accent} />
        </div>
      </section>
      <section className="realm-section">
        <div className="container">
          <SectionHead
            number="III"
            eyebrow="Arquitetura"
            title="Pedra, matéria e memória"
          />
          <div className="realm-architecture">
            {experience.architecture.map((item, index) => (
              <figure key={item}>
                <div
                  className="realm-architecture-art"
                  style={{
                    backgroundImage: `linear-gradient(0deg,#090a08,transparent),url(${mediaSrc(gallery[index % Math.max(gallery.length, 1)]?.image || guardianArt, 'full')})`,
                  }}
                />
                <figcaption>
                  <small>Estudo {String(index + 1).padStart(2, '0')}</small>
                  <strong className="serif">{item}</strong>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
      {guardian && (
        <section className="realm-section realm-guardian">
          <Image src={guardianArt} alt={guardian.name} fill sizes="100vw" />
          <div className="realm-guardian-shade" />
          <div className="container realm-guardian-copy">
            <span className="eyebrow">O Guardião</span>
            <h2 className="serif">{guardian.name}</h2>
            <h3>{guardian.title}</h3>
            <p>{guardian.story}</p>
            <div className="realm-tags">
              <span>{guardian.virtue}</span>
              <span>{guardian.element}</span>
              <span>{guardian.symbol}</span>
            </div>
            <Link className="button" href={`/guardioes/${guardian.slug}`}>
              Conhecer o Guardião <ArrowUpRight />
            </Link>
          </div>
        </section>
      )}
      {crown && (
        <section className="realm-section crown-sanctum">
          <div className="container grid">
            <div className="crown-sigil">
              <RealmCrest name={crown.name} color={crown.accent} />
            </div>
            <div>
              <span className="eyebrow">A Coroa</span>
              <h2 className="serif">{crown.name}</h2>
              <p className="realm-lead">{crown.history}</p>
              <div className="realm-story-grid">
                <p>
                  <strong>Poder</strong>
                  {crown.element}
                </p>
                <p>
                  <strong>Origem</strong>
                  {crown.material}
                </p>
                <p>
                  <strong>Guardião</strong>
                  {crown.guardian}
                </p>
              </div>
              <Link className="button ghost" href={`/coroas/${crown.slug}`}>
                Abrir crônica da Coroa
              </Link>
            </div>
          </div>
        </section>
      )}
      <section className="realm-section realm-dark">
        <div className="container">
          <SectionHead
            number="VI"
            eyebrow="Habitantes"
            title="Nomes marcados pelo território"
          />
          <div className="poster-grid">
            {characters.slice(0, 5).map((character, index) => (
              <CharacterPoster
                key={character.slug}
                name={character.name}
                title={character.title || character.status}
                quote={character.summary}
                image={character.image}
                href={`/personagens/${character.slug}`}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>
      <section className="realm-section">
        <div className="container realm-bestiary">
          <div>
            <SectionHead
              number="VII"
              eyebrow="Bestiário"
              title="Criaturas e ameaças"
            />
            {experience.creatures.map((item) => (
              <article key={item.name}>
                <Skull />
                <div>
                  <small>{item.kind}</small>
                  <h3 className="serif">{item.name}</h3>
                  <p>{item.description}</p>
                </div>
              </article>
            ))}
          </div>
          <div>
            <SectionHead
              number="VIII"
              eyebrow="Relíquias"
              title="Objetos de poder"
            />
            {experience.artifacts.map((item) => (
              <article key={item.name}>
                <Sparkles />
                <div>
                  <small>{item.kind}</small>
                  <h3 className="serif">{item.name}</h3>
                  <p>{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="realm-section realm-dark">
        <div className="container">
          <SectionHead
            number="IX"
            eyebrow="Cronologia"
            title="Ecos através das eras"
          />
          <div className="realm-timeline">
            {experience.events.map((event) => (
              <article key={event.title}>
                <small>{event.year}</small>
                <h3 className="serif">{event.title}</h3>
                <p>{event.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="realm-section">
        <div className="container">
          <SectionHead
            number="X"
            eyebrow="Cultura"
            title="Como um povo se torna um reino"
          />
          <div className="culture-grid">
            {Object.entries(experience.culture).map(([key, value]) => (
              <article key={key}>
                <span>{key}</span>
                <p>{value}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="realm-section realm-art-bible">
        <div className="container">
          <SectionHead
            number="XI"
            eyebrow="Art Bible"
            title="A linguagem visual do território"
          />
          <div className="realm-palette">
            <i style={{ background: realm.accent }} />
            <i style={{ background: '#080908' }} />
            <i style={{ background: '#d2c7af' }} />
            <i
              style={{
                background: `color-mix(in srgb,${realm.accent} 45%,#111)`,
              }}
            />
          </div>
          <div className="realm-story-grid">
            <p>
              <strong>Materiais</strong>
              {experience.materials.join(' · ')}
            </p>
            <p>
              <strong>Influências</strong>
              {experience.influences.join(' · ')}
            </p>
            <p>
              <strong>Silhueta</strong>
              {realm.architecture}
            </p>
          </div>
        </div>
      </section>
      {realmListings.length > 0 && (
        <section className="realm-section realm-dark">
          <div className="container">
            <SectionHead
              number="XII"
              eyebrow="Miniaturas oficiais"
              title="Leve este reino à sua mesa"
            />
            <MarketplaceGrid listings={realmListings} marketplaces={markets} />
          </div>
        </section>
      )}
      <section className="realm-section realm-explore">
        <div className="container">
          <span className="eyebrow">Continue a jornada</span>
          <h2 className="serif">Explore as crônicas conectadas</h2>
          <nav>
            {guardian && (
              <Link href={`/guardioes/${guardian.slug}`}>
                Guardião <ArrowUpRight />
              </Link>
            )}
            {crown && (
              <Link href={`/coroas/${crown.slug}`}>
                Coroa <ArrowUpRight />
              </Link>
            )}
            <Link href="/personagens">
              Personagens <ArrowUpRight />
            </Link>
            <Link href="/colecoes">
              Coleções <ArrowUpRight />
            </Link>
            <Link href="/art-bible">
              Art Bible <ArrowUpRight />
            </Link>
          </nav>
        </div>
      </section>
    </article>
  );
}
function SectionHead({
  number,
  eyebrow,
  title,
}: {
  number: string;
  eyebrow: string;
  title: string;
}) {
  return (
    <header className="realm-section-head">
      <span>{number}</span>
      <div>
        <small className="eyebrow">{eyebrow}</small>
        <h2 className="serif">{title}</h2>
      </div>
    </header>
  );
}
function RealmMap({
  experience,
  color,
}: {
  experience: Experience;
  color: string;
}) {
  return (
    <div
      className="realm-map"
      style={{ '--realm': color } as React.CSSProperties}
    >
      <svg
        viewBox="0 0 100 100"
        role="img"
        aria-label={`Mapa de ${experience.capital}`}
      >
        <defs>
          <filter id="rough">
            <feTurbulence baseFrequency=".04" numOctaves="3" />
            <feDisplacementMap in="SourceGraphic" scale="2" />
          </filter>
        </defs>
        <path
          d="M8 31 25 12l29 5 17-8 21 23-8 23 9 23-28 14-27-8-25 7L5 60Z"
          fill="currentColor"
          opacity=".12"
          stroke="currentColor"
          filter="url(#rough)"
        />
        <path
          d="M15 64c18-8 28-28 43-26s14 21 29 29M25 18c4 18 17 28 32 31"
          fill="none"
          stroke="currentColor"
          opacity=".35"
        />
      </svg>
      {experience.locations.map((location) => (
        <span
          className={location.danger ? 'danger' : ''}
          style={{ left: `${location.x}%`, top: `${location.y}%` }}
          key={location.name}
        >
          <MapPin />
          <b>{location.name}</b>
          <small>{location.kind}</small>
        </span>
      ))}
    </div>
  );
}
