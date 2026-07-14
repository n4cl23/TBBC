'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Search, SlidersHorizontal } from 'lucide-react';
import { useMemo, useState } from 'react';
import { creatureRealmProfiles } from '@/data/creatures';
import { localizedPath, type Locale } from '@/lib/i18n';
import type { LocalizedCreature } from '@/types/creature';

const copy = {
  'pt-br': { search: 'Buscar criatura', filters: 'Filtros do Atlas', all: 'Todos', realm: 'Reino', category: 'Categoria', threat: 'Ameaça', status: 'Produção', availability: 'Disponibilidade', files: 'Arquivos', stl: 'Com STL', glb: 'Com GLB', market: 'Marketplace disponível', results: 'criaturas encontradas', open: 'Abrir registro', empty: 'Nenhuma criatura corresponde a estes filtros.', clear: 'Limpar filtros' },
  en: { search: 'Search creatures', filters: 'Atlas filters', all: 'All', realm: 'Realm', category: 'Category', threat: 'Threat', status: 'Production', availability: 'Availability', files: 'Files', stl: 'Has STL', glb: 'Has GLB', market: 'Marketplace available', results: 'creatures found', open: 'Open record', empty: 'No creatures match these filters.', clear: 'Clear filters' },
  es: { search: 'Buscar criaturas', filters: 'Filtros del Atlas', all: 'Todos', realm: 'Reino', category: 'Categoría', threat: 'Amenaza', status: 'Producción', availability: 'Disponibilidad', files: 'Archivos', stl: 'Con STL', glb: 'Con GLB', market: 'Marketplace disponible', results: 'criaturas encontradas', open: 'Abrir registro', empty: 'Ninguna criatura coincide con estos filtros.', clear: 'Limpiar filtros' },
} as const;

export function CreatureAtlas({ creatures, locale }: { creatures: LocalizedCreature[]; locale: Locale }) {
  const ui = copy[locale];
  const [query, setQuery] = useState(''), [realm, setRealm] = useState(''), [category, setCategory] = useState(''), [threat, setThreat] = useState(''), [status, setStatus] = useState(''), [availability, setAvailability] = useState('');
  const [stl, setStl] = useState(false), [glb, setGlb] = useState(false), [market, setMarket] = useState(false);
  const filtered = useMemo(() => creatures.filter((creature) => {
    const haystack = `${creature.name} ${creature.epithet} ${creature.summary}`.toLocaleLowerCase(locale);
    return (!query || haystack.includes(query.toLocaleLowerCase(locale))) && (!realm || creature.realmId === realm) && (!category || creature.category === category) && (!threat || creature.threatLevel === threat) && (!status || creature.status === status) && (!availability || creature.marketplace.some((item) => item.availability === availability)) && (!stl || creature.stlSourceAvailable) && (!glb || creature.glbSourceAvailable) && (!market || creature.marketplace.some((item) => item.availability === 'available'));
  }), [availability, category, creatures, glb, locale, market, query, realm, status, stl, threat]);
  const selectOptions = (values: string[]) => values.map((value) => <option value={value} key={value}>{value.replaceAll('-', ' ')}</option>);
  const reset = () => { setQuery(''); setRealm(''); setCategory(''); setThreat(''); setStatus(''); setAvailability(''); setStl(false); setGlb(false); setMarket(false); };

  return <div className="creature-atlas-layout">
    <aside className="creature-filters" aria-label={ui.filters}>
      <div className="creature-filter-title"><SlidersHorizontal aria-hidden="true"/><h2>{ui.filters}</h2></div>
      <label className="creature-search"><span>{ui.search}</span><span><Search aria-hidden="true"/><input value={query} onChange={(event) => setQuery(event.target.value)} type="search" placeholder={ui.search}/></span></label>
      <label>{ui.realm}<select value={realm} onChange={(event) => setRealm(event.target.value)}><option value="">{ui.all}</option>{Object.entries(creatureRealmProfiles).map(([value, profile]) => <option value={value} key={value}>{profile.name}</option>)}</select></label>
      <label>{ui.category}<select value={category} onChange={(event) => setCategory(event.target.value)}><option value="">{ui.all}</option>{selectOptions([...new Set(creatures.map((item) => item.category))])}</select></label>
      <label>{ui.threat}<select value={threat} onChange={(event) => setThreat(event.target.value)}><option value="">{ui.all}</option>{selectOptions([...new Set(creatures.map((item) => item.threatLevel))])}</select></label>
      <label>{ui.status}<select value={status} onChange={(event) => setStatus(event.target.value)}><option value="">{ui.all}</option>{selectOptions([...new Set(creatures.map((item) => item.status))])}</select></label>
      <label>{ui.availability}<select value={availability} onChange={(event) => setAvailability(event.target.value)}><option value="">{ui.all}</option>{selectOptions([...new Set(creatures.flatMap((item) => item.marketplace.map((listing) => listing.availability)))])}</select></label>
      <fieldset><legend>{ui.files}</legend><label><input type="checkbox" checked={stl} onChange={(event) => setStl(event.target.checked)}/>{ui.stl}</label><label><input type="checkbox" checked={glb} onChange={(event) => setGlb(event.target.checked)}/>{ui.glb}</label><label><input type="checkbox" checked={market} onChange={(event) => setMarket(event.target.checked)}/>{ui.market}</label></fieldset>
      <button className="text-button" type="button" onClick={reset}>{ui.clear}</button>
    </aside>
    <div>
      <p className="creature-result-count" aria-live="polite"><strong>{filtered.length}</strong> {ui.results}</p>
      {filtered.length ? <div className="creature-card-grid">{filtered.map((creature) => <article className="creature-card" key={creature.slug} data-realm={creature.realmId}>
        <div className="creature-card-art"><Image src={creature.image} alt={creature.imageAlt} fill sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw"/></div>
        <div className="creature-card-body"><span className="eyebrow">{creatureRealmProfiles[creature.realmId as keyof typeof creatureRealmProfiles]?.name} · {creature.category}</span><h2>{creature.name}</h2><p className="creature-epithet">{creature.epithet}</p><p>{creature.summary}</p><div className="creature-card-meta"><span data-threat={creature.threatLevel}>{creature.threatLevel}</span><span>{creature.status}</span></div><Link className="button ghost" href={localizedPath(locale, 'atlas', `creatures/${creature.slug}`)}>{ui.open}</Link></div>
      </article>)}</div> : <div className="creature-empty"><p>{ui.empty}</p><button className="button ghost" onClick={reset}>{ui.clear}</button></div>}
    </div>
  </div>;
}
