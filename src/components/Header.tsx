'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import {BrandLockup} from '@/components/Brand';
const links = [
  ['/universo', 'Universo'],
  ['/colecoes', 'Coleções'],
  ['/personagens', 'Personagens'],
  ['/guardioes', 'Guardiões'],
  ['/coroas', 'Coroas'],
  ['/reinos', 'Reinos'],
  ['/galeria', 'Galeria'],
  ['/marketplaces', 'Marketplaces'],
];
export function Header() {
  const [open, setOpen] = useState(false),
    path = usePathname();
  if (path.startsWith('/admin')) return null;
  return (
    <header className="header">
      <div className="container">
        <nav className="nav" aria-label="Principal">
          <BrandLockup/>
          <div className="links">
            {links.map(([h, l]) => (
              <Link key={h} href={h}>
                {l}
              </Link>
            ))}
          </div>
          <button
            className="menu-button"
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </nav>
        {open && (
          <div className="mobile">
            {links.map(([h, l]) => (
              <Link onClick={() => setOpen(false)} key={h} href={h}>
                {l}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
