import {
    FLOWERS,
    LABELS,
    PALETTE,
    SPIN_LBL,
    DET_LBL,
    GLOW_LBL,
    type FlowerKey,
    type PaletteVariant,
} from "./constants.js";
import { state } from "./state.js";
import { build } from "./geometry.js";
import { drawBg } from "./renderer.js";

function getEl<T extends HTMLElement>(id: string): T {
    const el = document.getElementById(id) as T | null;
    if (!el) throw new Error(`Element #${id} not found.`);
    return el;
}

function buildFlowerButtons(): void {
    const container = getEl("flower-selector");
    container.innerHTML = "";

    FLOWERS.forEach((flowerKey: FlowerKey) => {
        const btn = document.createElement("button");
        btn.className =
            "flower-btn" + (flowerKey === state.flower ? " active" : "");
        btn.textContent = LABELS[flowerKey];

        btn.addEventListener("click", () => {
            state.pts = [];
            state.flower = flowerKey;
            state.variant = 0;

            container
                .querySelectorAll(".flower-btn")
                .forEach((b) => b.classList.remove("active"));
            btn.classList.add("active");

            buildSwatches();
            state.pts = build(1);
        });

        container.appendChild(btn);
    });
}

function buildSwatches(): void {
    const container = getEl("swatch-container");
    container.innerHTML = "";

    PALETTE[state.flower].forEach((stops: PaletteVariant, i: number) => {
        const swatch = document.createElement("div");
        swatch.className = "swatch" + (i === state.variant ? " active" : "");

        const midStop = stops[Math.min(1, stops.length - 1)];
        swatch.style.background = `hsl(${midStop[0]},${midStop[1]}%,${midStop[2]}%)`;

        swatch.addEventListener("click", () => {
            state.variant = i;
            container
                .querySelectorAll(".swatch")
                .forEach((s) => s.classList.remove("active"));
            swatch.classList.add("active");
        });

        container.appendChild(swatch);
    });
}

interface SliderConfig {
    inputId: string;
    labelId: string;
    labels: readonly string[];
    cfgKey: keyof typeof state.cfg;
    onUpdate?: (val: number) => void;
}

function wireSlider({
    inputId,
    labelId,
    labels,
    cfgKey,
    onUpdate,
}: SliderConfig): void {
    const input = getEl<HTMLInputElement>(inputId);
    const label = getEl(labelId);

    input.addEventListener("input", () => {
        const val = Number(input.value);
        state.cfg[cfgKey] = val;
        label.textContent = labels[val] ?? labels[val - 1];
        onUpdate?.(val);
    });
}

function initDragListeners(canvas: HTMLCanvasElement): void {
    canvas.addEventListener("mousedown", (e: MouseEvent) => {
        state.drag = true;
        state.lastX = e.clientX;
        state.lastY = e.clientY;
    });

    window.addEventListener("mouseup", () => {
        state.drag = false;
    });

    window.addEventListener("mousemove", (e: MouseEvent) => {
        if (!state.drag) return;
        state.rotY -= (e.clientX - state.lastX) * 0.4;
        state.rotX += (e.clientY - state.lastY) * 0.4;
        state.lastX = e.clientX;
        state.lastY = e.clientY;
    });

    canvas.addEventListener(
        "touchstart",
        (e: TouchEvent) => {
            if (e.touches.length === 1) {
                state.drag = true;
                state.lastX = e.touches[0].clientX;
                state.lastY = e.touches[0].clientY;
            } else {
                state.drag = false;
            }
        },
        { passive: true },
    );

    window.addEventListener("touchend", (e: TouchEvent) => {
        if (e.touches.length === 0) state.drag = false;
    });

    window.addEventListener(
        "touchmove",
        (e: TouchEvent) => {
            if (!state.drag || e.touches.length !== 1) return;
            state.rotY -= (e.touches[0].clientX - state.lastX) * 0.4;
            state.rotX += (e.touches[0].clientY - state.lastY) * 0.4;
            state.lastX = e.touches[0].clientX;
            state.lastY = e.touches[0].clientY;
        },
        { passive: true },
    );
}

function initPinchZoom(canvas: HTMLCanvasElement): void {
    let lastPinchDist = 0;

    canvas.addEventListener(
        "touchstart",
        (e: TouchEvent) => {
            if (e.touches.length === 2) {
                const dx = e.touches[0].clientX - e.touches[1].clientX;
                const dy = e.touches[0].clientY - e.touches[1].clientY;
                lastPinchDist = Math.hypot(dx, dy);
            }
        },
        { passive: true },
    );

    canvas.addEventListener(
        "touchmove",
        (e: TouchEvent) => {
            if (e.touches.length !== 2) return;

            const dx = e.touches[0].clientX - e.touches[1].clientX;
            const dy = e.touches[0].clientY - e.touches[1].clientY;
            const dist = Math.hypot(dx, dy);

            if (lastPinchDist > 0) {
                const delta = (dist - lastPinchDist) * 0.008;
                state.zoom = Math.max(0.7, Math.min(1.8, state.zoom + delta));
            }

            lastPinchDist = dist;
        },
        { passive: true },
    );

    canvas.addEventListener(
        "touchend",
        (e: TouchEvent) => {
            if (e.touches.length < 2) lastPinchDist = 0;
        },
        { passive: true },
    );
}

function initScrollZoom(canvas: HTMLCanvasElement): void {
    canvas.addEventListener(
        "wheel",
        (e: WheelEvent) => {
            e.preventDefault();
            state.zoom = Math.max(
                0.4,
                Math.min(2.5, state.zoom - e.deltaY * 0.001),
            );
        },
        { passive: false },
    );
}

function initResizeListener(canvas: HTMLCanvasElement): void {
    const onResize = (): void => {
        const parent = canvas.parentElement;
        if (!parent) return;
        state.W = canvas.width = parent.clientWidth;
        state.H = canvas.height = parent.clientHeight;
        drawBg();
    };
    window.addEventListener("resize", onResize);
    onResize();
}

export function initControls(
    canvas: HTMLCanvasElement,
    onBloom: () => void,
): void {
    buildFlowerButtons();
    buildSwatches();

    wireSlider({
        inputId: "density-slider",
        labelId: "density-label",
        labels: DET_LBL,
        cfgKey: "det",
        onUpdate: () => {
            state.pts = build(1);
        },
    });
    wireSlider({
        inputId: "glow-slider",
        labelId: "glow-label",
        labels: GLOW_LBL,
        cfgKey: "glow",
    });
    wireSlider({
        inputId: "spin-slider",
        labelId: "spin-label",
        labels: SPIN_LBL,
        cfgKey: "spin",
    });

    initDragListeners(canvas);
    initPinchZoom(canvas);
    initScrollZoom(canvas);
    initResizeListener(canvas);

    getEl("bloom-trigger").addEventListener("click", onBloom);
}
