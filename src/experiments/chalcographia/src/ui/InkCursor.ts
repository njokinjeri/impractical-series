import * as THREE from 'three/webgpu';

export class InkCursor {
  public pointer: THREE.Vector2 = new THREE.Vector2(0, 0);
  public targetPointer: THREE.Vector2 = new THREE.Vector2(0, 0);
  private onMoveCallback?: () => void;

  constructor(onMoveCallback?: () => void) {
    this.onMoveCallback = onMoveCallback;

    window.addEventListener('pointermove', (event: PointerEvent) => {
      this.targetPointer.x = (event.clientX / window.innerWidth) * 2 - 1;
      this.targetPointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

      if (this.onMoveCallback) {
        this.onMoveCallback();
      }
    });
  }

  public update(): void {
    this.pointer.x += (this.targetPointer.x - this.pointer.x) * 0.1;
    this.pointer.y += (this.targetPointer.y - this.pointer.y) * 0.1;
  }
}