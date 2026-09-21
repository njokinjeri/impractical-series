import * as THREE from 'three';
import type { BotanicalPalette } from '../types';

export const PALETTES: BotanicalPalette[] = [
  { 
    name: 'Vibrant Red', 
    mode: 1.0, 
    base: 0xc82333, 
    highlight: 0xf17b88,
    stemBase: 0xa67449,   
    stemHighlight: 0xf2d8c2
  },
  { 
    name: 'Botanical Green', 
    mode: 1.0, 
    base: 0x54b925, 
    highlight: 0xa1e85b,
    stemBase: 0xa67449,   
    stemHighlight: 0xf2d8c2
  },
  { 
    name: 'Deep Purple', 
    mode: 1.0, 
    base: 0xae4fa4,
    highlight: 0xfce3fa,
    stemBase: 0xa67449,   
    stemHighlight: 0xf2d8c2
  },
  { 
    name: 'Charcoal', 
    mode: 0.0, 
    base: 0x1a0f0d, 
    highlight: 0x998877,
    stemBase: 0x222222,      
    stemHighlight: 0x666666 
  },
];

export const BOTANICAL_COLORS = {
  tendrilBase: 0x3a7d18,     
  tendrilHighlight: 0x8ce04a,
  inkOutline: 0x120507,    
};

export const DEFAULT_PHYSICS = {
  bounciness: 0.55,
  hatchScale: 3.0,
  grapeCount: 42,
};

export const MAIN_BRANCH_CURVE = new THREE.CatmullRomCurve3([
  new THREE.Vector3(-5.5, 2.3, -0.6),
  new THREE.Vector3(-2.8, 2.1, -0.3),
  new THREE.Vector3(-0.8, 1.9, -0.1),
  new THREE.Vector3(0.0, 1.6, 0.0),
  new THREE.Vector3(1.2, 1.8, -0.2),
  new THREE.Vector3(3.2, 2.2, -0.5),
  new THREE.Vector3(5.5, 2.5, -0.8),
]);

export const RACHIS_CURVE = new THREE.CatmullRomCurve3([
  new THREE.Vector3(0.0, 1.6, 0.0),
  new THREE.Vector3(0.05, 1.1, -0.02),
  new THREE.Vector3(-0.02, 0.5, 0.02),
  new THREE.Vector3(0.02, -0.1, 0.0),
  new THREE.Vector3(-0.01, -0.7, -0.03),
  new THREE.Vector3(0.0, -1.1, 0.0),
]);