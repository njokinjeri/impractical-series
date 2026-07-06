import { syncedHeartIndex } from '../lib/seed';

const COLORS = ['#33D17A', '#3FA0E0', '#E8A33D'] as const;
const OPACITY = 0.28;
const DRIFT = 0.08;

interface AmbientShape {
  type: 'circle' | 'square' | 'triangle';
  x: number;
  y: number;
  r: number;
  color: string;
  phase: number;
  speed: number;
}

function drawAmbient(ctx: CanvasRenderingContext2D, s: AmbientShape): void {
  ctx.save();
  ctx.globalAlpha = OPACITY;
  ctx.strokeStyle = s.color;
  ctx.lineWidth = 1;

  switch (s.type) {
    case 'circle':
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.stroke();
      break;
    case 'square':
      ctx.beginPath();
      ctx.rect(s.x - s.r, s.y - s.r, s.r * 2, s.r * 2);
      ctx.stroke();
      break;
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

function buildShapes(count: number, W: number, H: number): AmbientShape[] {
  const types: AmbientShape['type'][] = ['circle', 'square', 'triangle'];
  const cols = Math.ceil(Math.sqrt(count));
  return Array.from({ length: count }, (_, i) => ({
    type: types[i % 3],
    x: (((i % cols) + 0.5) / cols) * W + (Math.random() - 0.5) * 40,
    y:
      ((Math.floor(i / cols) + 0.5) / Math.ceil(count / cols)) * H +
      (Math.random() - 0.5) * 30,
    r: 5 + Math.random() * 3,
    color: COLORS[i % 3],
    phase: Math.random() * Math.PI * 2,
    speed: 0.3 + Math.random() * 0.4,
  }));
}

function heartSvg(color: string): string {
  return `<svg width="12" height="12" viewBox="0 0 14 14" aria-hidden="true">
    <path d="M7 12 L2 7 A3 3 0 0 1 7 3 A3 3 0 0 1 12 7 Z" fill="${color}"/>
  </svg>`;
}

export function mountFooter(shapeCount = 10): () => void {
  const canvas = document.getElementById(
    'footer-canvas'
  ) as HTMLCanvasElement | null;
  const heartEl = document.getElementById('footer-heart') as HTMLElement | null;

  if (!canvas || !heartEl) return () => {};

  const ctx = canvas.getContext('2d')!;
  const dpr = window.devicePixelRatio || 1;
  let W = 0;
  let H = 0;
  let animId = 0;
  let frame = 0;
  let shapes: AmbientShape[] = [];

  function resize(): void {
    const rect = canvas!.parentElement!.getBoundingClientRect();
    W = rect.width;
    H = rect.height;
    canvas!.width = W * dpr;
    canvas!.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    shapes = buildShapes(shapeCount, W, H);
  }

  resize();

  function tick(): void {
    frame++;
    ctx.clearRect(0, 0, W, H);
    shapes.forEach((s) => {
      s.x += Math.sin(frame * 0.01 * s.speed + s.phase) * DRIFT;
      s.y += Math.cos(frame * 0.012 * s.speed + s.phase) * DRIFT;
      drawAmbient(ctx, s);
    });
    animId = requestAnimationFrame(tick);
  }

  tick();

  function paintHeart(): void {
    heartEl!.innerHTML = heartSvg(COLORS[syncedHeartIndex()]);
  }

  paintHeart();
  const heartInterval = setInterval(paintHeart, 300);

  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(canvas.parentElement!);

  return () => {
    cancelAnimationFrame(animId);
    clearInterval(heartInterval);
    resizeObserver.disconnect();
  };
}
