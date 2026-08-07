import * as THREE from 'three/webgpu';
import {
  uniform,
  normalView,
  positionLocal,
  dot,
  vec3,
  sin,
  float,
  mix,
  smoothstep,
  clamp,
} from 'three/tsl';

export class EngravingMaterialTSL {
  public material!: THREE.MeshBasicNodeMaterial;

  public uHatchFrequency = uniform(110.0);
  public uInkColor = uniform(new THREE.Color('#2b261f'));
  public uPaperColor = uniform(new THREE.Color('#f4eee1'));

  constructor() {
    this.buildMaterial();
  }

  private buildMaterial(): void {
    this.material = new THREE.MeshBasicNodeMaterial();
    this.material.side = THREE.DoubleSide;
    this.material.depthWrite = true;
    this.material.depthTest = true;

    const lightDir = vec3(0.6, 0.8, 1.0).normalize();
    const NdotL = dot(normalView, lightDir).clamp(0.22, 1.0);

    const hatchCoord = positionLocal.x
      .add(positionLocal.y)
      .mul(this.uHatchFrequency);
    const hatchWave = sin(hatchCoord).mul(0.5).add(0.5);

    const lineThreshold = float(1.0).sub(NdotL.mul(0.75));
    const lineMask = smoothstep(
      lineThreshold.sub(0.05),
      lineThreshold.add(0.05),
      hatchWave
    );

    const crossCoord = positionLocal.x
      .sub(positionLocal.z)
      .mul(this.uHatchFrequency);
    const crossWave = sin(crossCoord).mul(0.5).add(0.5);

    const shadowThreshold = float(0.75).sub(NdotL);
    const shadowMask = smoothstep(
      shadowThreshold.sub(0.05),
      shadowThreshold.add(0.05),
      crossWave
    );

    const inkCoverage = clamp(lineMask.add(shadowMask), float(0.0), float(1.0));

    this.material.colorNode = mix(
      this.uPaperColor,
      this.uInkColor,
      inkCoverage
    );
  }
}