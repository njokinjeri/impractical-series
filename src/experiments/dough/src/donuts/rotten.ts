import * as THREE from "three";

const R = 1.0;
const TUBE = 0.44;
const DOUGH_FLAT = 0.82;
const INNER_R = R - TUBE;
const OUTER_R = R + TUBE;
const TOP_Y = TUBE * DOUGH_FLAT;

// ---- Mirrors makeRottenFrostingGeo so moss/mushrooms land correctly ----
function frostingSurfaceAt(theta: number, radialT: number): { r: number; y: number } {
  const domeH = 0.07;
  const edgeT = 0.08;

  const x = INNER_R + (OUTER_R - INNER_R) * radialT;
  const arc = Math.sin(radialT * Math.PI);
  const wobble =
    Math.sin(radialT * 12) * 0.018 +
    Math.cos(radialT * 18 + 0.5) * 0.012 +
    Math.sin(radialT * 25) * 0.008 +
    Math.sin(radialT * 37 + 1.2) * 0.006;
  const y = TOP_Y + domeH * arc + wobble + edgeT * (1 - radialT) * 0.3;

  const cx = Math.cos(theta) * x;
  const cy = y;
  const cz = Math.sin(theta) * x;
  const n1 = Math.sin(cx * 5.3 + 0.7) * Math.cos(cy * 4.1) * Math.sin(cz * 5.8) * 0.5;
  const n2 = Math.sin(cx * 12 + 1.5) * Math.cos(cz * 11 + 0.3) * 0.3;
  const n3 = Math.sin(cx * 22) * Math.cos(cy * 18) * Math.sin(cz * 20) * 0.15;
  const combined = n1 + n2 + n3;
  const scale = 1 + combined * 0.06;

  return { r: x * scale, y: y * scale };
}

// ---- Rotten dough (deformed, vertex-colored) ----
function makeRottenDoughGeo(): THREE.BufferGeometry {
  const geo = new THREE.TorusGeometry(R, TUBE, 96, 192);
  geo.rotateX(Math.PI / 2);
  geo.scale(1, DOUGH_FLAT, 1);

  const pos = geo.attributes.position;
  const v = new THREE.Vector3();
  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i);
    const n =
      Math.sin(v.x * 3.2) * Math.cos(v.y * 2.8) * Math.sin(v.z * 3.6) * 0.8 +
      Math.sin(v.x * 7.5 + 1.3) * Math.cos(v.z * 6.2) * 0.4 +
      Math.sin(v.y * 11 + 2.1) * 0.25;
    v.multiplyScalar(1 + n * 0.09);
    pos.setXYZ(i, v.x, v.y, v.z);
  }
  pos.needsUpdate = true;
  geo.computeVertexNormals();

  // Vertex color the rot
  const colors = new Float32Array(pos.count * 3);
  const darkRot = new THREE.Color(0x1a0e05);
  const brown = new THREE.Color(0x4a2a12);
  const paleDough = new THREE.Color(0x8a5a2a);
  const moldGreen = new THREE.Color(0x4a5a25);
  const sickYellow = new THREE.Color(0x7a6a30);
  const tmp = new THREE.Color();

  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i);
    const noise =
      Math.sin(v.x * 4.1) * Math.cos(v.y * 3.5) * Math.sin(v.z * 4.8) * 0.5 +
      Math.sin(v.x * 9.2 + 1.1) * Math.cos(v.z * 8.3 + 0.5) * 0.3 +
      Math.sin(v.y * 15) * 0.2;
    const n = (noise + 1) * 0.5;

    if (n < 0.20) tmp.copy(darkRot);
    else if (n < 0.40) tmp.copy(darkRot).lerp(brown, (n - 0.20) / 0.20);
    else if (n < 0.60) tmp.copy(brown).lerp(paleDough, (n - 0.40) / 0.20);
    else if (n < 0.80) tmp.copy(paleDough).lerp(moldGreen, (n - 0.60) / 0.20);
    else tmp.copy(moldGreen).lerp(sickYellow, (n - 0.80) / 0.20);

    colors[i * 3] = tmp.r;
    colors[i * 3 + 1] = tmp.g;
    colors[i * 3 + 2] = tmp.b;
  }
  geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  return geo;
}

// ---- Rotten frosting (lathe with wobble + drips + vertex color) ----
function makeRottenFrostingGeo(dripCount = 6): THREE.BufferGeometry {
  const points: THREE.Vector2[] = [];
  const domeH = 0.07;
  const edgeT = 0.08;

  points.push(new THREE.Vector2(INNER_R + 0.05, TOP_Y * 0.35));

  const domeSteps = 18;
  for (let i = 0; i <= domeSteps; i++) {
    const t = i / domeSteps;
    const x = INNER_R + (OUTER_R - INNER_R) * t;
    const arc = Math.sin(t * Math.PI);
    const wobble =
      Math.sin(t * 12) * 0.018 +
      Math.cos(t * 18 + 0.5) * 0.012 +
      Math.sin(t * 25) * 0.008 +
      Math.sin(t * 37 + 1.2) * 0.006;
    points.push(new THREE.Vector2(x, TOP_Y + domeH * arc + wobble + edgeT * (1 - t) * 0.3));
  }

  const overhang = 0.10;
  const lipSteps = 5;
  for (let i = 0; i <= lipSteps; i++) {
    const t = i / lipSteps;
    const lipVar = 1 + Math.sin(t * 8) * 0.25;
    const x = OUTER_R + overhang * Math.sin(t * Math.PI * 0.5) * lipVar;
    points.push(new THREE.Vector2(x, TOP_Y - edgeT * t));
  }

  const undersideSteps = 14;
  for (let i = 0; i <= undersideSteps; i++) {
    const t = i / undersideSteps;
    const x = (OUTER_R + overhang) - ((OUTER_R + overhang) - INNER_R) * t;
    const sag = Math.sin(t * 11) * 0.015;
    points.push(new THREE.Vector2(x, TOP_Y * 0.35 - 0.02 * Math.sin(t * Math.PI) + sag));
  }

  const geo = new THREE.LatheGeometry(points, 160);

  const pos = geo.attributes.position;
  const v = new THREE.Vector3();

  // Surface wobble
  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i);
    const n1 = Math.sin(v.x * 5.3 + 0.7) * Math.cos(v.y * 4.1) * Math.sin(v.z * 5.8) * 0.5;
    const n2 = Math.sin(v.x * 12 + 1.5) * Math.cos(v.z * 11 + 0.3) * 0.3;
    const n3 = Math.sin(v.x * 22) * Math.cos(v.y * 18) * Math.sin(v.z * 20) * 0.15;
    const combined = n1 + n2 + n3;
    v.multiplyScalar(1 + combined * 0.06);
    pos.setXYZ(i, v.x, v.y, v.z);
  }

  // Drips
  const dripAngles: number[] = [];
  const dripStrengths: number[] = [];
  for (let i = 0; i < dripCount; i++) {
    dripAngles.push(Math.random() * Math.PI * 2);
    dripStrengths.push(0.6 + Math.random() * 1.2);
  }

  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i);
    const dist = Math.sqrt(v.x * v.x + v.z * v.z);
    if (dist < OUTER_R - 0.05) continue;
    const angle = Math.atan2(v.z, v.x);
    let dripBoost = 0;
    for (let d = 0; d < dripAngles.length; d++) {
      const da = dripAngles[d];
      const ds = dripStrengths[d];
      const diff = Math.abs(((angle - da + Math.PI * 3) % (Math.PI * 2)) - Math.PI);
      if (diff < 0.32) dripBoost = Math.max(dripBoost, (1 - diff / 0.32) * ds);
    }
    if (dripBoost > 0) {
      const belowTop = TOP_Y - v.y;
      if (belowTop > 0) {
        v.y -= dripBoost * 0.42 * Math.min(1, belowTop / edgeT);
        pos.setXYZ(i, v.x, v.y, v.z);
      }
    }
  }

  pos.needsUpdate = true;
  geo.computeVertexNormals();

  // Vertex color the frosting
  const colors = new Float32Array(pos.count * 3);
  const baseGreen = new THREE.Color(0x556624);
  const darkRot = new THREE.Color(0x1a1a08);
  const brown = new THREE.Color(0x3a2810);
  const paleYellow = new THREE.Color(0x8a8040);
  const tmp = new THREE.Color();

  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i);
    const noise =
      Math.sin(v.x * 6.2 + v.z * 3.1) * Math.cos(v.y * 5.1) * Math.sin(v.z * 6.8) * 0.5 +
      Math.cos(v.x * 14 + 2.1) * Math.sin(v.z * 12 + 1.5) * 0.35 +
      Math.sin(v.x * 30 + v.z * 22) * 0.15;
    const n = (noise + 1) * 0.5;

    if (n < 0.25) tmp.copy(darkRot);
    else if (n < 0.50) tmp.copy(darkRot).lerp(brown, (n - 0.25) / 0.25);
    else if (n < 0.75) tmp.copy(brown).lerp(baseGreen, (n - 0.50) / 0.25);
    else tmp.copy(baseGreen).lerp(paleYellow, (n - 0.75) / 0.25);

    colors[i * 3] = tmp.r;
    colors[i * 3 + 1] = tmp.g;
    colors[i * 3 + 2] = tmp.b;
  }
  geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

  return geo;
}

// ---- Moss clump (same as relic, but with the base pushed into the frosting) ----
function makeMossClump(
  centerPos: THREE.Vector3,
  normal: THREE.Vector3,
  patchRadius: number,
  strandCount: number,
): THREE.Group {
  const group = new THREE.Group();

  const strandGeo = new THREE.CylinderGeometry(0.011, 0.006, 0.03, 4, 1);
  strandGeo.translate(0, 0.015, 0);

  const strandMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.9,
  });

  const inst = new THREE.InstancedMesh(strandGeo, strandMat, strandCount);
  inst.instanceColor = new THREE.InstancedBufferAttribute(
    new Float32Array(strandCount * 3),
    3,
  );

  const dummy = new THREE.Object3D();

  const paleGreen = new THREE.Color(0x9aba55);
  const midGreen = new THREE.Color(0x6a8a35);
  const darkGreen = new THREE.Color(0x3a4a1a);
  const yellowGreen = new THREE.Color(0xaab060);
  const tmpColor = new THREE.Color();

  const up = normal.clone().normalize();
  let tangent = new THREE.Vector3(1, 0, 0);
  if (Math.abs(up.x) > 0.9) tangent = new THREE.Vector3(0, 1, 0);
  const right = new THREE.Vector3().crossVectors(up, tangent).normalize();
  const fwd = new THREE.Vector3().crossVectors(up, right).normalize();

  for (let i = 0; i < strandCount; i++) {
    const ang = Math.random() * Math.PI * 2;
    const rad = Math.sqrt(Math.random()) * patchRadius;
    const offset = right.clone().multiplyScalar(Math.cos(ang) * rad)
      .add(fwd.clone().multiplyScalar(Math.sin(ang) * rad));

    // Push base into the frosting so strands attach properly
    const startPos = centerPos.clone().add(offset).addScaledVector(up, -0.02);

    dummy.position.copy(startPos);
    const q = new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      up,
    );
    const tilt = new THREE.Quaternion().setFromEuler(new THREE.Euler(
      (Math.random() - 0.5) * 1.1,
      (Math.random() - 0.5) * 1.1,
      (Math.random() - 0.5) * 1.1,
    ));
    q.multiply(tilt);
    dummy.quaternion.copy(q);
    dummy.scale.set(
      0.7 + Math.random() * 0.8,
      0.5 + Math.random() * 0.8,
      0.7 + Math.random() * 0.8,
    );
    dummy.updateMatrix();
    inst.setMatrixAt(i, dummy.matrix);

    const r = Math.random();
    if (r < 0.35) tmpColor.copy(paleGreen);
    else if (r < 0.7) tmpColor.copy(midGreen);
    else if (r < 0.9) tmpColor.copy(darkGreen);
    else tmpColor.copy(yellowGreen);
    tmpColor.lerp(paleGreen, Math.random() * 0.3);
    inst.setColorAt(i, tmpColor);
  }
  inst.instanceMatrix.needsUpdate = true;
  if (inst.instanceColor) inst.instanceColor.needsUpdate = true;

  group.add(inst);
  return group;
}

// ---- Mushroom ----
function makeMushroom(scale: number): THREE.Group {
  const g = new THREE.Group();

  const stemMat = new THREE.MeshStandardMaterial({
    color: 0xe8dcc0,
    roughness: 0.85,
  });
  const stem = new THREE.Mesh(
    new THREE.CylinderGeometry(0.012 * scale, 0.018 * scale, 0.06 * scale, 8),
    stemMat,
  );
  stem.position.y = 0.03 * scale;
  g.add(stem);

  const capMat = new THREE.MeshStandardMaterial({
    color: 0x8a7a5a,
    roughness: 0.7,
  });
  const capGeo = new THREE.SphereGeometry(
    0.035 * scale, 16, 12, 0, Math.PI * 2, 0, Math.PI * 0.55,
  );
  const cap = new THREE.Mesh(capGeo, capMat);
  cap.position.y = 0.06 * scale;
  g.add(cap);

  g.rotation.z = (Math.random() - 0.5) * 0.4;
  return g;
}

export function buildRotten(): THREE.Group {
  const root = new THREE.Group();

  // ---- Rotten dough ----
  const doughGeo = makeRottenDoughGeo();
  root.add(new THREE.Mesh(
    doughGeo,
    new THREE.MeshPhysicalMaterial({
      vertexColors: true,
      roughness: 0.95,
      metalness: 0.0,
      envMapIntensity: 0.5,
    }),
  ));

  // ---- Rotten frosting ----
  const frostingGeo = makeRottenFrostingGeo(6);
  root.add(new THREE.Mesh(
    frostingGeo,
    new THREE.MeshPhysicalMaterial({
      vertexColors: true,
      roughness: 0.65,
      metalness: 0.0,
      clearcoat: 0.35,
      clearcoatRoughness: 0.55,
      side: THREE.DoubleSide,
      envMapIntensity: 0.5,
    }),
  ));

  // ---- Moss patches ----
const mossPatches: Array<{ theta: number; radialT: number; radius: number; strands: number }> = [
  { theta: 0.3, radialT: 0.35, radius: 0.28, strands: 300 },
  { theta: 0.9, radialT: 0.55, radius: 0.22, strands: 240 },
  { theta: 1.6, radialT: 0.40, radius: 0.26, strands: 260 },
  { theta: 2.3, radialT: 0.60, radius: 0.20, strands: 220 },
  { theta: 2.9, radialT: 0.30, radius: 0.24, strands: 250 },
  { theta: 3.5, radialT: 0.50, radius: 0.22, strands: 230 },
  { theta: 4.1, radialT: 0.55, radius: 0.26, strands: 260 },
  { theta: 4.7, radialT: 0.35, radius: 0.22, strands: 220 },
  { theta: 5.3, radialT: 0.50, radius: 0.28, strands: 280 },
  { theta: 5.9, radialT: 0.45, radius: 0.22, strands: 230 },
  // New — fill in the gaps between the original patches
  { theta: 0.6, radialT: 0.55, radius: 0.20, strands: 200 },
  { theta: 1.2, radialT: 0.35, radius: 0.24, strands: 220 },
  { theta: 1.9, radialT: 0.50, radius: 0.22, strands: 210 },
  { theta: 2.6, radialT: 0.45, radius: 0.26, strands: 240 },
  { theta: 3.2, radialT: 0.40, radius: 0.22, strands: 220 },
  { theta: 3.8, radialT: 0.55, radius: 0.24, strands: 230 },
  { theta: 4.4, radialT: 0.40, radius: 0.22, strands: 210 },
  { theta: 5.6, radialT: 0.55, radius: 0.24, strands: 240 },
];

  for (const p of mossPatches) {
    const surf = frostingSurfaceAt(p.theta, p.radialT);
    const cx = Math.cos(p.theta) * surf.r;
    const cz = Math.sin(p.theta) * surf.r;
    const cy = surf.y;

    const nx = Math.cos(p.theta) * Math.cos(p.radialT * Math.PI);
    const ny = Math.sin(p.radialT * Math.PI);
    const nz = Math.sin(p.theta) * Math.cos(p.radialT * Math.PI);
    const normal = new THREE.Vector3(nx, ny, nz).normalize();

    root.add(makeMossClump(new THREE.Vector3(cx, cy, cz), normal, p.radius, p.strands));
  }

  // ---- Mushrooms ----
const mushroomPositions = [
  { theta: 0.8, radialT: 0.7, scale: 1.2 },
  { theta: 2.4, radialT: 0.75, scale: 0.9 },
  { theta: 3.4, radialT: 0.65, scale: 1.4 },
  { theta: 5.0, radialT: 0.72, scale: 1.0 },
  { theta: 5.9, radialT: 0.68, scale: 1.1 },
  { theta: 1.2, radialT: 0.5, scale: 0.7 },
  // New
  { theta: 0.1, radialT: 0.65, scale: 0.85 },
  { theta: 1.8, radialT: 0.7, scale: 1.0 },
  { theta: 4.2, radialT: 0.68, scale: 0.95 },
  { theta: 5.3, radialT: 0.6, scale: 1.15 },
];

  for (const mp of mushroomPositions) {
    const surf = frostingSurfaceAt(mp.theta, mp.radialT);
    const cx = Math.cos(mp.theta) * surf.r;
    const cz = Math.sin(mp.theta) * surf.r;
    const cy = surf.y;

    const m = makeMushroom(mp.scale);
    m.position.set(cx, cy, cz);
    m.rotation.y = Math.random() * Math.PI * 2;
    root.add(m);
  }

  // ---- Dark rot spots on the dough ----
  const spotMat = new THREE.MeshStandardMaterial({
    color: 0x0a0602,
    roughness: 0.95,
  });

  for (let i = 0; i < 16; i++) {
    const theta = Math.random() * Math.PI * 2;
    const tubeAngle = Math.random() * Math.PI * 2;

    const cx = Math.cos(theta) * (R + TUBE * Math.cos(tubeAngle));
    const cy = Math.sin(tubeAngle) * TUBE * DOUGH_FLAT;
    const cz = Math.sin(theta) * (R + TUBE * Math.cos(tubeAngle));

    const nx = Math.cos(theta) * Math.cos(tubeAngle);
    const ny = Math.sin(tubeAngle);
    const nz = Math.sin(theta) * Math.cos(tubeAngle);

    const spot = new THREE.Mesh(
      new THREE.CircleGeometry(0.04 + Math.random() * 0.07, 14),
      spotMat,
    );
    spot.position.set(cx + nx * 0.008, cy + ny * 0.008, cz + nz * 0.008);
    spot.lookAt(spot.position.clone().add(new THREE.Vector3(nx, ny, nz)));
    root.add(spot);
  }

  // ---- Floating crumbs ----
  const crumbMat = new THREE.MeshStandardMaterial({
    color: 0x2a1a08,
    roughness: 0.9,
  });

  const crumbGroup = new THREE.Group();
  for (let i = 0; i < 40; i++) {
    const size = 0.02 + Math.random() * 0.035;
    const geo = Math.random() < 0.5
      ? new THREE.TetrahedronGeometry(size, 0)
      : new THREE.BoxGeometry(size, size * 0.6, size * 0.8);

    const crumb = new THREE.Mesh(geo, crumbMat);

    const theta = Math.random() * Math.PI * 2;
    const phi = (Math.random() - 0.5) * Math.PI;
    const r = 1.4 + Math.random() * 1.7;

    crumb.position.set(
      Math.cos(theta) * Math.cos(phi) * r,
      Math.sin(phi) * r * 0.7,
      Math.sin(theta) * Math.cos(phi) * r,
    );
    crumb.rotation.set(Math.random() * 6, Math.random() * 6, Math.random() * 6);

    crumb.userData = {
      baseY: crumb.position.y,
      bobAmp: 0.05 + Math.random() * 0.10,
      bobSpeed: 0.3 + Math.random() * 0.7,
      bobPhase: Math.random() * Math.PI * 2,
      spinX: (Math.random() - 0.5) * 0.7,
      spinY: (Math.random() - 0.5) * 0.7,
      spinZ: (Math.random() - 0.5) * 0.7,
    };

    crumbGroup.add(crumb);
  }
  crumbGroup.name = "rotten-crumbs";
  root.add(crumbGroup);

  return root;
}

export function animateRotten(root: THREE.Group, elapsed: number, dt: number): void {
  const crumbs = root.getObjectByName("rotten-crumbs");
  if (!crumbs) return;

  for (const c of crumbs.children) {
    const u = c.userData;
    c.position.y = u.baseY + Math.sin(elapsed * u.bobSpeed + u.bobPhase) * u.bobAmp;
    c.rotation.x += u.spinX * dt;
    c.rotation.y += u.spinY * dt;
    c.rotation.z += u.spinZ * dt;
  }
}