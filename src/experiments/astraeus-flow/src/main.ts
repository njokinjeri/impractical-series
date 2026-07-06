import * as THREE from 'three';
import { ParticleCloud } from './ParticleCloud';

const config = {
  particleCount: 15000,
  explosionForce: 1.5,
  collapseSpeed: 0.02,
  noiseScale: 0.12,
};

const interaction = { mouse: new THREE.Vector3(), depth: 0, active: false };

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 70;

const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById('genesis-canvas') as HTMLCanvasElement,
  antialias: false,
  powerPreference: 'high-performance',
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(1);

const cloud = new ParticleCloud(scene, config);

const setupHUD = () => {
  const labelMap: Record<string, string> = {
    explosionForce: 'Burst Power',
    collapseSpeed: 'Pull Tension',
    noiseScale: 'Jitter Frequency',
  };

  ['explosionForce', 'collapseSpeed', 'noiseScale'].forEach((id) => {
    const input = document.getElementById(id) as HTMLInputElement;

    if (!input) return;

    const label = input.parentElement?.querySelector('label');

    const updateDisplay = () => {
      if (!label) return;

      label.innerHTML = `
        ${labelMap[id]}
        <span class="value-display">${Number(input.value).toFixed(2)}</span>
      `;
    };

    updateDisplay();

    input.addEventListener('input', () => {
      (config as any)[id] = parseFloat(input.value);
      updateDisplay();
    });
  });

  const panel = document.getElementById('control-panel');
  const collapseBtn = document.getElementById('collapse-btn');

  if (!panel || !collapseBtn) return;

  let collapsed = false;

  const updatePanelState = () => {
    panel.classList.toggle('collapsed', collapsed);

    collapseBtn.innerHTML = collapsed ? '▶' : '◀';

    collapseBtn.setAttribute(
      'aria-label',
      collapsed ? 'Expand controls' : 'Collapse controls'
    );
  };

  collapseBtn.addEventListener('click', () => {
    collapsed = !collapsed;
    updatePanelState();
  });

  updatePanelState();
};

window.addEventListener('mousemove', (e) => {
  const v = new THREE.Vector3(
    (e.clientX / window.innerWidth) * 2 - 1,
    -(e.clientY / window.innerHeight) * 2 + 1,
    0.5
  );
  v.unproject(camera);
  const dir = v.sub(camera.position).normalize();
  const dist = (-camera.position.z + interaction.depth) / dir.z;
  interaction.mouse.copy(camera.position).add(dir.multiplyScalar(dist));
  interaction.active = true;
});

window.addEventListener('mouseleave', () => {
  interaction.active = false;
});

const stateEl = document.getElementById('state');

function animate(t: number) {
  cloud.update(t * 0.001, interaction);

  if (stateEl) {
    if (cloud.motionLevel > 0.08) {
      stateEl.innerText = 'STATUS: ACTIVE';
      stateEl.style.color = '#ff00ff';
    } else if (interaction.active) {
      stateEl.innerText = 'STATUS: READY';
      stateEl.style.color = '#00ff88';
    } else {
      stateEl.innerText = 'STATUS: SLEEPING';
      stateEl.style.color = 'rgba(0, 255, 136, 0.4)';
    }
  }

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

setupHUD();
animate(0);
