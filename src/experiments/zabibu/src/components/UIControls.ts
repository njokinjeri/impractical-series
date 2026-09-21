import { PALETTES } from '../config/constants';
import { Branch } from './Branch';
import { Tendrils } from './Tendrils';
import { Grapes } from './Grapes';
import { PhysicsWorld } from '../utils/PhysicsWorld';

export class UIControls {
  private activePaletteIndex = 2;
  private branch: Branch;
  private tendrils: Tendrils;
  private grapes: Grapes;
  private physicsWorld: PhysicsWorld;
  private setBounciness: (val: number) => void;

  constructor(
    branch: Branch,
    tendrils: Tendrils,
    grapes: Grapes,
    physicsWorld: PhysicsWorld,
    setBounciness: (val: number) => void
  ) {
    this.branch = branch;
    this.tendrils = tendrils;
    this.grapes = grapes;
    this.physicsWorld = physicsWorld;
    this.setBounciness = setBounciness;

    this.setupUIControls();
  }

  public updateActivePalette(palette: typeof PALETTES[number]): void {
    this.branch.updatePalette(palette.mode, palette.stemBase, palette.stemHighlight);
    this.tendrils.updatePalette(palette);
    this.grapes.updatePalette(palette);

    const modeValLabel = document.getElementById('mode-val');
    if (modeValLabel) modeValLabel.innerText = palette.name;
  }

  private setupUIControls(): void {
    const collapseBtn = document.getElementById('btn-collapse');
    const uiPanel = document.getElementById('ui-panel');
    if (collapseBtn && uiPanel) {
      collapseBtn.addEventListener('click', () => {
        const isCollapsed = uiPanel.classList.toggle('collapsed');
        collapseBtn.textContent = isCollapsed ? '+' : '—';
      });
    }

    const colorBtn = document.getElementById('btn-toggle-color');
    if (colorBtn) {
      colorBtn.addEventListener('click', () => {
        this.activePaletteIndex = (this.activePaletteIndex + 1) % PALETTES.length;
        this.updateActivePalette(PALETTES[this.activePaletteIndex]);
      });
    }

    const hatchSlider = document.getElementById('slider-hatch') as HTMLInputElement;
    const hatchValLabel = document.getElementById('hatch-val');
    if (hatchSlider) {
      hatchSlider.addEventListener('input', (e) => {
        const val = parseFloat((e.target as HTMLInputElement).value);
        this.branch.woodMaterial.uniforms.uHatchScale.value = val;
        this.tendrils.tendrilMaterial.uniforms.uHatchScale.value = val;
        this.grapes.grapeMaterial.uniforms.uHatchScale.value = val;
        this.grapes.pedicelMaterial.uniforms.uHatchScale.value = val;
        if (hatchValLabel) hatchValLabel.innerText = val.toFixed(1);
      });
    }

    const bounceSlider = document.getElementById('slider-bounce') as HTMLInputElement;
    const bounceValLabel = document.getElementById('bounce-val');
    if (bounceSlider) {
      bounceSlider.addEventListener('input', (e) => {
        const val = parseFloat((e.target as HTMLInputElement).value);
        this.setBounciness(val);
        this.physicsWorld.setBounciness(val);
        if (bounceValLabel) bounceValLabel.innerText = val.toFixed(2);
      });
    }

    const resetBtn = document.getElementById('btn-reset');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        this.grapes.reset();
        this.updateActivePalette(PALETTES[this.activePaletteIndex]);
      });
    }
  }
}