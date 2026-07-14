'use client';

import Image from 'next/image';
import { Box, Expand, RotateCcw, ScanLine, WifiOff } from 'lucide-react';
import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { isSafePublicAssetUrl } from '@/lib/creature-assets';

type ThreeModule = typeof import('three');

export function Creature3DViewer({
  name,
  modelUrl,
  fallbackImage,
  labels,
}: {
  name: string;
  modelUrl?: string;
  fallbackImage: string;
  labels: {
    title: string;
    load: string;
    unavailable: string;
    slow: string;
    reset: string;
    fullscreen: string;
    clay: string;
    painted: string;
    wireframe: string;
    loading: string;
  };
}) {
  const hostRef = useRef<HTMLDivElement>(null), canvasRef = useRef<HTMLCanvasElement>(null);
  const cleanupRef = useRef<() => void>(() => undefined), resetRef = useRef<() => void>(() => undefined);
  const objectRef = useRef<import('three').Object3D | null>(null), threeRef = useRef<ThreeModule | null>(null);
  const [active, setActive] = useState(false), [progress, setProgress] = useState(0), [error, setError] = useState('');
  const [mode, setMode] = useState<'painted' | 'clay'>('painted'), [wireframe, setWireframe] = useState(false);
  const safeModel = isSafePublicAssetUrl(modelUrl) ? modelUrl : undefined;
  const slowConnection = typeof navigator !== 'undefined' && Boolean((navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection?.saveData || (navigator as Navigator & { connection?: { effectiveType?: string } }).connection?.effectiveType?.includes('2g'));

  useEffect(() => {
    if (!active || !safeModel || !canvasRef.current || !hostRef.current) return;
    const model = safeModel;
    let cancelled = false;
    async function mount() {
      const [THREE, controlsModule, loaderModule] = await Promise.all([
        import('three'),
        import('three/examples/jsm/controls/OrbitControls.js'),
        import('three/examples/jsm/loaders/GLTFLoader.js'),
      ]);
      if (cancelled || !canvasRef.current || !hostRef.current) return;
      threeRef.current = THREE;
      const canvas = canvasRef.current, host = hostRef.current;
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      const scene = new THREE.Scene(), camera = new THREE.PerspectiveCamera(38, 1, 0.01, 500);
      camera.position.set(0, 1.1, 3.4);
      scene.add(new THREE.HemisphereLight(0xdde8ff, 0x15100c, 2.2));
      const key = new THREE.DirectionalLight(0xffecd2, 3.1); key.position.set(3, 5, 4); scene.add(key);
      const rim = new THREE.DirectionalLight(0x76b9d2, 2); rim.position.set(-4, 2, -3); scene.add(rim);
      const controls = new controlsModule.OrbitControls(camera, canvas);
      controls.enableDamping = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      controls.dampingFactor = 0.06; controls.minDistance = 1; controls.maxDistance = 9;
      const resize = () => { const { width, height } = host.getBoundingClientRect(); renderer.setSize(width, height, false); camera.aspect = width / Math.max(height, 1); camera.updateProjectionMatrix(); };
      const observer = new ResizeObserver(resize); observer.observe(host); resize();
      let frame = 0;
      const render = () => { frame = requestAnimationFrame(render); controls.update(); renderer.render(scene, camera); };
      new loaderModule.GLTFLoader().load(
        model,
        (gltf) => {
          if (cancelled) return;
          const object = gltf.scene; objectRef.current = object;
          const box = new THREE.Box3().setFromObject(object), size = box.getSize(new THREE.Vector3()), center = box.getCenter(new THREE.Vector3());
          object.position.sub(center); const scale = 2.25 / Math.max(size.x, size.y, size.z, 0.001); object.scale.setScalar(scale);
          object.traverse((child) => { if ((child as import('three').Mesh).isMesh) { const mesh = child as import('three').Mesh; mesh.castShadow = true; mesh.receiveShadow = true; mesh.userData.originalMaterial = mesh.material; } });
          scene.add(object); setProgress(100);
        },
        (event) => setProgress((current) => event.total ? Math.round((event.loaded / event.total) * 100) : Math.min(95, current + 5)),
        () => setError(labels.unavailable),
      );
      resetRef.current = () => { camera.position.set(0, 1.1, 3.4); controls.target.set(0, 0, 0); controls.update(); if (objectRef.current) objectRef.current.rotation.set(0, 0, 0); };
      render();
      cleanupRef.current = () => { cancelAnimationFrame(frame); observer.disconnect(); controls.dispose(); renderer.dispose(); objectRef.current = null; threeRef.current = null; };
    }
    void mount();
    return () => { cancelled = true; cleanupRef.current(); };
  }, [active, labels.unavailable, safeModel]);

  useEffect(() => {
    const THREE = threeRef.current, object = objectRef.current;
    if (!THREE || !object) return;
    object.traverse((child) => {
      if (!(child as import('three').Mesh).isMesh) return;
      const mesh = child as import('three').Mesh;
      const original = mesh.userData.originalMaterial as import('three').Material | import('three').Material[];
      const next = mode === 'clay' ? new THREE.MeshStandardMaterial({ color: 0x9b9283, roughness: 0.82, metalness: 0.03 }) : original;
      mesh.material = next;
      const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
      for (const material of materials) if ('wireframe' in material) (material as import('three').MeshStandardMaterial).wireframe = wireframe;
    });
  }, [mode, wireframe, progress]);

  function handleKeyboard(event: KeyboardEvent<HTMLCanvasElement>) {
    const object = objectRef.current;
    if (!object) return;
    if (event.key === 'ArrowLeft') object.rotation.y -= 0.12;
    else if (event.key === 'ArrowRight') object.rotation.y += 0.12;
    else if (event.key === 'ArrowUp') object.rotation.x -= 0.08;
    else if (event.key === 'ArrowDown') object.rotation.x += 0.08;
    else if (event.key === 'Home') resetRef.current();
    else return;
    event.preventDefault();
  }

  return <section className="creature-viewer" aria-labelledby="creature-viewer-title">
    <div className="creature-viewer-head"><div><span className="eyebrow">GLB · Web viewer</span><h2 id="creature-viewer-title">{labels.title}</h2></div>{active && safeModel ? <span aria-live="polite">{progress < 100 ? `${labels.loading} ${progress}%` : name}</span> : null}</div>
    <div className="creature-viewer-stage" ref={hostRef}>
      <Image src={fallbackImage} alt="" fill sizes="(max-width: 900px) 100vw, 900px" className={active && progress === 100 ? 'viewer-fallback hidden' : 'viewer-fallback'} />
      {safeModel && active ? <canvas ref={canvasRef} tabIndex={0} onKeyDown={handleKeyboard} aria-label={`${labels.title}: ${name}`} /> : null}
      {!active ? <div className="viewer-gate"><Box aria-hidden/><p>{safeModel ? (slowConnection ? labels.slow : labels.load) : labels.unavailable}</p><button className="button" disabled={!safeModel} onClick={() => setActive(true)}>{labels.load}</button></div> : null}
      {error ? <div className="viewer-error" role="alert"><WifiOff/>{error}</div> : null}
    </div>
    {active && safeModel ? <div className="viewer-controls" aria-label="3D viewer controls">
      <button onClick={() => resetRef.current()}><RotateCcw/>{labels.reset}</button>
      <button aria-pressed={mode === 'clay'} onClick={() => setMode(mode === 'clay' ? 'painted' : 'clay')}><Box/>{mode === 'clay' ? labels.painted : labels.clay}</button>
      <button aria-pressed={wireframe} onClick={() => setWireframe((value) => !value)}><ScanLine/>{labels.wireframe}</button>
      <button onClick={() => hostRef.current?.requestFullscreen()}><Expand/>{labels.fullscreen}</button>
    </div> : null}
  </section>;
}
