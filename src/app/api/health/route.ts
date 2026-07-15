import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  const startedAt = Date.now();
  try {
    const [database, entities, relations, canon] = await Promise.all([
      prisma.$queryRaw<Array<{ ok: number }>>`SELECT 1 AS ok`,
      prisma.worldEntity.count({ where: { deletedAt: null } }),
      prisma.semanticRelation.count(),
      prisma.canonVersion.findFirst({ orderBy: { importedAt: 'desc' }, select: { version: true, entityCount: true, relationCount: true, checksum: true } }),
    ]);
    const canonical = Boolean(canon && canon.entityCount === 142 && canon.relationCount === 305 && entities === 142 && relations === 305);
    return NextResponse.json({
      status: canonical ? 'ok' : 'degraded',
      service: 'theblackbanner',
      checks: {
        api: true,
        database: database[0]?.ok === 1,
        cms: entities === 142,
        graph: relations === 305,
        canon: canonical,
      },
      canon: canon ? { version: canon.version, entities, relations, checksum: canon.checksum } : null,
      latencyMs: Date.now() - startedAt,
      timestamp: new Date().toISOString(),
    }, { status: canonical ? 200 : 503, headers: { 'cache-control': 'no-store' } });
  } catch {
    return NextResponse.json({ status: 'error', service: 'theblackbanner', checks: { api: true, database: false, cms: false, graph: false, canon: false }, latencyMs: Date.now() - startedAt, timestamp: new Date().toISOString() }, { status: 503, headers: { 'cache-control': 'no-store' } });
  }
}
