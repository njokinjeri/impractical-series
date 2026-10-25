import * as THREE from 'three';
import type { Composer } from './postfx';
import type { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { canDrift } from './state';

export interface AnimateContext {
  composer: Composer;
  controls: OrbitControls;
  spinner: THREE.Group;
  spinSpeed: number;
  onFrame: (elapsed: number, dt: number) => void;
}

export function runAnimateLoop(ctx: AnimateContext): () => void {
  const clock = new THREE.Clock();
  let raf = 0;

  const tick = (): void => {
    raf = requestAnimationFrame(tick);
    const elapsed = clock.getElapsedTime();
    const dt = Math.min(clock.getDelta(), 0.05);

    if (canDrift()) {
      ctx.spinner.rotation.y += ctx.spinSpeed * dt;
    }
    ctx.spinner.position.y = Math.sin(elapsed * 0.6) * 0.04;

    ctx.onFrame(elapsed, dt);
    ctx.controls.update();
    ctx.composer.composer.render();
  };
  tick();

  return () => cancelAnimationFrame(raf);
}
