export class InputManager {
  public touchPos: [number, number] = [0, 0];
  public touchDelta: [number, number] = [0, 0];
  private lastTouchPos: [number, number] = [0, 0];
  public touchActive: number = 0.0;
  public onInteract: (() => void) | null = null;

  constructor() {
    this.initListeners();
  }

  private initListeners(): void {
    const updatePointer = (x: number, y: number, active: number) => {
      const dpr = Math.min(window.devicePixelRatio, 1.5);
      const px = x * dpr;
      const py = (window.innerHeight - y) * dpr;

      this.touchDelta[0] = px - this.lastTouchPos[0];
      this.touchDelta[1] = py - this.lastTouchPos[1];
      
      this.lastTouchPos[0] = px;
      this.lastTouchPos[1] = py;
      this.touchPos[0] = px;
      this.touchPos[1] = py;
      this.touchActive = active;
    };

    window.addEventListener('mousemove', (e) => {
      updatePointer(e.clientX, e.clientY, e.buttons > 0 ? 1.0 : 0.4);
    });

    window.addEventListener('mousedown', (e) => {
      const target = e.target as HTMLElement;
      if (target.closest('.hud-card') || target.closest('button') || target.closest('input')) return;
      updatePointer(e.clientX, e.clientY, 1.0);
      if (this.onInteract) this.onInteract();
    });

    window.addEventListener('mouseup', () => {
      this.touchActive = 0.4;
    });

    window.addEventListener('touchstart', (e) => {
      const target = e.target as HTMLElement;
      if (target.closest('.hud-card') || target.closest('button') || target.closest('input')) return;
      if (e.touches.length > 0) {
        updatePointer(e.touches[0].clientX, e.touches[0].clientY, 1.0);
      }
      if (this.onInteract) this.onInteract();
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        updatePointer(e.touches[0].clientX, e.touches[0].clientY, 1.0);
      }
    }, { passive: true });

    window.addEventListener('touchend', () => {
      this.touchActive = 0.0;
    });
  }

  public update(): void {
    this.touchDelta[0] *= 0.8;
    this.touchDelta[1] *= 0.8;
  }
}