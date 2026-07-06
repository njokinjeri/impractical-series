import { slugSeed, seededRandom } from '../lib/seed';
import { ACCENT_HEX, type Project } from '../data/projects';

interface PreviewShape {
  type: 'circle' | 'square' | 'triangle';
  x: number;
  y: number;
  r: number;
  opacity: number;
}

function buildShapes(
  rand: () => number,
  W: number,
  H: number,
  count: number
): PreviewShape[] {
  const types: PreviewShape['type'][] = ['circle', 'square', 'triangle'];
  return Array.from({ length: count }, () => ({
    type: types[Math.floor(rand() * 3)],
    x: rand() * W,
    y: rand() * H,
    r: 4 + rand() * 8,
    opacity: 0.2 + rand() * 0.5,
  }));
}

function drawShape(
  ctx: CanvasRenderingContext2D,
  s: PreviewShape,
  color: string
): void {
  ctx.save();
  ctx.globalAlpha = s.opacity;
  ctx.strokeStyle = color;
  ctx.lineWidth = 1;
  ctx.shadowColor = color;
  ctx.shadowBlur = 4;

  switch (s.type) {
    case 'circle':
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.stroke();
      break;
    case 'square': {
      ctx.beginPath();
      const sr = s.r * 0.9;
      ctx.rect(s.x - sr, s.y - sr, sr * 2, sr * 2);
      ctx.stroke();
      break;
    }
    case 'triangle':
      ctx.beginPath();
      ctx.moveTo(s.x, s.y - s.r);
      ctx.lineTo(s.x + s.r * 0.9, s.y + s.r * 0.7);
      ctx.lineTo(s.x - s.r * 0.9, s.y + s.r * 0.7);
      ctx.closePath();
      ctx.stroke();
      break;
  }

  ctx.restore();
}

export function renderCardPreview(
  canvas: HTMLCanvasElement,
  project: Project
): void {
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  const W = rect.width || canvas.offsetWidth || 120;
  const H = rect.height || canvas.offsetHeight || 80;

  canvas.width = W * dpr;
  canvas.height = H * dpr;

  const ctx = canvas.getContext('2d')!;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  const rand = seededRandom(slugSeed(project.slug));
  const color = ACCENT_HEX[project.accent];
  const shapes = buildShapes(rand, W, H, 8);

  ctx.clearRect(0, 0, W, H);
  shapes.forEach((s) => drawShape(ctx, s, color));
}
