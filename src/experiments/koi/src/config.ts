export interface Theme {
  key: string;
  bg: number;
  bgCSS: string;
  bodyClass: string;
  palette: number[];
}

export const THEMES: Record<string, Theme> = {
  night: {
    key: 'night',
    bg: 0x0a1e28,
    bgCSS: '#0a1e28',
    bodyClass: '',
    palette: [
      0x7fd4e0, 0x5a9ad8, 0x9ac8e8, 0x6dc8c0, 0xa8b8f0, 0x8ad8d8, 0xd0b8e8,
      0x90e0d0, 0xf0f0f8, 0xc8a8e0,
    ],
  },
  day: {
    key: 'day',
    bg: 0xeef1f6,
    bgCSS: '#eef1f6',
    bodyClass: 'day',
    palette: [
      0x8a50cc, 0x3a78c8, 0xdd3a8a, 0xddaa22, 0x2aa855, 0xdd5522, 0x22aabb,
      0xcc66aa, 0x8866bb, 0xcc3388,
    ],
  },
};

export type ViewMode = 'circle' | 'free';

export function pickFishCount(viewMode: ViewMode, width: number): number {
  if (viewMode === 'circle') {
    if (width >= 1600) return 24;
    if (width >= 1200) return 20;
    if (width >= 900) return 16;
    if (width >= 600) return 12;
    return 6;
  }
  if (width >= 1600) return 36;
  if (width >= 1200) return 30;
  if (width >= 900) return 24;
  if (width >= 600) return 18;
  return 9;
}

export const FISH_STL_URL = import.meta.env.DEV
  ? '/fish.stl'
  : '../../../fish.stl';
export const STAR_KEEP_RATIO = 0.08;
export const NUM_POINTS = 511;
