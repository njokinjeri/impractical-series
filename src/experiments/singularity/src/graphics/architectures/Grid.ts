import * as THREE from 'three';
import { BaseArchitecture } from './BaseArchitecture';

export class Grid extends BaseArchitecture {
  public buildGeometry(): THREE.BufferGeometry {
    return new THREE.BoxGeometry(8, 8, 300, 16, 16, 150);
  }

  public update(_delta: number, accumulatedTime: number, _isPaused: boolean): void {
    const cellLength = 2.0;
    const offsetZ = (accumulatedTime * 0.04) % cellLength;

    this.lines.position.set(0, 0, offsetZ);
    this.particles.position.set(0, 0, offsetZ);
    this.lines.rotation.set(0, 0, 0);
    this.particles.rotation.set(0, 0, 0);
  }
}