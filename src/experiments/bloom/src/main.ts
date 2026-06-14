import { SPIN_SPD } from "./constants.js";
import { state } from "./state.js";
import { build } from "./geometry.js";
import { initRenderer, render } from "./renderer.js";
import { initControls } from "./controls.js";

function startBloom(): void {
    state.bloomT = 0;
    state.blooming = true;
    state.pts = build(0.01);
}

function loop(now: DOMHighResTimeStamp): void {
    const dt = Math.min(50, now - state.last);
    state.last = now;

    if (state.blooming) {
        state.bloomT = Math.min(1, state.bloomT + dt / 1200);
        state.pts = build(state.bloomT);
        if (state.bloomT >= 1) state.blooming = false;
    }

    if (state.cfg.spin > 0) {
        state.rotY += (SPIN_SPD[state.cfg.spin] * dt) / 14;
    }

    render();
    requestAnimationFrame(loop);
}

const canvas = document.getElementById("c");
if (!(canvas instanceof HTMLCanvasElement)) {
    throw new Error("Canvas element #c not found.");
}

initRenderer(canvas);
initControls(canvas, startBloom);

state.pts = build(1);
requestAnimationFrame(loop);
