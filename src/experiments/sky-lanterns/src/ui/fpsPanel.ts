export function initFpsPanel(): void {
  const fpsContainer = document.getElementById('fps-container');
  const btn = document.getElementById(
    'toggle-fps-btn'
  ) as HTMLButtonElement | null;
  if (!fpsContainer || !btn) return;

  btn.addEventListener('click', () => {
    fpsContainer.classList.toggle('collapsed');
    const collapsed = fpsContainer.classList.contains('collapsed');
    btn.innerText = collapsed ? '[ Show FPS ]' : '[ FPS Metrics ]';
    btn.setAttribute('aria-expanded', collapsed ? 'false' : 'true');
  });
}
