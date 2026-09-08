import { App } from '../core/App';
import type { UIState } from '../utils/types';
import { Confetti } from '../utils/Confetti';

export class UIManager {
  private state: UIState = {
    isControlsCollapsed: false,
    isDescriptionExpanded: true,
    isSoundEnabled: true,
  };

  private pushButton: HTMLButtonElement | null = null;
  private resetButton: HTMLButtonElement | null = null;
  private confetti: Confetti | null = null;
  private previousRate: number = 0;
  private celebrationTriggered: boolean = false;
  private isComplete: boolean = false;
  private isPushed: boolean = false;

  constructor() {
    this.setupToggleHandlers();
    this.confetti = new Confetti();
    this.setupResetButton();
  }

  private setupToggleHandlers(): void {
    const header = document.querySelector('.controls-header');
    if (header) {
      header.addEventListener('click', () => {
        this.toggleControls();
      });
    }
  }

  private setupResetButton(): void {
    this.resetButton = document.getElementById('btn-reset-central') as HTMLButtonElement;
    if (this.resetButton) {
      this.resetButton.addEventListener('click', () => {
        const app = (window as any).app;
        if (app) {
          app.rebuild();
          this.hideResetButton();
          this.enablePushButton();
          this.resetCelebrationState();
          this.stopConfetti();
          this.isComplete = false;
          this.isPushed = false;
        }
      });
    }
  }

  private showResetButton(): void {
    if (this.resetButton) {
      this.resetButton.style.display = 'flex';
      void this.resetButton.offsetWidth;
      this.resetButton.classList.add('visible');
    }
  }

  private hideResetButton(): void {
    if (this.resetButton) {
      this.resetButton.classList.remove('visible');
      setTimeout(() => {
        if (this.resetButton) {
          this.resetButton.style.display = 'none';
        }
      }, 400);
    }
  }

  private stopConfetti(): void {
    if (this.confetti) {
      this.confetti.stop();
    }
  }

  toggleControls(): void {
    this.state.isControlsCollapsed = !this.state.isControlsCollapsed;

    const content = document.getElementById('controlsContent');
    const icon = document.getElementById('toggleIcon');

    if (content) {
      if (this.state.isControlsCollapsed) {
        content.classList.add('collapsed');
      } else {
        content.classList.remove('collapsed');
      }
    }

    if (icon) {
      if (this.state.isControlsCollapsed) {
        icon.classList.add('collapsed');
      } else {
        icon.classList.remove('collapsed');
      }
    }
  }

  showTwoDirectionNotification(): void {
    const notification = document.createElement('div');
    notification.className = 'notification-toast';
    notification.innerHTML = `
      <div class="title">Two-Directional Cascade Detected</div>
      <div class="subtitle">Camera switched to Free Orbit for better viewing</div>
    `;

    document.body.appendChild(notification);

    requestAnimationFrame(() => {
      notification.classList.add('visible');
    });

    setTimeout(() => {
      notification.classList.remove('visible');
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 500);
    }, 4000);
  }

  bindEvents(app: App): void {
    const soundCheckbox = document.getElementById('chk-sound') as HTMLInputElement;
    if (soundCheckbox) {
      soundCheckbox.addEventListener('change', (e) => {
        const checked = (e.target as HTMLInputElement).checked;
        this.state.isSoundEnabled = checked;
        app.setConfig('soundEnabled', checked);
      });
    }

    const themeSelect = document.getElementById('select-theme') as HTMLSelectElement;
    if (themeSelect) {
      themeSelect.addEventListener('change', (e) => {
        const value = (e.target as HTMLSelectElement).value;
        app.setConfig('theme', value);
        app.rebuild();
        this.enablePushButton();
        this.resetCelebrationState();
        this.stopConfetti();
        this.hideResetButton();
        this.isComplete = false;
        this.isPushed = false;
      });
    }

    const pathSelect = document.getElementById('select-path') as HTMLSelectElement;
    if (pathSelect) {
      pathSelect.addEventListener('change', (e) => {
        const value = (e.target as HTMLSelectElement).value;
        app.setConfig('pathType', value);
        app.rebuild();
        this.enablePushButton();
        this.resetCelebrationState();
        this.stopConfetti();
        this.hideResetButton();
        this.isComplete = false;
        this.isPushed = false;
      });
    }

    const followToggle = document.getElementById('chk-follow') as HTMLInputElement;
    if (followToggle) {
      followToggle.addEventListener('change', (e) => {
        const checked = (e.target as HTMLInputElement).checked;
        app.setConfig('followEnabled', checked);
        if (!checked) {
          app.setConfig('cameraMode', 'free');
          const cameraSelect = document.getElementById('select-camera') as HTMLSelectElement;
          if (cameraSelect) {
            cameraSelect.value = 'free';
          }
          app.updateCamera();
        } else {
          app.setConfig('cameraMode', 'follow');
          const cameraSelect = document.getElementById('select-camera') as HTMLSelectElement;
          if (cameraSelect) {
            cameraSelect.value = 'follow';
          }
          app.updateCamera();
        }
      });
    }

    const cameraSelect = document.getElementById('select-camera') as HTMLSelectElement;
    if (cameraSelect) {
      cameraSelect.addEventListener('change', (e) => {
        const value = (e.target as HTMLSelectElement).value;
        app.setConfig('cameraMode', value);

        const followToggle = document.getElementById('chk-follow') as HTMLInputElement;
        if (followToggle) {
          if (value === 'follow') {
            followToggle.checked = true;
            app.setConfig('followEnabled', true);
          } else {
            followToggle.checked = false;
            app.setConfig('followEnabled', false);
          }
        }

        app.updateCamera();
      });
    }

    const countSlider = document.getElementById('range-count') as HTMLInputElement;
    const countLabel = document.getElementById('lbl-count');
    if (countSlider && countLabel) {
      countSlider.addEventListener('input', (e) => {
        const value = parseInt((e.target as HTMLInputElement).value, 10);
        countLabel.textContent = value.toString();
        app.setConfig('count', value);
        app.rebuild();
        this.enablePushButton();
        this.resetCelebrationState();
        this.stopConfetti();
        this.hideResetButton();
        this.isComplete = false;
        this.isPushed = false;
      });
    }

    this.pushButton = document.getElementById('btn-push') as HTMLButtonElement;
    if (this.pushButton) {
      this.pushButton.addEventListener('click', () => {
        if (this.isComplete || this.pushButton?.disabled || this.isPushed) return;

        app.pushDominoAtIndex(0);
        this.disablePushButton();
        this.isPushed = true;
        this.resetCelebrationState();
        this.stopConfetti();
      });
    }

    const previewBtn = document.getElementById('btn-preview');
    if (previewBtn) {
      previewBtn.addEventListener('click', () => {
        app.triggerPathPreview();
      });
    }

    const resetBtn = document.getElementById('btn-reset');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        app.rebuild();
        this.enablePushButton();
        this.resetCelebrationState();
        this.stopConfetti();
        this.hideResetButton();
        this.isComplete = false;
        this.isPushed = false;
      });
    }
  }

  disablePushButton(): void {
    if (this.pushButton) {
      this.pushButton.disabled = true;
      this.pushButton.style.opacity = '0.5';
      this.pushButton.style.cursor = 'not-allowed';
    }
  }

  enablePushButton(): void {
    if (this.pushButton) {
      this.pushButton.disabled = false;
      this.pushButton.style.opacity = '1';
      this.pushButton.style.cursor = 'pointer';
    }
  }

  resetCelebrationState(): void {
    this.celebrationTriggered = false;
    this.previousRate = 0;
  }

  updateTheme(theme: string): void {
    document.body.setAttribute('data-theme', theme);
    const themeSelect = document.getElementById('select-theme') as HTMLSelectElement;
    if (themeSelect) {
      themeSelect.value = theme;
    }
  }

  updateMetrics(total: number, fallen: number): void {
    const standing = total - fallen;
    const rate = total > 0 ? Math.round((fallen / total) * 100) : 0;

    const totalEl = document.getElementById('val-total');
    const fallenEl = document.getElementById('val-fallen');
    const standingEl = document.getElementById('val-standing');
    const rateEl = document.getElementById('val-rate');

    if (totalEl) totalEl.textContent = total.toString();
    if (fallenEl) fallenEl.textContent = fallen.toString();
    if (standingEl) standingEl.textContent = standing.toString();
    if (rateEl) rateEl.textContent = `${rate}%`;

    if (standing === 0 && total > 0 && !this.celebrationTriggered) {
      const app = (window as any).app;
      if (app && app.dominoChain) {
        const newlyFallen = app.dominoChain.forceCheckFallen();
        if (newlyFallen > 0) {
          const updatedFallen = app.dominoChain.getFallenCount();
          const updatedStanding = total - updatedFallen;
          if (updatedStanding > 0) {
            if (standingEl) standingEl.textContent = updatedStanding.toString();
            return;
          }
        }
      }

      this.celebrationTriggered = true;
      this.isComplete = true;
      this.triggerCelebration();
      this.showResetButton();
      this.disablePushButton();
    }

    this.previousRate = rate;

    if (!this.isComplete && !this.isPushed && standing > 0 && total > 0) {
      this.enablePushButton();
    }
  }

  private triggerCelebration(): void {
    setTimeout(() => {
      if (!this.confetti) {
        this.confetti = new Confetti();
      }

      this.confetti.fire(200);

      setTimeout(() => {
        if (this.confetti) {
          this.confetti.fire(150);
        }
      }, 500);

      setTimeout(() => {
        if (this.confetti) {
          this.confetti.fire(100);
        }
      }, 1000);

      const rateEl = document.getElementById('val-rate');
      if (rateEl) {
        rateEl.style.transition = 'transform 0.3s ease, color 0.3s ease';
        rateEl.style.transform = 'scale(1.5)';
        rateEl.style.color = '#ffd700';
        setTimeout(() => {
          if (rateEl) {
            rateEl.style.transform = 'scale(1)';
            rateEl.style.color = '';
          }
        }, 1500);
      }
    }, 500);
  }

  getState(): UIState {
    return { ...this.state };
  }

  dispose(): void {
    if (this.confetti) {
      this.confetti.dispose();
      this.confetti = null;
    }
  }
}