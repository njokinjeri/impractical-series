import { PENTATONIC_SCALE } from '../config';

export class AudioManager {
  private ctx: AudioContext | null = null;
  private enabled: boolean = true;

  setEnabled(enabled: boolean): void {
    this.enabled = enabled;
  }

  init(): void {
    if (!this.ctx) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) {
        this.ctx = new AudioContextClass();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playImpact(index: number, pan: number = 0): void {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const panner = this.ctx.createStereoPanner ? this.ctx.createStereoPanner() : null;

      const basePitch = PENTATONIC_SCALE[index % PENTATONIC_SCALE.length];
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(basePitch, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(basePitch * 0.35, this.ctx.currentTime + 0.07);

      gain.gain.setValueAtTime(0.35, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.07);

      if (panner) {
        panner.pan.value = Math.max(-1, Math.min(1, pan));
        osc.connect(gain);
        gain.connect(panner);
        panner.connect(this.ctx.destination);
      } else {
        osc.connect(gain);
        gain.connect(this.ctx.destination);
      }

      osc.start();
      osc.stop(this.ctx.currentTime + 0.08);
    } catch {
      // Silently fail if audio can't play
    }
  }

  dispose(): void {
    if (this.ctx) {
      this.ctx.close();
      this.ctx = null;
    }
  }
}