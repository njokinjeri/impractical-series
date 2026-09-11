import './style.css';
import { SceneEngine } from './graphics/SceneEngine';
import { AudioAnalyzer } from './audio/AudioAnalyzer';
import type {
  ColorMode,
  MaterialPreset,
  ShapeMode,
  VisualizerState,
} from './types/state';

const container = document.getElementById('app')!;

const state: VisualizerState = {
  shape: 'spiked',
  material: 'iridescent',
  colorMode: 'light',
};

const scene = new SceneEngine({
  container,
  colorMode: state.colorMode,
});

const audio = new AudioAnalyzer(import.meta.env.BASE_URL + 'james-bond.mp3');
function bindGroup<T extends string>(
  selector: string,
  attr: string,
  apply: (value: T) => void
) {
  document.querySelectorAll<HTMLElement>(selector).forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const target = e.currentTarget as HTMLElement;
      document
        .querySelectorAll<HTMLElement>(selector)
        .forEach((b) => b.classList.remove('active'));
      target.classList.add('active');
      apply(target.dataset[attr] as T);
    });
  });
}

bindGroup<ShapeMode>('[data-shape]', 'shape', (v) => {
  state.shape = v;
  scene.setShape(v);
});

bindGroup<MaterialPreset>('[data-material]', 'material', (v) => {
  state.material = v;
  scene.setMaterial(v);
});

bindGroup<ColorMode>('[data-mode]', 'mode', (v) => {
  state.colorMode = v;
  document.documentElement.dataset.theme = v;
  scene.setColorMode(v);
});

const playBtn = document.getElementById('play-btn') as HTMLButtonElement;
playBtn.addEventListener('click', async () => {
  const playing = await audio.toggle();
  playBtn.textContent = playing ? 'Pause Track' : 'Play Track';
});

audio.audio.addEventListener('ended', () => {
  playBtn.textContent = 'Play Track';
  audio.isPlaying = false;
});

const fileInput = document.getElementById('file-input') as HTMLInputElement;
fileInput.addEventListener('change', async (e) => {
  const file = (e.target as HTMLInputElement).files?.[0];
  if (!file) return;
  await audio.loadFile(file);
  playBtn.textContent = 'Pause Track';
});

scene.tick(() => audio.getBands());
