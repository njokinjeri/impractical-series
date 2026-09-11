import type { AudioBands } from '../types/state';

export class AudioAnalyzer {
  private ctx?: AudioContext;
  private analyser?: AnalyserNode;
  private dataArray?: Uint8Array;
  private source?: MediaElementAudioSourceNode;

  readonly audio: HTMLAudioElement;
  isPlaying = false;

  private smoothed: AudioBands = { average: 0, bass: 0, mid: 0, treble: 0 };

  constructor(src: string) {
    this.audio = new Audio();
    this.audio.crossOrigin = 'anonymous';
    this.audio.src = src;
  }

  private ensureContext() {
    if (this.ctx) return;
    const Ctx = window.AudioContext || (window as any).webkitAudioContext;
    this.ctx = new Ctx();
    this.analyser = this.ctx.createAnalyser();
    this.analyser.fftSize = 256;
    this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);

    this.source = this.ctx.createMediaElementSource(this.audio);
    this.source.connect(this.analyser);
    this.analyser.connect(this.ctx.destination);
  }

  async toggle() {
    this.ensureContext();
    if (this.ctx!.state === 'suspended') await this.ctx!.resume();

    if (!this.isPlaying) {
      await this.audio.play();
      this.isPlaying = true;
    } else {
      this.audio.pause();
      this.isPlaying = false;
    }
    return this.isPlaying;
  }

  async loadFile(file: File) {
    this.ensureContext();
    if (this.ctx!.state === 'suspended') await this.ctx!.resume();
    this.audio.src = URL.createObjectURL(file);
    await this.audio.play();
    this.isPlaying = true;
  }

  getBands(): AudioBands {
    if (!this.analyser || !this.dataArray || !this.isPlaying) {
      const a = 0.1;
      this.smoothed = {
        average: this.smoothed.average * (1 - a),
        bass: this.smoothed.bass * (1 - a),
        mid: this.smoothed.mid * (1 - a),
        treble: this.smoothed.treble * (1 - a),
      };
      return this.smoothed;
    }

    this.analyser.getByteFrequencyData(
      this.dataArray as Uint8Array<ArrayBuffer>
    );

    const n = this.dataArray.length;
    const third = Math.floor(n / 3);

    const avg = (a: number, b: number) => {
      let s = 0;
      for (let i = a; i < b; i++) s += this.dataArray![i];
      return s / ((b - a) * 255);
    };

    const target: AudioBands = {
      average: avg(0, n),
      bass: avg(0, third),
      mid: avg(third, third * 2),
      treble: avg(third * 2, n),
    };

    const a = 0.15;
    this.smoothed = {
      average:
        this.smoothed.average + (target.average - this.smoothed.average) * a,
      bass: this.smoothed.bass + (target.bass - this.smoothed.bass) * a,
      mid: this.smoothed.mid + (target.mid - this.smoothed.mid) * a,
      treble: this.smoothed.treble + (target.treble - this.smoothed.treble) * a,
    };
    return this.smoothed;
  }
}
