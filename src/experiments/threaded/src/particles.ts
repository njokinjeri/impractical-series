import type { Particle, StampedNibble, Language } from './types'
import { toNibble, HELLO_FULL } from './languages'

export const particles: Particle[] = []
export const stampedNibbles: StampedNibble[] = []

export function clearParticles(): void {
    particles.length = 0
    stampedNibbles.length = 0
}

export function spawnParticle(langIdx: number, lang: Language): void {

    const ci = lang._charIndex % lang.code.length
    const char = lang.code[ci]
    lang._charIndex++

    const hs = lang.code.indexOf(HELLO_FULL)
    const isShared = hs >= 0 && ci >= hs && ci < hs + HELLO_FULL.length
    particles.push({
        langIdx,
        char,
        isShared,
        color: lang.color,
        nibble: toNibble(char),
        progress: 0,
        speed: 0.002 + Math.random() * 0.0012
    })
}


export function stampNibble(p: Particle, dstX: number, dstY: number): void {
    stampedNibbles.push ({
        x: dstX + 18,
        y: dstY + (Math.random() - 0.5) * 3,
        nibble: p.nibble,
        color: p.isShared ? '#AACCFF' : p.color,
        alpha: 0.6,
    })
    if (stampedNibbles.length > 160) stampedNibbles.shift()
}
    

export function fadeStampedNibbles(): void {
    for (const n of stampedNibbles) {
        n.alpha = Math.max(0, n.alpha - 0.008)
    }
}