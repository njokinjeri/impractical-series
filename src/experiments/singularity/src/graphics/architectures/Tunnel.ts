import * as THREE from 'three';
import { BaseArchitecture } from './BaseArchitecture';

export const wormholeSpline = new THREE.CatmullRomCurve3(
  [
    new THREE.Vector3(-10, 0, 10),
    new THREE.Vector3(-5, 5, -10),
    new THREE.Vector3(0, 0, -25),
    new THREE.Vector3(5, -5, -10),
    new THREE.Vector3(10, 0, 10),
    new THREE.Vector3(0, 5, 25),
  ],
  true
);

export class Conduit extends BaseArchitecture {
  public buildGeometry(): THREE.BufferGeometry {
    return new THREE.TubeGeometry(wormholeSpline, 400, 0.85, 24, true);
  }

  public update(
    _delta: number,
    _accumulatedTime: number,
    _isPaused: boolean
  ): void {
    this.lines.position.set(0, 0, 0);
    this.particles.position.set(0, 0, 0);
    this.lines.rotation.set(0, 0, 0);
    this.particles.rotation.set(0, 0, 0);
  }
}
