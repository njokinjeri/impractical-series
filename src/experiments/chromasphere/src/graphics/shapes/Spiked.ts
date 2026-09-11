import * as THREE from 'three';

export interface SpikedSatellite {
  mesh: THREE.Mesh;
  radius: number;
  speed: number;
  phase: number;
  size: number;
  idx: number;
  baseColor: THREE.Color;
}

export class Spiked {
  readonly geometry: THREE.IcosahedronGeometry;
  readonly group = new THREE.Group();
  readonly satellites: SpikedSatellite[] = [];

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

  constructor(material: THREE.Material, mobile = false) {
    const BASE_RADIUS = 0.95;
    const SPIKE_COUNT = 42;
    const SPIKE_HEIGHT = 0.55;
    const SPIKE_SHARPNESS = 3.2;
    const SUBDIVISION = mobile ? 32 : 96;

    const spikeDirs = Spiked.fibonacciSphere(SPIKE_COUNT);

    this.geometry = new THREE.IcosahedronGeometry(BASE_RADIUS, SUBDIVISION);
    const pos = this.geometry.attributes.position;
    const dir = new THREE.Vector3();

    for (let i = 0; i < pos.count; i++) {
      dir.fromBufferAttribute(pos, i).normalize();

      let maxDot = -1;
      for (let s = 0; s < spikeDirs.length; s++) {
        const d = dir.dot(spikeDirs[s]);
        if (d > maxDot) maxDot = d;
      }

      const angle = Math.acos(Math.min(1, maxDot));
      const influenceAngle = Math.PI / 10;
      const t = Math.max(0, 1 - angle / influenceAngle);

      const sharp = Math.pow(t, SPIKE_SHARPNESS);

      const r = BASE_RADIUS + sharp * SPIKE_HEIGHT;
      pos.setXYZ(i, dir.x * r, dir.y * r, dir.z * r);
    }

    this.geometry.computeVertexNormals();

    for (let i = 0; i < this.satelliteConfig.length; i++) {
      const cfg = this.satelliteConfig[i];

      const baseColor = Spiked.pickColor();

      const mat = (material as THREE.MeshPhysicalMaterial).clone();
      mat.color.copy(baseColor);
      mat.transmission = Math.min(mat.transmission, 0.5);

      const mesh = new THREE.Mesh(this.geometry, mat);
      mesh.scale.setScalar(cfg.size / 0.95);

      this.group.add(mesh);
      this.satellites.push({
        mesh,
        baseColor,
        radius: cfg.radius,
        speed: cfg.speed,
        phase: cfg.phase,
        size: cfg.size,
        idx: i,
      });
    }
  }

  private static pickColor(): THREE.Color {
    const r = Math.random();
    if (r < 0.1) return new THREE.Color('#1a0a2e');
    else if (r < 0.3) return new THREE.Color('#38bdf8');
    else if (r < 0.6) return new THREE.Color('#c084fc');
    else return new THREE.Color('#ff7a1a');
  }

  update(elapsed: number, freq: number, bass: number) {
    const speedMod = 1.0 + freq * 2.0;

    for (const s of this.satellites) {
      const angle = elapsed * s.speed * speedMod + s.phase;

      const pulseAmp = 0.06 * (1.0 + bass * 6.0);
      const r = s.radius + Math.sin(elapsed * 2.0 + s.idx) * pulseAmp;

      const bobAmp = 0.5 * (1.0 + freq * 2.0);
      const y = Math.sin(elapsed * 0.9 + s.phase) * bobAmp;

      s.mesh.position.set(
        Math.cos(angle) * r,
        y,
        Math.sin(angle) * r
      );

      s.mesh.rotation.x = elapsed * 0.4 + s.phase;
      s.mesh.rotation.y = elapsed * 0.55 + s.phase * 0.5;
    }
  }

  setSatellitesVisible(visible: boolean) {
    for (const s of this.satellites) s.mesh.visible = visible;
  }

  setMaterial(_material: THREE.Material) {}

  private static fibonacciSphere(n: number): THREE.Vector3[] {
    const pts: THREE.Vector3[] = [];
    const phi = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < n; i++) {
      const y = 1 - (i / (n - 1)) * 2;
      const radiusAtY = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = phi * i;
      pts.push(
        new THREE.Vector3(
          Math.cos(theta) * radiusAtY,
          y,
          Math.sin(theta) * radiusAtY
        )
      );
    }
    return pts;
  }
}