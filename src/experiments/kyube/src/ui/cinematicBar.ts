import type { AppState, CinematicViewKey } from '../types';
import { cinematicViews, applyCinematicView } from '../core/controls';

export interface CinematicBarElements {
  bar: HTMLElement;
  toggleToolbarBtn: HTMLElement;
  closeBarBtn: HTMLElement;
  toggleMossBtn: HTMLElement;
  toggleGasBtn: HTMLElement;
  toggleModeBtn: HTMLElement;
  btnOutside: HTMLElement;
  btnInside: HTMLElement;
  btnOrbit: HTMLElement;
}

export function getCinematicBarElements(): CinematicBarElements {
  return {
    bar: document.getElementById('cinematic-bar')!,
    toggleToolbarBtn: document.getElementById('toggle-toolbar-btn')!,
    closeBarBtn: document.getElementById('btn-close-bar')!,
    toggleMossBtn: document.getElementById('toggle-moss')!,
    toggleGasBtn: document.getElementById('toggle-gas')!,
    toggleModeBtn: document.getElementById('toggle-mode')!,
    btnOutside: document.getElementById('btn-outside')!,
    btnInside: document.getElementById('btn-inside')!,
    btnOrbit: document.getElementById('btn-orbit')!
  };
}

export interface CinematicBarCallbacks {
  onMossToggle: (visible: boolean) => void;
  onGasToggle: (visible: boolean) => void;
}

export function initCinematicBar(
  state: AppState,
  el: CinematicBarElements,
  callbacks: CinematicBarCallbacks
): void {
  el.closeBarBtn.addEventListener('click', () => {
    el.bar.classList.add('closed');
    el.toggleToolbarBtn.style.display = 'block';
  });

  el.toggleToolbarBtn.addEventListener('click', () => {
    el.bar.classList.remove('closed');
    el.toggleToolbarBtn.style.display = 'none';
  });

  el.toggleMossBtn.addEventListener('click', () => {
    state.showMoss = !state.showMoss;
    el.toggleMossBtn.classList.toggle('off', !state.showMoss);
    callbacks.onMossToggle(state.showMoss);
  });

  el.toggleGasBtn.addEventListener('click', () => {
    state.showGas = !state.showGas;
    el.toggleGasBtn.classList.toggle('off', !state.showGas);
    callbacks.onGasToggle(state.showGas);
  });

  el.toggleModeBtn.addEventListener('click', () => {
    state.isExternalSunMode = !state.isExternalSunMode;
    el.toggleModeBtn.textContent = state.isExternalSunMode
      ? '🌙 '
      : '☀️ ';
  });

  const viewButtons: Array<[HTMLElement, CinematicViewKey]> = [
    [el.btnOutside, 'outside'],
    [el.btnInside, 'inside'],
    [el.btnOrbit, 'orbit']
  ];

  viewButtons.forEach(([btn, key]) => {
    btn.addEventListener('click', () => {
      document
        .querySelectorAll('.pill-btn')
        .forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      applyCinematicView(state, cinematicViews[key]);
    });
  });
}