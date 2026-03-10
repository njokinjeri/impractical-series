export interface SpiralSettings {
    color: string;
    speed: number;
    direction: number;
    loops: number;
    growth: number;
}

export class SpiralRenderer {
    private ctx: CanvasRenderingContext2D;
    private canvas: HTMLCanvasElement;
    private animationId: number = 0;
    private rotation: number = 0
    public settings: SpiralSettings;
    public isPaused: boolean = false;

    constructor(canvas: HTMLCanvasElement, settings: SpiralSettings) {
        this.canvas = canvas;
        this.settings = settings;
        this.ctx = canvas.getContext('2d')!;
    }

    public recalculate() {
        const maxR = Math.max(this.canvas.width, this.canvas.height) / 2
        this.settings.growth = maxR / (this.settings.loops * Math.PI * 2)
    }

    public drawFrame() {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.save();
        this.ctx.translate(this.canvas.width / 2, this.canvas.height / 2);
        this.ctx.rotate(this.rotation);
        this.drawSpiralShape();
        this.ctx.restore();
    }

    draw = () => {
        if (this.isPaused) return;
        this.drawFrame();
        this.rotation -= (this.settings.speed * this.settings.direction);
        this.animationId = requestAnimationFrame(this.draw);
    }

    private drawSpiralShape() {
        const { color, loops, growth } = this.settings;
        const maxThickness = 16;
        const precision = 0.1;

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