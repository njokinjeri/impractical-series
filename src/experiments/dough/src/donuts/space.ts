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

// --- CPU-side noise (same math) for fracture-edge detection ---
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

function fbm2Cpu(x: number, y: number, z: number): number {
  return 0.6 * noise3(x, y, z) + 0.4 * noise3(x * 2.1, y * 2.1, z * 2.1);
}

function erodeMaskAt(cx: number, cy: number, cz: number): number {
  const scale = 2.0;
  const n1 = fbm2Cpu(cx * scale, cy * scale, cz * scale);
  const n2 = fbm2Cpu(cx * scale * 2.3 + 5.0, cy * scale * 2.3 + 5.0, cz * scale * 2.3 + 5.0);
  const combined = n1 * 0.7 + n2 * 0.3;
  const t = Math.max(0, Math.min(1, (combined - 0.52) / 0.10));
  return t * t * (3 - 2 * t);
}

// ---- Chrome material (shared by debris) ----
function makeChromeMat(): THREE.MeshPhysicalMaterial {
  return new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 1.0,
    roughness: 0.08,
    envMapIntensity: 2.2,
    clearcoat: 1.0,
    clearcoatRoughness: 0.05,
  });
}

// ---- Eroded shell material ----
function makeShellMat(): THREE.MeshPhysicalMaterial {
  const mat = new THREE.MeshPhysicalMaterial({
    color: 0xf0e8dc,
    roughness: 0.72,
    metalness: 0.0,
    clearcoat: 0.15,
    clearcoatRoughness: 0.5,
    envMapIntensity: 0.9,
    side: THREE.DoubleSide,
  });

  mat.transparent = true;
  mat.depthWrite = true;

  mat.onBeforeCompile = (shader) => {
    shader.uniforms.uErodeScale = { value: 2.0 };
    shader.uniforms.uShellColor = { value: new THREE.Color(0xf0e8dc) };
    shader.uniforms.uVoidColor = { value: new THREE.Color(0x0a0e1a) };

    shader.vertexShader = shader.vertexShader
      .replace(
        "#include <common>",
        `#include <common>
         ${NOISE_GLSL}
         uniform float uErodeScale;
         varying float vErodeMask;`,
      )
      .replace(
        "#include <begin_vertex>",
        `#include <begin_vertex>
         float nVal = fbm2(position * uErodeScale);
         float nVal2 = fbm2(position * uErodeScale * 2.3 + vec3(5.0));
         float combined = nVal * 0.7 + nVal2 * 0.3;
         float mask = smoothstep(0.52, 0.62, combined);
         vErodeMask = mask;`,
      );

    shader.fragmentShader = shader.fragmentShader
      .replace(
        "#include <common>",
        `#include <common>
         varying float vErodeMask;
         uniform vec3 uShellColor;
         uniform vec3 uVoidColor;`,
      )
      .replace(
        "#include <color_fragment>",
        `#include <color_fragment>
         diffuseColor.rgb = mix(uShellColor, uVoidColor, vErodeMask);
         diffuseColor.a = 1.0 - vErodeMask;`,
      );
  };

  return mat;
}

export function buildSpace(): THREE.Group {
  const root = new THREE.Group();

  // ---- Inner wireframe lattice (visible through gaps) ----
  const latticeGeo = new THREE.TorusGeometry(R * 0.97, TUBE * 0.94, 24, 32);
  latticeGeo.rotateX(Math.PI / 2);
  latticeGeo.scale(1, DOUGH_FLAT, 1);
  root.add(new THREE.Mesh(
    latticeGeo,
    new THREE.MeshBasicMaterial({
      color: 0x2a3a5a,
      wireframe: true,
      transparent: true,
      opacity: 0.85,
    }),
  ));

  // ---- Dark solid inner torus behind the lattice ----
  const innerGeo = new THREE.TorusGeometry(R * 0.96, TUBE * 0.90, 64, 128);
  innerGeo.rotateX(Math.PI / 2);
  innerGeo.scale(1, DOUGH_FLAT, 1);
  root.add(new THREE.Mesh(
    innerGeo,
    new THREE.MeshStandardMaterial({
      color: 0x0a0e1a,
      roughness: 0.9,
      metalness: 0.2,
    }),
  ));

  // ---- Eroded ceramic shell ----
  const shellGeo = new THREE.TorusGeometry(R, TUBE, 200, 400);
  shellGeo.rotateX(Math.PI / 2);
  shellGeo.scale(1, DOUGH_FLAT, 1);
  root.add(new THREE.Mesh(shellGeo, makeShellMat()));

  // ---- Chrome debris clustered at fracture edges ----
  const chromeMat = makeChromeMat();
  const debrisGroup = new THREE.Group();

  // Sample 40,000 points, keep the ones in the fracture-transition zone
  const edgePoints: Array<{ pos: THREE.Vector3; normal: THREE.Vector3 }> = [];
  const SAMPLE_COUNT = 40000;

  for (let i = 0; i < SAMPLE_COUNT; i++) {
    const u = Math.random() * Math.PI * 2;
    const v = Math.random() * Math.PI * 2;
    const cx = Math.cos(u) * (R + TUBE * Math.cos(v));
    const cy = Math.sin(v) * TUBE * DOUGH_FLAT;
    const cz = Math.sin(u) * (R + TUBE * Math.cos(v));

    const mask = erodeMaskAt(cx, cy, cz);
    if (mask > 0.10 && mask < 0.70) {
      const nx = Math.cos(u) * Math.cos(v);
      const ny = Math.sin(v);
      const nz = Math.sin(u) * Math.cos(v);
      edgePoints.push({
        pos: new THREE.Vector3(cx, cy, cz),
        normal: new THREE.Vector3(nx, ny, nz).normalize(),
      });
    }
  }

  // Build 30 clusters of chrome balls
  const usedSeeds = new Set<number>();
  let clusterCount = 0;

  while (usedSeeds.size < edgePoints.length && clusterCount < 30) {
    const seedIdx = Math.floor(Math.random() * edgePoints.length);
    if (usedSeeds.has(seedIdx)) { clusterCount++; continue; }

    const seed = edgePoints[seedIdx];
    usedSeeds.add(seedIdx);

    const baseSize = 0.02 + Math.random() * 0.03;

    const mainBall = new THREE.Mesh(
      new THREE.SphereGeometry(baseSize, 16, 12),
      chromeMat,
    );
    mainBall.position.copy(seed.pos).addScaledVector(seed.normal, 0.015);
    debrisGroup.add(mainBall);

    const satellites = 2 + Math.floor(Math.random() * 6);
    for (let s = 0; s < satellites; s++) {
      let nearest = seed;
      for (let k = 0; k < 5; k++) {
        const c = edgePoints[Math.floor(Math.random() * edgePoints.length)];
        if (c.pos.distanceTo(seed.pos) < 0.15) { nearest = c; break; }
      }
      const satSize = baseSize * (0.5 + Math.random() * 0.7);
      const sat = new THREE.Mesh(
        new THREE.SphereGeometry(satSize, 12, 10),
        chromeMat,
      );
      sat.position.copy(nearest.pos)
        .addScaledVector(nearest.normal, 0.015 + Math.random() * 0.02);
      sat.position.x += (Math.random() - 0.5) * 0.03;
      sat.position.y += (Math.random() - 0.5) * 0.03;
      sat.position.z += (Math.random() - 0.5) * 0.03;
      debrisGroup.add(sat);
    }

    clusterCount++;
  }
  root.add(debrisGroup);

  // ---- Orbiting debris (chrome balls + ceramic shards + wireframe bits) ----
  const orbitGroup = new THREE.Group();

  const shardMat = new THREE.MeshPhysicalMaterial({
    color: 0xf0e8dc,
    roughness: 0.75,
    metalness: 0.0,
    clearcoat: 0.2,
    clearcoatRoughness: 0.5,
  });
  const wireMat = new THREE.MeshBasicMaterial({
    color: 0x4a5a7a,
    wireframe: true,
  });

  // Chrome balls
  for (let i = 0; i < 40; i++) {
    const size = 0.015 + Math.random() * 0.045;
    const ball = new THREE.Mesh(new THREE.SphereGeometry(size, 14, 10), chromeMat);
    addOrbitData(ball);
    orbitGroup.add(ball);
  }

  // Ceramic shards
  for (let i = 0; i < 25; i++) {
    const w = 0.04 + Math.random() * 0.06;
    const h = 0.02 + Math.random() * 0.03;
    const d = 0.04 + Math.random() * 0.06;
    const shard = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), shardMat);
    addOrbitData(shard);
    orbitGroup.add(shard);
  }

  // Wireframe icosahedron fragments
  for (let i = 0; i < 15; i++) {
    const size = 0.05 + Math.random() * 0.05;
    const frag = new THREE.Mesh(new THREE.IcosahedronGeometry(size, 0), wireMat);
    addOrbitData(frag);
    orbitGroup.add(frag);
  }

  orbitGroup.name = "space-debris";
  root.add(orbitGroup);

  return root;
}

function addOrbitData(mesh: THREE.Mesh): void {
  const theta = Math.random() * Math.PI * 2;
  const phi = (Math.random() - 0.5) * Math.PI;
  const r = 1.6 + Math.random() * 1.8;

  mesh.position.set(
    Math.cos(theta) * Math.cos(phi) * r,
    Math.sin(phi) * r * 0.85,
    Math.sin(theta) * Math.cos(phi) * r,
  );

  mesh.userData = {
    orbitSpeed: 0.05 + Math.random() * 0.15,
    orbitPhase: theta,
    orbitPhi: phi,
    orbitRadius: r,
    spinX: (Math.random() - 0.5) * 0.8,
    spinY: (Math.random() - 0.5) * 0.8,
    spinZ: (Math.random() - 0.5) * 0.8,
    bobAmp: 0.04 + Math.random() * 0.08,
    bobSpeed: 0.3 + Math.random() * 0.5,
    bobPhase: Math.random() * Math.PI * 2,
  };
}

export function animateSpace(root: THREE.Group, elapsed: number, dt: number): void {
  const orbitGroup = root.getObjectByName("space-debris");
  if (!orbitGroup) return;

  for (const d of orbitGroup.children) {
    const u = d.userData;
    const a = u.orbitPhase + elapsed * u.orbitSpeed;
    d.position.x = Math.cos(a) * Math.cos(u.orbitPhi) * u.orbitRadius;
    d.position.y =
      Math.sin(u.orbitPhi) * u.orbitRadius * 0.85 +
      Math.sin(elapsed * u.bobSpeed + u.bobPhase) * u.bobAmp;
    d.position.z = Math.sin(a) * Math.cos(u.orbitPhi) * u.orbitRadius;
    d.rotation.x += u.spinX * dt;
    d.rotation.y += u.spinY * dt;
    d.rotation.z += u.spinZ * dt;
  }
}