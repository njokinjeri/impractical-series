import './style.css';
import { Renderer } from './core/Renderer';
import { ShaderProgram } from './core/ShaderProgram';
import { InputManager } from './core/InputManager';
import { PaletteManager } from './ui/PaletteManager';
import { HUDController } from './ui/HUDController';

import { DITHER_LIQUID_SHADER } from './shaders/ditherLiquid.glsl';
import { VOLUMETRIC_HORIZON_SHADER } from './shaders/volumetricHorizon.glsl';
import { VISCOUS_DISPERSION_SHADER } from './shaders/viscousDispersion.glsl';
import { GENERATIVE_PATTERNS_SHADER } from './shaders/generativePatterns.glsl';
import type { PaletteMode } from './types/shader.types';

const VERTEX_SHADER = `
  attribute vec2 aPosition;
  varying vec2 vUv;
  void main() {
    vUv = aPosition * 0.5 + 0.5;
    gl_Position = vec4(aPosition, 0.0, 1.0);
  }
`;

const SHADER_SOURCES = [
  DITHER_LIQUID_SHADER,
  VOLUMETRIC_HORIZON_SHADER,
  VISCOUS_DISPERSION_SHADER,
  GENERATIVE_PATTERNS_SHADER
];

const SHADER_TITLES = [
  "Dither Liquid",
  "Volumetric Horizon",
  "Viscous Dispersion",
  "Generative Patterns"
];

const PATTERN_NAMES = [
  "CHEVRON",
  "RIBBONS",
  "RINGS",
  "DOTS",
  "SLICES",
  "SPARKS",
  "CELLS"
];

document.addEventListener('DOMContentLoaded', () => {
  const renderer = new Renderer('webgl-canvas');
  const inputManager = new InputManager();

  let currentProgram: ShaderProgram | null = null;
  let currentIndex = 3;
  let currentPatternIndex = 1;
  let paletteMode: PaletteMode = 2;
  let flowSpeed = 1.0;
  let grainIntensity = 0.15;
  const startTime = performance.now();

  const loadShaderEnvironment = (index: number) => {
    if (currentProgram) {
      currentProgram.dispose();
    }
    currentProgram = new ShaderProgram(renderer.gl, VERTEX_SHADER, SHADER_SOURCES[index]);
    currentIndex = index;

    const showPattern = index === 3;
    hudController.updateShaderNav(index, SHADER_TITLES[index], PATTERN_NAMES[currentPatternIndex], showPattern);
  };

  const paletteManager = new PaletteManager((mode) => {
    paletteMode = mode;
  });

  const hudController = new HUDController(
    (speed) => { flowSpeed = speed; },
    (grain) => { grainIntensity = grain; },
    () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    }
  );

  inputManager.onInteract = () => {
    if (currentIndex === 3) {
      currentPatternIndex = (currentPatternIndex + 1) % PATTERN_NAMES.length;
      hudController.updatePatternDisplay(currentPatternIndex, PATTERN_NAMES[currentPatternIndex]);
    }
  };

  document.querySelectorAll('#shader-buttons button').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.getAttribute('data-index') || '0', 10);
      loadShaderEnvironment(idx);
    });
  });

  window.addEventListener('keydown', (e) => {
    if (e.key >= '1' && e.key <= '4') {
      loadShaderEnvironment(parseInt(e.key, 10) - 1);
    }
  });

  loadShaderEnvironment(3);

  const render = () => {
    if (currentProgram && currentProgram.program) {
      currentProgram.use();
      renderer.bindQuad(0);

      const gl = renderer.gl;
      const uniforms = currentProgram.uniforms;
      const elapsedTime = ((performance.now() - startTime) * 0.001) * flowSpeed;

      gl.uniform2f(uniforms.uResolution, renderer.canvas.width, renderer.canvas.height);
      gl.uniform1f(uniforms.uTime, elapsedTime);
      gl.uniform2f(uniforms.uTouch, inputManager.touchPos[0], inputManager.touchPos[1]);
      gl.uniform2f(uniforms.uTouchDelta, inputManager.touchDelta[0], inputManager.touchDelta[1]);
      gl.uniform1f(uniforms.uTouchActive, inputManager.touchActive);
      gl.uniform1f(uniforms.uGrain, grainIntensity);
      gl.uniform1i(uniforms.uPalette, paletteMode);
      gl.uniform1i(uniforms.uPatternIndex, currentPatternIndex);

      inputManager.update();
      renderer.draw();
    }
    requestAnimationFrame(render);
  };

  requestAnimationFrame(render);
});