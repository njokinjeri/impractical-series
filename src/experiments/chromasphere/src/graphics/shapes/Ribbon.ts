import * as THREE from 'three';

export class Ribbon {
  readonly geometry: THREE.TubeGeometry;

  constructor() {
    const points: THREE.Vector3[] = [];
    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2;
      points.push(new THREE.Vector3(
        Math.cos(angle) * 1.4,
        Math.sin(angle * 2) * 0.6,
        Math.sin(angle) * 1.4,
      ));
    }
    const curve = new THREE.CatmullRomCurve3(points, true);
    this.geometry = new THREE.TubeGeometry(curve, 120, 0.28, 24, true);
  }
}