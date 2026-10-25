import { DONUTS } from '../donuts';

export function createKeyboardNav(onSelect: (id: string) => void): () => void {
  const handler = (e: KeyboardEvent): void => {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
    const current = location.hash.slice(1);
    const idx = DONUTS.findIndex((d) => d.id === current);
    if (idx < 0) return;
    const dir = e.key === 'ArrowRight' ? 1 : -1;
    const next = DONUTS[(idx + dir + DONUTS.length) % DONUTS.length];
    onSelect(next.id);
  };
  window.addEventListener('keydown', handler);
  return () => window.removeEventListener('keydown', handler);
}
