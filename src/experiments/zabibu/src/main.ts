import * as THREE from 'three';
import { Branch } from './components/Branch';
import { Tendrils } from './components/Tendrils';
import { Grapes } from './components/Grapes';
import { Environment } from './components/Environment';
import { UIControls } from './components/UIControls';
import { PhysicsWorld } from './utils/PhysicsWorld';
import { RaycasterHandler } from './utils/RaycasterHandler';
import { createBaseShaderMaterial } from './shaders/grapeShader';
import { PALETTES, DEFAULT_PHYSICS } from './config/constants';

let environment: Environment;
let physicsWorld: PhysicsWorld;
let uiControls: UIControls;

let branch: Branch;
let tendrils: Tendrils;
let grapes: Grapes;

let bounciness = DEFAULT_PHYSICS.bounciness;

async function init() {
  const container = document.getElementById('canvas-container');
  if (!container) return;

  environment = new Environment(container);

  physicsWorld = new PhysicsWorld();
  await physicsWorld.init(bounciness);

  const baseShaderMaterial = createBaseShaderMaterial();

  branch = new Branch(environment.scene, baseShaderMaterial);
  tendrils = new Tendrils(environment.scene, baseShaderMaterial);
  grapes = new Grapes(
    environment.scene,
    physicsWorld.world,
    baseShaderMaterial
  );

  uiControls = new UIControls(branch, tendrils, grapes, physicsWorld, (val) => {
    bounciness = val;
  });
  uiControls.updateActivePalette(PALETTES[2]);

  new RaycasterHandler(environment.camera, grapes, () => bounciness);

  window.addEventListener('resize', onWindowResize);

  const loadingEl = document.getElementById('loading');
  if (loadingEl) loadingEl.style.display = 'none';

  animate();
}

function onWindowResize() {
  environment.onWindowResize();

  const res = new THREE.Vector2(window.innerWidth, window.innerHeight);
  branch.woodMaterial.uniforms.uResolution.value = res;
  tendrils.tendrilMaterial.uniforms.uResolution.value = res;
  grapes.grapeMaterial.uniforms.uResolution.value = res;
  grapes.pedicelMaterial.uniforms.uResolution.value = res;
}

function animate() {
  requestAnimationFrame(animate);

  physicsWorld.step();
  grapes.updatePhysics(physicsWorld.eventQueue);

  environment.render();
}

init();
