import * as THREE from "three";

const R = 1.0;
const TUBE = 0.52;
const DOUGH_FLAT = 0.88;

const NOISE_GLSL = /* glsl */ `
  float hash(vec3 p) {
    p = fract(p * 0.3183099 + vec3(0.1, 0.2, 0.3));
    p *= 17.0;
    return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
  }
  float noise(vec3 x) {
    vec3 i = floor(x);
    vec3 f = fract(x);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(mix(hash(i + vec3(0,0,0)), hash(i + vec3(1,0,0)), f.x),
          mix(hash(i + vec3(0,1,0)), hash(i + vec3(1,1,0)), f.x), f.y),
      mix(mix(hash(i + vec3(0,0,1)), hash(i + vec3(1,0,1)), f.x),
          mix(hash(i + vec3(0,1,1)), hash(i + vec3(1,1,1)), f.x), f.y),
      f.z
    );
  }
  float fbm2(vec3 p) {
    return 0.6 * noise(p) + 0.4 * noise(p * 2.1);
  }
`;

// ---- Splat data (module-level so it's computed once, not per-mount) ----
const SPLAT_COLORS = [
  new THREE.Color(0xf5a030),
  new THREE.Color(0xf5d547),
  new THREE.Color(0x1a2a55),
  new THREE.Color(0xff4477),
  new THREE.Color(0xe35a2a),
  new THREE.Color(0x2ec97a),
  new THREE.Color(0x8a4af5),
  new THREE.Color(0xff6699),
];

const SPLAT_COUNT = 32;
const splatPositions: number[] = [];
const splatColors: number[] = [];
const splatRadii: number[] = [];

for (let i = 0; i < SPLAT_COUNT; i++) {
  const ringAngle = i * 2.399963 + Math.random() * 0.4;
  const tubeAngle = (i * 1.618034 + Math.random() * 0.5) % (Math.PI * 2);

  const cosT = Math.cos(tubeAngle);
  const sinT = Math.sin(tubeAngle);

  const cx = Math.cos(ringAngle) * (R + TUBE * cosT);
  const cy = sinT * TUBE * DOUGH_FLAT;
  const cz = Math.sin(ringAngle) * (R + TUBE * cosT);

  splatPositions.push(cx, cy, cz);

  let radius: number;
  const rnd = Math.random();
  if (rnd < 0.20) radius = 0.22 + Math.random() * 0.08;
  else if (rnd < 0.70) radius = 0.36 + Math.random() * 0.12;
  else radius = 0.50 + Math.random() * 0.15;
  splatRadii.push(radius);

  const c = SPLAT_COLORS[i % SPLAT_COLORS.length];
  splatColors.push(c.r, c.g, c.b);
}

export function buildPainters(): THREE.Group {
  const root = new THREE.Group();

  const geo = new THREE.TorusGeometry(R, TUBE, 200, 400);
  geo.rotateX(Math.PI / 2);
  geo.scale(1, DOUGH_FLAT, 1);

  const mat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    roughness: 0.7,
    metalness: 0.0,
    clearcoat: 0.12,
    clearcoatRoughness: 0.55,
    envMapIntensity: 0.9,
  });

  mat.onBeforeCompile = (shader) => {
    shader.uniforms.uFrostNoiseScale = { value: 2.2 };
    shader.uniforms.uFrostSharpness = { value: 9.0 };
    shader.uniforms.uFrostThickness = { value: 0.18 };
    shader.uniforms.uFrostColor = { value: new THREE.Color(0xf5e8d0) };
    shader.uniforms.uDoughColor = { value: new THREE.Color(0xb8d4e0) };

    shader.uniforms.uSplatCount = { value: SPLAT_COUNT };
    shader.uniforms.uSplatPositions = { value: splatPositions };
    shader.uniforms.uSplatColors = { value: splatColors };
    shader.uniforms.uSplatRadii = { value: splatRadii };

    // ---- VERTEX ----
    shader.vertexShader = shader.vertexShader.replace(
      "#include <common>",
      `#include <common>
       ${NOISE_GLSL}
       uniform float uFrostNoiseScale;
       uniform float uFrostSharpness;
       uniform float uFrostThickness;
       varying float vFrostMask;
       varying vec3 vLocalPos;`,
    );

    shader.vertexShader = shader.vertexShader.replace(
      "#include <begin_vertex>",
      `#include <begin_vertex>
       vec3 vnorm = normalize(normal);
       float nVal = fbm2(position * uFrostNoiseScale * 0.6);
       float topBias = vnorm.y * 0.65 + 0.35;
       float rawMask = topBias + (nVal - 0.5) * 0.6;
       float mask = smoothstep(
         0.5 - 1.0/uFrostSharpness,
         0.5 + 1.0/uFrostSharpness,
         rawMask
       );
       vFrostMask = mask;
       float upperBias = smoothstep(-0.1, 0.4, vnorm.y);
       float frostThickness = mask * uFrostThickness * upperBias;
       transformed = position + vnorm * frostThickness;
       vLocalPos = position;`,
    );

    // ---- FRAGMENT ----
    shader.fragmentShader = shader.fragmentShader.replace(
      "#include <common>",
      `#include <common>
       ${NOISE_GLSL}
       varying float vFrostMask;
       varying vec3 vLocalPos;
       uniform vec3 uFrostColor;
       uniform vec3 uDoughColor;

       #define MAX_SPLATS 40
       uniform int uSplatCount;
       uniform vec3 uSplatPositions[MAX_SPLATS];
       uniform vec3 uSplatColors[MAX_SPLATS];
       uniform float uSplatRadii[MAX_SPLATS];

       float splatEdgeNoise(vec3 p) {
         return fbm2(p * 6.0) * 0.5 + fbm2(p * 13.0) * 0.3 + fbm2(p * 27.0) * 0.2;
       }

       vec3 applySplats(vec3 base, vec3 worldPos) {
         float wob = splatEdgeNoise(worldPos);
         wob = wob - 0.5;

         vec3 col = base;

         for (int i = 0; i < MAX_SPLATS; i++) {
           if (i >= uSplatCount) break;

           vec3 sp = uSplatPositions[i];
           float r  = uSplatRadii[i];
           vec3 sc  = uSplatColors[i];

           float d = distance(worldPos, sp);
           float effectiveR = r * (1.0 + wob * 0.6);

           float core = 1.0 - smoothstep(effectiveR * 0.85, effectiveR, d);
           float halo = 1.0 - smoothstep(effectiveR * 0.8, effectiveR * 1.4, d);
           halo *= 0.35;

           float blend = max(core, halo);
           col = mix(col, sc, blend);
         }

         return col;
       }`,
    );

    shader.fragmentShader = shader.fragmentShader.replace(
      "#include <color_fragment>",
      `#include <color_fragment>
       vec3 base = mix(uDoughColor, uFrostColor, vFrostMask);
       vec3 withSplats = applySplats(base, vLocalPos);
       diffuseColor.rgb = withSplats;`,
    );
  };

  root.add(new THREE.Mesh(geo, mat));

  // ---- Floating paint specks (physical objects, not shader splats) ----
  const speckGroup = new THREE.Group();
  const speckData: Array<{
    orbitSpeed: number;
    orbitPhase: number;
    orbitPhi: number;
    orbitRadius: number;
    bobAmp: number;
    bobSpeed: number;
    bobPhase: number;
    spinX: number;
    spinY: number;
    spinZ: number;
  }> = [];

  for (let i = 0; i < 120; i++) {
    const size = 0.018 + Math.random() * 0.045;
    const g = new THREE.SphereGeometry(size, 10, 8);
    const m = new THREE.MeshPhysicalMaterial({
      color: SPLAT_COLORS[i % SPLAT_COLORS.length].getHex(),
      roughness: 0.55,
      clearcoat: 0.3,
      clearcoatRoughness: 0.35,
      envMapIntensity: 1.0,
    });

    const speck = new THREE.Mesh(g, m);

    const theta = Math.random() * Math.PI * 2;
    const phi = (Math.random() - 0.5) * Math.PI;
    const r = 1.5 + Math.random() * 1.5;

    speck.position.set(
      Math.cos(theta) * Math.cos(phi) * r,
      Math.sin(phi) * r * 0.8,
      Math.sin(theta) * Math.cos(phi) * r,
    );

    speckGroup.add(speck);

    speckData.push({
      orbitSpeed: 0.08 + Math.random() * 0.20,
      orbitPhase: theta,
      orbitPhi: phi,
      orbitRadius: r,
      bobAmp: 0.05 + Math.random() * 0.10,
      bobSpeed: 0.3 + Math.random() * 0.6,
      bobPhase: Math.random() * Math.PI * 2,
      spinX: (Math.random() - 0.5) * 0.6,
      spinY: (Math.random() - 0.5) * 0.6,
      spinZ: (Math.random() - 0.5) * 0.6,
    });
  }
  speckGroup.name = "painters-specks";
  speckGroup.userData.data = speckData;
  root.add(speckGroup);

  return root;
}

export function animatePainters(root: THREE.Group, elapsed: number, dt: number): void {
  const group = root.getObjectByName("painters-specks");
  if (!group) return;

  const data = group.userData.data as Array<{
    orbitSpeed: number;
    orbitPhase: number;
    orbitPhi: number;
    orbitRadius: number;
    bobAmp: number;
    bobSpeed: number;
    bobPhase: number;
    spinX: number;
    spinY: number;
    spinZ: number;
  }>;

  for (let i = 0; i < group.children.length; i++) {
    const s = group.children[i];
    const u = data[i];
    const a = u.orbitPhase + elapsed * u.orbitSpeed;
    s.position.x = Math.cos(a) * Math.cos(u.orbitPhi) * u.orbitRadius;
    s.position.y =
      Math.sin(u.orbitPhi) * u.orbitRadius * 0.8 +
      Math.sin(elapsed * u.bobSpeed + u.bobPhase) * u.bobAmp;
    s.position.z = Math.sin(a) * Math.cos(u.orbitPhi) * u.orbitRadius;
    s.rotation.x += u.spinX * dt;
    s.rotation.y += u.spinY * dt;
    s.rotation.z += u.spinZ * dt;
  }
}