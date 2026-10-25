import * as THREE from "three";

const R = 1.0;
const TUBE = 0.46;
const DOUGH_FLAT = 0.85;

// ---- Neon grid floor ----
function makeNeonGrid(opts: {
  size: number;
  divisions: number;
  color: number;
  opacity: number;
  y: number;
}): THREE.LineSegments {
  const { size, divisions, color, opacity, y } = opts;
  const half = size / 2;
  const step = size / divisions;
  const positions: number[] = [];
  const colors: number[] = [];
  const c = new THREE.Color(color);

  const addLine = (x1: number, z1: number, x2: number, z2: number): void => {
    const d1 = Math.sqrt(x1 * x1 + z1 * z1) / half;
    const d2 = Math.sqrt(x2 * x2 + z2 * z2) / half;
    const a1 = Math.max(0, 1 - d1);
    const a2 = Math.max(0, 1 - d2);

    positions.push(x1, y, z1, x2, y, z2);
    colors.push(c.r * a1, c.g * a1, c.b * a1);
    colors.push(c.r * a2, c.g * a2, c.b * a2);
  };

  for (let i = 0; i <= divisions; i++) {
    const z = -half + i * step;
    addLine(-half, z, half, z);
  }
  for (let i = 0; i <= divisions; i++) {
    const x = -half + i * step;
    addLine(x, -half, x, half);
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geo.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));

  const mat = new THREE.LineBasicMaterial({
    vertexColors: true,
    transparent: true,
    opacity,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });

  return new THREE.LineSegments(geo, mat);
}

// ---- Wireframe torus with vertex color gradient ----
function makeWireframeTorus(
  radius: number,
  tube: number,
  radialSegs: number,
  tubularSegs: number,
  colorA: number,
  colorB: number,
): THREE.BufferGeometry {
  const geo = new THREE.TorusGeometry(radius, tube, radialSegs, tubularSegs);
  geo.rotateX(Math.PI / 2);
  geo.scale(1, DOUGH_FLAT, 1);

  const pos = geo.attributes.position;
  const colors = new Float32Array(pos.count * 3);
  const cA = new THREE.Color(colorA);
  const cB = new THREE.Color(colorB);
  const tmp = new THREE.Color();
  const v = new THREE.Vector3();

  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i);
    const ringAngle = Math.atan2(v.z, v.x);
    const t = (ringAngle + Math.PI) / (Math.PI * 2);
    tmp.copy(cA).lerp(cB, t);
    colors[i * 3] = tmp.r;
    colors[i * 3 + 1] = tmp.g;
    colors[i * 3 + 2] = tmp.b;
  }
  geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  return geo;
}

// ---- Trinket material (chrome + iridescence) ----
function makeTrinketMat(): THREE.MeshPhysicalMaterial {
  return new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 1.0,
    roughness: 0.04,
    iridescence: 1.0,
    iridescenceIOR: 2.6,
    iridescenceThicknessRange: [200, 1600],
    clearcoat: 1.0,
    clearcoatRoughness: 0.0,
    envMapIntensity: 3.0,
  });
}

// ---- Trinket builders ----
function buildHeart(scale: number): THREE.Group {
  const g = new THREE.Group();
  const mat = makeTrinketMat();
  const s = scale;

  const left = new THREE.Mesh(new THREE.SphereGeometry(s * 0.5, 24, 24), mat);
  left.position.set(-s * 0.3, s * 0.15, 0);
  g.add(left);

  const right = new THREE.Mesh(new THREE.SphereGeometry(s * 0.5, 24, 24), mat);
  right.position.set(s * 0.3, s * 0.15, 0);
  g.add(right);

  const bottom = new THREE.Mesh(new THREE.ConeGeometry(s * 0.72, s * 1.55, 24), mat);
  bottom.position.set(0, -s * 0.4, 0);
  bottom.rotation.z = Math.PI;
  g.add(bottom);

  return g;
}

function buildStar(scale: number, points = 5): THREE.Group {
  const shape = new THREE.Shape();
  const innerR = scale * 0.42;
  const outerR = scale;
  for (let i = 0; i < points * 2; i++) {
    const r = i % 2 === 0 ? outerR : innerR;
    const a = (i / (points * 2)) * Math.PI * 2 - Math.PI / 2;
    if (i === 0) shape.moveTo(Math.cos(a) * r, Math.sin(a) * r);
    else shape.lineTo(Math.cos(a) * r, Math.sin(a) * r);
  }
  shape.closePath();
  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: scale * 0.3,
    bevelEnabled: true,
    bevelThickness: scale * 0.06,
    bevelSize: scale * 0.06,
    bevelSegments: 2,
  });
  geo.center();
  const g = new THREE.Group();
  g.add(new THREE.Mesh(geo, makeTrinketMat()));
  return g;
}

function buildGem(scale: number): THREE.Group {
  const g = new THREE.Group();
  g.add(new THREE.Mesh(new THREE.IcosahedronGeometry(scale, 0), makeTrinketMat()));
  return g;
}

function buildChain(scale: number): THREE.Group {
  const g = new THREE.Group();
  const mat = makeTrinketMat();
  for (let i = 0; i < 4; i++) {
    const link = new THREE.Mesh(
      new THREE.TorusGeometry(scale * 0.35, scale * 0.1, 12, 24),
      mat,
    );
    link.position.x = (i - 1.5) * scale * 0.55;
    link.rotation.y = i % 2 === 0 ? 0 : Math.PI / 2;
    g.add(link);
  }
  return g;
}

function buildNote(scale: number): THREE.Group {
  const g = new THREE.Group();
  const mat = makeTrinketMat();

  const head = new THREE.Mesh(new THREE.SphereGeometry(scale * 0.5, 20, 20), mat);
  head.scale.set(1, 0.7, 1);
  head.position.set(-scale * 0.3, -scale * 0.6, 0);
  g.add(head);

  const stem = new THREE.Mesh(
    new THREE.CylinderGeometry(scale * 0.07, scale * 0.07, scale * 1.8, 12),
    mat,
  );
  stem.position.set(scale * 0.15, 0, 0);
  g.add(stem);

  const flag = new THREE.Mesh(
    new THREE.TorusGeometry(scale * 0.4, scale * 0.09, 8, 16, Math.PI * 0.9),
    mat,
  );
  flag.position.set(scale * 0.45, scale * 0.65, 0);
  flag.rotation.z = -Math.PI / 2;
  g.add(flag);

  return g;
}

function buildRibbon(scale: number): THREE.Group {
  const points: THREE.Vector3[] = [];
  for (let i = 0; i <= 60; i++) {
    const t = i / 60;
    points.push(new THREE.Vector3(
      Math.sin(t * Math.PI * 5) * scale * 0.35,
      (t - 0.5) * scale * 2.2,
      Math.cos(t * Math.PI * 5) * scale * 0.35,
    ));
  }
  const curve = new THREE.CatmullRomCurve3(points);
  const geo = new THREE.TubeGeometry(curve, 80, scale * 0.11, 10, false);
  const g = new THREE.Group();
  g.add(new THREE.Mesh(geo, makeTrinketMat()));
  return g;
}

function buildBall(scale: number): THREE.Group {
  const g = new THREE.Group();
  g.add(new THREE.Mesh(new THREE.SphereGeometry(scale, 32, 24), makeTrinketMat()));
  return g;
}

function buildCapsule(scale: number): THREE.Group {
  const g = new THREE.Group();
  g.add(new THREE.Mesh(
    new THREE.CapsuleGeometry(scale * 0.4, scale * 1.1, 12, 20),
    makeTrinketMat(),
  ));
  return g;
}

function buildCubeCluster(scale: number): THREE.Group {
  const g = new THREE.Group();
  const mat = makeTrinketMat();
  const s = scale * 0.55;
  const offs: Array<[number, number, number]> = [
    [-s * 0.6, -s * 0.6, -s * 0.6],
    [s * 0.6, -s * 0.6, s * 0.6],
    [-s * 0.6, s * 0.6, s * 0.6],
    [s * 0.6, s * 0.6, -s * 0.6],
  ];
  for (const [x, y, z] of offs) {
    const cube = new THREE.Mesh(new THREE.BoxGeometry(s, s, s), mat);
    cube.position.set(x, y, z);
    g.add(cube);
  }
  return g;
}

function buildSaturn(scale: number): THREE.Group {
  const g = new THREE.Group();
  const mat = makeTrinketMat();
  g.add(new THREE.Mesh(new THREE.SphereGeometry(scale * 0.55, 32, 24), mat));
  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(scale * 0.95, scale * 0.08, 12, 48),
    mat,
  );
  ring.rotation.x = Math.PI / 2;
  g.add(ring);
  return g;
}

function buildFlatHeart(scale: number): THREE.Group {
  const shape = new THREE.Shape();
  const s = scale;
  shape.moveTo(0, s * 0.4);
  shape.bezierCurveTo(s * 0.6, s * 0.9, s * 1.2, s * 0.2, 0, -s * 0.7);
  shape.bezierCurveTo(-s * 1.2, s * 0.2, -s * 0.6, s * 0.9, 0, s * 0.4);
  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: scale * 0.35,
    bevelEnabled: true,
    bevelThickness: scale * 0.05,
    bevelSize: scale * 0.05,
    bevelSegments: 2,
  });
  geo.center();
  const g = new THREE.Group();
  g.add(new THREE.Mesh(geo, makeTrinketMat()));
  return g;
}

function buildSpikyStar(scale: number): THREE.Group {
  return buildStar(scale, 6);
}

// ---- The donut ----
export function buildKpop(): THREE.Group {
  const root = new THREE.Group();

  // ---- Neon grid floors ----
  const gridCyan = makeNeonGrid({
    size: 24, divisions: 48, color: 0x33eeff, opacity: 0.55, y: -1.9,
  });
  gridCyan.name = "kpop-grid-cyan";
  root.add(gridCyan);

  const gridPink = makeNeonGrid({
    size: 18, divisions: 36, color: 0xff44aa, opacity: 0.30, y: -1.6,
  });
  gridPink.name = "kpop-grid-pink";
  root.add(gridPink);

  // ---- Base wireframe ----
  const baseWireGeo = makeWireframeTorus(R, TUBE, 32, 64, 0xff2288, 0x33eeff);
  const baseWire = new THREE.Mesh(
    baseWireGeo,
    new THREE.MeshBasicMaterial({
      vertexColors: true,
      wireframe: true,
      transparent: true,
      opacity: 0.9,
    }),
  );
  root.add(baseWire);

  // ---- Dark solid inner torus ----
  const baseSolidGeo = new THREE.TorusGeometry(R, TUBE * 0.97, 32, 64);
  baseSolidGeo.rotateX(Math.PI / 2);
  baseSolidGeo.scale(1, DOUGH_FLAT, 1);
  root.add(new THREE.Mesh(
    baseSolidGeo,
    new THREE.MeshBasicMaterial({
      color: 0x0a0212,
      transparent: true,
      opacity: 0.85,
    }),
  ));

  // ---- Frosting wireframe (slightly larger) ----
  const frostWireGeo = makeWireframeTorus(R, TUBE + 0.05, 24, 48, 0x33eeff, 0xbb44ff);
  root.add(new THREE.Mesh(
    frostWireGeo,
    new THREE.MeshBasicMaterial({
      vertexColors: true,
      wireframe: true,
      transparent: true,
      opacity: 0.55,
    }),
  ));

  // ---- Scan pulse ring ----
  const scanGeo = new THREE.TorusGeometry(R, TUBE * 1.02, 8, 128);
  scanGeo.rotateX(Math.PI / 2);
  scanGeo.scale(1, DOUGH_FLAT, 1);
  const scanPulse = new THREE.Mesh(
    scanGeo,
    new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    }),
  );
  scanPulse.name = "kpop-scan";
  root.add(scanPulse);

  // ---- Orbiting trinkets ----
  const trinketGroup = new THREE.Group();
  const builders = [
    buildHeart, buildStar, buildChain, buildGem,
    buildNote, buildRibbon, buildBall, buildCapsule,
    buildCubeCluster, buildSaturn, buildFlatHeart, buildSpikyStar,
  ];

  builders.forEach((builder, i) => {
    const t = builder(0.11 + Math.random() * 0.05);

    const theta = (i / builders.length) * Math.PI * 2 + Math.random() * 0.3;
    const phi = (Math.random() - 0.5) * Math.PI * 0.8;
    const radius = 1.85 + Math.random() * 0.5;

    t.userData = {
      theta,
      phi,
      radius,
      speed: 0.10 + Math.random() * 0.16,
      spinX: (Math.random() - 0.5) * 1.4,
      spinY: (Math.random() - 0.5) * 1.4,
      spinZ: (Math.random() - 0.5) * 1.4,
      bobAmp: 0.03 + Math.random() * 0.06,
      bobSpeed: 0.5 + Math.random() * 0.8,
      bobPhase: Math.random() * Math.PI * 2,
    };

    t.position.set(
      Math.cos(theta) * Math.cos(phi) * radius,
      Math.sin(phi) * radius * 0.75,
      Math.sin(theta) * Math.cos(phi) * radius,
    );

    trinketGroup.add(t);
  });
  trinketGroup.name = "kpop-trinkets";
  root.add(trinketGroup);

  return root;
}

export function animateKpop(root: THREE.Group, elapsed: number, _dt: number): void {
  // Scan pulse
  const scan = root.getObjectByName("kpop-scan") as THREE.Mesh | undefined;
  if (scan) {
    const phase = (elapsed * 0.6) % 1;
    const s = 1 + phase * 0.15;
    scan.scale.set(s, s, s);
    (scan.material as THREE.MeshBasicMaterial).opacity = Math.max(0, 0.7 * (1 - phase));
  }

  // Trinket orbits
  const trinkets = root.getObjectByName("kpop-trinkets");
  if (trinkets) {
    for (const t of trinkets.children) {
      const u = t.userData;
      const a = u.theta + elapsed * u.speed;
      t.position.x = Math.cos(a) * Math.cos(u.phi) * u.radius;
      t.position.y =
        Math.sin(u.phi) * u.radius * 0.75 +
        Math.sin(elapsed * u.bobSpeed + u.bobPhase) * u.bobAmp;
      t.position.z = Math.sin(a) * Math.cos(u.phi) * u.radius;
      t.rotation.x += u.spinX * 0.016;
      t.rotation.y += u.spinY * 0.016;
      t.rotation.z += u.spinZ * 0.016;
    }
  }

  // Grid parallax
  const cyan = root.getObjectByName("kpop-grid-cyan");
  if (cyan) {
    cyan.position.x = Math.sin(elapsed * 0.15) * 0.3;
    cyan.position.z = Math.cos(elapsed * 0.12) * 0.3;
  }
  const pink = root.getObjectByName("kpop-grid-pink");
  if (pink) {
    pink.position.x = Math.sin(elapsed * 0.18 + 1.0) * 0.5;
    pink.position.z = Math.cos(elapsed * 0.15 + 1.0) * 0.5;
  }
}