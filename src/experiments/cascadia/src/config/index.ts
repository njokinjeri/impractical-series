import type { AppConfig } from '../utils/types';

export const DEFAULT_CONFIG: AppConfig = {
  theme: 'pastel',
  pathType: 'circle',
  count: 100,
  cameraMode: 'follow',
  soundEnabled: true,
  followEnabled: true,
};

export const SLIM_PROFILE = {
  w: 0.4,
  h: 2.0,
  d: 0.15,
  mass: 1.8,
};

export const PATH_SPACING: Record<string, number> = {
  figure8: 0.2,
  wave: 0.16,
  circle: 0.3,
  line: 0.35,
};

export const PASTEL_COLORS = [0xff70a6, 0x70d6ff, 0xffd670, 0xb8c0ff];

export const PENTATONIC_SCALE = [
  261.63, 293.66, 329.63, 392.0, 440.0, 523.25, 587.33, 659.25, 783.99,
];
