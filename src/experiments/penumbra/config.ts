export type Orientation = 'vertical' | 'horizontal';
export type RGB = readonly[number, number, number];

export const CONFIG = {
    maxAngle: 60, 
    restAngle: 45,
    mouseRange: 30,
    lerpSpeed: 0.062,
    slatV: 38,
    slatH: 46,
    gap: 1,
} as const;


export const PALETTE = {
    periwinkle: [168, 162, 220] as RGB,
    peach: [255, 170, 70] as RGB,
    orange: [255, 115, 30] as RGB,
    red: [240, 80, 20] as RGB,
    crimson: [180, 35, 15] as RGB,
    navy:[ 14, 10, 30] as RGB,
} as const;
 

export const rc = ([r, g, b]: RGB, a: number): string =>
    `rgba(${r},${g},${b},${a.toFixed(3)})`;
 