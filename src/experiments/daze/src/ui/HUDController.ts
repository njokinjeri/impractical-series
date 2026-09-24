export class HUDController {
  private isCollapsed = false;
  private onSpeedChange: (speed: number) => void;
  private onGrainChange: (grain: number) => void;
  private onFullscreenToggle: () => void;

  private currentX = 15;
  private currentY = 25;
  private targetX = 15;
  private targetY = 25;
  private isAnimating = false;

  constructor(
    onSpeedChange: (speed: number) => void,
    onGrainChange: (grain: number) => void,
    onFullscreenToggle: () => void
  ) {
    this.onSpeedChange = onSpeedChange;
    this.onGrainChange = onGrainChange;
    this.onFullscreenToggle = onFullscreenToggle;
    this.initHUDControls();
    this.startCubeLoop();
  }

  private initHUDControls(): void {
    const speedSlider = document.getElementById(
      'slider-speed'
    ) as HTMLInputElement;
    if (speedSlider) {
      speedSlider.addEventListener('input', (e) => {
        this.onSpeedChange(parseFloat((e.target as HTMLInputElement).value));
      });
    }

    const grainSlider = document.getElementById(
      'slider-grain'
    ) as HTMLInputElement;
    if (grainSlider) {
      grainSlider.addEventListener('input', (e) => {
        this.onGrainChange(parseFloat((e.target as HTMLInputElement).value));
      });
    }

    const fsBtn = document.getElementById('btn-fullscreen');
    if (fsBtn) {
      fsBtn.addEventListener('click', () => {
        this.onFullscreenToggle();
      });
    }

    const toggleBtn = document.getElementById('btn-toggle-hud');
    const hudPanel = document.getElementById('hud-bottom-panel') as HTMLElement;
    const toggleLabel = document.getElementById('toggle-label');
    const toggleIcon = document.getElementById('toggle-icon') as HTMLElement;

    if (toggleBtn && hudPanel) {
      toggleBtn.addEventListener('click', () => {
        this.isCollapsed = !this.isCollapsed;
        if (this.isCollapsed) {
          hudPanel.style.maxHeight = '0px';
          hudPanel.style.paddingTop = '0px';
          hudPanel.style.paddingBottom = '0px';
          hudPanel.style.opacity = '0';
          hudPanel.style.borderWidth = '0px';
          if (toggleLabel) toggleLabel.innerText = 'EXPAND CONTROLS';
          if (toggleIcon) toggleIcon.style.transform = 'rotate(0deg)';
        } else {
          hudPanel.style.maxHeight = '250px';
          hudPanel.style.paddingTop = '0.75rem';
          hudPanel.style.paddingBottom = '0.75rem';
          hudPanel.style.opacity = '1';
          hudPanel.style.borderWidth = '1px';
          if (toggleLabel) toggleLabel.innerText = 'COLLAPSE CONTROLS';
          if (toggleIcon) toggleIcon.style.transform = 'rotate(180deg)';
        }
      });
    }
  }

  private startCubeLoop(): void {
    const renderLoop = () => {
      const cube = document.getElementById('nav-cube');
      if (cube) {
        if (!this.isAnimating) {
          this.targetY += 0.4;
          this.targetX += 0.15;
        }

        this.currentX += (this.targetX - this.currentX) * 0.1;
        this.currentY += (this.targetY - this.currentY) * 0.1;

        cube.style.transform = `rotateX(${this.currentX}deg) rotateY(${this.currentY}deg)`;
      }
      requestAnimationFrame(renderLoop);
    };
    requestAnimationFrame(renderLoop);
  }

  public updateShaderNav(
    index: number,
    title: string,
    patternName?: string,
    showPatternUI?: boolean
  ): void {
    const titleDisplay = document.getElementById('shader-title-display');
    if (titleDisplay) titleDisplay.innerText = title;

    this.isAnimating = true;
    this.targetX = index * 90 + 15;
    this.targetY = index * 120 + 180;

    setTimeout(() => {
      this.isAnimating = false;
    }, 800);

    const subtitle = document.getElementById('pattern-subtitle');
    if (subtitle) {
      if (showPatternUI) {
        subtitle.classList.remove('hidden');
      } else {
        subtitle.classList.add('hidden');
      }
    }

    document.querySelectorAll('#shader-buttons button').forEach((btn, idx) => {
      if (idx === index) btn.classList.add('active');
      else btn.classList.remove('active');
    });
  }

  public updatePatternDisplay(patternIndex: number, patternName: string): void {
    const formattedIdx = String(patternIndex + 1).padStart(2, '0');
    const indexDisplay = document.getElementById('pattern-index-display');
    const nameDisplay = document.getElementById('pattern-name-display');
    if (indexDisplay) indexDisplay.innerText = `[${formattedIdx}]`;
    if (nameDisplay) nameDisplay.innerText = patternName;
  }
}
