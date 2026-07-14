import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { CreatureAtlas } from '@/components/CreatureAtlas';
import { localizedCreatures } from '@/data/creatures';
import { localizedAlternates, localizedPath } from '@/lib/i18n';
import { requestLocale } from '@/lib/locale-server';

const copy = {
  'pt-br': { eyebrow: 'Atlas vivo · 34 registros', title: 'Criaturas de Asterheim', text: 'Um arquivo de campo sobre predadores, espíritos, constructos e colossos dos seis Reinos.', back: 'Mapa de Asterheim' },
  en: { eyebrow: 'Living atlas · 34 records', title: 'Creatures of Asterheim', text: 'A field archive of predators, spirits, constructs, and colossi across the six Realms.', back: 'Map of Asterheim' },
  es: { eyebrow: 'Atlas vivo · 34 registros', title: 'Criaturas de Asterheim', text: 'Un archivo de campo sobre depredadores, espíritus, constructos y colosos de los seis Reinos.', back: 'Mapa de Asterheim' },
} as const;
export async function generateMetadata(): Promise<Metadata> { const locale = await requestLocale(), ui = copy[locale], canonical = localizedPath(locale, 'atlas', 'creatures'); return { title: ui.title, description: ui.text, alternates: { canonical, languages: localizedAlternates('atlas', 'creatures') }, openGraph: { title: ui.title, description: ui.text, images: ['/images/bestiary/beasts-hero.webp'] } }; }
export default async function Page() { const locale = await requestLocale(), ui = copy[locale]; const creatures = localizedCreatures(locale).map(({ slug, name, epithet, summary, realmId, category, threatLevel, productionStatus, cardImage, imageAlt, usesPlaceholder }) => ({ slug, name, epithet, summary, realmId, category, threatLevel, productionStatus, cardImage, imageAlt, usesPlaceholder })); return <><header className="creature-atlas-hero"><Image src="/images/bestiary/beasts-hero.webp" alt="" fill priority fetchPriority="high" sizes="100vw"/><div className="container"><Link href={localizedPath(locale, 'atlas')} className="creature-back">← {ui.back}</Link><span className="eyebrow">{ui.eyebrow}</span><h1>{ui.title}</h1><p>{ui.text}</p></div></header><section className="section creature-atlas-section"><div className="container"><CreatureAtlas creatures={creatures} locale={locale}/></div></section></>; }
