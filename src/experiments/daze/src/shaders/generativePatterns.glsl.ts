import { FRAGMENT_PRELUDE } from './prelude.glsl';

export const GENERATIVE_PATTERNS_SHADER = FRAGMENT_PRELUDE + `
  float pattern0_ThickChevronWeave(vec2 p) {
    p *= 4.0;
    p.y += uTime * 0.3;
    vec2 k = floor(p);
    vec2 f = fract(p);
    float zig = abs(f.x - 0.5) + (f.y * 0.5);
    if (mod(k.x + k.y, 2.0) > 0.5) {
      zig = abs((1.0 - f.x) - 0.5) + (f.y * 0.5);
    }
    return step(0.35, mod(zig * 4.0, 1.0));
  }

  float pattern1_RetroRibbons(vec2 p) {
    p *= 4.0;
    p.x += sin(floor(p.y) + uTime * 0.5) * 0.5;
    vec2 grid = fract(p) - 0.5;
    vec2 id = floor(p);
    float bend = mix(abs(grid.x), abs(grid.y), step(hash(id), 0.5));
    return step(0.0, sin(bend * 30.0 + uTime * 2.0));
  }

  float pattern2_ConcentricArcs(vec2 p) {
    p *= 5.0;
    p.y += uTime * 0.3;
    float d1 = length(fract(p) - 0.5);
    float d2 = length(fract(p + 0.5) - 0.5);
    return step(0.0, sin(min(d1, d2) * 24.0 + uTime * 1.5));
  }

  float pattern3_HalftoneMatrix(vec2 p) {
    p *= 8.0;
    vec2 id = floor(p);
    vec2 f = fract(p) - 0.5;
    float wave = sin(id.x * 0.3 + id.y * 0.3 + uTime * 2.0) * 0.5 + 0.5;
    return step(length(f), wave * 0.45);
  }

  float pattern4_CitrusSlices(vec2 p) {
    p *= 3.5;
    vec2 id = floor(p);
    vec2 f = fract(p) - 0.5;
    float r = length(f);
    float angle = atan(f.y, f.x) + uTime * 0.2 + hash(id);
    float outerRim = step(r, 0.42) * step(0.08, r);
    float spokes = step(0.1, sin(angle * 10.0)) * outerRim;
    float rind = step(0.42, r) * step(r, 0.46);
    return clamp(spokes + rind, 0.0, 1.0);
  }

  float sdCapsule(vec2 p, vec2 a, vec2 b, float r) {
    vec2 pa = p - a, ba = b - a;
    float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
    return length(pa - ba * h) - r;
  }

  float pattern5_ScatterSprinkles(vec2 p) {
    p *= 4.5;
    vec2 g = floor(p);
    vec2 f = fract(p) - 0.5;
    float mask = 0.0;
    for (int y = -1; y <= 1; y++) {
      for (int x = -1; x <= 1; x++) {
        vec2 cell = g + vec2(float(x), float(y));
        vec2 randVal = hash2(cell);
        float speed = 0.4 + randVal.x * 0.6;
        vec2 drift = vec2(cos(randVal.y * 6.28), sin(randVal.y * 6.28)) * sin(uTime * speed + randVal.x * 10.0) * 0.25;
        vec2 pos = vec2(float(x), float(y)) + (randVal - 0.5) * 0.5 + drift;
        float pulse = 1.0 + 0.2 * sin(uTime * 2.0 + randVal.y * 6.28);
        if (randVal.x > 0.35) {
          vec2 dir = vec2(cos(randVal.y * 6.28), sin(randVal.y * 6.28)) * 0.22 * pulse;
          if (sdCapsule(f - pos, -dir, dir, 0.055 * pulse) < 0.0) mask = 1.0;
        } else {
          if (length(f - pos) - ((0.06 + randVal.y * 0.04) * pulse) < 0.0) mask = 1.0;
        }
      }
    }
    return mask;
  }

  float pattern6_VoronoiJigsaw(vec2 p) {
    p *= 5.0;
    vec2 g = floor(p);
    vec2 f = fract(p);
    float md = 8.0;
    vec2 mr;
    for (int y = -1; y <= 1; y++) {
      for (int x = -1; x <= 1; x++) {
        vec2 lattice = vec2(float(x), float(y));
        vec2 offset = 0.5 + 0.35 * sin(uTime * 0.8 + 6.2831 * hash2(g + lattice));
        vec2 r = lattice + offset - f;
        if (dot(r, r) < md) { md = dot(r, r); mr = r; }
      }
    }
    md = 8.0;
    for (int y = -1; y <= 1; y++) {
      for (int x = -1; x <= 1; x++) {
        vec2 lattice = vec2(float(x), float(y));
        vec2 offset = 0.5 + 0.35 * sin(uTime * 0.8 + 6.2831 * hash2(g + lattice));
        vec2 r = lattice + offset - f;
        if (dot(mr - r, mr - r) > 0.00001) md = min(md, dot(0.5 * (mr + r), normalize(r - mr)));
      }
    }
    return 1.0 - smoothstep(0.03, 0.06, md);
  }

  void main() {
    vec2 st = (gl_FragCoord.xy * 2.0 - uResolution) / min(uResolution.x, uResolution.y);
    vec2 tNorm = getTouchNorm();
    float lensRadius = 0.35;
    float distToLens = length(st - tNorm);
    float lensMask = smoothstep(lensRadius, lensRadius - 0.05, distToLens) * uTouchActive;
    vec2 p = mix(st, tNorm + normalize(st - tNorm) * sin(distToLens * 3.14159 / lensRadius) * 0.15, lensMask);

    float val = 0.0;
    if (uPatternIndex == 0) val = pattern0_ThickChevronWeave(p);
    else if (uPatternIndex == 1) val = pattern1_RetroRibbons(p);
    else if (uPatternIndex == 2) val = pattern2_ConcentricArcs(p);
    else if (uPatternIndex == 3) val = pattern3_HalftoneMatrix(p);
    else if (uPatternIndex == 4) val = pattern4_CitrusSlices(p);
    else if (uPatternIndex == 5) val = pattern5_ScatterSprinkles(p);
    else if (uPatternIndex == 6) val = pattern6_VoronoiJigsaw(p);

    float rim = smoothstep(lensRadius - 0.03, lensRadius, distToLens) * smoothstep(lensRadius, lensRadius - 0.08, distToLens) * uTouchActive * 0.6;
    val = clamp(val + rim, 0.0, 1.0);
    val += addGrain(vUv);
    
    gl_FragColor = vec4(applyDuotone(val), 1.0);
  }
`;