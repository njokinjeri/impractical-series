import * as THREE from "three";

const R = 1.0;
const TUBE = 0.46;
const DOUGH_FLAT = 0.85;

const STRANDS = 55000;

// ---- Curved tapered strand geometry ----
function makeCurvedStrandGeo(length = 0.13): THREE.TubeGeometry {
  const points: THREE.Vector3[] = [];
  const steps = 6;
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const y = t * length;
    const x = Math.pow(t, 2) * length * 0.25;
    points.push(new THREE.Vector3(x, y, 0));
  }
  const curve = new THREE.CatmullRomCurve3(points);
  const tubeGeo = new THREE.TubeGeometry(curve, 6, 0.0030, 3, false);

  // Taper the strand toward the tip
  const pos = tubeGeo.attributes.position;
  const v = new THREE.Vector3();
  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i);
    const t = Math.max(0, Math.min(1, v.y / length));
    const taper = 1.0 - t * 0.7;
    v.x *= taper;
    v.z *= taper;
    pos.setXYZ(i, v.x, v.y, v.z);
  }
  pos.needsUpdate = true;
  tubeGeo.computeVertexNormals();
  return tubeGeo;
}

export function buildFluff(): THREE.Group {
  const root = new THREE.Group();

  // ---- Base torus (visible through gaps between strands) ----
  const baseGeo = new THREE.TorusGeometry(R, TUBE, 96, 192);
  baseGeo.rotateX(Math.PI / 2);
  baseGeo.scale(1, DOUGH_FLAT, 1);
  root.add(new THREE.Mesh(
    baseGeo,
    new THREE.MeshPhysicalMaterial({
      color: 0xb8a0d8,
      roughness: 0.98,
      metalness: 0.0,
      envMapIntensity: 0.2,
    }),
  ));

  // ---- Instanced strands ----
  const strandGeo = makeCurvedStrandGeo(0.13);
  const strandMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.88,
    metalness: 0.0,
  });

  const inst = new THREE.InstancedMesh(strandGeo, strandMat, STRANDS);
  inst.instanceColor = new THREE.InstancedBufferAttribute(
    new Float32Array(STRANDS * 3),
    3,
  );

  const dummy = new THREE.Object3D();
  const cyan = new THREE.Color(0x66ddff);
  const magenta = new THREE.Color(0xdd66ff);
  const lavender = new THREE.Color(0xbb99ff);
  const white = new THREE.Color(0xffffff);
  const tmpColor = new THREE.Color();

  for (let i = 0; i < STRANDS; i++) {
    const u = Math.random() * Math.PI * 2;
    const v = Math.random() * Math.PI * 2;
    const cx = Math.cos(u) * (R + TUBE * Math.cos(v));
    const cy = Math.sin(v) * TUBE * DOUGH_FLAT;
    const cz = Math.sin(u) * (R + TUBE * Math.cos(v));

    const nx = Math.cos(u) * Math.cos(v);
    const ny = Math.sin(v);
    const nz = Math.sin(u) * Math.cos(v);

    dummy.position.set(cx, cy, cz);

    const up = new THREE.Vector3(nx, ny, nz).normalize();
    const q = new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      up,
    );

    const tilt = new THREE.Quaternion().setFromEuler(
      new THREE.Euler(
        (Math.random() - 0.5) * 1.4,
        (Math.random() - 0.5) * 1.4,
        (Math.random() - 0.5) * 1.4,
      ),
    );
    q.multiply(tilt);
    dummy.quaternion.copy(q);

    const len = 0.6 + Math.random() * 0.9;
    dummy.scale.set(1, len, 1);

    dummy.updateMatrix();
    inst.setMatrixAt(i, dummy.matrix);

    const topness = (cy + 0.5) / 1.0;
    tmpColor.copy(cyan).lerp(magenta, 1 - topness);
    tmpColor.lerp(lavender, Math.random() * 0.25);
    tmpColor.lerp(white, Math.random() * 0.15);
    inst.setColorAt(i, tmpColor);
  }

  inst.instanceMatrix.needsUpdate = true;
  if (inst.instanceColor) inst.instanceColor.needsUpdate = true;

  root.add(inst);

  return root;
}

export function animateFluff(_root: THREE.Group, _elapsed: number, _dt: number): void {
  // Fluff is static — no per-frame animation
}