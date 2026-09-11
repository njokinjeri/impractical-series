export type ShapeMode = 'cube' | 'star' | 'spiked';
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