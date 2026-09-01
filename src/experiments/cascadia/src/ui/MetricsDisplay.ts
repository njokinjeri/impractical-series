import type { Metrics } from '../utils/types';

export class MetricsDisplay {
  private totalEl: HTMLElement | null;
  private fallenEl: HTMLElement | null;
  private standingEl: HTMLElement | null;
  private rateEl: HTMLElement | null;

  constructor() {
    this.totalEl = document.getElementById('val-total');
    this.fallenEl = document.getElementById('val-fallen');
    this.standingEl = document.getElementById('val-standing');
    this.rateEl = document.getElementById('val-rate');
  }

  update(metrics: Metrics): void {
    if (this.totalEl) this.totalEl.textContent = metrics.total.toString();
    if (this.fallenEl) this.fallenEl.textContent = metrics.fallen.toString();
    if (this.standingEl) this.standingEl.textContent = metrics.standing.toString();
    if (this.rateEl) this.rateEl.textContent = `${metrics.rate}%`;
  }

  calculateMetrics(total: number, fallen: number): Metrics {
    const standing = total - fallen;
    const rate = total > 0 ? Math.round((fallen / total) * 100) : 0;
    return { total, fallen, standing, rate };
  }
}