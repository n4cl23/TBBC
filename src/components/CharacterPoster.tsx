import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { MediaImage } from '@/types/media';
import { mediaAlt, mediaSrc } from '@/lib/media';
import { defaultLocale, isLocale, type Locale } from '@/lib/i18n';

const copy: Record<Locale, { portrait: string; fallback: string; open: string }> = {
  'pt-br': { portrait: 'Retrato de', fallback: 'Crônicas de Asterheim', open: 'Abrir crônica' },
  en: { portrait: 'Portrait of', fallback: 'Chronicles of Asterheim', open: 'Open chronicle' },
  es: { portrait: 'Retrato de', fallback: 'Crónicas de Asterheim', open: 'Abrir crónica' },
};

export function CharacterPoster({name,title,quote,image,href,index=0}:{name:string;title?:string;quote:string;image:string|MediaImage;href:string;index?:number}) {
  const segment = href.split('/').filter(Boolean)[0] || '', locale = isLocale(segment) ? segment : defaultLocale, content = copy[locale];
  return <Link className="character-poster reveal" href={href} style={{'--poster-delay':`${Math.min(index,8)*60}ms`} as React.CSSProperties}><Image src={mediaSrc(image,'full')} alt={mediaAlt(image,`${content.portrait} ${name}`)} fill sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw"/><div className="poster-veil"/><span className="poster-index">{String(index+1).padStart(2,'0')}</span><div className="poster-copy"><small>{title||content.fallback}</small><h2 className="serif">{name}</h2><p>{quote}</p><span className="poster-open">{content.open} <ArrowUpRight/></span></div></Link>;
}
