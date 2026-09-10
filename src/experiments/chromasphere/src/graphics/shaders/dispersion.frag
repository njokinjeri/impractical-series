uniform float uTime;
uniform float uAudioFreq;
uniform vec3  uColorPrimary;
uniform vec3  uColorSecondary;
varying vec3 vViewPosition;
varying vec3 vNormal;
varying vec3 vObjectPos;

void main() {
  float w1 = sin(vObjectPos.y * 4.5 - uTime * 2.2) * 0.5 + 0.5;
  float w2 = cos(vObjectPos.x * 3.2 + uTime * 1.6) * 0.5 + 0.5;
  float w3 = sin((vObjectPos.x + vObjectPos.z) * 5.5 - uTime * 3.0) * 0.5 + 0.5;

  vec3 color = mix(uColorPrimary, uColorSecondary, w1);
  color = mix(color, uColorSecondary, w2 * 0.55);
  color = mix(color, uColorPrimary,  w3 * 0.45);

  vec3 viewDir = normalize(vViewPosition);
  float fresnel = pow(1.0 - max(dot(normalize(vNormal), viewDir), 0.0), 2.2);

  float alpha = clamp(
    0.70 + fresnel * 0.25 + uAudioFreq * 0.10,
    0.0,
    0.95
  );

  float energy = 0.85 + fresnel * 0.55 + uAudioFreq * 0.35;

  vec3 outColor = mix(color, color * 1.35, fresnel);

  gl_FragColor = vec4(outColor * energy, alpha);
}