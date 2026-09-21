import * as THREE from 'three';
import RAPIER from '@dimforge/rapier3d-compat';
import {
  RACHIS_CURVE,
  PALETTES,
  BOTANICAL_COLORS,
  DEFAULT_PHYSICS,
} from '../config/constants';
import type { BotanicalPalette, GrapeItem } from '../types';

export class Grapes {
  public grapesList: GrapeItem[] = [];
  public physicsBodies: GrapeItem[] = [];
  public grapeMaterial: THREE.ShaderMaterial;
  public pedicelMaterial: THREE.ShaderMaterial;

  private scene: THREE.Scene;
  private world: RAPIER.World;
  private audioCtx: AudioContext | null = null;

  constructor(
    scene: THREE.Scene,
    world: RAPIER.World,
    baseShaderMaterial: THREE.ShaderMaterial
  ) {
    this.scene = scene;
    this.world = world;

    const initialPalette = PALETTES[2];

    this.grapeMaterial = baseShaderMaterial.clone();
    this.grapeMaterial.uniforms = THREE.UniformsUtils.clone(
      baseShaderMaterial.uniforms
    );

    this.pedicelMaterial = baseShaderMaterial.clone();
    this.pedicelMaterial.uniforms = THREE.UniformsUtils.clone(
      baseShaderMaterial.uniforms
    );
    this.pedicelMaterial.side = THREE.DoubleSide;

    this.updatePalette(initialPalette);
    this.buildCluster();
  }

  public initAudio(): void {
    if (!this.audioCtx) {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      this.audioCtx = new AudioContextClass();
    }
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  private playImpactSound(intensity: number): void {
    if (!this.audioCtx || this.audioCtx.state !== 'running') return;

    const now = this.audioCtx.currentTime;
    const volume = Math.min(Math.max(intensity / 12, 0.05), 1.0);

    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    const baseFreq = 120 + Math.random() * 40;
    osc.type = 'sine';
    osc.frequency.setValueAtTime(baseFreq, now);
    osc.frequency.exponentialRampToValueAtTime(30, now + 0.12);

    gain.gain.setValueAtTime(volume, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);

    osc.start(now);
    osc.stop(now + 0.12);
  }

  public buildCluster(): void {
    const totalGrapes = 24;
    const berryPositions: THREE.Vector3[] = [];
    const berryRadius = 0.26;

    const minBerryDistance = berryRadius * 1.84;
    const minCenterOffset = 0.18;

    const berryGeo = new THREE.SphereGeometry(berryRadius, 24, 24);
    berryGeo.scale(1.0, 1.22, 1.0);

    for (let i = 0; i < totalGrapes; i++) {
      const progress = 0.08 + (i / totalGrapes) * 0.82;
      const rachisPoint = RACHIS_CURVE.getPointAt(progress);

      const layerRadius = (1.0 - Math.pow(progress, 1.2)) * 0.68 + 0.12;
      let validPos: THREE.Vector3 | null = null;
      let attempts = 0;

      while (!validPos && attempts < 250) {
        attempts++;
        const angle = Math.random() * Math.PI * 2;
        const dist =
          minCenterOffset +
          Math.random() * Math.max(0.05, layerRadius - minCenterOffset);

        const candidate = new THREE.Vector3(
          rachisPoint.x + Math.cos(angle) * dist,
          rachisPoint.y + (Math.random() - 0.5) * 0.14,
          rachisPoint.z + Math.sin(angle) * dist
        );

        let overlap = false;
        for (const pos of berryPositions) {
          if (candidate.distanceTo(pos) < minBerryDistance) {
            overlap = true;
            break;
          }
        }

        if (!overlap) {
          validPos = candidate;
          berryPositions.push(candidate);
        }
      }

      if (!validPos) continue;

      const berryMesh = new THREE.Mesh(berryGeo, this.grapeMaterial);
      berryMesh.position.copy(validPos);

      const dirFromRachis = validPos.clone().sub(rachisPoint).normalize();
      berryMesh.rotation.set(
        (Math.random() - 0.5) * 0.3,
        Math.atan2(dirFromRachis.x, dirFromRachis.z),
        (Math.random() - 0.5) * 0.3
      );
      this.scene.add(berryMesh);

      const pedicelAttachPoint = validPos
        .clone()
        .sub(dirFromRachis.clone().multiplyScalar(berryRadius * 0.95));
      const stemOrigin = rachisPoint.clone();

      const midPoint = new THREE.Vector3()
        .addVectors(stemOrigin, pedicelAttachPoint)
        .multiplyScalar(0.5)
        .add(new THREE.Vector3(0, 0.03, 0));

      const pedicelCurve = new THREE.CatmullRomCurve3([
        stemOrigin,
        midPoint,
        pedicelAttachPoint,
      ]);
      const pedicelGeo = new THREE.TubeGeometry(
        pedicelCurve,
        8,
        0.014,
        6,
        false
      );
      const pedicelMesh = new THREE.Mesh(pedicelGeo, this.pedicelMaterial);
      this.scene.add(pedicelMesh);

      const rigidBodyDesc = RAPIER.RigidBodyDesc.fixed().setTranslation(
        validPos.x,
        validPos.y,
        validPos.z
      );
      const staticBody = this.world.createRigidBody(rigidBodyDesc);

      const colliderDesc = RAPIER.ColliderDesc.ball(0.28);
      const staticCollider = this.world.createCollider(colliderDesc, staticBody);

      this.grapesList.push({
        mesh: berryMesh,
        pedicelMesh,
        isDetached: false,
        body: staticBody,
        collider: staticCollider,
      });
    }
  }

  public detachBerry(
    grapeItem: GrapeItem,
    bounciness: number = DEFAULT_PHYSICS.bounciness
  ): void {
    if (grapeItem.isDetached) return;
    this.initAudio();
    grapeItem.isDetached = true;

    if (grapeItem.pedicelMesh) {
      this.scene.remove(grapeItem.pedicelMesh);
    }

    if (grapeItem.body) {
      this.world.removeRigidBody(grapeItem.body);
    }

    const rigidBodyDesc = RAPIER.RigidBodyDesc.dynamic()
      .setTranslation(
        grapeItem.mesh.position.x,
        grapeItem.mesh.position.y,
        grapeItem.mesh.position.z
      )
      .setRotation(grapeItem.mesh.quaternion);

    const body = this.world.createRigidBody(rigidBodyDesc);

    body.setAngvel(
      {
        x: (Math.random() - 0.5) * 6.0,
        y: (Math.random() - 0.5) * 6.0,
        z: (Math.random() - 0.5) * 6.0,
      },
      true
    );

    const colliderDesc = RAPIER.ColliderDesc.ball(0.28)
      .setRestitution(bounciness)
      .setFriction(0.45)
      .setActiveEvents(RAPIER.ActiveEvents.COLLISION_EVENTS);

    const collider = this.world.createCollider(colliderDesc, body);

    grapeItem.body = body;
    grapeItem.collider = collider;
    this.physicsBodies.push(grapeItem);
  }

  public updatePhysics(eventQueue: RAPIER.EventQueue): void {
    eventQueue.drainCollisionEvents((handle1, handle2, started) => {
      if (!started) return;

      this.physicsBodies.forEach((item) => {
        if (
          item.collider &&
          (item.collider.handle === handle1 || item.collider.handle === handle2)
        ) {
          if (item.body) {
            const linvel = item.body.linvel();
            const speed = Math.sqrt(
              linvel.x * linvel.x + linvel.y * linvel.y + linvel.z * linvel.z
            );
            if (speed > 0.5) {
              this.playImpactSound(speed);
            }
          }
        }
      });
    });

    this.physicsBodies.forEach((item) => {
      if (item.body) {
        const pos = item.body.translation();
        const rot = item.body.rotation();
        item.mesh.position.set(pos.x, pos.y, pos.z);
        item.mesh.quaternion.set(rot.x, rot.y, rot.z, rot.w);
      }
    });
  }

  public updatePalette(palette: BotanicalPalette): void {
    this.grapeMaterial.uniforms.uColorMode.value = palette.mode;
    this.grapeMaterial.uniforms.uBaseColor.value.setHex(palette.base);
    this.grapeMaterial.uniforms.uHighlightColor.value.setHex(palette.highlight);

    this.setPedicelColors(palette);
  }

  private setPedicelColors(palette: BotanicalPalette): void {
    if (palette.mode === 0.0) {
      this.pedicelMaterial.uniforms.uColorMode.value = 0.0;
      this.pedicelMaterial.uniforms.uBaseColor.value.setHex(palette.stemBase);
      this.pedicelMaterial.uniforms.uHighlightColor.value.setHex(
        palette.stemHighlight
      );
    } else {
      this.pedicelMaterial.uniforms.uColorMode.value = 1.0;
      this.pedicelMaterial.uniforms.uBaseColor.value.setHex(
        BOTANICAL_COLORS.tendrilBase
      );
      this.pedicelMaterial.uniforms.uHighlightColor.value.setHex(
        BOTANICAL_COLORS.tendrilHighlight
      );
    }
  }

  public reset(): void {
    this.grapesList.forEach((item) => {
      if (item.body) {
        this.world.removeRigidBody(item.body);
      }
      this.scene.remove(item.mesh);
      if (item.pedicelMesh) {
        this.scene.remove(item.pedicelMesh);
      }
    });

    this.physicsBodies = [];
    this.grapesList = [];

    this.buildCluster();
  }
}