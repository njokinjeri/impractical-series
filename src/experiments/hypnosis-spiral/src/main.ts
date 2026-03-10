interface SpiralSettings {
    color: string;
    speed: number;
    isPaused: boolean;
    loops: number;
    growth: number;
}

const canvas = document.getElementById('spiral') as HTMLCanvasElement;
const ctx = canvas.getContext('2d')!;

const settings: SpiralSettings = {
    color: '#d1d1f0',
    speed: 0.09,
    isPaused: false,
    loops: 40,
    growth: 5
};

let rotation = 0;

function draw() {
    if (settings.isPaused) return;

    ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(rotation);

    ctx.beginPath();
    ctx.fillStyle = settings.color;

    const maxThickness = 16;
    const precision = 0.1;


    for (let a = 0; a < Math.PI * 2 * settings.loops; a += precision) {
        const taper = Math.min(a, 10) / 10;
        const r = a * settings.growth;
        const x = (r + maxThickness * taper) * Math.cos(a);
        const y = (r + maxThickness * taper) * Math.sin(a);
        ctx.lineTo(x, y)
    }

    for (let a = Math.PI * 2 * settings.loops; a >= 0; a -= precision) {
        const r = a * settings.growth;
        const x = r * Math.cos(a);
        const y = r * Math.sin(a);
        ctx.lineTo(x, y);
    }

    ctx.fill();
    ctx.restore()

    rotation -= settings.speed;
    requestAnimationFrame(draw)
}

function resizeCanvas() {
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

canvas.addEventListener('click', () => {
    settings.isPaused = !settings.isPaused;
    if (!settings.isPaused) draw();
})


draw()