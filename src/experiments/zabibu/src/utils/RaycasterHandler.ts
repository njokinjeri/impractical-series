import * as THREE from 'three';
import { Grapes } from '../components/Grapes';

export class RaycasterHandler {
  private raycaster = new THREE.Raycaster();
  private mouse = new THREE.Vector2();

  private camera: THREE.PerspectiveCamera;
  private grapes: Grapes;
  private getBounciness: () => number;

  constructor(
    camera: THREE.PerspectiveCamera,
    grapes: Grapes,
    getBounciness: () => number
  ) {
    this.camera = camera;
    this.grapes = grapes;
    this.getBounciness = getBounciness;

    window.addEventListener('pointerdown', this.onCanvasClick);
  }

  private onCanvasClick = (event: MouseEvent): void => {
    const uiPanel = document.getElementById('ui-panel');
    if (uiPanel && uiPanel.contains(event.target as Node)) return;

    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    this.raycaster.setFromCamera(this.mouse, this.camera);

    const activeMeshes = this.grapes.grapesList
      .filter((g) => !g.isDetached)
      .map((g) => g.mesh);

    const intersects = this.raycaster.intersectObjects(activeMeshes);

    if (intersects.length > 0) {
      const hitMesh = intersects[0].object;
      const targetGrape = this.grapes.grapesList.find(
        (g) => g.mesh === hitMesh
      );
      if (targetGrape) {
        this.grapes.detachBerry(targetGrape, this.getBounciness());
      }
    }
  };
}
