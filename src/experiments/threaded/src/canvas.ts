import type { CanvasState, Language, Phase } from './types'
import { getLangsForRound, HELLO_SEQ } from './languages'
import {
  particles, stampedNibbles,
  clearParticles, spawnParticle, stampNibble, fadeStampedNibbles,
} from './particles'
import { addLangsToLog, resetTransBar, addTransByte, fadeTransBar, updateRoundLabel } from './ui'


//--canvas & state
const canvas = document.getElementById('c') as HTMLCanvasElement
const ctx = canvas.getContext('2d')!

export const state: CanvasState = {
    W: 0,
    H: 0,
    CX: 0,
    CY: 0,
    isMobile: false,
    threadCount: 8
}

const BAR_H = 52

export function initCanvas(): void {
    measure()
    window.addEventListener('resize', () => { measure(); resetRound()})
}

function measure(): void {
    state.W = canvas.width = window.innerWidth
    state.H = canvas.height = window.innerHeight
    state.CX = state.W / 2
    state.CY = state.H / 2
    state.isMobile = state.W < 600
    state.threadCount = state.isMobile ? 4 : state.W < 900 ? 6 : 8
}

//--geometry

function getSpread(): number { return (state.H - BAR_H) * (state.isMobile ? 0.52 : 0.62) }
function getSrcX(): number   { return state.isMobile ? 8 : 16 }
function getDstX(): number   { return state.W - (state.isMobile ? 8 : 16) }

function threadY(idx: number, total: number): number {
  if (total === 1) return state.CY - BAR_H / 2
  const spread = getSpread()
  const topY = (state.CY - BAR_H / 2) - spread / 2
  return topY + (idx / (total - 1)) * spread
}

function cubicBezier(t: number, p0: number, p1: number, p2: number, p3: number): number {
  const m = 1 - t
  return m*m*m*p0 + 3*m*m*t*p1 + 3*m*t*t*p2 + t*t*t*p3
}

function getPos(langIdx: number, total: number, progress: number): { x: number; y: number } {
    const srcX = getSrcX() + 110
    const dstX = getDstX() - 110
    const y = threadY(langIdx, total)
    const CCY = state.CY - BAR_H / 2

    if (progress <= 0.5) {
        const t = progress / 0.5
        return {
            x: cubicBezier(t, srcX, srcX + (state.CX - srcX) * 0.55, state.CX - 40, state.CX),
            y: cubicBezier(t, y, y, CCY, CCY),
        }
    } else {
        const t = (progress - 0.5) / 0.5
        return {
            x: cubicBezier(t, state.CX, state.CX + 40, dstX - (dstX - state.CX) * 0.55, dstX),
            y: cubicBezier(t, CCY, CCY, y, y),
        }
    }
}


// --draw helpers

function glowText(
    text: string, x: number, y: number,
    color: string, alpha: number, size: number,
    align: CanvasTextAlign = 'center',
): void {
    if (alpha <= 0.01) return
    ctx.save()
    ctx.textAlign = align
    ctx.textBaseline = 'middle'
    ctx.fillStyle = color
    ctx.globalAlpha = alpha * 0.25
    ctx.font = `${size + 4}px 'Share Tech Mono', monospace`
    ctx.fillText(text, x, y)
    ctx.globalAlpha = alpha
    ctx.font = `${size}px 'Share Tech Mono', monospace`
    ctx.fillText(text, x, y)
    ctx.restore()
}

function hexA(hex: string, a: number): string {
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)
    return `rgba(${r},${g},${b},${a})`
}


function drawGhostPaths(langs: Language[]): void {
    const N = langs.length
    const srcX = getSrcX() + 110
    const dstX = getDstX() - 110
    const CCY  = state.CY - BAR_H / 2

    for (let i = 0; i < N; i++) {
        const y = threadY(i, N)
        const cp1x = srcX + (state.CX - srcX) * 0.55
        const cp2x = dstX - (dstX - state.CX) * 0.55

        ctx.save()
        ctx.globalAlpha = 0.055
        ctx.strokeStyle = langs[i].color
        ctx.lineWidth = 1
        ctx.setLineDash([3, 7])
        ctx.beginPath()
        ctx.moveTo(srcX, y)
        ctx.bezierCurveTo(cp1x, y, state.CX - 40, CCY, state.CX, CCY)
        ctx.stroke()
        ctx.beginPath()
        ctx.moveTo(state.CX, CCY)
        ctx.bezierCurveTo(state.CX + 40, CCY, cp2x, y, dstX, y)
        ctx.stroke()
        ctx.setLineDash([])
        ctx.restore()
    }
}


function drawLabels(langs: Language[]): void {
    const N = langs.length
    const lfs = state.isMobile ? 7 : 9

    langs.forEach((lang, i) => {
    const y = threadY(i, N)

    ctx.save()
    ctx.font = `bold ${lfs}px 'Share Tech Mono', monospace`
    ctx.textAlign = 'left'
    ctx.textBaseline = 'middle'
    ctx.fillStyle = hexA(lang.color, 0.5)
    ctx.fillText(lang.name.toUpperCase(), getSrcX(), y - (lfs + 2))
    if (!state.isMobile) {
        ctx.font = `${lfs - 1}px 'Share Tech Mono', monospace`
        ctx.fillStyle = hexA(lang.color, 0.12)
        ctx.fillText(lang.code, getSrcX(), y + 5)
    }
    ctx.restore()
    ctx.save()
    ctx.font = `bold ${lfs}px 'Share Tech Mono', monospace`
    ctx.textAlign = 'right'
    ctx.textBaseline = 'middle'
    ctx.fillStyle = hexA(lang.color, 0.22)
    ctx.fillText(lang.name.toUpperCase(), getDstX(), y - (lfs + 2))
    ctx.restore()
  })
}


function drawConvergenceGlow(frameCount: number): void {
  const CCY = state.CY - BAR_H / 2
  const pulse = 48 + Math.sin(frameCount * 0.033) * 6
  const grd = ctx.createRadialGradient(state.CX, CCY, 0, state.CX, CCY, pulse)
  grd.addColorStop(0, 'rgba(255,255,255,0.17)')
  grd.addColorStop(0.4, 'rgba(150,200,255,0.06)')
  grd.addColorStop(1, 'rgba(0,0,0,0)')
  ctx.fillStyle = grd
  ctx.fillRect(state.CX - pulse, CCY - pulse, pulse * 2, pulse * 2)
}


function drawStampedNibbles(): void {
    const nfs = state.isMobile ? 7 : 8
    ctx.save()
    ctx.textAlign = 'left'
    ctx.textBaseline = 'middle'
    for (const n of stampedNibbles) {
    if (n.alpha <= 0.01) continue
    ctx.fillStyle = n.color
    ctx.globalAlpha = n.alpha * 0.2
    ctx.font = `${nfs + 3}px 'Share Tech Mono', monospace`
    ctx.fillText(n.nibble, n.x, n.y)
    ctx.globalAlpha = n.alpha
    ctx.font = `${nfs}px 'Share Tech Mono', monospace`
    ctx.fillText(n.nibble, n.x, n.y)
  }
  ctx.restore()
}

// -- round state

let phase: Phase = 'FLOWING'
let phaseTimer = 0
let roundIndex = 0
let frameCount = 0
let activelangs: Language[] = []
let transIndex = 0
let byteClock = 0

const FLOW_DURATION = 220
const BYTE_INTERVAL = 12

export function resetRound(): void {
    clearParticles()
    phase = 'FLOWING'
    phaseTimer = 0
    byteClock  = 0
    transIndex = 0
    resetTransBar()
    activelangs = getLangsForRound(roundIndex, state.threadCount)
    addLangsToLog(activelangs)
    updateRoundLabel(roundIndex, activelangs)
}

//--main draw loop

export function startLoop(): void {
    function draw(): void {
        requestAnimationFrame(draw)
        frameCount++
        
        const { W, H } = state
        const N  = activelangs.length
        const fs = state.isMobile ? 8 : 10

        ctx.fillStyle = 'rgba(5,5,15,0.3)'
        ctx.fillRect(0, 0, W, H)

        if (phase === 'FLOWING') {
            phaseTimer++
            
            if (particles.length < 150) {
                for (let i = 0; i < N; i++) {
                    const lang = activelangs[i]
                    lang._spawnTimer++
                
                    if (lang._spawnTimer >= lang._spawnDelay) {
                        lang._spawnTimer = 0
                        spawnParticle(i, lang)
                    }
                }
            }
        
            if (phaseTimer > 55 && transIndex < HELLO_SEQ.length) {
                byteClock++
                if (byteClock % BYTE_INTERVAL === 0) addTransByte(transIndex++)
            }

            if (phaseTimer > FLOW_DURATION) { phase = 'HOLDING'; phaseTimer = 0 }
    
        } else if (phase === 'HOLDING') {
            if (transIndex < HELLO_SEQ.length) {
                byteClock++
                if (byteClock % 8 === 0) addTransByte(transIndex++)
            }
    
            phaseTimer++
            if (phaseTimer > 220) {
                phase = 'FADING'
                phaseTimer = 0
                fadeTransBar(() => { roundIndex++; resetRound() })
            }

        } else if (phase === 'FADING') {
            phaseTimer++
            fadeStampedNibbles()
        }
    
        drawGhostPaths(activelangs)
        drawLabels(activelangs)
        drawConvergenceGlow(frameCount)

        for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i]
            p.progress += p.speed
        
            if (p.progress > 1.08) {
                if (p.progress - p.speed <= 1.08) {
                    stampNibble(p, getDstX() - 110, threadY(p.langIdx, N))
                }
                particles.splice(i, 1)
                continue
            }
            
            const prog = p.progress
            const pos  = getPos(p.langIdx, N, Math.min(prog, 1))

            const CS = 0.44, CE = 0.56
            let ch: string, alpha: number, color: string

            if (prog < CS) {
                ch = p.char
                alpha = Math.min(1, prog / 0.07) * Math.min(1, (CS - prog) / 0.05 + 0.25)
                color = p.color
            } else if (prog < CE) {
                ch = Math.random() > 0.5 ? '1' : '0'
                alpha = 0.9
                color = '#FFFFFF'
            } else {
                const t = (prog - CE) / (1 - CE)
                const nib = p.nibble
                const idx = Math.floor(t * nib.length)
                ch = nib[Math.min(idx, nib.length - 1)]
                alpha = Math.min(1, (prog - CE) / 0.04) * Math.min(1, (1.0 - prog) / 0.09 + 0.1)
                color = p.isShared ? '#AACCFF' : p.color
            }
            
            glowText(ch, pos.x, pos.y, color, Math.min(1, alpha), fs)
        }
        
        drawStampedNibbles()
    }
    
    draw()
}
