import * as THREE from 'three';
import { SimplexNoise } from 'three/addons/math/SimplexNoise.js';

const simplex = new SimplexNoise();

export interface cubeSatellite {
  mesh: THREE.Mesh;
  basePos: Float32Array;
  radius: number;
  speed: number;
  phase: number;
  size: number;
  idx: number;
  baseColor: THREE.Color;
}

export class Cube {
  readonly group = new THREE.Group();
  readonly geometry: THREE.BoxGeometry;
  readonly basePositions: Float32Array;
  readonly satellites: cubeSatellite[] = [];

  private readonly satelliteConfig = [
    { radius: 1.9, speed: 0.55, phase: 0.0, size: 0.2 },
    { radius: 1.9, speed: 0.55, phase: 1.047, size: 0.2 },
    { radius: 1.9, speed: 0.55, phase: 2.094, size: 0.2 },
    { radius: 1.9, speed: 0.55, phase: 3.142, size: 0.2 },
    { radius: 1.9, speed: 0.55, phase: 4.189, size: 0.2 },
    { radius: 1.9, speed: 0.55, phase: 5.236, size: 0.2 },
    { radius: 2.3, speed: 0.65, phase: 0.0, size: 0.15 },
    { radius: 2.3, speed: 0.65, phase: 0.898, size: 0.15 },
    { radius: 2.3, speed: 0.65, phase: 1.795, size: 0.15 },
    { radius: 2.3, speed: 0.65, phase: 2.693, size: 0.15 },
    { radius: 2.3, speed: 0.65, phase: 3.59, size: 0.15 },
    { radius: 2.3, speed: 0.65, phase: 4.488, size: 0.15 },
    { radius: 2.3, speed: 0.65, phase: 5.386, size: 0.15 },
    { radius: 2.7, speed: 0.45, phase: 0.0, size: 0.12 },
    { radius: 2.7, speed: 0.45, phase: 0.898, size: 0.12 },
    { radius: 2.7, speed: 0.45, phase: 1.795, size: 0.12 },
    { radius: 2.7, speed: 0.45, phase: 2.693, size: 0.12 },
    { radius: 2.7, speed: 0.45, phase: 3.59, size: 0.12 },
    { radius: 2.7, speed: 0.45, phase: 4.488, size: 0.12 },
    { radius: 2.7, speed: 0.45, phase: 5.386, size: 0.12 },
  ];

  constructor(material: THREE.Material) {
    this.geometry = this.buildRoundedCube();
    this.basePositions =
      this.geometry.attributes.position.array.slice() as Float32Array;

    const main = new THREE.Mesh(this.geometry, material);
    this.group.add(main);

    this.satelliteConfig.forEach((cfg, idx) => {
      const geo = new THREE.SphereGeometry(cfg.size, 24, 24);

      const baseColor = Cube.pickColor();

      const mat = (material as THREE.MeshPhysicalMaterial).clone();
      mat.color.copy(baseColor);
      mat.transmission = Math.min(mat.transmission, 0.5);

      const mesh = new THREE.Mesh(geo, mat);
      this.group.add(mesh);

      this.satellites.push({
        mesh,
        basePos: geo.attributes.position.array.slice() as Float32Array,
        baseColor,
        ...cfg,
        idx,
      });
    });
  }

  private static pickColor(): THREE.Color {
    const r = Math.random();
    if (r < 0.1) return new THREE.Color('#1a0a2e');
    else if (r < 0.3) return new THREE.Color('#38bdf8');
    else if (r < 0.6) return new THREE.Color('#c084fc');
    else return new THREE.Color('#ff7a1a');
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
        THREE.MathUtils.lerp(pos.getZ(i), v.z, 0.35)
      );
    }
    geo.computeVertexNormals();
    return geo;
  }

  update(elapsed: number, freq: number, bass: number) {
    const pos = this.geometry.attributes.position;
    const base = this.basePositions;
    for (let i = 0; i < pos.count; i++) {
      const bx = base[i * 3];
      const by = base[i * 3 + 1];
      const bz = base[i * 3 + 2];
      const noise =
        simplex.noise3d(
          bx * 1.5 + elapsed * 0.5,
          by * 1.5 + elapsed * 0.6,
          bz * 1.5
        ) *
        0.15 *
        (1.0 + freq * 2.0);
      pos.setXYZ(i, bx + bx * noise, by + by * noise, bz + bz * noise);
    }
    pos.needsUpdate = true;
    this.geometry.computeVertexNormals();

    const speedMod = 1.0 + freq * 0.8;

    for (const b of this.satellites) {
      const angle = elapsed * b.speed * speedMod + b.phase;

      const pulseAmp = 0.08 * (1.0 + bass * 2.5);
      const r = b.radius + Math.sin(elapsed * 2.0 + b.idx) * pulseAmp;

      const bobAmp = 0.35 * (1.0 + freq * 2.0);
      const y = Math.sin(elapsed * 1.2 + b.phase) * bobAmp;

      b.mesh.position.set(Math.cos(angle) * r, y, Math.sin(angle) * r);

      const mp = b.mesh.geometry.attributes.position;
      for (let i = 0; i < mp.count; i++) {
        const mx = b.basePos[i * 3];
        const my = b.basePos[i * 3 + 1];
        const mz = b.basePos[i * 3 + 2];
        const miniNoise =
          simplex.noise3d(
            mx * 2.0 + elapsed * 0.8 + b.idx,
            my * 2.0 + elapsed * 0.9,
            mz * 2.0
          ) *
          0.12 *
          (1.0 + freq * 1.8);
        mp.setXYZ(
          i,
          mx + mx * miniNoise,
          my + my * miniNoise,
          mz + mz * miniNoise
        );
      }
      mp.needsUpdate = true;
      b.mesh.geometry.computeVertexNormals();
    }
  }

  setSatellitesVisible(visible: boolean) {
    for (const b of this.satellites) b.mesh.visible = visible;
  }

  setMaterial(_material: THREE.Material) {}
}
