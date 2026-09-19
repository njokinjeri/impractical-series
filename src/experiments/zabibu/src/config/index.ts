import * as THREE from 'three';
import type { BotanicalPalette, ClusterConfig } from '../types';

export const WOOD_BASE = 0x5c3d2e;
export const WOOD_HIGHLIGHT = 0x9c6f59;
export const TENDRIL_BASE = 0x54b925;
export const TENDRIL_HIGHLIGHT = 0xa1e85b;

export const PALETTES: BotanicalPalette[] = [
  { name: 'Vibrant Red', mode: 1.0, base: 0xc82333, highlight: 0xf17b88 },
  { name: 'Botanical Green', mode: 1.0, base: 0x54b925, highlight: 0xa1e85b },
  { name: 'Deep Purple', mode: 1.0, base: 0x4a154b, highlight: 0xa855f7 },
  { name: 'Charcoal & Ink', mode: 0.0, base: 0x1f1a17, highlight: 0x998877 },
];

export const DEFAULT_CONFIG: ClusterConfig = {
  berryCount: 45,
  clusterRadius: 1.2,
  clusterHeight: 3.5,
  hatchScale: 12.0,
  gravity: -9.81,
  palette: PALETTES[2],
};

export const BRANCH_CURVE_POINTS = [
  new THREE.Vector3(-2.5, 3.0, -0.5),
  new THREE.Vector3(-1.0, 2.5, 0.2),
  new THREE.Vector3(0.0, 2.0, 0.0),
  new THREE.Vector3(1.0, 1.8, -0.3),
  new THREE.Vector3(2.5, 2.2, 0.1),
];
