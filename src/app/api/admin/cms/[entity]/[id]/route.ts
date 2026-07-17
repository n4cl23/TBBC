import { NextRequest, NextResponse } from 'next/server';
import { CMS_ENTITIES, type CmsEntityType } from '@/types/cms';
import { deleteCmsRecord, duplicateCmsRecord, getCmsRecord, listVersions, restoreVersion, saveCmsRecord } from '@/lib/cms-repository';
import { requestContext, requireEditorialPermission, validateAdminMutation } from '@/lib/admin-security';
import { validateCanonPayload } from '@/lib/canon-validation';
import { cmsPatchSchema } from '@/lib/cms-schemas';

const valid = (value: string): value is CmsEntityType =>
  (CMS_ENTITIES as readonly string[]).includes(value);

export async function GET(_: NextRequest, { params }: { params: Promise<{ entity: string; id: string }> }) {
  const { entity, id } = await params;
  if (!valid(entity)) return NextResponse.json({ message: 'Entidade inválida.' }, { status: 404 });
  const record = await getCmsRecord(entity, id);
  return record ? NextResponse.json({ record, versions: await listVersions(entity, id) }) : NextResponse.json({ message: 'Não encontrado.' }, { status: 404 });
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ entity: string; id: string }> }) {
  const { entity, id } = await params;
  const error = validateAdminMutation(request);
  if (error) return NextResponse.json({ message: error }, { status: error.includes('MB') ? 413 : 429 });
  if (!valid(entity)) return NextResponse.json({ message: 'Entidade inválida.' }, { status: 404 });
  try {
    const parsed = cmsPatchSchema.safeParse(await request.json());
    if (!parsed.success) return NextResponse.json({ message: 'Payload inválido.', issues: parsed.error.issues.map((issue) => ({ path: issue.path, message: issue.message })) }, { status: 400 });
    const body = parsed.data;
    const context = requestContext(request);
    if ('action' in body && body.action === 'duplicate') {
      const permission = requireEditorialPermission(request, 'create');
      if (permission) return NextResponse.json({ message: permission }, { status: 403 });
      return NextResponse.json({ message: 'Conteúdo duplicado.', record: await duplicateCmsRecord(entity, id, context) });
    }
    if ('action' in body && body.action === 'restore') {
      const permission = requireEditorialPermission(request, 'restore');
      if (permission) return NextResponse.json({ message: permission }, { status: 403 });
      return NextResponse.json({ message: 'Versão restaurada.', record: await restoreVersion(entity, id, body.versionId, { ...context, reason: body.reason }) });
    }
    const permission = requireEditorialPermission(request, body.status === 'published' ? 'publish' : 'edit');
    if (permission) return NextResponse.json({ message: permission }, { status: 403 });
    const validation = validateCanonPayload(entity, body.data);
    if (!validation.ok) return NextResponse.json({ message: validation.message }, { status: 400 });
    return NextResponse.json({ message: 'Conteúdo salvo com sucesso.', record: await saveCmsRecord(entity, { id, ...body }, context) });
  } catch (caught) {
    return NextResponse.json({ message: caught instanceof Error ? caught.message : 'Falha ao salvar.' }, { status: caught instanceof Error && 'status' in caught ? Number(caught.status) : 400 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ entity: string; id: string }> }) {
  const { entity, id } = await params;
  const error = validateAdminMutation(request);
  if (error) return NextResponse.json({ message: error }, { status: error.includes('MB') ? 413 : 429 });
  if (!valid(entity)) return NextResponse.json({ message: 'Entidade inválida.' }, { status: 404 });
  const permission = requireEditorialPermission(request, 'archive');
  if (permission) return NextResponse.json({ message: permission }, { status: 403 });
  try {
    await deleteCmsRecord(entity, id, requestContext(request));
    return NextResponse.json({ message: 'Conteúdo arquivado.' });
  } catch (caught) {
    return NextResponse.json({ message: caught instanceof Error ? caught.message : 'Falha ao arquivar.' }, { status: 400 });
  }
}
