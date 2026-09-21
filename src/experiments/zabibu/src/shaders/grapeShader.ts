import * as THREE from 'three';
import {
  PALETTES,
  BOTANICAL_COLORS,
  DEFAULT_PHYSICS,
} from '../config/constants';

export const InkHatchShader = {
  uniforms: {
    uLightPos: { value: new THREE.Vector3(6, 12, 8) },
    uHatchScale: { value: DEFAULT_PHYSICS.hatchScale },
    uColorMode: { value: PALETTES[2].mode },
    uBaseColor: { value: new THREE.Color(PALETTES[2].base) },
    uHighlightColor: { value: new THREE.Color(PALETTES[2].highlight) },
    uInkOutlineColor: { value: new THREE.Color(BOTANICAL_COLORS.inkOutline) },
    uResolution: {
      value: new THREE.Vector2(window.innerWidth, window.innerHeight),
    },
  },
  vertexShader: `
    varying vec3 vNormal;
    varying vec3 vWorldPosition;
    varying vec3 vViewPosition;
    varying vec2 vUv;

    void main() {
      vUv = uv;
      vNormal = normalize(normalMatrix * normal);
      vec4 worldPos = modelMatrix * vec4(position, 1.0);
      vWorldPosition = worldPos.xyz;
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      vViewPosition = -mvPosition.xyz;
      gl_Position = projectionMatrix * mvPosition;
    }
  `,
  fragmentShader: `
    uniform vec3 uLightPos;
    uniform float uHatchScale;
    uniform float uColorMode;
    uniform vec3 uBaseColor;
    uniform vec3 uHighlightColor;
    uniform vec3 uInkOutlineColor;
    uniform vec2 uResolution;

    varying vec3 vNormal;
    varying vec3 vWorldPosition;
    varying vec3 vViewPosition;
    varying vec2 vUv;

    float hatchPattern(vec2 coord, float lightIntensity) {
      float l1 = abs(sin((coord.x + coord.y) * 90.0 * uHatchScale));
      float l2 = abs(sin((coord.x - coord.y) * 90.0 * uHatchScale));
      float l3 = abs(sin(coord.y * 120.0 * uHatchScale));

      if (lightIntensity < 0.20) {
        return smoothstep(0.1, 0.9, min(l1, min(l2, l3)));
      } else if (lightIntensity < 0.45) {
        return smoothstep(0.15, 0.85, min(l1, l2));
      } else if (lightIntensity < 0.70) {
        return smoothstep(0.2, 0.8, l1);
      } else if (lightIntensity < 0.88) {
        return smoothstep(0.3, 0.7, l1 * 0.4 + 0.6);
      }
      return 1.0;
    }

    void main() {
      vec3 lightDir = normalize(uLightPos - vWorldPosition);
      vec3 viewDir = normalize(vViewPosition);
      
      float NdotL = max(0.0, dot(vNormal, lightDir));

      vec3 halfVector = normalize(lightDir + viewDir);
      float NdotH = max(0.0, dot(vNormal, halfVector));
      float specular = pow(NdotH, 32.0);

      vec2 screenCoord = gl_FragCoord.xy / uResolution.y;
      float hatch = hatchPattern(screenCoord, NdotL);

      vec3 shadingColor;
      if (uColorMode > 0.5) {
      float ambientLight = max(0.25, NdotL * hatch);
      vec3 shadedBerry = mix(uInkOutlineColor, uBaseColor, ambientLight);
      shadingColor = mix(shadedBerry, uHighlightColor, step(0.65, specular));
      } else {
          float graphite = mix(0.1, 0.95, hatch * NdotL);
          shadingColor = mix(vec3(graphite), uBaseColor, 0.4) + specular * 0.3;
      }

      float rim = 1.0 - max(0.0, dot(vNormal, viewDir));
      if (rim > 0.78) {
        shadingColor = mix(shadingColor, uInkOutlineColor, 0.85);
      }

      gl_FragColor = vec4(shadingColor, 1.0);
    }
  `,
};

export function createBaseShaderMaterial(): THREE.ShaderMaterial {
  return new THREE.ShaderMaterial({
    uniforms: THREE.UniformsUtils.clone(InkHatchShader.uniforms),
    vertexShader: InkHatchShader.vertexShader,
    fragmentShader: InkHatchShader.fragmentShader,
  });
}
