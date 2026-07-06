export const FLOWERS = ["jazmin", "lotus", "rose", "dahlia", "lily"] as const;

export type FlowerKey = (typeof FLOWERS)[number];

export const LABELS: Record<FlowerKey, string> = {
    jazmin: "Jazmin",
    lotus: "Lotus",
    rose: "Rose",
    dahlia: "Dahlia",
    lily: "Water Lily",
};

export const SPIN_LBL = ["off", "slow", "med", "fast"] as const;
export const DET_LBL = ["delicate", "fine", "lush"] as const;
export const GLOW_LBL = ["shaded", "warm", "neon"] as const;

export const SPIN_SPD = [0, 0.5, 1.0, 1.5] as const;

export const DET_MUL = [1.8, 1.2, 0.65] as const;

export type HslStop = readonly [number, number, number];

export type PaletteVariant = readonly [HslStop, HslStop, HslStop];

export type FlowerPalette = readonly [
    PaletteVariant,
    PaletteVariant,
    PaletteVariant,
];

export const PALETTE: Record<FlowerKey, FlowerPalette> = {
    jazmin: [
        [
            [25, 100, 52],
            [42, 100, 60],
            [58, 100, 70],
        ],
        [
            [195, 100, 48],
            [215, 95, 58],
            [240, 100, 72],
        ],
        [
            [280, 90, 46],
            [298, 95, 56],
            [325, 100, 70],
        ],
    ],
    lotus: [
        [
            [200, 100, 46],
            [180, 95, 56],
            [155, 90, 66],
        ],
        [
            [28, 100, 50],
            [18, 95, 58],
            [4, 100, 64],
        ],
        [
            [310, 90, 48],
            [285, 95, 58],
            [260, 100, 72],
        ],
    ],
    rose: [
        [
            [20, 100, 48],
            [35, 95, 56],
            [50, 95, 68],
        ],
        [
            [210, 95, 44],
            [190, 90, 54],
            [165, 85, 66],
        ],
        [
            [290, 90, 44],
            [270, 85, 56],
            [245, 95, 70],
        ],
    ],
    dahlia: [
        [
            [142, 85, 30],
            [155, 88, 44],
            [168, 82, 58],
        ],
        [
            [32, 88, 44],
            [42, 92, 56],
            [52, 88, 68],
        ],
        [
            [285, 90, 42],
            [310, 95, 54],
            [335, 100, 66],
        ],
    ],
    lily: [
        [
            [170, 100, 45],
            [185, 95, 58],
            [205, 100, 70],
        ],
        [
            [255, 75, 50],
            [270, 72, 62],
            [285, 68, 74],
        ],
        [
            [22, 82, 52],
            [34, 80, 64],
            [46, 78, 74],
        ],
    ],
};
