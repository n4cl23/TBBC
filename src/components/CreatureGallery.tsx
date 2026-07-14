'use client';

import Image from 'next/image';
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { CreatureMediaItem } from '@/types/creature';

export function CreatureGallery({ items, alt, captions, labels }: { items: CreatureMediaItem[]; alt: string; captions: string[]; labels: { title: string; empty: string; open: string; close: string; previous: string; next: string } }) {
  const published = items.filter((item) => item.published);
  const [active, setActive] = useState<number | null>(null);
  useEffect(() => {
    if (active === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActive(null);
      if (event.key === 'ArrowLeft') setActive((value) => value === null ? null : (value - 1 + published.length) % published.length);
      if (event.key === 'ArrowRight') setActive((value) => value === null ? null : (value + 1) % published.length);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [active, published.length]);
  if (!published.length) return <section className="creature-gallery container"><span className="eyebrow">{labels.title}</span><p className="creature-gallery-empty">{labels.empty}</p></section>;
  return <section className="creature-gallery container"><span className="eyebrow">{labels.title}</span><div className={published.length === 1 ? 'single' : ''}>{published.map((item, index) => <figure key={item.id}><button type="button" onClick={() => setActive(index)} aria-label={`${labels.open}: ${alt}`}><Image src={item.url} alt={alt} fill sizes="(max-width: 700px) 100vw, 50vw"/><Maximize2 aria-hidden="true"/></button><figcaption><span>{captions[index] || captions[0] || alt}</span><small>{item.type}</small></figcaption></figure>)}</div>{active !== null && <div className="creature-lightbox" role="dialog" aria-modal="true" aria-label={labels.title}><button className="lightbox-close" type="button" onClick={() => setActive(null)} aria-label={labels.close}><X/></button><Image src={published[active].url} alt={alt} fill sizes="100vw" priority/>{published.length > 1 && <><button className="lightbox-prev" type="button" onClick={() => setActive((active - 1 + published.length) % published.length)} aria-label={labels.previous}><ChevronLeft/></button><button className="lightbox-next" type="button" onClick={() => setActive((active + 1) % published.length)} aria-label={labels.next}><ChevronRight/></button></>}<p>{captions[active] || captions[0] || alt}</p></div>}</section>;
}
