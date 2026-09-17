import * as THREE from 'three';
import type { LanternPalette, EnvironmentConfig } from '../types/index';

export const LANTERN_PALETTES: Record<number, LanternPalette> = {
  0: {
    id: 0,
    name: 'Warm Amber',
    primaryHex: '#fb8500',
    glowColor: new THREE.Color('#ffb703'),
    emissiveIntensity: 2.2,
  },
  1: {
    id: 1,
    name: 'Teal Blue',
    primaryHex: '#00e5ff',
    glowColor: new THREE.Color('#0284c7'),
    emissiveIntensity: 1.9,
  },
  2: {
    id: 2,
    name: 'Crimson Red',
    primaryHex: '#ef4444',
    glowColor: new THREE.Color('#b91c1c'),
    emissiveIntensity: 2.0,
  },
  3: {
    id: 3,
    name: 'Violet Purple',
    primaryHex: '#a855f7',
    glowColor: new THREE.Color('#7e22ce'),
    emissiveIntensity: 2.1,
  },
};

export const DEFAULT_ENVIRONMENT: EnvironmentConfig = {
  fogDensity: 0.003,
  starryNight: true,
  wind: {
    angle: 45,
    speed: 0.8,
  },
};
