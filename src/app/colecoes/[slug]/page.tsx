export const dynamic = 'force-dynamic';
import { notFound } from 'next/navigation';
import { collections, characters } from '@/data/content';
import { listCharacterMedia } from '@/lib/media-repository';
import { Card, PageHead, Specs } from '@/components/UI';
import {getPublishedData} from '@/lib/cms-public';
import type {Marketplace,MarketplaceListing} from '@/types/marketplace';
export function generateStaticParams() {
  return collections.map((x) => ({ slug: x.slug }));
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params,
    c = collections.find((x) => x.slug === slug);
  if (!c) notFound();
  const chars = characters.filter((x) => x.collection === slug),
    [media,markets,listings]=await Promise.all([listCharacterMedia(),getPublishedData<Marketplace>('marketplaces'),getPublishedData<MarketplaceListing>('marketplaceListings')]);
  return (
    <>
      <PageHead eyebrow="Coleção" title={c.name} text={c.description} />
      <section className="section">
        <div className="container">
          <Specs
            items={[
              ['Status', c.status],
              ['Miniaturas', String(c.count)],
              ['Formato', 'Multipart planejado'],
            ]}
          />
          <div className="grid" style={{ marginTop: 30 }}>
            {chars.map((x) => (
              <Card
                key={x.slug}
                title={x.name}
                text={x.summary}
                href={`/personagens/${x.slug}`}
                meta={x.title || x.scale}
                image={media[x.slug]?.primary || x.image}
              />
            ))}
          </div>
          <div style={{marginTop:48}}><span className="eyebrow">Progressão da coleção</span><h2 className="serif">Do conceito ao marketplace</h2><div className="collection-progress">{chars.map(character=>{const listing=listings.find(x=>x.entityId===character.slug),market=markets.find(x=>x.id===listing?.marketplaceId);return <div className="collection-progress-row" key={character.slug}><span aria-hidden>{listing?.status==='available'?'✓':listing?.status==='coming-soon'?'◷':'○'}</span><strong>{character.name}</strong><small>{market?.name||'Ainda não anunciado'}</small><small>{listing?new Intl.NumberFormat('pt-BR',{style:'currency',currency:listing.currency}).format(listing.price):character.status}</small></div>})}</div></div>
        </div>
      </section>
    </>
  );
}
