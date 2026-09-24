export const FRAGMENT_PRELUDE = `
  precision highp float;
  varying vec2 vUv;
  uniform vec2 uResolution;
  uniform float uTime;
  uniform vec2 uTouch;
  uniform vec2 uTouchDelta;
  uniform float uTouchActive;
  uniform float uGrain;
  uniform int uPalette;
  uniform int uPatternIndex;

  float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  vec2 hash2(vec2 p) {
    return vec2(hash(p), hash(p + vec2(37.1, 17.4)));
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    mat2 rot = mat2(0.8, 0.6, -0.6, 0.8);
    for (int i = 0; i < 5; i++) {
      v += a * noise(p);
      p = rot * p * 2.0;
      a *= 0.5;
    }
    return v;
  }

  vec3 applyPalette(float t, float paletteShift) {
    t = clamp(t + paletteShift, 0.0, 1.0);
    if (uPalette == 1) { 
      vec3 black = vec3(0.02, 0.02, 0.03);
      vec3 crimson = vec3(0.9, 0.08, 0.12);
      vec3 white = vec3(0.98, 0.95, 0.95);
      if (t < 0.5) return mix(black, crimson, t * 2.0);
      return mix(crimson, white, (t - 0.5) * 2.0);
    } else if (uPalette == 2) { 
      vec3 dark = vec3(0.03, 0.05, 0.1);
      vec3 cyan = vec3(0.0, 0.85, 0.9);
      vec3 magenta = vec3(0.95, 0.1, 0.6);
      if (t < 0.5) return mix(dark, cyan, t * 2.0);
      return mix(cyan, magenta, (t - 0.5) * 2.0);
    }
    return vec3(t);
  }

  vec3 applyDuotone(float val) {
    val = clamp(val, 0.0, 1.0);
    if (uPalette == 1) {
      vec3 black = vec3(0.02, 0.02, 0.03);
      vec3 crimson = vec3(0.9, 0.08, 0.12);
      return mix(black, crimson, val);
    } else if (uPalette == 2) {
      vec3 dark = vec3(0.03, 0.05, 0.1);
      vec3 cyan = vec3(0.0, 0.85, 0.9);
      return mix(dark, cyan, val);
    }
    return vec3(val);
  }

  float addGrain(vec2 uv) {
    return (hash(uv + fract(uTime)) - 0.5) * uGrain;
  }

  vec2 getTouchNorm() {
    return (uTouch * 2.0 - uResolution) / min(uResolution.x, uResolution.y);
  }

  float touchDisplacement(vec2 st) {
    vec2 tNorm = getTouchNorm();
    float d = length(st - tNorm);
    return smoothstep(0.4, 0.0, d) * uTouchActive * sin(d * 20.0 - uTime * 5.0);
  }
`;
