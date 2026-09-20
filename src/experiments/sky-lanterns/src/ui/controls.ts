import * as THREE from 'three';
import type { SceneContext } from '../scene/setup';
import type { Ritual } from '../stage/ritual';
import type { Swarm } from '../swarm/swarm';
import type { Starfield } from '../scene/starfield';
import type { CameraMode, PaletteMode } from '../types';
import { updateWindFromInputs } from '../swarm/swarm';

let cameraMode: CameraMode = 'orbit';

export function initControls(
  ctx: SceneContext,
  ritual: Ritual,
  swarm: Swarm,
  starfield: Starfield
): void {
  const cameraModeSelect = document.getElementById(
    'cameraMode'
  ) as HTMLSelectElement;
  cameraModeSelect.addEventListener('change', () => {
    cameraMode = cameraModeSelect.value as CameraMode;
    ctx.controls.enabled = cameraMode === 'orbit' || cameraMode === 'follow';
    swarm.setCameraMode(cameraMode);
  });

  const tierBtns = document.querySelectorAll<HTMLButtonElement>('.tier-btn');
  const tierStatus = document.getElementById(
    'tier-status'
  ) as HTMLElement | null;

  tierBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      tierBtns.forEach((b) => {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');

      const count = parseInt(btn.dataset.count || '45', 10);

      if (tierStatus) tierStatus.classList.add('visible');

      requestAnimationFrame(() => {
        setTimeout(() => {
          swarm.selectDensity(count);
          if (tierStatus) tierStatus.classList.remove('visible');
        }, 0);
      });
    });
  });

  const windAngle = document.getElementById('windAngle') as HTMLInputElement;
  const windSpeed = document.getElementById('windSpeed') as HTMLInputElement;
  const windAngleVal = document.getElementById('windAngleVal') as HTMLElement;
  const windSpeedVal = document.getElementById('windSpeedVal') as HTMLElement;

  function updateWind() {
    const angleDeg = parseFloat(windAngle.value);
    const speed = parseFloat(windSpeed.value);
    windAngleVal.innerText = `${angleDeg}°`;
    windSpeedVal.innerText = speed.toFixed(1);
    updateWindFromInputs();
  }

  windAngle.addEventListener('input', updateWind);
  windSpeed.addEventListener('input', updateWind);
  updateWind();

  const starryToggle = document.getElementById(
    'starryToggle'
  ) as HTMLInputElement;
  starryToggle.addEventListener('change', () => {
    starfield.toggle(starryToggle.checked);
  });

  const fogSlider = document.getElementById('fogSlider') as HTMLInputElement;
  fogSlider.addEventListener('input', () => {
    ctx.scene.fog = new THREE.FogExp2(0x020408, parseFloat(fogSlider.value));
  });

  const colorSelect = document.getElementById(
    'colorSelect'
  ) as HTMLSelectElement;
  colorSelect.addEventListener('change', () => {
    showLoader(() => {
      swarm.setPaletteMode(colorSelect.value as PaletteMode);
    });
  });

  const rerandomizeBtn = document.getElementById(
    'rerandomize-btn'
  ) as HTMLButtonElement;
  rerandomizeBtn.addEventListener('click', () => {
    showLoader(() => {
      swarm.rerandomize();
    });
  });

  const menuBtn = document.getElementById(
    'toggle-menu-btn'
  ) as HTMLButtonElement;
  const uiContainer = document.getElementById('ui-container');
  menuBtn.addEventListener('click', () => {
    uiContainer!.classList.toggle('collapsed');
    const collapsed = uiContainer!.classList.contains('collapsed');
    menuBtn.innerText = collapsed ? '[ Show Controls ]' : '[ Hide Controls ]';
    menuBtn.setAttribute('aria-expanded', collapsed ? 'false' : 'true');
  });

  void ritual;
  void swarm;
}

export function tickCamera(
  delta: number,
  time: number,
  ctx: SceneContext
): void {
  if (cameraMode === 'follow') {
    const target = getFollowTarget();
    if (target) {
      ctx.controls.target.lerp(target, 0.05);
    }
    ctx.controls.update();
  } else if (cameraMode === 'drone') {
    const droneRadius = 40;
    ctx.camera.position.x = Math.sin(time * 0.1) * droneRadius;
    ctx.camera.position.z = Math.cos(time * 0.1) * droneRadius;
    ctx.camera.position.y = 10 + Math.sin(time * 0.2) * 5;
    ctx.controls.target.set(0, 2, 0);
    ctx.camera.lookAt(0, 2, 0);
  } else {
    ctx.controls.update();
  }
}

let followTargetGetter: (() => THREE.Vector3 | null) | null = null;

export function setFollowTargetGetter(fn: () => THREE.Vector3 | null): void {
  followTargetGetter = fn;
}

function getFollowTarget(): THREE.Vector3 | null {
  return followTargetGetter ? followTargetGetter() : null;
}
