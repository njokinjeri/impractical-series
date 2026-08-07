import type GUI from 'lil-gui';
import * as THREE from 'three';
import type { AppConfig } from '../config/constants';
import { EngravingMaterial } from '../shaders/EngravingMaterial';
import { RenderLoop } from '../core/RenderLoop';

export class GUIControls {
  private gui: GUI | null = null;
  private config: AppConfig;
  private engravingMat: EngravingMaterial;
  private renderLoop: RenderLoop;
  private onGeometryRebuild: () => void;

  constructor(
    config: AppConfig,
    engravingMat: EngravingMaterial,
    renderLoop: RenderLoop,
    onGeometryRebuild: () => void
  ) {
    this.config = config;
    this.engravingMat = engravingMat;
    this.renderLoop = renderLoop;
    this.onGeometryRebuild = onGeometryRebuild;

    this.initGUI();
  }

  private async initGUI(): Promise<void> {
    const { default: GUIClass } = await import('lil-gui');
    this.gui = new GUIClass({ title: 'Chalcographia' });
    this.setupFolders();
  }

  private setupFolders(): void {
    if (!this.gui) return;

    const geoFolder = this.gui.addFolder('Geometry');

    geoFolder
      .add(this.config, 'activeGeometry', [
        'tetrahedron',
        'cube',
        'octahedron',
        'dodecahedron',
        'icosahedron',
      ])
      .name('Base Solid')
      .onChange(() => this.onGeometryRebuild());

    geoFolder
      .add(this.config, 'stellationFactor', 0.0, 2.0, 0.01)
      .name('Stellation (S)')
      .onChange(() => this.onGeometryRebuild());

    geoFolder
      .add(this.config, 'frameInset', 0.0, 0.45, 0.01)
      .name('Frame Inset')
      .onChange(() => this.onGeometryRebuild());

    const hatchFolder = this.gui.addFolder('Engraving Shader');

    hatchFolder
      .add(this.config, 'hatchFrequency', 50.0, 180.0, 1.0)
      .name('Line Density')
      .onChange((val: number) => {
        this.engravingMat.uniforms.uHatchFrequency.value = val;
        this.renderLoop.requestFrame();
      });

    hatchFolder
      .addColor(this.config, 'inkColor')
      .name('Ink Color')
      .onChange((val: string) => {
        (this.engravingMat.uniforms.uInkColor.value as THREE.Color).set(val);
        this.renderLoop.requestFrame();
      });

    hatchFolder
      .addColor(this.config, 'paperColor')
      .name('Paper Color')
      .onChange((val: string) => {
        (this.engravingMat.uniforms.uPaperColor.value as THREE.Color).set(val);
        this.renderLoop.requestFrame();
      });
  }
}