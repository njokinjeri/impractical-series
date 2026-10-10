import * as THREE from 'three';
import { scene, renderer } from './scene';
import { THEMES, type ViewMode } from './config';
import { rebuildSchool, recolorFish } from './fish';

interface UIState {
  themeKey: string;
  viewMode: ViewMode;
  expandedView: boolean;
}

const state: UIState = {
  themeKey: 'night',
  viewMode: 'circle',
  expandedView: true,
};

export function rebuild(): number {
  const theme = THEMES[state.themeKey];
  return rebuildSchool(state.viewMode, theme.palette);
}

function toggleTheme(): void {
  state.themeKey = state.themeKey === 'night' ? 'day' : 'night';
  const theme = THEMES[state.themeKey];

  scene.background = new THREE.Color(theme.bg);
  if (scene.fog) (scene.fog as THREE.Fog).color = new THREE.Color(theme.bg);
  renderer.setClearColor(theme.bg);
  document.body.style.background = theme.bgCSS;
  document.body.className = theme.bodyClass;

  recolorFish(theme.palette);
  buildUI();
}

export function buildUI(): void {
  const panel = document.getElementById('panel');
  if (!panel) return;
  panel.innerHTML = '';

  const themeCard = document.createElement('div');
  themeCard.className = 'card';
  const themeBtn = document.createElement('button');
  themeBtn.className = 'icon-btn';
  themeBtn.textContent = state.themeKey === 'night' ? '☀' : '☾';
  themeBtn.title = 'Toggle theme';
  themeBtn.addEventListener('click', toggleTheme);
  themeCard.appendChild(themeBtn);
  panel.appendChild(themeCard);

  const card = document.createElement('div');
  card.className = 'card';

  const label = document.createElement('button');
  label.className = 'primary';
  label.innerHTML = 'View <span style="font-size:9px;opacity:0.6">▾</span>';
  label.addEventListener('click', () => {
    state.expandedView = !state.expandedView;
    buildUI();
  });
  card.appendChild(label);

  const sub = document.createElement('div');
  sub.className = 'submenu' + (state.expandedView ? ' open' : '');

  const options: { label: string; value: ViewMode }[] = [
    { label: 'Circle', value: 'circle' },
    { label: 'Free', value: 'free' },
  ];

  for (const opt of options) {
    const b = document.createElement('button');
    b.textContent = opt.label;
    if (state.viewMode === opt.value) b.classList.add('active');
    b.addEventListener('click', () => {
      state.viewMode = opt.value;
      rebuild();
      buildUI();
    });
    sub.appendChild(b);
  }

  const closeBtn = document.createElement('button');
  closeBtn.className = 'close-btn';
  closeBtn.textContent = '✕';
  closeBtn.title = 'Close';
  closeBtn.addEventListener('click', () => {
    state.expandedView = false;
    buildUI();
  });
  sub.appendChild(closeBtn);

  card.appendChild(sub);
  panel.appendChild(card);
}
