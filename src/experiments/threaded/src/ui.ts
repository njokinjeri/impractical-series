import type { Language } from './types';
import { HELLO_SEQ } from './languages';
import { pauseEngine, resumeEngine } from './canvas';

const logDrawer = document.getElementById('log-drawer')!;
const logLangs = document.getElementById('log-langs')!;
const transSeq = document.getElementById('trans-sequence')!;
const pauseBtn = document.getElementById('pause-btn')!;
const table = document.getElementById('log-binary-table')!;
const logBtn = document.getElementById('log-btn')!;
const logClose = document.getElementById('log-close')!;

const seenLanguages = new Map<string, Language>();

type EngineState = 'running' | 'paused';
let engineState: EngineState = 'running';

export function setEngineState(s: EngineState): void {
  engineState = s;
  pauseBtn.textContent = s === 'running' ? '// PAUSE' : '// RESUME';
  pauseBtn.classList.remove('done');
}

export function addLangsToLog(langs: Language[]): void {
  langs.forEach((l) => seenLanguages.set(l.name, l));
  if (logDrawer.classList.contains('open')) refreshLogLangs();
}

function refreshLogLangs(): void {
  if (seenLanguages.size === 0) {
    logLangs.innerHTML =
      '<div class="log-empty">// no languages logged yet</div>';
    return;
  }
  logLangs.innerHTML = '';
  seenLanguages.forEach((lang) => {
    const row = document.createElement('div');
    row.className = 'log-lang-row';
    row.innerHTML = `
        <div class="log-lang-name" style="color:${lang.color}">${lang.name.toUpperCase()}</div>
        <div class="log-lang-code">${lang.code}</div>
    `;
    logLangs.appendChild(row);
    requestAnimationFrame(() =>
      setTimeout(() => row.classList.add('visible'), 30)
    );
  });
}

export function populateLogTable(): void {
  table.innerHTML = '';
  HELLO_SEQ.forEach(({ char, nibble }) => {
    const label =
      char === ' '
        ? 'SPACE'
        : char === ','
          ? 'COMMA'
          : char === '!'
            ? 'EXCL'
            : char;
    const row = document.createElement('div');
    row.className = 'log-binary-entry';
    row.innerHTML = `
            <div class="log-char">${char === ' ' ? '·' : char}</div>
            <div class="log-nibble">${nibble}</div>
            <div class="log-charname">${label} · ${char.charCodeAt(0)}</div>
        `;
    table.appendChild(row);
  });
}

let byteEls: HTMLElement[] = [];

export function resetTransBar(): void {
  byteEls.forEach((el) => el.remove());
  byteEls = [];
}

export function addTransByte(idx: number): void {
  if (idx >= HELLO_SEQ.length) return;
  const { char, nibble } = HELLO_SEQ[idx];
  const cursor = document.getElementById('trans-cursor')!;
  const el = document.createElement('div');
  el.className = 'trans-byte';
  el.innerHTML = `
        <div class="trans-nibble">${nibble}</div>
        <div class="trans-char">${char === ' ' ? '·' : char}</div>
  `;
  transSeq.insertBefore(el, cursor);
  byteEls.push(el);
  requestAnimationFrame(() => el.classList.add('show'));
}

export function fadeTransBar(onDone: () => void): void {
  byteEls.forEach((el, i) =>
    setTimeout(() => el.classList.add('fade'), i * 45)
  );
  setTimeout(
    () => {
      resetTransBar();
      onDone();
    },
    byteEls.length * 45 + 600
  );
}

export function initUI(): void {
  populateLogTable();

  logBtn.addEventListener('click', () => {
    logDrawer.classList.add('open');
    refreshLogLangs();
  });

  logClose.addEventListener('click', () => {
    logDrawer.classList.remove('open');
  });

  pauseBtn.addEventListener('click', () => {
    if (engineState === 'running') pauseEngine();
    else resumeEngine();
  });
}
