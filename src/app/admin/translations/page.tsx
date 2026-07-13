import Link from 'next/link';import {Fragment} from 'react';
import {listCmsRecords} from '@/lib/cms-repository';
import {translationCoverage} from '@/lib/localized-content';
import type {CmsEntityType} from '@/types/cms';

const entities: CmsEntityType[]=['characters','collections','guardians','realms','crowns','weapons','timeline','gallery','news','artBible','printGuide','marketplaces','marketplaceListings'];

export default async function Page(){
  const rows=await Promise.all(entities.map(async entity=>{
    const records=(await listCmsRecords(entity)).filter(record=>record.status==='published');
    const locale=(['en','es'] as const).map(code=>{const coverage=records.map(record=>translationCoverage(entity,record.data,code));return {code,published:coverage.filter(item=>item.status==='published'&&item.complete).length,drafts:coverage.filter(item=>item.status==='draft').length,incomplete:coverage.filter(item=>!item.complete).length,missingFields:coverage.reduce((sum,item)=>sum+item.missingFields.length,0)};});
    return {entity,total:records.length,locale};
  }));
  const total=rows.reduce((sum,row)=>sum+row.total,0),complete=rows.every(row=>row.locale.every(locale=>locale.published===row.total));
  return <><span className="eyebrow">Internacionalização editorial</span><h1 className="admin-title">Cobertura PT / EN / ES</h1><p className="muted">PT-BR é a fonte editorial. EN e ES só são publicados quando todos os campos exigidos estão completos; caso contrário, a página usa fallback integral.</p><div className="admin-grid"><div className="admin-panel"><span className="eyebrow">Registros-base</span><h2 className="serif">{total}</h2><p className="muted">Publicados em PT-BR</p></div><div className="admin-panel"><span className="eyebrow">Estado global</span><h2 className="serif">{complete?'Completo':'Revisão necessária'}</h2><p className="muted">Cobertura editorial publicada em EN e ES</p></div></div><div className="admin-panel" style={{marginTop:24,overflowX:'auto'}}><table className="admin-table"><thead><tr><th>Entidade</th><th>PT-BR</th><th>EN publicados</th><th>EN lacunas</th><th>ES publicados</th><th>ES lacunas</th><th>Fallbacks</th></tr></thead><tbody>{rows.map(row=><tr key={row.entity}><td><strong>{row.entity}</strong></td><td>{row.total}</td>{row.locale.map(locale=><Fragment key={locale.code}><td>{locale.published}/{row.total}</td><td>{locale.missingFields}</td></Fragment>)}<td>{row.locale.reduce((sum,locale)=>sum+locale.incomplete,0)}</td></tr>)}</tbody></table></div><p className="muted" style={{marginTop:16}}>Edite traduções nos módulos de conteúdo. <Link href="/admin">Voltar ao World Engine</Link>.</p></>;
}
