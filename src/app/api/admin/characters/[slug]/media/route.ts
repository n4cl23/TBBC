import { NextRequest, NextResponse } from 'next/server';
import { characters } from '@/data/content';
import { getCharacterMedia, saveCharacterMedia, updateImageMetadata } from '@/lib/media-repository';
import { imageStorage } from '@/lib/image-storage';
import { requestContext, validateAdminMutation } from '@/lib/admin-security';

const fail = (message: string, status = 400) => NextResponse.json({ ok: false, message }, { status });
const denied = (request: NextRequest) => { const message = validateAdminMutation(request); return message ? fail(message, 403) : null; };

export async function GET(_: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!characters.some((item) => item.slug === slug)) return fail('Personagem não encontrado.', 404);
  return NextResponse.json(await getCharacterMedia(slug));
}

export async function POST(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const rejection = denied(request); if (rejection) return rejection;
    const { slug } = await params;
    if (!characters.some((item) => item.slug === slug)) return fail('Personagem não encontrado.', 404);
    const form = await request.formData();
    const files = form.getAll('files').filter((item): item is File => item instanceof File);
    const primary = form.get('kind') === 'primary';
    const alt = String(form.get('alt') || '').trim();
    if (!files.length) return fail('Selecione ao menos uma imagem.');
    if (files.length > 12) return fail('Envie no máximo 12 imagens por vez.');
    if (primary && files.length !== 1) return fail('A imagem principal deve ser enviada individualmente.');
    if (!alt && primary) return fail('Informe o texto alternativo da imagem.');
    const record = await getCharacterMedia(slug);
    const uploaded = [];
    for (const file of files) uploaded.push(await imageStorage.upload(file, `characters/${slug}`, primary, alt || `Galeria do personagem ${slug}`));
    if (primary) {
      if (record.primary) await imageStorage.delete(record.primary);
      record.primary = { ...uploaded[0], isPrimary: true };
    } else record.gallery.push(...uploaded.map((item, index) => ({ ...item, order: record.gallery.length + index, isPrimary: false })));
    await saveCharacterMedia(slug, record, requestContext(request));
    return NextResponse.json({ ok: true, message: 'Imagem atualizada com sucesso.', record });
  } catch (error) { return fail(error instanceof Error ? error.message : 'Não foi possível processar o arquivo.'); }
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const rejection = denied(request); if (rejection) return rejection;
    const { slug } = await params;
    const body = await request.json() as { id: string; alt: string; caption?: string; order: number; isPrimary: boolean };
    if (!body.alt?.trim()) return fail('Informe um texto alternativo.');
    const record = await updateImageMetadata(slug, body.id, { alt: body.alt.trim(), caption: body.caption?.trim(), order: body.order, isPrimary: body.isPrimary }, requestContext(request));
    return NextResponse.json({ ok: true, message: 'Metadados salvos com sucesso.', record });
  } catch (error) { return fail(error instanceof Error ? error.message : 'Não foi possível salvar.'); }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const rejection = denied(request); if (rejection) return rejection;
    const { slug } = await params;
    const id = request.nextUrl.searchParams.get('id');
    if (!id) return fail('Identificador ausente.');
    const record = await getCharacterMedia(slug);
    const target = record.primary?.id === id ? record.primary : record.gallery.find((item) => item.id === id);
    if (!target) return fail('Imagem não encontrada.', 404);
    await imageStorage.delete(target);
    if (record.primary?.id === id) record.primary = undefined;
    record.gallery = record.gallery.filter((item) => item.id !== id);
    await saveCharacterMedia(slug, record, requestContext(request));
    return NextResponse.json({ ok: true, message: 'Imagem removida com sucesso.', record });
  } catch { return fail('Não foi possível remover a imagem.'); }
}
