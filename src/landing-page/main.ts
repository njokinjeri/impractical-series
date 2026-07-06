import { mountHeroSandbox } from './components/hero-sandbox';
import { mountCardGrid } from './components/card-grid';
import { mountFooter } from './components/footer-mount';

function init(): void {
  const heroCanvas = document.getElementById(
    'hero-canvas'
  ) as HTMLCanvasElement | null;

  if (heroCanvas) {
    mountHeroSandbox(heroCanvas);
  }

  mountCardGrid();
  mountFooter(10);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
