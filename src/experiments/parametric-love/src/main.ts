import { HeartEngine, type HeartConfig } from './heart-engine';

const COLORS = {
  blue: 0x0088ff,
  pink: 0xff2d55,
  purple: 0x9d00ff,
  green: 0x00ff88,
  orange: 0xff6600,
  yellow: 0xffff00,
};

const config: HeartConfig = {
  color: COLORS.blue,
  size: 1,
  burstCount: 80,
  wireframeOpacity: 0.65,
};

const engine = new HeartEngine(document.body, config);
let bounds = engine.getBounds(config.size);

const state = {
  targetY: bounds.max,
  currentY: bounds.max,
  isBursting: false,
  heartsCreated: 0,
};

const updateStats = () => {
  document.getElementById('hearts-count')!.textContent =
    state.heartsCreated.toString();
};

const updateFillBar = () => {
  const totalHeight = bounds.max - bounds.min;
  const currentProgress = state.currentY - bounds.min;
  let percent = Math.round((currentProgress / totalHeight) * 100);

  const capped = 100 - Math.min(Math.max(percent, 0), 100);

  document.getElementById('fill-percent')!.textContent = capped + '%';
  document.getElementById('fill-bar-inner')!.style.width = capped + '%';
  document.getElementById('fill-percent-text')!.textContent = capped + '%';
};

const fillHeart = () => {
  if (state.isBursting) return;
  state.targetY -= 12 * config.size;

  if (state.targetY <= bounds.min) {
    burst();
  }
};

const burst = () => {
  state.isBursting = true;
  state.heartsCreated++;
  updateStats();
  engine.triggerBurst();

  setTimeout(() => {
    state.targetY = state.currentY = bounds.max;
    state.isBursting = false;
    engine.resetVisuals();
  }, 5000);
};

const colorGrid = document.getElementById('color-grid')!;
Object.entries(COLORS).forEach(([name, color]) => {
  const btn = document.createElement('button');
  btn.className = 'color-btn';
  btn.style.backgroundColor = '#' + color.toString(16).padStart(6, '0');
  btn.onclick = () => {
    engine.updateColor(color);
    document
      .querySelectorAll('.color-btn')
      .forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
  };
  colorGrid.appendChild(btn);
});

document.getElementById('size-slider')!.oninput = (e) => {
  const val = parseFloat((e.target as HTMLInputElement).value);
  config.size = val;

  bounds = engine.getBounds(val);
  engine.updateSize(val);
  state.targetY = state.currentY = bounds.max;
  document.getElementById('size-value')!.textContent = Math.round(
    val * 100
  ).toString();
};

document.getElementById('wire-slider')!.oninput = (e) => {
  const val = parseInt((e.target as HTMLInputElement).value) / 100;
  engine.updateWireframe(val);
  document.getElementById('wire-value')!.textContent = Math.round(
    val * 100
  ).toString();
};

const burstSlider = document.getElementById('burst-slider') as HTMLInputElement;
const burstValueDisplay = document.getElementById('burst-value');

if (burstSlider) {
  burstSlider.addEventListener('input', (e) => {
    const val = parseInt((e.target as HTMLInputElement).value);
    engine.updateBurstCount(val);
    if (burstValueDisplay) {
      burstValueDisplay.textContent = val.toString();
    }
  });
}

const collapseBtn = document.getElementById('collapse-btn');
const panel = document.getElementById('control-panel');

if (collapseBtn && panel) {
  collapseBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    panel.classList.toggle('collapsed');
  });
}

let isDragging = false;
let startPoint = { x: 0, y: 0 };
let hasMoved = false;

const canvas = engine.getCanvas();
canvas.style.touchAction = 'none';

canvas.addEventListener('pointerdown', (e) => {
  isDragging = true;
  hasMoved = false;
  startPoint = { x: e.clientX, y: e.clientY };

  if ('vibrate' in navigator) navigator.vibrate(5);
});

window.addEventListener('pointermove', (e) => {
  if (!isDragging || state.isBursting) return;

  const dx = e.clientX - startPoint.x;
  const dy = e.clientY - startPoint.y;

  if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
    hasMoved = true;
    engine.rotateHeart(dx * 0.01, dy * 0.01);
    startPoint = { x: e.clientX, y: e.clientY };
  }
});

window.addEventListener('pointerup', () => {
  if (isDragging && !hasMoved && !state.isBursting) {
    fillHeart();

    if ('vibrate' in navigator) navigator.vibrate(10);
  }
  isDragging = false;
});

const animate = () => {
  requestAnimationFrame(animate);
  state.currentY += (state.targetY - state.currentY) * 0.05;
  updateFillBar();
  engine.render(state.currentY, state.isBursting);
};

animate();
