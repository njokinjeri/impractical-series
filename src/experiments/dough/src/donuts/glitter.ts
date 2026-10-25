import * as THREE from "three";

const R = 1.0;
const TUBE = 0.64;
const DOUGH_FLAT = 0.98;

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

// --- CPU-side noise to mirror the shader ---
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

interface FrostingPoint {
  pos: THREE.Vector3;
  normal: THREE.Vector3;
  mask: number;
}

function frostingAt(theta: number, tubeAngle: number): FrostingPoint {
  const cx = Math.cos(theta) * (R + TUBE * Math.cos(tubeAngle));
  const cy = Math.sin(tubeAngle) * TUBE * DOUGH_FLAT;
  const cz = Math.sin(theta) * (R + TUBE * Math.cos(tubeAngle));

  const nx = Math.cos(theta) * Math.cos(tubeAngle);
  const ny = Math.sin(tubeAngle);
  const nz = Math.sin(theta) * Math.cos(tubeAngle);

  const tubeRadius = TUBE * DOUGH_FLAT;
  const tubeUp = Math.max(-1, Math.min(1, cy / tubeRadius));

  const nVal = fbmCpu(cx * 2.2, cy * 2.2, cz * 2.2);
  let topBias = tubeUp * 0.65 + 0.35;
  if (tubeUp < -0.05) topBias = 0.0;
  const rawMask = topBias + (nVal - 0.5) * 0.6;
  const SHARPNESS = 9.0;
  const t = Math.max(0, Math.min(1, (rawMask - (0.5 - 1 / SHARPNESS)) / (2 / SHARPNESS)));
  const mask = t * t * (3 - 2 * t);

  const topOnly = Math.max(0, Math.min(1, (tubeUp + 0.1) / 0.4));
  const topOnlySmooth = topOnly * topOnly * (3 - 2 * topOnly);
  const thickness = mask * 0.12 * topOnlySmooth;
  const bump = (fbmCpu(cx * 5.5, cy * 5.5, cz * 5.5) - 0.5) * 0.03 * mask * topOnlySmooth;
  const dist = thickness + bump;

  return {
    pos: new THREE.Vector3(cx + nx * dist, cy + ny * dist, cz + nz * dist),
    normal: new THREE.Vector3(nx, ny, nz).normalize(),
    mask,
  };
}

const JEWEL_COLORS = [
  0x4a9eff, 0xff4488, 0xffcc33, 0xff7733, 0x44eebb,
  0xcc44ff, 0xffffff, 0xff2244, 0xffaa00, 0x88ff44,
];

export function buildGlitter(): THREE.Group {
  const root = new THREE.Group();

  // ---- Dough + frosting painted mesh ----
  const geo = new THREE.TorusGeometry(R, TUBE, 128, 256);
  geo.rotateX(Math.PI / 2);
  geo.scale(1, DOUGH_FLAT, 1);

  const mat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    roughness: 0.35,
    metalness: 0.0,
    clearcoat: 0.6,
    clearcoatRoughness: 0.55,
    envMapIntensity: 1.0,
    sheen: 0.5,
    sheenColor: new THREE.Color(0xffaacc),
    side: THREE.DoubleSide,
  });

  mat.onBeforeCompile = (shader) => {
    shader.uniforms.uNoiseScale = { value: 2.2 };
    shader.uniforms.uEdgeNoiseScale = { value: 5.5 };
    shader.uniforms.uFrostHeight = { value: 0.12 };
    shader.uniforms.uFrostSharpness = { value: 9.0 };
    shader.uniforms.uDoughColor = { value: new THREE.Color(0xc07a3a) };
    shader.uniforms.uFrostColor = { value: new THREE.Color(0xff3fa0) };

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
         float posY = position.y;
         float tubeRadius = ${TUBE} * ${DOUGH_FLAT};
         float tubeUp = clamp(posY / tubeRadius, -1.0, 1.0);
         float nVal = fbm(position * uNoiseScale);
         float topBias = tubeUp * 0.65 + 0.35;
         if (tubeUp < -0.05) topBias = 0.0;
         float rawMask = topBias + (nVal - 0.5) * 0.6;
         float mask = smoothstep(0.5 - 1.0/uFrostSharpness,
                                 0.5 + 1.0/uFrostSharpness,
                                 rawMask);
         vFrostMask = mask;
         float topOnly = smoothstep(-0.1, 0.3, tubeUp);
         float thickness = mask * uFrostHeight * topOnly;
         float bump = (fbm(position * uEdgeNoiseScale) - 0.5) * 0.04 * mask * topOnly;
         transformed = position + vnorm * (thickness + bump);`,
      );

    shader.fragmentShader = shader.fragmentShader
      .replace(
        "#include <common>",
        `#include <common>
         varying float vFrostMask;
         uniform vec3 uDoughColor;
         uniform vec3 uFrostColor;`,
      )
      .replace(
        "#include <color_fragment>",
        `#include <color_fragment>
         diffuseColor.rgb = mix(uDoughColor, uFrostColor, vFrostMask);`,
      );
  };

  root.add(new THREE.Mesh(geo, mat));

  // ---- Pink micro-beads (8,000 instanced) ----
  const beadGeo = new THREE.SphereGeometry(0.010, 6, 5);
  const beadMat = new THREE.MeshPhysicalMaterial({
    color: 0xff88cc,
    metalness: 0.7,
    roughness: 0.18,
    clearcoat: 1.0,
    clearcoatRoughness: 0.05,
    envMapIntensity: 1.8,
  });

  const BEAD_COUNT = 8000;
  const beads = new THREE.InstancedMesh(beadGeo, beadMat, BEAD_COUNT);
  const dummy = new THREE.Object3D();
  let placed = 0, attempts = 0;
  while (placed < BEAD_COUNT && attempts < BEAD_COUNT * 4) {
    attempts++;
    const theta = Math.random() * Math.PI * 2;
    const tubeAngle = (Math.random() * 0.7 + 0.15) * Math.PI * 2;
    const f = frostingAt(theta, tubeAngle);
    if (f.mask < 0.55) continue;

    dummy.position.copy(f.pos).addScaledVector(f.normal, 0.008);
    dummy.scale.setScalar(0.7 + Math.random() * 0.7);
    dummy.rotation.set(Math.random() * 6, Math.random() * 6, Math.random() * 6);
    dummy.updateMatrix();
    beads.setMatrixAt(placed, dummy.matrix);
    placed++;
  }
  beads.count = placed;
  beads.instanceMatrix.needsUpdate = true;
  root.add(beads);

  // ---- Chunky beads (2,000 instanced) ----
  const beadGeo2 = new THREE.SphereGeometry(0.016, 8, 6);
  const beadMat2 = new THREE.MeshPhysicalMaterial({
    color: 0xffaadd,
    metalness: 0.8,
    roughness: 0.12,
    clearcoat: 1.0,
    clearcoatRoughness: 0.03,
    envMapIntensity: 2.2,
  });
  const BEAD_COUNT_2 = 2000;
  const beads2 = new THREE.InstancedMesh(beadGeo2, beadMat2, BEAD_COUNT_2);
  let placed2 = 0, attempts2 = 0;
  while (placed2 < BEAD_COUNT_2 && attempts2 < BEAD_COUNT_2 * 4) {
    attempts2++;
    const theta = Math.random() * Math.PI * 2;
    const tubeAngle = (Math.random() * 0.7 + 0.15) * Math.PI * 2;
    const f = frostingAt(theta, tubeAngle);
    if (f.mask < 0.6) continue;

    dummy.position.copy(f.pos).addScaledVector(f.normal, 0.016);
    dummy.scale.setScalar(0.6 + Math.random() * 0.8);
    dummy.rotation.set(Math.random() * 6, Math.random() * 6, Math.random() * 6);
    dummy.updateMatrix();
    beads2.setMatrixAt(placed2, dummy.matrix);
    placed2++;
  }
  beads2.count = placed2;
  beads2.instanceMatrix.needsUpdate = true;
  root.add(beads2);

  // ---- Embedded colored jewels (280) ----
  const JEWEL_COUNT = 280;
  let jPlaced = 0, jAttempts = 0;
  while (jPlaced < JEWEL_COUNT && jAttempts < JEWEL_COUNT * 6) {
    jAttempts++;
    const theta = Math.random() * Math.PI * 2;
    const tubeAngle = (Math.random() * 0.7 + 0.15) * Math.PI * 2;
    const f = frostingAt(theta, tubeAngle);
    if (f.mask < 0.65) continue;

    const roll = Math.random();
    let size: number;
    if (roll < 0.45) size = 0.022 + Math.random() * 0.016;
    else if (roll < 0.80) size = 0.036 + Math.random() * 0.020;
    else size = 0.052 + Math.random() * 0.022;

    const shapeRoll = Math.random();
    let jewelGeo: THREE.BufferGeometry;
    if (shapeRoll < 0.30) jewelGeo = new THREE.OctahedronGeometry(size, 0);
    else if (shapeRoll < 0.55) jewelGeo = new THREE.IcosahedronGeometry(size, 0);
    else if (shapeRoll < 0.80) jewelGeo = new THREE.DodecahedronGeometry(size, 0);
    else jewelGeo = new THREE.SphereGeometry(size, 12, 10);

    const color = JEWEL_COLORS[Math.floor(Math.random() * JEWEL_COLORS.length)];
    const jewelMat = new THREE.MeshPhysicalMaterial({
      color,
      metalness: shapeRoll < 0.8 ? 0.9 : 0.3,
      roughness: 0.05,
      clearcoat: 1.0,
      clearcoatRoughness: 0.02,
      iridescence: shapeRoll > 0.5 ? 0.6 : 0.0,
      iridescenceIOR: 2.0,
      envMapIntensity: 2.6,
    });

    const jewel = new THREE.Mesh(jewelGeo, jewelMat);
    jewel.position.copy(f.pos).addScaledVector(f.normal, -size * 0.35);
    jewel.lookAt(jewel.position.clone().add(f.normal));
    jewel.rotateZ(Math.random() * Math.PI * 2);
    jewel.rotateX((Math.random() - 0.5) * 0.7);
    root.add(jewel);
    jPlaced++;
  }

  // ---- Jewel clusters (7 anchor points) ----
  for (let c = 0; c < 7; c++) {
    let center: FrostingPoint | null = null;
    for (let a = 0; a < 40; a++) {
      const theta = Math.random() * Math.PI * 2;
      const tubeAngle = (Math.random() * 0.7 + 0.15) * Math.PI * 2;
      const f = frostingAt(theta, tubeAngle);
      if (f.mask > 0.75) { center = f; break; }
    }
    if (!center) continue;

    const clusterSize = 4 + Math.floor(Math.random() * 5);
    for (let i = 0; i < clusterSize; i++) {
      const offsetRadius = 0.06 + Math.random() * 0.05;
      const offsetTheta = Math.random() * Math.PI * 2;
      const offsetPhi = Math.random() * Math.PI * 2;
      const offset = new THREE.Vector3(
        Math.cos(offsetTheta) * Math.cos(offsetPhi),
        Math.sin(offsetPhi),
        Math.sin(offsetTheta) * Math.cos(offsetPhi),
      ).multiplyScalar(offsetRadius);

      const dot = offset.dot(center.normal);
      offset.sub(center.normal.clone().multiplyScalar(dot));

      const size = 0.018 + Math.random() * 0.022;
      const shapeRoll = Math.random();
      let jewelGeo: THREE.BufferGeometry;
      if (shapeRoll < 0.4) jewelGeo = new THREE.OctahedronGeometry(size, 0);
      else if (shapeRoll < 0.75) jewelGeo = new THREE.IcosahedronGeometry(size, 0);
      else jewelGeo = new THREE.DodecahedronGeometry(size, 0);

      const color = JEWEL_COLORS[Math.floor(Math.random() * JEWEL_COLORS.length)];
      const jewelMat = new THREE.MeshPhysicalMaterial({
        color,
        metalness: 0.9,
        roughness: 0.05,
        clearcoat: 1.0,
        clearcoatRoughness: 0.02,
        envMapIntensity: 2.6,
      });

      const jewel = new THREE.Mesh(jewelGeo, jewelMat);
      jewel.position.copy(center.pos).add(offset);
      jewel.position.addScaledVector(center.normal, -size * 0.5);
      jewel.lookAt(jewel.position.clone().add(center.normal));
      jewel.rotateX((Math.random() - 0.5) * 0.9);
      jewel.rotateY((Math.random() - 0.5) * 0.9);
      jewel.rotateZ(Math.random() * Math.PI * 2);
      root.add(jewel);
    }
  }

  // ---- Floating glitter (280 orbiting) ----
  const SCATTER_COUNT = 280;
  for (let i = 0; i < SCATTER_COUNT; i++) {
    const roll = Math.random();
    let jewelGeo: THREE.BufferGeometry;
    if (roll < 0.35) jewelGeo = new THREE.SphereGeometry(0.008 + Math.random() * 0.014, 8, 6);
    else if (roll < 0.6) jewelGeo = new THREE.OctahedronGeometry(0.012 + Math.random() * 0.018, 0);
    else if (roll < 0.85) jewelGeo = new THREE.IcosahedronGeometry(0.010 + Math.random() * 0.016, 0);
    else jewelGeo = new THREE.DodecahedronGeometry(0.010 + Math.random() * 0.014, 0);

    const color = JEWEL_COLORS[Math.floor(Math.random() * JEWEL_COLORS.length)];
    const jewelMat = new THREE.MeshPhysicalMaterial({
      color,
      metalness: 0.85,
      roughness: 0.06,
      clearcoat: 1.0,
      clearcoatRoughness: 0.03,
      iridescence: Math.random() < 0.5 ? 0.5 : 0.0,
      iridescenceIOR: 2.0,
      envMapIntensity: 2.5,
    });

    const jewel = new THREE.Mesh(jewelGeo, jewelMat);
    const theta = Math.random() * Math.PI * 2;
    const phi = (Math.random() - 0.5) * Math.PI;
    const r = 1.4 + Math.random() * 2.0;

    jewel.position.set(
      Math.cos(theta) * Math.cos(phi) * r,
      Math.sin(phi) * r * 0.85,
      Math.sin(theta) * Math.cos(phi) * r,
    );
    jewel.rotation.set(Math.random() * 6, Math.random() * 6, Math.random() * 6);

    jewel.userData = {
      orbitSpeed: 0.04 + Math.random() * 0.12,
      orbitPhase: theta,
      orbitPhi: phi,
      orbitRadius: r,
      spinX: (Math.random() - 0.5) * 0.9,
      spinY: (Math.random() - 0.5) * 0.9,
      spinZ: (Math.random() - 0.5) * 0.9,
      bobAmp: 0.04 + Math.random() * 0.12,
      bobSpeed: 0.3 + Math.random() * 0.7,
      bobPhase: Math.random() * Math.PI * 2,
    };

    root.add(jewel);
  }

  return root;
}

// Called from the animate loop every frame
export function animateGlitter(
  root: THREE.Group,
  elapsed: number,
  dt: number,
): void {
  for (const child of root.children) {
    const u = child.userData;
    if (u.orbitPhase === undefined) continue;
    const angle = u.orbitPhase + elapsed * u.orbitSpeed;
    child.position.x = Math.cos(angle) * Math.cos(u.orbitPhi) * u.orbitRadius;
    child.position.y =
      Math.sin(u.orbitPhi) * u.orbitRadius * 0.85 +
      Math.sin(elapsed * u.bobSpeed + u.bobPhase) * u.bobAmp;
    child.position.z = Math.sin(angle) * Math.cos(u.orbitPhi) * u.orbitRadius;
    child.rotation.x += u.spinX * dt;
    child.rotation.y += u.spinY * dt;
    child.rotation.z += u.spinZ * dt;
  }
}