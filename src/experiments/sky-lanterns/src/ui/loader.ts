let loaderEl: HTMLElement | null = null;

export function initLoader(): void {
  loaderEl = document.getElementById('loader-overlay');
}

export function showLoader(callback: () => void): void {
  if (!loaderEl) return;
  loaderEl.classList.add('active');
  requestAnimationFrame(() => {
    setTimeout(() => {
      callback();
      requestAnimationFrame(() => {
        loaderEl!.classList.remove('active');
      });
    }, 50);
  });
}
