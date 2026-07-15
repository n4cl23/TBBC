'use client';

import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {
  BookImage, BookOpen, Box, Castle, Clock3, Crown, Database, FileBox,
  FileText, GitBranch, History, Home, Menu, Newspaper, Route, Shield,
  PawPrint, Sparkles, Swords, Users, X,
} from 'lucide-react';
import {useState} from 'react';

const items = [
  ['/admin', 'Dashboard', Home],
  ['/admin/creator-studio', 'Creator Studio', Sparkles],
  ['/admin/marketplace', 'Marketplace Hub', Box],
  ['/admin/world-builder', 'World Builder', Sparkles],
  ['/admin/relations', 'Relações', Sparkles],
  ['/admin/world', 'World Database', Database],
  ['/admin/creatures', 'Criaturas', PawPrint],
  ['/admin/personagens', 'Personagens', Users],
  ['/admin/colecoes', 'Coleções', Box],
  ['/admin/guardioes', 'Guardiões', Shield],
  ['/admin/coroas', 'Coroas', Crown],
  ['/admin/reinos', 'Reinos', Castle],
  ['/admin/armas', 'Armas', Swords],
  ['/admin/timeline', 'Timeline', Clock3],
  ['/admin/prompts', 'Prompts', FileText],
  ['/admin/stl', 'STL Library', FileBox],
  ['/admin/roadmap', 'Roadmap', Route],
  ['/admin/galeria', 'Galeria', BookImage],
  ['/admin/novidades', 'Novidades', Newspaper],
  ['/admin/art-bible', 'Art Bible', BookOpen],
  ['/admin/print-guide', 'Impressão', GitBranch],
  ['/admin/history', 'Histórico', History],
] as const;

export function AdminShell({children}: {children: React.ReactNode}) {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  return <div className="admin-shell">
    <button className="admin-menu" onClick={() => setOpen(!open)} aria-label={open ? 'Fechar menu' : 'Abrir menu'}>{open ? <X/> : <Menu/>}</button>
    <aside className={`admin-sidebar ${open ? 'open' : ''}`}>
      <div className="admin-logo serif">BLACK BANNER <small>CREATOR STUDIO</small></div>
      <nav aria-label="Administração">{items.map(([href, label, Icon]) =>
        <Link className={path === href ? 'active' : ''} href={href} key={href} onClick={() => setOpen(false)}><Icon size={17}/>{label}</Link>
      )}</nav>
      <Link href="/" className="admin-public">← Ver site público</Link>
    </aside>
    <div className="admin-main">
      <header className="admin-header"><div><span className="eyebrow">World Engine</span><strong>Centro da propriedade intelectual</strong></div><span className="admin-status">Creator Studio · CMS versionado</span></header>
      <main className="admin-content">{children}</main>
    </div>
  </div>;
}
