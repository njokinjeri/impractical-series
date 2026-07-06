export type StackTag =
  | 'HTML'
  | 'CSS'
  | 'CSS 3D'
  | 'Canvas 2D'
  | 'TypeScript'
  | 'Three.js'
  | 'GLSL'
  | 'Simplex Noise'
  | 'Physics'
  | 'Parametric Math';

export type AccentColor = 'green' | 'blue' | 'amber';

export interface Project {
  slug: string;
  index: number;
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

export const projects: Project[] = [
  {
    slug: 'threaded',
    index: 1,
    title: 'Threaded',
    description:
      'Threads of source code from 16 languages converge into the same binary.',
    stack: ['Canvas 2D', 'TypeScript'],
    accent: 'blue',
  },
  {
    slug: 'hypnosis-spiral',
    index: 2,
    title: 'Hypnosis Spiral',
    description:
      'Interactive parametric spiral exploring perceptual motion aftereffects.',
    stack: ['Canvas 2D', 'TypeScript'],
    accent: 'blue',
  },
  {
    slug: 'penumbra',
    index: 3,
    title: 'Penumbra',
    description:
      'Interactive blind simulation with cursor-driven tilt and cast light.',
    stack: ['HTML', 'CSS', 'TypeScript'],
    accent: 'green',
  },
  {
    slug: 'parametric-love',
    index: 4,
    title: 'Parametric Love',
    description:
      'Procedural vertex sculpting and interactive fluid clipping simulation.',
    stack: ['Three.js', 'TypeScript', 'GLSL'],
    accent: 'amber',
  },
  {
    slug: 'archivist-vault',
    index: 5,
    title: 'Archivist Vault',
    description:
      'A 3D library lock using procedural books and physical logic gates.',
    stack: ['CSS 3D', 'TypeScript'],
    accent: 'green',
  },
  {
    slug: 'astraeus-flow',
    index: 6,
    title: 'Astraeus Flow',
    description:
      'The Genesis Effect: 15,000 particles reacting to disruption through resilient geometry.',
    stack: ['Three.js', 'TypeScript', 'Simplex Noise'],
    accent: 'amber',
  },
  {
    slug: 'just-grass',
    index: 7,
    title: 'Just Grass',
    description: 'A reactive procedural grassland.',
    stack: ['Canvas 2D', 'TypeScript', 'Physics'],
    accent: 'blue',
  },
  {
    slug: 'bloom',
    index: 8,
    title: 'Bloom',
    description: 'Parametric flowers blooming in 3D space.',
    stack: ['Canvas 2D', 'TypeScript', 'Parametric Math'],
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
