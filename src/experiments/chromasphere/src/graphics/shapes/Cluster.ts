import * as THREE from 'three';
import { SimplexNoise } from 'three/addons/math/SimplexNoise.js';

const simplex = new SimplexNoise();

export interface SatelliteBlob {
  mesh: THREE.Mesh;
  basePos: Float32Array;
  radius: number;
  speed: number;
  phase: number;
  size: number;
  idx: number;
}

export class Cluster {
  readonly group = new THREE.Group();
  readonly geometry: THREE.BoxGeometry;
  readonly basePositions: Float32Array;
  readonly satellites: SatelliteBlob[] = [];

  private readonly satelliteConfig = [
    { radius: 1.35, speed: 0.8, phase: 0.0, size: 0.20 },
    { radius: 1.48, speed: 1.1, phase: 1.2, size: 0.16 },
    { radius: 1.28, speed: 0.9, phase: 2.4, size: 0.22 },
    { radius: 1.52, speed: 0.7, phase: 3.6, size: 0.15 },
    { radius: 1.38, speed: 1.2, phase: 4.8, size: 0.18 },
  ];

  constructor(material: THREE.Material) {
    this.geometry = this.buildRoundedCube();
    this.basePositions = this.geometry.attributes.position.array.slice() as Float32Array;

    const main = new THREE.Mesh(this.geometry, material);
    this.group.add(main);

    this.satelliteConfig.forEach((cfg, idx) => {
      const geo = new THREE.SphereGeometry(cfg.size, 24, 24);
      const mesh = new THREE.Mesh(geo, material);
      this.group.add(mesh);
      this.satellites.push({
        mesh,
        basePos: geo.attributes.position.array.slice() as Float32Array,
        ...cfg,
        idx,
      });
    });
  }

  private buildRoundedCube(): THREE.BoxGeometry {
    const geo = new THREE.BoxGeometry(1.3, 1.3, 1.3, 32, 32, 32);
    const pos = geo.attributes.position;
    const v = new THREE.Vector3();
    for (let i = 0; i < pos.count; i++) {
      v.fromBufferAttribute(pos, i).normalize().multiplyScalar(0.95);
      pos.setXYZ(
        i,
        THREE.MathUtils.lerp(pos.getX(i), v.x, 0.35),
        THREE.MathUtils.lerp(pos.getY(i), v.y, 0.35),
        THREE.MathUtils.lerp(pos.getZ(i), v.z, 0.35),
      );
    }
    geo.computeVertexNormals();
    return geo;
  }

  update(elapsed: number, freq: number) {
    const pos = this.geometry.attributes.position;
    const base = this.basePositions;
    for (let i = 0; i < pos.count; i++) {
      const bx = base[i * 3];
      const by = base[i * 3 + 1];
      const bz = base[i * 3 + 2];
      const noise = simplex.noise3d(
        bx * 1.5 + elapsed * 0.5,
        by * 1.5 + elapsed * 0.6,
        bz * 1.5,
      ) * 0.15 * (1.0 + freq * 2.0);
      pos.setXYZ(i, bx + bx * noise, by + by * noise, bz + bz * noise);
    }
    pos.needsUpdate = true;
    this.geometry.computeVertexNormals();

    for (const b of this.satellites) {
      const angle = elapsed * b.speed + b.phase;
      const r = b.radius + Math.sin(elapsed * 2.0 + b.idx) * 0.08 * (1.0 + freq * 1.5);
      b.mesh.position.set(
        Math.cos(angle) * r,
        Math.sin(elapsed * 1.2 + b.phase) * 0.35,
        Math.sin(angle) * r,
      );

      const mp = b.mesh.geometry.attributes.position;
      for (let i = 0; i < mp.count; i++) {
        const mx = b.basePos[i * 3];
        const my = b.basePos[i * 3 + 1];
        const mz = b.basePos[i * 3 + 2];
        const miniNoise = simplex.noise3d(
          mx * 2.0 + elapsed * 0.8 + b.idx,
          my * 2.0 + elapsed * 0.9,
          mz * 2.0,
        ) * 0.12 * (1.0 + freq * 1.8);
        mp.setXYZ(i, mx + mx * miniNoise, my + my * miniNoise, mz + mz * miniNoise);
      }
      mp.needsUpdate = true;
      b.mesh.geometry.computeVertexNormals();
    }
  }

  setSatellitesVisible(visible: boolean) {
    for (const b of this.satellites) b.mesh.visible = visible;
  }
}