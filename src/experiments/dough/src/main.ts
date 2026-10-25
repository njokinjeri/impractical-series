import * as THREE from 'three';
import { createRenderer } from './core/renderer';
import { createCamera } from './core/camera';
import { createScene } from './core/scene';
import { createControls } from './core/controls';
import { createLighting } from './core/lighting';
import { makeEnv } from './core/environment';
import { makeBackground } from './core/background';
import { createComposer } from './core/postfx';
import { runAnimateLoop } from './core/animate';
import { frameDonut, fitDistance } from './core/framing';
import { setCurrentDonut, getState } from './core/state';
import { DONUTS, findDonut } from './donuts';
import { createLabel } from './ui/label';
import { createNav } from './ui/nav';
import { createHint } from './ui/hint';
import { createKeyboardNav } from './ui/keyboard';
import { animateGlitter } from './donuts/glitter';
import { animateStrawberry } from './donuts/strawberry';
import { animateBrulee } from './donuts/brulee';
import { animateFootball, setFootballRenderer } from './donuts/football';
import { animateKpop } from './donuts/kpop';
import { animateFluff } from './donuts/fluff';
import { animateEarth, setEarthRenderer } from './donuts/earth';
import { animateSpace } from './donuts/space';
import { animateIce } from './donuts/ice';
import { animateRelic } from './donuts/relic';
import { animateRotten } from './donuts/rotten';
import { animatePainters } from './donuts/painters';
import {
  animateDontTouch,
  setDontTouchRenderer,
  getDontTouchEnv,
  setOnHDRIReady,
} from './donuts/donttouch';
import { animateCluster, createClusterInteraction } from './donuts/cluster';

// ---- Boot core ----
const canvas = document.getElementById('stage') as HTMLCanvasElement;
const renderer = createRenderer(canvas);
setFootballRenderer(renderer);
setEarthRenderer(renderer);
setDontTouchRenderer(renderer);
setOnHDRIReady((env) => {
  if (getState().currentId === 'donttouch') {
    const oldEnv = scene.environment;
    scene.environment = env;
    if (oldEnv && oldEnv !== env) oldEnv.dispose();
  }
});
const clusterInteraction = createClusterInteraction();
const scene = createScene();
const camera = createCamera();
const controls = createControls(camera, renderer.domElement);
const pmrem = new THREE.PMREMGenerator(renderer);

const { composer, bloom, setBloom } = createComposer(renderer, scene, camera);

// ---- Canvas fade-in ----
canvas.style.opacity = '0';
canvas.style.transition = 'opacity 1.2s ease';
setTimeout(() => {
  canvas.style.opacity = '1';
}, 50);

// ---- HUD ----
const label = createLabel();
const hint = createHint();
const nav = createNav((id) => loadDonut(id));
createKeyboardNav((id) => loadDonut(id));

// ---- Persistent scene graph ----
const spinner = new THREE.Group();
scene.add(spinner);

const tilt = new THREE.Group();
tilt.rotation.x = Math.PI / 2.4;
spinner.add(tilt);

const root = new THREE.Group();
tilt.add(root);

let lightGroup: THREE.Group | null = null;

let currentStop: (() => void) | null = null;
let currentAnimate: ((elapsed: number, dt: number) => void) | null = null;
let currentPadding = 1.4;

function disposeGroup(g: THREE.Group): void {
  g.traverse((obj) => {
    const mesh = obj as THREE.Mesh;
    if (mesh.geometry) mesh.geometry.dispose();
    if (mesh.material) {
      const mat = mesh.material as THREE.Material | THREE.Material[];
      if (Array.isArray(mat)) mat.forEach((m) => m.dispose());
      else mat.dispose();
    }
  });
}

function loadDonut(id: string): void {
  const donut = findDonut(id);
  if (!donut) return;

  clusterInteraction.detach();

  if (currentStop) currentStop();
  currentStop = null;

  while (root.children.length) {
    const child = root.children[0];
    root.remove(child);
    disposeGroup(child as THREE.Group);
  }
  if (lightGroup) {
    scene.remove(lightGroup);
    lightGroup = null;
  }

  let newEnv: THREE.Texture;
  if (donut.env === 'dontouch') {
    const hdri = getDontTouchEnv();
    newEnv = hdri ?? makeEnv(pmrem, donut.env);
  } else {
    newEnv = makeEnv(pmrem, donut.env);
  }

  const oldEnv = scene.environment;
  scene.environment = newEnv;
  if (oldEnv && oldEnv !== newEnv) oldEnv.dispose();

  if (scene.background instanceof THREE.Texture) scene.background.dispose();
  scene.background = makeBackground(donut.background);

  lightGroup = new THREE.Group();
  createLighting(lightGroup, donut.lighting);
  scene.add(lightGroup);

  setBloom(donut.bloom);

  // ---- Frame the camera ----
  currentPadding = donut.outerPadding ?? 1.4;
  controls.target.set(0, 0, 0);
  frameDonut(camera, donut.outerRadius, currentPadding);
  controls.update();

  const built = donut.build();
  root.add(built);

  if (donut.id === 'cluster') {
    const donutsArray = built.userData.donuts as THREE.Group[];
    clusterInteraction.attach(renderer.domElement, camera, donutsArray);
    currentAnimate = (elapsed, dt) => animateCluster(built, elapsed, dt);
  } else if (donut.id === 'glitter') {
    currentAnimate = (elapsed, dt) => animateGlitter(built, elapsed, dt);
  } else if (donut.id === 'strawberry') {
    currentAnimate = (elapsed, dt) => animateStrawberry(built, elapsed, dt);
  } else if (donut.id === 'brulee') {
    currentAnimate = (elapsed, dt) => animateBrulee(built, elapsed, dt);
  } else if (donut.id === 'football') {
    currentAnimate = (elapsed, dt) => animateFootball(built, elapsed, dt);
  } else if (donut.id === 'kpop') {
    currentAnimate = (elapsed, dt) => animateKpop(built, elapsed, dt);
  } else if (donut.id === 'fluff') {
    currentAnimate = (elapsed, dt) => animateFluff(built, elapsed, dt);
  } else if (donut.id === 'earth') {
    currentAnimate = (elapsed, dt) => animateEarth(built, elapsed, dt);
  } else if (donut.id === 'space') {
    currentAnimate = (elapsed, dt) => animateSpace(built, elapsed, dt);
  } else if (donut.id === 'ice') {
    currentAnimate = (elapsed, dt) => animateIce(built, elapsed, dt);
  } else if (donut.id === 'relic') {
    currentAnimate = (elapsed, dt) => animateRelic(built, elapsed, dt);
  } else if (donut.id === 'rotten') {
    currentAnimate = (elapsed, dt) => animateRotten(built, elapsed, dt);
  } else if (donut.id === 'painters') {
    currentAnimate = (elapsed, dt) => animatePainters(built, elapsed, dt);
  } else if (donut.id === 'donttouch') {
    currentAnimate = (elapsed, dt) => animateDontTouch(built, elapsed, dt);
  } else {
    currentAnimate = () => {};
  }
  history.replaceState(null, '', `#${donut.id}`);
  setCurrentDonut(donut.id);
  label.update(donut);
  nav.setActive(donut.id);

  hint.hide();
  hint.show(donut.id);

  currentStop = runAnimateLoop({
    composer: { composer, bloom, setBloom },
    controls,
    spinner,
    spinSpeed: donut.spinSpeed,
    onFrame: (elapsed, dt) => currentAnimate?.(elapsed, dt),
  });
}

window.addEventListener('mousemove', () => hint.hide());
window.addEventListener('keydown', () => hint.hide());

addEventListener('resize', () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
  composer.setSize(innerWidth, innerHeight);

  const donut = findDonut(getState().currentId);
  if (donut) {
    const minDist = fitDistance(camera, donut.outerRadius, currentPadding);
    const camDist = camera.position.length();
    if (camDist < minDist) {
      camera.position.normalize().multiplyScalar(minDist);
      controls.update();
    }
  }
});

const initial = location.hash.slice(1);
const initialDonut = findDonut(initial) ? initial : DONUTS[0].id;
loadDonut(initialDonut);
