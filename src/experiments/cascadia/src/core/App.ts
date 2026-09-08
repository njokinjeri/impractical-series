import * as CANNON from 'cannon-es';
import { PhysicsWorld } from './PhysicsWorld';
import { Renderer } from './Renderer';
import { CameraController } from './CameraController';
import { DominoChain } from './DominoChain';
import { AudioManager } from './AudioManager';
import { UIManager } from '../ui/UIManager';
import { DEFAULT_CONFIG, SLIM_PROFILE, PATH_SPACING } from '../config';
import type { AppConfig } from '../utils/types';
import * as THREE from 'three';

export class App {
  private audio: AudioManager;
  private ui: UIManager;
  private renderer: Renderer;
  private physics: PhysicsWorld;
  private cameraController: CameraController;
  private dominoChain: DominoChain | null = null;
  
  private config: AppConfig;
  private isTriggered: boolean = false;
  private isPreviewingPath: boolean = false;
  private previewProgress: number = 0;
  private lastFallenIndex: number = -1;
  private cameraShakeTrauma: number = 0;
  private animationId: number | null = null;
  private shakeDecay: number = 0.02;
  private _previousCameraMode: string = 'follow';

  private isWaveActive: boolean = false;
  private hasSwitchedToFree: boolean = false;
  private lastCheckedIndex: number = -1;
  private cascadeCheckTimer: number | null = null;

  private raycaster: THREE.Raycaster = new THREE.Raycaster();
  private mouse: THREE.Vector2 = new THREE.Vector2();
  private isPointerDown: boolean = false;
  private pointerStartPos: { x: number; y: number } | null = null;

  constructor() {
    this.audio = new AudioManager();
    this.ui = new UIManager();
    this.config = { ...DEFAULT_CONFIG };
    
    this.renderer = new Renderer();
    this.physics = new PhysicsWorld();
    this.cameraController = new CameraController(this.renderer.getCamera(), this.renderer.getCanvas());
    
    this.ui.bindEvents(this);
    this.setupInteraction();
    this.rebuild();
    this.startAnimation();
  }

  private setupInteraction(): void {
    const canvas = this.renderer.getCanvas();
    
    canvas.addEventListener('pointerdown', (event) => {
      this.isPointerDown = true;
      this.pointerStartPos = { x: event.clientX, y: event.clientY };
    });

    canvas.addEventListener('pointerup', (event) => {
      if (!this.isPointerDown || !this.pointerStartPos) {
        return;
      }
      
      const dx = event.clientX - this.pointerStartPos.x;
      const dy = event.clientY - this.pointerStartPos.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 10) {
        this.handleInteraction(event);
      }
      
      this.isPointerDown = false;
      this.pointerStartPos = null;
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'l' || event.key === 'L') {
        this.cameraController.toggleLock();
      }
      if (event.key === 'Escape' && this.isPreviewingPath) {
        this.stopPathPreview();
      }
    });
  }

  private handleInteraction(event: PointerEvent): void {
    this.audio.init();
    
    const rect = this.renderer.getCanvas().getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    
    this.mouse.set(x, y);
    this.raycaster.setFromCamera(this.mouse, this.renderer.getCamera());
    
    if (!this.dominoChain) return;
    
    const meshes = this.dominoChain.meshesList;
    const intersects = this.raycaster.intersectObjects(meshes, false);
    
    if (intersects.length > 0) {
      const hitMesh = intersects[0].object;
      const hitIdx = meshes.indexOf(hitMesh as THREE.Mesh);
      if (hitIdx !== -1) {
        const isFallen = this.dominoChain.hasFallen[hitIdx];
        if (!isFallen) {
          this.pushDominoAtIndex(hitIdx);
        }
      }
    }
  }

  rebuild(): void {
    if (this.dominoChain) {
      this.dominoChain.dispose();
      this.dominoChain = null;
    }

    if (this.cascadeCheckTimer !== null) {
      window.clearTimeout(this.cascadeCheckTimer);
      this.cascadeCheckTimer = null;
    }

    this.renderer.updateTheme(this.config.theme);
    this.ui.updateTheme(this.config.theme);

    const spacing = PATH_SPACING[this.config.pathType] || 0.30;
    
    this.dominoChain = new DominoChain({
      profile: SLIM_PROFILE,
      count: this.config.count,
      spacingRatio: spacing,
      pathType: this.config.pathType,
      theme: this.config.theme,
    });

    this.dominoChain.build(this.renderer.getScene(), this.physics.getWorld());

    this.isTriggered = false;
    this.isPreviewingPath = false;
    this.lastFallenIndex = -1;
    this.cameraShakeTrauma = 0;
    this.isWaveActive = false;
    this.hasSwitchedToFree = false;
    this.lastCheckedIndex = -1;

    this.cameraController.setIgnoreFollow(false);
    this.cameraController.unlock();
    this.cameraController.setupView(this.config.cameraMode);
    this.ui.updateMetrics(this.config.count, 0);
    
    this.stopPathPreview();
  }

  pushDominoAtIndex(index: number): void {
    if (!this.dominoChain) return;
    if (index < 0 || index >= this.dominoChain.getCount()) return;

    this.audio.init();
    this.isTriggered = true;
    this.isWaveActive = true;
    this.hasSwitchedToFree = false;
    this.lastCheckedIndex = -1;

    this.cameraController.setIgnoreFollow(false);
    
    if (this.isPreviewingPath) {
      this.stopPathPreview();
    }

    this.cameraController.resetUserInteraction();

    const body = this.dominoChain.getBody(index);
    const profile = this.dominoChain.getProfile();

    if (!body) return;

    const forward = body.quaternion.vmult(new CANNON.Vec3(0, 0, 1));
    forward.normalize();
    
    let impulseMagnitude = profile.mass * 2.5;
    if (this.config.pathType === 'wave') {
      impulseMagnitude = profile.mass * 3.5;
    }
    
    const pushImpulse = forward.scale(impulseMagnitude);

    const pushPoint = new CANNON.Vec3(
      body.position.x,
      body.position.y + profile.h * 0.4,
      body.position.z
    );

    body.wakeUp();
    body.applyImpulse(pushImpulse, pushPoint);

    this.startCascadeCheckTimer();
  }

  private startCascadeCheckTimer(): void {
    if (this.cascadeCheckTimer !== null) {
      window.clearTimeout(this.cascadeCheckTimer);
    }

    this.cascadeCheckTimer = window.setTimeout(() => {
      this.runForceCheck();
      this.cascadeCheckTimer = null;
    }, 3000);
  }

  private runForceCheck(): void {
    if (!this.dominoChain) return;
    
    const total = this.dominoChain.getCount();
    const fallen = this.dominoChain.getFallenCount();
    
    if (fallen < total) {
      const newlyFallen = this.dominoChain.forceCheckFallen();
      if (newlyFallen > 0) {
        const updatedFallen = this.dominoChain.getFallenCount();
        this.ui.updateMetrics(total, updatedFallen);
      }
    }
  }

  private checkTwoDirectionalFalling(index: number): void {
    if (!this.dominoChain) return;
    if (this.hasSwitchedToFree) return;
    
    const total = this.dominoChain.getCount();
    if (total < 10) return;
    if (index - this.lastCheckedIndex < 2) return;
    this.lastCheckedIndex = index;
    
    let startIdx = -1;
    for (let i = 0; i < total; i++) {
      if (this.dominoChain.hasFallen[i]) {
        startIdx = i;
        break;
      }
    }
    
    if (startIdx === -1) return;
    
    let leftCount = 0;
    let rightCount = 0;
    
    for (let i = 0; i < total; i++) {
      if (this.dominoChain.hasFallen[i]) {
        if (i < startIdx) leftCount++;
        else if (i > startIdx) rightCount++;
      }
    }
    
    if (leftCount >= 2 && rightCount >= 2) {
      this.hasSwitchedToFree = true;
      this.switchToFreeOrbit();
    }
  }

  private switchToFreeOrbit(): void {
    if (this.hasSwitchedToFree) return;
    this.hasSwitchedToFree = true;
    
    this.config.cameraMode = 'free';
    const cameraSelect = document.getElementById('select-camera') as HTMLSelectElement;
    if (cameraSelect) {
      cameraSelect.value = 'free';
    }
    this.cameraController.setupView('free');
    this.cameraController.setIgnoreFollow(true);
    this.config.followEnabled = false;
    
    const followToggle = document.getElementById('chk-follow') as HTMLInputElement;
    if (followToggle) {
      followToggle.checked = false;
    }
    
    this.ui.showTwoDirectionNotification();
  }

  handleDominoFall(index: number): void {
    if (this.isWaveActive) {
      this.checkTwoDirectionalFalling(index);
    }
    
    const fallenCount = this.dominoChain?.getFallenCount() || 0;
    this.lastFallenIndex = index;
    
    if (fallenCount < 5) {
      this.cameraShakeTrauma = Math.min(this.cameraShakeTrauma + 0.15, 0.6);
    } else if (fallenCount < 15) {
      this.cameraShakeTrauma = Math.min(this.cameraShakeTrauma + 0.06, 0.3);
    }

    if (this.dominoChain) {
      const pos = this.dominoChain.getMeshPosition(index);
      if (pos) {
        const proj = pos.clone().project(this.renderer.getCamera());
        this.audio.playImpact(index, proj.x);
      }
    }

    if (this.dominoChain) {
      const fallen = this.dominoChain.getFallenCount();
      this.ui.updateMetrics(this.config.count, fallen);
      
      if (fallen >= this.config.count) {
        this.isWaveActive = false;
      }
    }
  }

  triggerPathPreview(): void {
    if (this.isPreviewingPath) {
      this.stopPathPreview();
      return;
    }
    
    this.isPreviewingPath = true;
    this.previewProgress = 0;
    this._previousCameraMode = this.config.cameraMode;
    
    this.config.cameraMode = 'follow';
    const cameraSelect = document.getElementById('select-camera') as HTMLSelectElement;
    if (cameraSelect) {
      cameraSelect.value = 'follow';
    }
    this.cameraController.setupView('follow');
    this.cameraController.resetUserInteraction();
    
    const previewBtn = document.getElementById('btn-preview');
    if (previewBtn) {
      previewBtn.textContent = '⏹ Stop Preview';
      previewBtn.style.background = 'var(--color-accent-hover)';
      previewBtn.style.color = '#fff';
    }
  }

  stopPathPreview(): void {
    this.isPreviewingPath = false;
    this.previewProgress = 0;
    
    if (this._previousCameraMode) {
      this.config.cameraMode = this._previousCameraMode;
      const cameraSelect = document.getElementById('select-camera') as HTMLSelectElement;
      if (cameraSelect) {
        cameraSelect.value = this._previousCameraMode;
      }
      this.cameraController.setupView(this._previousCameraMode);
    }
    
    const previewBtn = document.getElementById('btn-preview');
    if (previewBtn) {
      previewBtn.textContent = '🎥 Preview Path';
      previewBtn.style.background = '';
      previewBtn.style.color = '';
    }
  }

  updateCamera(): void {
    this.cameraController.setupView(this.config.cameraMode);
  }

  private startAnimation(): void {
    const animate = () => {
      this.animationId = requestAnimationFrame(animate);
      this.update();
    };
    animate();
  }

  private update(): void {
    this.physics.step();

    if (this.dominoChain) {
      const total = this.dominoChain.getCount();
      const fallen = this.dominoChain.updatePositions(
        (index: number) => this.handleDominoFall(index)
      );

      if (this.isTriggered && fallen > 0) {
        this.ui.updateMetrics(this.config.count, fallen);
      }

      if (this.isTriggered) {
        const currentFallen = this.dominoChain.getFallenCount();
        
        if (currentFallen >= total - 2 && currentFallen < total) {
          const newlyFallen = this.dominoChain.forceCheckFallen();
          if (newlyFallen > 0) {
            const updatedFallen = this.dominoChain.getFallenCount();
            this.ui.updateMetrics(total, updatedFallen);
          }
        }
      }
    }

    this.cameraController.update(
      this.config.cameraMode,
      this.isPreviewingPath,
      this.previewProgress,
      this.lastFallenIndex,
      this.dominoChain,
      this.cameraShakeTrauma,
      this.config.followEnabled
    );

    if (this.cameraShakeTrauma > 0) {
      this.cameraShakeTrauma = Math.max(0, this.cameraShakeTrauma - this.shakeDecay);
    }

    this.renderer.render();
  }

  setConfig<K extends keyof AppConfig>(key: K, value: AppConfig[K]): void {
    this.config[key] = value;
  }

  getConfig<K extends keyof AppConfig>(key: K): AppConfig[K] {
    return this.config[key];
  }

  dispose(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
    if (this.dominoChain) {
      this.dominoChain.dispose();
    }
    if (this.cascadeCheckTimer !== null) {
      window.clearTimeout(this.cascadeCheckTimer);
      this.cascadeCheckTimer = null;
    }
    this.physics.dispose();
    this.renderer.dispose();
    this.audio.dispose();
    this.ui.dispose();
  }
}