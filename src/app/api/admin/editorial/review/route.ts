import { NextRequest, NextResponse } from 'next/server';
import { CMS_ENTITIES, type CmsEntityType } from '@/types/cms';
import { getCmsRecord } from '@/lib/cms-repository';
import { editorialReviewSchema } from '@/lib/editorial-forms';
import { requestContext, requireEditorialPermission, validateAdminMutation } from '@/lib/admin-security';
import { prisma } from '@/lib/prisma';

const valid = (value: string): value is CmsEntityType =>
  (CMS_ENTITIES as readonly string[]).includes(value);

export async function POST(request: NextRequest) {
  const guard = validateAdminMutation(request);
  if (guard) return NextResponse.json({ message: guard }, { status: guard.includes('MB') ? 413 : 429 });
  try {
    const parsed = editorialReviewSchema.safeParse(await request.json());
    if (!parsed.success || !valid(parsed.data.entity)) return NextResponse.json({ message: 'Solicitação de revisão inválida.' }, { status: 400 });
    const permission = requireEditorialPermission(request, parsed.data.decision === 'submit' ? 'submitReview' : 'approveReview');
    if (permission) return NextResponse.json({ message: permission }, { status: 403 });
    const record = await getCmsRecord(parsed.data.entity, parsed.data.id);
    if (!record) return NextResponse.json({ message: 'Registro não encontrado.' }, { status: 404 });
    const context = requestContext(request);
    await prisma.auditLog.create({ data: { actor: context.actor, role: 'editorial', ip: context.ip, entityType: parsed.data.entity, entityId: record.id, operation: `review:${parsed.data.decision}`, changes: [{ field: 'editorialReview', before: null, after: { note: parsed.data.note, version: record.version } }], previousVersion: record.version, newVersion: record.version, requestId: context.requestId, origin: context.origin } });
    return NextResponse.json({ message: parsed.data.decision === 'submit' ? 'Versão enviada para revisão.' : 'Decisão editorial registrada.', recordId: record.id, version: record.version });
  } catch (caught) {
    return NextResponse.json({ message: caught instanceof Error ? caught.message : 'Não foi possível registrar a revisão.' }, { status: 400 });
  }
}
