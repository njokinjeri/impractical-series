import { Engine } from './Engine';

export class RenderLoop {
  private engine: Engine;
  private isRunning: boolean = false;
  private isDirty: boolean = true;
  private animationFrameId: number | null = null;
  private updateCallbacks: Array<(delta: number) => void> = [];

  constructor(engine: Engine) {
    this.engine = engine;

    this.engine.controls.addEventListener('change', () => {
      this.requestFrame();
    });
  }

  public addUpdateCallback(callback: (delta: number) => void): void {
    this.updateCallbacks.push(callback);
  }

  public requestFrame(): void {
    this.isDirty = true;
  }

  public start(): void {
    if (this.isRunning) return;
    this.isRunning = true;
    this.isDirty = true;
    let lastTime = performance.now();

    const loop = (currentTime: number) => {
      if (!this.isRunning) return;

      const delta = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      const controlsUpdating = this.engine.controls.update();

      if (this.isDirty || controlsUpdating) {
        this.isDirty = false;

        for (let i = 0; i < this.updateCallbacks.length; i++) {
          this.updateCallbacks[i](delta);
        }

        this.engine.renderer.render(this.engine.scene, this.engine.camera);
      }

      this.animationFrameId = requestAnimationFrame(loop);
    };

    this.animationFrameId = requestAnimationFrame(loop);
  }

  public stop(): void {
    this.isRunning = false;
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }
}
