export interface Vector3 {
  x: number;
  y: number;
  z: number;
}

export type Theme = 'blueprint' | 'obsidian' | 'pastel';
export type PathType = 'figure8' | 'wave' | 'circle' | 'line';
export type CameraMode = 'follow' | 'top' | 'free';

export interface AppConfig {
  theme: Theme;
  pathType: PathType;
  count: number;
  cameraMode: CameraMode;
  soundEnabled: boolean;
  followEnabled: boolean;
}

export interface FallEvent {
  index: number;
  position: Vector3;
  timestamp: number;
}

export interface AudioConfig {
  enabled: boolean;
  volume: number;
}

export interface Metrics {
  total: number;
  fallen: number;
  standing: number;
  rate: number;
}

export interface UIState {
  isControlsCollapsed: boolean;
  isDescriptionExpanded: boolean;
  isSoundEnabled: boolean;
}
