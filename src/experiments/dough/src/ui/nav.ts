import { DONUTS, type DonutDef } from '../donuts';
import { onDonutChange } from '../core/state';

export interface NavController {
  setActive: (id: string) => void;
  close: () => void;
}

export function createNav(onSelect: (id: string) => void): NavController {
  const root = document.createElement('nav');
  root.className = 'nav';

  const emblem = document.createElement('button');
  emblem.type = 'button';
  emblem.className = 'nav__emblem';
  emblem.setAttribute('aria-label', 'Toggle donut list');
  emblem.textContent = '🍩';

  const count = document.createElement('span');
  count.className = 'nav__count';

  const list = document.createElement('ul');
  list.className = 'nav__list';

  const buttons = new Map<string, HTMLButtonElement>();

  for (const donut of DONUTS) {
    const li = document.createElement('li');
    li.className = 'nav__item';

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'nav__item-btn';
    btn.textContent = donut.shortName;

    btn.addEventListener('click', () => {
      onSelect(donut.id);
      root.classList.remove('is-open');
    });

    buttons.set(donut.id, btn);
    li.appendChild(btn);
    list.appendChild(li);
  }

  root.appendChild(emblem);
  root.appendChild(count);
  root.appendChild(list);
  document.body.appendChild(root);

  emblem.addEventListener('click', () => {
    root.classList.toggle('is-open');
  });

  function setActive(id: string): void {
    for (const [key, btn] of buttons) {
      btn.classList.toggle('is-active', key === id);
    }
    const active = DONUTS.find((d) => d.id === id);
    if (active) {
      document.documentElement.style.setProperty('--accent', active.accent);
    }
    const idx = DONUTS.findIndex((d) => d.id === id);
    count.innerHTML = `<span class="nav__count-current">${idx + 1}</span>/${DONUTS.length}`;
  }

  onDonutChange(setActive);

  setTimeout(() => {
    emblem.classList.add('is-hinting');
    setTimeout(() => emblem.classList.remove('is-hinting'), 1200);
  }, 1500);

  return {
    setActive,
    close: () => root.classList.remove('is-open'),
  };
}

export type { DonutDef };
