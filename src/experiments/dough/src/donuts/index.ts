import * as THREE from 'three';
import type { BGSpec } from '../core/background';
import type { LightingPreset } from '../core/lighting';
import type { EnvPreset } from '../core/environment';
import type { BloomOptions } from '../core/postfx';

import { buildGlitter } from './glitter';
import { buildStrawberry } from './strawberry';
import { buildBrulee } from './brulee';
import { buildFootball } from './football';
import { buildKpop } from './kpop';
import { buildFluff } from './fluff';
import { buildEarth } from './earth';
import { buildSpace } from './space';
import { buildIce } from './ice';
import { buildRelic } from './relic';
import { buildRotten } from './rotten';
import { buildPainters } from './painters';
import { buildDontTouch } from './donttouch';
import { buildCluster } from './cluster';

export interface DonutDef {
  id: string;
  name: string;
  shortName: string;
  subtitle: string;
  accent: string;
  spinSpeed: number;
  lighting: LightingPreset;
  env: EnvPreset;
  background: BGSpec;
  bloom: BloomOptions;
  outerRadius: number;
  outerPadding?: number;
  build: () => THREE.Group;
}

export const DONUTS: DonutDef[] = [
  // 01 — Classic pink opener
  {
    id: 'glitter',
    name: 'Glitter Donut',
    shortName: 'Glitter',
    subtitle: 'Pirate approved.',
    accent: '#ff5fa8',
    spinSpeed: 0.2,
    lighting: 'warm',
    env: 'warm',
    background: {
      type: 'radial',
      stops: [
        { at: 0.0, color: '#ffc8e0' },
        { at: 0.35, color: '#f5a0c8' },
        { at: 0.7, color: '#e07ab0' },
        { at: 1.0, color: '#c0508c' },
      ],
    },
    bloom: { strength: 0.32, radius: 0.6, threshold: 0.9 },
    outerRadius: 1.64,
    outerPadding: 1.35,
    build: buildGlitter,
  },

  // 02 — Classic pink continuation
  {
    id: 'strawberry',
    name: 'Strawberry Donut',
    shortName: 'Strawberry',
    subtitle: "Farmer's market fresh.",
    accent: '#ff2a4a',
    spinSpeed: 0.15,
    lighting: 'pink',
    env: 'pink',
    background: {
      type: 'radial',
      stops: [
        { at: 0.0, color: '#88c0d8' },
        { at: 0.5, color: '#5a9cc8' },
        { at: 0.85, color: '#3a70a0' },
        { at: 1.0, color: '#1a4878' },
      ],
    },
    bloom: { strength: 0.15, radius: 0.5, threshold: 1.0 },
    outerRadius: 1.52,
    outerPadding: 1.35,
    build: buildStrawberry,
  },

  // 03 — Warmth
  {
    id: 'brulee',
    name: 'Brûlée Donut',
    shortName: 'Brûlée',
    subtitle: 'Torched on purpose.',
    accent: '#d89a4a',
    spinSpeed: 0.15,
    lighting: 'chocolate',
    env: 'warm',
    background: {
      type: 'radial',
      stops: [
        { at: 0.0, color: '#d8a030' },
        { at: 0.5, color: '#c08820' },
        { at: 1.0, color: '#8a5810' },
      ],
    },
    bloom: { strength: 0.1, radius: 0.55, threshold: 1.0 },
    outerRadius: 1.75,
    outerPadding: 1.45,
    build: buildBrulee,
  },

  // 04 — Procedural paint
  {
    id: 'painters',
    name: "Painter's Donut",
    shortName: "Painter's",
    subtitle: 'Dropped the palette.',
    accent: '#f5a030',
    spinSpeed: 0.32,
    lighting: 'warm',
    env: 'warm',
    background: {
      type: 'radial',
      stops: [
        { at: 0.0, color: '#f0e8e0' },
        { at: 0.4, color: '#e0d5cc' },
        { at: 0.75, color: '#c0b8b0' },
        { at: 1.0, color: '#8a8580' },
      ],
    },
    bloom: { strength: 0.1, radius: 0.4, threshold: 0.95 },
    outerRadius: 3.0,
    outerPadding: 1.35,
    build: buildPainters,
  },

  // 05 — Neon energy
  {
    id: 'kpop',
    name: 'K-pop Donut',
    shortName: 'K-pop',
    subtitle: 'Trained from debut.',
    accent: '#ff3c88',
    spinSpeed: 0.3,
    lighting: 'space',
    env: 'space',
    background: {
      type: 'radial',
      stops: [
        { at: 0.0, color: '#2a0818' },
        { at: 0.4, color: '#150410' },
        { at: 0.75, color: '#050108' },
        { at: 1.0, color: '#000000' },
      ],
    },
    bloom: { strength: 0.65, radius: 0.55, threshold: 0.8 },
    outerRadius: 2.4,
    outerPadding: 1.25,
    build: buildKpop,
  },

  // 06 — Sporty surprise
  {
    id: 'football',
    name: 'Football Donut',
    shortName: 'Football',
    subtitle: 'Game day, no rules.',
    accent: '#a0c8ff',
    spinSpeed: 0.15,
    lighting: 'space',
    env: 'space',
    background: {
      type: 'radial',
      stops: [
        { at: 0.0, color: '#3a4552' },
        { at: 0.5, color: '#1e2530' },
        { at: 1.0, color: '#080a10' },
      ],
    },
    bloom: { strength: 0.22, radius: 0.5, threshold: 0.9 },
    outerRadius: 1.7,
    outerPadding: 1.4,
    build: buildFootball,
  },

  // 07 — Textural
  {
    id: 'fluff',
    name: 'Fluff Donut',
    shortName: 'Fluff',
    subtitle: 'Nine lives of softness.',
    accent: '#bb99ff',
    spinSpeed: 0.15,
    lighting: 'space',
    env: 'space',
    background: {
      type: 'radial',
      stops: [
        { at: 0.0, color: '#2a1a4a' },
        { at: 0.4, color: '#150828' },
        { at: 0.75, color: '#050010' },
        { at: 1.0, color: '#000000' },
      ],
    },
    bloom: { strength: 0.08, radius: 0.5, threshold: 0.95 },
    outerRadius: 1.7,
    outerPadding: 1.35,
    build: buildFluff,
  },

  // 08 — Planetary
  {
    id: 'earth',
    name: 'Earth Donut',
    shortName: 'Earth',
    subtitle: 'Locally sourced from space.',
    accent: '#88bbff',
    spinSpeed: 0.15,
    lighting: 'space',
    env: 'space',
    background: {
      type: 'radial',
      stops: [
        { at: 0.0, color: '#000000' },
        { at: 1.0, color: '#000000' },
      ],
    },
    bloom: { strength: 0.2, radius: 0.6, threshold: 0.9 },
    outerRadius: 1.53,
    outerPadding: 1.35,
    build: buildEarth,
  },

  // 09 — Space continuation
  {
    id: 'space',
    name: 'Space Donut',
    shortName: 'Space',
    subtitle: 'Not FDA approved.',
    accent: '#88aaff',
    spinSpeed: 0.15,
    lighting: 'space',
    env: 'space',
    background: {
      type: 'radial',
      stops: [
        { at: 0.0, color: '#1a2540' },
        { at: 0.5, color: '#0a0f1f' },
        { at: 1.0, color: '#000000' },
      ],
    },
    bloom: { strength: 0.35, radius: 0.6, threshold: 0.85 },
    outerRadius: 1.65,
    outerPadding: 1.4,
    build: buildSpace,
  },

  // 10 — Cold contrast
  {
    id: 'ice',
    name: 'Ice Donut',
    shortName: 'Ice',
    subtitle: 'Brain freeze guaranteed.',
    accent: '#aaddff',
    spinSpeed: 1.0,
    lighting: 'ice',
    env: 'space',
    background: {
      type: 'radial',
      stops: [
        { at: 0.0, color: '#1a3a5f' },
        { at: 0.5, color: '#0a1a35' },
        { at: 1.0, color: '#000510' },
      ],
    },
    bloom: { strength: 0.28, radius: 0.55, threshold: 0.85 },
    outerRadius: 2.1,
    outerPadding: 1.3,
    build: buildIce,
  },

  // 11 — Ancient
  {
    id: 'relic',
    name: 'Relic Donut',
    shortName: 'Relic',
    subtitle: 'Excavated, not baked.',
    accent: '#c8c0b0',
    spinSpeed: 0.15,
    lighting: 'relic',
    env: 'relic',
    background: {
      type: 'radial',
      stops: [
        { at: 0.0, color: '#2a4238' },
        { at: 0.4, color: '#152820' },
        { at: 0.75, color: '#08140e' },
        { at: 1.0, color: '#000000' },
      ],
    },
    bloom: { strength: 0.25, radius: 0.6, threshold: 0.9 },
    outerRadius: 1.85,
    outerPadding: 1.45,
    build: buildRelic,
  },

  // 12 — Decay
  {
    id: 'rotten',
    name: 'Rotten Donut',
    shortName: 'Rotten',
    subtitle: 'Still technically edible.',
    accent: '#9aba55',
    spinSpeed: 0.35,
    lighting: 'relic',
    env: 'relic',
    background: {
      type: 'radial',
      stops: [
        { at: 0.0, color: '#3a4a2a' },
        { at: 0.5, color: '#1a2410' },
        { at: 0.75, color: '#050803' },
        { at: 1.0, color: '#000000' },
      ],
    },
    bloom: { strength: 0.16, radius: 0.55, threshold: 0.9 },
    outerRadius: 1.6,
    outerPadding: 1.35,
    build: buildRotten,
  },

  // 13 — Chrome danger
  {
    id: 'donttouch',
    name: "Don't Touch",
    shortName: "Don't Touch",
    subtitle: 'Not for sale.',
    accent: '#ccd8f0',
    spinSpeed: 0.18,
    lighting: 'chrome',
    env: 'dontouch',
    background: {
      type: 'radial',
      stops: [
        { at: 0.0, color: '#1a2540' },
        { at: 0.4, color: '#0c1224' },
        { at: 0.75, color: '#05080f' },
        { at: 1.0, color: '#000000' },
      ],
    },
    bloom: { strength: 0.15, radius: 0.4, threshold: 1.1 },
    outerRadius: 1.5,
    outerPadding: 1.4,
    build: buildDontTouch,
  },

  // 14 — Interactive finale
  {
    id: 'cluster',
    name: 'Cluster Donut',
    shortName: 'Cluster',
    subtitle: 'Find the golden one.',
    accent: '#ff5599',
    spinSpeed: 0.03,
    lighting: 'warm',
    env: 'pink',
    background: {
      type: 'linear',
      vertical: true,
      stops: [
        { at: 0.0, color: '#e8b8d8' },
        { at: 0.5, color: '#c898b8' },
        { at: 1.0, color: '#8868a8' },
      ],
    },
    bloom: { strength: 0.1, radius: 0.4, threshold: 1.05 },
    outerRadius: 5.5,
    outerPadding: 1.25,
    build: () => buildCluster().group,
  },
];

export function findDonut(id: string): DonutDef | undefined {
  return DONUTS.find((d) => d.id === id);
}