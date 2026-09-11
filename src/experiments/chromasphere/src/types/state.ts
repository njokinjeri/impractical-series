import type * as THREE from 'three';

export type ShapeMode = 'cluster' | 'ribbon' | 'spiked';
export type MaterialPreset = 'clear' | 'frosted' | 'iridescent';
export type ColorMode = 'dark' | 'light';

export interface Palette {
  dark: THREE.Color;
  mid: THREE.Color;
  pastel: THREE.Color;
}
export interface MaterialSpec {
  roughness: number;
  transmission: number;
  ior: number;
  reflectivity: number;
  iridescence?: number;
  iridescenceIOR?: number;
}

export interface VisualizerState {
  shape: ShapeMode;
  material: MaterialPreset;
  colorMode: ColorMode;
  paletteIndex: number;
}

export interface AudioBands {
  average: number;
  bass: number;
  mid: number;
  treble: number;
}
