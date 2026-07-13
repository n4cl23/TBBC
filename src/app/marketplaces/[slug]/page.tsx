import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MarketplaceButton, MarketplaceGrid, MarketplaceHero } from '@/components/marketplace/Marketplace';
import { getLocalizedPublishedData } from '@/lib/cms-public';
import type { Marketplace, MarketplaceListing } from '@/types/marketplace';
import { requestLocale } from '@/lib/locale-server';
import { localizedAlternates, localizedPath, localeConfig, type Locale } from '@/lib/i18n';

async function data(locale:Locale) { return Promise.all([getLocalizedPublishedData<Marketplace>('marketplaces',locale),getLocalizedPublishedData<MarketplaceListing>('marketplaceListings',locale)]); }
const ui = {
  'pt-br': { profile:'Perfil oficial', count:'modelos publicados ou em preparação neste canal.', open:'Abrir perfil oficial', models:'Modelos', available:'Disponíveis', downloads:'Downloads', catalog:'Catálogo', published:'Modelos publicados' },
  en: { profile:'Official profile', count:'models published or in preparation on this channel.', open:'Open official profile', models:'Models', available:'Available', downloads:'Downloads', catalog:'Catalog', published:'Published models' },
  es: { profile:'Perfil oficial', count:'modelos publicados o en preparación en este canal.', open:'Abrir perfil oficial', models:'Modelos', available:'Disponibles', downloads:'Descargas', catalog:'Catálogo', published:'Modelos publicados' },
} as const;

export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata> { const [{slug},locale]=await Promise.all([params,requestLocale()]),[marketResults]=await data(locale),market=marketResults.find(x=>x.data.slug===slug)?.data; return {title:market?.name||'Marketplace',description:market?.description,alternates:{canonical:localizedPath(locale,'marketplaces',slug),languages:localizedAlternates('marketplaces',slug)},openGraph:{title:market?.name,description:market?.description},twitter:{card:'summary'}}; }
export default async function Page({params}:{params:Promise<{slug:string}>}) { const [{slug},locale]=await Promise.all([params,requestLocale()]),[marketResults,listingResults]=await data(locale),markets=marketResults.map(x=>x.data),allListings=listingResults.map(x=>x.data),market=markets.find(x=>x.slug===slug),copy=ui[locale]; if(!market)notFound(); const listings=allListings.filter(x=>x.marketplaceId===market.id); return <><MarketplaceHero title={market.name} locale={locale}/><section className="section"><div className="container"><div className="grid"><div><span className="eyebrow">{copy.profile}</span><h2 className="serif">{market.description}</h2><p className="muted">{listings.length} {copy.count}</p><MarketplaceButton url={market.website} label={copy.open}/></div><div className="specs"><div><small>{copy.models}</small><strong>{listings.length}</strong></div><div><small>{copy.available}</small><strong>{listings.filter(x=>x.status==='available').length}</strong></div><div><small>{copy.downloads}</small><strong>{listings.reduce((sum,x)=>sum+(x.downloads||0),0).toLocaleString(localeConfig[locale].date)}</strong></div></div></div><div style={{marginTop:48}}><span className="eyebrow">{copy.catalog}</span><h2 className="serif">{copy.published}</h2><MarketplaceGrid listings={listings} marketplaces={markets} locale={locale}/></div></div></section></>; }
