import * as THREE from 'three';
import { SimplexNoise } from 'three/addons/math/SimplexNoise.js';

const simplex = new SimplexNoise();

export interface starSatellite {
  mesh: THREE.Mesh;
  radius: number;
  speed: number;
  phase: number;
  size: number;
  idx: number;
  baseColor: THREE.Color;
}

export class Star {
  readonly group = new THREE.Group();
  readonly geometry: THREE.BufferGeometry;
  readonly basePositions: Float32Array;
  readonly satellites: starSatellite[] = [];

  private readonly mainMesh: THREE.Mesh;

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
    this.geometry = this.buildStar();
    this.basePositions =
      this.geometry.attributes.position.array.slice() as Float32Array;

    this.mainMesh = new THREE.Mesh(this.geometry, material);
    this.group.add(this.mainMesh);

    this.satelliteConfig.forEach((cfg, idx) => {
      const geo = this.buildStar(cfg.size * 2.5);

      const baseColor = Star.pickColor();

      const mat = (material as THREE.MeshPhysicalMaterial).clone();
      mat.color.copy(baseColor);
      mat.transmission = Math.min(mat.transmission, 0.5);

      const mesh = new THREE.Mesh(geo, mat);
      this.group.add(mesh);

      this.satellites.push({
        mesh,
        baseColor,
        ...cfg,
        idx,
      });
    });
  }

  private buildStar(scale = 1): THREE.BufferGeometry {
    const BASE_RADIUS = 0.45 * scale;
    const ARM_LENGTH = 0.55 * scale;
    const SEGMENTS = 128;

    const geo = new THREE.SphereGeometry(BASE_RADIUS, SEGMENTS, SEGMENTS);
    const pos = geo.attributes.position;
    const v = new THREE.Vector3();

    const axes = [
      new THREE.Vector3(1, 0, 0),
      new THREE.Vector3(-1, 0, 0),
      new THREE.Vector3(0, 1, 0),
      new THREE.Vector3(0, -1, 0),
      new THREE.Vector3(0, 0, 1),
      new THREE.Vector3(0, 0, -1),
    ];

    for (let i = 0; i < pos.count; i++) {
      v.fromBufferAttribute(pos, i).normalize();

      let maxAlign = 0;
      for (const axis of axes) {
        const align = v.dot(axis);
        if (align > maxAlign) maxAlign = align;
      }

      const shapeFn = Math.pow(maxAlign, 6);
      const r = BASE_RADIUS + ARM_LENGTH * shapeFn;

      pos.setXYZ(i, v.x * r, v.y * r, v.z * r);
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

    for (const s of this.satellites) {
      const angle = elapsed * s.speed + s.phase;
      const r =
        s.radius + Math.sin(elapsed * 2.0 + s.idx) * 0.06 * (1.0 + freq * 1.5);

      s.mesh.position.set(
        Math.cos(angle) * r,
        Math.sin(elapsed * 0.9 + s.phase) * 0.15,
        Math.sin(angle) * r
      );
    }
  }

  setSatellitesVisible(visible: boolean) {
    for (const s of this.satellites) s.mesh.visible = visible;
  }

  setMaterial(material: THREE.Material) {
    for (const s of this.satellites) {
      s.mesh.material = material;
    }
  }

  private static pickColor(): THREE.Color {
    const r = Math.random();
    if (r < 0.1) return new THREE.Color('#1a0a2e');
    else if (r < 0.3) return new THREE.Color('#38bdf8');
    else if (r < 0.6) return new THREE.Color('#c084fc');
    else return new THREE.Color('#ff7a1a');
  }
}
