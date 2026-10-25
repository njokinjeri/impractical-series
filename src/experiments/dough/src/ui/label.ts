import type { DonutDef } from '../donuts';

export function createLabel(): { update: (donut: DonutDef) => void } {
  const el = document.createElement('div');
  el.className = 'label';

  const title = document.createElement('div');
  title.className = 'label__title';
  const subtitle = document.createElement('div');
  subtitle.className = 'label__subtitle';

  el.appendChild(title);
  el.appendChild(subtitle);
  document.body.appendChild(el);

  return {
    update(donut: DonutDef): void {
      title.textContent = donut.name;
      subtitle.textContent = donut.subtitle;
      document.documentElement.style.setProperty('--accent', donut.accent);
    },
  };
}
