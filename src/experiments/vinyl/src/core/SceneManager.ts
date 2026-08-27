import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export class SceneManager {
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private controls: OrbitControls;

  private readonly DEFAULT_CAMERA_POSITION = new THREE.Vector3(0, 6.8, 3.0);

  constructor() {
    this.scene = this.createScene();
    this.camera = this.createCamera();
    this.renderer = this.createRenderer();
    this.controls = this.createControls();
    this.setupLights();
  }

  private createScene(): THREE.Scene {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#040406');
    scene.fog = new THREE.FogExp2('#040406', 0.025);
    return scene;
  }

  private createCamera(): THREE.PerspectiveCamera {
    const aspect = window.innerWidth / window.innerHeight;
    const camera = new THREE.PerspectiveCamera(40, aspect, 0.1, 100);
    camera.position.copy(this.DEFAULT_CAMERA_POSITION);
    return camera;
  }

  private createRenderer(): THREE.WebGLRenderer {
    const container = document.getElementById('webgl-container');
    if (!container) {
      throw new Error('Container element not found');
    }

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
      powerPreference: 'high-performance',
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    
    container.appendChild(renderer.domElement);
    return renderer;
  }

  private createControls(): OrbitControls {
    const controls = new OrbitControls(this.camera, this.renderer.domElement);
    
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.minPolarAngle = 0;
    controls.maxPolarAngle = Math.PI;
    controls.minAzimuthAngle = -Infinity;
    controls.maxAzimuthAngle = Infinity;
    controls.minDistance = 1.5;
    controls.maxDistance = 15;
    controls.target.set(0, 0, 0);
    controls.update();

    controls.enableRotate = true;
    
    return controls;
  }

  private setupLights(): void {
    const ambientLight = new THREE.AmbientLight(0x404060, 0.8);
    this.scene.add(ambientLight);

    const hemisphereLight = new THREE.HemisphereLight(0x8088a0, 0x202030, 0.6);
    this.scene.add(hemisphereLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.3);
    directionalLight.position.set(5, 10, 7);
    this.scene.add(directionalLight);
  }

  public getScene(): THREE.Scene {
    return this.scene;
  }

  public getControls(): OrbitControls {
    return this.controls;
  }

  public onResize(): void {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const aspect = width / height;
    
    this.camera.aspect = aspect;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  public render(): void {
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }

  public resetCamera(): void {
    this.camera.position.copy(this.DEFAULT_CAMERA_POSITION);
    this.controls.target.set(0, 0, 0);
    this.controls.update();
  }

  public dispose(): void {
    this.renderer.dispose();
    this.controls.dispose();
    const container = document.getElementById('webgl-container');
    if (container && this.renderer.domElement.parentNode === container) {
      container.removeChild(this.renderer.domElement);
    }
  }
}