import * as THREE from 'three';
import { type EngineSettings, defaultSettings } from '../config/settings';
import { PostProcessingPipeline } from './PostProcessing';

export class Engine {
  public scene: THREE.Scene;
  public camera: THREE.PerspectiveCamera;
  public renderer: THREE.WebGLRenderer;
  public fog: THREE.FogExp2;
  public postProcessing: PostProcessingPipeline;
  public settings: EngineSettings;

  public mouse = new THREE.Vector2(0, 0);

  private lastTime = performance.now();
  private accumulatedTime = 0;
  private onUpdateCallback?: (delta: number, accumulatedTime: number) => void;

  constructor(customSettings?: Partial<EngineSettings>) {
    this.settings = { ...defaultSettings, ...customSettings };
    this.scene = new THREE.Scene();
    this.fog = new THREE.FogExp2(0x000000, this.settings.insideFog * 0.25);
    this.scene.fog = this.fog;

    const width = window.innerWidth;
    const height = window.innerHeight;
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    this.renderer.setSize(width, height);
    this.renderer.setClearColor(0x000000);
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    document.body.appendChild(this.renderer.domElement);

    this.postProcessing = new PostProcessingPipeline(
      this.renderer,
      this.scene,
      this.camera,
      this.settings
    );

    this.initEventListeners();
  }

  public setFogDensity(rawDensity: number): void {
    this.fog.density = rawDensity * 0.25;
  }

  public onUpdate(
    callback: (delta: number, accumulatedTime: number) => void
  ): void {
    this.onUpdateCallback = callback;
  }

  public start(): void {
    this.lastTime = performance.now();
    this.animate();
  }

  private animate = (): void => {
    requestAnimationFrame(this.animate);

    const currentTime = performance.now();
    const delta = Math.min((currentTime - this.lastTime) / 1000, 0.1);
    this.lastTime = currentTime;

    if (!this.settings.paused) {
      this.accumulatedTime += delta * this.settings.speed * 1000;
    }

    if (this.onUpdateCallback) {
      this.onUpdateCallback(delta, this.accumulatedTime);
    }

    this.postProcessing.render();
  };

  private initEventListeners(): void {
    window.addEventListener('pointermove', (e) => {
      this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    });

    window.addEventListener('resize', () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      this.camera.aspect = w / h;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(w, h);
      this.postProcessing.setSize(w, h);
    });
  }
}
