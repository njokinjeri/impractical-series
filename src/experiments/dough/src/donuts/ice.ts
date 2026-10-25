import * as THREE from 'three';

const R = 1.0;
const TUBE = 0.44;
const DOUGH_FLAT = 0.82;
const INNER_R = R - TUBE;
const OUTER_R = R + TUBE;
const TOP_Y = TUBE * DOUGH_FLAT;

// ---- Ice dough (chunky, mildly deformed torus) ----
function makeIceDoughGeo(): THREE.BufferGeometry {
  const geo = new THREE.TorusGeometry(R, TUBE, 96, 192);
  geo.rotateX(Math.PI / 2);
  geo.scale(1, DOUGH_FLAT, 1);

  const pos = geo.attributes.position;
  const v = new THREE.Vector3();
  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i);
    const n =
      Math.sin(v.x * 7.5) * 0.5 +
      Math.cos(v.y * 6.2) * 0.3 +
      Math.sin(v.z * 8.1) * 0.4;
    v.multiplyScalar(1 + n * 0.012);
    pos.setXYZ(i, v.x, v.y, v.z);
  }
  pos.needsUpdate = true;
  geo.computeVertexNormals();
  return geo;
}

// ---- Ice frosting (lathe dome with drips) ----
function makeIceFrostingGeo(dripCount = 5): THREE.BufferGeometry {
  const points: THREE.Vector2[] = [];
  points.push(new THREE.Vector2(INNER_R + 0.02, TOP_Y * 0.5));

  const domeSteps = 16;
  const domeH = 0.13;
  const edgeT = 0.11;

  for (let i = 0; i <= domeSteps; i++) {
    const t = i / domeSteps;
    const x = INNER_R + (OUTER_R - INNER_R) * t;
    const arc = Math.sin(t * Math.PI);
    points.push(
      new THREE.Vector2(x, TOP_Y + domeH * arc + edgeT * (1 - t) * 0.3)
    );
  }

  const overhang = 0.12;
  const lipSteps = 5;
  for (let i = 0; i <= lipSteps; i++) {
    const t = i / lipSteps;
    points.push(
      new THREE.Vector2(
        OUTER_R + overhang * Math.sin(t * Math.PI * 0.5),
        TOP_Y - edgeT * t
      )
    );
  }

  const undersideSteps = 14;
  for (let i = 0; i <= undersideSteps; i++) {
    const t = i / undersideSteps;
    const x = OUTER_R + overhang - (OUTER_R + overhang - INNER_R) * t;
    points.push(
      new THREE.Vector2(x, TOP_Y * 0.4 - 0.02 * Math.sin(t * Math.PI))
    );
  }

  const geo = new THREE.LatheGeometry(points, 128);

  // Drip deformation
  const pos = geo.attributes.position;
  const dripAngles: number[] = [];
  for (let i = 0; i < dripCount; i++)
    dripAngles.push(Math.random() * Math.PI * 2);

  const v = new THREE.Vector3();
  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i);
    const dist = Math.sqrt(v.x * v.x + v.z * v.z);
    if (dist < OUTER_R - 0.02) continue;
    const angle = Math.atan2(v.z, v.x);
    let dripBoost = 0;
    for (const da of dripAngles) {
      const d = Math.abs(
        ((angle - da + Math.PI * 3) % (Math.PI * 2)) - Math.PI
      );
      if (d < 0.35) dripBoost = Math.max(dripBoost, 1 - d / 0.35);
    }
    if (dripBoost > 0) {
      const belowTop = TOP_Y - v.y;
      if (belowTop > 0) {
        v.y -= dripBoost * 0.28 * Math.min(1, belowTop / edgeT);
        pos.setXYZ(i, v.x, v.y, v.z);
      }
    }
  }
  pos.needsUpdate = true;
  geo.computeVertexNormals();
  return geo;
}

// ---- Rounded ice cube ----
function makeRoundedCubeGeo(size: number, detail = 4): THREE.BufferGeometry {
  const geo = new THREE.BoxGeometry(
    size,
    size,
    size * 1.05,
    detail,
    detail,
    detail
  );
  const pos = geo.attributes.position;
  const v = new THREE.Vector3();
  const half = size / 2;

  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i);
    const maxC = Math.max(Math.abs(v.x), Math.abs(v.y), Math.abs(v.z));
    if (maxC > 0.001) {
      const dir = v.clone().normalize();
      const round = 0.22;
      v.x = v.x * (1 - round) + dir.x * half * round;
      v.y = v.y * (1 - round) + dir.y * half * round;
      v.z = v.z * (1 - round) + dir.z * half * 1.05 * round;
    }
    v.x += (Math.random() - 0.5) * size * 0.05;
    v.y += (Math.random() - 0.5) * size * 0.05;
    v.z += (Math.random() - 0.5) * size * 0.05;
    pos.setXYZ(i, v.x, v.y, v.z);
  }
  pos.needsUpdate = true;
  geo.computeVertexNormals();
  return geo;
}

// ---- Snowflake sprite texture ----
function makeSnowflakeTex(): THREE.CanvasTexture {
  const size = 128;
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const ctx = c.getContext('2d')!;
  const cx = size / 2;
  const cy = size / 2;

  const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, size * 0.5);
  glow.addColorStop(0, 'rgba(220,240,255,0.85)');
  glow.addColorStop(0.25, 'rgba(180,220,255,0.35)');
  glow.addColorStop(0.6, 'rgba(120,180,240,0.10)');
  glow.addColorStop(1, 'rgba(120,180,240,0)');
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, size, size);

  ctx.strokeStyle = 'rgba(240,250,255,0.95)';
  ctx.lineWidth = 2.5;
  ctx.lineCap = 'round';

  const r = size * 0.32;
  for (let arm = 0; arm < 6; arm++) {
    const a = (arm / 6) * Math.PI * 2;
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(a);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(r, 0);
    ctx.stroke();
    for (let b = 1; b <= 2; b++) {
      const t = b / 3;
      const bx = r * t;
      const bl = r * 0.35 * (1 - t * 0.4);
      for (const side of [-1, 1]) {
        ctx.save();
        ctx.translate(bx, 0);
        ctx.rotate(side * Math.PI * 0.28);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(bl, 0);
        ctx.stroke();
        ctx.restore();
      }
    }
    ctx.restore();
  }

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export function buildIce(): THREE.Group {
  // Donut group with fixed upright tilt. The spinner (parent) rotates on
  // world Y; this group's tilt makes the donut stand upright.
  const donutGroup = new THREE.Group();

  // ---- Ice dough ----
  const iceDoughMat = new THREE.MeshPhysicalMaterial({
    color: 0xaaddff,
    roughness: 0.08,
    transmission: 0.9,
    thickness: 1.4,
    ior: 1.31,
    clearcoat: 1.0,
    clearcoatRoughness: 0.05,
    envMapIntensity: 1.6,
    transparent: true,
    attenuationColor: new THREE.Color(0xaaddff),
    attenuationDistance: 2.4,
  });
  donutGroup.add(new THREE.Mesh(makeIceDoughGeo(), iceDoughMat));

  // ---- Ice frosting ----
  const iceFrostingMat = new THREE.MeshPhysicalMaterial({
    color: 0xeaf6ff,
    roughness: 0.04,
    transmission: 0.92,
    thickness: 1.2,
    ior: 1.33,
    clearcoat: 1.0,
    clearcoatRoughness: 0.02,
    envMapIntensity: 2.0,
    transparent: true,
    side: THREE.DoubleSide,
    attenuationColor: new THREE.Color(0xe8f4ff),
    attenuationDistance: 4.0,
  });
  donutGroup.add(new THREE.Mesh(makeIceFrostingGeo(5), iceFrostingMat));

  // ---- Ice cube material (shared) ----
  const iceCubeMat = new THREE.MeshPhysicalMaterial({
    color: 0xeaf6ff,
    roughness: 0.06,
    transmission: 0.92,
    thickness: 0.7,
    ior: 1.31,
    clearcoat: 1.0,
    clearcoatRoughness: 0.03,
    envMapIntensity: 2.2,
    transparent: true,
    attenuationColor: new THREE.Color(0xaaddff),
    attenuationDistance: 2.0,
  });

  // ---- Stacked ice cubes on the frosting (3 tiers) ----
  const tiers = [
    { count: 16, sizeBase: 0.11, lift: 0, sizeLift: 0.4 },
    { count: 11, sizeBase: 0.095, lift: 0.13, sizeLift: 0.3 },
    { count: 5, sizeBase: 0.085, lift: 0.24, sizeLift: 0.25 },
  ];

  const bobbingCubes: THREE.Mesh[] = [];

  for (const tier of tiers) {
    for (let i = 0; i < tier.count; i++) {
      const angle =
        (i / tier.count) * Math.PI * 2 + (Math.random() - 0.5) * 0.2;
      const radialT = 0.25 + Math.random() * 0.5;
      const ringR = INNER_R + (OUTER_R - INNER_R) * radialT;
      const arc = Math.sin(radialT * Math.PI);
      const surfaceY = TOP_Y + 0.13 * arc * 0.9;

      const size = tier.sizeBase * (0.85 + Math.random() * 0.35);
      const cube = new THREE.Mesh(makeRoundedCubeGeo(size, 4), iceCubeMat);
      cube.position.set(
        Math.cos(angle) * ringR,
        surfaceY + tier.lift + size * tier.sizeLift,
        Math.sin(angle) * ringR
      );
      cube.rotation.set(
        Math.random() * 6,
        Math.random() * 6,
        Math.random() * 6
      );

      cube.userData = {
        baseY: cube.position.y,
        bobAmp: 0.008 + Math.random() * 0.015,
        bobSpeed: 0.5 + Math.random() * 0.7,
        bobPhase: Math.random() * Math.PI * 2,
        spinX: (Math.random() - 0.5) * 0.3,
        spinY: (Math.random() - 0.5) * 0.3,
        spinZ: (Math.random() - 0.5) * 0.3,
      };

      donutGroup.add(cube);
      bobbingCubes.push(cube);
    }
  }

  // ---- Floating ice cubes (orbit) ----
  const orbitGroup = new THREE.Group();
  for (let i = 0; i < 12; i++) {
    const size = 0.07 + Math.random() * 0.05;
    const cube = new THREE.Mesh(makeRoundedCubeGeo(size, 4), iceCubeMat);

    const theta = (i / 12) * Math.PI * 2 + Math.random() * 0.5;
    const phi = (Math.random() - 0.5) * Math.PI * 0.55;
    const radius = 1.6 + Math.random() * 0.7;

    cube.position.set(
      Math.cos(theta) * Math.cos(phi) * radius,
      Math.sin(phi) * radius,
      Math.sin(theta) * Math.cos(phi) * radius
    );

    cube.userData = {
      theta,
      phi,
      radius,
      speed: 0.08 + Math.random() * 0.14,
      spinX: (Math.random() - 0.5) * 0.9,
      spinY: (Math.random() - 0.5) * 0.9,
      spinZ: (Math.random() - 0.5) * 0.9,
    };

    orbitGroup.add(cube);
  }
  orbitGroup.name = 'ice-orbit';
  donutGroup.add(orbitGroup);

  // Tag the bobbing cubes group
  const bobbingGroup = new THREE.Group();
  for (const c of bobbingCubes) {
    donutGroup.remove(c);
    bobbingGroup.add(c);
  }
  bobbingGroup.name = 'ice-bobbing';
  donutGroup.add(bobbingGroup);

  // ---- Snowflakes ----
  const flakeTex = makeSnowflakeTex();
  const flakeGroup = new THREE.Group();
  for (let i = 0; i < 60; i++) {
    const mat = new THREE.SpriteMaterial({
      map: flakeTex,
      color: 0xddeeff,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: 0.7 + Math.random() * 0.3,
    });
    const sprite = new THREE.Sprite(mat);

    const theta = Math.random() * Math.PI * 2;
    const phi = (Math.random() - 0.5) * Math.PI;
    const r = 2.5 + Math.random() * 3.5;

    sprite.position.set(
      Math.cos(theta) * Math.cos(phi) * r,
      Math.sin(phi) * r * 0.7,
      Math.sin(theta) * Math.cos(phi) * r
    );

    const size = 0.12 + Math.random() * 0.22;
    sprite.scale.set(size, size, 1);

    sprite.userData = {
      baseY: sprite.position.y,
      bobAmp: 0.15 + Math.random() * 0.3,
      bobSpeed: 0.2 + Math.random() * 0.5,
      bobPhase: Math.random() * Math.PI * 2,
      twinkleSpeed: 0.6 + Math.random() * 1.5,
      twinklePhase: Math.random() * Math.PI * 2,
      baseOpacity: mat.opacity,
    };

    flakeGroup.add(sprite);
  }
  flakeGroup.name = 'ice-flakes';
  donutGroup.add(flakeGroup);

  return donutGroup;
}

export function animateIce(
  root: THREE.Group,
  elapsed: number,
  dt: number
): void {
  const bobbing = root.getObjectByName('ice-bobbing');
  if (bobbing) {
    for (const c of bobbing.children) {
      const u = c.userData;
      c.position.y =
        u.baseY + Math.sin(elapsed * u.bobSpeed + u.bobPhase) * u.bobAmp;
      c.rotation.x += u.spinX * dt;
      c.rotation.y += u.spinY * dt;
      c.rotation.z += u.spinZ * dt;
    }
  }

  const orbit = root.getObjectByName('ice-orbit');
  if (orbit) {
    for (const c of orbit.children) {
      const u = c.userData;
      const a = u.theta + elapsed * u.speed;
      c.position.set(
        Math.cos(a) * Math.cos(u.phi) * u.radius,
        Math.sin(u.phi) * u.radius,
        Math.sin(a) * Math.cos(u.phi) * u.radius
      );
      c.rotation.x += u.spinX * dt;
      c.rotation.y += u.spinY * dt;
      c.rotation.z += u.spinZ * dt;
    }
  }

  const flakes = root.getObjectByName('ice-flakes');
  if (flakes) {
    for (const s of flakes.children) {
      const sprite = s as THREE.Sprite;
      const u = sprite.userData;
      sprite.position.y =
        u.baseY + Math.sin(elapsed * u.bobSpeed + u.bobPhase) * u.bobAmp;
      const twinkle =
        0.6 + 0.4 * Math.sin(elapsed * u.twinkleSpeed + u.twinklePhase);
      (sprite.material as THREE.SpriteMaterial).opacity =
        u.baseOpacity * twinkle;
    }
  }
}
