import * as THREE from 'three';
import { createLantern, getTexture, PALETTES } from '../scene/lanterns';
import type { SceneContext } from '../scene/setup';
import type { Swarm } from '../swarm/swarm';

export interface Ritual {
  step: number;
  hero: THREE.Group;
  selectedColor: number;
  tick: (delta: number, time: number) => void;
}

let windVectorX = 0;
let windVectorZ = 0;

export function setRitualWind(x: number, z: number): void {
  windVectorX = x;
  windVectorZ = z;
}

export function initRitual(ctx: SceneContext, swarm: Swarm): Ritual {
  let currentSelectedColor = 0;
  const heroLantern = createLantern(currentSelectedColor);
  heroLantern.position.set(0, -0.2, 0);
  ctx.scene.add(heroLantern);

  const ritual: Ritual = {
    step: 0,
    hero: heroLantern,
    selectedColor: currentSelectedColor,
    tick: () => {},
  };

  let cameraTransitioning = false;
  let transitionProgress = 0;

  const btn = document.getElementById('ritual-action-btn') as HTMLButtonElement;

  const radioInputs = document.querySelectorAll<HTMLInputElement>(
    'input[name="lanternColor"]'
  );
  radioInputs.forEach((input) => {
    input.addEventListener('change', () => {
      const index = parseInt(input.value, 10);
      changeHeroColor(index);
    });
  });

  function changeHeroColor(index: number) {
    currentSelectedColor = index;
    ritual.selectedColor = index;
    const pal = PALETTES[index];
    const tex = getTexture(index);

    const u = heroLantern.userData;
    u.bodyMat.map = tex;
    u.bodyMat.emissiveMap = tex;
    u.bodyMat.emissive.setHex(pal.emissive);

    u.topCapMat.map = tex;
    u.topCapMat.emissiveMap = tex;
    u.topCapMat.emissive.setHex(pal.capColor);

    u.pointLight.color.setHex(pal.lightColor);

    u.bodyMat.needsUpdate = true;
    u.topCapMat.needsUpdate = true;
  }

  btn.addEventListener('click', () => {
    if (ritual.step === 0) {
      ritual.step = 1;
      heroLantern.userData.isLit = true;

      let lightVal = 0;
      const igniteInterval = setInterval(() => {
        lightVal += 0.05;
        const u = heroLantern.userData;
        u.bodyMat.emissiveIntensity = lightVal * 0.85;
        u.topCapMat.emissiveIntensity = lightVal * 0.8;
        u.pointLight.intensity = lightVal * 2.5;
        u.flameMat.opacity = lightVal * 0.9;

        if (lightVal >= 1) {
          clearInterval(igniteInterval);
          btn.innerText = 'Release Sky Lantern';
        }
      }, 30);
    } else if (ritual.step === 1) {
      ritual.step = 2;
      btn.innerText = 'Releasing...';
      btn.disabled = true;

      setTimeout(() => {
        document.getElementById('landing-stage')!.classList.add('fade-out');

        ctx.controls.minDistance = 0.1;
        ctx.controls.maxDistance = 80;
        cameraTransitioning = true;

        document.body.classList.add('ui-active');
        swarm.setCameraMode('orbit');

        setTimeout(() => {
          swarm.reveal();
        }, 400);
      }, 0);
    }
  });

  ritual.tick = (delta: number, time: number) => {
    const u = heroLantern.userData;
    if (u.isLit) {
      const flicker =
        Math.sin(time * 12.0 + u.seed) * 0.08 +
        Math.cos(time * 19.0 + u.seed) * 0.05;
      u.flameMesh.scale.set(
        1.0 + flicker * 0.2,
        1.0 + flicker * 0.4,
        1.0 + flicker * 0.2
      );
      u.pointLight.intensity = 2.5 + flicker * 1.0;
    }

    if (ritual.step === 2) {
      heroLantern.position.y += delta * 4.0;
      heroLantern.position.x += windVectorX * delta * 2.0;
      heroLantern.position.z += windVectorZ * delta * 2.0;
    }

    if (cameraTransitioning) {
      transitionProgress += delta * 0.6;
      ctx.camera.position.x = THREE.MathUtils.lerp(
        ctx.camera.position.x,
        0,
        transitionProgress
      );
      ctx.camera.position.y = THREE.MathUtils.lerp(
        ctx.camera.position.y,
        12,
        transitionProgress
      );
      ctx.camera.position.z = THREE.MathUtils.lerp(
        ctx.camera.position.z,
        45,
        transitionProgress
      );
      ctx.controls.target.set(0, 2, 0);

      if (transitionProgress >= 1) {
        cameraTransitioning = false;
      }
    }
  };

  return ritual;
}
