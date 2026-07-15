import {NextResponse} from 'next/server';
import {listCanonEntities} from '@/data/canon-registry';
import type {CanonEntityKind, CanonRole} from '@/types/canon';
export function canonCollection(kind: CanonEntityKind, role?: CanonRole) {
  const data = listCanonEntities(kind, role);
  return NextResponse.json({data, count: data.length, source: '/api/canon'});
}
