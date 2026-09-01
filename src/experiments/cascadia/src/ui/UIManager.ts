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
  private confetti: Confetti | null = null;
  private previousRate: number = 0;
  private celebrationTriggered: boolean = false;  // ← NEW: Track if celebration already fired

  constructor() {
    this.setupToggleHandlers();
    this.confetti = new Confetti();
  }

  private setupToggleHandlers(): void {
    const header = document.querySelector('.controls-header');
    if (header) {
      header.addEventListener('click', () => {
        this.toggleControls();
      });
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

  // Add this method to UIManager
showTwoDirectionNotification(): void {
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    bottom: 80px;
    left: 50%;
    transform: translateX(-50%);
    background: var(--color-surface);
    backdrop-filter: blur(12px);
    border: 1px solid var(--color-accent);
    padding: 12px 24px;
    border-radius: 12px;
    font-family: var(--font-family-primary);
    font-size: 14px;
    color: var(--color-text-primary);
    z-index: 100;
    text-align: center;
    box-shadow: 0 8px 32px var(--color-shadow-heavy);
    opacity: 0;
    transition: opacity 0.5s ease;
    max-width: 90%;
  `;
  notification.innerHTML = `
    <div style="font-size: 24px; margin-bottom: 4px;">🔄</div>
    <div style="font-weight: 600;">Two-Directional Cascade Detected</div>
    <div style="font-size: 12px; color: var(--color-text-secondary); margin-top: 4px;">
      Camera switched to Free Orbit for better viewing
    </div>
  `;
  
  document.body.appendChild(notification);
  
  requestAnimationFrame(() => {
    notification.style.opacity = '1';
  });
  
  setTimeout(() => {
    notification.style.opacity = '0';
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 500);
  }, 4000);
}

  bindEvents(app: App): void {
    // Sound toggle
    const soundCheckbox = document.getElementById('chk-sound') as HTMLInputElement;
    if (soundCheckbox) {
      soundCheckbox.addEventListener('change', (e) => {
        const checked = (e.target as HTMLInputElement).checked;
        this.state.isSoundEnabled = checked;
        app.setConfig('soundEnabled', checked);
      });
    }

    // Theme selector
    const themeSelect = document.getElementById('select-theme') as HTMLSelectElement;
    if (themeSelect) {
      themeSelect.addEventListener('change', (e) => {
        const value = (e.target as HTMLSelectElement).value;
        app.setConfig('theme', value);
        app.rebuild();
        this.enablePushButton();
        this.resetCelebrationState();  // ← Reset on rebuild
      });
    }

    // Path selector
    const pathSelect = document.getElementById('select-path') as HTMLSelectElement;
    if (pathSelect) {
      pathSelect.addEventListener('change', (e) => {
        const value = (e.target as HTMLSelectElement).value;
        app.setConfig('pathType', value);
        app.rebuild();
        this.enablePushButton();
        this.resetCelebrationState();  // ← Reset on rebuild
      });
    }

    // Camera Follow Toggle
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

    // Camera selector
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

    // Count slider
    const countSlider = document.getElementById('range-count') as HTMLInputElement;
    const countLabel = document.getElementById('lbl-count');
    if (countSlider && countLabel) {
      countSlider.addEventListener('input', (e) => {
        const value = parseInt((e.target as HTMLInputElement).value, 10);
        countLabel.textContent = value.toString();
        app.setConfig('count', value);
        app.rebuild();
        this.enablePushButton();
        this.resetCelebrationState();  // ← Reset on rebuild
      });
    }

    // Push button
    this.pushButton = document.getElementById('btn-push') as HTMLButtonElement;
    if (this.pushButton) {
      this.pushButton.addEventListener('click', () => {
        app.pushDominoAtIndex(0);
        this.disablePushButton();
        this.resetCelebrationState();  // ← Reset when starting a new cascade
      });
    }

    // Preview button
    const previewBtn = document.getElementById('btn-preview');
    if (previewBtn) {
      previewBtn.addEventListener('click', () => {
        app.triggerPathPreview();
      });
    }

    // Reset button
    const resetBtn = document.getElementById('btn-reset');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        app.rebuild();
        this.enablePushButton();
        this.resetCelebrationState();  // ← Reset on rebuild
        // Clear any confetti
        if (this.confetti) {
          this.confetti.dispose();
          this.confetti = new Confetti();
        }
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

  // ← NEW: Reset celebration state
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

    // ← FIX: Only trigger when ALL dominoes have fallen AND we haven't already triggered
    if (fallen === total && total > 0 && !this.celebrationTriggered) {
      this.celebrationTriggered = true;  // ← Set immediately to prevent multiple triggers
      this.triggerCelebration();
    }
    
    this.previousRate = rate;

    // Re-enable push button if all dominoes have fallen
    if (fallen >= total && total > 0) {
      this.enablePushButton();
    }
  }

  private triggerCelebration(): void {
    // Wait a moment for the last domino to settle before celebrating
    setTimeout(() => {
      if (!this.confetti) {
        this.confetti = new Confetti();
      }
      
      // Fire multiple bursts
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
      
      // Flash the success rate
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
    }, 500);  // ← Wait 500ms for physics to settle
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