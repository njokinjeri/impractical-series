varying vec3 vViewPosition;
varying vec3 vNormal;
varying vec3 vObjectPos;
uniform float uTime;
uniform float uAudioFreq;

void main() {
  vNormal    = normalize(normalMatrix * normal);
  vObjectPos = position;

  vec3 pos = position * 0.75;
  float breathe = sin(pos.y * 4.0 + uTime * 2.0) * 0.05
                + cos(pos.x * 3.0 - uTime * 1.3) * 0.03;
  pos += normal * breathe * (0.4 + uAudioFreq * 2.2);

  vec4 mv = modelViewMatrix * vec4(pos, 1.0);
  vViewPosition = -mv.xyz;
  gl_Position   = projectionMatrix * mv;
}