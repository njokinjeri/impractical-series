import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { AfterimagePass } from 'three/examples/jsm/postprocessing/AfterimagePass.js';

export class PostProcessing {
  public composer: EffectComposer;
  public bloomPass: UnrealBloomPass;
  public afterimagePass: AfterimagePass;

  constructor(
    renderer: THREE.WebGLRenderer,
    scene: THREE.Scene,
    camera: THREE.PerspectiveCamera
  ) {
    const w = window.innerWidth;
    const h = window.innerHeight;

    const renderScene = new RenderPass(scene, camera);
    this.bloomPass = new UnrealBloomPass(
      new THREE.Vector2(w, h),
      2.2,
      0.4,
      0.2
    );
    this.bloomPass.threshold = 0.002;

    this.afterimagePass = new AfterimagePass();
    this.afterimagePass.uniforms['damp'].value = 0.84;

    this.composer = new EffectComposer(renderer);
    this.composer.addPass(renderScene);
    this.composer.addPass(this.afterimagePass);
    this.composer.addPass(this.bloomPass);

    window.addEventListener('resize', this.onResize.bind(this));
  }

  public render(): void {
    this.composer.render();
  }

  private onResize(): void {
    this.composer.setSize(window.innerWidth, window.innerHeight);
  }
}
