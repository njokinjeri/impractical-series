import * as THREE from 'three';

export class ParticleVolume {
  readonly points: THREE.Points;
  private readonly basePositions: Float32Array;
  private readonly geometry: THREE.BufferGeometry;

  constructor(count = 800, radius = 6) {
    this.geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = radius * Math.cbrt(Math.random());
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    this.basePositions = positions.slice() as Float32Array;
    this.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.02,
      transparent: true,
      opacity: 0.5,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    this.points = new THREE.Points(this.geometry, material);
  }

  update(elapsed: number, freq: number) {
    const pos = this.geometry.attributes.position;
    const base = this.basePositions;
    const breathe = 1.0 + freq * 0.15;
    for (let i = 0; i < pos.count; i++) {
      pos.setXYZ(
        i,
        base[i * 3]     * breathe,
        base[i * 3 + 1] * breathe,
        base[i * 3 + 2] * breathe,
      );
    }
    pos.needsUpdate = true;
    this.points.rotation.y = elapsed * 0.02;
  }
}