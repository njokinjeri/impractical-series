interface MiniShape {
  type: 'circle' | 'square';
  x: number;
  y: number;
  r: number;
  color: string;
  phase: number;
}

const SHADOW_BLUR = 6;
const DRIFT_AMPLITUDE = 0.08;

function drawShape(ctx: CanvasRenderingContext2D, s: MiniShape): void {
  ctx.save();
  ctx.strokeStyle = s.color;
  ctx.lineWidth = 1.2;
  ctx.shadowColor = s.color;
  ctx.shadowBlur = SHADOW_BLUR;

  if (s.type === 'circle') {
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.stroke();
  } else {
    ctx.beginPath();
    const r = s.r * 0.95;
    if (ctx.roundRect) {
      ctx.roundRect(s.x - r, s.y - r, r * 2, r * 2, 3);
    } else {
      ctx.rect(s.x - r, s.y - r, r * 2, r * 2);
    }
    ctx.stroke();
  }

  ctx.restore();
}

export function mountMiniSandbox(canvas: HTMLCanvasElement): () => void {
  const ctx = canvas.getContext('2d')!;
  const dpr = window.devicePixelRatio || 1;
  const wrap = canvas.parentElement!;
  let W = 0;
  let H = 0;
  let animId = 0;

  function resize(): void {
    W = wrap.clientWidth || 120;
    H = wrap.clientHeight || 90;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  resize();

  const shapes: MiniShape[] = [
    {
      type: 'circle',
      x: W * 0.25,
      y: H * 0.4,
      r: 7,
      color: '#33D17A',
      phase: 0,
    },
    {
      type: 'circle',
      x: W * 0.45,
      y: H * 0.65,
      r: 7,
      color: '#33D17A',
      phase: 1.5,
    },
    {
      type: 'square',
      x: W * 0.72,
      y: H * 0.4,
      r: 6,
      color: '#3FA0E0',
      phase: 3,
    },
  ];

  let frame = 0;

  function tick(): void {
    frame++;
    ctx.clearRect(0, 0, W, H);
    shapes.forEach((s) => {
      s.x += Math.sin(frame * 0.02 + s.phase) * DRIFT_AMPLITUDE;
      s.y += Math.cos(frame * 0.025 + s.phase) * DRIFT_AMPLITUDE;
      drawShape(ctx, s);
    });
    animId = requestAnimationFrame(tick);
  }

  tick();

  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(wrap);

  return () => {
    cancelAnimationFrame(animId);
    resizeObserver.disconnect();
  };
}
