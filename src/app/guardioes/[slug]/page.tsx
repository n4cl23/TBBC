import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {guardians,type Crown,type Guardian,type Realm} from '@/data/content';
import {GuardianExperience} from '@/components/LegendaryExperience';
import {getLocalizedPublishedData,getLocalizedPublishedEntity} from '@/lib/cms-public';
import {localizedAlternates,localizedPath} from '@/lib/i18n';
import {requestLocale} from '@/lib/locale-server';
import {localeDiagnostics} from '@/lib/localized-content';
export function generateStaticParams(){return guardians.map(x=>({slug:x.slug}))}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const [{slug},locale]=await Promise.all([params,requestLocale()]),result=await getLocalizedPublishedEntity<Guardian>('guardians',slug,locale),g=result?.data,canonical=localizedPath(locale,'guardians',slug);return {title:g?.name||'Guardian',description:g?.summary,alternates:{canonical,languages:localizedAlternates('guardians',slug)},openGraph:{title:g?.name,description:g?.summary,locale:locale==='pt-br'?'pt_BR':locale,images:[`/images/guardians/${slug}.png`]}}}
export default async function Page({params}:{params:Promise<{slug:string}>}){const [{slug},locale]=await Promise.all([params,requestLocale()]),[result,crownResults,realmResults]=await Promise.all([getLocalizedPublishedEntity<Guardian>('guardians',slug,locale),getLocalizedPublishedData<Crown>('crowns',locale),getLocalizedPublishedData<Realm>('realms',locale)]);if(!result)notFound();const g=result.data,crown=crownResults.map(x=>x.data).find(x=>x.name===g.crown),realm=realmResults.map(x=>x.data).find(x=>x.name===g.realm);return <div {...localeDiagnostics(result)}><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({'@context':'https://schema.org','@type':'CreativeWork',name:g.name,description:g.summary,inLanguage:result.resolvedLocale,isPartOf:'The Black Banner Chronicles'})}}/><GuardianExperience guardian={g} crown={crown} realm={realm}/></div>}
