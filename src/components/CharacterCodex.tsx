'use client';

import Image from 'next/image';
import {
  Crown,
  Eye,
  Flame,
  Heart,
  Maximize2,
  Rotate3D,
  Shield,
  Sparkles,
  Sword,
  X,
} from 'lucide-react';
import { useEffect, useRef, useState, type CSSProperties } from 'react';

export type CodexGalleryAsset = {
  id: string;
  src: string;
  alt: string;
  caption: string;
  category: string;
};

export function CharacterHeroMedia({
  image,
  alt,
  video,
}: {
  image: string;
  alt: string;
  video?: string;
}) {
  const [videoFailed, setVideoFailed] = useState(false);
  return (
    <div className="codex-hero-media" aria-label={alt} role="img">
      <Image src={image} alt="" fill priority sizes="100vw" />
      {video && !videoFailed ? (
        <video
          aria-hidden="true"
          autoPlay
          loop
          muted
          playsInline
          poster={image}
          preload="metadata"
          onError={() => setVideoFailed(true)}
        >
          <source src={video} type="video/mp4" />
        </video>
      ) : null}
    </div>
  );
}

const attributeIcons = [Shield, Heart, Sword, Eye, Flame, Crown] as const;

export function RunicAttributes({
  traits,
  label,
}: {
  traits: Array<{ label: string; value: number }>;
  label: string;
}) {
  return (
    <div className="runic-attributes" aria-label={label} role="list">
      {traits.map((trait, index) => {
        const Icon = attributeIcons[index % attributeIcons.length];
        return (
          <div
            className="runic-attribute"
            key={trait.label}
            role="listitem"
            title={`${trait.label}: ${trait.value}/100`}
            style={{ '--attribute': trait.value } as CSSProperties}
          >
            <div className="runic-medallion" aria-hidden="true">
              <Icon />
              <i />
            </div>
            <span>{trait.label}</span>
            <strong>{trait.value}</strong>
            <div
              className="runic-gauge"
              role="progressbar"
              aria-label={trait.label}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={trait.value}
            >
              <i />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function CodexGallery({
  assets,
  allLabel,
  closeLabel,
  filterLabel,
  openLabel,
}: {
  assets: CodexGalleryAsset[];
  allLabel: string;
  closeLabel: string;
  filterLabel: string;
  openLabel: string;
}) {
  const [filter, setFilter] = useState(allLabel);
  const [active, setActive] = useState<CodexGalleryAsset>();
  const categories = [
    allLabel,
    ...new Set(assets.map((asset) => asset.category)),
  ];
  const visible =
    filter === allLabel
      ? assets
      : assets.filter((asset) => asset.category === filter);

  useEffect(() => {
    if (!active) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActive(undefined);
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [active]);

  return (
    <>
      <div
        className="codex-gallery-filters"
        aria-label={filterLabel}
        role="group"
      >
        {categories.map((category) => (
          <button
            className={filter === category ? 'active' : ''}
            key={category}
            onClick={() => setFilter(category)}
            type="button"
          >
            {category}
          </button>
        ))}
      </div>
      <div className="codex-gallery-grid">
        {visible.map((asset, index) => (
          <button
            className="codex-gallery-item"
            key={asset.id}
            onClick={() => setActive(asset)}
            style={{ '--gallery-index': index } as CSSProperties}
            type="button"
            aria-label={`${openLabel}: ${asset.caption}`}
          >
            <Image
              src={asset.src}
              alt={asset.alt}
              fill
              sizes="(max-width: 720px) 100vw, 50vw"
            />
            <span>
              <small>{asset.category}</small>
              <strong>{asset.caption}</strong>
              <Maximize2 aria-hidden="true" />
            </span>
          </button>
        ))}
      </div>
      {active ? (
        <div
          className="codex-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={active.caption}
        >
          <button
            type="button"
            onClick={() => setActive(undefined)}
            aria-label={closeLabel}
            autoFocus
          >
            <X />
          </button>
          <figure>
            <Image src={active.src} alt={active.alt} fill sizes="100vw" />
            <figcaption>
              <Sparkles aria-hidden="true" />
              <span>{active.category}</span>
              <strong>{active.caption}</strong>
            </figcaption>
          </figure>
        </div>
      ) : null}
    </>
  );
}

export function SculptureViewer({
  src,
  label,
  loadingLabel,
  errorLabel,
  rotateLabel,
  zoomLabel,
  fullscreenLabel,
}: {
  src: string;
  label: string;
  loadingLabel: string;
  errorLabel: string;
  rotateLabel: string;
  zoomLabel: string;
  fullscreenLabel: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>(
    'loading',
  );

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { rootMargin: '500px 0px' },
    );
    observer.observe(frame);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext('webgl', { antialias: true, alpha: true });
    if (!gl) {
      setStatus('error');
      return;
    }
    let disposed = false;
    let dragging = false;
    let lastX = 0;
    let lastY = 0;
    let rotationX = -0.18;
    let rotationY = 0.55;
    let zoom = 0.92;
    let count = 0;

    const compile = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) throw new Error('Shader unavailable');
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
        throw new Error('Shader compilation failed');
      return shader;
    };
    const program = gl.createProgram();
    if (!program) return;
    try {
      gl.attachShader(
        program,
        compile(
          gl.VERTEX_SHADER,
          `
        attribute vec3 a_position;
        uniform float u_rx;
        uniform float u_ry;
        uniform float u_zoom;
        uniform float u_aspect;
        varying float v_depth;
        void main() {
          float cy = cos(u_ry), sy = sin(u_ry), cx = cos(u_rx), sx = sin(u_rx);
          vec3 p = vec3(a_position.x * cy + a_position.z * sy, a_position.y, -a_position.x * sy + a_position.z * cy);
          p = vec3(p.x, p.y * cx - p.z * sx, p.y * sx + p.z * cx);
          gl_Position = vec4(p.x * u_zoom / u_aspect, p.y * u_zoom, p.z * .18, 1.0);
          gl_PointSize = 1.35;
          v_depth = p.z;
        }
      `,
        ),
      );
      gl.attachShader(
        program,
        compile(
          gl.FRAGMENT_SHADER,
          `
        precision mediump float;
        varying float v_depth;
        void main() {
          float glow = clamp(.72 + v_depth * .28, .35, 1.0);
          gl_FragColor = vec4(vec3(.72, .62, .42) * glow, .92);
        }
      `,
        ),
      );
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS))
        throw new Error('Program link failed');
    } catch {
      setStatus('error');
      return;
    }

    const render = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.max(1, Math.floor(canvas.clientWidth * ratio));
      const height = Math.max(1, Math.floor(canvas.clientHeight * ratio));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
      gl.viewport(0, 0, width, height);
      gl.clearColor(0.025, 0.028, 0.024, 1);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      gl.enable(gl.DEPTH_TEST);
      gl.useProgram(program);
      gl.uniform1f(gl.getUniformLocation(program, 'u_rx'), rotationX);
      gl.uniform1f(gl.getUniformLocation(program, 'u_ry'), rotationY);
      gl.uniform1f(gl.getUniformLocation(program, 'u_zoom'), zoom);
      gl.uniform1f(gl.getUniformLocation(program, 'u_aspect'), width / height);
      gl.drawArrays(gl.POINTS, 0, count);
    };

    const pointerDown = (event: PointerEvent) => {
      dragging = true;
      lastX = event.clientX;
      lastY = event.clientY;
      canvas.setPointerCapture(event.pointerId);
    };
    const pointerMove = (event: PointerEvent) => {
      if (!dragging) return;
      rotationY += (event.clientX - lastX) * 0.008;
      rotationX += (event.clientY - lastY) * 0.008;
      lastX = event.clientX;
      lastY = event.clientY;
      render();
    };
    const pointerUp = () => {
      dragging = false;
    };
    const wheel = (event: WheelEvent) => {
      event.preventDefault();
      zoom = Math.max(0.42, Math.min(1.8, zoom - event.deltaY * 0.001));
      render();
    };
    const keyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') rotationY -= 0.12;
      else if (event.key === 'ArrowRight') rotationY += 0.12;
      else if (event.key === 'ArrowUp') rotationX -= 0.12;
      else if (event.key === 'ArrowDown') rotationX += 0.12;
      else if (event.key === '+' || event.key === '=')
        zoom = Math.min(1.8, zoom + 0.1);
      else if (event.key === '-') zoom = Math.max(0.42, zoom - 0.1);
      else return;
      event.preventDefault();
      render();
    };
    canvas.addEventListener('pointerdown', pointerDown);
    canvas.addEventListener('pointermove', pointerMove);
    canvas.addEventListener('pointerup', pointerUp);
    canvas.addEventListener('pointercancel', pointerUp);
    canvas.addEventListener('wheel', wheel, { passive: false });
    canvas.addEventListener('keydown', keyDown);
    window.addEventListener('resize', render);

    fetch(src)
      .then((response) => {
        if (!response.ok) throw new Error('Model request failed');
        return response.arrayBuffer();
      })
      .then((data) => {
        if (disposed) return;
        const view = new DataView(data);
        count = view.getUint32(0, true);
        const positions = new Int16Array(data, 4, count * 3);
        const buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
        const location = gl.getAttribLocation(program, 'a_position');
        gl.enableVertexAttribArray(location);
        gl.vertexAttribPointer(location, 3, gl.SHORT, true, 0, 0);
        setStatus('ready');
        render();
      })
      .catch(() => !disposed && setStatus('error'));

    return () => {
      disposed = true;
      canvas.removeEventListener('pointerdown', pointerDown);
      canvas.removeEventListener('pointermove', pointerMove);
      canvas.removeEventListener('pointerup', pointerUp);
      canvas.removeEventListener('pointercancel', pointerUp);
      canvas.removeEventListener('wheel', wheel);
      canvas.removeEventListener('keydown', keyDown);
      window.removeEventListener('resize', render);
    };
  }, [active, src]);

  return (
    <div className="sculpture-viewer" ref={frameRef}>
      <canvas
        ref={canvasRef}
        tabIndex={0}
        aria-label={`${label}. ${rotateLabel}. ${zoomLabel}.`}
      />
      {status !== 'ready' ? (
        <div className="sculpture-status">
          {status === 'loading' ? loadingLabel : errorLabel}
        </div>
      ) : null}
      <div className="sculpture-controls">
        <span>
          <Rotate3D /> {rotateLabel}
        </span>
        <button
          type="button"
          onClick={() => frameRef.current?.requestFullscreen()}
          aria-label={fullscreenLabel}
        >
          <Maximize2 /> {fullscreenLabel}
        </button>
      </div>
    </div>
  );
}
