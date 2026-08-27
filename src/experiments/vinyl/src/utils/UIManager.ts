import { VinylRecord, type RotationMode } from '../components/VinylRecord';
import { AudioManager } from '../core/AudioManager';

interface UIElements {
  playBtn: HTMLButtonElement;
  audioStatus: HTMLParagraphElement;
  speedSlider: HTMLInputElement;
  speedValue: HTMLSpanElement;
  fileInput: HTMLInputElement;
  fileLabel: HTMLLabelElement;
  collapseBtn: HTMLButtonElement;
  panelContent: HTMLDivElement;
  uiPanel: HTMLElement;
  editionButtons: NodeListOf<HTMLButtonElement>;
  modeButtons: NodeListOf<HTMLButtonElement>;
}

export class UIManager {
  private vinylRecord: VinylRecord;
  private audioManager: AudioManager;
  private elements: UIElements;
  private isCollapsed: boolean = false;
  private uiUpdateInterval: number | null = null;

  constructor(vinylRecord: VinylRecord, audioManager: AudioManager) {
    this.vinylRecord = vinylRecord;
    this.audioManager = audioManager;
    this.elements = this.getUIElements();
    this.setupEventListeners();
    this.setupModeButtons();
    this.uiUpdateInterval = window.setInterval(() => {
      this.updateUI();
    }, 500);
  }

  private getUIElements(): UIElements {
    const getElement = <T extends HTMLElement>(selector: string): T => {
      const el = document.querySelector(selector);
      if (!el) {
        throw new Error(`Element "${selector}" not found`);
      }
      return el as T;
    };

    return {
      playBtn: getElement<HTMLButtonElement>('#play-btn'),
      audioStatus: getElement<HTMLParagraphElement>('#audio-status'),
      speedSlider: getElement<HTMLInputElement>('#speed-slider'),
      speedValue: getElement<HTMLSpanElement>('#speed-val'),
      fileInput: getElement<HTMLInputElement>('#file-input'),
      fileLabel: getElement<HTMLLabelElement>('.file-upload-btn'),
      collapseBtn: getElement<HTMLButtonElement>('#collapse-btn'),
      panelContent: getElement<HTMLDivElement>('#panel-content'),
      uiPanel: getElement<HTMLElement>('#ui-panel'),
      editionButtons:
        document.querySelectorAll<HTMLButtonElement>('.edition-btn'),
      modeButtons: document.querySelectorAll<HTMLButtonElement>('.mode-btn'),
    };
  }

  private setupModeButtons(): void {
    this.elements.modeButtons.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const mode = btn.dataset.mode as RotationMode;
        if (mode) {
          this.elements.modeButtons.forEach((b) =>
            b.classList.remove('active')
          );
          btn.classList.add('active');
          this.vinylRecord.setRotationMode(mode);
        }
      });
    });
  }

  private setupEventListeners(): void {
    this.elements.editionButtons.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const type = parseInt(btn.dataset.type || '0');
        this.setEdition(type, btn);
      });
    });

    this.elements.playBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.toggleAudio();
    });

    this.elements.speedSlider.addEventListener('input', (e) => {
      e.stopPropagation();
      const target = e.target as HTMLInputElement;
      const value = parseFloat(target.value);
      this.elements.speedValue.textContent = value.toFixed(1) + 'x';
      this.vinylRecord.setSpeedMultiplier(value);
    });

    this.elements.fileInput.addEventListener('change', async (e) => {
      e.stopPropagation();
      const target = e.target as HTMLInputElement;
      const file = target.files?.[0];
      if (!file) return;

      try {
        const arrayBuffer = await file.arrayBuffer();
        await this.audioManager.loadAudioFromBuffer(arrayBuffer, file.name);
        this.audioManager.playFile();
        this.updateUI();
      } catch (error) {
        console.error('Error loading audio:', error);
        this.elements.audioStatus.textContent = 'Error loading file';
      }
      target.value = '';
    });

    this.elements.collapseBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.toggleCollapse();
    });

    document.addEventListener('keydown', (e) => {
      if (e.code === 'Space' && !e.repeat) {
        e.preventDefault();
        this.toggleAudio();
      }
    });
  }

  private setEdition(type: number, button: HTMLButtonElement): void {
    this.elements.editionButtons.forEach((btn) => {
      btn.classList.remove('active');
    });
    button.classList.add('active');

    const editionMap: Record<number, string> = {
      0: 'frosted',
      1: 'mercury',
      2: 'cobalt',
      3: 'onyx',
    };

    const editionKey = editionMap[type] || 'frosted';
    this.vinylRecord.setEdition(editionKey);
  }

  public toggleAudio(): void {
    this.audioManager.togglePlayback();
    this.updateUI();
  }

  public toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
    this.elements.uiPanel.classList.toggle('collapsed');
    this.elements.collapseBtn.textContent = this.isCollapsed ? '+' : '−';
    this.elements.collapseBtn.classList.toggle('collapsed', this.isCollapsed);
    this.elements.collapseBtn.setAttribute(
      'aria-expanded',
      String(!this.isCollapsed)
    );
  }

  public updateUI(): void {
    const isPlaying = this.audioManager.isPlaying;
    const fileName = this.audioManager.currentFileName;
    const isFileLoaded = this.audioManager.isFileLoaded;

    this.elements.playBtn.textContent = isPlaying ? 'Pause' : 'Play';

    if (!isFileLoaded) {
      this.elements.audioStatus.textContent = 'Loading...';
    } else if (fileName && isPlaying) {
      this.elements.audioStatus.textContent = `♫ ${fileName}`;
    } else if (fileName && !isPlaying) {
      this.elements.audioStatus.textContent = `⏸ ${fileName}`;
    } else {
      this.elements.audioStatus.textContent = 'No audio loaded';
    }
  }

  public dispose(): void {
    if (this.uiUpdateInterval) {
      clearInterval(this.uiUpdateInterval);
      this.uiUpdateInterval = null;
    }
  }
}
