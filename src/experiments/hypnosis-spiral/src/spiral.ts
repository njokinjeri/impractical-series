export interface SpiralSettings {
  color: string;
  speed: number;
  direction: number;
  loops: number;
}

export class SpiralRenderer {
  private ctx: CanvasRenderingContext2D;
  private canvas: HTMLCanvasElement;
  private animationId: number = 0;
  private rotation: number = 0;
  public settings: SpiralSettings;
  public isPaused: boolean = false;

  constructor(canvas: HTMLCanvasElement, settings: SpiralSettings) {
    this.canvas = canvas;
    this.settings = settings;
    this.ctx = canvas.getContext('2d')!;
  }

  public resize() {
    const dpr = window.devicePixelRatio || 1;
    this.canvas.width = this.canvas.clientWidth * dpr;
    this.canvas.height = this.canvas.clientHeight * dpr;

    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.scale(dpr, dpr);

    if (this.isPaused) {
      this.drawFrame();
    }
  }

  public drawFrame() {
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
    this.ctx.fillRect(0, 0, this.canvas.clientWidth, this.canvas.clientHeight);
    this.ctx.save();
    this.ctx.translate(
      this.canvas.clientWidth / 2,
      this.canvas.clientHeight / 2
    );
    this.ctx.rotate(this.rotation);
    this.drawSpiralShape();
    this.ctx.restore();
  }

  draw = () => {
    if (this.isPaused) return;

    this.drawFrame();
    this.rotation -= this.settings.speed * this.settings.direction;
    this.animationId = requestAnimationFrame(this.draw);
  };

  private drawSpiralShape() {
    const { color, loops } = this.settings;
    const precision = 0.1;

    const maxR =
      Math.min(this.canvas.clientWidth, this.canvas.clientHeight) / 2;
    const growth = maxR / (loops * Math.PI * 2);

    const maxThickness = growth * 0.85;

    this.ctx.beginPath();
    this.ctx.fillStyle = color;

    for (let a = 0; a < Math.PI * 2 * loops; a += precision) {
      const taper = Math.min(a, 10) / 10;
      const r = a * growth;
      this.ctx.lineTo(
        (r + maxThickness * taper) * Math.cos(a),
        (r + maxThickness * taper) * Math.sin(a)
      );
    }

    for (let a = Math.PI * 2 * loops; a >= 0; a -= precision) {
      const r = a * growth;
      this.ctx.lineTo(r * Math.cos(a), r * Math.sin(a));
    }

    this.ctx.fill();
  }

  public stop() {
    cancelAnimationFrame(this.animationId);
  }
}
