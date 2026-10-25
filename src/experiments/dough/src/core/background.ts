import * as THREE from 'three';

export interface RadialBG {
  type: 'radial';
  stops: Array<{ at: number; color: string }>;
}

export interface LinearBG {
  type: 'linear';
  stops: Array<{ at: number; color: string }>;
  vertical?: boolean;
}

export type BGSpec = RadialBG | LinearBG;

export function makeBackground(spec: BGSpec): THREE.Texture {
  const size = 1024;
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const ctx = c.getContext('2d')!;

  let grad: CanvasGradient;
  if (spec.type === 'radial') {
    grad = ctx.createRadialGradient(
      size / 2,
      size / 2,
      size * 0.05,
      size / 2,
      size / 2,
      size * 0.95
    );
  } else {
    grad = spec.vertical
      ? ctx.createLinearGradient(0, 0, 0, size)
      : ctx.createLinearGradient(0, 0, size, size);
  }

  for (const stop of spec.stops) grad.addColorStop(stop.at, stop.color);

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}
