import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { AfterimagePass } from 'three/examples/jsm/postprocessing/AfterimagePass.js';
import type { EngineSettings } from '../config/settings';

export class PostProcessingPipeline {
  public composer: EffectComposer;
  private bloomPass: UnrealBloomPass;
  private afterimagePass: AfterimagePass;

  constructor(
    renderer: THREE.WebGLRenderer,
    scene: THREE.Scene,
    camera: THREE.PerspectiveCamera,
    settings: EngineSettings
  ) {
    const width = window.innerWidth;
    const height = window.innerHeight;

    const renderScene = new RenderPass(scene, camera);

    this.bloomPass = new UnrealBloomPass(
      new THREE.Vector2(width, height),
      settings.bloom,
      0.4,
      0.2
    );
    this.bloomPass.threshold = 0.002;

    this.afterimagePass = new AfterimagePass();
    this.afterimagePass.uniforms['damp'].value = settings.motionTrails;

    this.composer = new EffectComposer(renderer);
    this.composer.addPass(renderScene);
    this.composer.addPass(this.afterimagePass);
    this.composer.addPass(this.bloomPass);
  }

  public setBloomStrength(strength: number): void {
    this.bloomPass.strength = strength;
  }

  public setMotionTrailsDamp(damp: number): void {
    this.afterimagePass.uniforms['damp'].value = damp;
  }

  public setSize(width: number, height: number): void {
    this.composer.setSize(width, height);
  }

  public render(): void {
    this.composer.render();
  }
}
