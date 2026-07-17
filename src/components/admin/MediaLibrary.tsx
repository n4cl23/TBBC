'use client';
/* eslint-disable @next/next/no-img-element -- configured Blob/S3 hosts cannot be statically allow-listed. */

import { useEffect, useState } from 'react';
import { mediaUploadSchema } from '@/lib/editorial-forms';
import { TypedEditorialForm } from './TypedEditorialForm';
import { MediaCropper } from './MediaCropper';

type Asset = { id: string; filename: string; publicUrl: string; alt: string; category: string; updatedAt: string };
type UploadValues = { scope: string; alt: string; category: string; caption: string };

export function MediaLibrary() {
  const [file, setFile] = useState<File>();
  const [cropped, setCropped] = useState<File>();
  const [assets, setAssets] = useState<Asset[]>([]);
  const [message, setMessage] = useState('');
  const load = async () => { const response = await fetch('/api/admin/media'); if (response.ok) setAssets(await response.json()); };
  useEffect(() => { let active = true; void fetch('/api/admin/media').then(async (response) => { if (response.ok && active) setAssets(await response.json()); }); return () => { active = false; }; }, []);
  const initial: UploadValues = { scope: 'editorial', alt: '', category: 'editorial', caption: '' };
  return <div className="admin-grid">
    <div>
      <label className="dropzone"><span>Escolha uma imagem</span><input type="file" accept="image/png,image/jpeg,image/webp" onChange={(event) => { setFile(event.target.files?.[0]); setCropped(undefined); }} /></label>
      <MediaCropper file={file} onCrop={setCropped} />
      <TypedEditorialForm schema={mediaUploadSchema} initial={initial} submitLabel="Enviar mídia" fields={[{ name: 'scope', label: 'Pasta editorial', required: true }, { name: 'alt', label: 'Texto alternativo', required: true }, { name: 'category', label: 'Categoria', required: true }, { name: 'caption', label: 'Legenda', type: 'textarea' }]} onSubmit={async (values) => { const selected = cropped || file; if (!selected) throw new Error('Escolha uma imagem antes de enviar.'); const body = new FormData(); Object.entries(values).forEach(([key, value]) => body.set(key, value)); body.set('file', selected); const response = await fetch('/api/admin/media', { method: 'POST', body }); const json = await response.json(); if (!response.ok) throw new Error(json.message); setMessage(json.message); setFile(undefined); setCropped(undefined); await load(); }} />
      {message && <p className="muted">{message}</p>}
    </div>
    <section className="admin-panel"><h2 className="serif">Biblioteca de mídia</h2><div className="media-grid">{assets.map((asset) => <article className="media-item" key={asset.id}><div className="media-preview">{/* Blob and S3 hostnames are deployment-defined. */}<img src={asset.publicUrl} alt={asset.alt} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></div><strong>{asset.filename}</strong><small>{asset.category} · {new Date(asset.updatedAt).toLocaleDateString('pt-BR')}</small></article>)}</div></section>
  </div>;
}
