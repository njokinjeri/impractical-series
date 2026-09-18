import { Timer } from 'three';

import './style.css';

import { initScene } from './scene/setup';
import { createStarfield } from './scene/starfield';
import { initLanternFactory } from './scene/lanterns';
import { initRitual } from './stage/ritual';
import { initSwarm, addLanternsToScene, tickSwarm } from './swarm/swarm';
import { initLoader } from './ui/loader';
import { initTelemetry } from './ui/telemetry';
import { initControls, tickCamera } from './ui/controls';
import { initFpsPanel } from './ui/fpsPanel';

const ctx = initScene();

initLanternFactory();

const starfield = createStarfield();
ctx.scene.add(starfield.points);

initLoader();

const swarm = initSwarm();
addLanternsToScene(ctx.scene);

initTelemetry();

initFpsPanel();

const ritual = initRitual(ctx, swarm);

initControls(ctx, ritual, swarm, starfield);

const timer = new Timer();

function animate() {
  requestAnimationFrame(animate);

  timer.update();

  const now = performance.now();
  const delta = Math.min(timer.getDelta(), 0.033);
  const time = timer.getElapsed();

  ctx.updateFps(now);
  ritual.tick(delta, time);
  tickSwarm(delta, time);
  tickCamera(delta, time, ctx);
  ctx.renderer.render(ctx.scene, ctx.camera);
}

animate();
