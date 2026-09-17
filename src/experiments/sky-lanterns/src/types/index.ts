import * as THREE from 'three';

export type CameraMode = 'orbit' | 'follow' | 'drone';

export type PaletteIndex = 0 | 1 | 2 | 3;
export type SwarmPaletteOption = 'random' | PaletteIndex;

export interface LanternPalette {
  id: PaletteIndex;
  name: string;
  primaryHex: string;
  glowColor: THREE.Color;
  emissiveIntensity: number;
}

export interface LanternInstanceData {
  id: number;
  position: THREE.Vector3;
  rotation: THREE.Euler;
  scale: number;
  speed: number;
  wobblePhase: number;
  color: THREE.Color;
  isHero?: boolean;
}

export interface WindConfig {
  angle: number;
  speed: number;
}

export interface EnvironmentConfig {
  fogDensity: number;
  starryNight: boolean;
  wind: WindConfig;
}

export interface TelemetryMetrics {
  fps: number;
  frameTimeMs: number;
  avgFps: number;
  low1PercentFps: number;
}
