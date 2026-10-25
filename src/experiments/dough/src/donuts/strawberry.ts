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
  float fbm(vec3 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 4; i++) {
      v += a * noise(p);
      p *= 2.03;
      a *= 0.5;
    }
    return v;
  }
`;

// --- CPU-side noise mirroring the shader ---
function hash3(x: number, y: number, z: number): number {
  let px = (x * 0.3183099 + 0.1) % 1;
  let py = (y * 0.3183099 + 0.2) % 1;
  let pz = (z * 0.3183099 + 0.3) % 1;
  if (px < 0) px += 1;
  if (py < 0) py += 1;
  if (pz < 0) pz += 1;
  px *= 17; py *= 17; pz *= 17;
  const v = (px * py * pz) % 1;
  const v2 = (v * (px + py + pz)) % 1;
  return v2 < 0 ? v2 + 1 : v2;
}

function noise3(x: number, y: number, z: number): number {
  const xi = Math.floor(x), yi = Math.floor(y), zi = Math.floor(z);
  const xf = x - xi, yf = y - yi, zf = z - zi;
  const u = xf * xf * (3 - 2 * xf);
  const v = yf * yf * (3 - 2 * yf);
  const w = zf * zf * (3 - 2 * zf);
  const mix = (a: number, b: number, t: number): number => a + (b - a) * t;
  const c000 = hash3(xi, yi, zi);
  const c100 = hash3(xi + 1, yi, zi);
  const c010 = hash3(xi, yi + 1, zi);
  const c110 = hash3(xi + 1, yi + 1, zi);
  const c001 = hash3(xi, yi, zi + 1);
  const c101 = hash3(xi + 1, yi, zi + 1);
  const c011 = hash3(xi, yi + 1, zi + 1);
  const c111 = hash3(xi + 1, yi + 1, zi + 1);
  return mix(
    mix(mix(c000, c100, u), mix(c010, c110, u), v),
    mix(mix(c001, c101, u), mix(c011, c111, u), v),
    w,
  );
}

function fbmCpu(x: number, y: number, z: number): number {
  let v = 0, a = 0.5;
  let px = x, py = y, pz = z;
  for (let i = 0; i < 4; i++) {
    v += a * noise3(px, py, pz);
    px *= 2.03; py *= 2.03; pz *= 2.03;
    a *= 0.5;
  }
  return v;
}

interface GlazePoint {
  pos: THREE.Vector3;
  normal: THREE.Vector3;
  mask: number;
}

function glazeAt(u: number, v: number): GlazePoint {
  const cx = Math.cos(u) * (R + TUBE * Math.cos(v));
  const cy = Math.sin(v) * TUBE * DOUGH_FLAT;
  const cz = Math.sin(u) * (R + TUBE * Math.cos(v));
  const nx = Math.cos(u) * Math.cos(v);
  const ny = Math.sin(v);
  const nz = Math.sin(u) * Math.cos(v);

  const nVal = fbmCpu(cx * 2.2, cy * 2.2, cz * 2.2);
  const topBias = ny * 0.65 + 0.35;
  const rawMask = topBias + (nVal - 0.5) * 0.6;
  const SHARPNESS = 7.0;
  const t = Math.max(0, Math.min(1, (rawMask - (0.5 - 1 / SHARPNESS)) / (2 / SHARPNESS)));
  const mask = t * t * (3 - 2 * t);

  const thickness = mask * 0.14;
  const bump = (fbmCpu(cx * 5.5, cy * 5.5, cz * 5.5) - 0.5) * 0.03 * mask;
  const dist = thickness + bump;

  return {
    pos: new THREE.Vector3(cx + nx * dist, cy + ny * dist, cz + nz * dist),
    normal: new THREE.Vector3(nx, ny, nz).normalize(),
    mask,
  };
}

function orientCapsuleFlat(mesh: THREE.Object3D, normal: THREE.Vector3): void {
  const arbitrary = new THREE.Vector3(0, 1, 0);
  if (Math.abs(normal.dot(arbitrary)) > 0.95) arbitrary.set(1, 0, 0);
  const tangent = new THREE.Vector3().crossVectors(arbitrary, normal).normalize();

  const localZ = normal.clone();
  const localY = tangent;
  const localX = new THREE.Vector3().crossVectors(localY, localZ).normalize();
  localY.crossVectors(localZ, localX).normalize();

  const m = new THREE.Matrix4();
  m.makeBasis(localX, localY, localZ);
  mesh.quaternion.setFromRotationMatrix(m);

  const spin = new THREE.Quaternion().setFromAxisAngle(normal, Math.random() * Math.PI * 2);
  mesh.quaternion.premultiply(spin);
}

const SPRINKLE_COLORS = [
  0xff2a2a, 0xff5a2a, 0xff8a30, 0xffd040, 0xffe870, 0xfff0a0, 0x2ecc40,
  0x44ddaa, 0x88e088, 0x2a8aff, 0x40b0ff, 0x88ccff, 0xaa44ff, 0xff44aa,
  0xff88cc, 0xffffff, 0xfff6e0,
];

const CAPSULE_GEO = new THREE.CapsuleGeometry(0.013, 0.06, 3, 6);
const ROUND_GEO_A = new THREE.SphereGeometry(0.022, 12, 10);
const ROUND_GEO_B = new THREE.SphereGeometry(0.028, 12, 10);

export function buildStrawberry(): THREE.Group {
  const root = new THREE.Group();

  // ---- Dough + glaze painted mesh ----
  const geo = new THREE.TorusGeometry(R, TUBE, 128, 256);
  geo.rotateX(Math.PI / 2);
  geo.scale(1, DOUGH_FLAT, 1);

  const mat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    roughness: 0.1,
    metalness: 0.0,
    clearcoat: 0.7,
    clearcoatRoughness: 0.1,
    iridescence: 0.0,
    envMapIntensity: 0.5,
    sheen: 0.25,
    sheenColor: new THREE.Color(0xffddaa),
  });

  mat.onBeforeCompile = (shader) => {
    shader.uniforms.uNoiseScale = { value: 2.2 };
    shader.uniforms.uEdgeNoiseScale = { value: 5.5 };
    shader.uniforms.uFrostHeight = { value: 0.14 };
    shader.uniforms.uFrostSharpness = { value: 7.0 };
    shader.uniforms.uDoughColor = { value: new THREE.Color(0xc07850) };
    shader.uniforms.uGlazeColor = { value: new THREE.Color(0xe82878) };

    shader.vertexShader = shader.vertexShader
      .replace(
        "#include <common>",
        `#include <common>
         ${NOISE_GLSL}
         uniform float uNoiseScale;
         uniform float uEdgeNoiseScale;
         uniform float uFrostHeight;
         uniform float uFrostSharpness;
         varying float vFrostMask;`,
      )
      .replace(
        "#include <begin_vertex>",
        `#include <begin_vertex>
         vec3 vnorm = normalize(normal);
         float nVal = fbm(position * uNoiseScale);
         float topBias = vnorm.y * 0.65 + 0.35;
         float rawMask = topBias + (nVal - 0.5) * 0.6;
         float mask = smoothstep(0.5 - 1.0/uFrostSharpness,
                                 0.5 + 1.0/uFrostSharpness,
                                 rawMask);
         vFrostMask = mask;
         float thickness = mask * uFrostHeight;
         float bump = (fbm(position * uEdgeNoiseScale) - 0.5) * 0.03 * mask;
         transformed = position + vnorm * (thickness + bump);`,
      );

    shader.fragmentShader = shader.fragmentShader
      .replace(
        "#include <common>",
        `#include <common>
         varying float vFrostMask;
         uniform vec3 uDoughColor;
         uniform vec3 uGlazeColor;`,
      )
      .replace(
        "#include <color_fragment>",
        `#include <color_fragment>
         diffuseColor.rgb = mix(uDoughColor, uGlazeColor, vFrostMask);`,
      );
  };

  root.add(new THREE.Mesh(geo, mat));

  // ---- Sprinkles on the glaze (420) ----
  const sprinkleGroup = new THREE.Group();
  let placed = 0, attempts = 0;

  while (placed < 420 && attempts < 420 * 15) {
    attempts++;
    const u = Math.random() * Math.PI * 2;
    const v = Math.random() * Math.PI;

    const f = glazeAt(u, v);
    if (f.mask < 0.7) continue;

    const useRound = Math.random() < 0.4;

    let g: THREE.BufferGeometry;
    let sprinkleMat: THREE.MeshPhysicalMaterial;
    let sink: number;

    if (useRound) {
      g = Math.random() < 0.5 ? ROUND_GEO_A : ROUND_GEO_B;
      g.computeBoundingSphere();
      const radius = g.boundingSphere!.radius;
      sprinkleMat = new THREE.MeshPhysicalMaterial({
        color: SPRINKLE_COLORS[placed % SPRINKLE_COLORS.length],
        roughness: 0.22,
        clearcoat: 0.9,
        clearcoatRoughness: 0.1,
      });
      sink = radius * 0.85;
    } else {
      g = CAPSULE_GEO;
      sprinkleMat = new THREE.MeshPhysicalMaterial({
        color: SPRINKLE_COLORS[placed % SPRINKLE_COLORS.length],
        roughness: 0.42,
        clearcoat: 0.2,
      });
      sink = 0.012;
    }

    const s = new THREE.Mesh(g, sprinkleMat);
    s.position.copy(f.pos).addScaledVector(f.normal, sink);

    if (useRound) {
      s.rotation.set(Math.random() * 6, Math.random() * 6, Math.random() * 6);
    } else {
      orientCapsuleFlat(s, f.normal);
    }

    sprinkleGroup.add(s);
    placed++;
  }
  root.add(sprinkleGroup);

  // ---- Floating sprinkles (240) ----
  const floatGroup = new THREE.Group();
  for (let i = 0; i < 240; i++) {
    const useRound = Math.random() < 0.35;
    const g = useRound
      ? new THREE.SphereGeometry(0.018 + Math.random() * 0.012, 12, 10)
      : new THREE.CapsuleGeometry(0.011, 0.055, 3, 6);

    const m = new THREE.MeshPhysicalMaterial({
      color: SPRINKLE_COLORS[i % SPRINKLE_COLORS.length],
      roughness: useRound ? 0.22 : 0.4,
      clearcoat: useRound ? 0.9 : 0.2,
      clearcoatRoughness: 0.1,
    });

    const s = new THREE.Mesh(g, m);
    const theta = Math.random() * Math.PI * 2;
    const phi = (Math.random() - 0.5) * Math.PI * 0.95;
    const orbitR = 1.5 + Math.random() * 2.2;

    s.position.set(
      Math.cos(theta) * Math.cos(phi) * orbitR,
      Math.sin(phi) * orbitR * 0.8,
      Math.sin(theta) * Math.cos(phi) * orbitR,
    );

    s.userData = {
      orbitSpeed: 0.04 + Math.random() * 0.14,
      orbitPhase: theta,
      orbitPhi: phi,
      orbitRadius: orbitR,
      spinX: (Math.random() - 0.5) * 1.4,
      spinY: (Math.random() - 0.5) * 1.4,
      spinZ: (Math.random() - 0.5) * 1.4,
      bobAmp: 0.05 + Math.random() * 0.15,
      bobSpeed: 0.4 + Math.random() * 0.8,
      bobPhase: Math.random() * Math.PI * 2,
    };

    floatGroup.add(s);
  }
  root.add(floatGroup);

  // Tag the float group so animate can find it
  floatGroup.name = "strawberry-floaters";

  return root;
}

export function animateStrawberry(root: THREE.Group, elapsed: number, dt: number): void {
  const floatGroup = root.getObjectByName("strawberry-floaters");
  if (!floatGroup) return;

  for (const child of floatGroup.children) {
    const u = child.userData;
    const angle = u.orbitPhase + elapsed * u.orbitSpeed;
    child.position.x = Math.cos(angle) * Math.cos(u.orbitPhi) * u.orbitRadius;
    child.position.y =
      Math.sin(u.orbitPhi) * u.orbitRadius * 0.8 +
      Math.sin(elapsed * u.bobSpeed + u.bobPhase) * u.bobAmp;
    child.position.z = Math.sin(angle) * Math.cos(u.orbitPhi) * u.orbitRadius;
    child.rotation.x += u.spinX * dt;
    child.rotation.y += u.spinY * dt;
    child.rotation.z += u.spinZ * dt;
  }
}