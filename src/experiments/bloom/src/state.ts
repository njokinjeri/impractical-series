import { type FlowerKey } from "./constants.js";

export interface Cfg {
    det: number;
    glow: number;
    spin: number;
}

export interface Point {
    x: number;
    y: number;
    z: number;
    r: number;
}

export interface AppState {
    flower: FlowerKey;
    variant: number;
    cfg: Cfg;
    rotX: number;
    rotY: number;
    zoom: number;
    drag: boolean;
    lastX: number;
    lastY: number;
    bloomT: number;
    blooming: boolean;
    last: number;
    W: number;
    H: number;
    pts: Point[];
    sortIndices: Int32Array;
    depthBuffer: Float32Array;
}

export const state: AppState = {
    flower: "jazmin",
    variant: 0,
    cfg: { det: 3, glow: 2, spin: 1 },
    rotX: 24,
    rotY: -25,
    zoom: 1.35,
    drag: false,
    lastX: 0,
    lastY: 0,
    bloomT: 1,
    blooming: false,
    last: 0,
    W: 0,
    H: 0,
    pts: [],
    sortIndices: new Int32Array(0),
    depthBuffer: new Float32Array(0),
};
