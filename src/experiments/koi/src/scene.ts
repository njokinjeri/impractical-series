import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { THEMES } from './config';

export const scene = new THREE.Scene();
scene.background = new THREE.Color(THEMES.night.bg);
scene.fog = new THREE.Fog(THEMES.night.bg, 200, 520);

export const camera = new THREE.PerspectiveCamera(
  58,
  window.innerWidth / window.innerHeight,
  0.1,
  900
);
camera.position.set(0, -15, 165);

export const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setClearColor(THEMES.night.bg);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
document.body.appendChild(renderer.domElement);

export const controls = new OrbitControls(camera, renderer.domElement);
controls.maxDistance = 300;
controls.minDistance = 80;
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.autoRotate = true;
controls.autoRotateSpeed = 0.08;

let last = performance.now();
let scaledTime = 0;

export function tick(): number {
  const now = performance.now();
  const dt = Math.min((now - last) / 1000, 0.05);
  last = now;
  scaledTime += dt;
  return scaledTime;
}

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
