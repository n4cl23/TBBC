import type {Metadata} from 'next';
import {AsterheimAtlas} from '@/components/AsterheimMap';
import {localizedAlternates,localizedPath} from '@/lib/i18n';
import {requestLocale} from '@/lib/locale-server';
import Link from 'next/link';
export async function generateMetadata():Promise<Metadata>{const locale=await requestLocale(),canonical=localizedPath(locale,'atlas');return {title:'Atlas de Asterheim',description:'Explore os seis reinos, GuardiÃµes, Coroas, criaturas, ruÃ­nas e eras do continente de Asterheim.',alternates:{canonical,languages:localizedAlternates('atlas')},openGraph:{title:'Atlas de Asterheim',description:'Uma cartografia viva dos seis reinos de Asterheim.',images:[{url:'/images/atlas/asterheim-atlas-v1.webp',alt:'Mapa ilustrado do continente de Asterheim'}]}}}
export default async function Page(){const locale=await requestLocale(),label=locale==='en'?'Open the Creature Atlas':locale==='es'?'Abrir el Atlas de Criaturas':'Abrir o Atlas de Criaturas';return <><AsterheimAtlas/><section className="section"><div className="container" style={{textAlign:'center'}}><span className="eyebrow">34 registros · 6 reinos</span><h2 className="serif">Bestiary Field Archive</h2><Link className="button" href={localizedPath(locale,'atlas','creatures')}>{label}</Link></div></section></>}
