// src/graphics/camera/ExternalChase.ts
import * as THREE from 'three';
import type { TunnelSettings } from '../../config/settings';
import { Engine } from '../../core/Engine';

export class ExternalChase {
  private orbitAngle = 0;

  public update(
    delta: number,
    settings: TunnelSettings,
    engine: Engine,
    mouse: THREE.Vector2
  ): void {
    if (!settings.paused) {
      this.orbitAngle += delta * settings.speed * 4.0;
    }

    const camera = engine.camera;
    const radius = settings.chaseDistance * 3.0 + mouse.x * 2.0;
    const targetY = mouse.y * 6.0 + settings.chaseHeight;
    const camX = Math.cos(this.orbitAngle) * radius;
    const camZ = Math.sin(this.orbitAngle) * radius;

    camera.position.lerp(new THREE.Vector3(camX, targetY, camZ), 0.08);
    camera.lookAt(0, 0, 0);

    engine.setFogDensity(settings.chaseFog);
  }
}
