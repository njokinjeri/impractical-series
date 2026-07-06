import { CONFIG, type Orientation } from './config';
import { makeGrain, buildSlats, render, type SceneElements } from './renderer';

function el<T extends HTMLElement>(id: string): T {
  return document.getElementById(id) as T;
}

const els: SceneElements = {
  blinds: el('blinds'),
  glow: el('glow'),
  castTop: el('cast-top'),
  castMid: el('cast-mid'),
  castLow: el('cast-low'),
  bloom: el('bloom'),
  grain: el('grain'),
  readout: el('readout'),
};

let orientation: Orientation = 'vertical';
let slats: HTMLDivElement[] = [];
let current: number = CONFIG.restAngle;
let target: number = CONFIG.restAngle;
let mx = 0.5,
  my = 0.5;

function rebuild(o: Orientation): void {
  orientation = o;
  current = target = CONFIG.restAngle;
  slats = buildSlats(els.blinds, o);
}

function loop(): void {
  const offset =
    orientation === 'vertical'
      ? (mx - 0.5) * 2 * CONFIG.mouseRange
      : (my - 0.5) * 2 * CONFIG.mouseRange;

  target = Math.min(CONFIG.maxAngle, Math.max(0, CONFIG.restAngle + offset));
  current += (target - current) * CONFIG.lerpSpeed;

  render(current, slats, orientation, els);
  requestAnimationFrame(loop);
}

window.addEventListener('mousemove', (e) => {
  mx = e.clientX / window.innerWidth;
  my = e.clientY / window.innerHeight;
});

window.addEventListener(
  'touchmove',
  (e) => {
    e.preventDefault();
    mx = e.touches[0].clientX / window.innerWidth;
    my = e.touches[0].clientY / window.innerHeight;
  },
  { passive: false }
);

el<HTMLButtonElement>('btnV').addEventListener('click', () => {
  if (orientation === 'vertical') return;
  el('btnV').classList.add('on');
  el('btnH').classList.remove('on');
  rebuild('vertical');
});

el<HTMLButtonElement>('btnH').addEventListener('click', () => {
  if (orientation === 'horizontal') return;
  el('btnH').classList.add('on');
  el('btnV').classList.remove('on');
  rebuild('horizontal');
});

window.addEventListener('resize', () => {
  makeGrain(els.grain);
  rebuild(orientation);
});

makeGrain(els.grain);
rebuild('vertical');
loop();
