import * as THREE from 'three';
import { scene } from './scene';
import {
  NUM_POINTS,
  STAR_KEEP_RATIO,
  type ViewMode,
  pickFishCount,
} from './config';
import {
  VERTEX_PREAMBLE,
  DEFORM_BODY,
  STAR_VERTEX,
  STAR_FRAGMENT,
} from './shaders';

interface Slot {
  cx: number;
  cy: number;
  cz: number;
  radius: number;
  yRange: number;
  phaseOffset: number;
  speedMul: number;
}

interface FishUniforms {
  uSpatialTexture: { value: THREE.DataTexture };
  uTextureSize: { value: THREE.Vector2 };
  uTime: { value: number };
  uLengthRatio: { value: number };
  uObjSize: { value: THREE.Vector3 };
  uPhase: { value: number };
  uSpeedMul: { value: number };
  [key: string]: { value: unknown };
}

interface FishInstance {
  group: THREE.Group;
  uniforms: FishUniforms;
  lineMat: THREE.MeshBasicMaterial;
  ptsMat: THREE.ShaderMaterial;
}

export let fish: FishInstance[] = [];
let currentGeom: THREE.BufferGeometry | null = null;
const currentSize = new THREE.Vector3();
const starCache: { [key: string]: THREE.BufferGeometry } = {};

export function setGeometry(geom: THREE.BufferGeometry): void {
  currentGeom = geom;
  const box = new THREE.Box3().setFromBufferAttribute(
    geom.getAttribute('position') as THREE.BufferAttribute
  );
  box.getSize(currentSize);
}

function getStarGeometry(keepRatio: number): THREE.BufferGeometry {
  const key = keepRatio.toFixed(3);
  if (starCache[key]) return starCache[key];
  if (!currentGeom) throw new Error('geometry not set');

  const src = currentGeom.getAttribute('position').array;
  const totalVerts = src.length / 3;
  const positions: number[] = [];
  const seeds: number[] = [];

  for (let i = 0; i < totalVerts; i++) {
    const h = Math.abs(Math.sin(i * 12.9898 + 78.233)) % 1;
    if (h < keepRatio) {
      positions.push(src[i * 3], src[i * 3 + 1], src[i * 3 + 2]);
      seeds.push(h * 10.0);
    }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  g.setAttribute('aSeed', new THREE.Float32BufferAttribute(seeds, 1));
  starCache[key] = g;
  return g;
}

function circleSlots(count: number): Slot[] {
  const slots: Slot[] = [];
  for (let i = 0; i < count; i++) {
    const yOff = (i - (count - 1) / 2) * 14;
    slots.push({
      cx: 0,
      cy: yOff,
      cz: 0,
      radius: 40,
      yRange: 8,
      phaseOffset: Math.random() * Math.PI * 2,
      speedMul: 0.75 + (i % 5) * 0.06,
    });
  }
  return slots;
}

function freeSlots(count: number): Slot[] {
  let nx: number, ny: number;
  if (count <= 6) {
    nx = 3;
    ny = 2;
  } else if (count <= 9) {
    nx = 3;
    ny = 3;
  } else if (count <= 12) {
    nx = 4;
    ny = 3;
  } else if (count <= 16) {
    nx = 4;
    ny = 4;
  } else if (count <= 20) {
    nx = 5;
    ny = 4;
  } else if (count <= 24) {
    nx = 6;
    ny = 4;
  } else if (count <= 30) {
    nx = 6;
    ny = 5;
  } else if (count <= 36) {
    nx = 7;
    ny = 6;
  } else {
    nx = 8;
    ny = 6;
  }

  const worldW = 300;
  const worldH = 180;
  const worldD = 120;
  const cellW = worldW / nx;
  const cellH = worldH / ny;

  const slots: Slot[] = [];
  let i = 0;
  for (let iy = 0; iy < ny && i < count; iy++) {
    for (let ix = 0; ix < nx && i < count; ix++) {
      const cz = (((ix + iy) % 2) - 0.5) * worldD;
      const ringRadius = Math.min(cellW, cellH) * 0.42;
      slots.push({
        cx: -worldW / 2 + cellW * (ix + 0.5),
        cy: -worldH / 2 + cellH * (iy + 0.5),
        cz,
        radius: Math.max(45, ringRadius),
        yRange: 12,
        phaseOffset: Math.random() * Math.PI * 2,
        speedMul: 0.75 + (i % 4) * 0.08,
      });
      i++;
    }
  }
  return slots;
}

function createFish(
  slot: Slot,
  color: number,
  starGeom: THREE.BufferGeometry
): FishInstance {
  const group = new THREE.Group();

  const baseVector = new THREE.Vector3(slot.radius, 0, 0);
  const axis = new THREE.Vector3(0, 1, 0);
  const cSegments = 6;
  const cStep = (Math.PI * 2) / cSegments;
  const cPts: THREE.Vector3[] = [];
  for (let i = 0; i < cSegments; i++) {
    cPts.push(
      new THREE.Vector3()
        .copy(baseVector)
        .applyAxisAngle(axis, cStep * i)
        .setY(THREE.MathUtils.randFloat(-slot.yRange, slot.yRange))
    );
  }

  const curve = new THREE.CatmullRomCurve3(cPts);
  curve.closed = true;

  const cPoints = curve.getSpacedPoints(NUM_POINTS);
  const cObjects = curve.computeFrenetFrames(NUM_POINTS, true);

  const data: number[] = [];
  cPoints.forEach((v) => data.push(v.x, v.y, v.z));
  cObjects.binormals.forEach((v) => data.push(v.x, v.y, v.z));
  cObjects.normals.forEach((v) => data.push(v.x, v.y, v.z));

  const NUM_SAMPLES = NUM_POINTS + 1;
  const rgba = new Float32Array(NUM_SAMPLES * 3 * 4);
  let src = 0;
  for (let i = 0; i < NUM_SAMPLES * 3; i++) {
    rgba[i * 4 + 0] = data[src++];
    rgba[i * 4 + 1] = data[src++];
    rgba[i * 4 + 2] = data[src++];
    rgba[i * 4 + 3] = 1.0;
  }

  const tex = new THREE.DataTexture(
    rgba,
    NUM_SAMPLES,
    3,
    THREE.RGBAFormat,
    THREE.FloatType
  );
  tex.magFilter = THREE.NearestFilter;
  tex.minFilter = THREE.NearestFilter;
  tex.wrapS = THREE.ClampToEdgeWrapping;
  tex.wrapT = THREE.ClampToEdgeWrapping;
  tex.needsUpdate = true;

  const lengths = curve.getLengths(200);
  const totalLen = lengths[lengths.length - 1];

  const uniforms: FishUniforms = {
    uSpatialTexture: { value: tex },
    uTextureSize: { value: new THREE.Vector2(NUM_SAMPLES, 3) },
    uTime: { value: 0 },
    uLengthRatio: { value: currentSize.z / totalLen },
    uObjSize: { value: currentSize },
    uPhase: { value: slot.phaseOffset },
    uSpeedMul: { value: slot.speedMul },
  };

  const lineMat = new THREE.MeshBasicMaterial({
    color,
    wireframe: true,
    transparent: true,
    opacity: 0.55,
    depthWrite: false,
  });

  lineMat.onBeforeCompile = (shader) => {
    Object.assign(shader.uniforms, uniforms);
    shader.vertexShader = VERTEX_PREAMBLE + shader.vertexShader;
    shader.vertexShader = shader.vertexShader.replace(
      '#include <begin_vertex>',
      DEFORM_BODY
    );
  };

  if (currentGeom) group.add(new THREE.Mesh(currentGeom, lineMat));

  const ptsMat = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: {
      ...uniforms,
      uAccentColor: { value: new THREE.Color(color) },
      uStarAlpha: { value: 0.9 },
      uStarSize: { value: 1.2 },
    },
    vertexShader: STAR_VERTEX,
    fragmentShader: STAR_FRAGMENT,
  });

  group.add(new THREE.Points(starGeom, ptsMat));
  group.position.set(slot.cx, slot.cy, slot.cz);

  return { group, uniforms, lineMat, ptsMat };
}

export function rebuildSchool(
  viewMode: ViewMode,
  themePalette: number[]
): number {
  if (!currentGeom) return 0;

  for (const f of fish) {
    scene.remove(f.group);
    f.group.traverse((o) => {
      const mesh = o as THREE.Mesh;
      if (mesh.material) (mesh.material as THREE.Material).dispose();
    });
    f.uniforms.uSpatialTexture.value.dispose();
  }
  fish = [];

  const count = pickFishCount(viewMode, window.innerWidth);
  const starGeom = getStarGeometry(STAR_KEEP_RATIO);
  const slots = viewMode === 'circle' ? circleSlots(count) : freeSlots(count);

  for (let i = 0; i < slots.length; i++) {
    const color = themePalette[i % themePalette.length];
    const inst = createFish(slots[i], color, starGeom);
    fish.push(inst);
    scene.add(inst.group);
  }
  return slots.length;
}

export function updateFishTime(t: number): void {
  for (const f of fish) f.uniforms.uTime.value = t;
}

export function recolorFish(themePalette: number[]): void {
  for (let i = 0; i < fish.length; i++) {
    const f = fish[i];
    const color = themePalette[i % themePalette.length];
    f.lineMat.color.setHex(color);
    (f.ptsMat.uniforms.uAccentColor.value as THREE.Color).setHex(color);
  }
}

export function getFishCount(): number {
  return fish.length;
}
