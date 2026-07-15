import {NextRequest, NextResponse} from 'next/server';
import {canonRegistry, getCanonEntity} from '@/data/canon-registry';
import {canonEntityKinds, type CanonEntityKind} from '@/types/canon';
export const dynamic = 'force-dynamic';
export function GET(request: NextRequest) {
  const alias = request.nextUrl.searchParams.get('alias');
  const kind = request.nextUrl.searchParams.get('kind');
  if (alias || kind) {
    if (!alias || !kind || !canonEntityKinds.includes(kind as CanonEntityKind)) return NextResponse.json({message: 'Informe alias e kind canônico válidos.'}, {status: 400});
    const result = getCanonEntity(kind as CanonEntityKind, alias);
    return result ? NextResponse.json(result) : NextResponse.json({message: 'Entidade não encontrada.'}, {status: 404});
  }
  return NextResponse.json(canonRegistry);
}
