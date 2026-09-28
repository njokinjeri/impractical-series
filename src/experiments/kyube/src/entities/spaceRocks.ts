import * as THREE from 'three';
import type { AnimatedRock, PlacedPosition, RockPalette } from '../types';

export const rockPalettes: RockPalette[] = [
  { rock: 0xba9b8d, moss: 0x5a7d32 },
  { rock: 0x6e6878, moss: 0x2b7a6f },
  { rock: 0x82695b, moss: 0x945428 },
  { rock: 0x6b637a, moss: 0x8a3b75 },
  { rock: 0x565c52, moss: 0x478537 }
];

export function createFloatingDioramaRock(
  baseScale: number,
  paletteIdx: number,
  stoneBumpMap: THREE.Texture
): THREE.Group {
  const group = new THREE.Group();
  const palette = rockPalettes[paletteIdx % rockPalettes.length];

  const dioramaRockMat = new THREE.MeshStandardMaterial({
    color: palette.rock,
    roughness: 0.82,
    metalness: 0.05,
    bumpMap: stoneBumpMap,
    bumpScale: 0.02
  });
  const mossMat = new THREE.MeshStandardMaterial({
    color: palette.moss,
    roughness: 0.9
  });

  const rockGeom = new THREE.DodecahedronGeometry(0.55 * baseScale, 3);
  const pos = rockGeom.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    let x = pos.getX(i);
    let y = pos.getY(i);
    let z = pos.getZ(i);
    if (y < 0) {
      const factor = 1.0 + (y / baseScale) * 0.45;
      x *= Math.max(factor, 0.15);
      z *= Math.max(factor, 0.15);
      y *= 1.3;
    } else {
      y *= 0.65;
    }
    const noise =
      (Math.sin(x * 8.0) * Math.cos(y * 8.0) + Math.sin(z * 8.0)) *
      0.08 *
      baseScale;
    pos.setXYZ(i, x + noise, y + noise, z + noise);
  }
  rockGeom.computeVertexNormals();
  rockGeom.center();

  const rockMesh = new THREE.Mesh(rockGeom, dioramaRockMat);
  rockMesh.castShadow = true;
  rockMesh.receiveShadow = true;
  group.add(rockMesh);

  if (baseScale > 0.25) {
    const moss = new THREE.Mesh(
      new THREE.SphereGeometry(0.2 * baseScale, 10, 8),
      mossMat
    );
    moss.position.set(0, 0.14 * baseScale, 0);
    moss.scale.set(1.4, 0.3, 1.2);
    group.add(moss);
  }
  return group;
}

export interface SpaceRocksResult {
  group: THREE.Group;
  animatedRocks: AnimatedRock[];
}

export function createSpaceRocks(
  stoneBumpMap: THREE.Texture,
  totalRocks = 45
): SpaceRocksResult {
  const spaceRocksGroup = new THREE.Group();
  const animatedRocks: AnimatedRock[] = [];
  const placedPositions: PlacedPosition[] = [];

  for (let i = 0; i < totalRocks; i++) {
    const scale = 0.25 + Math.random() * 0.85;
    const rockRadius = 0.55 * scale;
    const candidatePos = new THREE.Vector3();
    let isValid = false;
    let attempts = 0;

    while (!isValid && attempts < 120) {
      attempts++;
      const orbitR = 3.2 + Math.random() * 5.3;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      candidatePos.set(
        orbitR * Math.sin(phi) * Math.cos(theta),
        orbitR * Math.sin(phi) * Math.sin(theta),
        orbitR * Math.cos(phi)
      );

      isValid = true;
      for (const p of placedPositions) {
        const dist = candidatePos.distanceTo(p.pos);
        const minAllowedDist = rockRadius + p.radius + 0.4;
        if (dist < minAllowedDist) {
          isValid = false;
          break;
        }
      }
    }

    if (isValid) {
      placedPositions.push({ pos: candidatePos, radius: rockRadius });
      const rock = createFloatingDioramaRock(scale, i, stoneBumpMap);
      rock.position.copy(candidatePos);
      rock.rotation.set(
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2
      );

      animatedRocks.push({
        mesh: rock,
        rotSpeedX: (Math.random() - 0.5) * 0.005,
        rotSpeedY: (Math.random() - 0.5) * 0.005,
        floatPhase: Math.random() * Math.PI * 2,
        floatSpeed: 0.6 + Math.random() * 0.8,
        initialY: rock.position.y
      });
      spaceRocksGroup.add(rock);
    }
  }

  return { group: spaceRocksGroup, animatedRocks };
}