import * as THREE from 'three';
import { BaseArchitecture } from './BaseArchitecture';

export class GridArchitecture extends BaseArchitecture {
  protected buildGeometry(): THREE.BufferGeometry {
    return new THREE.BoxGeometry(8, 8, 300, 16, 16, 150);
  }

  public override update(_delta: number, accumulatedTime: number, _isPaused: boolean): void {
    const cellLength = 2.0;
    const offsetZ = (accumulatedTime * 0.04) % cellLength;
    this.group.position.set(0, 0, offsetZ);
  }
}