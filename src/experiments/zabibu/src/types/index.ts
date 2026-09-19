import * as THREE from 'three';

export interface BotanicalPalette {
  name: string;
  mode: number;
  base: number;
  highlight: number;
}

export interface InkHatchUniforms {
  uPaperColor: { value: THREE.Color };
  uInkColor: { value: THREE.Color };
  uBaseColor: { value: THREE.Color };
  uHighlightColor: { value: THREE.Color };
  uColorMode: { value: number };
  uHatchScale: { value: number };
  uLightDirection: { value: THREE.Vector3 };
  uResolution: { value: THREE.Vector2 };
}

export interface ClusterConfig {
  berryCount: number;
  clusterRadius: number;
  clusterHeight: number;
  hatchScale: number;
  gravity: number;
  palette: BotanicalPalette;
}

export interface GrapeData {
  id: string;
  mesh: THREE.Mesh;
  pedicelMesh?: THREE.Line;
  attachPoint: THREE.Vector3;
  isDetached: boolean;
  rigidBodyHandle?: any;
}
