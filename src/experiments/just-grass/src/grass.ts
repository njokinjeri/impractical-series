import { GrassBlade } from './blade';

interface Pointer {
  x: number;
  y: number;
  vx: number;
  vy: number;
  active: boolean;
}

interface GrassCallbacks {
  onIdle?: () => void;
  onInteract?: () => void;
}

export class GrassField {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private blades: GrassBlade[] = [];
  private time: number = 0;
  private lastTime: number = 0;
  private raf: number = 0;
  private pointer: Pointer = {
    x: -9999,
    y: -9999,
    vx: 0,
    vy: 0,
    active: false,
  };
  private idleTimer: number = 0;
  private overgrown: boolean = false;
  private callbacks: GrassCallbacks;
  private bgGrad: CanvasGradient | null = null;
  private groundGrad: CanvasGradient | null = null;

  private userWind: number = 0;
  private windCurrent: number = 0;
  private windTarget: number = 0;

  private readonly HEADER_CLEARANCE = 120;

  constructor(canvas: HTMLCanvasElement, callbacks: GrassCallbacks = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d', { alpha: false })!;
    this.callbacks = callbacks;
    this.time = Math.random() * 100;
    this.resize();
    this.bindEvents();
    window.addEventListener('resize', () => this.resize());
  }

  setWind(strength: number) {
    this.userWind = strength;
    this.windTarget = this.overgrown ? Math.max(strength, 1.8) : strength;
  }

  private resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.blades = [];
    this.bgGrad = null;
    this.groundGrad = null;
    this.populate();
  }

  private populate() {
    const W = this.canvas.width;
    const H = this.canvas.height;
    const spacing = 14;
    const totalCols = Math.floor(W / spacing) + 2;

    for (let col = 0; col < totalCols; col++) {
      const x = col * spacing + (Math.random() - 0.5) * spacing * 0.7;
      const bladesPerCol = Math.random() < 0.45 ? 2 : 1;

      for (let b = 0; b < bladesPerCol; b++) {
        const bx = x + (Math.random() - 0.5) * 7;
        const depth = Math.random();
        const baseY = H - 4 - depth * 22 - Math.random() * 14;

        const absoluteMaxH = baseY - this.HEADER_CLEARANCE;
        const naturalMin = H * 0.18;
        const naturalMax = H * 0.38 + depth * H * 0.06;
        const heightBase = Math.min(
          absoluteMaxH,
          naturalMin + Math.random() * (naturalMax - naturalMin)
        );
        const widthBase = 2.2 + depth * 2.8 + Math.random() * 1.4;

        this.blades.push(
          new GrassBlade({
            x: bx,
            baseY,
            height: Math.max(40, heightBase),
            width: widthBase,
            lean: (Math.random() - 0.5) * 0.28,
            colorSeed: Math.random(),
            phase: Math.random() * Math.PI * 2,
            growthTarget: Math.max(40, heightBase),
            currentHeight: Math.max(
              10,
              heightBase * (0.08 + Math.random() * 0.18)
            ),
          })
        );
      }
    }

    this.blades.sort((a, b) => a.baseY - b.baseY);
  }

  private bindEvents() {
    const c = this.canvas;

    const onMove = (cx: number, cy: number) => {
      this.pointer.vx = cx - this.pointer.x;
      this.pointer.vy = cy - this.pointer.y;
      this.pointer.x = cx;
      this.pointer.y = cy;
      this.pointer.active = true;
      this.idleTimer = 0;

      if (this.overgrown) this.resetGrowth();
    };

    c.addEventListener('mousemove', (e) => onMove(e.clientX, e.clientY));
    c.addEventListener(
      'touchmove',
      (e) => {
        e.preventDefault();
        onMove(e.touches[0].clientX, e.touches[0].clientY);
      },
      { passive: false }
    );
    c.addEventListener('mouseleave', () => {
      this.pointer.active = false;
    });
    c.addEventListener('touchend', () => {
      this.pointer.active = false;
    });
  }

  private interactBlades() {
    if (!this.pointer.active) return;

    const speed = Math.sqrt(this.pointer.vx ** 2 + this.pointer.vy ** 2);
    const px = this.pointer.x;
    const py = this.pointer.y;
    const radius = 90 + speed * 2.0;
    const radiusSq = radius * radius;
    const pvx = this.pointer.vx;

    for (const blade of this.blades) {
      const h = blade.currentHeight;
      const tipDisp = blade.displacement + blade.lean * h * 0.3;
      const bx = blade.x,
        by = blade.baseY;

      const { cp1x, cp1y, cp2x, cp2y, tx, ty } = GrassBlade.controlPoints(
        bx,
        by,
        h,
        tipDisp
      );

      let minDistSq = Infinity;
      for (const f of [0, 0.3, 0.6, 1.0]) {
        const mt = 1 - f;
        const sx =
          mt * mt * mt * bx +
          3 * mt * mt * f * cp1x +
          3 * mt * f * f * cp2x +
          f * f * f * tx;
        const sy =
          mt * mt * mt * by +
          3 * mt * mt * f * cp1y +
          3 * mt * f * f * cp2y +
          f * f * f * ty;
        const dq = (sx - px) ** 2 + (sy - py) ** 2;
        if (dq < minDistSq) minDistSq = dq;
      }

      if (minDistSq < radiusSq) {
        const dist = Math.sqrt(minDistSq);
        const inf = (1 - dist / radius) ** 1.4;
        const dx = blade.x - px;
        const forceX = (pvx * 0.7 + (dx < 0 ? -1.8 : 1.8)) * inf;
        blade.applyForce(forceX * 0.28);
      }
    }

    this.pointer.vx *= 0.7;
    this.pointer.vy *= 0.7;
  }

  private triggerOvergrowth() {
    if (this.overgrown) return;
    this.overgrown = true;
    this.windTarget = Math.max(1.8, this.userWind);
    this.callbacks.onIdle?.();

    for (const blade of this.blades) {
      const maxH = blade.baseY - this.HEADER_CLEARANCE;
      blade.growthTarget = Math.min(
        maxH,
        blade.height * (1.3 + Math.random() * 0.5)
      );
    }
  }

  private resetGrowth() {
    if (!this.overgrown) return;
    this.overgrown = false;
    this.windTarget = this.userWind;
    this.callbacks.onInteract?.();

    for (const blade of this.blades) {
      blade.growthTarget = blade.height;
    }
  }

  private updateWind(dt: number) {
    const rate = this.windCurrent < this.windTarget ? 4.0 : 1.2;
    this.windCurrent += (this.windTarget - this.windCurrent) * rate * dt;
    if (Math.abs(this.windCurrent) < 0.001) this.windCurrent = 0;
  }

  private buildBgGrads() {
    const W = this.canvas.width,
      H = this.canvas.height;
    const bg = this.ctx.createLinearGradient(0, 0, 0, H);
    bg.addColorStop(0, '#091608');
    bg.addColorStop(0.6, '#162a12');
    bg.addColorStop(1, '#0d1a0a');
    this.bgGrad = bg;
    const gd = this.ctx.createLinearGradient(0, H * 0.82, 0, H);
    gd.addColorStop(0, '#1a2e14');
    gd.addColorStop(1, '#0a130a');
    this.groundGrad = gd;
  }

  private drawBackground() {
    if (!this.bgGrad) this.buildBgGrads();
    const { width: W, height: H } = this.canvas;
    this.ctx.fillStyle = this.bgGrad!;
    this.ctx.fillRect(0, 0, W, H);
    this.ctx.fillStyle = this.groundGrad!;
    this.ctx.fillRect(0, H * 0.82, W, H * 0.18);
  }

  private drawGroundFog() {
    const { width: W, height: H } = this.canvas;
    const fog = this.ctx.createLinearGradient(0, H - 50, 0, H);
    fog.addColorStop(0, 'rgba(18,40,12,0)');
    fog.addColorStop(1, 'rgba(10,20,8,0.82)');
    this.ctx.fillStyle = fog;
    this.ctx.fillRect(0, H - 50, W, 50);
  }

  private update(dt: number) {
    this.time += dt;
    this.idleTimer += dt;

    if (!this.overgrown && this.userWind === 0 && this.idleTimer > 3.5) {
      this.triggerOvergrowth();
    }

    this.updateWind(dt);
    this.interactBlades();

    const wind = this.windCurrent;
    const t = this.time;
    for (let i = 0; i < this.blades.length; i++) {
      this.blades[i].update(dt, wind, t);
    }
  }

  private render() {
    this.drawBackground();
    for (let i = 0; i < this.blades.length; i++) this.blades[i].draw(this.ctx);
    this.drawGroundFog();
  }

  private loop(ts: number) {
    const dt = Math.min((ts - this.lastTime) / 1000, 0.05);
    this.lastTime = ts;
    this.update(dt);
    this.render();
    this.raf = requestAnimationFrame((t) => this.loop(t));
  }

  start() {
    this.lastTime = performance.now();
    this.raf = requestAnimationFrame((t) => this.loop(t));
  }

  stop() {
    cancelAnimationFrame(this.raf);
  }
}
