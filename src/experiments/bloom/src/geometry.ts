import { DET_MUL, type FlowerKey } from "./constants.js";
import { state, type Point } from "./state.js";

const D2R = Math.PI / 180;

function add(P: Point[], x: number, y: number, z: number, r: number): void {
    P.push({ x, y, z, r });
}

function buildJazmin(b: number, m: number): Point[] {
    const P: Point[] = [];
    const c = 7,
        rs = 0.04 * m,
        ts = 2.5 * m;

    for (let v = 0; v <= Math.PI * 1.1; v += rs) {
        for (let u = -Math.PI; u <= Math.PI; u += ts * D2R) {
            const rC =
                Math.pow(v, 1.5) *
                Math.sqrt(0.01 + Math.abs(Math.sin((c * u) / 2)));
            const x = rC * Math.sin(u) * Math.cos(v);
            const z = rC * Math.cos(u) * Math.cos(v);
            const y =
                Math.pow(Math.abs(Math.cos(v)), 0.7) *
                (2 + Math.pow(Math.sin((c * u) / 2), 2)) *
                (1 + 1 / Math.pow(0.5 + v, 0.7));
            add(
                P,
                x * 52 * b,
                -(y - 3.0) * 30 * b,
                z * 52 * b,
                v / (Math.PI * 1.1),
            );
        }
    }
    return P;
}

function buildLotus(b: number, m: number): Point[] {
    const P: Point[] = [];
    const SC = 240;
    const rs = 0.032 * m,
        ts = 2.4 * m;

    for (let r = 0; r <= 1; r += rs) {
        for (let th = 0; th <= 1440; th += ts) {
            const phi = 72 * Math.exp(-th / 1170);
            const pc =
                0.5 +
                Math.abs(
                    Math.asin(Math.sin(2.25 * th * D2R)) / D2R +
                        120 * Math.sin(2.25 * th * D2R),
                ) /
                    360;
            const hd =
                2.3 * r * r * Math.pow(0.8 * r - 1, 2) * Math.sin(phi * D2R);
            const sv = r * Math.sin(phi * D2R) + hd * Math.cos(phi * D2R);
            if (pc * sv > 0) {
                add(
                    P,
                    SC * b * pc * sv * Math.sin(th * D2R),
                    -(
                        SC *
                            b *
                            pc *
                            (r * Math.cos(phi * D2R) -
                                hd * Math.sin(phi * D2R)) -
                        40
                    ),
                    SC * b * pc * sv * Math.cos(th * D2R),
                    r,
                );
            }
        }
    }
    return P;
}

function buildRose(b: number, m: number): Point[] {
    const P: Point[] = [];
    const SC = 240;
    const rs = 0.032 * m,
        ts = 2.5 * m;

    for (let r = 0; r <= 1; r += rs) {
        for (let th = -360; th <= 2500; th += ts) {
            const phi = 90 * Math.exp(-th / 1440);
            const pc =
                1 -
                0.5 *
                    Math.pow(
                        1.25 * Math.pow(1 - ((3.6 * th) % 360) / 180, 2) - 0.25,
                        2,
                    );
            const hd =
                2 * r * r * Math.pow(1.3 * r - 1, 2) * Math.sin(phi * D2R);
            const sv = r * Math.sin(phi * D2R) + hd * Math.cos(phi * D2R);
            if (pc * sv > 0) {
                add(
                    P,
                    SC * b * pc * sv * Math.sin(th * D2R),
                    -(
                        SC *
                            b *
                            pc *
                            (r * Math.cos(phi * D2R) -
                                hd * Math.sin(phi * D2R)) -
                        40
                    ),
                    SC * b * pc * sv * Math.cos(th * D2R),
                    r,
                );
            }
        }
    }
    return P;
}

function buildDahlia(b: number, m: number): Point[] {
    const P: Point[] = [];
    const rs = 0.04 * m,
        ts = 3.2 * m;

    for (let r = 0; r <= 1; r += rs) {
        for (let th = 0; th <= 4800; th += ts) {
            const phi = (180 / 1.75) * Math.exp(-th / 1980);
            const pc =
                0.6 +
                Math.abs(
                    Math.asin(Math.sin(4.75 * th * D2R)) / D2R +
                        420 * Math.sin(4.75 * th * D2R),
                ) /
                    2000;
            const hd =
                2.3 * r * r * Math.pow(0.9 * r - 1, 2) * Math.sin(phi * D2R);
            const sv = r * Math.sin(phi * D2R) + hd * Math.cos(phi * D2R);
            if (pc * sv > 0) {
                add(
                    P,
                    365 * b * pc * sv * Math.sin(th * D2R),
                    -(
                        365 *
                            b *
                            pc *
                            (r * Math.cos(phi * D2R) -
                                hd * Math.sin(phi * D2R)) -
                        42
                    ),
                    365 * b * pc * sv * Math.cos(th * D2R),
                    r,
                );
            }
        }
    }
    return P;
}

function buildLily(b: number, m: number): Point[] {
    const P: Point[] = [];
    const rs = 0.035 * m,
        ts = 2.5 * m;

    for (let r = 0; r <= 1; r += rs) {
        for (let th = 0; th <= 2880; th += ts) {
            const phi = 82 * Math.exp(-th / 1600);
            const pc =
                0.55 +
                Math.abs(Math.sin(4 * th * D2R) * Math.cos(4 * th * D2R)) * 0.4;
            const hd = 1.8 * r * r * Math.pow(r - 1, 2) * Math.sin(phi * D2R);
            const sv = r * Math.sin(phi * D2R) + hd * Math.cos(phi * D2R);
            if (pc * sv > 0) {
                add(
                    P,
                    480 * b * pc * sv * Math.sin(th * D2R),
                    -(
                        480 *
                            b *
                            pc *
                            (r * Math.cos(phi * D2R) -
                                hd * Math.sin(phi * D2R)) -
                        40
                    ),
                    480 * b * pc * sv * Math.cos(th * D2R),
                    r,
                );
            }
        }
    }
    return P;
}

type Builder = (b: number, m: number) => Point[];

const BUILDERS: Record<FlowerKey, Builder> = {
    jazmin: buildJazmin,
    lotus: buildLotus,
    rose: buildRose,
    dahlia: buildDahlia,
    lily: buildLily,
};

export function build(b: number): Point[] {
    const m = DET_MUL[state.cfg.det - 1];
    return BUILDERS[state.flower](b, m);
}
