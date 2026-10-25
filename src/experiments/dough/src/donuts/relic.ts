import * as THREE from "three";

const R = 1.05;
const TUBE = 0.40;
const DOUGH_FLAT = 0.85;

// ---- Rock geometry with controlled jitter ----
function makeRockGeometry(size: number, seed: number): THREE.BufferGeometry {
  const geo = new THREE.IcosahedronGeometry(size, 1);

  const rnd = (i: number): number => {
    const s = Math.sin(seed * 12.9898 + i * 78.233) * 43758.5453;
    return s - Math.floor(s);
  };

  const pos = geo.attributes.position;
  const v = new THREE.Vector3();
  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i);
    const jitter = 1 + (rnd(i) - 0.5) * 0.22;
    v.multiplyScalar(jitter);
    v.y *= 0.85;
    pos.setXYZ(i, v.x, v.y, v.z);
  }
  pos.needsUpdate = true;
  geo.computeVertexNormals();
  return geo;
}

// ---- Procedural stone/bark texture ----
function makeStoneTexture(seed: number, isBark: boolean): THREE.CanvasTexture {
  const size = 256;
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const ctx = c.getContext("2d")!;

  const rnd = (i: number): number => {
    const s = Math.sin(seed * 12.9898 + i * 78.233) * 43758.5453;
    return s - Math.floor(s);
  };

  if (isBark) {
    ctx.fillStyle = `hsl(22, 40%, ${18 + rnd(0) * 8}%)`;
    ctx.fillRect(0, 0, size, size);

    for (let i = 0; i < 100; i++) {
      const x = rnd(i) * size;
      const y = rnd(i + 500) * size;
      const h = 30 + rnd(i + 100) * 90;
      const w = 1 + rnd(i + 200) * 3;
      const lightness = 8 + rnd(i + 300) * 20;
      ctx.fillStyle = `hsl(22, 45%, ${lightness}%)`;
      ctx.fillRect(x, y, w, h);
    }

    for (let i = 0; i < 25; i++) {
      ctx.strokeStyle = `hsl(22, 45%, ${4 + rnd(i + 400) * 8}%)`;
      ctx.lineWidth = 1 + rnd(i + 600) * 2;
      ctx.beginPath();
      let curX = rnd(i + 700) * size;
      ctx.moveTo(curX, 0);
      for (let y = 0; y < size; y += 8) {
        curX += (rnd(y + i * 10) - 0.5) * 10;
        ctx.lineTo(curX, y);
      }
      ctx.stroke();
    }
  } else {
    ctx.fillStyle = `hsl(30, 8%, ${42 + rnd(0) * 10}%)`;
    ctx.fillRect(0, 0, size, size);

    for (let i = 0; i < 250; i++) {
      const x = rnd(i) * size;
      const y = rnd(i + 500) * size;
      const r = 3 + rnd(i + 100) * 25;
      const lightness = 30 + rnd(i + 200) * 35;
      ctx.fillStyle = `hsl(28, 8%, ${lightness}%)`;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }

    for (let i = 0; i < 600; i++) {
      const x = rnd(i + 700) * size;
      const y = rnd(i + 800) * size;
      const r = 0.5 + rnd(i + 900) * 1.5;
      ctx.fillStyle = `hsla(20, 15%, ${12 + rnd(i + 1000) * 15}%, 0.7)`;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  return tex;
}

// ---- Moss clump (instanced cylinders) ----
function makeMossClump(
  centerPos: THREE.Vector3,
  normal: THREE.Vector3,
  patchRadius: number,
  strandCount: number,
): THREE.Group {
  const group = new THREE.Group();

  const strandGeo = new THREE.CylinderGeometry(0.016, 0.012, 0.018, 5, 1);
  strandGeo.translate(0, 0.009, 0);

  const strandMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.95,
  });

  const inst = new THREE.InstancedMesh(strandGeo, strandMat, strandCount);
  inst.instanceColor = new THREE.InstancedBufferAttribute(
    new Float32Array(strandCount * 3),
    3,
  );

  const dummy = new THREE.Object3D();
  const paleGreen = new THREE.Color(0x7a9450);
  const midGreen = new THREE.Color(0x4a6a2a);
  const darkGreen = new THREE.Color(0x1e2a10);
  const tmpColor = new THREE.Color();

  const up = normal.clone().normalize();
  let tangent = new THREE.Vector3(0, 1, 0);
  if (Math.abs(up.y) > 0.9) tangent = new THREE.Vector3(1, 0, 0);
  const right = new THREE.Vector3().crossVectors(up, tangent).normalize();
  const fwd = new THREE.Vector3().crossVectors(up, right).normalize();

  for (let i = 0; i < strandCount; i++) {
    const ang = Math.random() * Math.PI * 2;
    const rad = Math.sqrt(Math.random()) * patchRadius;
    const offset = right.clone().multiplyScalar(Math.cos(ang) * rad)
      .add(fwd.clone().multiplyScalar(Math.sin(ang) * rad));

    const startPos = centerPos.clone().add(offset);

    dummy.position.copy(startPos);
    const q = new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      up,
    );
    const tilt = new THREE.Quaternion().setFromEuler(new THREE.Euler(
      (Math.random() - 0.5) * 1.2,
      (Math.random() - 0.5) * 1.2,
      (Math.random() - 0.5) * 1.2,
    ));
    q.multiply(tilt);
    dummy.quaternion.copy(q);
    dummy.scale.set(
      0.8 + Math.random() * 0.5,
      0.5 + Math.random() * 0.6,
      0.8 + Math.random() * 0.5,
    );
    dummy.updateMatrix();
    inst.setMatrixAt(i, dummy.matrix);

    const r = Math.random();
    if (r < 0.3) tmpColor.copy(paleGreen);
    else if (r < 0.75) tmpColor.copy(midGreen);
    else tmpColor.copy(darkGreen);
    tmpColor.lerp(paleGreen, Math.random() * 0.25);
    inst.setColorAt(i, tmpColor);
  }
  inst.instanceMatrix.needsUpdate = true;
  if (inst.instanceColor) inst.instanceColor.needsUpdate = true;

  group.add(inst);
  return group;
}

export function buildRelic(): THREE.Group {
  const root = new THREE.Group();

  // ---- Rock ring (22 stones) ----
  const stoneTextures = [0, 1, 2, 3].map((i) => makeStoneTexture(i * 37 + 1, false));
  const barkTextures = [0, 1, 2].map((i) => makeStoneTexture(i * 53 + 500, true));

  const RING_STEPS = 22;
  const angleStep = (Math.PI * 2) / RING_STEPS;

  for (let i = 0; i < RING_STEPS; i++) {
    const ringAngle = i * angleStep;
    const isBark = Math.random() < 0.28;

    const rockW = 0.42 + Math.random() * 0.10;
    const rockH = TUBE * 2 + Math.random() * 0.10;
    const rockD = 0.40 + Math.random() * 0.10;

    const cx = Math.cos(ringAngle) * R;
    const cy = (Math.random() - 0.5) * 0.06;
    const cz = Math.sin(ringAngle) * R;

    const geo = makeRockGeometry(0.5, i * 17.3 + 1);
    geo.scale(rockW / 0.5, rockH / 0.5 / 1.5, rockD / 0.5);

    const texSet = isBark ? barkTextures : stoneTextures;
    const tex = texSet[i % texSet.length];
    const clonedTex = tex.clone();
    clonedTex.needsUpdate = true;

    const tone = 0.85 + Math.random() * 0.30;
    const baseColor = new THREE.Color(isBark ? 0x9a7a5a : 0xc8c0b0);
    baseColor.multiplyScalar(tone);

    const mat = new THREE.MeshPhysicalMaterial({
      map: clonedTex,
      color: baseColor,
      roughness: isBark ? 0.95 : 0.88,
      metalness: 0.0,
      clearcoat: 0.0,
      envMapIntensity: 0.6,
    });

    const block = new THREE.Mesh(geo, mat);
    block.position.set(cx, cy, cz);
    block.lookAt(new THREE.Vector3(0, cy, 0));
    block.rotateY(Math.PI / 2);
    block.rotation.x += (Math.random() - 0.5) * 0.35;
    block.rotation.y += (Math.random() - 0.5) * 0.35;
    block.rotation.z += (Math.random() - 0.5) * 0.35;

    block.castShadow = true;
    block.receiveShadow = true;

    root.add(block);
  }

  // ---- Moss zones (5 zones, 3-5 patches each) ----
  const MOSS_ZONES = 5;
  for (let z = 0; z < MOSS_ZONES; z++) {
    const zoneCenter = (z / MOSS_ZONES) * Math.PI * 2 + Math.random() * 0.4;
    const patchesInZone = 3 + Math.floor(Math.random() * 3);

    for (let p = 0; p < patchesInZone; p++) {
      const ringAngle = zoneCenter + (Math.random() - 0.5) * 1.0;
      const tubeAngle = (Math.random() - 0.5) * Math.PI * 1.1;

      const cosT = Math.cos(tubeAngle);
      const sinT = Math.sin(tubeAngle);

      const cx = Math.cos(ringAngle) * (R + TUBE * 0.85 * cosT);
      const cy = sinT * TUBE * DOUGH_FLAT;
      const cz = Math.sin(ringAngle) * (R + TUBE * 0.85 * cosT);

      const nx = Math.cos(ringAngle) * cosT;
      const ny = sinT;
      const nz = Math.sin(ringAngle) * cosT;
      const normal = new THREE.Vector3(nx, ny, nz).normalize();

      const patchRadius = 0.10 + Math.random() * 0.08;
      const strandCount = 60 + Math.floor(Math.random() * 60);

      const patch = makeMossClump(
        new THREE.Vector3(cx, cy, cz),
        normal,
        patchRadius,
        strandCount,
      );
      root.add(patch);
    }
  }

  // ---- Floating rock chips ----
  const chipMat = new THREE.MeshStandardMaterial({
    color: 0x9a8a70,
    roughness: 0.9,
    metalness: 0.0,
  });

  const chipGroup = new THREE.Group();
  for (let i = 0; i < 8; i++) {
    const size = 0.05 + Math.random() * 0.06;
    const geo = makeRockGeometry(size, i * 33.7);
    const chip = new THREE.Mesh(geo, chipMat);

    const theta = Math.random() * Math.PI * 2;
    const phi = (Math.random() - 0.5) * Math.PI;
    const r = 1.7 + Math.random() * 1.2;

    chip.position.set(
      Math.cos(theta) * Math.cos(phi) * r,
      Math.sin(phi) * r * 0.85,
      Math.sin(theta) * Math.cos(phi) * r,
    );
    chip.rotation.set(Math.random() * 6, Math.random() * 6, Math.random() * 6);

    chip.userData = {
      orbitSpeed: 0.04 + Math.random() * 0.1,
      orbitPhase: theta,
      orbitPhi: phi,
      orbitRadius: r,
      spinX: (Math.random() - 0.5) * 0.5,
      spinY: (Math.random() - 0.5) * 0.5,
      spinZ: (Math.random() - 0.5) * 0.5,
    };

    chipGroup.add(chip);
  }
  chipGroup.name = "relic-chips";
  root.add(chipGroup);

  // ---- Dust motes ----
  const dustCount = 400;
  const dustPositions = new Float32Array(dustCount * 3);
  const dustVelocities: THREE.Vector3[] = [];

  for (let i = 0; i < dustCount; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = (Math.random() - 0.5) * Math.PI;
    const r = 1.4 + Math.random() * 2.8;

    dustPositions[i * 3] = Math.cos(theta) * Math.cos(phi) * r;
    dustPositions[i * 3 + 1] = Math.sin(phi) * r * 0.9;
    dustPositions[i * 3 + 2] = Math.sin(theta) * Math.cos(phi) * r;

    dustVelocities.push(new THREE.Vector3(
      (Math.random() - 0.5) * 0.02,
      (Math.random() - 0.5) * 0.01 + 0.005,
      (Math.random() - 0.5) * 0.02,
    ));
  }

  const dustGeo = new THREE.BufferGeometry();
  dustGeo.setAttribute("position", new THREE.BufferAttribute(dustPositions, 3));

  const dustMat = new THREE.PointsMaterial({
    color: 0xc8e0c0,
    size: 0.015,
    sizeAttenuation: true,
    transparent: true,
    opacity: 0.7,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });

  const dust = new THREE.Points(dustGeo, dustMat);
  dust.name = "relic-dust";
  dust.userData.velocities = dustVelocities;
  root.add(dust);

  return root;
}

export function animateRelic(root: THREE.Group, elapsed: number, dt: number): void {
  const chips = root.getObjectByName("relic-chips");
  if (chips) {
    for (const c of chips.children) {
      const u = c.userData;
      const a = u.orbitPhase + elapsed * u.orbitSpeed;
      c.position.x = Math.cos(a) * Math.cos(u.orbitPhi) * u.orbitRadius;
      c.position.y = Math.sin(u.orbitPhi) * u.orbitRadius * 0.85;
      c.position.z = Math.sin(a) * Math.cos(u.orbitPhi) * u.orbitRadius;
      c.rotation.x += u.spinX * dt;
      c.rotation.y += u.spinY * dt;
      c.rotation.z += u.spinZ * dt;
    }
  }

  const dust = root.getObjectByName("relic-dust") as THREE.Points | undefined;
  if (dust) {
    const geo = dust.geometry as THREE.BufferGeometry;
    const pos = geo.attributes.position as THREE.BufferAttribute;
    const velocities = dust.userData.velocities as THREE.Vector3[];

    for (let i = 0; i < velocities.length; i++) {
      const v = velocities[i];
      pos.array[i * 3] += v.x * dt;
      pos.array[i * 3 + 1] += v.y * dt;
      pos.array[i * 3 + 2] += v.z * dt;

      const px = pos.array[i * 3] as number;
      const py = pos.array[i * 3 + 1] as number;
      const pz = pos.array[i * 3 + 2] as number;
      const distSq = px * px + py * py + pz * pz;

      if (distSq > 20) {
        const theta = Math.random() * Math.PI * 2;
        const phi = (Math.random() - 0.5) * Math.PI;
        const r = 1.4;
        pos.array[i * 3] = Math.cos(theta) * Math.cos(phi) * r;
        pos.array[i * 3 + 1] = Math.sin(phi) * r * 0.9;
        pos.array[i * 3 + 2] = Math.sin(theta) * Math.cos(phi) * r;
      }
    }
    pos.needsUpdate = true;
  }
}