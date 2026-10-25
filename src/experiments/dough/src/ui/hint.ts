import { DONUTS } from '../donuts';

let timeout: number | null = null;

export function createHint(): {
  show: (currentId: string) => void;
  hide: () => void;
} {
  const el = document.createElement('div');
  el.className = 'hint';
  document.body.appendChild(el);

  function show(currentId: string): void {
    if (timeout !== null) window.clearTimeout(timeout);
    timeout = window.setTimeout(() => {
      const idx = DONUTS.findIndex((d) => d.id === currentId);
      const current = String(idx + 1).padStart(2, '0');
      const total = String(DONUTS.length).padStart(2, '0');
      el.innerHTML = `<span class="hint__current">${current}</span> of ${total}`;
      el.classList.add('is-visible');
    }, 8000) as unknown as number;
  }

  function hide(): void {
    if (timeout !== null) {
      window.clearTimeout(timeout);
      timeout = null;
    }
    el.classList.remove('is-visible');
  }

  return { show, hide };
}
