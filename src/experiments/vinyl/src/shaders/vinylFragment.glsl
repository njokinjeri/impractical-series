uniform vec3 uColor;
uniform float uRoughness;
uniform float uSpecular;
uniform float uTransmission;
uniform float uAnisotropicStrength;
uniform float uSpecIntensity;
uniform sampler2D uGrooveMap;
uniform sampler2D uBumpGrooveMap;
uniform vec3 uLightPos1;
uniform vec3 uLightPos2;
uniform vec3 uLightPos3;
uniform vec3 uLightPos4;
uniform float uGrooveDepth;

varying vec3 vNormal;
varying vec3 vWorldPosition;
varying vec2 vUv;

#define PI 3.14159265359

float calcAniso(vec3 N, vec3 T, vec3 H, float dotNL, float dotNV, float alphaX, float alphaY) {
  float dotTH = dot(T, H);
  float dotNH = max(dot(N, H), 0.0);
  float exponent = -2.0 * (pow(dotTH / alphaX, 2.0) + pow(dot(cross(N, T), H) / alphaY, 2.0)) / (1.0 + dotNH);
  return exp(exponent) / (4.0 * PI * alphaX * alphaY * sqrt(dotNL * dotNV + 0.001));
}

void main() {
  vec3 N = normalize(vNormal);
  vec3 V = normalize(cameraPosition - vWorldPosition);
  vec3 L1 = normalize(uLightPos1 - vWorldPosition);
  vec3 L2 = normalize(uLightPos2 - vWorldPosition);
  vec3 L3 = normalize(uLightPos3 - vWorldPosition);
  vec3 L4 = normalize(uLightPos4 - vWorldPosition);
  vec3 H1 = normalize(L1 + V);
  vec3 H2 = normalize(L2 + V);
  vec3 H3 = normalize(L3 + V);
  vec3 H4 = normalize(L4 + V);

  vec2 centerUV = vUv - vec2(0.5);
  vec3 T = normalize(vec3(-centerUV.y, 0.0, centerUV.x));
  
  vec4 grooveData = texture2D(uGrooveMap, vUv);
  float bumpData = texture2D(uBumpGrooveMap, vUv).r;
  float bumpScaled = bumpData * uGrooveDepth;
  float trackMask = grooveData.g;

  float dotNL1 = max(dot(N, L1), 0.0);
  float dotNL2 = max(dot(N, L2), 0.0);
  float dotNL3 = max(dot(N, L3), 0.0);
  float dotNL4 = max(dot(N, L4), 0.0);
  float dotNV = max(dot(N, V), 0.0);
  
  float alphaX = uRoughness * (1.0 - uAnisotropicStrength * 0.3);
  float alphaY = uRoughness * (1.0 + uAnisotropicStrength * 1.2 * trackMask * 0.6);
  
  float spec1 = calcAniso(N, T, H1, dotNL1, dotNV, alphaX, alphaY);
  float spec2 = calcAniso(N, T, H2, dotNL2, dotNV, alphaX, alphaY);
  float spec3 = calcAniso(N, T, H3, dotNL3, dotNV, alphaX, alphaY);
  float spec4 = calcAniso(N, T, H4, dotNL4, dotNV, alphaX, alphaY);

  float specIntensity = uSpecIntensity * trackMask;
  vec3 specColor = vec3(1.0, 0.98, 0.95) * uSpecular * 0.6 * specIntensity * (0.6 + 0.4 * bumpScaled) * 
                  (spec1 * 0.35 + spec2 * 0.25 + spec3 * 0.25 + spec4 * 0.15);

  vec3 ambient = vec3(0.3) * uColor;
  vec3 diffuse = uColor * (dotNL1 * 0.35 + dotNL2 * 0.25 + dotNL3 * 0.2 + dotNL4 * 0.1) * (1.0 - uTransmission * 0.3);
  float rimFactor = pow(1.0 - dotNV, 3.0);
  vec3 rimLight = vec3(0.3, 0.35, 0.4) * rimFactor * 0.3;
  vec3 transmissionColor = uColor * (0.2 + 0.5 * dotNV) * uTransmission * 0.25;
  
  vec3 finalColor = ambient + diffuse + specColor + rimLight + transmissionColor;
  gl_FragColor = vec4(finalColor, 1.0 - (uTransmission * 0.15));
}