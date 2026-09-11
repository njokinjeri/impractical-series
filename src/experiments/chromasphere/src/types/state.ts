export type ShapeMode = 'cluster' | 'ribbon' | 'spiked' | 'icosa';
export type MaterialPreset = 'clear' | 'frosted' | 'iridescent';
export type ColorMode = 'dark' | 'light';

export interface VisualizerState {
  shape: ShapeMode;
  material: MaterialPreset;
  colorMode: ColorMode;
}

export interface AudioBands {
  average: number;
  bass: number;
  mid: number;
  treble: number;
}