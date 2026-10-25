import * as THREE from 'three';
import { HDRLoader } from "three/addons/loaders/HDRLoader.js";

const R = 1.0;
const TUBE = 0.48;
const DOUGH_FLAT = 0.86;

const HDRI_URL =
  'https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/venice_sunset_1k.hdr';

// Renderer is needed for PMREM generation. Same setter pattern as football/earth.
let cachedRenderer: THREE.WebGLRenderer | null = null;
let hdriTexture: THREE.Texture | null = null;
let hdriLoading = false;
let onHDRIReady: ((env: THREE.Texture) => void) | null = null;

export function setDontTouchRenderer(r: THREE.WebGLRenderer): void {
  cachedRenderer = r;
}

// Load HDRI once. Returns the loaded env map, or null if not ready yet.
function getHDREnv(): THREE.Texture | null {
  if (hdriTexture) return hdriTexture;
  if (!cachedRenderer || hdriLoading) return null;

  hdriLoading = true;
  const pmrem = new THREE.PMREMGenerator(cachedRenderer);
const rgbe = new HDRLoader();

  rgbe.load(
    HDRI_URL,
    (tex) => {
      tex.mapping = THREE.EquirectangularReflectionMapping;
      hdriTexture = pmrem.fromEquirectangular(tex).texture;
      tex.dispose();

      if (onHDRIReady) onHDRIReady(hdriTexture);
    },
    undefined,
    () => {
      hdriLoading = false;
    }
  );

  return hdriTexture;
}

// ---- Chrome geometry with liquid deformation ----
function makeChromeGeo(): THREE.BufferGeometry {
  const geo = new THREE.TorusGeometry(R, TUBE, 256, 512);
  geo.rotateX(Math.PI / 2);
  geo.scale(1, DOUGH_FLAT, 1);

  const pos = geo.attributes.position;
  const v = new THREE.Vector3();

  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i);

    // Big soft lobes
    const bigN = Math.sin(v.x * 1.5) * 0.55 + Math.cos(v.z * 1.7) * 0.45;

    // Medium ripples
    const rippleN =
      Math.sin(v.x * 3.4 + v.y * 2.1) * 0.28 +
      Math.cos(v.z * 3.6 - v.y * 1.9) * 0.22;

    // Fine surface texture
    const fineN = Math.sin(v.x * 8.0 + 0.7) * Math.cos(v.z * 7.5) * 0.08;

    const totalN = bigN + rippleN + fineN;

    const len = v.length();
    v.normalize().multiplyScalar(len * (1 + totalN * 0.075));

    pos.setXYZ(i, v.x, v.y, v.z);
  }

  pos.needsUpdate = true;
  geo.computeVertexNormals();
  return geo;
}

export function buildDontTouch(): THREE.Group {
  if (!cachedRenderer) throw new Error("Don't Touch: renderer not set");
  getHDREnv(); // kick off load if not already started

  const root = new THREE.Group();

  const geo = makeChromeGeo();

const mat = new THREE.MeshPhysicalMaterial({
  color: 0xffffff,
  metalness: 1.0,
  roughness: 0.08,
  envMapIntensity: 1.6,
  iridescence: 0.5,
  iridescenceIOR: 1.8,
  iridescenceThicknessRange: [200, 900],
});

  const mesh = new THREE.Mesh(geo, mat);
  root.add(mesh);

  return root;
}

export function animateDontTouch(
  _root: THREE.Group,
  _elapsed: number,
  _dt: number
): void {
  // Donut Touch relies on the shared spinner for rotation — no local animation
}

export function getDontTouchEnv(): THREE.Texture | null {
  return hdriTexture;
}

export function setOnHDRIReady(
  fn: ((env: THREE.Texture) => void) | null
): void {
  onHDRIReady = fn;
}
