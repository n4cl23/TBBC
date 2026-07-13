import type {Metadata} from 'next';
import {AsterheimAtlas} from '@/components/AsterheimMap';
import {localizedAlternates,localizedPath} from '@/lib/i18n';
import {requestLocale} from '@/lib/locale-server';
export async function generateMetadata():Promise<Metadata>{const locale=await requestLocale(),canonical=localizedPath(locale,'atlas');return {title:'Atlas de Asterheim',description:'Explore os seis reinos, GuardiÃµes, Coroas, criaturas, ruÃ­nas e eras do continente de Asterheim.',alternates:{canonical,languages:localizedAlternates('atlas')},openGraph:{title:'Atlas de Asterheim',description:'Uma cartografia viva dos seis reinos de Asterheim.',images:[{url:'/images/atlas/asterheim-atlas-v1.webp',alt:'Mapa ilustrado do continente de Asterheim'}]}}}
export default function Page(){return <AsterheimAtlas/>}
