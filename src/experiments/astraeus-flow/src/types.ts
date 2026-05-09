import * as THREE from 'three';

export interface SceneConfig {
  particleCount: number;
  idleSpeed: number;
  explosionForce: number;
  collapseSpeed: number;
  noiseScale: number;
  maxExpansion: number;
}

export interface InteractionState {
  mouse: THREE.Vector3;
  isActive: boolean;
}