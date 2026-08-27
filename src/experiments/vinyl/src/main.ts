import { SceneManager } from './core/SceneManager';
import { AudioManager } from './core/AudioManager';
import { UIManager } from './utils/UIManager';
import { VinylRecord } from './components/VinylRecord';
import './style.css';

class AnisoApp {
  private sceneManager: SceneManager;
  private audioManager: AudioManager;
  private uiManager: UIManager;
  private vinylRecord: VinylRecord;
  private isRunning: boolean = true;

  constructor() {
    this.sceneManager = new SceneManager();
    this.audioManager = new AudioManager();
    this.vinylRecord = new VinylRecord(this.sceneManager.getScene());
    this.uiManager = new UIManager(this.vinylRecord, this.audioManager);

    this.audioManager.onTrackEnd = () => {
      this.uiManager.updateUI();
    };

    this.setupEventListeners();
    this.loadDefaultTrack();
    this.animate();

    document.addEventListener('click', () => {
      this.audioManager.resume();
    }, { once: true });
  }

  private async loadDefaultTrack(): Promise<void> {
    try {
      const response = await fetch('/I_Love_You_Baby.mp3');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const arrayBuffer = await response.arrayBuffer();
      
      await this.audioManager.loadAudioFromBuffer(arrayBuffer, 'Paul Anka - I Love You Baby');
      
      try {
        await this.audioManager.resume();
        this.audioManager.playFile();
        this.uiManager.updateUI();
      } catch {
        this.uiManager.updateUI();
      }
    } catch (error) {
      console.warn('Failed to load track:', error);
      this.uiManager.updateUI();
    }
  }

  private setupEventListeners(): void {
    window.addEventListener('resize', () => {
      this.sceneManager.onResize();
    });

    window.addEventListener('orientationchange', () => {
      setTimeout(() => {
        this.sceneManager.onResize();
      }, 200);
    });

    window.addEventListener('keydown', (event) => {
      if (event.code === 'Space' && !event.repeat) {
        event.preventDefault();
        this.uiManager.toggleAudio();
      }
      if (event.key === 'r' || event.key === 'R') {
        this.sceneManager.resetCamera();
        this.vinylRecord.resetRotation();
      }
    });
  }

  private animate(): void {
    if (!this.isRunning) return;

    requestAnimationFrame(() => this.animate());

    this.audioManager.updateAudioData();

    if (this.audioManager.isPlaying) {
      const metrics = this.audioManager.audioMetrics;
      const spinSpeed = 0.35 + (metrics.mids * 0.45);
      this.vinylRecord.updateRotation(spinSpeed, this.audioManager.delta);
    }

    this.sceneManager.render();
  }

  public dispose(): void {
    this.isRunning = false;
    this.audioManager.dispose();
    this.sceneManager.dispose();
    this.vinylRecord.dispose();
    this.uiManager.dispose();
  }
}

const app = new AnisoApp();

window.addEventListener('beforeunload', () => {
  app.dispose();
});

export default app;