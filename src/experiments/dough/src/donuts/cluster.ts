import * as THREE from "three";

const R = 1.0;
const TUBE = 0.42;
const DOUGH_FLAT = 0.82;

const GLAZE_PALETTE = [
  0xffb8d0, 0xb8d8ff, 0xb8f0d0, 0xffe8a8,
  0xd8b8ff, 0xffd8b8, 0xffc8e0, 0xc8e8ff,
  0xd0ffd8, 0xffc8b8, 0xe8d0ff, 0xfff0c8,
  0xc8f0f0, 0xf0c8e8,
];

const SPRINKLE_COLORS = [
  0xff5599, 0x5599ff, 0x55ff99, 0xffee44, 0xaa55ff,
  0xff9933, 0xffffff, 0xdd88ff, 0x44ddff, 0xff6688,
  0x88ff44, 0xff44aa, 0x44aaff,
];

const DOUGH_COLOR = 0xc98850;

const INNER_R = R - TUBE;
const OUTER_R = R + TUBE;
const TOP_Y = TUBE * DOUGH_FLAT;

// ---- Dough geometry (small torus for one mini donut) ----
function makeDoughGeo(): THREE.BufferGeometry {
  const geo = new THREE.TorusGeometry(R, TUBE, 32, 72);
  geo.rotateX(Math.PI / 2);
  geo.scale(1, DOUGH_FLAT, 1);
  return geo;
}

// ---- Frosting lathe with drips ----
function makeFrostingGeo(dripCount: number): THREE.BufferGeometry {
  const domeH = 0.10;
  const overhang = 0.10;
  const edgeT = 0.10;

  const points: THREE.Vector2[] = [];
  points.push(new THREE.Vector2(INNER_R + 0.02, TOP_Y * 0.55));

  const domeSteps = 14;
  for (let i = 0; i <= domeSteps; i++) {
    const t = i / domeSteps;
    const x = INNER_R + (OUTER_R - INNER_R) * t;
    const arc = Math.sin(t * Math.PI);
    const y = TOP_Y + domeH * arc + edgeT * (1 - t) * 0.3;
    points.push(new THREE.Vector2(x, y));
  }

  const lipSteps = 5;
  for (let i = 0; i <= lipSteps; i++) {
    const t = i / lipSteps;
    const x = OUTER_R + overhang * Math.sin(t * Math.PI * 0.5);
    const y = TOP_Y - edgeT * t;
    points.push(new THREE.Vector2(x, y));
  }

  const undersideSteps = 12;
  for (let i = 0; i <= undersideSteps; i++) {
    const t = i / undersideSteps;
    const x = (OUTER_R + overhang) - ((OUTER_R + overhang) - INNER_R) * t;
    const y = TOP_Y * 0.4 - 0.02 * Math.sin(t * Math.PI);
    points.push(new THREE.Vector2(x, y));
  }

  const geo = new THREE.LatheGeometry(points, 96);

  const pos = geo.attributes.position;
  const dripAngles: number[] = [];
  for (let i = 0; i < dripCount; i++) dripAngles.push(Math.random() * Math.PI * 2);

  const v = new THREE.Vector3();
  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i);
    const dist = Math.sqrt(v.x * v.x + v.z * v.z);
    if (dist < OUTER_R - 0.02) continue;
    const angle = Math.atan2(v.z, v.x);
    let dripBoost = 0;
    for (const da of dripAngles) {
      const d = Math.abs(((angle - da + Math.PI * 3) % (Math.PI * 2)) - Math.PI);
      if (d < 0.35) dripBoost = Math.max(dripBoost, 1 - d / 0.35);
    }
    if (dripBoost > 0) {
      const belowTop = TOP_Y - v.y;
      if (belowTop > 0) {
        v.y -= dripBoost * 0.22 * Math.min(1, belowTop / edgeT);
        pos.setXYZ(i, v.x, v.y, v.z);
      }
    }
  }
  pos.needsUpdate = true;
  geo.computeVertexNormals();
  return geo;
}

// ---- Build one mini donut ----
function buildMiniDonut(scale: number, glazeColor: number): THREE.Group {
  const g = new THREE.Group();

  g.add(new THREE.Mesh(
    makeDoughGeo(),
    new THREE.MeshPhysicalMaterial({
      color: DOUGH_COLOR,
      roughness: 0.85,
      metalness: 0.0,
    }),
  ));

  const frostingGeo = makeFrostingGeo(3 + Math.floor(Math.random() * 3));
  g.add(new THREE.Mesh(
    frostingGeo,
    new THREE.MeshPhysicalMaterial({
      color: glazeColor,
      roughness: 0.08,
      metalness: 0.0,
      clearcoat: 1.0,
      clearcoatRoughness: 0.03,
      side: THREE.DoubleSide,
      envMapIntensity: 1.4,
      emissive: glazeColor,
      emissiveIntensity: 0.0,
    }),
  ));

  // Sprinkles on the frosting dome
  const sprinkleCount = 45 + Math.floor(Math.random() * 25);
  const domeH = 0.10;

  for (let i = 0; i < sprinkleCount; i++) {
    const radialT = 0.15 + Math.random() * 0.7;
    const r = INNER_R + (OUTER_R - INNER_R) * radialT;
    const angle = Math.random() * Math.PI * 2;

    const x = Math.cos(angle) * r;
    const z = Math.sin(angle) * r;

    const arc = Math.sin(radialT * Math.PI);
    const y = TOP_Y + domeH * arc * 0.95;

    const tiltX = Math.cos(angle) * (radialT - 0.5) * 0.7;
    const tiltZ = Math.sin(angle) * (radialT - 0.5) * 0.7;
    const normal = new THREE.Vector3(tiltX, 1, tiltZ).normalize();

    const color = SPRINKLE_COLORS[Math.floor(Math.random() * SPRINKLE_COLORS.length)];
    const sprinkle = new THREE.Mesh(
      new THREE.CapsuleGeometry(0.022, 0.11, 3, 5),
      new THREE.MeshStandardMaterial({ color, roughness: 0.5 }),
    );

    sprinkle.position.set(
      x + normal.x * 0.015,
      y + normal.y * 0.015,
      z + normal.z * 0.015,
    );

    sprinkle.lookAt(sprinkle.position.clone().add(normal));
    sprinkle.rotateX(Math.PI / 2 + (Math.random() - 0.5) * 1.2);
    sprinkle.rotateY((Math.random() - 0.5) * 1.2);

    g.add(sprinkle);
  }

  g.scale.setScalar(scale);
  g.userData.isDonut = true;
  return g;
}

// ---- Scattered floating sprinkles ----
function buildScatteredSprinkles(count: number): THREE.Group {
  const group = new THREE.Group();
  const VOLUME = { x: 12, y: 8, z: 8 };
  const sprites: THREE.Mesh[] = [];

  for (let i = 0; i < count; i++) {
    const color = SPRINKLE_COLORS[Math.floor(Math.random() * SPRINKLE_COLORS.length)];
    const sprinkle = new THREE.Mesh(
      new THREE.CapsuleGeometry(0.018, 0.09, 3, 5),
      new THREE.MeshStandardMaterial({ color, roughness: 0.5 }),
    );

    const x = (Math.random() - 0.5) * VOLUME.x;
    const y = (Math.random() - 0.5) * VOLUME.y;
    const z = (Math.random() - 0.5) * VOLUME.z;

    sprinkle.position.set(x, y, z);
    sprinkle.rotation.set(
      Math.random() * Math.PI * 2,
      Math.random() * Math.PI * 2,
      Math.random() * Math.PI * 2,
    );

    sprinkle.userData = {
      initialY: y,
      bobAmp: 0.15 + Math.random() * 0.35,
      bobSpeed: 0.2 + Math.random() * 0.6,
      bobPhase: Math.random() * Math.PI * 2,
      spinSpeed: 0.1 + Math.random() * 0.3,
    };

    group.add(sprinkle);
    sprites.push(sprinkle);
  }

  group.userData.sprites = sprites;
  return group;
}

export interface ClusterHandle {
  group: THREE.Group;
  donuts: THREE.Group[];
}

export function buildCluster(): ClusterHandle {
  const group = new THREE.Group();
  const donuts: THREE.Group[] = [];
  const VOLUME = { x: 10, y: 6, z: 7 };

  const shuffled = [...GLAZE_PALETTE];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

const placedPositions: Array<{ x: number; y: number; z: number; radius: number }> = [];

for (let i = 0; i < 50; i++) {
  const glazeColor = shuffled[i % shuffled.length];
  const scale = 0.10 + Math.random() * 0.18;
  const donut = buildMiniDonut(scale, glazeColor);

  // The bounding radius of a mini donut at this scale
  const donutRadius = (R + TUBE) * scale * 1.1;

  // Try up to 30 times to find a clear spot
  let x = 0, y = 0, z = 0;
  let attempts = 0;
  while (attempts < 30) {
    attempts++;
    x = (Math.random() - 0.5) * VOLUME.x;
    y = (Math.random() - 0.5) * VOLUME.y;
    z = (Math.random() - 0.5) * VOLUME.z;

    let collides = false;
    for (const p of placedPositions) {
      const dx = x - p.x;
      const dy = y - p.y;
      const dz = z - p.z;
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
      // Require 1.1× the sum of radii as minimum gap
      if (dist < (donutRadius + p.radius) * 1.1) {
        collides = true;
        break;
      }
    }
    if (!collides) break;
  }

  placedPositions.push({ x, y, z, radius: donutRadius });


    donut.position.set(x, y, z);
    donut.rotation.set(
      Math.random() * Math.PI * 2,
      Math.random() * Math.PI * 2,
      Math.random() * Math.PI * 2,
    );

    donut.userData.initialY = y;
    donut.userData.bobAmp = 0.04 + Math.random() * 0.08;
    donut.userData.bobSpeed = 0.3 + Math.random() * 0.5;
    donut.userData.bobPhase = Math.random() * Math.PI * 2;
    donut.userData.ambientSpin = new THREE.Vector3(
      (Math.random() - 0.5) * 0.15,
      (Math.random() - 0.5) * 0.15,
      (Math.random() - 0.5) * 0.15,
    );
    donut.userData.impulseSpin = new THREE.Vector3(0, 0, 0);

    group.add(donut);
    donuts.push(donut);
  }

  const sprinkles = buildScatteredSprinkles(200);
  group.add(sprinkles);

  group.userData.donuts = donuts;
  group.userData.sprinkles = sprinkles;

  return { group, donuts };
}

export function animateCluster(root: THREE.Group, elapsed: number, dt: number): void {
  const donuts = root.userData.donuts as THREE.Group[] | undefined;
  const sprinkles = root.userData.sprinkles as THREE.Group | undefined;

  if (donuts) {
    const IMPULSE_DECAY = 0.985;
    for (const d of donuts) {
      const u = d.userData;
      d.position.y = u.initialY + Math.sin(elapsed * u.bobSpeed + u.bobPhase) * u.bobAmp;
      d.rotation.x += u.ambientSpin.x * dt + u.impulseSpin.x * dt;
      d.rotation.y += u.ambientSpin.y * dt + u.impulseSpin.y * dt;
      d.rotation.z += u.ambientSpin.z * dt + u.impulseSpin.z * dt;
      u.impulseSpin.multiplyScalar(IMPULSE_DECAY);
      if (u.impulseSpin.lengthSq() < 0.0001) u.impulseSpin.set(0, 0, 0);
    }
  }

  if (sprinkles) {
    const sprites = sprinkles.userData.sprites as THREE.Mesh[] | undefined;
    if (sprites) {
      for (const s of sprites) {
        const u = s.userData;
        s.position.y = u.initialY + Math.sin(elapsed * u.bobSpeed + u.bobPhase) * u.bobAmp;
        s.rotation.x += u.spinSpeed * 0.005;
        s.rotation.y += u.spinSpeed * 0.007;
        s.rotation.z += u.spinSpeed * 0.006;
      }
    }
  }
}

// ---- Interaction controller — attach / detach on mount / unmount ----
export interface ClusterInteraction {
  attach: (canvas: HTMLCanvasElement, camera: THREE.Camera, donuts: THREE.Group[]) => void;
  detach: () => void;
}

export function createClusterInteraction(): ClusterInteraction {
  const raycaster = new THREE.Raycaster();
  const pointerNdc = new THREE.Vector2();

  let canvas: HTMLCanvasElement | null = null;
  let camera: THREE.Camera | null = null;
  let donuts: THREE.Group[] = [];

  let downX = 0;
  let downY = 0;
  let downTime = 0;
  let hasPointerDown = false;

  const onPointerDown = (e: PointerEvent): void => {
    hasPointerDown = true;
    downX = e.clientX;
    downY = e.clientY;
    downTime = performance.now();
  };

  const onPointerUp = (e: PointerEvent): void => {
    if (!hasPointerDown || !canvas || !camera) return;
    hasPointerDown = false;

    const dt = performance.now() - downTime;
    if (dt > 400) return;

    const dx = e.clientX - downX;
    const dy = e.clientY - downY;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist > 6) return;

    const rect = canvas.getBoundingClientRect();
    pointerNdc.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    pointerNdc.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(pointerNdc, camera);

    const hits = raycaster.intersectObjects(donuts, true);
    if (hits.length === 0) return;

    let obj: THREE.Object3D | null = hits[0].object;
    while (obj && !donuts.includes(obj as THREE.Group)) obj = obj.parent;
    if (!obj) return;

    const donut = obj as THREE.Group;

    const sx = e.clientX - rect.left - rect.width / 2;
    const sy = e.clientY - rect.top - rect.height / 2;
    const sLen = Math.sqrt(sx * sx + sy * sy) || 1;

    const STRENGTH = 6.0;
    const impulseX = (sy / sLen) * STRENGTH + (Math.random() - 0.5) * 3;
    const impulseY = (sx / sLen) * STRENGTH + (Math.random() - 0.5) * 3;
    const impulseZ = (Math.random() - 0.5) * 5;

    const spin = donut.userData.impulseSpin as THREE.Vector3;
    spin.x += impulseX;
    spin.y += impulseY;
    spin.z += impulseZ;

    const MAX = 25;
    if (spin.length() > MAX) spin.setLength(MAX);
  };

  return {
    attach(c: HTMLCanvasElement, cam: THREE.Camera, d: THREE.Group[]): void {
      canvas = c;
      camera = cam;
      donuts = d;
      c.addEventListener("pointerdown", onPointerDown);
      c.addEventListener("pointerup", onPointerUp);
    },
    detach(): void {
      if (canvas) {
        canvas.removeEventListener("pointerdown", onPointerDown);
        canvas.removeEventListener("pointerup", onPointerUp);
      }
      canvas = null;
      camera = null;
      donuts = [];
    },
  };
}