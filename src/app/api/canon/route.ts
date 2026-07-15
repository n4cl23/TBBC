import {NextRequest,NextResponse} from 'next/server';
import {CANON_UPDATED_AT,CANON_VERSION,canonAliases,canonEvents,canonRelations,canonicalTaxonomy,officialBossEncounters,officialFactions,officialRealms,resolveCanonAlias} from '@/data/canon';
import {canonEntityKinds,type CanonEntityKind} from '@/types/canon';
export const dynamic='force-dynamic';
export function GET(request:NextRequest){
  const alias=request.nextUrl.searchParams.get('alias'),kind=request.nextUrl.searchParams.get('kind');
  if(alias||kind){
    if(!alias||!kind||!canonEntityKinds.includes(kind as CanonEntityKind))return NextResponse.json({message:'Informe alias e kind canônico válidos.'},{status:400});
    return NextResponse.json({kind,alias,canonicalSlug:resolveCanonAlias(kind as CanonEntityKind,alias),version:CANON_VERSION});
  }
  return NextResponse.json({version:CANON_VERSION,updatedAt:CANON_UPDATED_AT,taxonomy:canonicalTaxonomy,realms:officialRealms,events:canonEvents,relations:canonRelations,aliases:canonAliases,factions:officialFactions,bossEncounters:officialBossEncounters});
}
