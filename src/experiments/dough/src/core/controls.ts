import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { beginDrag, endDrag } from './state';

export interface ControlsOptions {
  minDistance?: number;
  maxDistance?: number;
}

export function createControls(
  camera: THREE.PerspectiveCamera,
  domElement: HTMLElement,
  opts: ControlsOptions = {}
): OrbitControls {
  const controls = new OrbitControls(camera, domElement);
  controls.enableDamping = true;
  controls.enablePan = false;
  controls.minDistance = opts.minDistance ?? 3;
  controls.maxDistance = opts.maxDistance ?? 10;
  controls.minPolarAngle = 0.05;
  controls.maxPolarAngle = Math.PI - 0.05;
  controls.target.set(0, 0, 0);

  controls.addEventListener('start', beginDrag);
  controls.addEventListener('end', endDrag);

  return controls;
}
