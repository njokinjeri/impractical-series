import {
  type Project,
  getPlayUrl,
  getSourceUrl,
  ACCENT_HEX,
} from '../data/projects';
import { slugSeed, seededRandom } from '../lib/seed';

interface ThumbShape {
  type: 'circle' | 'square' | 'triangle';
  x: number;
  y: number;
  r: number;
}

function drawThumbShape(
  ctx: CanvasRenderingContext2D,
  s: ThumbShape,
  color: string
): void {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.2;
  ctx.globalAlpha = 0.45;

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

export function drawCardThumb(
  canvas: HTMLCanvasElement,
  project: Project
): void {
  const dpr = window.devicePixelRatio || 1;
  const parent = canvas.parentElement!;
  const W = parent.clientWidth;
  const H = parent.clientHeight;

  if (!W || !H) return;

  canvas.width = W * dpr;
  canvas.height = H * dpr;
  canvas.style.width = W + 'px';
  canvas.style.height = H + 'px';

  const ctx = canvas.getContext('2d')!;
  const color = ACCENT_HEX[project.accent];
  const rand = seededRandom(slugSeed(project.slug));

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  const types: ThumbShape['type'][] = ['circle', 'square', 'triangle'];
  const count = 2 + Math.floor(rand() * 2);
  const shapes: ThumbShape[] = Array.from({ length: count }, () => ({
    type: types[Math.floor(rand() * 3)],
    x: W * (0.2 + rand() * 0.6),
    y: H * (0.2 + rand() * 0.6),
    r: 6 + rand() * 8,
  }));

  ctx.clearRect(0, 0, W, H);
  shapes.forEach((s) => drawThumbShape(ctx, s, color));
}

export function renderCard(project: Project): string {
  const playUrl = getPlayUrl(project.slug);
  const sourceUrl = getSourceUrl(project.slug);

  return `
    <article
      class="card"
      role="listitem"
      data-slug="${project.slug}"
      tabindex="0"
      aria-label="${project.title} - click to view details"
    >
      <div class="card__backing" aria-hidden="true"></div>
      <div class="card__front">

        <div class="card__thumb">
          <canvas
            class="card-thumb-canvas"
            data-slug="${project.slug}"
            aria-hidden="true"
          ></canvas>
        </div>

        <div class="card__body">
          <p class="card__title">${project.title}</p>
          <p class="card__desc">${project.description}</p>
        </div>

        <div class="card__actions">
          <a
            class="card__source"
            href="${sourceUrl}"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View source for ${project.title}"
            title="source"
          >&lt;/&gt;</a>
          <a
            class="card__live"
            href="${playUrl}"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open live experiment: ${project.title}"
            title="live"
          > 
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path d="M7 17L17 7" />
              <path d="M7 7h10v10" />
            </svg>
          </a>
        </div>

      </div>
    </article>
  `.trim();
}
