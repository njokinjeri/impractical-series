import type { AppState, CinematicView, CinematicViewKey } from '../types';

export function createAppState(): AppState {
  return {
    targetZoom: 7.5,
    currentZoom: 7.5,
    targetRotX: 0.35,
    targetRotY: 0.65,
    targetCoreIntensity: 9.5,
    isOrbitingMode: false,
    isExternalSunMode: false,
    showGas: true,
    showMoss: true,
    isDragging: false,
    prevX: 0,
    prevY: 0
  };
}

export const cinematicViews: Record<CinematicViewKey, CinematicView> = {
  outside: { zoom: 7.5, rotX: 0.35, rotY: 0.65, coreIntensity: 9.5, orbit: false },
  inside:  { zoom: 0.15, rotX: 0.45, rotY: 1.20, coreIntensity: 22.0, orbit: false },
  orbit:   { zoom: 9.5, rotX: -0.20, rotY: 0.0, coreIntensity: 12.0, orbit: true }
};

export function applyCinematicView(state: AppState, view: CinematicView): void {
  state.targetZoom = view.zoom;
  state.targetRotX = view.rotX;
  state.targetRotY = view.rotY;
  state.targetCoreIntensity = view.coreIntensity;
  state.isOrbitingMode = view.orbit;
}

export interface InteractionCallbacks {
  isModalActive: () => boolean;
  isOverUI: (target: EventTarget | null) => boolean;
}

export function bindInteractions(
  state: AppState,
  callbacks: InteractionCallbacks
): void {
  window.addEventListener('pointerdown', (e) => {
    if (callbacks.isOverUI(e.target)) return;
    state.isDragging = true;
    state.prevX = e.clientX;
    state.prevY = e.clientY;
  }, { passive: true });

  window.addEventListener('pointermove', (e) => {
    if (!state.isDragging) return;
    state.targetRotY += (e.clientX - state.prevX) * 0.007;
    state.targetRotX += (e.clientY - state.prevY) * 0.007;
    state.targetRotX = Math.max(-Math.PI / 2.1, Math.min(Math.PI / 2.1, state.targetRotX));
    state.prevX = e.clientX;
    state.prevY = e.clientY;
  }, { passive: true });

  window.addEventListener('pointerup', () => {
    state.isDragging = false;
  }, { passive: true });

  window.addEventListener('wheel', (e) => {
    if (callbacks.isModalActive()) return;
    e.preventDefault();
    state.targetZoom += e.deltaY * 0.0035;
    state.targetZoom = Math.max(0.02, Math.min(16.0, state.targetZoom));
  }, { passive: false });
}