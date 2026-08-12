import * as THREE from 'three';
import { BaseArchitecture } from './BaseArchitecture';

export class VortexArchitecture extends BaseArchitecture {
  protected buildGeometry(): THREE.BufferGeometry {
    const height = 60;
    const radialSegments = 48;
    const heightSegments = 80;
    const neckRadius = 1.8;
    const flareFactor = 0.08;

    const cylGeo = new THREE.CylinderGeometry(1, 1, height, radialSegments, heightSegments, true);
    const posAttr = cylGeo.attributes.position;
    const vertex = new THREE.Vector3();

    for (let i = 0; i < posAttr.count; i++) {
      vertex.fromBufferAttribute(posAttr, i);
      const y = vertex.y;
      const radius = neckRadius + flareFactor * Math.pow(y, 2);

      const angle = (y / height) * Math.PI * 2.5;
      const cosA = Math.cos(angle);
      const sinA = Math.sin(angle);

      const nx = Math.cos(Math.atan2(vertex.z, vertex.x)) * radius;
      const nz = Math.sin(Math.atan2(vertex.z, vertex.x)) * radius;

      const finalX = nx * cosA - nz * sinA;
      const finalZ = nx * sinA + nz * cosA;

      posAttr.setXYZ(i, finalX, y, finalZ);
    }

    posAttr.needsUpdate = true;
    cylGeo.computeVertexNormals();
    return cylGeo;
  }

  public override update(delta: number, _accumulatedTime: number, isPaused: boolean): void {
    if (!isPaused && this.group) {
      const rotSpeed = delta * 0.3;
      this.group.rotation.y += rotSpeed;
    }
  }

  public static getRadiusAt(y: number): number {
    const neckRadius = 1.8;
    const flareFactor = 0.08;
    return neckRadius + flareFactor * Math.pow(y, 2);
  }
}