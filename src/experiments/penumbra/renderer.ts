import { CONFIG, PALETTE, rc, type Orientation} from './config'

export interface SceneElements {
    blinds: HTMLDivElement;
    glow: HTMLDivElement;
    castTop: HTMLDivElement;
    castMid: HTMLDivElement;
    castLow: HTMLDivElement;
    bloom: HTMLDivElement;
    grain: HTMLCanvasElement;
    readout: HTMLSpanElement;
}


export function makeGrain(canvas:HTMLCanvasElement): void {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext('2d')!;
    const img = ctx.createImageData(canvas.width, canvas.height);

    for (let i = 0; i < img.data.length; i += 4) {
        const v = (Math.random() * 255) | 0;
        img.data[i] = img.data[i + 1] = img.data[i + 2] = v
        img.data[i + 3] = 255;
    }
    ctx.putImageData(img, 0, 0);
}

function slatBg(index: number, total: number, orientation: Orientation): string {
    const dim = 0.96 + 0.04 * (1 - Math.abs(index / Math.max(total - 1, 1) - 0.5) * 2);
    const face = `rgba(${Math.round(238*dim)},${Math.round(232*dim)},${Math.round(221*dim)},1)`;
    const shadow = `rgba(138,132,124,1)`;
    const bounce = `rgba(${Math.round(215*dim)},${Math.round(209*dim)},${Math.round(199*dim)},1)`;
    const dir = orientation === 'vertical' ? '90deg' : '180deg';
    return `linear-gradient(${dir},${shadow} 0px,${shadow} 2px,${face} 7px,${face} calc(100% - 4px),${bounce} 100%)`;
}
 
export function buildSlats(container: HTMLDivElement, orientation: Orientation): HTMLDivElement[] {
    container.innerHTML = '';
    container.style.perspective = `${window.innerWidth * 1.5}px`;
    container.style.perspectiveOrigin = '50% 50%';
    
    const slats: HTMLDivElement[] = [];
    const W = window.innerWidth, H = window.innerHeight;
    
    const count = orientation === 'vertical'
    ? Math.round(W / CONFIG.slatV)
    : Math.round(H / CONFIG.slatH);
 
    for (let i = 0; i < count; i++) {
        const el = document.createElement('div');
        
        if (orientation === 'vertical') {
            const sw = W / count;
            el.style.cssText = `position:absolute;transform-origin:50% 50%;will-change:transform,background,box-shadow;top:0;height:100%;width:${sw - CONFIG.gap}px;left:${i * sw}px`;
            el.style.backfaceVisibility = 'hidden';
        } else {
            const sh = H / count;
            el.style.cssText = `position:absolute;transform-origin:50% 50%;will-change:transform,background,box-shadow;left:0;width:100%;height:${sh - CONFIG.gap}px;top:${i * sh}px`;
            el.style.backfaceVisibility = 'hidden';
        }
        
        el.style.background = slatBg(i, count, orientation);
        container.appendChild(el);
        slats.push(el);
    }
    
    return slats;
}
 
 
function applyCast(els: SceneElements, t: number, abs: number, orientation: Orientation): void {
    const [lit, cx, bx] = t > 0
    ? ['0%',   '14%', '6%' ]
    : ['100%', '86%', '94%'];
 
    let periAt: string, midAt: string, lowAt: string, bloomAt: string;
    let periE: string, midE: string, lowE: string;
 
    if (orientation === 'vertical') {
        periAt = `${lit} 8%`; midAt = `${cx} 44%`; lowAt = `${bx} 91%`;
        bloomAt = `${lit} 34%`;  periE = '52% 88%'; midE = '92% 86%'; lowE = '72% 62%';
    } else {
        const [ly, cy, by] = t > 0 ? ['0%', '16%', '91%'] : ['100%', '84%', '9%'];
        periAt = `10% ${ly}`; midAt = `50% ${cy}`; lowAt = `50% ${by}`;
        bloomAt = `50% ${ly}`; periE = '92% 46%'; midE = '88% 84%'; lowE = '80% 60%';
    }
 
    els.castTop.style.background = `
        radial-gradient(ellipse ${periE} at ${periAt},
        ${rc(PALETTE.periwinkle, abs * 0.80)} 0%, ${rc(PALETTE.periwinkle, abs * 0.32)} 28%, transparent 55%),
        radial-gradient(ellipse 36% 100% at ${periAt},
        ${rc(PALETTE.periwinkle, abs * 0.50)} 0%, transparent 46%)
        `;
 
    els.castMid.style.background = `
        radial-gradient(ellipse ${midE} at ${midAt},
        ${rc(PALETTE.orange, abs * 0.88)} 0%, ${rc(PALETTE.peach, abs * 0.58)} 20%,
        ${rc(PALETTE.red, abs * 0.65)} 50%, transparent 72%)
        `;
 
    els.castLow.style.background = `
        radial-gradient(ellipse ${lowE} at ${lowAt},
        ${rc(PALETTE.navy, abs * 0.94)} 0%, ${rc(PALETTE.crimson, abs * 0.70)} 24%,
        ${rc(PALETTE.red, abs * 0.46)} 46%, transparent 66%),
        radial-gradient(ellipse 55% 40% at ${lowAt},
        ${rc(PALETTE.navy, abs * 0.82)} 0%, transparent 52%)
        `;
 
    els.bloom.style.opacity = (abs * 0.46).toFixed(3);
    els.bloom.style.background = `
        radial-gradient(ellipse 56% 50% at ${bloomAt},
        rgba(255,205,115,.60) 0%, rgba(255,145,48,.22) 32%, transparent 58%)`;
}
 
 
const NEUTRAL = 0.014;
 
export function render(
    angle: number,
    slats: HTMLDivElement[],
    orientation: Orientation,
    els: SceneElements,
): void {
    const t = angle / CONFIG.maxAngle;
    const abs = Math.abs(t);
 
    els.glow.style.opacity = (abs * 0.92).toFixed(3);
 
    if (abs < NEUTRAL) {
        els.castTop.style.opacity =
        els.castMid.style.opacity =
        els.castLow.style.opacity =
        els.bloom.style.opacity   = '0';
        slats.forEach((s, i) => {
            s.style.background = slatBg(i, slats.length, orientation);
            s.style.transform  = 'none';
            s.style.boxShadow  = 'none';
    });
    els.readout.textContent = '0°';
    return;
    }
 
    els.castTop.style.opacity =
    els.castMid.style.opacity =
    els.castLow.style.opacity = '1';
    applyCast(els, t, abs, orientation);
 
    const spread = (22 * abs).toFixed(1);
    const off = (4 * abs).toFixed(1);
    const dir = t > 0 ? 1 : -1;
 
    slats.forEach((s, i) => {
        s.style.background = slatBg(i, slats.length, orientation);
        s.style.transform  = orientation === 'vertical'
        ? `rotateY(${angle}deg)`
        : `rotateX(${-angle}deg)`;
        s.style.boxShadow  = orientation === 'vertical'
        ? `${(dir*+off).toFixed(1)}px 0 ${spread}px ${rc(PALETTE.orange,abs*.40)},${(-dir*+off*.45).toFixed(1)}px 0 ${(+spread*.65).toFixed(1)}px ${rc(PALETTE.navy,abs*.38)},0 0 ${(+spread*.35).toFixed(1)}px ${rc(PALETTE.periwinkle,abs*.24)}`
        : `0 ${(dir*+off).toFixed(1)}px ${spread}px ${rc(PALETTE.orange,abs*.40)},0 ${(-dir*+off*.45).toFixed(1)}px ${(+spread*.65).toFixed(1)}px ${rc(PALETTE.navy,abs*.38)},0 0 ${(+spread*.35).toFixed(1)}px ${rc(PALETTE.periwinkle,abs*.24)}`;
    });
    
    els.readout.textContent = `${Math.round(abs * CONFIG.maxAngle)}°`;
}