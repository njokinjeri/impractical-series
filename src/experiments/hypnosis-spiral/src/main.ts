import {SpiralRenderer, type SpiralSettings} from './spiral'

const STORAGE_KEY = 'hypnosis-spiral-settings';

const saveSettings = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(renderer.settings));
};

const loadSettings = (): Partial<SpiralSettings> => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : {};
};

const canvas = document.getElementById('spiral') as HTMLCanvasElement;
const defaults: SpiralSettings = {
    color: '#d1d1f0',
    speed: 0.2,
    direction: 1,
    loops: 20,
};

const settings: SpiralSettings = { ...defaults, ...loadSettings() };

const renderer = new SpiralRenderer(canvas, settings);
const resizeObserver = new ResizeObserver(() => renderer.resize());
resizeObserver.observe(canvas)

renderer.draw();

const speedInput = document.getElementById('speed') as HTMLInputElement;
const loopsInput = document.getElementById('loops') as HTMLInputElement;
const colorInput = document.getElementById('color') as HTMLInputElement;
const directionToggle = document.getElementById('dir-toggle') as HTMLDivElement;

speedInput.value = renderer.settings.speed.toString();
loopsInput.value = renderer.settings.loops.toString();
colorInput.value = renderer.settings.color;

speedInput.addEventListener('input', (e) => {
    renderer.settings.speed = parseFloat((e.target as HTMLInputElement).value);
    saveSettings();
})

loopsInput.addEventListener('input', (e) => {
    renderer.settings.loops = parseInt((e.target as HTMLInputElement).value);
    saveSettings();
});

colorInput.addEventListener('input', (e) => {
    renderer.settings.color = (e.target as HTMLInputElement).value;
    saveSettings();
});

directionToggle.addEventListener('click', () => {
    renderer.settings.speed *= -1;
    saveSettings();
});

const controlsToggle = document.getElementById('controls-toggle') as HTMLButtonElement;
const controlsPanel = document.getElementById('controls') as HTMLElement
const infoBtn = document.getElementById('info-panel') as HTMLButtonElement;
const infoContent = document.querySelector('.info-content') as HTMLDivElement;
const pauseBtn = document.getElementById('pause-btn') as HTMLButtonElement;

controlsToggle.addEventListener('click', () => {
    controlsPanel.classList.toggle('collapsed');
    controlsToggle.innerHTML = controlsPanel.classList.contains('collapsed') ? '&#x25B2;' : '&#x25BC;';
})

infoBtn.addEventListener('click', () => {
  const isCollapsed = controlsPanel.classList.contains('collapsed');

  if (isCollapsed) {
    controlsPanel.classList.remove('collapsed');
    controlsToggle.innerHTML = '&#x25BC;';
    infoContent.classList.add('visible');
  } else {
    infoContent.classList.toggle('visible');
  }
});

const togglePlayback = () => {
    renderer.isPaused = !renderer.isPaused;

    pauseBtn.innerHTML = !renderer.isPaused ? '&#x23F8;' : '&#x25B6;';
    pauseBtn.dataset.tooltip = renderer.isPaused ? 'Play' : 'Pause'

    if (!renderer.isPaused) {
        renderer.draw();
    } else {
        renderer.stop ();
    }
};

canvas.addEventListener('click', togglePlayback)
pauseBtn.addEventListener('click', togglePlayback)

window.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        e.preventDefault();
        togglePlayback();
    }
});
