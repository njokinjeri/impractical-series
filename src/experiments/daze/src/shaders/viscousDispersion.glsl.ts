import { FRAGMENT_PRELUDE } from './prelude.glsl';

export const VISCOUS_DISPERSION_SHADER = FRAGMENT_PRELUDE + `
  void main() {
    vec2 st = (gl_FragCoord.xy * 2.0 - uResolution) / min(uResolution.x, uResolution.y);
    vec2 tNorm = getTouchNorm();
    
    vec2 rel = st - tNorm;
    float d = length(rel);
    float swirlForce = exp(-d * 3.0) * uTouchActive * 2.5;
    float theta = swirlForce * 3.14159;
    mat2 rot = mat2(cos(theta), -sin(theta), sin(theta), cos(theta));
    vec2 warpedSt = tNorm + rot * rel;
    
    vec2 q = vec2(0.0);
    q.x = fbm(warpedSt + uTime * 0.1);
    q.y = fbm(warpedSt + vec2(5.2, 1.3) + uTime * 0.15);
    
    vec2 r = vec2(0.0);
    r.x = fbm(warpedSt + 4.0 * q + vec2(1.7, 9.2));
    r.y = fbm(warpedSt + 4.0 * q + vec2(8.3, 2.8));
    
    float f = fbm(warpedSt + 4.0 * r);
    f = pow(f, 2.0);
    f += addGrain(vUv);
    gl_FragColor = vec4(applyPalette(f, 0.0), 1.0);
  }
`;