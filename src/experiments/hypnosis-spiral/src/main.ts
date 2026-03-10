import {SpiralRenderer, type SpiralSettings} from './spiral'

const canvas = document.getElementById('spiral') as HTMLCanvasElement;
const settings: SpiralSettings = {
    color: '#d1d1f0', 
    speed: 0.2, 
    direction: 1,
    loops: 15, 
};

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
    renderer.settings.speed = parseFloat((e.target as HTMLInputElement).value)
})

loopsInput.addEventListener('input', (e) => {
    renderer.settings.loops = parseInt((e.target as HTMLInputElement).value);
});

colorInput.addEventListener('input', (e) => {
    renderer.settings.color = (e.target as HTMLInputElement).value;
});

directionToggle.addEventListener('click', () => {
    renderer.settings.speed *= -1;
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
    const isHidden = window.getComputedStyle(infoContent).display === 'none';
    infoContent.style.display = isHidden ? 'flex' : 'none';
});

const togglePlayback = () => {
    renderer.isPaused = !renderer.isPaused;

    pauseBtn.innerHTML = !renderer.isPaused ? '&#x23F8;' : '&#x25B6;';

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