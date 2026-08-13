import * as THREE from 'three';
import type { TunnelSettings } from '../../config/settings';
import { Engine } from '../../core/Engine';
import { ExternalChase } from './ExternalChase';
import { InteriorFlight } from './InteriorFlight';
import { wormholeSpline } from '../architectures/Tunnel';

export class CameraController {
  private externalChase = new ExternalChase();
  private interiorFlight = new InteriorFlight();
  private mouse = new THREE.Vector2(0, 0);

  private FRAME_SAMPLES = 1000;
  private frames = wormholeSpline.computeFrenetFrames(this.FRAME_SAMPLES, true);

  private insideCamPos = new THREE.Vector3();
  private previewCamPos = new THREE.Vector3();
  private activeCamPos = new THREE.Vector3();
  private targetPos = new THREE.Vector3();
  private lookAtPos = new THREE.Vector3();
  private currentUp = new THREE.Vector3(0, 1, 0);
  private targetUp = new THREE.Vector3();
  private blendFactor = 0.0;
  private currentFogDensity = 0.18;

  constructor() {
    window.addEventListener('pointermove', (e) => {
      this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    });
  }

  public update(delta: number, accumulatedTime: number, settings: TunnelSettings, engine: Engine): void {
    // ✅ Match full type string literals: 'Torsional Vortex' and 'Infinite Grid Corridor'
    if (settings.architecture === 'Vortex') {
      if (settings.perspective === 'External Chase') {
        this.externalChase.update(delta, settings, engine, this.mouse);
      } else {
        this.interiorFlight.update(accumulatedTime, settings, engine);
      }
    } else if (settings.architecture === 'Grid') {
      const camera = engine.camera;
      if (settings.perspective === 'External Chase') {
        camera.position.lerp(new THREE.Vector3(settings.chaseDistance, settings.chaseHeight, 40), 0.1);
        camera.lookAt(0, 0, -40);
        camera.rotation.z = 0;
        engine.setFogDensity(settings.chaseFog);
      } else {
        camera.position.lerp(new THREE.Vector3(0, 0, 10), 0.1);
        camera.lookAt(0, 0, -50);
        camera.rotation.z = 0;
        engine.setFogDensity(settings.insideFog);
      }
    } else {
      // 'Curved Wormhole' fallback
      this.updateConduitCamera(delta, accumulatedTime, settings, engine);
    }
  }

  private updateConduitCamera(delta: number, accumulatedTime: number, settings: TunnelSettings, engine: Engine): void {
    const camera = engine.camera;
    const looptime = 10 * 1000;
    const p = (accumulatedTime % looptime) / looptime;
    const pos = wormholeSpline.getPointAt(p);

    const exactIndex = p * this.FRAME_SAMPLES;
    const i0 = Math.floor(exactIndex) % this.FRAME_SAMPLES;
    const i1 = (i0 + 1) % this.FRAME_SAMPLES;
    const alpha = exactIndex - Math.floor(exactIndex);

    const binormal = this.targetUp.lerpVectors(this.frames.binormals[i0], this.frames.binormals[i1], alpha).normalize();
    const tangent = this.targetPos.lerpVectors(this.frames.tangents[i0], this.frames.tangents[i1], alpha).normalize();

    this.insideCamPos.copy(pos);
    this.previewCamPos
      .copy(pos)
      .addScaledVector(tangent, -settings.chaseDistance)
      .addScaledVector(binormal, settings.chaseHeight);

    const targetBlend = settings.perspective === 'External Chase' ? 1.0 : 0.0;
    this.blendFactor = THREE.MathUtils.lerp(this.blendFactor, targetBlend, delta * 4.0);

    const targetFog = THREE.MathUtils.lerp(settings.insideFog, settings.chaseFog, this.blendFactor);
    this.currentFogDensity = THREE.MathUtils.lerp(this.currentFogDensity, targetFog, delta * 4.0);
    engine.setFogDensity(this.currentFogDensity);

    this.activeCamPos.lerpVectors(this.insideCamPos, this.previewCamPos, this.blendFactor);
    camera.position.lerp(this.activeCamPos, 0.15);

    const idealUp = this.targetUp.lerpVectors(binormal, new THREE.Vector3(0, 1, 0), this.blendFactor);
    this.currentUp.lerp(idealUp, 1 - Math.exp(-12 * delta));
    camera.up.copy(this.currentUp);

    const lookAheadOffset = THREE.MathUtils.lerp(0.02, settings.lookAhead, this.blendFactor);
    const lookAheadP = (p + lookAheadOffset) % 1.0;
    this.lookAtPos.copy(wormholeSpline.getPointAt(lookAheadP));
    camera.lookAt(this.lookAtPos);
  }
}