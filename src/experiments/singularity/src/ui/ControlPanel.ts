import { GUI, Controller } from 'three/examples/jsm/libs/lil-gui.module.min.js';
import type { TunnelSettings } from '../config/settings';
import { Engine } from '../core/Engine';
import { PostProcessing } from '../core/PostProcessing';
import { MaterialManager } from '../materials/MaterialManager';

export class ControlPanel {
  public gui: GUI;
  private chaseDistCtrl!: Controller;
  private chaseHeightCtrl!: Controller;
  private lookaheadCtrl!: Controller;
  private insideFogCtrl!: Controller;
  private chaseFogCtrl!: Controller;

  constructor(
    settings: TunnelSettings,
    engine: Engine,
    postProcessing: PostProcessing,
    materials: MaterialManager,
    onArchitectureChange: () => void,
    onRenderModeChange: () => void
  ) {
    this.gui = new GUI({ title: 'Tunnel Controls' });

    const addCtrl = (
      parent: GUI,
      obj: unknown,
      prop: keyof TunnelSettings,
      ...args: unknown[]
    ): Controller => {
      // @ts-expect-error - lil-gui method overloads fail on literal union interfaces
      return parent.add(obj, prop, ...args) as Controller;
    };

    addCtrl(this.gui, settings, 'architecture', ['Vortex', 'Tunnel', 'Grid'])
      .name('Architecture')
      .onChange(onArchitectureChange);

    addCtrl(this.gui, settings, 'perspective', [
      'Interior Flight',
      'External Chase',
    ])
      .name('Perspective')
      .onChange(() => this.updateVisibility(settings));

    const styleFolder = this.gui.addFolder('Geometry & Style');
    addCtrl(styleFolder, settings, 'renderMode', [
      'Wireframe',
      'Particles',
      'Hybrid',
    ])
      .name('Render Mode')
      .onChange(onRenderModeChange);

    styleFolder
      .addColor(settings, 'color')
      .name('Primary Color')
      .onChange((c: unknown) => {
        materials.updateColor(c as string);
        engine.setFogColor(c as string);
      });

    addCtrl(styleFolder, settings, 'lineOpacity', 0.1, 1.0, 0.05)
      .name('Line Opacity')
      .onChange((v: unknown) => {
        materials.lineMaterial.opacity = v as number;
      });

    addCtrl(styleFolder, settings, 'particleSize', 0.005, 0.1, 0.005)
      .name('Particle Size')
      .onChange((s: unknown) => {
        materials.particleMaterial.size = s as number;
      });

    const flightFolder = this.gui.addFolder('Flight Mechanics');
    addCtrl(flightFolder, settings, 'speed', 0.01, 0.3, 0.005).name(
      'Flight Speed'
    );

    this.chaseDistCtrl = addCtrl(
      flightFolder,
      settings,
      'chaseDistance',
      1.5,
      12.0,
      0.1
    ).name('Chase Distance');

    this.chaseHeightCtrl = addCtrl(
      flightFolder,
      settings,
      'chaseHeight',
      0.0,
      6.0,
      0.1
    ).name('Camera Height');

    this.lookaheadCtrl = addCtrl(
      flightFolder,
      settings,
      'lookAhead',
      0.01,
      0.15,
      0.005
    ).name('Path Lookahead');

    const opticsFolder = this.gui.addFolder('Atmosphere & Optics');
    this.insideFogCtrl = addCtrl(
      opticsFolder,
      settings,
      'insideFog',
      0.0,
      0.5,
      0.01
    ).name('Interior Depth Fog');

    this.chaseFogCtrl = addCtrl(
      opticsFolder,
      settings,
      'chaseFog',
      0.1,
      0.5,
      0.01
    ).name('External Depth Fog');

    addCtrl(opticsFolder, settings, 'bloom', 0, 5, 0.1)
      .name('Bloom Glow')
      .onChange((v: unknown) => {
        postProcessing.bloomPass.strength = v as number;
      });

    addCtrl(opticsFolder, settings, 'motionTrails', 0.0, 0.98, 0.01)
      .name('Motion Trails')
      .onChange((v: unknown) => {
        postProcessing.afterimagePass.uniforms['damp'].value = v as number;
      });

    addCtrl(this.gui, settings, 'paused').name('Pause');
    this.updateVisibility(settings);
  }

  public updateVisibility(settings: TunnelSettings): void {
    const isChase = settings.perspective === 'External Chase';
    const isTunnel = settings.architecture === 'Tunnel';

    this.chaseDistCtrl.show(isChase);
    this.chaseHeightCtrl.show(isChase);
    this.lookaheadCtrl.show(isTunnel);
    this.insideFogCtrl.show(!isChase);
    this.chaseFogCtrl.show(isChase);
  }
}
