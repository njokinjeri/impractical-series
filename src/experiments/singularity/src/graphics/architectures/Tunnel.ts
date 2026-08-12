import * as THREE from 'three';
import { BaseArchitecture } from './BaseArchitecture';

export class TunnelArchitecture extends BaseArchitecture {
  public splinePath: THREE.CatmullRomCurve3;
  public frenetFrames: { tangents: THREE.Vector3[]; normals: THREE.Vector3[]; binormals: THREE.Vector3[] };
  public readonly sampleCount = 1000;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(materials: any) {
    super(materials);

    this.splinePath = new THREE.CatmullRomCurve3(
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

    this.frenetFrames = this.splinePath.computeFrenetFrames(this.sampleCount, true);
  }

  protected buildGeometry(): THREE.BufferGeometry {
    return new THREE.TubeGeometry(this.splinePath, 400, 0.85, 24, true);
  }
}