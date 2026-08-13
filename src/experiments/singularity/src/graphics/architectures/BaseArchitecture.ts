import * as THREE from 'three';
import { MaterialManager } from '../../materials/MaterialManager';
import type { TunnelSettings } from '../../config/settings';

export abstract class BaseArchitecture {
  public geometry!: THREE.BufferGeometry;
  public lines!: THREE.LineSegments;
  public particles!: THREE.Points;

  public abstract buildGeometry(): THREE.BufferGeometry;

  public init(
    scene: THREE.Scene,
    materials: MaterialManager,
    settings: TunnelSettings
  ): void {
    this.geometry = this.buildGeometry();
    const wireframeGeo = new THREE.WireframeGeometry(this.geometry);

    this.lines = new THREE.LineSegments(wireframeGeo, materials.lineMaterial);
    this.particles = new THREE.Points(
      this.geometry,
      materials.particleMaterial
    );

    scene.add(this.lines);
    scene.add(this.particles);
    this.applyRenderMode(settings.renderMode);
  }

  public applyRenderMode(mode: string): void {
    this.lines.visible = mode === 'Wireframe' || mode === 'Hybrid';
    this.particles.visible = mode === 'Particles' || mode === 'Hybrid';
  }

  public abstract update(
    delta: number,
    accumulatedTime: number,
    isPaused: boolean
  ): void;

  public dispose(scene: THREE.Scene): void {
    scene.remove(this.lines);
    scene.remove(this.particles);
    this.geometry.dispose();
  }
}
