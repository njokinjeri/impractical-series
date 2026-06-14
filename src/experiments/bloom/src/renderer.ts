import { PALETTE, type FlowerKey } from "./constants.js";
import { state } from "./state.js";

const D2R = Math.PI / 180;

let ctx: CanvasRenderingContext2D;

export function drawBg(): void {
    const { W, H } = state;
    const g = ctx.createRadialGradient(
        W / 2,
        H * 0.42,
        0,
        W / 2,
        H * 0.5,
        Math.max(W, H) * 0.65,
    );
    g.addColorStop(0, "#0a0d0c");
    g.addColorStop(0.5, "#030404");
    g.addColorStop(1, "#000000");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);
}


function colorFor(r: number, dz: number): string {
    const stops = PALETTE[state.flower as FlowerKey][state.variant];
    const n = stops.length;
    const t = Math.min(r * 1.15, 1) * (n - 1);
    const i = Math.min(t | 0, n - 2);
    const f = t - i;
    const a = stops[i];
    const b = stops[i + 1];
    let h = a[0] + (b[0] - a[0]) * f;
    let s = a[1] + (b[1] - a[1]) * f;
    let l = a[2] + (b[2] - a[2]) * f;

    switch (state.cfg.glow) {
        case 1:
            l = Math.max(6, l * (0.35 + dz * 0.65));
            break; // shaded
        case 2:
            l = Math.max(12, l * (0.55 + dz * 0.6));
            break; // warm
        default:
            l = Math.min(96, l * (0.8 + dz * 0.45));
            break; // neon
    }

    return `hsl(${h | 0},${s | 0}%,${l | 0}%)`;
}

export function render(): void {
    drawBg();

    const { W, H, pts, rotX, rotY, zoom } = state;
    const f = 480 * zoom;
    const cx = W / 2;
    const cy = H / 2 - 10;
    const cosX = Math.cos(rotX * D2R);
    const sinX = Math.sin(rotX * D2R);
    const cosY = Math.cos(rotY * D2R);
    const sinY = Math.sin(rotY * D2R);
    const numPts = pts.length;

    if (state.sortIndices.length !== numPts) {
        state.sortIndices = new Int32Array(numPts);
        state.depthBuffer = new Float32Array(numPts);
    }

    for (let i = 0; i < numPts; i++) {
        const p = pts[i];
        const z1 = -p.x * sinY + p.z * cosY;
        const rz = p.y * sinX + z1 * cosX;
        state.sortIndices[i] = i;
        state.depthBuffer[i] = f / (f + rz + 280);
    }

    state.sortIndices.sort(
        (a: number, b: number) => state.depthBuffer[a] - state.depthBuffer[b],
    );

    for (let i = 0; i < numPts; i++) {
        const idx = state.sortIndices[i];
        const p = pts[idx];
        const dz = state.depthBuffer[idx];
        const x1 = p.x * cosY + p.z * sinY;
        const ry = p.y * cosX - (-p.x * sinY + p.z * cosY) * sinX;
        ctx.fillStyle = colorFor(p.r, dz);
        ctx.fillRect(cx + x1 * dz - 1, cy + ry * dz - 1, 2, 2);
    }
}


export function initRenderer(canvas: HTMLCanvasElement): void {
    const context = canvas.getContext("2d");
    if (!context) throw new Error("Could not get 2D context from canvas.");
    ctx = context;
}
