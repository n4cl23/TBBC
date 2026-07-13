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

const threatRank = { Moderate: 1, High: 2, Severe: 3, Cataclysmic: 4 } as const;
const evidence = [
  ['FOOTPRINT 07', 'Heat remained beneath 11 inches of snow.'],
  ['CLAW 03', 'Blackstone scored without metal residue.'],
  ['OVUM 02', 'Shell responds to distant thunder.'],
  ['SKULL 14', 'Found facing the Frost Crown.'],
  ['PLATE 09', 'Ironhold steel, folded inward.'],
  ['BLADE 21', 'Edge vitrified in a single breath.'],
  ['RUIN 05', 'No tool marks on the breach.'],
  ['SIGHTING 32', 'Witness account sealed by the Crown.'],
];

export function BeastsExperience() {
  const [selected, setSelected] = useState(beasts[0]),
    [category, setCategory] =
      useState<(typeof beastCategories)[number]>('All records');
  const visible =
    category === 'All records'
      ? beasts
      : beasts.filter((beast) => beast.category === category);
  return (
    <article className="bestiary">
      <header className="bestiary-hero">
        <Image
          src="/images/bestiary/beasts-hero.webp"
          alt="A colossal antlered beast watching from ruined woodland"
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
            Beasts <i>of</i>
            <br />
            Asterheim
          </h1>
          <p>“Every legend begins with a survivor.”</p>
          <a href="#bestiary-map" className="bestiary-cta">
            <Compass /> Explore the Bestiary <ChevronDown />
          </a>
        </div>
        <div className="bestiary-folio">
          Folio I<br />
          <b>Restricted Archive</b>
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
          <span className="bestiary-kicker">
            A warning to those who turn these pages
          </span>
          <h2 id="bestiary-intro-title">The surviving leaves</h2>
          <p className="dropcap">
            For centuries, pathfinders, royal hunters and nameless survivors
            recorded the creatures of the Six Realms. Most pages were lost to
            fire, salt and frightened hands. What remains now forms the official
            Bestiary of Asterheim.
          </p>
          <p>
            Read not as a scholar alone. Every mark was purchased with a life,
            every map drawn from a road someone failed to return by.
          </p>
          <div className="scribe-signature">
            Elias Crow <span>Keeper of the Black Archive</span>
          </div>
        </div>
        <aside className="margin-note">
          <Feather />
          <p>“If the ink turns warm, close the book.”</p>
          <small>— note found in the Kaldr folio</small>
        </aside>
      </section>

      <section id="bestiary-map" className="bestiary-map-section">
        <div className="bestiary-section-head">
          <div>
            <span className="bestiary-kicker">Territories & migration</span>
            <h2>The creature map</h2>
          </div>
          <p>
            Six crowns. Six realms. No border has ever stopped what lives beyond
            the torchlight.
          </p>
        </div>
        <div className="creature-map">
          <Image
            src="/images/atlas/asterheim-atlas-v1.webp"
            alt="Map of the Six Realms of Asterheim"
            fill
            sizes="(max-width: 900px) 100vw, 1200px"
          />
          <div className="map-vignette" />
          {realmRecords.map((realm) => (
            <button
              key={realm.name}
              className="beast-marker"
              style={{ left: `${realm.x}%`, top: `${realm.y}%` }}
              aria-label={`${realm.name}: ${realm.count} recorded species`}
            >
              <span />
              <div>
                <small>{realm.name}</small>
                <strong>{realm.count} recorded species</strong>
                <em>Danger · {realm.danger}</em>
                <b>Dominant · {realm.dominant}</b>
              </div>
            </button>
          ))}
          <div className="map-legend">
            <MapPin />
            <span>Hover the royal seals to reveal field intelligence</span>
          </div>
        </div>
      </section>

      <section className="bestiary-index" aria-labelledby="index-title">
        <div className="bestiary-section-head">
          <div>
            <span className="bestiary-kicker">Taxonomia prohibita</span>
            <h2 id="index-title">The forbidden index</h2>
          </div>
          <p>
            Classification follows the last decree of the Six Crown Council.
          </p>
        </div>
        <div
          className="category-ribbon"
          role="list"
          aria-label="Creature categories"
        >
          {beastCategories.map((item) => (
            <button
              key={item}
              onClick={() => setCategory(item)}
              className={category === item ? 'active' : ''}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="folio-stack">
          {visible.length ? (
            visible.map((beast, index) => (
              <button
                className={`folio-card ${selected.slug === beast.slug ? 'selected' : ''}`}
                key={beast.slug}
                onClick={() => setSelected(beast)}
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
                <span>Record {String(index + 1).padStart(2, '0')}</span>
                <h3>{beast.name}</h3>
                <i>{beast.scientific}</i>
                <p>{beast.epithet}</p>
                <b className={`threat threat-${threatRank[beast.threat]}`}>
                  {beast.threat} threat
                </b>
              </button>
            ))
          ) : (
            <p className="empty-record">
              The surviving leaves contain no unsealed record in this
              classification.
            </p>
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
            NO. {String(beasts.indexOf(selected) + 1).padStart(3, '0')}
          </span>
          <div className="record-caption">
            <small>Last confirmed sighting</small>
            <p>
              <MapPin />
              {selected.position}
            </p>
          </div>
        </div>
        <div className="record-page">
          <div className="record-ornament">✦</div>
          <span className="bestiary-kicker">
            Royal field record · Eyes only
          </span>
          <h2>{selected.name}</h2>
          <p className="record-latin">
            {selected.scientific} · “{selected.epithet}”
          </p>
          <blockquote>{selected.chronicle}</blockquote>
          <dl className="record-specs">
            <div>
              <dt>Realm</dt>
              <dd>{selected.realm}</dd>
            </div>
            <div>
              <dt>Habitat</dt>
              <dd>{selected.habitat}</dd>
            </div>
            <div>
              <dt>Class</dt>
              <dd>{selected.category}</dd>
            </div>
            <div>
              <dt>Threat</dt>
              <dd>{selected.threat}</dd>
            </div>
            <div>
              <dt>Element</dt>
              <dd>{selected.element}</dd>
            </div>
            <div>
              <dt>Height</dt>
              <dd>{selected.height}</dd>
            </div>
            <div>
              <dt>Weight</dt>
              <dd>{selected.weight}</dd>
            </div>
            <div>
              <dt>Lifespan</dt>
              <dd>{selected.lifespan}</dd>
            </div>
            <div>
              <dt>First record</dt>
              <dd>{selected.firstSeen}</dd>
            </div>
          </dl>
        </div>
        <div className="record-notes">
          <Note title="Observed behavior" icon={<BookOpen />}>
            {selected.behavior}
          </Note>
          <Note title="History & consequence" icon={<Feather />}>
            {selected.history}
          </Note>
          <Note title="The world around it" icon={<Compass />}>
            {selected.worldImpact}
          </Note>
          <div className="tactical-notes">
            <List title="Weaknesses" items={selected.weaknesses} />
            <List title="Resistances" items={selected.resistances} />
            <List title="Attacks" items={selected.attacks} />
            <List title="Rare remains" items={selected.drops} />
          </div>
          <div className="lore-margins">
            <p>
              <b>Curiosity</b>
              {selected.curiosities}
            </p>
            <p>
              <b>Legend</b>
              {selected.legends}
            </p>
            <p>
              <b>Other beasts</b>
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
            <span className="bestiary-kicker">Recovered evidence</span>
            <h2>What the dead left behind</h2>
          </div>
          <p>
            Catalogued fragments from sites where the creature was seen — or
            where something survived it.
          </p>
        </div>
        <div className="evidence-grid">
          {evidence.map(([title, text], index) => (
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
              <small>Black Archive · Sealed</small>
            </article>
          ))}
        </div>
      </section>
      <footer className="bestiary-closing">
        <ShieldAlert />
        <span className="bestiary-kicker">End of surviving folio</span>
        <h2>
          Some pages were not lost.
          <br />
          They were removed.
        </h2>
        <a href="#bestiary-map" className="bestiary-cta">
          Return to the map
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
