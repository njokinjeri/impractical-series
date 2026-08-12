import * as THREE from 'three';
import { MaterialManager } from '../../materials/MaterialManager';
import type { RenderMode } from '../../config/settings';

export abstract class BaseArchitecture {
  public group: THREE.Group;
  protected materials: MaterialManager; 
  protected geometry!: THREE.BufferGeometry;
  protected wireframeGeometry!: THREE.BufferGeometry;
  protected lineSegments!: THREE.LineSegments;
  protected points!: THREE.Points;

  constructor(materials: MaterialManager) { 
    this.materials = materials;            
    this.group = new THREE.Group();
  }

  protected abstract buildGeometry(): THREE.BufferGeometry;

  public init(): void {
    this.geometry = this.buildGeometry();
    this.wireframeGeometry = new THREE.WireframeGeometry(this.geometry);

    this.lineSegments = new THREE.LineSegments(this.wireframeGeometry, this.materials.lineMaterial);
    this.points = new THREE.Points(this.geometry, this.materials.pointMaterial);

    this.group.add(this.lineSegments);
    this.group.add(this.points);
  }

  public setRenderMode(mode: RenderMode): void {
    if (mode === 'Wireframe') {
      this.lineSegments.visible = true;
      this.points.visible = false;
    } else if (mode === 'Particles') {
      this.lineSegments.visible = false;
      this.points.visible = true;
    } else {
      this.lineSegments.visible = true;
      this.points.visible = true;
    }
  }

  public update(_delta: number, _accumulatedTime: number, _isPaused: boolean): void {
  }

  public dispose(): void {
    this.group.remove(this.lineSegments);
    this.group.remove(this.points);

    if (this.geometry) this.geometry.dispose();
    if (this.wireframeGeometry) this.wireframeGeometry.dispose();
  }
}