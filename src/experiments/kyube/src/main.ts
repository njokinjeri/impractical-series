import * as THREE from 'three';
import {
  generateStoneTextures,
  createGlowSpriteTexture,
} from './assets/textures';
import {
  createScene,
  createCamera,
  createRenderer,
  nightBgColor,
  dayBgColor,
} from './core/scene';
import { createLighting } from './core/lighting';
import { createAppState, bindInteractions } from './core/controls';
import { createMasonryCore } from './entities/coreCube';
import { buildClusteredCubeMoss } from './entities/mossGenerator';
import { createSpaceRocks } from './entities/spaceRocks';
import { createStarsGas } from './entities/starsGas';
import { getCinematicBarElements, initCinematicBar } from './ui/cinematicBar';
import {
  getInfoModalElements,
  initInfoModal,
  isModalActive,
} from './ui/infoModal';

const container = document.getElementById('canvas-container')!;

const scene = createScene();
const camera = createCamera();
const renderer = createRenderer(container);

const state = createAppState();
camera.position.z = state.currentZoom;

const rootGroup = new THREE.Group();
scene.add(rootGroup);

const stoneBumpMap = generateStoneTextures();
const glowTexture = createGlowSpriteTexture();

const stoneMaterial = new THREE.MeshStandardMaterial({
  color: 0x423f3e,
  roughness: 0.88,
  metalness: 0.05,
  bumpMap: stoneBumpMap,
  bumpScale: 0.035,
  side: THREE.DoubleSide,
});

const integratedMossMaterial = new THREE.MeshStandardMaterial({
  color: 0x5a8f29,
  roughness: 0.95,
  metalness: 0.0,
  bumpMap: stoneBumpMap,
  bumpScale: 0.015,
});

const interlockingCubeGroup = createMasonryCore(stoneMaterial);
rootGroup.add(interlockingCubeGroup);

const coreMossMesh = buildClusteredCubeMoss(integratedMossMaterial, 11000);
rootGroup.add(coreMossMesh);

const { group: spaceRocksGroup, animatedRocks } = createSpaceRocks(
  stoneBumpMap,
  45
);
rootGroup.add(spaceRocksGroup);

const gasGroup = createStarsGas(glowTexture);
rootGroup.add(gasGroup);

const { coreLight, sunKeyLight, sunShaftLight, ambientLight } = createLighting(
  rootGroup,
  scene
);

const barEl = getCinematicBarElements();
const modalEl = getInfoModalElements();

initInfoModal(modalEl);

initCinematicBar(state, barEl, {
  onMossToggle: (visible) => {
    coreMossMesh.visible = visible;
  },
  onGasToggle: (visible) => {
    gasGroup.visible = visible;
  },
});

bindInteractions(state, {
  isModalActive: () => isModalActive(modalEl),
  isOverUI: (target) => {
    if (!(target instanceof Element)) return false;
    return (
      target.closest('#cinematic-bar') !== null ||
      target.closest('#info-modal') !== null ||
      target.closest('#top-right-info') !== null ||
      target.closest('#toggle-toolbar-btn') !== null
    );
  },
});

window.addEventListener(
  'resize',
  () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  },
  { passive: true }
);

const clock = new THREE.Clock();

function animate(): void {
  requestAnimationFrame(animate);
  const elapsedTime = clock.getElapsedTime();

  state.currentZoom += (state.targetZoom - state.currentZoom) * 0.05;
  camera.position.z = state.currentZoom;

  if (state.showGas) {
    gasGroup.rotation.y = elapsedTime * 0.02;
    gasGroup.rotation.x = Math.sin(elapsedTime * 0.01) * 0.1;
  }

  const activeCore = state.isExternalSunMode ? 2.5 : state.targetCoreIntensity;
  coreLight.intensity += (activeCore - coreLight.intensity) * 0.08;

  sunKeyLight.intensity +=
    ((state.isExternalSunMode ? 3.2 : 1.8) - sunKeyLight.intensity) * 0.08;
  sunShaftLight.intensity +=
    ((state.isExternalSunMode ? 1.4 : 0.5) - sunShaftLight.intensity) * 0.08;
  ambientLight.intensity +=
    ((state.isExternalSunMode ? 0.75 : 0.45) - ambientLight.intensity) * 0.08;

  (scene.background as THREE.Color).lerp(
    state.isExternalSunMode ? dayBgColor : nightBgColor,
    0.05
  );

  animatedRocks.forEach((r) => {
    r.mesh.rotation.x += r.rotSpeedX;
    r.mesh.rotation.y += r.rotSpeedY;
    r.mesh.position.y =
      r.initialY + Math.sin(elapsedTime * r.floatSpeed + r.floatPhase) * 0.025;
  });

  if (state.isOrbitingMode) {
    state.targetRotY += 0.008;
    state.targetRotX = Math.sin(elapsedTime * 0.4) * 0.25;
  } else if (!state.isDragging) {
    state.targetRotY += 0.0012;
  }

  rootGroup.rotation.x += (state.targetRotX - rootGroup.rotation.x) * 0.05;
  rootGroup.rotation.y += (state.targetRotY - rootGroup.rotation.y) * 0.05;

  renderer.render(scene, camera);
}

animate();
