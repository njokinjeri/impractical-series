import * as THREE from 'three';

const vertexShader = /* glsl */ `
  varying vec3 vNormalView;
  varying vec3 vPositionLocal;

  void main() {
    vNormalView = normalize(normalMatrix * normal);
    vPositionLocal = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  uniform float uHatchFrequency;
  uniform vec3 uInkColor;
  uniform vec3 uPaperColor;

  varying vec3 vNormalView;
  varying vec3 vPositionLocal;

  void main() {
    vec3 lightDir = normalize(vec3(0.6, 0.8, 1.0));
    float NdotL = clamp(dot(vNormalView, lightDir), 0.22, 1.0);

    // Primary hatching
    float hatchCoord = (vPositionLocal.x + vPositionLocal.y) * uHatchFrequency;
    float hatchWave = sin(hatchCoord) * 0.5 + 0.5;
    float lineThreshold = 1.0 - (NdotL * 0.75);
    float lineMask = smoothstep(lineThreshold - 0.05, lineThreshold + 0.05, hatchWave);

    // Cross hatching
    float crossCoord = (vPositionLocal.x - vPositionLocal.z) * uHatchFrequency;
    float crossWave = sin(crossCoord) * 0.5 + 0.5;
    float shadowThreshold = 0.75 - NdotL;
    float shadowMask = smoothstep(shadowThreshold - 0.05, shadowThreshold + 0.05, crossWave);

    float inkCoverage = clamp(lineMask + shadowMask, 0.0, 1.0);
    vec3 finalColor = mix(uPaperColor, uInkColor, inkCoverage);

    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

export class EngravingMaterial {
  public material: THREE.ShaderMaterial;

  public uniforms = {
    uHatchFrequency: { value: 110.0 },
    uInkColor: { value: new THREE.Color('#2b261f') },
    uPaperColor: { value: new THREE.Color('#f4eee1') },
  };

  constructor() {
    this.material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: this.uniforms,
      side: THREE.DoubleSide,
    });
  }
}
