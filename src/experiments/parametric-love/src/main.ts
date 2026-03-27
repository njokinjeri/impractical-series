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

const state = {
    targetY: 50,
    currentY: 50,
    isBursting: false,
    heartsCreated: 0,
};

const engine = new HeartEngine(document.body, config);

const updateStats = () => {
    document.getElementById('hearts-count')!.textContent = state.heartsCreated.toString();
};

const updateFillBar = () => {
    const maxY = 100 * config.size;
    const currentFill = 50 * config.size - state.currentY;
    const percent = Math.round((currentFill / maxY) * 100);
    const capped = Math.min(Math.max(percent, 0), 100);
  
    document.getElementById('fill-percent')!.textContent = capped.toString();
    document.getElementById('fill-bar-inner')!.style.width = capped + '%';
    document.getElementById('fill-percent-text')!.textContent = capped + '%';
};

const burst = () => {
    state.isBursting = true;
    state.heartsCreated++;
    updateStats();
    engine.triggerBurst();

    setTimeout(() => {
        state.targetY = state.currentY = 50 * config.size;
        state.isBursting = false;
        engine.resetVisuals();
    }, 5000);
};

const fillHeart = () => {
    if (state.isBursting) return;
    state.targetY -= 12 * config.size;
    if (state.targetY <= -50 * config.size) burst();
};

const colorGrid = document.getElementById('color-grid')!;
Object.entries(COLORS).forEach(([name, color]) => {
    const btn = document.createElement('button');
    btn.className = 'color-btn';
    btn.style.backgroundColor = '#' + color.toString(16).padStart(6, '0');
    btn.onclick = () => {
        engine.updateColor(color);
        document.querySelectorAll('.color-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    };
    colorGrid.appendChild(btn);
});


document.getElementById('size-slider')!.oninput = (e) => {
    const val = parseFloat((e.target as HTMLInputElement).value);
    config.size = val;
    engine.updateSize(val);
    state.targetY = state.currentY = 50 * val;
    
    document.getElementById('size-value')!.textContent = Math.round(val * 100).toString();
};

document.getElementById('wire-slider')!.oninput = (e) => {
    const val = parseInt((e.target as HTMLInputElement).value) / 100;
    engine.updateWireframe(val);
    document.getElementById('wire-value')!.textContent = Math.round(val * 100).toString();
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
let prevMouse = { x: 0, y: 0 };

engine.getCanvas().addEventListener('mousedown', (e) => {
    isDragging = true;
    prevMouse = { x: e.clientX, y: e.clientY };
});

window.addEventListener('mousemove', (e) => {
    if (!isDragging || state.isBursting) return;
    const dx = (e.clientX - prevMouse.x) * 0.01;
    const dy = (e.clientY - prevMouse.y) * 0.01;
    engine.rotateHeart(dx, dy);
    prevMouse = { x: e.clientX, y: e.clientY };
});

window.addEventListener('mouseup', () => isDragging = false);

engine.getCanvas().addEventListener('click', () => {
    if(!isDragging) fillHeart();
});

const animate = () => {
    requestAnimationFrame(animate);
    state.currentY += (state.targetY - state.currentY) * 0.05;
    updateFillBar();
    engine.render(state.currentY, state.isBursting);
};

animate();