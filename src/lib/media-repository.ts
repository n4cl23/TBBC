import 'server-only';

import crypto from 'node:crypto';
import { prisma } from './prisma';
import type { CharacterMediaRecord, MediaImage, MediaVariant } from '@/types/media';

const digest = (value: string) => crypto.createHash('sha256').update(value).digest('hex');

type MediaContext = { actor: string; ip: string; requestId: string; origin?: string };
type MediaLink = { role: string; order: number; media: { id: string; filename: string; publicUrl: string; alt: string; caption: string | null; width: number | null; height: number | null; mimeType: string | null; size: number | null; createdAt: Date; updatedAt: Date; variants: Array<{ kind: string; publicUrl: string }> } };

function toImage(link: MediaLink): MediaImage {
  return { id: link.media.id, src: link.media.publicUrl, filename: link.media.filename, alt: link.media.alt, caption: link.media.caption || undefined, width: link.media.width || undefined, height: link.media.height || undefined, mimeType: link.media.mimeType || undefined, size: link.media.size || undefined, order: link.order, isPrimary: link.role === 'primary', createdAt: link.media.createdAt.toISOString(), updatedAt: link.media.updatedAt.toISOString(), variants: Object.fromEntries(link.media.variants.map((variant) => [variant.kind, variant.publicUrl])) as Partial<Record<MediaVariant, string>> };
}

export async function getCharacterMedia(slug: string): Promise<CharacterMediaRecord> {
  try {
    const entity = await prisma.worldEntity.findFirst({ where: { slug, kind: 'character', deletedAt: null }, include: { mediaLinks: { include: { media: { include: { variants: true } } }, orderBy: { order: 'asc' } } } });
    if (!entity) return { gallery: [] };
    const images = entity.mediaLinks.map(toImage);
    return { primary: images.find((item) => item.isPrimary), gallery: images.filter((item) => !item.isPrimary) };
  } catch (error) {
    if (process.env.NODE_ENV === 'production') throw error;
    return { gallery: [] };
  }
}

export async function listCharacterMedia() {
  try {
    const entities = await prisma.worldEntity.findMany({ where: { kind: 'character', deletedAt: null }, select: { slug: true } });
    return Object.fromEntries(await Promise.all(entities.map(async (entity) => [entity.slug, await getCharacterMedia(entity.slug)] as const)));
  } catch (error) {
    if (process.env.NODE_ENV === 'production') throw error;
    return {};
  }
}

export async function saveCharacterMedia(slug: string, record: CharacterMediaRecord, context?: MediaContext) {
  const entity = await prisma.worldEntity.findFirst({ where: { slug, kind: 'character', deletedAt: null } });
  if (!entity) throw new Error('Personagem não encontrado no PostgreSQL.');
  await prisma.$transaction(async (tx) => {
    await tx.mediaRelation.deleteMany({ where: { entityId: entity.id } });
    for (const item of [...(record.primary ? [record.primary] : []), ...record.gallery]) {
      const checksum = digest(`${item.id}:${item.src}:${item.size || 0}`);
      const storageKey = item.src.replace(/^\//, '');
      await tx.mediaAsset.upsert({ where: { id: item.id }, create: { id: item.id, slug: item.id, filename: item.filename, src: item.src, publicUrl: item.src, storageKey, checksum, alt: item.alt, caption: item.caption, category: 'character', mimeType: item.mimeType, size: item.size, width: item.width, height: item.height, tags: [] }, update: { filename: item.filename, src: item.src, publicUrl: item.src, storageKey, checksum, alt: item.alt, caption: item.caption, mimeType: item.mimeType, size: item.size, width: item.width, height: item.height } });
      await tx.mediaRelation.create({ data: { mediaId: item.id, entityId: entity.id, role: item.isPrimary ? 'primary' : 'gallery', order: item.order } });
      for (const [kind, url] of Object.entries(item.variants || {})) {
        if (!url) continue;
        await tx.mediaVariant.upsert({ where: { mediaId_kind: { mediaId: item.id, kind } }, create: { mediaId: item.id, kind, storageKey: url.replace(/^\//, ''), publicUrl: url, mimeType: 'image/webp', size: item.size || 0, width: item.width, height: item.height, checksum: digest(`${checksum}:${kind}`) }, update: { publicUrl: url, storageKey: url.replace(/^\//, ''), size: item.size || 0, width: item.width, height: item.height } });
      }
    }
    if (context) await tx.auditLog.create({ data: { actor: context.actor, ip: context.ip, entityType: 'characterMedia', entityId: entity.id, operation: 'update', changes: { mediaIds: [...(record.primary ? [record.primary.id] : []), ...record.gallery.map((item) => item.id)] }, requestId: context.requestId, origin: context.origin } });
  });
  return record;
}

export async function updateImageMetadata(slug: string, id: string, patch: Pick<MediaImage, 'alt' | 'caption' | 'isPrimary' | 'order'>, context?: MediaContext) {
  const record = await getCharacterMedia(slug);
  const all = [...(record.primary ? [record.primary] : []), ...record.gallery];
  const target = all.find((item) => item.id === id);
  if (!target) throw new Error('Imagem não encontrada.');
  Object.assign(target, patch, { updatedAt: new Date().toISOString() });
  if (patch.isPrimary) {
    for (const item of all) item.isPrimary = item.id === id;
    record.primary = target;
    record.gallery = all.filter((item) => item.id !== id);
  } else record.gallery = all.filter((item) => !item.isPrimary);
  record.gallery.sort((a, b) => a.order - b.order);
  return saveCharacterMedia(slug, record, context);
}
