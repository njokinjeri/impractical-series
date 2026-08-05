import * as THREE from 'three/webgpu';
import * as BufferGeometryUtils from 'three/addons/utils/BufferGeometryUtils.js';
import type { ShapeType } from '../types';
class LissajousCurve extends THREE.Curve<THREE.Vector3> {
  nx: number;
  ny: number;
  nz: number;
  phase: number;

  constructor(
    nx = 3,
    ny = 4,
    nz = 7,
    phase = Math.PI / 4
  ) {
    super();
    this.nx = nx;
    this.ny = ny;
    this.nz = nz;
    this.phase = phase;
  }

  getPoint(t: number, target = new THREE.Vector3()): THREE.Vector3 {
    const angle = t * Math.PI * 2;
    const x = Math.sin(this.nx * angle + this.phase) * 1.1;
    const y = Math.sin(this.ny * angle) * 1.1;
    const z = Math.sin(this.nz * angle) * 0.8;

    return target.set(x, y, z);
  }
}

function createLissajousGeometry(): THREE.BufferGeometry {
  const curve = new LissajousCurve(3, 4, 7, Math.PI / 3);
  return new THREE.TubeGeometry(curve, 300, 0.12, 32, true);
}

function createMultiBlobGeometry(): THREE.BufferGeometry {
  const mainCore = new THREE.IcosahedronGeometry(0.9, 64);
  const geometries: THREE.BufferGeometry[] = [mainCore];

  const offsets = [
    new THREE.Vector3(1.3, 0.4, 0.2),
    new THREE.Vector3(-1.2, -0.5, -0.3),
    new THREE.Vector3(0.3, 1.2, -0.5),
    new THREE.Vector3(-0.4, -1.1, 0.6)
  ];

  offsets.forEach((offset, idx) => {
    const scale = 0.25 + (idx % 2) * 0.1;
    const sat = new THREE.IcosahedronGeometry(scale, 32);
    sat.translate(offset.x, offset.y, offset.z);
    geometries.push(sat);
  });

  return BufferGeometryUtils.mergeGeometries(geometries);
}

export function createGeometries(): Record<ShapeType, THREE.BufferGeometry> {
  return {
    knot: new THREE.TorusKnotGeometry(0.9, 0.22, 256, 48, 2, 3),
    blob: createMultiBlobGeometry(),
    torus: new THREE.TorusGeometry(1.0, 0.4, 96, 128),
    trefoil: new THREE.TorusKnotGeometry(0.95, 0.16, 256, 48, 2, 5),
    lissajous: createLissajousGeometry()
  };
}