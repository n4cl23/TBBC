import { EntityManager } from '@/components/admin/EntityManager';
import { creatureCoverage } from '@/data/creatures';

const stats = [
  ['Registradas', creatureCoverage.registered],
  ['Imagens-fonte', creatureCoverage.withImageSource],
  ['GLB-fonte', creatureCoverage.withGlbSource],
  ['GLB público', creatureCoverage.withPublicGlb],
  ['STL-fonte', creatureCoverage.withStlSource],
  ['Com lore', creatureCoverage.withLore],
  ['PT / EN / ES', creatureCoverage.translated],
  ['Publicadas', creatureCoverage.published],
  ['Marketplace', creatureCoverage.marketplaceAvailable],
] as const;

export default function Page() {
  return <><span className="eyebrow">Bestiary pipeline</span><h1 className="admin-title">Criaturas</h1><p className="muted">Taxonomia, narrativa, traduções, arquivos 3D e publicação das {creatureCoverage.expected} criaturas oficiais.</p><div className="admin-grid">{stats.map(([label, value]) => <article className="admin-panel" key={label}><span className="eyebrow">{value} / {creatureCoverage.expected}</span><h2 className="serif">{label}</h2></article>)}</div><section style={{ marginTop: 48 }}><EntityManager entity="creatures"/></section></>;
}
