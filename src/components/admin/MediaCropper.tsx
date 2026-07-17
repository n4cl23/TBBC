'use client';
/* eslint-disable @next/next/no-img-element -- crop preview uses a transient object URL. */

import { useEffect, useMemo, useState } from 'react';

export function MediaCropper({ file, onCrop }: { file?: File; onCrop: (file?: File) => void }) {
  const [zoom, setZoom] = useState(1);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const preview = useMemo(() => file ? URL.createObjectURL(file) : '', [file]);
  useEffect(() => () => { if (preview) URL.revokeObjectURL(preview); }, [preview]);

  async function crop() {
    if (!file) return;
    const bitmap = await createImageBitmap(file);
    const size = Math.min(bitmap.width, bitmap.height) / zoom;
    const left = Math.max(0, Math.min(bitmap.width - size, (bitmap.width - size) / 2 + (x / 100) * (bitmap.width - size) / 2));
    const top = Math.max(0, Math.min(bitmap.height - size, (bitmap.height - size) / 2 + (y / 100) * (bitmap.height - size) / 2));
    const canvas = document.createElement('canvas');
    canvas.width = 1600; canvas.height = 1600;
    canvas.getContext('2d')?.drawImage(bitmap, left, top, size, size, 0, 0, canvas.width, canvas.height);
    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/webp', 0.9));
    if (blob) onCrop(new File([blob], `${file.name.replace(/\.[^.]+$/, '')}-crop.webp`, { type: 'image/webp' }));
  }

  if (!file || !preview) return null;
  return <div className="admin-panel" style={{ marginTop: 12 }}>
    <strong>Corte quadrado</strong>
    <div className="media-preview" style={{ overflow: 'hidden', marginTop: 8 }}>{/* External object URLs are intentionally rendered directly. */}<img alt="Prévia para corte" src={preview} style={{ width: `${zoom * 100}%`, height: `${zoom * 100}%`, objectFit: 'cover', transform: `translate(${x}%, ${y}%)`, transformOrigin: 'center' }} /></div>
    <label>Zoom <input type="range" min="1" max="3" step="0.1" value={zoom} onChange={(event) => setZoom(Number(event.target.value))} /></label>
    <label>Horizontal <input type="range" min="-100" max="100" value={x} onChange={(event) => setX(Number(event.target.value))} /></label>
    <label>Vertical <input type="range" min="-100" max="100" value={y} onChange={(event) => setY(Number(event.target.value))} /></label>
    <button className="admin-btn secondary" type="button" onClick={() => void crop()}>Aplicar corte</button>
  </div>;
}
