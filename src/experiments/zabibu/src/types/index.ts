import * as THREE from 'three';
import RAPIER from '@dimforge/rapier3d-compat';

export interface BotanicalPalette {
  name: string;
  mode: number;
  base: number;
  highlight: number;
  stemBase: number;
  stemHighlight: number;
}

export interface AppConfig {
  colorPaletteIndex: number;
  hatchDensity: number;
  berryBounciness: number;
  grapeCount: number;
}

export interface GrapeItem {
  mesh: THREE.Mesh;
  pedicelMesh: THREE.Mesh;
  isDetached: boolean;
  body: RAPIER.RigidBody | null;
  collider: RAPIER.Collider | null;
}