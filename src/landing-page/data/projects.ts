export type StackTag =
  | 'HTML'
  | 'CSS'
  | 'CSS 3D'
  | 'Canvas 2D'
  | 'TypeScript'
  | 'Three.js'
  | 'GLSL'
  | 'WebGL'
  | 'WebGPU'
  | 'TSL'
  | 'Simplex Noise'
  | 'Physics'
  | 'Parametric Math'
  | 'Web Audio API';

export type AccentColor = 'green' | 'blue' | 'amber';

export interface Project {
  slug: string;
  title: string;
  description: string;
  stack: StackTag[];
  accent: AccentColor;
}

export const ACCENT_HEX: Record<AccentColor, string> = {
  green: '#33D17A',
  blue: '#3FA0E0',
  amber: '#E8A33D',
};

// Projects array ordered latest to oldest
export const projects: Project[] = [
  {
    slug: 'cascadia',
    title: 'Cascadia',
    description:
      'A physics-based domino simulation where you build, tip, and trigger cascading chain reactions across multiple paths with spatial audio feedback.',
    stack: ['Three.js', 'Physics', 'TypeScript'],
    accent: 'blue',
  },
  {
    slug: 'vinyl',
    title: 'Vinyl',
    description:
      'A 3D vinyl record player with physical drag-to-spin interaction and audio-reactive motion. Features four unique material editions with custom anisotropic shaders and MP3 playback.',
    stack: ['Three.js', 'Web Audio API', 'GLSL', 'TypeScript'],
    accent: 'amber',
  },
  {
    slug: 'singularity',
    title: 'Singularity',
    description:
      'A WebGL vector sandbox that dynamically morphs across infinite hallway, vortex, and continuous gravitational singularity modes.',
    stack: ['Three.js', 'WebGL', 'TypeScript'],
    accent: 'amber',
  },
  {
    slug: 'chalcographia',
    title: 'Chalcographia',
    description:
      'A classical printmaking shader experiment that translates copperplate cross-hatching into real-time screen-space lines over stellated 3D polyhedra.',
    stack: ['Three.js', 'WebGL', 'GLSL', 'TypeScript'],
    accent: 'amber',
  },
  {
    slug: 'refractal',
    title: 'Refractal',
    description:
      'An interactive glass transmission canvas that warps complex topological surfaces using custom TSL wave displacement shader graphs.',
    stack: ['Three.js', 'WebGPU', 'TSL', 'TypeScript'],
    accent: 'amber',
  },
  {
    slug: 'bloom',
    title: 'Bloom',
    description:
      'A 3D mathematical renderer that generates and animates five flower species as glowing point clouds using parametric surface equations.',
    stack: ['Canvas 2D', 'TypeScript', 'Parametric Math'],
    accent: 'blue',
  },
  {
    slug: 'just-grass',
    title: 'Just Grass',
    description:
      'An interactive canvas grassland that reacts to touch, grows wild when left untouched, and sways naturally under custom wind forces.',
    stack: ['Canvas 2D', 'TypeScript', 'Physics'],
    accent: 'blue',
  },
  {
    slug: 'astraeus-flow',
    title: 'Astraeus Flow',
    description:
      'A real-time particle playground where 15,000 points exist in a constant tug-of-war between structure and chaos based on user interaction.',
    stack: ['Three.js', 'TypeScript', 'Simplex Noise'],
    accent: 'amber',
  },
  {
    slug: 'archivist-vault',
    title: 'Archivist Vault',
    description:
      'A 3D digital lock experiment where you navigate a library layout to find and tilt three specific hidden books in sequence to open a secret vault.',
    stack: ['CSS 3D', 'TypeScript'],
    accent: 'green',
  },
  {
    slug: 'parametric-love',
    title: 'Parametric Love',
    description:
      'A 3D math and fluid simulation featuring an interactive heart mesh that fills with liquid before triggering a particle-based explosion.',
    stack: ['Three.js', 'TypeScript', 'GLSL'],
    accent: 'amber',
  },
  {
    slug: 'penumbra',
    title: 'Penumbra',
    description:
      'A 3D window blind simulation using CSS transforms and gradient blend modes to cast dynamic, colored light leaks across rotating slats.',
    stack: ['HTML', 'CSS', 'TypeScript'],
    accent: 'green',
  },
  {
    slug: 'hypnosis-spiral',
    title: 'Hypnosis Spiral',
    description:
      'An interactive canvas-based optical illusion designed to simulate and test motion aftereffects through continuous rotation.',
    stack: ['Canvas 2D', 'TypeScript'],
    accent: 'blue',
  },
  {
    slug: 'threaded',
    title: 'Threaded',
    description:
      'A visual simulation showing how 16 different programming languages flow, converge, and collapse into the exact same binary machine code.',
    stack: ['Canvas 2D', 'TypeScript'],
    accent: 'blue',
  },
];

const SITE_BASE = '/impractical-series';

export function getDetailUrl(slug: string): string {
  return `${SITE_BASE}/project.html?id=${slug}/`;
}

export function getPlayUrl(slug: string): string {
  return `${SITE_BASE}/src/experiments/${slug}/`;
}

export function getSourceUrl(slug: string): string {
  return `https://github.com/njokinjeri/impractical-series/tree/main/src/experiments/${slug}`;
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}