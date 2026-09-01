/* eslint-disable @typescript-eslint/no-explicit-any */
import { App } from './core/App';

document.addEventListener('DOMContentLoaded', () => {
  const app = new App();
  (window as any).app = app;
});

window.addEventListener('beforeunload', () => {
  if ((window as any).app) {
    (window as any).app.dispose();
  }
});