import { DEFAULT_SETTINGS, type TunnelSettings } from './config/settings';
import { Engine } from './core/Engine';
import { PostProcessing } from './core/PostProcessing';
import { MaterialManager } from './materials/MaterialManager';
import { BaseArchitecture } from './graphics/architectures/BaseArchitecture';
import { Vortex } from './graphics/architectures/Vortex';
import { Conduit } from './graphics/architectures/Tunnel';
import { Grid } from './graphics/architectures/Grid';
import { CameraController } from './graphics/camera/CameraController';
import { ControlPanel } from './ui/ControlPanel';

class App {
  private settings: TunnelSettings = { ...DEFAULT_SETTINGS };
  private engine: Engine;
  private postProcessing: PostProcessing;
  private materials: MaterialManager;
  private cameraController: CameraController;
  private activeArchitecture!: BaseArchitecture;
  private accumulatedTime = 0;

  constructor() {
    this.engine = new Engine();
    this.postProcessing = new PostProcessing(
      this.engine.renderer,
      this.engine.scene,
      this.engine.camera
    );
    this.materials = new MaterialManager(this.settings);
    this.cameraController = new CameraController();

    this.switchArchitecture();

    new ControlPanel(
      this.settings,
      this.engine,
      this.postProcessing,
      this.materials,
      () => this.switchArchitecture(),
      () => this.activeArchitecture.applyRenderMode(this.settings.renderMode)
    );

    this.animate();
  }

  private switchArchitecture(): void {
    if (this.activeArchitecture) {
      this.activeArchitecture.dispose(this.engine.scene);
    }

    if (this.settings.architecture === 'Grid') {
      this.activeArchitecture = new Grid();
      this.materials.setDoubleSided(false);
    } else if (this.settings.architecture === 'Vortex') {
      this.activeArchitecture = new Vortex();
      this.materials.setDoubleSided(true);
    } else {
      this.activeArchitecture = new Conduit();
      this.materials.setDoubleSided(false);
    }

    this.activeArchitecture.init(
      this.engine.scene,
      this.materials,
      this.settings
    );
  }

  private animate = (): void => {
    requestAnimationFrame(this.animate);

    this.engine.updateTimer();

    const delta = this.engine.getDelta();
    if (!this.settings.paused) {
      this.accumulatedTime += delta * this.settings.speed * 1000;
    }

    this.activeArchitecture.update(
      delta,
      this.accumulatedTime,
      this.settings.paused
    );
    this.cameraController.update(
      delta,
      this.accumulatedTime,
      this.settings,
      this.engine
    );
    this.postProcessing.render();
  };
}

new App();
