import crypto from 'node:crypto';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { imageStorage } from '@/lib/image-storage';
import { mediaUploadSchema } from '@/lib/editorial-forms';
import { requestContext, requireEditorialPermission, validateAdminMutation } from '@/lib/admin-security';
import { z } from 'zod';

export const runtime = 'nodejs';

function storageKey(url: string) {
  try { return new URL(url).pathname.replace(/^\//, ''); } catch { return url.replace(/^\//, ''); }
}

export async function GET(request: NextRequest) {
  const permission = requireEditorialPermission(request, 'read');
  if (permission) return NextResponse.json({ message: permission }, { status: 403 });
  const assets = await prisma.mediaAsset.findMany({ orderBy: { updatedAt: 'desc' }, take: 100, include: { variants: true, relations: true } });
  return NextResponse.json(assets);
}

export async function POST(request: NextRequest) {
  const guard = validateAdminMutation(request);
  if (guard) return NextResponse.json({ message: guard }, { status: guard.includes('MB') ? 413 : 429 });
  const permission = requireEditorialPermission(request, 'manageMedia');
  if (permission) return NextResponse.json({ message: permission }, { status: 403 });
  try {
    const form = await request.formData();
    const file = form.get('file');
    if (!(file instanceof File)) return NextResponse.json({ message: 'Selecione uma imagem para enviar.' }, { status: 400 });
    const parsed = mediaUploadSchema.safeParse({ scope: form.get('scope'), alt: form.get('alt'), caption: form.get('caption') || undefined, category: form.get('category'), entityId: form.get('entityId') || undefined });
    if (!parsed.success) return NextResponse.json({ message: 'Dados de mídia inválidos.', issues: parsed.error.issues }, { status: 400 });
    const image = await imageStorage.upload(file, parsed.data.scope, form.get('primary') === 'true', parsed.data.alt);
    const context = requestContext(request);
    const asset = await prisma.$transaction(async (tx) => {
      const created = await tx.mediaAsset.create({ data: { id: image.id, slug: image.id, filename: image.filename, src: image.src, publicUrl: image.src, storageKey: storageKey(image.src), checksum: crypto.createHash('sha256').update(`${image.src}:${image.size || 0}`).digest('hex'), alt: image.alt, caption: parsed.data.caption, category: parsed.data.category, mimeType: image.mimeType, size: image.size, width: image.width, height: image.height, tags: [], provenance: 'editorial-upload' } });
      for (const [kind, url] of Object.entries(image.variants || {})) await tx.mediaVariant.create({ data: { mediaId: created.id, kind, storageKey: storageKey(url), publicUrl: url, mimeType: 'image/webp', size: image.size || 0, width: image.width, height: image.height, checksum: crypto.createHash('sha256').update(`${url}:${kind}`).digest('hex') } });
      if (parsed.data.entityId) await tx.mediaRelation.create({ data: { mediaId: created.id, entityId: parsed.data.entityId, role: form.get('primary') === 'true' ? 'primary' : 'gallery', order: 0 } });
      await tx.auditLog.create({ data: { actor: context.actor, role: 'editorial', ip: context.ip, entityType: 'mediaAssets', entityId: created.id, operation: 'create', changes: [{ field: 'storage', before: null, after: 'object' }], requestId: context.requestId, origin: context.origin } });
      return created;
    });
    return NextResponse.json({ message: 'Mídia enviada e versionada.', asset }, { status: 201 });
  } catch (caught) {
    return NextResponse.json({ message: caught instanceof Error ? caught.message : 'Não foi possível enviar a mídia.' }, { status: 400 });
  }
}

const mediaMetadataSchema = z.object({ id: z.string().min(1), alt: z.string().trim().min(3).max(240), caption: z.string().trim().max(500).nullable().optional(), category: z.string().trim().min(1).max(80) }).strict();

export async function PATCH(request: NextRequest) {
  const guard = validateAdminMutation(request);
  if (guard) return NextResponse.json({ message: guard }, { status: guard.includes('MB') ? 413 : 429 });
  const permission = requireEditorialPermission(request, 'manageMedia');
  if (permission) return NextResponse.json({ message: permission }, { status: 403 });
  try {
    const parsed = mediaMetadataSchema.safeParse(await request.json());
    if (!parsed.success) return NextResponse.json({ message: 'Metadados de mídia inválidos.' }, { status: 400 });
    const context = requestContext(request);
    const asset = await prisma.$transaction(async (tx) => {
      const current = await tx.mediaAsset.findUnique({ where: { id: parsed.data.id } });
      if (!current) throw new Error('Mídia não encontrada.');
      const updated = await tx.mediaAsset.update({ where: { id: current.id }, data: { alt: parsed.data.alt, caption: parsed.data.caption, category: parsed.data.category, version: { increment: 1 } } });
      await tx.auditLog.create({ data: { actor: context.actor, role: 'editorial', ip: context.ip, entityType: 'mediaAssets', entityId: current.id, operation: 'update', changes: [{ field: 'metadata', before: { alt: current.alt, caption: current.caption, category: current.category, version: current.version }, after: { alt: updated.alt, caption: updated.caption, category: updated.category, version: updated.version } }], previousVersion: current.version, newVersion: updated.version, requestId: context.requestId, origin: context.origin } });
      return updated;
    });
    return NextResponse.json({ message: 'Metadados atualizados e versionados.', asset });
  } catch (caught) {
    return NextResponse.json({ message: caught instanceof Error ? caught.message : 'Não foi possível atualizar a mídia.' }, { status: 400 });
  }
}
