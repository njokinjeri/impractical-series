export const VERTEX_PREAMBLE = `
uniform sampler2D uSpatialTexture;
uniform vec2 uTextureSize;
uniform float uTime;
uniform float uLengthRatio;
uniform vec3 uObjSize;
uniform float uPhase;
uniform float uSpeedMul;

struct splineData { vec3 point; vec3 binormal; vec3 normal; };

splineData getSplineData(float t){
  float step = 1.0 / uTextureSize.y;
  float halfStep = step * 0.5;
  splineData sd;
  sd.point    = texture2D(uSpatialTexture, vec2(t, step * 0.0 + halfStep)).rgb;
  sd.binormal = texture2D(uSpatialTexture, vec2(t, step * 1.0 + halfStep)).rgb;
  sd.normal   = texture2D(uSpatialTexture, vec2(t, step * 2.0 + halfStep)).rgb;
  return sd;
}
`;

export const DEFORM_BODY = `
#include <begin_vertex>
vec3 pos = position;
float wStep = 1.0 / uTextureSize.x;
float hWStep = wStep * 0.5;
float d = pos.z / uObjSize.z;
float t = fract((uTime * 0.1 * uSpeedMul) + uPhase + (d * uLengthRatio));
float numPrev = floor(t / wStep);
float numNext = numPrev + 1.0;
float tPrev = numPrev * wStep + hWStep;
float tNext = numNext * wStep + hWStep;
splineData splinePrev = getSplineData(tPrev);
splineData splineNext = getSplineData(tNext);
float f = (t - tPrev) / wStep;
vec3 P = mix(splinePrev.point, splineNext.point, f);
vec3 B = mix(splinePrev.binormal, splineNext.binormal, f);
vec3 N = mix(splinePrev.normal, splineNext.normal, f);
transformed = P + (N * pos.x) + (B * pos.y);
`;

export const STAR_VERTEX = `
attribute float aSeed;
uniform sampler2D uSpatialTexture;
uniform vec2 uTextureSize;
uniform float uTime;
uniform float uLengthRatio;
uniform vec3 uObjSize;
uniform float uPhase;
uniform float uSpeedMul;
uniform float uStarSize;
varying float vTwinkle;
varying float vBright;

struct splineData { vec3 point; vec3 binormal; vec3 normal; };

splineData getSplineData(float t){
  float step = 1.0 / uTextureSize.y;
  float halfStep = step * 0.5;
  splineData sd;
  sd.point    = texture2D(uSpatialTexture, vec2(t, step * 0.0 + halfStep)).rgb;
  sd.binormal = texture2D(uSpatialTexture, vec2(t, step * 1.0 + halfStep)).rgb;
  sd.normal   = texture2D(uSpatialTexture, vec2(t, step * 2.0 + halfStep)).rgb;
  return sd;
}

void main() {
  vec3 pos = position;
  float wStep = 1.0 / uTextureSize.x;
  float hWStep = wStep * 0.5;
  float d = pos.z / uObjSize.z;
  float t = fract((uTime * 0.1 * uSpeedMul) + uPhase + (d * uLengthRatio));
  float numPrev = floor(t / wStep);
  float numNext = numPrev + 1.0;
  float tPrev = numPrev * wStep + hWStep;
  float tNext = numNext * wStep + hWStep;
  splineData splinePrev = getSplineData(tPrev);
  splineData splineNext = getSplineData(tNext);
  float f = (t - tPrev) / wStep;
  vec3 P = mix(splinePrev.point, splineNext.point, f);
  vec3 B = mix(splinePrev.binormal, splineNext.binormal, f);
  vec3 N = mix(splinePrev.normal, splineNext.normal, f);
  vec3 transformed = P + (N * pos.x) + (B * pos.y);
  vec4 mv = modelViewMatrix * vec4(transformed, 1.0);
  gl_Position = projectionMatrix * mv;
  gl_PointSize = uStarSize * (280.0 / -mv.z);
  vTwinkle = sin(uTime * 1.6 + aSeed * 8.0) * 0.5 + 0.5;
  vBright = 0.5 + fract(aSeed * 13.37) * 0.6;
}
`;

export const STAR_FRAGMENT = `
uniform vec3 uAccentColor;
uniform float uStarAlpha;
varying float vTwinkle;
varying float vBright;

void main() {
  vec2 uv = gl_PointCoord - 0.5;
  float d = length(uv);
  if (d > 0.5) discard;
  float sharp = smoothstep(0.5, 0.18, d);
  float halo = smoothstep(0.5, 0.0, d) * 0.28;
  float glow = sharp + halo;
  vec3 col = uAccentColor * (0.85 + vTwinkle * 0.5) * vBright;
  float alpha = glow * uStarAlpha * (0.6 + vTwinkle * 0.3);
  gl_FragColor = vec4(col, alpha);
}
`;
