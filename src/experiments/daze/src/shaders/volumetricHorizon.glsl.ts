import { FRAGMENT_PRELUDE } from './prelude.glsl';

export const VOLUMETRIC_HORIZON_SHADER = FRAGMENT_PRELUDE + `
  void main() {
    vec2 st = (gl_FragCoord.xy * 2.0 - uResolution) / min(uResolution.x, uResolution.y);
    float ripple = touchDisplacement(st);
    
    vec3 ro = vec3(0.0, 1.5, uTime * 0.8);
    vec3 rd = normalize(vec3(st.x, st.y - 0.3, 1.0));
    
    float t = 0.0;
    float accum = 0.0;
    
    for (int i = 0; i < 24; i++) {
      vec3 pos = ro + rd * t;
      float h = fbm(pos.xz * 0.5) * 1.2 + ripple * 0.4;
      float dist = pos.y - h;
      if (dist < 0.02) {
        accum = 1.0 - (float(i) / 24.0);
        break;
      }
      t += max(dist * 0.5, 0.05);
    }
    
    accum = clamp(accum, 0.0, 1.0);
    accum += addGrain(vUv);
    gl_FragColor = vec4(applyPalette(accum, 0.0), 1.0);
  }
`;