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

function makeFootballTexture(renderer: THREE.WebGLRenderer): THREE.CanvasTexture {
  const w = 1024;
  const h = 512;
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const ctx = c.getContext("2d")!;

  ctx.fillStyle = "#f0f0f0";
  ctx.fillRect(0, 0, w, h);

  const drawPentagon = (cx: number, cy: number, radius: number, rot = 0): void => {
    ctx.fillStyle = "#1a1a1a";
    ctx.beginPath();
    for (let i = 0; i < 5; i++) {
      const a = (i / 5) * Math.PI * 2 - Math.PI / 2 + rot;
      const x = cx + Math.cos(a) * radius;
      const y = cy + Math.sin(a) * radius;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fill();
  };

  const pentR = 55;
  const cols = 6;
  const rows = 3;
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const stagger = (row % 2) * (w / cols / 2);
      const cx = (col / cols) * w + stagger + w / cols / 2;
      const cy = (row / rows) * h + h / rows / 2;
      drawPentagon(cx % w, cy, pentR, (row + col) * 0.3);
      if (cx > w - pentR) {
        drawPentagon(cx - w, cy, pentR, (row + col) * 0.3);
      }
    }
  }

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
  return tex;
}

// CPU-side noise mirroring the shader, so sugar crust lands on the visible frosting
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

// --- Sugar crust (instanced particle layer) ---
function addSugarCrust(root: THREE.Group): void {
  const group = new THREE.Group();
  const SHARPNESS = 9.0;
  const THICKNESS = 0.22;

  const makeLayer = (count: number, maskThreshold: number, extraPush: number, size: number): void => {
    const positions = new Float32Array(count * 3);
    let valid = 0;

    for (let i = 0; i < count; i++) {
      const u = Math.random() * Math.PI * 2;
      const v = Math.random() * Math.PI * 2;
      const cx = Math.cos(u) * (R + TUBE * Math.cos(v));
      const cy = Math.sin(v) * TUBE * DOUGH_FLAT;
      const cz = Math.sin(u) * (R + TUBE * Math.cos(v));

      const nx = Math.cos(u) * Math.cos(v);
      const ny = Math.sin(v);
      const nz = Math.sin(u) * Math.cos(v);

      const nVal = fbmCpu(cx * 2.2, cy * 2.2, cz * 2.2);
      const topBias = ny * 0.65 + 0.35;
      const rawMask = topBias + (nVal - 0.5) * 0.6;
      const t = Math.max(0, Math.min(1, (rawMask - (0.5 - 1 / SHARPNESS)) / (2 / SHARPNESS)));
      const mask = t * t * (3 - 2 * t);

      if (mask < maskThreshold) continue;

      const thickness = mask * THICKNESS;
      const push = thickness + extraPush;
      positions[valid * 3] = cx + nx * push;
      positions[valid * 3 + 1] = cy + ny * push;
      positions[valid * 3 + 2] = cz + nz * push;
      valid++;
    }

    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions.slice(0, valid * 3), 3));
    group.add(new THREE.Points(g, new THREE.PointsMaterial({
      color: 0xffffff,
      size,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.9,
      depthWrite: false,
    })));
  };

  makeLayer(24000, 0.6, 0.008, 0.014);
  makeLayer(5000, 0.65, 0.014, 0.03);

  root.add(group);
}

// --- Mini football (sphere with pentagon patches) ---
function makePentagonShape(size: number): THREE.Shape {
  const shape = new THREE.Shape();
  for (let i = 0; i < 5; i++) {
    const a = (i / 5) * Math.PI * 2 - Math.PI / 2;
    const x = Math.cos(a) * size;
    const y = Math.sin(a) * size;
    if (i === 0) shape.moveTo(x, y);
    else shape.lineTo(x, y);
  }
  shape.closePath();
  return shape;
}

function makeMiniFootball(radius: number): THREE.Group {
  const g = new THREE.Group();

  g.add(new THREE.Mesh(
    new THREE.SphereGeometry(radius, 24, 18),
    new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      roughness: 0.4,
      clearcoat: 0.6,
      clearcoatRoughness: 0.2,
      envMapIntensity: 0.9,
    }),
  ));

  const patchSize = radius * 0.42;
  const shape = makePentagonShape(patchSize);
  const patchGeo = new THREE.ShapeGeometry(shape);
  const patchMat = new THREE.MeshPhysicalMaterial({
    color: 0x151515,
    roughness: 0.55,
    clearcoat: 0.3,
    clearcoatRoughness: 0.4,
  });

  const dirs = [
    new THREE.Vector3(0, 1, 0),
    new THREE.Vector3(0, -1, 0),
    new THREE.Vector3(1, 0.5, 0).normalize(),
    new THREE.Vector3(-1, 0.5, 0).normalize(),
    new THREE.Vector3(0, 0.5, 1).normalize(),
    new THREE.Vector3(0, 0.5, -1).normalize(),
    new THREE.Vector3(0.7, -0.5, 0.7).normalize(),
    new THREE.Vector3(-0.7, -0.5, 0.7).normalize(),
    new THREE.Vector3(0.7, -0.5, -0.7).normalize(),
    new THREE.Vector3(-0.7, -0.5, -0.7).normalize(),
  ];

  for (const dir of dirs) {
    const patch = new THREE.Mesh(patchGeo, patchMat);
    patch.position.copy(dir.clone().multiplyScalar(radius * 1.001));
    patch.lookAt(patch.position.clone().add(dir));
    g.add(patch);
  }

  return g;
}

// Needs to be passed the renderer at build time. The build function in the
// registry returns a Group, so we accept renderer via a closure-captured global.
// Simpler: we grab the renderer from a module-level variable set once at boot.
let cachedRenderer: THREE.WebGLRenderer | null = null;
export function setFootballRenderer(r: THREE.WebGLRenderer): void {
  cachedRenderer = r;
}

export function buildFootball(): THREE.Group {
  if (!cachedRenderer) throw new Error("Football: renderer not set");
  const root = new THREE.Group();

  // ---- Dough + frosting painted mesh with football texture ----
  const footballTex = makeFootballTexture(cachedRenderer);

  const geo = new THREE.TorusGeometry(R, TUBE, 128, 256);
  geo.rotateX(Math.PI / 2);
  geo.scale(1, DOUGH_FLAT, 1);

  const mat = new THREE.MeshPhysicalMaterial({
    map: footballTex,
    color: 0xffffff,
    roughness: 0.42,
    metalness: 0.0,
    clearcoat: 0.7,
    clearcoatRoughness: 0.15,
    envMapIntensity: 1.2,
    sheen: 0.3,
    sheenColor: new THREE.Color(0xffddaa),
  });

  mat.onBeforeCompile = (shader) => {
    shader.uniforms.uNoiseScale = { value: 2.2 };
    shader.uniforms.uEdgeNoiseScale = { value: 5.5 };
    shader.uniforms.uFrostHeight = { value: 0.22 };
    shader.uniforms.uFrostSharpness = { value: 9.0 };
    shader.uniforms.uDoughColor = { value: new THREE.Color(0xc0884d) };

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
         float bump = (fbm(position * uEdgeNoiseScale) - 0.5) * 0.04 * mask;
         transformed = position + vnorm * (thickness + bump);`,
      );

    shader.fragmentShader = shader.fragmentShader
      .replace(
        "#include <common>",
        `#include <common>
         varying float vFrostMask;
         uniform vec3 uDoughColor;`,
      )
      .replace(
        "#include <color_fragment>",
        `#include <color_fragment>
         vec3 footballColor = diffuseColor.rgb;
         diffuseColor.rgb = mix(uDoughColor, footballColor, vFrostMask);`,
      );
  };

  root.add(new THREE.Mesh(geo, mat));

  // ---- Sugar crust ----
  addSugarCrust(root);

  // ---- Orbiting mini footballs ----
  const orbitGroup = new THREE.Group();
  for (let i = 0; i < 45; i++) {
    const radius = 0.05 + Math.random() * 0.045;
    const football = makeMiniFootball(radius);

    const theta = Math.random() * Math.PI * 2;
    const phi = (Math.random() - 0.5) * Math.PI * 0.8;
    const orbitR = 1.5 + Math.random() * 1.3;

    football.userData = {
      theta,
      phi,
      orbitR,
      speed: 0.15 + Math.random() * 0.35,
      spinX: (Math.random() - 0.5) * 0.8,
      spinY: (Math.random() - 0.5) * 0.8,
      spinZ: (Math.random() - 0.5) * 0.8,
      bobAmp: 0.05 + Math.random() * 0.1,
      bobSpeed: 0.3 + Math.random() * 0.6,
      bobPhase: Math.random() * Math.PI * 2,
    };

    football.position.set(
      Math.cos(theta) * Math.cos(phi) * orbitR,
      Math.sin(phi) * orbitR * 0.8,
      Math.sin(theta) * Math.cos(phi) * orbitR,
    );

    orbitGroup.add(football);
  }
  orbitGroup.name = "football-orbiters";
  root.add(orbitGroup);

  // ---- Floating powder (rotating particle cloud) ----
  const POWDER_COUNT = 200;
  const powderPositions = new Float32Array(POWDER_COUNT * 3);
  for (let i = 0; i < POWDER_COUNT; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = (Math.random() - 0.5) * Math.PI;
    const r = 1.4 + Math.random() * 1.6;
    powderPositions[i * 3] = Math.cos(theta) * Math.cos(phi) * r;
    powderPositions[i * 3 + 1] = Math.sin(phi) * r;
    powderPositions[i * 3 + 2] = Math.sin(theta) * Math.cos(phi) * r;
  }

  const powderGeo = new THREE.BufferGeometry();
  powderGeo.setAttribute("position", new THREE.BufferAttribute(powderPositions, 3));
  const powderPoints = new THREE.Points(powderGeo, new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.012,
    sizeAttenuation: true,
    transparent: true,
    opacity: 0.6,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  }));
  powderPoints.name = "football-powder";
  root.add(powderPoints);

  return root;
}

export function animateFootball(root: THREE.Group, elapsed: number, dt: number): void {
  const orbitGroup = root.getObjectByName("football-orbiters");
  if (orbitGroup) {
    for (const o of orbitGroup.children) {
      const u = o.userData;
      const a = u.theta + elapsed * u.speed;
      o.position.set(
        Math.cos(a) * Math.cos(u.phi) * u.orbitR,
        Math.sin(u.phi) * u.orbitR * 0.8 + Math.sin(elapsed * u.bobSpeed + u.bobPhase) * u.bobAmp,
        Math.sin(a) * Math.cos(u.phi) * u.orbitR,
      );
      o.rotation.x += u.spinX * dt;
      o.rotation.y += u.spinY * dt;
      o.rotation.z += u.spinZ * dt;
    }
  }

  const powder = root.getObjectByName("football-powder");
  if (powder) {
    powder.rotation.y += 0.05 * dt;
  }
}