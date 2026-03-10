import {SpiralRenderer, type SpiralSettings} from './spiral'

const canvas = document.getElementById('spiral') as HTMLCanvasElement;
const settings: SpiralSettings = {
    color: '#d1d1f0', 
    speed: 0.2, 
    direction: 1,
    loops: 40, 
    growth: 5 
};
const renderer = new SpiralRenderer(canvas, settings);
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


const infoBtn = document.getElementById('info-panel') as HTMLButtonElement
const infoContent = document.querySelector('.info-content') as HTMLDivElement
const pauseBtn = document.getElementById('pause-btn') as HTMLButtonElement


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

const resizeCanvas = () => {
    const displayWidth = canvas.clientWidth;
    const displayHeight = canvas.clientHeight;

    if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
        canvas.width = displayWidth;
        canvas.height = displayHeight;
        renderer.recalculate();

        if (renderer.isPaused) {
            renderer.drawFrame()
        }
    }
}

const resizeObserver = new ResizeObserver(() => resizeCanvas())
resizeObserver.observe(canvas)