import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import type { Theme } from '../utils/types';
import { PASTEL_COLORS } from '../config';

interface DominoProfile {
  w: number;
  h: number;
  d: number;
  mass: number;
}

interface DominoChainOptions {
  profile: DominoProfile;
  count: number;
  spacingRatio: number;
  pathType: 'figure8' | 'wave' | 'circle' | 'line';
  theme: Theme;
}

export class DominoChain {
  private profile: DominoProfile;
  private count: number;
  private spacingRatio: number;
  private pathType: string;
  private theme: Theme;
  private meshes: THREE.Mesh[] = [];
  private bodies: CANNON.Body[] = [];
  public hasFallen: boolean[] = [];
  private scene: THREE.Scene | null = null;
  private world: CANNON.World | null = null;
  private arcTable: Array<{ u: number; len: number }> = [];

  constructor(options: DominoChainOptions) {
    this.profile = options.profile;
    this.count = options.count;
    this.spacingRatio = options.spacingRatio;
    this.pathType = options.pathType;
    this.theme = options.theme;
  }

  build(scene: THREE.Scene, world: CANNON.World): void {
    this.scene = scene;
    this.world = world;
    this.meshes = [];
    this.bodies = [];
    this.hasFallen = [];
    this.arcTable = [];

    const p = this.profile;
    const gap = p.h * this.spacingRatio;
    const minGap = p.d * 0.1;
    const maxGap = p.d * 1.5;
    const clampedGap = Math.max(minGap, Math.min(gap, maxGap));
    const totalSpacing = p.d + clampedGap;

    this.buildArcLengthTable(this.pathType, this.count, totalSpacing);

    for (let i = 0; i < this.count; i++) {
      const t = i / Math.max(this.count - 1, 1);
      const { pos, tangent } = this.sampleBoundedPath(t, this.pathType, this.count, totalSpacing);

      const angle = Math.atan2(tangent.x, tangent.z);
      const quat = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), angle);

      const mesh = this.createDominoMesh(i);
      mesh.position.set(pos.x, pos.y + p.h / 2, pos.z);
      mesh.quaternion.copy(quat);

      scene.add(mesh);
      this.meshes.push(mesh);

      const shape = new CANNON.Box(new CANNON.Vec3(p.w / 2, p.h / 2, p.d / 2));
      const body = new CANNON.Body({
        mass: p.mass,
        position: new CANNON.Vec3(pos.x, pos.y + p.h / 2, pos.z),
        quaternion: new CANNON.Quaternion(quat.x, quat.y, quat.z, quat.w),
        linearDamping: 0.15,
        angularDamping: 0.15,
        material: new CANNON.Material('domino'),
      });

      body.addShape(shape);
      body.quaternion.normalize();
      body.sleepState = CANNON.Body.SLEEPING;
      body.velocity.set(0, 0, 0);
      body.angularVelocity.set(0, 0, 0);

      world.addBody(body);
      this.bodies.push(body);
      this.hasFallen.push(false);
    }
  }

  private createDominoMesh(index: number): THREE.Mesh {
    const p = this.profile;
    const boxGeo = new THREE.BoxGeometry(p.w, p.h, p.d);
    const edgesGeo = new THREE.EdgesGeometry(boxGeo);
    const capGeo = new THREE.PlaneGeometry(p.w, p.d);
    capGeo.rotateX(-Math.PI / 2);

    let mesh: THREE.Mesh;

    switch (this.theme) {
      case 'blueprint': {
        const mat = new THREE.MeshStandardMaterial({ color: 0xf4f1ea, roughness: 0.9, metalness: 0 });
        const lineMat = new THREE.LineBasicMaterial({ color: 0x1a1a1a });
        mesh = new THREE.Mesh(boxGeo, mat);
        mesh.add(new THREE.LineSegments(edgesGeo, lineMat));
        break;
      }
      case 'pastel': {
        const colorIndex = index % PASTEL_COLORS.length;
        const pastelHex = PASTEL_COLORS[colorIndex];
        const mat = new THREE.MeshStandardMaterial({ color: pastelHex, roughness: 0.4, metalness: 0.1 });
        const lineMat = new THREE.LineBasicMaterial({ color: 0x3a3a46, transparent: true, opacity: 0.8 });
        mesh = new THREE.Mesh(boxGeo, mat);
        mesh.add(new THREE.LineSegments(edgesGeo, lineMat));
        break;
      }
      case 'obsidian':
      default: {
        const bodyMat = new THREE.MeshPhysicalMaterial({
          color: 0x111318,
          roughness: 0.1,
          metalness: 0.2,
          clearcoat: 1.0,
          clearcoatRoughness: 0.1,
        });
        const capMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.2, metalness: 0.1 });

        mesh = new THREE.Mesh(boxGeo, bodyMat);
        const cap = new THREE.Mesh(capGeo, capMat);
        cap.position.y = p.h / 2 + 0.001;
        mesh.add(cap);

        const lineMat = new THREE.LineBasicMaterial({ color: 0x64ffda });
        mesh.add(new THREE.LineSegments(edgesGeo, lineMat));
        break;
      }
    }

    return mesh;
  }

  rebuildColors(): void {
    for (let i = 0; i < this.meshes.length; i++) {
      const mesh = this.meshes[i];
      if (this.theme === 'pastel') {
        const colorIndex = i % PASTEL_COLORS.length;
        const pastelHex = PASTEL_COLORS[colorIndex];
        const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
        for (const mat of materials) {
          if (mat && 'color' in mat) {
            (mat as THREE.MeshStandardMaterial).color.setHex(pastelHex);
          }
        }
      }
    }
  }

  private buildArcLengthTable(pathType: string, count: number, spacing: number): void {
    const samples = 3000;
    this.arcTable = [{ u: 0, len: 0 }];
    let prev = this.getRawPoint(0, pathType, count, spacing);

    for (let i = 1; i <= samples; i++) {
      const u = i / samples;
      const pt = this.getRawPoint(u, pathType, count, spacing);
      const dist = prev.distanceTo(pt);
      this.arcTable.push({ u, len: this.arcTable[i - 1].len + dist });
      prev = pt;
    }
  }

  private getRawPoint(u: number, type: string, count: number, spacing: number): THREE.Vector3 {
    const arcLength = count * spacing;
    const pt = new THREE.Vector3();

    switch (type) {
      case 'figure8': {
        const t = u * Math.PI * 2;
        const scale = Math.min(arcLength / 2.6, 16);
        const a = scale * 0.9;
        const x = Math.cos(t) * a;
        const z = Math.sin(2 * t) * a * 0.8;
        pt.set(x, 0, z);
        break;
      }
      case 'wave': {
        const totalLength = Math.min(arcLength, 60);
        const amplitude = Math.min(totalLength * 0.15, 8);
        const cycles = 3;
        pt.set((u - 0.5) * totalLength, 0, Math.sin(u * Math.PI * 2 * cycles) * amplitude);
        break;
      }
      case 'circle': {
        const maxRadius = 22;
        const radius = Math.min(arcLength / (2 * Math.PI), maxRadius);
        const angle = u * Math.PI * 2.0;
        pt.set(Math.cos(angle) * radius, 0, Math.sin(angle) * radius);
        break;
      }
      case 'line':
      default: {
        const totalLength = Math.min(arcLength, 60);
        pt.set((u - 0.5) * totalLength, 0, 0);
        break;
      }
    }
    return pt;
  }

  private sampleBoundedPath(t: number, type: string, count: number, spacing: number): { pos: THREE.Vector3; tangent: THREE.Vector3 } {
    if (this.arcTable.length === 0) {
      this.buildArcLengthTable(type, count, spacing);
    }

    const totalLen = this.arcTable[this.arcTable.length - 1].len;
    const targetLen = t * totalLen;

    let i = 0;
    while (i < this.arcTable.length - 1 && this.arcTable[i + 1].len < targetLen) {
      i++;
    }

    const seg = this.arcTable[i + 1].len - this.arcTable[i].len;
    const frac = seg > 0.0001 ? (targetLen - this.arcTable[i].len) / seg : 0;
    const u = this.arcTable[i].u + frac * (this.arcTable[i + 1].u - this.arcTable[i].u);

    const p1 = this.getRawPoint(u, type, count, spacing);
    const p2 = this.getRawPoint(Math.min(u + 0.001, 1.0), type, count, spacing);
    const tangent = new THREE.Vector3().subVectors(p2, p1).normalize();

    return { pos: p1, tangent };
  }

  updatePositions(onFall: (index: number) => void): number {
    let fallenCount = 0;
    const up = new CANNON.Vec3(0, 1, 0);
    const maxAngularVelocity = 30.0;
    const maxVelocity = 20.0;

    for (let i = 0; i < this.bodies.length; i++) {
      const body = this.bodies[i];
      const mesh = this.meshes[i];

      if (body.angularVelocity.length() > maxAngularVelocity) {
        body.angularVelocity.scale(maxAngularVelocity / body.angularVelocity.length(), body.angularVelocity);
      }

      if (body.velocity.length() > maxVelocity) {
        body.velocity.scale(maxVelocity / body.velocity.length(), body.velocity);
      }

      mesh.position.copy(body.position);
      mesh.quaternion.copy(body.quaternion);

      const bodyUp = body.quaternion.vmult(new CANNON.Vec3(0, 1, 0));
      const dotProduct = up.dot(bodyUp);
      const angle = Math.acos(Math.min(1, Math.max(-1, dotProduct)));
      const degrees = angle * (180 / Math.PI);

      const halfHeight = this.profile.h / 2;
      const yPos = body.position.y;
      const isOnGround = yPos < halfHeight * 0.3;
      const isTilted = degrees > 8;

      if ((isTilted || isOnGround) && !this.hasFallen[i]) {
        this.hasFallen[i] = true;
        fallenCount++;
        onFall(i);
        body.linearDamping = 0.5;
        body.angularDamping = 0.5;
      }

      if (this.hasFallen[i]) {
        fallenCount++;
      }
    }

    return fallenCount;
  }

  forceCheckFallen(): number {
    let newlyFallen = 0;

    for (let i = 0; i < this.bodies.length; i++) {
      if (this.hasFallen[i]) continue;

      const body = this.bodies[i];
      const up = new CANNON.Vec3(0, 1, 0);
      const bodyUp = body.quaternion.vmult(up);
      const dot = up.dot(bodyUp);
      const angle = Math.acos(Math.min(1, Math.max(-1, dot)));
      const degrees = angle * (180 / Math.PI);

      const halfHeight = this.profile.h / 2;
      const yPos = body.position.y;
      const isOnGround = yPos < halfHeight * 0.3;
      const isHorizontal = Math.abs(bodyUp.y) < 0.3;
      const isTilted = degrees > 8;

      if (isTilted || isOnGround || isHorizontal) {
        this.hasFallen[i] = true;
        newlyFallen++;
        body.linearDamping = 0.99;
        body.angularDamping = 0.99;
        body.velocity.set(0, 0, 0);
        body.angularVelocity.set(0, 0, 0);
        body.sleepState = CANNON.Body.SLEEPING;
      }
    }

    return newlyFallen;
  }

  getBody(index: number): CANNON.Body | null {
    return this.bodies[index] || null;
  }

  getMeshPosition(index: number): THREE.Vector3 | null {
    return this.meshes[index]?.position || null;
  }

  getFallenCount(): number {
    return this.hasFallen.filter(Boolean).length;
  }

  getCount(): number {
    return this.count;
  }

  getProfile(): DominoProfile {
    return this.profile;
  }

  get meshesList(): THREE.Mesh[] {
    return this.meshes;
  }

  get bodiesList(): CANNON.Body[] {
    return this.bodies;
  }

  resetFallen(): void {
    this.hasFallen.fill(false);
  }

  dispose(): void {
    for (const mesh of this.meshes) {
      if (this.scene) {
        this.scene.remove(mesh);
      }
      mesh.geometry.dispose();
      if (Array.isArray(mesh.material)) {
        mesh.material.forEach((m) => m.dispose());
      } else {
        mesh.material.dispose();
      }
    }
    for (const body of this.bodies) {
      if (this.world) {
        this.world.removeBody(body);
      }
    }
    this.meshes = [];
    this.bodies = [];
    this.hasFallen = [];
    this.arcTable = [];
  }
}