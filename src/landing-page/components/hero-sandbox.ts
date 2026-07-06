interface Shape {
  type: 'circle' | 'square' | 'triangle';
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  color: string;
  phase: number;
}

const COLOR_CIRCLE = '#33D17A';
const COLOR_SQUARE = '#3FA0E0';
const COLOR_TRIANGLE = '#E8A33D';
const IDLE_THRESHOLD = 1200;
const CHAOS_INTERVAL = 2800;
const CLUSTER_FORCE = 0.022;
const CLUSTER_RADIUS = 160;
const CHAOS_SPEED = 7.5;
const DAMPING = 0.96;
const DRIFT_AMPLITUDE = 0.06;
const SHADOW_BLUR = 9;

export function mountHeroSandbox(canvas: HTMLCanvasElement): () => void {
  const ctx = canvas.getContext('2d')!;
  const dpr = window.devicePixelRatio || 1;
  let W = 0;
  let H = 0;
  let animId = 0;

  function resize(): void {
    const rect = canvas.parentElement!.getBoundingClientRect();
    W = rect.width;
    H = rect.height;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  resize();

  const shapes: Shape[] = [
    ...Array.from({ length: 3 }, (_, i) => ({
      type: 'circle' as const,
      x: Math.random() * W,
      y: Math.random() * H * 0.6,
      vx: 0,
      vy: 0,
      r: 10,
      color: COLOR_CIRCLE,
      phase: i * 2.1,
    })),
    ...Array.from({ length: 3 }, (_, i) => ({
      type: 'square' as const,
      x: Math.random() * W,
      y: Math.random() * H * 0.6,
      vx: 0,
      vy: 0,
      r: 9,
      color: COLOR_SQUARE,
      phase: i * 1.7 + 1,
    })),
    {
      type: 'triangle',
      x: W / 2,
      y: H / 2,
      vx: 0,
      vy: 0,
      r: 12,
      color: COLOR_TRIANGLE,
      phase: 0,
    },
  ];

  const triIdx = shapes.findIndex((s) => s.type === 'triangle');
  const trail: Array<{ x: number; y: number }> = [];

  let dragIdx = -1;
  let dragOffX = 0;
  let dragOffY = 0;
  let lastInteract = Date.now();
  let lastChaos = Date.now();
  let frame = 0;

  function drawShape(s: Shape): void {
    ctx.save();
    ctx.strokeStyle = s.color;
    ctx.lineWidth = 1.3;
    ctx.shadowColor = s.color;
    ctx.shadowBlur = SHADOW_BLUR;

    switch (s.type) {
      case 'circle':
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.stroke();
        break;

      case 'square': {
        ctx.beginPath();
        const sr = s.r * 0.95;
        if (ctx.roundRect) {
          ctx.roundRect(s.x - sr, s.y - sr, sr * 2, sr * 2, 4);
        } else {
          ctx.rect(s.x - sr, s.y - sr, sr * 2, sr * 2);
        }
        ctx.stroke();
        break;
      }

      case 'triangle':
        ctx.beginPath();
        ctx.moveTo(s.x, s.y - s.r);
        ctx.lineTo(s.x + s.r * 0.95, s.y + s.r * 0.8);
        ctx.lineTo(s.x - s.r * 0.95, s.y + s.r * 0.8);
        ctx.closePath();
        ctx.stroke();
        break;
    }

    ctx.restore();
  }

  function tick(): void {
    frame++;
    const now = Date.now();
    const idle = now - lastInteract > IDLE_THRESHOLD;

    shapes.forEach((s, i) => {
      if (i === dragIdx) return;

      s.x += Math.sin(frame * 0.02 + s.phase) * DRIFT_AMPLITUDE;
      s.y += Math.cos(frame * 0.025 + s.phase) * DRIFT_AMPLITUDE;

      if (idle && i !== triIdx) {
        shapes.forEach((o, j) => {
          if (i === j || o.type !== s.type) return;
          const dx = o.x - s.x;
          const dy = o.y - s.y;
          const d = Math.hypot(dx, dy) || 1;
          if (d > s.r + o.r + 4 && d < CLUSTER_RADIUS) {
            s.vx += (dx / d) * CLUSTER_FORCE;
            s.vy += (dy / d) * CLUSTER_FORCE;
          }
        });
      }

      s.vx *= DAMPING;
      s.vy *= DAMPING;
      s.x += s.vx;
      s.y += s.vy;

      if (s.x < s.r) {
        s.x = s.r;
        s.vx *= -0.5;
      }
      if (s.x > W - s.r) {
        s.x = W - s.r;
        s.vx *= -0.5;
      }
      if (s.y < s.r) {
        s.y = s.r;
        s.vy *= -0.5;
      }
      if (s.y > H - s.r) {
        s.y = H - s.r;
        s.vy *= -0.5;
      }
    });

    if (idle && now - lastChaos > CHAOS_INTERVAL) {
      lastChaos = now;
      const candidates = shapes.filter((_, i) => i !== triIdx);
      const target = candidates[Math.floor(Math.random() * candidates.length)];
      const tri = shapes[triIdx];
      const dx = target.x - tri.x;
      const dy = target.y - tri.y;
      const d = Math.hypot(dx, dy) || 1;
      tri.vx = (dx / d) * CHAOS_SPEED;
      tri.vy = (dy / d) * CHAOS_SPEED;
    }

    for (let i = 0; i < shapes.length; i++) {
      for (let j = i + 1; j < shapes.length; j++) {
        const a = shapes[i];
        const b = shapes[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const d = Math.hypot(dx, dy);
        const minD = a.r + b.r;

        if (d < minD && d > 0) {
          const nx = dx / d;
          const ny = dy / d;
          const overlap = (minD - d) / 2;
          const isChaos = a.type === 'triangle' || b.type === 'triangle';
          const push = isChaos ? overlap + 3 : overlap;
          const impulse = isChaos ? 1.3 : 0.15;

          if (i !== dragIdx) {
            a.x += nx * push;
            a.vx += nx * impulse;
            a.vy += ny * impulse * 0.3;
          }
          if (j !== dragIdx) {
            b.x -= nx * push;
            b.vx -= nx * impulse;
            b.vy -= ny * impulse * 0.3;
          }
        }
      }
    }

    trail.push({ x: shapes[triIdx].x, y: shapes[triIdx].y });
    if (trail.length > 6) trail.shift();

    ctx.clearRect(0, 0, W, H);

    trail.forEach((pt, i) => {
      const alpha = (i / trail.length) * 0.35;
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.fillStyle = COLOR_TRIANGLE;
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });

    shapes.forEach(drawShape);

    animId = requestAnimationFrame(tick);
  }

  function getCanvasPos(e: MouseEvent | TouchEvent): { x: number; y: number } {
    const rect = canvas.getBoundingClientRect();
    if ('touches' in e && e.touches.length > 0) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      };
    } else if ('changedTouches' in e && e.changedTouches.length > 0) {
      return {
        x: e.changedTouches[0].clientX - rect.left,
        y: e.changedTouches[0].clientY - rect.top,
      };
    }
    const mouseEvent = e as MouseEvent;
    return {
      x: mouseEvent.clientX - rect.left,
      y: mouseEvent.clientY - rect.top,
    };
  }

  function onStart(e: MouseEvent | TouchEvent): void {
    if ('touches' in e) e.preventDefault();
    const { x, y } = getCanvasPos(e);

    shapes.forEach((s, i) => {
      const hitRadius = 'touches' in e ? s.r + 16 : s.r + 8;
      if (Math.hypot(x - s.x, y - s.y) < hitRadius) {
        dragIdx = i;
        dragOffX = x - s.x;
        dragOffY = y - s.y;
        lastInteract = Date.now();
      }
    });
  }

  function onMove(e: MouseEvent | TouchEvent): void {
    if (dragIdx < 0) return;
    if ('touches' in e) e.preventDefault();

    const { x, y } = getCanvasPos(e);
    shapes[dragIdx].x = x - dragOffX;
    shapes[dragIdx].y = y - dragOffY;
    shapes[dragIdx].vx = 0;
    shapes[dragIdx].vy = 0;
    lastInteract = Date.now();
  }

  function onEnd(): void {
    dragIdx = -1;
  }

  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(canvas.parentElement!);

  canvas.addEventListener('mousedown', onStart);
  window.addEventListener('mousemove', onMove);
  window.addEventListener('mouseup', onEnd);

  canvas.addEventListener('touchstart', onStart, { passive: false });
  window.addEventListener('touchmove', onMove, { passive: false });
  window.addEventListener('touchend', onEnd);
  window.addEventListener('touchcancel', onEnd);

  animId = requestAnimationFrame(tick);

  return () => {
    cancelAnimationFrame(animId);
    resizeObserver.disconnect();

    canvas.removeEventListener('mousedown', onStart);
    window.removeEventListener('mousemove', onMove);
    window.removeEventListener('mouseup', onEnd);

    canvas.removeEventListener('touchstart', onStart);
    window.removeEventListener('touchmove', onMove);
    window.removeEventListener('touchend', onEnd);
    window.removeEventListener('touchcancel', onEnd);
  };
}
