import type {Metadata} from 'next';
import Link from 'next/link';
import {notFound} from 'next/navigation';
import {atlasPoints,atlasRealms,findAtlasPoint} from '@/data/atlas';
import {localizedAlternates,localizedPath} from '@/lib/i18n';
import {requestLocale} from '@/lib/locale-server';
import {RealmSigil} from '@/components/RealmSigil';
export function generateStaticParams(){return atlasPoints.map(point=>({realm:point.realm,point:point.slug}))}
export async function generateMetadata({params}:{params:Promise<{realm:string;point:string}>}):Promise<Metadata>{const [{realm,point},locale]=await Promise.all([params,requestLocale()]),record=findAtlasPoint(realm,point),canonical=localizedPath(locale,'atlas',`${realm}/${point}`);return {title:record?.name||'Ponto de interesse',description:record?.description,alternates:{canonical,languages:localizedAlternates('atlas',`${realm}/${point}`)},openGraph:{title:record?.name,description:record?.description,images:['/images/atlas/asterheim-atlas-v1.webp']}}}
export default async function Page({params}:{params:Promise<{realm:string;point:string}>}){
  const [{realm,point},locale]=await Promise.all([params,requestLocale()]),record=findAtlasPoint(realm,point),territory=atlasRealms.find(x=>x.slug===realm);
  if(!record||!territory)notFound();
  const labels={record:'Registro cartogr\u00e1fico',history:'Hist\u00f3ria e conex\u00f5es',coordinates:'Coordenadas',documented:'Era documentada',related:'Relacionado'};
  return <article className="atlas-record" style={{'--realm':territory.accent} as React.CSSProperties}>
    <header><div className="atlas-record-art"/><div className="atlas-record-shade"/><div className="container"><RealmSigil realm={realm}/><span className="eyebrow">{record.kind} · {territory.name}</span><h1 className="serif">{record.name}</h1><p>{record.description}</p><nav><Link className="button" href={localizedPath(locale,'atlas')}>Voltar ao Atlas</Link><Link className="button ghost" href={localizedPath(locale,'realms',realm)}>Explorar Reino</Link></nav></div></header>
    <section className="section"><div className="container grid"><div><span className="eyebrow">{labels.record}</span><h2 className="serif">{labels.history}</h2><p className="lead">{record.description}</p></div><aside className="card"><strong>{labels.coordinates}</strong><p>{record.x.toFixed(1)}{'\u00b0'} · {record.y.toFixed(1)}{'\u00b0'}</p><strong>{labels.documented}</strong><p>Era Atual · Ano 742</p><strong>{labels.related}</strong><p>{record.related?.join(' · ')||territory.name}</p></aside></div></section>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({'@context':'https://schema.org','@type':'Place',name:record.name,description:record.description,containedInPlace:{'@type':'Place',name:territory.name},geo:{'@type':'GeoCoordinates',latitude:record.y,longitude:record.x}})}}/>
  </article>
}
