'use client';

import Image from 'next/image';
import {
  BookOpen,
  ChevronDown,
  Compass,
  Feather,
  MapPin,
  ShieldAlert,
  Sparkles,
} from 'lucide-react';
import { useState, type CSSProperties, type ReactNode } from 'react';
import { beastCategories, beasts, realmRecords } from '@/data/bestiary';
import {
  bestiaryUi,
  categoryLabels,
  localizedBeasts,
  realmLabels,
  threatLabels,
} from '@/data/bestiary-i18n';
import type { Locale } from '@/lib/i18n';

const threatRank = { Moderate: 1, High: 2, Severe: 3, Cataclysmic: 4 } as const;
export function BeastsExperience({ locale }: { locale: Locale }) {
  const records = localizedBeasts(locale),
    copy = bestiaryUi[locale],
    categories = categoryLabels[locale],
    threats = threatLabels[locale],
    realms = realmLabels[locale],
    [selectedSlug, setSelectedSlug] = useState(beasts[0].slug),
    selected =
      records.find((beast) => beast.slug === selectedSlug) || records[0],
    [category, setCategory] =
      useState<(typeof beastCategories)[number]>('All records');
  const visible =
    category === 'All records'
      ? records
      : records.filter((beast) => beast.category === category);
  return (
    <article className="bestiary">
      <header className="bestiary-hero">
        <Image
          src="/images/bestiary/beasts-hero.webp"
          alt={copy.heroAlt}
          fill
          priority
          sizes="100vw"
        />
        <div className="bestiary-hero-shade" />
        <div className="bestiary-fog fog-one" />
        <div className="bestiary-fog fog-two" />
        <div className="bestiary-hero-copy">
          <span className="bestiary-kicker">
            The Black Banner Chronicles · Codex Bestiarum
          </span>
          <h1>
            {copy.heroNoun} <i>{copy.heroPrep}</i>
            <br />
            Asterheim
          </h1>
          <p>{copy.quote}</p>
          <a href="#bestiary-map" className="bestiary-cta">
            <Compass /> {copy.explore} <ChevronDown />
          </a>
        </div>
        <div className="bestiary-folio">
          {copy.folio}
          <br />
          <b>{copy.restricted}</b>
        </div>
      </header>

      <section
        className="manuscript-intro"
        aria-labelledby="bestiary-intro-title"
      >
        <div className="wax-seal" aria-hidden>
          <span>VI</span>
        </div>
        <div className="manuscript-copy">
          <span className="bestiary-kicker">{copy.warning}</span>
          <h2 id="bestiary-intro-title">{copy.leaves}</h2>
          <p className="dropcap">{copy.intro1}</p>
          <p>{copy.intro2}</p>
          <div className="scribe-signature">
            Elias Crow <span>{copy.keeper}</span>
          </div>
        </div>
        <aside className="margin-note">
          <Feather />
          <p>{copy.warmInk}</p>
          <small>{copy.kaldrNote}</small>
        </aside>
      </section>

      <section id="bestiary-map" className="bestiary-map-section">
        <div className="bestiary-section-head">
          <div>
            <span className="bestiary-kicker">{copy.territories}</span>
            <h2>{copy.mapTitle}</h2>
          </div>
          <p>{copy.mapText}</p>
        </div>
        <div className="creature-map">
          <Image
            src="/images/atlas/asterheim-atlas-v1.webp"
            alt={copy.mapAlt}
            fill
            sizes="(max-width: 900px) 100vw, 1200px"
          />
          <div className="map-vignette" />
          {realmRecords.map((realm) => (
            <button
              key={realm.name}
              className="beast-marker"
              style={{ left: `${realm.x}%`, top: `${realm.y}%` }}
              aria-label={`${realms[realm.name]}: ${realm.count} ${copy.species}`}
            >
              <span />
              <div>
                <small>{realms[realm.name]}</small>
                <strong>
                  {realm.count} {copy.species}
                </strong>
                <em>
                  {copy.danger} ·{' '}
                  {threats[realm.danger as keyof typeof threats]}
                </em>
                <b>
                  {copy.dominant} · {realm.dominant}
                </b>
              </div>
            </button>
          ))}
          <div className="map-legend">
            <MapPin />
            <span>{copy.hover}</span>
          </div>
        </div>
      </section>

      <section className="bestiary-index" aria-labelledby="index-title">
        <div className="bestiary-section-head">
          <div>
            <span className="bestiary-kicker">{copy.taxonomy}</span>
            <h2 id="index-title">{copy.index}</h2>
          </div>
          <p>{copy.indexText}</p>
        </div>
        <div
          className="category-ribbon"
          role="list"
          aria-label={copy.categories}
        >
          {beastCategories.map((item) => (
            <button
              key={item}
              onClick={() => setCategory(item)}
              className={category === item ? 'active' : ''}
            >
              {categories[item]}
            </button>
          ))}
        </div>
        <div className="folio-stack">
          {visible.length ? (
            visible.map((beast, index) => (
              <button
                className={`folio-card ${selected.slug === beast.slug ? 'selected' : ''}`}
                key={beast.slug}
                onClick={() => setSelectedSlug(beast.slug)}
                style={{ '--folio-index': index } as CSSProperties}
              >
                <div className="folio-image">
                  <Image
                    src={beast.image}
                    alt={beast.name}
                    fill
                    sizes="(max-width: 760px) 90vw, 320px"
                  />
                </div>
                <span>
                  {copy.record} {String(index + 1).padStart(2, '0')}
                </span>
                <h3>{beast.name}</h3>
                <i>{beast.scientific}</i>
                <p>{beast.epithet}</p>
                <b className={`threat threat-${threatRank[beast.threat]}`}>
                  {threats[beast.threat]} {copy.threat}
                </b>
              </button>
            ))
          ) : (
            <p className="empty-record">{copy.empty}</p>
          )}
        </div>
      </section>

      <section className="field-record" id="field-record" key={selected.slug}>
        <div className="record-visual">
          <Image
            src={selected.image}
            alt={`${selected.name}, ${selected.epithet}`}
            fill
            sizes="(max-width: 900px) 100vw, 58vw"
          />
          <div className="record-image-shade" />
          <span className="record-number">
            NO.{' '}
            {String(
              records.findIndex((beast) => beast.slug === selected.slug) + 1,
            ).padStart(3, '0')}
          </span>
          <div className="record-caption">
            <small>{copy.lastSighting}</small>
            <p>
              <MapPin />
              {selected.position}
            </p>
          </div>
        </div>
        <div className="record-page">
          <div className="record-ornament">✦</div>
          <span className="bestiary-kicker">{copy.royalRecord}</span>
          <h2>{selected.name}</h2>
          <p className="record-latin">
            {selected.scientific} · “{selected.epithet}”
          </p>
          <blockquote>{selected.chronicle}</blockquote>
          <dl className="record-specs">
            <div>
              <dt>{copy.labels[0]}</dt>
              <dd>{selected.realm}</dd>
            </div>
            <div>
              <dt>{copy.labels[1]}</dt>
              <dd>{selected.habitat}</dd>
            </div>
            <div>
              <dt>{copy.labels[2]}</dt>
              <dd>{categories[selected.category]}</dd>
            </div>
            <div>
              <dt>{copy.labels[3]}</dt>
              <dd>{threats[selected.threat]}</dd>
            </div>
            <div>
              <dt>{copy.labels[4]}</dt>
              <dd>{selected.element}</dd>
            </div>
            <div>
              <dt>{copy.labels[5]}</dt>
              <dd>{selected.height}</dd>
            </div>
            <div>
              <dt>{copy.labels[6]}</dt>
              <dd>{selected.weight}</dd>
            </div>
            <div>
              <dt>{copy.labels[7]}</dt>
              <dd>{selected.lifespan}</dd>
            </div>
            <div>
              <dt>{copy.labels[8]}</dt>
              <dd>{selected.firstSeen}</dd>
            </div>
          </dl>
        </div>
        <div className="record-notes">
          <Note title={copy.observed} icon={<BookOpen />}>
            {selected.behavior}
          </Note>
          <Note title={copy.consequence} icon={<Feather />}>
            {selected.history}
          </Note>
          <Note title={copy.world} icon={<Compass />}>
            {selected.worldImpact}
          </Note>
          <div className="tactical-notes">
            <List title={copy.weaknesses} items={selected.weaknesses} />
            <List title={copy.resistances} items={selected.resistances} />
            <List title={copy.attacks} items={selected.attacks} />
            <List title={copy.remains} items={selected.drops} />
          </div>
          <div className="lore-margins">
            <p>
              <b>{copy.curiosity}</b>
              {selected.curiosities}
            </p>
            <p>
              <b>{copy.legend}</b>
              {selected.legends}
            </p>
            <p>
              <b>{copy.other}</b>
              {selected.relations}
            </p>
            <p>
              <b>
                {selected.guardian} · {selected.crown}
              </b>
              {selected.guardianBond}
            </p>
          </div>
        </div>
      </section>

      <section className="evidence-section">
        <div className="bestiary-section-head">
          <div>
            <span className="bestiary-kicker">{copy.recovered}</span>
            <h2>{copy.deadLeft}</h2>
          </div>
          <p>{copy.evidenceText}</p>
        </div>
        <div className="evidence-grid">
          {copy.evidence.map(([title, text], index) => (
            <article
              key={title}
              style={{ '--evidence': index } as CSSProperties}
            >
              <div>
                <Sparkles />
                <span>{String(index + 1).padStart(2, '0')}</span>
              </div>
              <h3>{title}</h3>
              <p>{text}</p>
              <small>{copy.sealed}</small>
            </article>
          ))}
        </div>
      </section>
      <footer className="bestiary-closing">
        <ShieldAlert />
        <span className="bestiary-kicker">{copy.end}</span>
        <h2>
          {copy.removed1}
          <br />
          {copy.removed2}
        </h2>
        <a href="#bestiary-map" className="bestiary-cta">
          {copy.returnMap}
        </a>
      </footer>
    </article>
  );
}

function Note({
  title,
  icon,
  children,
}: {
  title: string;
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <article className="record-note">
      <span>{icon}</span>
      <div>
        <h3>{title}</h3>
        <p>{children}</p>
      </div>
    </article>
  );
}
function List({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3>{title}</h3>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
