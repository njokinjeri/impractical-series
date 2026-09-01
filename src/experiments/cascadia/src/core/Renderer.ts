import * as THREE from 'three';
import type { Theme } from '../utils/types';

export class Renderer {
  private canvas: HTMLCanvasElement;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private ambientLight!: THREE.AmbientLight;
  private dirLight!: THREE.DirectionalLight;
  private grid: THREE.GridHelper | null = null;
  private groundPlane: THREE.Mesh | null = null;
  private gridSize: number = 80;
  private gridDivisions: number = 80;

  constructor() {
    this.canvas = document.getElementById('webgl-canvas') as HTMLCanvasElement;
    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.5,
      800
    );

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: false,
    });

    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setClearColor(0x000000, 1);

    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFShadowMap;

    this.setupLights();
    this.updateTheme('blueprint');

    window.addEventListener('resize', () => this.onResize());

    window.addEventListener('orientationchange', () => {
      setTimeout(() => this.onResize(), 300);
    });
  }

  private setupLights(): void {
    this.ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    this.scene.add(this.ambientLight);

    this.dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    this.dirLight.position.set(15, 25, 15);
    this.dirLight.castShadow = true;
    this.scene.add(this.dirLight);

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.6);
    this.scene.add(hemiLight);
  }

  updateTheme(theme: Theme): void {
    let bgColor: THREE.Color;
    switch (theme) {
      case 'blueprint':
        bgColor = new THREE.Color(0xf4f1ea);
        this.ambientLight.intensity = 1.0;
        break;
      case 'obsidian':
        bgColor = new THREE.Color(0x0b0c10);
        this.ambientLight.intensity = 0.5;
        break;
      case 'pastel':
        bgColor = new THREE.Color(0x1e1e24);
        this.ambientLight.intensity = 0.85;
        break;
    }

    this.scene.background = bgColor;
    this.renderer.setClearColor(bgColor, 1);

    this.updateGrid(theme);
    this.updateGroundPlane(theme);
  }

  private updateGrid(theme: Theme): void {
    if (this.grid) {
      this.scene.remove(this.grid);
      this.grid.geometry.dispose();
      if (Array.isArray(this.grid.material)) {
        this.grid.material.forEach((m) => m.dispose());
      } else {
        this.grid.material.dispose();
      }
    }

    let centerColor: THREE.Color;
    let gridColor: THREE.Color;

    switch (theme) {
      case 'blueprint':
        centerColor = new THREE.Color(0x0055ff);
        gridColor = new THREE.Color(0x000000);
        break;
      case 'obsidian':
        centerColor = new THREE.Color(0x64ffda);
        gridColor = new THREE.Color(0x1f293d);
        break;
      case 'pastel':
        centerColor = new THREE.Color(0xff70a6);
        gridColor = new THREE.Color(0x3a3a46);
        break;
    }

    this.grid = new THREE.GridHelper(
      this.gridSize,
      this.gridDivisions,
      centerColor,
      gridColor
    );
    this.grid.position.y = -0.01;
    this.scene.add(this.grid);
  }

  private updateGroundPlane(theme: Theme): void {
    if (this.groundPlane) {
      this.scene.remove(this.groundPlane);
      this.groundPlane.geometry.dispose();
      if (Array.isArray(this.groundPlane.material)) {
        this.groundPlane.material.forEach((m) => m.dispose());
      } else {
        this.groundPlane.material.dispose();
      }
      this.groundPlane = null;
    }

    let color: THREE.Color;
    switch (theme) {
      case 'blueprint':
        color = new THREE.Color(0xf4f1ea);
        break;
      case 'obsidian':
        color = new THREE.Color(0x0b0c10);
        break;
      case 'pastel':
        color = new THREE.Color(0x1e1e24);
        break;
    }

    const groundGeo = new THREE.PlaneGeometry(
      this.gridSize * 1.5,
      this.gridSize * 1.5
    );
    const groundMat = new THREE.MeshBasicMaterial({
      color: color,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 1.0,
    });

    this.groundPlane = new THREE.Mesh(groundGeo, groundMat);
    this.groundPlane.rotation.x = -Math.PI / 2;
    this.groundPlane.position.y = -0.1;
    this.scene.add(this.groundPlane);
  }

  getThemeColors(theme: Theme): {
    background: THREE.Color;
    accent: THREE.Color;
    grid: THREE.Color;
  } {
    switch (theme) {
      case 'blueprint':
        return {
          background: new THREE.Color(0xf4f1ea),
          accent: new THREE.Color(0x0055ff),
          grid: new THREE.Color(0x000000),
        };
      case 'obsidian':
        return {
          background: new THREE.Color(0x0b0c10),
          accent: new THREE.Color(0x64ffda),
          grid: new THREE.Color(0x1f293d),
        };
      case 'pastel':
        return {
          background: new THREE.Color(0x1e1e24),
          accent: new THREE.Color(0xff70a6),
          grid: new THREE.Color(0x3a3a46),
        };
    }
  }

  onResize(): void {
    const w = window.innerWidth;
    const h = window.innerHeight;
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h);
  }

  render(): void {
    this.renderer.render(this.scene, this.camera);
  }

  getScene(): THREE.Scene {
    return this.scene;
  }

  getCamera(): THREE.PerspectiveCamera {
    return this.camera;
  }

  getCanvas(): HTMLCanvasElement {
    return this.canvas;
  }

  dispose(): void {
    this.renderer.dispose();
    window.removeEventListener('resize', () => this.onResize());
  }
}
