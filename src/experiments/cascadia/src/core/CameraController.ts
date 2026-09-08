import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import * as THREE from 'three';
import { DominoChain } from './DominoChain';
import type { CameraMode } from '../utils/types';

export class CameraController {
  private camera: THREE.PerspectiveCamera;
  private controls: OrbitControls;
  private minDistance: number = 2;
  private maxDistance: number = 60;
  private isLocked: boolean = false;
  private userInteracted: boolean = false;
  private followSmoothness: number = 0.03;
  private userInteractTimeout: number | null = null;
  private ignoreFollow: boolean = false;

  constructor(camera: THREE.PerspectiveCamera, canvas: HTMLCanvasElement) {
    this.camera = camera;
    this.controls = new OrbitControls(this.camera, canvas);
    this.controls.enableDamping = true;
    this.controls.target.set(0, 1, 0);
    this.controls.minDistance = this.minDistance;
    this.controls.maxDistance = this.maxDistance;
    this.controls.maxPolarAngle = Math.PI / 2.1;
    this.camera.position.set(0, 16, 22);
    this.controls.update();

    this.controls.addEventListener('start', () => {
      this.userInteracted = true;
      if (this.userInteractTimeout !== null) {
        window.clearTimeout(this.userInteractTimeout);
        this.userInteractTimeout = null;
      }
    });

    this.controls.addEventListener('end', () => {
      if (this.userInteractTimeout !== null) {
        window.clearTimeout(this.userInteractTimeout);
      }
      this.userInteractTimeout = window.setTimeout(() => {
        this.userInteracted = false;
        this.userInteractTimeout = null;
      }, 4000);
    });
  }

  setIgnoreFollow(ignore: boolean): void {
    this.ignoreFollow = ignore;
  }

  setupView(mode: CameraMode): void {
    this.userInteracted = false;
    if (this.userInteractTimeout !== null) {
      window.clearTimeout(this.userInteractTimeout);
      this.userInteractTimeout = null;
    }
    if (mode === 'top') {
      this.camera.position.set(0, 32, 1);
      this.controls.target.set(0, 0, 0);
    } else if (mode === 'follow') {
      this.controls.target.set(0, 1, 0);
      this.userInteracted = false;
    } else {
      this.camera.position.set(0, 16, 22);
      this.controls.target.set(0, 1, 0);
    }
    this.controls.update();
  }

  update(
    mode: CameraMode,
    isPreviewing: boolean,
    previewProgress: number,
    lastFallenIndex: number,
    dominoChain: DominoChain | null,
    shakeTrauma: number,
    followEnabled: boolean
  ): void {
    if (this.ignoreFollow) {
      if (shakeTrauma > 0) {
        const shakeAmount = Math.pow(shakeTrauma, 2) * 0.12;
        this.camera.position.x += (Math.random() - 0.5) * shakeAmount;
        this.camera.position.y += (Math.random() - 0.5) * shakeAmount;
        this.camera.position.z += (Math.random() - 0.5) * shakeAmount;
      }
      this.controls.update();
      return;
    }

    const shouldFollow = 
      mode === 'follow' && 
      followEnabled && 
      !this.userInteracted && 
      lastFallenIndex !== -1 && 
      dominoChain && 
      dominoChain.meshesList.length > 0;

    if (shouldFollow) {
      const target = dominoChain.meshesList[lastFallenIndex].position;
      const idealPos = new THREE.Vector3(target.x + 4, target.y + 3.2, target.z + 5);
      this.camera.position.lerp(idealPos, this.followSmoothness);
      this.controls.target.lerp(target, this.followSmoothness);
    } else if (isPreviewing && dominoChain && dominoChain.meshesList.length > 0) {
      const idx = Math.floor(previewProgress * (dominoChain.meshesList.length - 1));
      const target = dominoChain.meshesList[idx].position;
      this.camera.position.lerp(new THREE.Vector3(target.x + 3, target.y + 2.5, target.z + 4), 0.04);
      this.controls.target.lerp(target, 0.04);
    }

    if (shakeTrauma > 0) {
      const shakeAmount = Math.pow(shakeTrauma, 2) * 0.12;
      this.camera.position.x += (Math.random() - 0.5) * shakeAmount;
      this.camera.position.y += (Math.random() - 0.5) * shakeAmount;
      this.camera.position.z += (Math.random() - 0.5) * shakeAmount;
    }

    if (this.camera.position.y < 0.5) {
      this.camera.position.y = 0.5;
    }

    this.controls.update();
  }

  resetUserInteraction(): void {
    if (this.userInteractTimeout !== null) {
      window.clearTimeout(this.userInteractTimeout);
      this.userInteractTimeout = null;
    }
    this.userInteracted = false;
  }

  setZoomLimits(min: number, max: number): void {
    this.minDistance = min;
    this.maxDistance = max;
    this.controls.minDistance = min;
    this.controls.maxDistance = max;
  }

  lock(): void {
    this.isLocked = true;
    this.controls.enableRotate = false;
    this.controls.enablePan = false;
    this.controls.enableZoom = true;
  }

  unlock(): void {
    this.isLocked = false;
    this.controls.enableRotate = true;
    this.controls.enablePan = true;
    this.controls.enableZoom = true;
  }

  toggleLock(): void {
    if (this.isLocked) {
      this.unlock();
    } else {
      this.lock();
    }
  }

  getControls(): OrbitControls {
    return this.controls;
  }

  isCameraLocked(): boolean {
    return this.isLocked;
  }
}