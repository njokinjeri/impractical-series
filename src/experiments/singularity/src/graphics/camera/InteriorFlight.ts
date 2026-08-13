import * as THREE from 'three';
import type { TunnelSettings } from '../../config/settings';
import { Engine } from '../../core/Engine';
import { Vortex } from '../architectures/Vortex';

export class InteriorFlight {
  public update(
    accumulatedTime: number,
    settings: TunnelSettings,
    engine: Engine
  ): void {
    const camera = engine.camera;
    const t = accumulatedTime * 0.0005;
    const diveHeight = Math.sin(t) * 14.0;
    const velocityY = Math.cos(t);
    const r = Vortex.getRadiusAt(diveHeight) * 0.42;

    const spiralAngle = t * 1.5 + Math.sin(t) * 0.3;
    const camX = Math.cos(spiralAngle) * r;
    const camZ = Math.sin(spiralAngle) * r;

    camera.position.lerp(new THREE.Vector3(camX, diveHeight, camZ), 0.08);

    const lookOffset = -velocityY * 7.5;
    const targetY = diveHeight + lookOffset;
    const targetR = Vortex.getRadiusAt(targetY) * 0.85;

    const cantAngle = spiralAngle + Math.PI * (0.55 + velocityY * 0.1);
    const lookX = Math.cos(cantAngle) * targetR;
    const lookZ = Math.sin(cantAngle) * targetR;

    camera.lookAt(lookX, targetY, lookZ);
    engine.setFogDensity(settings.insideFog * 0.22);
  }
}
