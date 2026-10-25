import * as THREE from 'three';

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
  px *= 17;
  py *= 17;
  pz *= 17;
  const v = (px * py * pz) % 1;
  const v2 = (v * (px + py + pz)) % 1;
  return v2 < 0 ? v2 + 1 : v2;
}

function noise3(x: number, y: number, z: number): number {
  const xi = Math.floor(x),
    yi = Math.floor(y),
    zi = Math.floor(z);
  const xf = x - xi,
    yf = y - yi,
    zf = z - zi;
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
    w
  );
}

function fbmCpu(x: number, y: number, z: number): number {
  let v = 0,
    a = 0.5;
  let px = x,
    py = y,
    pz = z;
  for (let i = 0; i < 4; i++) {
    v += a * noise3(px, py, pz);
    px *= 2.03;
    py *= 2.03;
    pz *= 2.03;
    a *= 0.5;
  }
  return v;
}

interface SurfacePoint {
  pos: THREE.Vector3;
  normal: THREE.Vector3;
  mask: number;
}

// Mirrors the shader's mask/displacement so sugar dust lands correctly
function surfaceAt(u: number, v: number): SurfacePoint {
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
  const t = Math.max(
    0,
    Math.min(1, (rawMask - (0.5 - 1 / SHARPNESS)) / (2 / SHARPNESS))
  );
  const mask = t * t * (3 - 2 * t);

  const ringAngle = Math.atan2(cz, cx);
  const radial = Math.hypot(cx, cz);
  const tubeAngle = Math.atan2(cy, radial - 1.0);
  const stripePhase = ringAngle * 9.0 + tubeAngle * 1.2;
  const saw =
    stripePhase / (Math.PI * 2) - Math.floor(stripePhase / (Math.PI * 2));
  const stripe = 1.0 - Math.abs(saw - 0.5) * 2.0;
  let drizzle = Math.max(0, Math.min(1, (stripe - 0.85) / 0.1));
  drizzle = drizzle * drizzle * (3 - 2 * drizzle);
  const topRaw = (ny - 0.15) / 0.4;
  const top =
    topRaw <= 0 ? 0 : topRaw >= 1 ? 1 : topRaw * topRaw * (3 - 2 * topRaw);
  drizzle *= top;

  const thickness = mask * 0.1 + drizzle * 0.012;
  const bump = (fbmCpu(cx * 5.5, cy * 5.5, cz * 5.5) - 0.5) * 0.03 * mask;
  const dist = thickness + bump;

  return {
    pos: new THREE.Vector3(cx + nx * dist, cy + ny * dist, cz + nz * dist),
    normal: new THREE.Vector3(nx, ny, nz).normalize(),
    mask,
  };
}

// Rough sugar cube — hand-crushed look
function makeRoughSugarCube(size: number): THREE.BufferGeometry {
  const geo = new THREE.BoxGeometry(size, size, size, 6, 6, 6);
  const pos = geo.attributes.position;
  const v = new THREE.Vector3();
  const sphere = new THREE.Vector3();

  const sx = 0.85 + Math.random() * 0.3;
  const sy = 0.85 + Math.random() * 0.3;
  const sz = 0.85 + Math.random() * 0.3;

  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i);
    v.x *= sx;
    v.y *= sy;
    v.z *= sz;

    sphere
      .copy(v)
      .normalize()
      .multiplyScalar(size * 0.62);
    v.lerp(sphere, 0.35);

    const lump =
      Math.sin(v.x * 22 + i * 0.01) * 0.5 + Math.cos(v.y * 25 + i * 0.02) * 0.5;
    v.multiplyScalar(1.0 + lump * 0.05);

    const crystal =
      Math.sin(v.x * 140) * Math.cos(v.y * 150) * Math.sin(v.z * 145);
    v.multiplyScalar(1.0 + crystal * 0.025);

    pos.setXYZ(i, v.x, v.y, v.z);
  }

  geo.computeVertexNormals();
  return geo;
}

export function buildBrulee(): THREE.Group {
  const root = new THREE.Group();

  // ---- Dough + glaze + drizzle painted mesh ----
  const geo = new THREE.TorusGeometry(R, TUBE, 128, 256);
  geo.rotateX(Math.PI / 2);
  geo.scale(1, DOUGH_FLAT, 1);

  const mat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    roughness: 0.08,
    metalness: 0.0,
    clearcoat: 1.0,
    clearcoatRoughness: 0.03,
    iridescence: 0.0,
    envMapIntensity: 0.6,
    sheen: 0.2,
    sheenColor: new THREE.Color(0xffd8a0),
  });

  mat.onBeforeCompile = (shader) => {
    shader.uniforms.uNoiseScale = { value: 2.2 };
    shader.uniforms.uEdgeNoiseScale = { value: 5.5 };
    shader.uniforms.uFrostHeight = { value: 0.1 };
    shader.uniforms.uFrostSharpness = { value: 7.0 };
    shader.uniforms.uDoughColor = { value: new THREE.Color(0x6a3a1a) };
    shader.uniforms.uGlazeColor = { value: new THREE.Color(0xc47838) };
    shader.uniforms.uDrizzleColor = { value: new THREE.Color(0xf0d8b8) };
    shader.uniforms.uDrizzleCount = { value: 9.0 };

    shader.vertexShader = shader.vertexShader
      .replace(
        '#include <common>',
        `#include <common>
         ${NOISE_GLSL}
         uniform float uNoiseScale;
         uniform float uEdgeNoiseScale;
         uniform float uFrostHeight;
         uniform float uFrostSharpness;
         uniform float uDrizzleCount;
         varying float vFrostMask;
         varying float vDrizzleMask;
         varying vec3 vWorldPos;`
      )
      .replace(
        '#include <begin_vertex>',
        `#include <begin_vertex>
         vec3 vnorm = normalize(normal);
         float nVal = fbm(position * uNoiseScale);
         float topBias = vnorm.y * 0.65 + 0.35;
         float rawMask = topBias + (nVal - 0.5) * 0.6;
         float mask = smoothstep(0.5 - 1.0/uFrostSharpness,
                                 0.5 + 1.0/uFrostSharpness,
                                 rawMask);
         vFrostMask = mask;

         float ringAngle = atan(position.z, position.x);
         float tubeAngle = atan(position.y, length(position.xz) - 1.0);
         float stripePhase = ringAngle * uDrizzleCount + tubeAngle * 1.2;
         float saw = fract(stripePhase / 6.2831853);
         float stripe = 1.0 - abs(saw - 0.5) * 2.0;
         float drizzle = smoothstep(0.85, 0.95, stripe);
         float top = smoothstep(0.15, 0.55, vnorm.y);
         drizzle *= top;
         vDrizzleMask = drizzle;

         float thickness = mask * uFrostHeight + drizzle * 0.012;
         float bump = (fbm(position * uEdgeNoiseScale) - 0.5) * 0.03 * mask;
         vec3 displaced = position + vnorm * (thickness + bump);
         transformed = displaced;

         vWorldPos = (modelMatrix * vec4(displaced, 1.0)).xyz;`
      );

    shader.fragmentShader = shader.fragmentShader
      .replace(
        '#include <common>',
        `#include <common>
         ${NOISE_GLSL}
         varying float vFrostMask;
         varying float vDrizzleMask;
         varying vec3 vWorldPos;
         uniform vec3 uDoughColor;
         uniform vec3 uGlazeColor;
         uniform vec3 uDrizzleColor;`
      )
      .replace(
        '#include <color_fragment>',
        `#include <color_fragment>
         vec3 base = mix(uDoughColor, uGlazeColor, vFrostMask);
         float crust = fbm(vWorldPos * 8.0);
         vec3 crustColor = uDoughColor * (0.92 + crust * 0.20);
         base = mix(crustColor, base, vFrostMask);
         base = mix(base, uDrizzleColor, vDrizzleMask);
         diffuseColor.rgb = base;`
      )
      .replace(
        '#include <roughnessmap_fragment>',
        `#include <roughnessmap_fragment>
         float doughRoughness = 0.85;
         float glazeRoughness = 0.08;
         roughnessFactor = mix(doughRoughness, glazeRoughness, vFrostMask);`
      );
  };

  root.add(new THREE.Mesh(geo, mat));

  // ---- Sugar dust (fine specks on the glaze) ----
  const dustGroup = new THREE.Group();
  let placed = 0,
    attempts = 0;
  while (placed < 1400 && attempts < 1400 * 6) {
    attempts++;
    const u = Math.random() * Math.PI * 2;
    const v = Math.random() * Math.PI;

    const f = surfaceAt(u, v);
    if (f.mask < 0.35) continue;

    const size = 0.0025 + Math.random() * 0.004;
    const g = new THREE.SphereGeometry(size, 4, 3);
    const m = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.85 + Math.random() * 0.15,
    });
    const s = new THREE.Mesh(g, m);
    s.position.copy(f.pos).addScaledVector(f.normal, size * 0.5);
    dustGroup.add(s);
    placed++;
  }
  root.add(dustGroup);

  // ---- Floating rough sugar cubes ----
  const cubeGroup = new THREE.Group();
  const cubeMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    roughness: 0.72,
    metalness: 0.0,
    clearcoat: 0.05,
    clearcoatRoughness: 0.7,
    envMapIntensity: 0.5,
  });

  for (let i = 0; i < 90; i++) {
    const size = 0.04 + Math.random() * 0.09;
    const g = makeRoughSugarCube(size);
    const cube = new THREE.Mesh(g, cubeMat);

    const theta = Math.random() * Math.PI * 2;
    const phi = (Math.random() - 0.5) * Math.PI * 0.95;
    const orbitR = 1.7 + Math.random() * 2.4;

    cube.position.set(
      Math.cos(theta) * Math.cos(phi) * orbitR,
      Math.sin(phi) * orbitR * 0.8,
      Math.sin(theta) * Math.cos(phi) * orbitR
    );

    cube.userData = {
      orbitSpeed: 0.03 + Math.random() * 0.1,
      orbitPhase: theta,
      orbitPhi: phi,
      orbitRadius: orbitR,
      spinX: (Math.random() - 0.5) * 1.0,
      spinY: (Math.random() - 0.5) * 1.0,
      spinZ: (Math.random() - 0.5) * 1.0,
      bobAmp: 0.05 + Math.random() * 0.15,
      bobSpeed: 0.3 + Math.random() * 0.6,
      bobPhase: Math.random() * Math.PI * 2,
    };

    cubeGroup.add(cube);
  }
  root.add(cubeGroup);

  // ---- Fine floating dust ----
  const fineGroup = new THREE.Group();
  const fineMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
  for (let i = 0; i < 200; i++) {
    const size = 0.004 + Math.random() * 0.006;
    const g = new THREE.SphereGeometry(size, 5, 4);
    const s = new THREE.Mesh(g, fineMat);

    const theta = Math.random() * Math.PI * 2;
    const phi = (Math.random() - 0.5) * Math.PI * 0.95;
    const orbitR = 1.5 + Math.random() * 2.6;

    s.position.set(
      Math.cos(theta) * Math.cos(phi) * orbitR,
      Math.sin(phi) * orbitR * 0.8,
      Math.sin(theta) * Math.cos(phi) * orbitR
    );

    s.userData = {
      orbitSpeed: 0.04 + Math.random() * 0.12,
      orbitPhase: theta,
      orbitPhi: phi,
      orbitRadius: orbitR,
      bobAmp: 0.05 + Math.random() * 0.15,
      bobSpeed: 0.4 + Math.random() * 0.8,
      bobPhase: Math.random() * Math.PI * 2,
    };

    fineGroup.add(s);
  }
  root.add(fineGroup);

  // Tags so animate can find them
  cubeGroup.name = 'brulee-cubes';
  fineGroup.name = 'brulee-fine';

  return root;
}

export function animateBrulee(
  root: THREE.Group,
  elapsed: number,
  dt: number
): void {
  const cubes = root.getObjectByName('brulee-cubes');
  const fine = root.getObjectByName('brulee-fine');

  if (cubes) {
    for (const c of cubes.children) {
      const u = c.userData;
      const a = u.orbitPhase + elapsed * u.orbitSpeed;
      c.position.x = Math.cos(a) * Math.cos(u.orbitPhi) * u.orbitRadius;
      c.position.y =
        Math.sin(u.orbitPhi) * u.orbitRadius * 0.8 +
        Math.sin(elapsed * u.bobSpeed + u.bobPhase) * u.bobAmp;
      c.position.z = Math.sin(a) * Math.cos(u.orbitPhi) * u.orbitRadius;
      c.rotation.x += u.spinX * dt;
      c.rotation.y += u.spinY * dt;
      c.rotation.z += u.spinZ * dt;
    }
  }

  if (fine) {
    for (const s of fine.children) {
      const u = s.userData;
      const a = u.orbitPhase + elapsed * u.orbitSpeed;
      s.position.x = Math.cos(a) * Math.cos(u.orbitPhi) * u.orbitRadius;
      s.position.y =
        Math.sin(u.orbitPhi) * u.orbitRadius * 0.8 +
        Math.sin(elapsed * u.bobSpeed + u.bobPhase) * u.bobAmp;
      s.position.z = Math.sin(a) * Math.cos(u.orbitPhi) * u.orbitRadius;
    }
  }
}
