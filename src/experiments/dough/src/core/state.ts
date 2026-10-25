type Listener = (id: string) => void;

export interface DoughState {
  currentId: string;
  isDragging: boolean;
  resumeDriftAt: number;
}

const state: DoughState = {
  currentId: '',
  isDragging: false,
  resumeDriftAt: 0,
};

const listeners = new Set<Listener>();

export function getState(): Readonly<DoughState> {
  return state;
}

export function setCurrentDonut(id: string): void {
  state.currentId = id;
  listeners.forEach((fn) => fn(id));
}

export function onDonutChange(fn: Listener): () => void {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function beginDrag(): void {
  state.isDragging = true;
}

export function endDrag(): void {
  state.isDragging = false;
  state.resumeDriftAt = performance.now() + 1500;
}

export function canDrift(): boolean {
  return !state.isDragging && performance.now() > state.resumeDriftAt;
}
