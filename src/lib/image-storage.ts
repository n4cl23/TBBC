import 'server-only';

import crypto from 'node:crypto';
import { mkdir, unlink } from 'node:fs/promises';
import path from 'node:path';
import sharp, { type Metadata } from 'sharp';
import { del, put } from '@vercel/blob';
import { DeleteObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import type { MediaImage, MediaVariant } from '@/types/media';
import { validateImageInput } from './media';

export interface ImageStorageProvider {
  upload(file: File, scope: string, primary: boolean, alt: string): Promise<MediaImage>;
  delete(image: MediaImage): Promise<void>;
  replace(oldImage: MediaImage, file: File, scope: string, alt: string): Promise<MediaImage>;
  list(scope: string): Promise<MediaImage[]>;
  getPublicUrl(relativePath: string): string;
}

const sizes: Record<MediaVariant, number> = { thumbnail: 400, card: 800, full: 2000 };

type ExternalProvider = 'blob' | 's3';
type StoredObject = { url: string; key: string };

function assertWritableStorage() {
  if (process.env.NODE_ENV === 'production') {
    throw new Error('O armazenamento local de mídia é somente leitura em produção. Configure um provedor de objetos externo.');
  }
}

export class LocalImageStorageProvider implements ImageStorageProvider {
  getPublicUrl(relativePath: string) {
    return `/${relativePath.replaceAll('\\', '/')}`;
  }

  async upload(file: File, scope: string, primary: boolean, alt: string) {
    assertWritableStorage();
    const validation = validateImageInput(file);
    if (validation) throw new Error(validation);
    const bytes = Buffer.from(await file.arrayBuffer());
    let metadata: Metadata;
    try {
      metadata = await sharp(bytes).metadata();
    } catch {
      throw new Error('Não foi possível processar o arquivo.');
    }
    if (!metadata.width || !metadata.height) throw new Error('A imagem parece estar corrompida.');

    const safeScope = scope.toLowerCase().replace(/[^a-z0-9/_-]/g, '-');
    const id = crypto.randomUUID();
    const kind = primary ? 'primary' : 'gallery';
    const folder = path.join(process.cwd(), 'public', 'uploads', safeScope, kind, id);
    await mkdir(folder, { recursive: true });

    const variants: Partial<Record<MediaVariant, string>> = {};
    for (const [variant, width] of Object.entries(sizes) as [MediaVariant, number][]) {
      const relative = path.join('uploads', safeScope, kind, id, `${variant}.webp`);
      await sharp(bytes).rotate().resize({ width, withoutEnlargement: true }).webp({ quality: 88 }).toFile(path.join(process.cwd(), 'public', relative));
      variants[variant] = this.getPublicUrl(relative);
    }

    const now = new Date().toISOString();
    return {
      id,
      src: variants.full!,
      filename: file.name.replace(/[^a-zA-Z0-9._-]/g, '-'),
      alt: alt.trim(),
      width: metadata.width,
      height: metadata.height,
      mimeType: 'image/webp',
      size: file.size,
      order: 0,
      isPrimary: primary,
      createdAt: now,
      updatedAt: now,
      variants,
    };
  }

  async delete(image: MediaImage) {
    assertWritableStorage();
    for (const src of Object.values(image.variants || { full: image.src })) {
      if (!src?.startsWith('/uploads/')) continue;
      try {
        await unlink(path.join(process.cwd(), 'public', src));
      } catch {
        // The database is authoritative; a missing local derivative is harmless.
      }
    }
  }

  async replace(oldImage: MediaImage, file: File, scope: string, alt: string) {
    assertWritableStorage();
    const next = await this.upload(file, scope, true, alt);
    await this.delete(oldImage);
    return next;
  }

  async list() {
    return [];
  }
}

class ObjectImageStorageProvider implements ImageStorageProvider {
  private readonly provider: ExternalProvider;
  private readonly s3?: S3Client;
  private readonly bucket?: string;
  private readonly publicBase?: string;

  constructor(provider: ExternalProvider) {
    this.provider = provider;
    if (provider === 's3') {
      this.bucket = process.env.S3_BUCKET;
      this.publicBase = process.env.S3_PUBLIC_BASE_URL?.replace(/\/$/, '');
      this.s3 = new S3Client({ region: process.env.S3_REGION });
    }
  }

  getPublicUrl(relativePath: string) {
    return relativePath;
  }

  private async store(key: string, body: Buffer): Promise<StoredObject> {
    if (this.provider === 'blob') {
      const stored = await put(key, body, { access: 'public', contentType: 'image/webp', addRandomSuffix: false });
      return { url: stored.url, key };
    }
    if (!this.s3 || !this.bucket || !this.publicBase) throw new Error('S3 não está completamente configurado para mídia pública.');
    await this.s3.send(new PutObjectCommand({ Bucket: this.bucket, Key: key, Body: body, ContentType: 'image/webp' }));
    return { url: `${this.publicBase}/${key}`, key };
  }

  async upload(file: File, scope: string, primary: boolean, alt: string) {
    const validation = validateImageInput(file);
    if (validation) throw new Error(validation);
    const bytes = Buffer.from(await file.arrayBuffer());
    let metadata: Metadata;
    try { metadata = await sharp(bytes).metadata(); } catch { throw new Error('Não foi possível processar o arquivo.'); }
    if (!metadata.width || !metadata.height) throw new Error('A imagem parece estar corrompida.');
    const safeScope = scope.toLowerCase().replace(/[^a-z0-9/_-]/g, '-');
    const id = crypto.randomUUID();
    const kind = primary ? 'primary' : 'gallery';
    const variants: Partial<Record<MediaVariant, string>> = {};
    for (const [variant, width] of Object.entries(sizes) as [MediaVariant, number][]) {
      const output = await sharp(bytes).rotate().resize({ width, withoutEnlargement: true }).webp({ quality: 88 }).toBuffer();
      const stored = await this.store(`media/${safeScope}/${kind}/${id}/${variant}.webp`, output);
      variants[variant] = stored.url;
    }
    const now = new Date().toISOString();
    return { id, src: variants.full!, filename: file.name.replace(/[^a-zA-Z0-9._-]/g, '-'), alt: alt.trim(), width: metadata.width, height: metadata.height, mimeType: 'image/webp', size: file.size, order: 0, isPrimary: primary, createdAt: now, updatedAt: now, variants };
  }

  async delete(image: MediaImage) {
    const values = Object.values(image.variants || { full: image.src }).filter(Boolean);
    if (this.provider === 'blob') { await Promise.all(values.map((url) => del(url))); return; }
    if (!this.s3 || !this.bucket || !this.publicBase) return;
    await Promise.all(values.map((url) => this.s3!.send(new DeleteObjectCommand({ Bucket: this.bucket, Key: url.replace(`${this.publicBase}/`, '') }))));
  }

  async replace(oldImage: MediaImage, file: File, scope: string, alt: string) {
    const next = await this.upload(file, scope, true, alt);
    await this.delete(oldImage);
    return next;
  }

  async list() { return []; }
}

function configuredObjectProvider(): ImageStorageProvider {
  if (process.env.BLOB_READ_WRITE_TOKEN) return new ObjectImageStorageProvider('blob');
  if (process.env.S3_BUCKET && process.env.S3_REGION && process.env.S3_PUBLIC_BASE_URL) return new ObjectImageStorageProvider('s3');
  return new LocalImageStorageProvider();
}

export const imageStorage: ImageStorageProvider = configuredObjectProvider();
