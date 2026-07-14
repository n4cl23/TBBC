import Link from 'next/link';

type MarkProps = {className?: string; label?: string};

export function BannerSigil({className='',label='The Black Banner'}:MarkProps){return <svg className={className} viewBox="0 0 120 148" role="img" aria-label={label}><path className="sigil-field" d="M12 7h96v83c0 26-18 42-48 53-30-11-48-27-48-53V7Z"/><path className="sigil-line" d="M20 15h80v73c0 21-14 34-40 45-26-11-40-24-40-45V15Z"/><path className="sigil-line" d="M60 22v91M34 39l26 17 26-17-11 31 12 27-27-14-27 14 12-27-11-31Z"/><path className="sigil-rune" d="m42 31 18 12 18-12M42 108l18-12 18 12"/><circle className="sigil-gem" cx="60" cy="70" r="4"/></svg>}

export function BannerMonogram({className='',label='Monogram BB'}:MarkProps){return <svg className={className} viewBox="0 0 96 96" role="img" aria-label={label}><path className="monogram-ring" d="M48 5 79 18l12 30-12 30-31 13-31-13L5 48l12-30L48 5Z"/><path className="monogram-glyph" d="M29 23h23c13 0 20 5 20 14 0 6-4 10-10 12 8 2 12 6 12 13 0 10-8 16-23 16H29V23Zm15 11v11h7c4 0 7-2 7-6s-3-5-7-5h-7Zm0 21v12h8c5 0 8-2 8-6s-3-6-8-6h-8Z"/><path className="monogram-cut" d="M48 14v68"/></svg>}

export function BrandLockup({compact=false,stacked=false}:{compact?:boolean;stacked?:boolean}){return <Link href="/" className={`brand-lockup ${compact?'compact':''} ${stacked?'stacked':''}`} aria-label="The Black Banner Chronicles — início"><BannerSigil/><span><strong>THE BLACK BANNER</strong>{!compact&&<small>CHRONICLES OF ASTERHEIM</small>}</span></Link>}
