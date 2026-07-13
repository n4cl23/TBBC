import Link from 'next/link';
import { EntityManager } from '@/components/admin/EntityManager';
import { getPublishedData } from '@/lib/cms-public';
import type { Marketplace, MarketplaceListing } from '@/types/marketplace';
export default async function Page() {
  const [markets, listings] = await Promise.all([
    getPublishedData<Marketplace>('marketplaces'),
    getPublishedData<MarketplaceListing>('marketplaceListings'),
  ]);
  const available = listings.filter((x) => x.status === 'available'),
    revenue = available.reduce((sum, x) => sum + x.price, 0);
  return (
    <>
      <span className="eyebrow">Commerce operations</span>
      <h1 className="admin-title">Marketplace Hub</h1>
      <p className="muted">
        Preços, disponibilidade, canais e lançamentos gerenciados pelo CMS.
      </p>
      <div className="admin-grid" style={{marginTop:24}}>
        <article className="admin-panel">
          <span className="eyebrow">Publicados</span>
          <strong>{available.length}</strong>
          <small>modelos disponíveis</small>
        </article>
        <article className="admin-panel">
          <span className="eyebrow">Canais</span>
          <strong>{markets.filter((x) => x.status === 'active').length}</strong>
          <small>marketplaces ativos</small>
        </article>
        <article className="admin-panel">
          <span className="eyebrow">Receita estimada</span>
          <strong>US$ {revenue.toFixed(2)}</strong>
          <small>campo manual de referência</small>
        </article>
        <article className="admin-panel">
          <span className="eyebrow">Próximos</span>
          <strong>
            {
              listings.filter((x) =>
                ['coming-soon', 'in-production'].includes(x.status),
              ).length
            }
          </strong>
          <small>lançamentos</small>
        </article>
      </div>
      <div className="admin-toolbar">
        <Link className="admin-btn" href="/admin/marketplace/listings">
          Gerenciar anúncios
        </Link>
        <Link className="admin-btn secondary" href="/marketplaces">
          Ver hub público
        </Link>
      </div>
      <h2 className="serif">Marketplaces</h2>
      <EntityManager entity="marketplaces" />
    </>
  );
}
