let lastFrameTime = 0;
let lastUiUpdate = 0;
let initialized = false;

const frameHistory: number[] = new Array(60).fill(60);

let graphCanvas: HTMLCanvasElement | null = null;
let gCtx: CanvasRenderingContext2D | null = null;

let fpsValEl: HTMLElement | null = null;
let msValEl: HTMLElement | null = null;
let avgFpsValEl: HTMLElement | null = null;
let lowFpsValEl: HTMLElement | null = null;
let wavePathEl: SVGPathElement | null = null;

export function initTelemetry(): void {
  graphCanvas = document.getElementById(
    'fps-graph-canvas'
  ) as HTMLCanvasElement;
  gCtx = graphCanvas.getContext('2d');
  fpsValEl = document.getElementById('fps-val');
  msValEl = document.getElementById('ms-val');
  avgFpsValEl = document.getElementById('avg-fps-val');
  lowFpsValEl = document.getElementById('low-fps-val');
  wavePathEl = document.getElementById(
    'wave-path'
  ) as unknown as SVGPathElement;

  lastFrameTime = performance.now();
  lastUiUpdate = performance.now();
  initialized = true;
}

function drawFpsGraph(): void {
  if (!gCtx || !graphCanvas) return;
  gCtx.clearRect(0, 0, graphCanvas.width, graphCanvas.height);
  gCtx.strokeStyle = '#00e5ff';
  gCtx.lineWidth = 1.5;
  gCtx.beginPath();

  const step = graphCanvas.width / (frameHistory.length - 1);
  for (let i = 0; i < frameHistory.length; i++) {
    const val = frameHistory[i];
    const y = graphCanvas.height - (val / 75) * graphCanvas.height;
    const x = i * step;
    if (i === 0) gCtx.moveTo(x, y);
    else gCtx.lineTo(x, y);
  }
  gCtx.stroke();
}

export function updateFpsWavelength(now: number): void {
  if (!initialized) return;

  const frameMs = now - lastFrameTime;
  lastFrameTime = now;
  const currentFps = Math.round(1000 / Math.max(frameMs, 1));

  frameHistory.push(currentFps);
  frameHistory.shift();

  if (wavePathEl) {
    const freq = Math.min(Math.max(currentFps / 15, 0.5), 6);
    let d = `M 0 12`;
    for (let x = 0; x <= 100; x += 5) {
      const y = 12 + Math.sin(x * 0.12 * freq + now * 0.008) * 7;
      d += ` L ${x} ${y.toFixed(1)}`;
    }
    wavePathEl.setAttribute('d', d);

    if (currentFps < 30) wavePathEl.style.stroke = '#ff3366';
    else if (currentFps < 50) wavePathEl.style.stroke = '#ffcc00';
    else wavePathEl.style.stroke = '#00e5ff';
  }

  drawFpsGraph();

  if (now - lastUiUpdate > 250) {
    lastUiUpdate = now;
    const avgFps = Math.round(
      frameHistory.reduce((a, b) => a + b, 0) / frameHistory.length
    );
    const sorted = [...frameHistory].sort((a, b) => a - b);
    const low1Percent = sorted[Math.floor(sorted.length * 0.05)];

    if (fpsValEl) fpsValEl.innerText = `${currentFps} FPS`;
    if (msValEl) msValEl.innerText = `${frameMs.toFixed(1)} ms`;
    if (avgFpsValEl) avgFpsValEl.innerText = `${avgFps} FPS`;
    if (lowFpsValEl) lowFpsValEl.innerText = `${low1Percent} FPS`;
  }
}
