import * as THREE from 'three';

export class Engine {
  public scene: THREE.Scene;
  public camera: THREE.PerspectiveCamera;
  public renderer: THREE.WebGLRenderer;
  public fog: THREE.FogExp2;
  private lastTime: number = performance.now();
  private delta: number = 0;

  constructor(container: HTMLElement = document.body) {
    const w = window.innerWidth;
    const h = window.innerHeight;

    this.scene = new THREE.Scene();
    this.fog = new THREE.FogExp2(0x000000, 0.05);
    this.scene.fog = this.fog;

    this.camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    this.renderer.setSize(w, h);
    this.renderer.setClearColor(0x000000);
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(this.renderer.domElement);

    window.addEventListener('resize', this.onResize.bind(this));
  }

  public updateTimer(): void {
    const now = performance.now();
    this.delta = Math.min((now - this.lastTime) / 1000, 0.1);
    this.lastTime = now;
  }

  public getDelta(): number {
    return this.delta;
  }

  public setFogDensity(rawDensity: number): void {
    this.fog.density = rawDensity * 0.25;
  }

  public setFogColor(colorStr: string): void {
    this.fog.color.set(colorStr);
  }

  private onResize(): void {
    const w = window.innerWidth;
    const h = window.innerHeight;
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h);
  }
}
