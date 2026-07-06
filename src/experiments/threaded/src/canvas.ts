import type { CanvasState, Language, Phase, DeviceType } from './types';
import { ALL_LANGUAGES, HELLO_SEQ } from './languages';
import {
  particles,
  stampedNibbles,
  clearParticles,
  spawnParticle,
  stampNibble,
  fadeStampedNibbles,
} from './particles';
import {
  addLangsToLog,
  resetTransBar,
  addTransByte,
  fadeTransBar,
  setEngineState,
} from './ui';

//--canvas
const canvas = document.getElementById('c') as HTMLCanvasElement;
const ctx = canvas.getContext('2d')!;

export const state: CanvasState = {
  W: 0,
  H: 0,
  CX: 0,
  CY: 0,
  device: 'desktop',
  threadCount: 4,
  vertical: false,
};

const BAR_H = 52;

function getDevice(): DeviceType {
  if (state.W < 600) return 'mobile';
  if (state.W < 1024) return 'tablet';
  return 'desktop';
}

export function initCanvas(): void {
  measure();
  window.addEventListener('resize', () => {
    measure();
    if (!isPaused) resetRound();
  });
}

function measure(): void {
  state.W = canvas.width = window.innerWidth;
  state.H = canvas.height = window.innerHeight;
  state.CX = state.W / 2;
  state.CY = state.H / 2;
  state.device = getDevice();
  state.vertical = state.device !== 'desktop';
  state.threadCount =
    state.device === 'mobile' ? 2 : state.device === 'tablet' ? 3 : 4;
}

// Geometry: horizontal layout -- desktop

function hSpread(): number {
  return (state.H - BAR_H) * 0.62;
}
function hSrcX(): number {
  return 16;
}
function hDstX(): number {
  return state.W - 16;
}

function hThreadY(idx: number, total: number): number {
  if (total === 1) return state.CY - BAR_H / 2;
  const topY = state.CY - BAR_H / 2 - hSpread() / 2;
  return topY + (idx / (total - 1)) * hSpread();
}

// Geometry: vertical layout -- desktop

function vSpread(): number {
  return state.W * 0.72;
}
function vSrcY(): number {
  return 70;
}
function vDstY(): number {
  return state.H - BAR_H - 70;
}

function vThreadX(idx: number, total: number): number {
  if (total === 1) return state.CX;
  const leftX = state.CX - vSpread() / 2;
  return leftX + (idx / (total - 1)) * vSpread();
}

function cubicBezier(
  t: number,
  p0: number,
  p1: number,
  p2: number,
  p3: number
): number {
  const m = 1 - t;
  return (
    m * m * m * p0 + 3 * m * m * t * p1 + 3 * m * t * t * p2 + t * t * t * p3
  );
}

function getPos(
  langIdx: number,
  total: number,
  progress: number
): { x: number; y: number } {
  const CCY = state.CY - BAR_H / 2;

  if (!state.vertical) {
    const srcX = hSrcX() + 110;
    const dstX = hDstX() - 110;
    const y = hThreadY(langIdx, total);
    const cp1x = srcX + (state.CX - srcX) * 0.55;
    const cp2x = dstX - (dstX - state.CX) * 0.55;

    if (progress <= 0.5) {
      const t = progress / 0.5;
      return {
        x: cubicBezier(t, srcX, cp1x, state.CX - 40, state.CX),
        y: cubicBezier(t, y, y, CCY, CCY),
      };
    } else {
      const t = (progress - 0.5) / 0.5;
      return {
        x: cubicBezier(t, state.CX, state.CX + 40, cp2x, dstX),
        y: cubicBezier(t, CCY, CCY, y, y),
      };
    }
  } else {
    const srcY = vSrcY() + 60;
    const dstY = vDstY() - 60;
    const x = vThreadX(langIdx, total);
    const cp1y = srcY + (CCY - srcY) * 0.55;
    const cp2y = dstY - (dstY - CCY) * 0.55;

    if (progress <= 0.5) {
      const t = progress / 0.5;
      return {
        x: cubicBezier(t, x, x, state.CX, state.CX),
        y: cubicBezier(t, srcY, cp1y, CCY - 40, CCY),
      };
    } else {
      const t = (progress - 0.5) / 0.5;
      return {
        x: cubicBezier(t, state.CX, state.CX, x, x),
        y: cubicBezier(t, CCY, CCY + 40, cp2y, dstY),
      };
    }
  }
}

// --draw helper

function glowText(
  text: string,
  x: number,
  y: number,
  color: string,
  alpha: number,
  size: number,
  align: CanvasTextAlign = 'center'
): void {
  if (alpha <= 0.01) return;
  ctx.save();
  ctx.textAlign = align;
  ctx.textBaseline = 'middle';
  ctx.fillStyle = color;
  ctx.globalAlpha = alpha * 0.2;
  ctx.font = `${size + 3}px 'Share Tech Mono', monospace`;
  ctx.fillText(text, x, y);
  ctx.globalAlpha = alpha;
  ctx.font = `${size}px 'Share Tech Mono', monospace`;
  ctx.fillText(text, x, y);
  ctx.restore();
}

function hexA(hex: string, a: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${a})`;
}

function drawGhostPaths(langs: Language[]): void {
  const N = langs.length;
  const CCY = state.CY - BAR_H / 2;
  ctx.lineWidth = 1;

  if (!state.vertical) {
    const srcX = hSrcX() + 110;
    const dstX = hDstX() - 110;
    for (let i = 0; i < N; i++) {
      const y = hThreadY(i, N);
      const cp1x = srcX + (state.CX - srcX) * 0.55;
      const cp2x = dstX - (dstX - state.CX) * 0.55;
      ctx.save();
      ctx.globalAlpha = 0.055;
      ctx.strokeStyle = langs[i].color;
      ctx.setLineDash([3, 7]);
      ctx.beginPath();
      ctx.moveTo(srcX, y);
      ctx.bezierCurveTo(cp1x, y, state.CX - 40, CCY, state.CX, CCY);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(state.CX, CCY);
      ctx.bezierCurveTo(state.CX + 40, CCY, cp2x, y, dstX, y);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.restore();
    }
  } else {
    const srcY = vSrcY() + 60;
    const dstY = vDstY() - 60;
    for (let i = 0; i < N; i++) {
      const x = vThreadX(i, N);
      const cp1y = srcY + (CCY - srcY) * 0.55;
      const cp2y = dstY - (dstY - CCY) * 0.55;
      ctx.save();
      ctx.globalAlpha = 0.055;
      ctx.strokeStyle = langs[i].color;
      ctx.setLineDash([3, 7]);
      ctx.beginPath();
      ctx.moveTo(x, srcY);
      ctx.bezierCurveTo(x, cp1y, state.CX, CCY - 40, state.CX, CCY);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(state.CX, CCY);
      ctx.bezierCurveTo(state.CX, CCY + 40, x, cp2y, x, dstY);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.restore();
    }
  }
}

function drawLabels(langs: Language[]): void {
  const N = langs.length;
  const nameFs = state.device === 'mobile' ? 12 : 14;
  const codeFs = state.device === 'mobile' ? 10 : 12;

  if (!state.vertical) {
    langs.forEach((lang, i) => {
      const y = hThreadY(i, N);
      ctx.save();
      ctx.font = `bold ${nameFs}px 'Share Tech Mono', monospace`;
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = hexA(lang.color, 0.6);
      ctx.fillText(lang.name.toUpperCase(), hSrcX(), y - (nameFs + 3));
      ctx.font = `${codeFs}px 'Share Tech Mono', monospace`;
      ctx.fillStyle = hexA(lang.color, 0.2);
      ctx.fillText(lang.code, hSrcX(), y + 6);
      ctx.restore();
      ctx.save();
      ctx.font = `bold ${nameFs}px 'Share Tech Mono', monospace`;
      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = hexA(lang.color, 0.25);
      ctx.fillText(lang.name.toUpperCase(), hDstX(), y - (nameFs + 3));
      ctx.restore();
    });
  } else {
    langs.forEach((lang, i) => {
      const x = vThreadX(i, N);
      ctx.save();
      ctx.font = `bold ${nameFs}px 'Share Tech Mono', monospace`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = hexA(lang.color, 0.6);
      ctx.fillText(lang.name.toUpperCase(), x, vSrcY() + 20);
      ctx.font = `${codeFs - 1}px 'Share Tech Mono', monospace`;
      ctx.fillStyle = hexA(lang.color, 0.18);
      ctx.fillText(lang.code, x, vSrcY() + 36);
      ctx.restore();
      ctx.save();
      ctx.font = `bold ${nameFs}px 'Share Tech Mono', monospace`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = hexA(lang.color, 0.25);
      ctx.fillText(lang.name.toUpperCase(), x, vDstY() + 30);
      ctx.restore();
    });
  }
}

function drawConvergenceGlow(frameCount: number): void {
  const CCY = state.CY - BAR_H / 2;
  const pulse = 48 + Math.sin(frameCount * 0.033) * 6;
  const grd = ctx.createRadialGradient(state.CX, CCY, 0, state.CX, CCY, pulse);
  grd.addColorStop(0, 'rgba(255,255,255,0.17)');
  grd.addColorStop(0.4, 'rgba(150,200,255,0.06)');
  grd.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = grd;
  ctx.fillRect(state.CX - pulse, CCY - pulse, pulse * 2, pulse * 2);
}

function drawStampedNibbles(): void {
  const nfs = state.device === 'mobile' ? 14 : 16;
  ctx.save();
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'left';
  ctx.font = `${nfs}px 'Share Tech Mono', monospace`;
  for (const n of stampedNibbles) {
    if (n.alpha <= 0.01) continue;
    const w = ctx.measureText(n.nibble).width;
    ctx.clearRect(n.x - 1, n.y - nfs, w + 2, nfs * 2);
    ctx.fillStyle = n.color;
    ctx.globalAlpha = n.alpha * 0.75;
    ctx.fillText(n.nibble, n.x, n.y);
  }
  ctx.restore();
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

let langQueue: Language[] = [];
let queuePos = 0;

function nextBatch(): Language[] {
  if (queuePos >= langQueue.length) {
    langQueue = shuffle([...ALL_LANGUAGES]);
    queuePos = 0;
  }
  const batch: Language[] = [];
  for (let i = 0; i < state.threadCount; i++) {
    if (queuePos >= langQueue.length) {
      langQueue = shuffle([...ALL_LANGUAGES]);
      queuePos = 0;
    }
    const src = langQueue[queuePos++];
    batch.push({
      ...src,
      _charIndex: 0,
      _spawnTimer: i * 3,
      _spawnDelay: 4 + i * 0.4,
    });
  }
  return batch;
}

let phase: Phase = 'FLOWING';
let phaseTimer = 0;
let frameCount = 0;
let activelangs: Language[] = [];
let transIndex = 0;
let byteClock = 0;
let isPaused = false;

const FLOW_DURATION = 220;
const BYTE_INTERVAL = 12;

export function pauseEngine(): void {
  isPaused = true;
  setEngineState('paused');
}
export function resumeEngine(): void {
  isPaused = false;
  setEngineState('running');
}

export function restartEngine(): void {
  langQueue = [];
  queuePos = 0;
  isPaused = false;
  phase = 'FLOWING';
  setEngineState('running');
  resetRound();
}

export function resetRound(): void {
  clearParticles();
  phase = 'FLOWING';
  phaseTimer = 0;
  byteClock = 0;
  transIndex = 0;
  resetTransBar();
  activelangs = nextBatch();
  addLangsToLog(activelangs);
}

// --main loop

export function startLoop(): void {
  function draw(): void {
    requestAnimationFrame(draw);
    frameCount++;

    const { W, H } = state;
    const N = activelangs.length;
    const fs = state.device === 'mobile' ? 10 : 13;

    ctx.fillStyle = 'rgba(5,5,15,0.3)';
    ctx.fillRect(0, 0, W, H);

    if (!isPaused) {
      if (phase === 'FLOWING') {
        phaseTimer++;

        if (particles.length < 150) {
          for (let i = 0; i < N; i++) {
            const lang = activelangs[i];
            lang._spawnTimer++;
            if (lang._spawnTimer >= lang._spawnDelay) {
              lang._spawnTimer = 0;
              spawnParticle(i, lang);
            }
          }
        }
        if (phaseTimer > 55 && transIndex < HELLO_SEQ.length) {
          byteClock++;
          if (byteClock % BYTE_INTERVAL === 0) addTransByte(transIndex++);
        }
        if (phaseTimer > FLOW_DURATION) {
          phase = 'HOLDING';
          phaseTimer = 0;
        }
      } else if (phase === 'HOLDING') {
        if (transIndex < HELLO_SEQ.length) {
          byteClock++;
          if (byteClock % 8 === 0) addTransByte(transIndex++);
        }
        phaseTimer++;
        if (phaseTimer > 220) {
          phase = 'FADING';
          phaseTimer = 0;
          fadeTransBar(() => resetRound());
        }
      } else if (phase === 'FADING') {
        phaseTimer++;
        fadeStampedNibbles();
      }
    }
    drawGhostPaths(activelangs);
    drawLabels(activelangs);
    drawConvergenceGlow(frameCount);

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.progress += p.speed;

      if (p.progress > 1.08) {
        if (p.progress - p.speed <= 1.08) {
          const exitX = state.vertical ? vThreadX(p.langIdx, N) : hDstX() - 110;
          const exitY = state.vertical ? vDstY() - 60 : hThreadY(p.langIdx, N);
          stampNibble(p, exitX, exitY + 10);
        }
        particles.splice(i, 1);
        continue;
      }

      const prog = p.progress;
      const pos = getPos(p.langIdx, N, Math.min(prog, 1));

      const CS = 0.44,
        CE = 0.56;
      let ch: string, alpha: number, color: string;

      if (prog < CS) {
        ch = p.char;
        alpha =
          Math.min(1, prog / 0.07) * Math.min(1, (CS - prog) / 0.05 + 0.25);
        color = p.color;
      } else if (prog < CE) {
        ch = Math.random() > 0.5 ? '1' : '0';
        alpha = 0.9;
        color = '#FFFFFF';
      } else {
        const t = (prog - CE) / (1 - CE);
        const nib = p.nibble;
        const idx = Math.floor(t * nib.length);
        ch = nib[Math.min(idx, nib.length - 1)];
        alpha =
          Math.min(1, (prog - CE) / 0.04) *
          Math.min(1, (1.0 - prog) / 0.09 + 0.1);
        color = p.isShared ? '#AACCFF' : p.color;
      }
      glowText(ch, pos.x, pos.y, color, Math.min(1, alpha), fs);
    }
    drawStampedNibbles();
  }

  draw();
}
