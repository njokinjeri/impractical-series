import type { PaletteMode } from '../types/shader.types';

export class PaletteManager {
  private currentPalette: PaletteMode = 0;
  private onPaletteChange: (palette: PaletteMode) => void;

  constructor(onPaletteChange: (palette: PaletteMode) => void) {
    this.onPaletteChange = onPaletteChange;
    this.initListeners();
  }

  private initListeners(): void {
    const palMono = document.getElementById('pal-mono');
    const palCrimson = document.getElementById('pal-crimson');
    const palCyber = document.getElementById('pal-cyber');

    const setPalette = (mode: PaletteMode, activeBtn: HTMLElement) => {
      this.currentPalette = mode;
      [palMono, palCrimson, palCyber].forEach(b => b?.classList.remove('active'));
      activeBtn.classList.add('active');

      document.body.classList.remove('theme-mono', 'theme-crimson', 'theme-cyber');
      if (mode === 0) document.body.classList.add('theme-mono');
      else if (mode === 1) document.body.classList.add('theme-crimson');
      else if (mode === 2) document.body.classList.add('theme-cyber');

      this.onPaletteChange(mode);
    };

    if (palMono) palMono.addEventListener('click', () => setPalette(0, palMono));
    if (palCrimson) palCrimson.addEventListener('click', () => setPalette(1, palCrimson));
    if (palCyber) palCyber.addEventListener('click', () => setPalette(2, palCyber));
  }

  public getPalette(): PaletteMode {
    return this.currentPalette;
  }
}