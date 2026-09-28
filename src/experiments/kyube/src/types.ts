import * as THREE from 'three';

export interface StonePlacement {
  x: number;
  y: number;
  z: number;
  w: number;
  h: number;
  d: number;
}

export interface RockPalette {
  rock: number;
  moss: number;
}

export interface CinematicView {
  zoom: number;
  rotX: number;
  rotY: number;
  coreIntensity: number;
  orbit: boolean;
}

export type CinematicViewKey = 'outside' | 'inside' | 'orbit';

export interface AnimatedRock {
  mesh: THREE.Group;
  rotSpeedX: number;
  rotSpeedY: number;
  floatPhase: number;
  floatSpeed: number;
  initialY: number;
}

export interface PlacedPosition {
  pos: THREE.Vector3;
  radius: number;
}

export interface AppState {
  targetZoom: number;
  currentZoom: number;
  targetRotX: number;
  targetRotY: number;
  targetCoreIntensity: number;
  isOrbitingMode: boolean;
  isExternalSunMode: boolean;
  showGas: boolean;
  showMoss: boolean;
  isDragging: boolean;
  prevX: number;
  prevY: number;
}