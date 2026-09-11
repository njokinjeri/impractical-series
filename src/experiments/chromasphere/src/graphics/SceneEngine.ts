import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { MaterialManager } from './materials/MaterialManager';
import { ShapeRegistry } from './shapes/ShapeRegistry';
import type {
  AudioBands,
  MaterialPreset,
  ShapeMode,
  ColorMode,
} from '../types/state';

export interface SceneEngineOptions {
  container: HTMLElement;
  colorMode?: ColorMode;
  shape?: ShapeMode;
  material?: MaterialPreset;
}

export class SceneEngine {
  readonly scene: THREE.Scene;
  readonly camera: THREE.PerspectiveCamera;
  readonly renderer: THREE.WebGLRenderer;
  readonly controls: OrbitControls;
  readonly materials: MaterialManager;
  readonly shapes: ShapeRegistry;
  readonly group: THREE.Group;
  readonly envTexture: THREE.Texture;

  private lastTime = performance.now();
  private elapsed = 0;
  private readonly resizeObserver: ResizeObserver;
  private freqSmooth = 0.05;
  private rafId = 0;
  private disposed = false;
  private currentShape: ShapeMode = 'spiked';

  constructor(opts: SceneEngineOptions) {
    const { container } = opts;
    const colorMode = opts.colorMode ?? 'light';
    const initialShape = opts.shape ?? 'spiked';
    const initialMaterial = opts.material ?? 'iridescent';

    this.currentShape = initialShape;

    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(
      42,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    this.camera.position.set(0, 0, 7.0);

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.15;
    container.appendChild(this.renderer.domElement);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.minDistance = 2.5;
    this.controls.maxDistance = 8.0;

    const pmrem = new THREE.PMREMGenerator(this.renderer);
    this.envTexture = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    this.scene.environment = this.envTexture;

    this.scene.add(new THREE.AmbientLight(0xffffff, 1.2));

    const key = new THREE.DirectionalLight(0xffffff, 2.2);
    key.position.set(4, 5, 4);
    this.scene.add(key);

    const fill = new THREE.DirectionalLight(0xfce7f3, 1.5);
    fill.position.set(-4, -2, -2);
    this.scene.add(fill);

    this.materials = new MaterialManager(colorMode);
    this.materials.setPreset(initialMaterial);

    this.shapes = new ShapeRegistry(this.materials.glass);
    this.shapes.setColorMode(colorMode);
    this.shapes.setShape(initialShape);

    this.group = new THREE.Group();
    this.scene.add(this.group);

    this.applyShapeChildren();
    this.applyColorMode(colorMode);

    this.resizeObserver = new ResizeObserver(() => this.handleResize());
    this.resizeObserver.observe(container);
    window.addEventListener('resize', this.handleResize);
  }

  private applyShapeChildren() {
    while (this.group.children.length > 0) {
      this.group.remove(this.group.children[0]);
    }
    for (const child of this.shapes.getActiveChildren()) {
      this.group.add(child);
    }
  }

  private applyColorMode(mode: ColorMode) {
    if (mode === 'dark') {
      this.renderer.setClearColor(0x000000, 1);
      this.renderer.toneMappingExposure = 1.05;
    } else {
      this.renderer.setClearColor(0xffffff, 0);
      this.renderer.toneMappingExposure = 1.15;
    }
  }

  setShape(mode: ShapeMode) {
    this.currentShape = mode;
    this.shapes.setShape(mode);
    this.applyShapeChildren();
  }

  setMaterial(preset: MaterialPreset) {
    this.materials.setPreset(preset);
  }

  setColorMode(mode: ColorMode) {
    this.materials.setMode(mode);
    this.shapes.setColorMode(mode);
    this.applyColorMode(mode);
  }

  private handleResize = () => {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  };

  tick(getBands: () => AudioBands) {
    if (this.disposed) return;
    this.rafId = requestAnimationFrame(() => this.tick(getBands));

    const now = performance.now();
    this.elapsed += (now - this.lastTime) / 1000;
    this.lastTime = now;
    const elapsed = this.elapsed;
    const bands = getBands();

    this.freqSmooth = THREE.MathUtils.lerp(
      this.freqSmooth,
      bands.average * 1.0,
      0.1
    );

    this.shapes.update(elapsed, this.freqSmooth, bands.bass);

    switch (this.currentShape) {
      case 'cube':
        this.group.rotation.y = elapsed * 0.15;
        this.group.rotation.x = Math.sin(elapsed * 0.1) * 0.08;
        break;
      case 'star':
        this.group.rotation.y = elapsed * 0.1;
        this.group.rotation.x = 0;
        break;
      case 'spiked':
        this.group.rotation.y = elapsed * 0.05;
        this.group.rotation.x = 0;
        break;
    }

    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }

  dispose() {
    this.disposed = true;
    cancelAnimationFrame(this.rafId);
    this.resizeObserver.disconnect();
    window.removeEventListener('resize', this.handleResize);
    this.controls.dispose();
    this.renderer.dispose();
    this.envTexture.dispose();
  }
}
