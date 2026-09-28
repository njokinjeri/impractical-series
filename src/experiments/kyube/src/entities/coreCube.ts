import * as THREE from 'three';
import type { StonePlacement } from '../types';

export const stonePlacements: StonePlacement[] = [
  { x: -0.44, y:  0.44, z:  0.88, w: 0.92, h: 0.92, d: 0.32 },
  { x:  0.46, y:  0.48, z:  0.88, w: 0.86, h: 0.82, d: 0.32 },
  { x: -0.46, y: -0.45, z:  0.88, w: 0.88, h: 0.86, d: 0.32 },
  { x:  0.50, y: -0.40, z:  0.88, w: 0.82, h: 0.92, d: 0.32 },
  { x:  0.44, y:  0.44, z: -0.88, w: 0.92, h: 0.92, d: 0.32 },
  { x: -0.46, y:  0.48, z: -0.88, w: 0.86, h: 0.82, d: 0.32 },
  { x:  0.46, y: -0.45, z: -0.88, w: 0.88, h: 0.86, d: 0.32 },
  { x: -0.50, y: -0.40, z: -0.88, w: 0.82, h: 0.92, d: 0.32 },
  { x:  0.88, y:  0.44, z: -0.44, w: 0.32, h: 0.92, d: 0.92 },
  { x:  0.88, y:  0.48, z:  0.46, w: 0.32, h: 0.82, d: 0.86 },
  { x:  0.88, y: -0.45, z: -0.46, w: 0.32, h: 0.86, d: 0.88 },
  { x:  0.88, y: -0.40, z:  0.50, w: 0.32, h: 0.92, d: 0.82 },
  { x: -0.88, y:  0.44, z:  0.44, w: 0.32, h: 0.92, d: 0.92 },
  { x: -0.88, y:  0.48, z: -0.46, w: 0.32, h: 0.82, d: 0.86 },
  { x: -0.88, y: -0.45, z:  0.46, w: 0.32, h: 0.86, d: 0.88 },
  { x: -0.88, y: -0.40, z: -0.50, w: 0.32, h: 0.92, d: 0.82 },
  { x: -0.44, y:  0.88, z:  0.44, w: 0.92, h: 0.32, d: 0.92 },
  { x:  0.46, y:  0.88, z: -0.48, w: 0.86, h: 0.32, d: 0.82 },
  { x: -0.46, y:  0.88, z: -0.45, w: 0.88, h: 0.32, d: 0.86 },
  { x:  0.50, y:  0.88, z:  0.40, w: 0.82, h: 0.32, d: 0.92 },
  { x: -0.44, y: -0.88, z: -0.42, w: 0.92, h: 0.32, d: 0.92 },
  { x:  0.46, y: -0.88, z:  0.48, w: 0.86, h: 0.32, d: 0.82 },
  { x: -0.46, y: -0.88, z:  0.45, w: 0.88, h: 0.32, d: 0.86 },
  { x:  0.50, y: -0.88, z: -0.40, w: 0.82, h: 0.32, d: 0.92 }
];

function createBasaltBoulder(
  width: number,
  height: number,
  depth: number,
  material: THREE.Material
): THREE.Mesh {
  const geom = new THREE.BoxGeometry(width, height, depth, 32, 32, 32);
  const pos = geom.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    const z = pos.getZ(i);
    const nx = x / (width / 2);
    const ny = y / (height / 2);
    const nz = z / (depth / 2);
    const centerPillow =
      Math.cos(nx * Math.PI * 0.47) *
      Math.cos(ny * Math.PI * 0.47) *
      Math.cos(nz * Math.PI * 0.47);
    const bulgeFactor = 1.0 + centerPillow * 0.20;
    const dent1 =
      Math.sin(nx * 3.5 + ny * 2.5) * Math.cos(nz * 3.5) * 0.04;
    const dent2 = Math.cos(nx * 7.0 + nz * 7.0) * 0.02;
    pos.setXYZ(
      i,
      x * bulgeFactor + dent1 * (width / 2),
      y * bulgeFactor + dent2 * (height / 2),
      z * bulgeFactor + dent1 * (depth / 2)
    );
  }
  geom.computeVertexNormals();
  const mesh = new THREE.Mesh(geom, material);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

export function createMasonryCore(stoneMaterial: THREE.Material): THREE.Group {
  const group = new THREE.Group();
  stonePlacements.forEach((p) => {
    const stone = createBasaltBoulder(p.w, p.h, p.d, stoneMaterial);
    stone.position.set(p.x, p.y, p.z);
    group.add(stone);
  });
  return group;
}