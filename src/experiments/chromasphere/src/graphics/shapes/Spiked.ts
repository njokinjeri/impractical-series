import * as THREE from 'three';

export class Spiked {
  readonly geometry: THREE.IcosahedronGeometry;

  constructor() {
    const BASE_RADIUS = 0.95;
    const SPIKE_COUNT = 42;
    const SPIKE_HEIGHT = 0.55;
    const SPIKE_SHARPNESS = 3.2;

    const spikeDirs = Spiked.fibonacciSphere(SPIKE_COUNT);

    this.geometry = new THREE.IcosahedronGeometry(BASE_RADIUS, 96);
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
  }

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
