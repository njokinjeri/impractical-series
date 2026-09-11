import * as THREE from 'three';
import type { MaterialPreset, ColorMode } from '../../types/state';

interface PresetConfig {
  color: number;
  roughness: number;
  transmission: number;
  ior: number;
  reflectivity: number;
  metalness: number;
  clearcoat: number;
  clearcoatRoughness: number;
  iridescence: number;
  iridescenceIOR: number;
  thickness: number;
  sheen: number;
  sheenColor: number;
}

const DARK_PRESETS: Record<MaterialPreset, PresetConfig> = {
  clear: {
    color: 0xf0f5ff,
    roughness: 0.02,
    transmission: 0.98,
    ior: 1.5,
    reflectivity: 0.65,
    metalness: 0.0,
    clearcoat: 0.8,
    clearcoatRoughness: 0.02,
    iridescence: 0.0,
    iridescenceIOR: 1.3,
    thickness: 1.0,
    sheen: 0.0,
    sheenColor: 0xffffff,
  },
  frosted: {
    color: 0xc8d0dd,
    roughness: 0.75,
    transmission: 0.8,
    ior: 1.3,
    reflectivity: 0.25,
    metalness: 0.0,
    clearcoat: 0.1,
    clearcoatRoughness: 0.6,
    iridescence: 0.0,
    iridescenceIOR: 1.3,
    thickness: 2.2,
    sheen: 0.8,
    sheenColor: 0xb8c4d8,
  },
  iridescent: {
    color: 0xdcc8ff,
    roughness: 0.05,
    transmission: 0.85,
    ior: 1.7,
    reflectivity: 0.85,
    metalness: 0.0,
    clearcoat: 0.6,
    clearcoatRoughness: 0.05,
    iridescence: 1.0,
    iridescenceIOR: 2.0,
    thickness: 1.5,
    sheen: 0.0,
    sheenColor: 0xffffff,
  },
};

const LIGHT_PRESETS: Record<MaterialPreset, PresetConfig> = {
  clear: {
    color: 0xe6f0ff,
    roughness: 0.02,
    transmission: 0.98,
    ior: 1.5,
    reflectivity: 0.7,
    metalness: 0.0,
    clearcoat: 0.8,
    clearcoatRoughness: 0.02,
    iridescence: 0.0,
    iridescenceIOR: 1.3,
    thickness: 1.0,
    sheen: 0.0,
    sheenColor: 0xffffff,
  },
  frosted: {
    color: 0x9fb0c4,
    roughness: 0.85,
    transmission: 0.55,
    ior: 1.25,
    reflectivity: 0.15,
    metalness: 0.0,
    clearcoat: 0.05,
    clearcoatRoughness: 0.7,
    iridescence: 0.0,
    iridescenceIOR: 1.3,
    thickness: 3.0,
    sheen: 1.0,
    sheenColor: 0xdde6f2,
  },

  iridescent: {
    color: 0xd8c4ff,
    roughness: 0.05,
    transmission: 0.85,
    ior: 1.75,
    reflectivity: 0.9,
    metalness: 0.0,
    clearcoat: 0.6,
    clearcoatRoughness: 0.05,
    iridescence: 1.0,
    iridescenceIOR: 2.2,
    thickness: 1.5,
    sheen: 0.0,
    sheenColor: 0xffffff,
  },
};

export class MaterialManager {
  readonly glass: THREE.MeshPhysicalMaterial;

  private preset: MaterialPreset = 'clear';
  private mode: ColorMode = 'dark';

  constructor(mode: ColorMode = 'dark') {
    this.mode = mode;
    const cfg = this.table()[this.preset];
    this.glass = this.buildMaterial(cfg);
  }

  private table(): Record<MaterialPreset, PresetConfig> {
    return this.mode === 'dark' ? DARK_PRESETS : LIGHT_PRESETS;
  }

  private buildMaterial(cfg: PresetConfig): THREE.MeshPhysicalMaterial {
    return new THREE.MeshPhysicalMaterial({
      color: cfg.color,
      roughness: cfg.roughness,
      transmission: cfg.transmission,
      ior: cfg.ior,
      reflectivity: cfg.reflectivity,
      metalness: cfg.metalness,
      clearcoat: cfg.clearcoat,
      clearcoatRoughness: cfg.clearcoatRoughness,
      iridescence: cfg.iridescence,
      iridescenceIOR: cfg.iridescenceIOR,
      thickness: cfg.thickness,
      sheen: cfg.sheen,
      sheenColor: cfg.sheenColor,
      transparent: true,
      depthWrite: false,
    });
  }

  setPreset(preset: MaterialPreset) {
    this.preset = preset;
    this.apply();
  }

  setMode(mode: ColorMode) {
    this.mode = mode;
    this.apply();
  }

  setDepthWrite(enable: boolean) {
    this.glass.depthWrite = enable;
    this.glass.needsUpdate = true;
  }

  private apply() {
    const cfg = this.table()[this.preset];
    this.glass.color.setHex(cfg.color);
    this.glass.roughness = cfg.roughness;
    this.glass.transmission = cfg.transmission;
    this.glass.ior = cfg.ior;
    this.glass.reflectivity = cfg.reflectivity;
    this.glass.metalness = cfg.metalness;
    this.glass.clearcoat = cfg.clearcoat;
    this.glass.clearcoatRoughness = cfg.clearcoatRoughness;
    this.glass.iridescence = cfg.iridescence;
    this.glass.iridescenceIOR = cfg.iridescenceIOR;
    this.glass.thickness = cfg.thickness;
    this.glass.sheen = cfg.sheen;
    this.glass.sheenColor.setHex(cfg.sheenColor);
    this.glass.needsUpdate = true;
  }
}
