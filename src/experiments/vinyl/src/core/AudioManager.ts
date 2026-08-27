export interface AudioMetrics {
  bass: number;
  mids: number;
  highs: number;
}

export class AudioManager {
  private audioContext: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private dataArray: Uint8Array<ArrayBuffer> | null = null;
  private audioBuffer: AudioBuffer | null = null;
  private audioSource: AudioBufferSourceNode | null = null;
  
  private _isPlaying: boolean = false;
  private _isFileLoaded: boolean = false;
  private _currentFileName: string = '';
  private pauseOffset: number = 0;
  private startTime: number = 0;
  private _audioMetrics: AudioMetrics = { bass: 0, mids: 0, highs: 0 };
  private _delta: number = 0.016;
  private _onTrackEnd: (() => void) | null = null;

  constructor() {
  }

  public get isPlaying(): boolean {
    return this._isPlaying;
  }

  public get isFileLoaded(): boolean {
    return this._isFileLoaded;
  }

  public get currentFileName(): string {
    return this._currentFileName;
  }

  public get audioMetrics(): AudioMetrics {
    return { ...this._audioMetrics };
  }

  public get delta(): number {
    return this._delta;
  }

  public set delta(value: number) {
    this._delta = value;
  }

  public set onTrackEnd(callback: (() => void) | null) {
    this._onTrackEnd = callback;
  }

  public async resume(): Promise<void> {
    if (this.audioContext && this.audioContext.state === 'suspended') {
      await this.audioContext.resume();
    }
  }


  public async ensureAudioContext(): Promise<void> {
    if (this.audioContext) {
      if (this.audioContext.state === 'suspended') {
        await this.audioContext.resume();
      }
      return;
    }

    const AudioContextClass = window.AudioContext || 
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    
    if (!AudioContextClass) {
      throw new Error('Web Audio API is not supported in this browser');
    }

    this.audioContext = new AudioContextClass();
    this.analyser = this.audioContext.createAnalyser();
    this.analyser.fftSize = 256;
    this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);
  }

  public async loadAudioFromBuffer(arrayBuffer: ArrayBuffer, trackName?: string): Promise<AudioBuffer> {
    await this.ensureAudioContext();
    
    if (!this.audioContext) {
      throw new Error('Audio context could not be initialized');
    }

    this.stopAudio();

    try {
      const buffer = await this.audioContext.decodeAudioData(arrayBuffer);
      this.audioBuffer = buffer;
      this.pauseOffset = 0;
      this._isFileLoaded = true;
      this._currentFileName = trackName || 'Loaded Track';
      return buffer;
    } catch (error) {
      throw new Error('Failed to decode audio', { cause: error });
    }
  }

  public stopAudio(): void {
    if (this.audioSource) {
      try {
        this.audioSource.stop();
        this.audioSource.disconnect();
        this.audioSource.onended = null;
      } catch (_error) {
        // Ignore cleanup errors
      }
      this.audioSource = null;
    }

    if (this.analyser) {
      try {
        this.analyser.disconnect();
      } catch (_error) {
        // Ignore cleanup errors
      }
    }

    this._isPlaying = false;
  }

  public async playFile(): Promise<void> {
    if (!this.audioBuffer || !this.audioContext || !this.analyser) {
      throw new Error('Audio not ready');
    }

    if (this.audioContext.state === 'suspended') {
      await this.audioContext.resume();
    }

    this.stopAudio();

    try {
      this.audioSource = this.audioContext.createBufferSource();
      this.audioSource.buffer = this.audioBuffer;
      this.audioSource.connect(this.analyser);
      this.analyser.connect(this.audioContext.destination);
      this.audioSource.start(0, this.pauseOffset);
      this.startTime = this.audioContext.currentTime;
      this._isPlaying = true;

      this.audioSource.onended = () => {
        this._isPlaying = false;
        this.pauseOffset = 0;
        if (this._onTrackEnd) {
          this._onTrackEnd();
        }
      };
    } catch (error) {
      console.warn('Failed to play audio:', error instanceof Error ? error.message : error);
      this._isPlaying = false;
    }
  }

  public async togglePlayback(): Promise<boolean> {
    await this.ensureAudioContext();
    
    if (!this.audioContext) {
      return false;
    }

    if (this._isPlaying) {
      // Pause
      if (this.audioSource) {
        this.pauseOffset += this.audioContext.currentTime - this.startTime;
        this.audioSource.stop();
        this.audioSource.disconnect();
        this.audioSource = null;
      }
      this._isPlaying = false;
    } else {
      // Play
      if (this.audioBuffer) {
        if (this.pauseOffset >= this.audioBuffer.duration) {
          this.pauseOffset = 0;
        }
        await this.playFile();
      }
    }

    return this._isPlaying;
  }

  public updateAudioData(): void {
    if (!this.analyser || !this.dataArray) return;

    this.analyser.getByteFrequencyData(this.dataArray);

    let bassSum = 0;
    let midsSum = 0;
    let highsSum = 0;

    for (let i = 0; i < 10; i++) bassSum += this.dataArray[i];
    for (let i = 10; i < 50; i++) midsSum += this.dataArray[i];
    for (let i = 50; i < 100; i++) highsSum += this.dataArray[i];

    this._audioMetrics.bass = (bassSum / 10) / 255;
    this._audioMetrics.mids = (midsSum / 40) / 255;
    this._audioMetrics.highs = (highsSum / 50) / 255;
  }

  public dispose(): void {
    this.stopAudio();
    
    if (this.analyser) {
      try {
        this.analyser.disconnect();
      } catch (_error) {
        // Ignore cleanup errors
      }
      this.analyser = null;
    }
    
    if (this.audioContext) {
      try {
        this.audioContext.close();
      } catch (_error) {
        // Ignore cleanup errors
      }
      this.audioContext = null;
    }
    
    this._isPlaying = false;
    this._isFileLoaded = false;
    this.audioBuffer = null;
    this.dataArray = null;
  }
}