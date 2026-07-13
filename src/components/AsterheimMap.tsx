'use client';
import Image from 'next/image';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {Compass,Filter,Map,Minus,Plus,RotateCcw,X} from 'lucide-react';
import {useMemo,useRef,useState} from 'react';
import {atlasEras,atlasPoints,atlasRealms,type AtlasFilter} from '@/data/atlas';
import {isLocale,localizedPath,type Locale} from '@/lib/i18n';
import {RealmSigil} from './RealmSigil';
const filterLabels:Record<AtlasFilter,string>={realms:'Reinos',guardians:'Guardi\u00f5es',crowns:'Coroas',characters:'Personagens',collections:'Cole\u00e7\u00f5es',marketplace:'Marketplace',creatures:'Criaturas',bosses:'Bosses',locations:'Locais'};
const initialFilters=new Set<AtlasFilter>(['realms','guardians','crowns','creatures','bosses','locations']);
export function AsterheimMap(){return <AsterheimAtlas mode="compact"/>}
export function AsterheimAtlas({mode='full'}:{mode?:'compact'|'full'}){
  const pathname=usePathname(),first=pathname.split('/').filter(Boolean)[0],locale:Locale=isLocale(first)?first:'pt-br';
  const [selected,setSelected]=useState(atlasRealms[0]),[hovered,setHovered]=useState<string>(),[point,setPoint]=useState<(typeof atlasPoints)[number]>(),[eraIndex,setEraIndex]=useState(3),[filters,setFilters]=useState(initialFilters),[scale,setScale]=useState(mode==='full'?1.04:1),[pan,setPan]=useState({x:0,y:0});
  const drag=useRef<{x:number;y:number;panX:number;panY:number}|undefined>(undefined),visiblePoints=useMemo(()=>atlasPoints.filter(x=>x.realm===selected.slug&&filters.has(x.category)),[selected,filters]);
  const focusScale=mode==='compact'?1.14:Math.max(scale,1.34),focusX=selected?(50-selected.x)*(focusScale-1)*1.45:0,focusY=selected?(50-selected.y)*(focusScale-1)*1.15:0;
  function toggle(filter:AtlasFilter){setFilters(current=>{const next=new Set(current);if(next.has(filter))next.delete(filter);else next.add(filter);return next})}
  function reset(){setScale(mode==='full'?1.04:1);setPan({x:0,y:0});setPoint(undefined);setSelected(atlasRealms[0])}
  return <section className={`asterheim-atlas ${mode}`} aria-label="Mapa ilustrado interativo de Asterheim" data-era={atlasEras[eraIndex].id}>
    {mode==='full'&&<header className="atlas-toolbar"><div><span className="eyebrow">Cartografia viva</span><h1 className="serif">Atlas de Asterheim</h1></div><div className="atlas-zoom"><button onClick={()=>setScale(x=>Math.max(1,x-.18))} aria-label="Reduzir zoom"><Minus/></button><span>{Math.round(scale*100)}%</span><button onClick={()=>setScale(x=>Math.min(2.4,x+.18))} aria-label="Ampliar mapa"><Plus/></button><button onClick={reset} aria-label="Redefinir mapa"><RotateCcw/></button></div></header>}
    {mode==='full'&&<aside className="atlas-filters"><span><Filter/> Camadas</span>{(Object.keys(filterLabels) as AtlasFilter[]).map(filter=><button key={filter} className={filters.has(filter)?'active':''} onClick={()=>toggle(filter)} aria-pressed={filters.has(filter)}>{filterLabels[filter]}</button>)}</aside>}
    <div className="atlas-viewport" onWheel={mode==='full'?event=>{event.preventDefault();setScale(x=>Math.min(2.4,Math.max(1,x+(event.deltaY<0?.12:-.12))))}:undefined} onPointerDown={mode==='full'?event=>{if((event.target as Element).closest('button,a,[role="button"]'))return;drag.current={x:event.clientX,y:event.clientY,panX:pan.x,panY:pan.y};event.currentTarget.setPointerCapture(event.pointerId)}:undefined} onPointerMove={mode==='full'?event=>{if(drag.current)setPan({x:drag.current.panX+event.clientX-drag.current.x,y:drag.current.panY+event.clientY-drag.current.y})}:undefined} onPointerUp={mode==='full'?()=>{drag.current=undefined}:undefined}>
      <div className="atlas-canvas" style={{transform:`translate3d(${pan.x+focusX}px,${pan.y+focusY}px,0) scale(${selected?focusScale:scale})`}}>
        <Image src="/images/atlas/asterheim-atlas-v1.webp" alt="Mapa ilustrado do continente de Asterheim com geleiras, florestas, montanhas, vulcÃµes, ilhas e oceanos" fill priority={mode==='full'} sizes={mode==='full'?'100vw':'(max-width: 900px) 100vw, 1200px'} draggable={false}/>
        <div className={`atlas-weather ${hovered||selected.slug} ${selected.weather}`} aria-hidden="true"/>
        <svg className="atlas-regions" viewBox="0 0 100 100" role="group" aria-label="Fronteiras dos seis reinos">{atlasRealms.map(realm=><path key={realm.slug} d={realm.path} className={selected.slug===realm.slug?'selected':''} style={{'--realm':realm.accent} as React.CSSProperties} onPointerEnter={()=>setHovered(realm.slug)} onPointerLeave={()=>setHovered(undefined)} onClick={()=>{setSelected(realm);setPoint(undefined)}} role="button" tabIndex={0} aria-label={`Explorar ${realm.name}`} onKeyDown={event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();setSelected(realm)}}}/>)}</svg>
        {filters.has('realms')&&atlasRealms.map(realm=><button className={`atlas-sigil ${selected.slug===realm.slug?'selected':''}`} style={{left:`${realm.x}%`,top:`${realm.y}%`,'--realm':realm.accent} as React.CSSProperties} key={realm.slug} onClick={()=>{setSelected(realm);setPoint(undefined)}} aria-label={`${realm.name}: ${realm.symbol}`}><RealmSigil realm={realm.slug}/><span>{realm.name}</span></button>)}
        {visiblePoints.map(item=><button key={`${item.realm}-${item.slug}`} className={`atlas-poi ${item.danger?'danger':''}`} style={{left:`${item.x}%`,top:`${item.y}%`} as React.CSSProperties} onClick={()=>setPoint(item)} aria-label={`${item.kind}: ${item.name}`}><i/><span>{item.name}</span></button>)}
      </div>
      <div className="atlas-vignette" aria-hidden="true"/>
      {mode==='full'&&<div className="atlas-compass" aria-hidden="true"><Compass/><span>N</span></div>}
    </div>
    <aside className="atlas-detail" style={{'--realm':selected.accent} as React.CSSProperties}><RealmSigil realm={selected.slug}/><div><span className="eyebrow">{selected.symbol}</span><h2 className="serif">{selected.name}</h2><p>{selected.summary}</p><p><strong>Arquitetura</strong>{selected.architecture}</p><div className="atlas-actions"><Link className="button" href={localizedPath(locale,'realms',selected.slug)}>Abrir Reino</Link>{mode==='compact'&&<Link className="button ghost" href={localizedPath(locale,'atlas')}>Abrir Atlas</Link>}</div></div></aside>
    {point&&<aside className="atlas-point-card" style={{'--realm':selected.accent} as React.CSSProperties}><button className="atlas-close" onClick={()=>setPoint(undefined)} aria-label="Fechar ponto"><X/></button><small>{point.kind} · {selected.name}</small><h2 className="serif">{point.name}</h2><p>{point.description}</p>{point.related?.length?<p><strong>ConexÃµes</strong>{point.related.join(' · ')}</p>:null}<Link className="button" href={localizedPath(locale,'atlas',`${point.realm}/${point.slug}`)}>Abrir registro</Link></aside>}
    {mode==='full'&&<footer className="atlas-timeline"><div><small>{atlasEras[eraIndex].year}</small><strong>{atlasEras[eraIndex].label}</strong><p>{atlasEras[eraIndex].description}</p></div><input type="range" min="0" max={atlasEras.length-1} value={eraIndex} onChange={event=>setEraIndex(Number(event.target.value))} aria-label="Era exibida no mapa"/><div className="atlas-era-labels">{atlasEras.map(era=><span key={era.id}>{era.label}</span>)}</div></footer>}
    {mode==='full'&&<div className="atlas-minimap"><Map/><div><i style={{left:`${selected.x}%`,top:`${selected.y}%`}}/></div><span>VisÃ£o continental</span></div>}
  </section>
}
