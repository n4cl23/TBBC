import { NextRequest, NextResponse } from 'next/server';
import { CMS_ENTITIES, type CmsEntityType } from '@/types/cms';
import { listCmsRecords, saveCmsRecord } from '@/lib/cms-repository';
import { requestContext, requireEditorialPermission, validateAdminMutation } from '@/lib/admin-security';
import { validateCanonPayload } from '@/lib/canon-validation';
import { cmsMutationSchema } from '@/lib/cms-schemas';

const valid = (value: string): value is CmsEntityType =>
  (CMS_ENTITIES as readonly string[]).includes(value);

export async function GET(_: NextRequest, { params }: { params: Promise<{ entity: string }> }) {
  const { entity } = await params;
  if (!valid(entity)) return NextResponse.json({ message: 'Entidade inválida.' }, { status: 404 });
  return NextResponse.json(await listCmsRecords(entity));
}

export async function POST(request: NextRequest, { params }: { params: Promise<{ entity: string }> }) {
  const { entity } = await params;
  const error = validateAdminMutation(request);
  if (error) return NextResponse.json({ message: error }, { status: error.includes('MB') ? 413 : 429 });
  if (!valid(entity)) return NextResponse.json({ message: 'Entidade inválida.' }, { status: 404 });
  try {
    const parsed = cmsMutationSchema.safeParse(await request.json());
    if (!parsed.success) return NextResponse.json({ message: 'Payload inválido.', issues: parsed.error.issues.map((issue) => ({ path: issue.path, message: issue.message })) }, { status: 400 });
    const permission = requireEditorialPermission(request, parsed.data.status === 'published' ? 'publish' : 'create');
    if (permission) return NextResponse.json({ message: permission }, { status: 403 });
    const validation = validateCanonPayload(entity, parsed.data.data);
    if (!validation.ok) return NextResponse.json({ message: validation.message }, { status: 400 });
    return NextResponse.json({ message: 'Conteúdo criado com sucesso.', record: await saveCmsRecord(entity, parsed.data, requestContext(request)) });
  } catch (caught) {
    return NextResponse.json({ message: caught instanceof Error ? caught.message : 'Não foi possível criar o conteúdo.' }, { status: caught instanceof Error && 'status' in caught ? Number(caught.status) : 400 });
  }
}
