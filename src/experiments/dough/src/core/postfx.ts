import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';

export interface BloomOptions {
  strength?: number;
  radius?: number;
  threshold?: number;
}

export interface Composer {
  composer: EffectComposer;
  bloom: UnrealBloomPass;
  setBloom: (opts: BloomOptions) => void;
}

export function createComposer(
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.Camera
): Composer {
  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));

  const bloom = new UnrealBloomPass(
    new THREE.Vector2(innerWidth, innerHeight),
    0.15,
    0.5,
    1.0
  );
  composer.addPass(bloom);
  composer.addPass(new OutputPass());

  const setBloom = (opts: BloomOptions): void => {
    if (opts.strength !== undefined) bloom.strength = opts.strength;
    if (opts.radius !== undefined) bloom.radius = opts.radius;
    if (opts.threshold !== undefined) bloom.threshold = opts.threshold;
  };

  return { composer, bloom, setBloom };
}
