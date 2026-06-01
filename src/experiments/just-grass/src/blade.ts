export interface BladeOptions {
  x: number
  baseY: number
  height: number
  width: number
  lean: number
  colorSeed: number
  phase: number
  growthTarget: number
  currentHeight: number
}

export class GrassBlade {
  x: number
  baseY: number
  height: number
  width: number
  lean: number
  colorSeed: number
  phase: number
  growthTarget: number
  currentHeight: number
  velocity: number = 0
  displacement: number = 0
  damping: number
  stiffness: number
  growthRate: number

  private cRoot: string
  private cMid: string
  private cTip: string
  private cShad: string
  private cHl: string
  private midribColor: string

  static bez(t: number, p0: number, p1: number, p2: number, p3: number): number {
    const m = 1 - t
    return m*m*m*p0 + 3*m*m*t*p1 + 3*m*t*t*p2 + t*t*t*p3
  }

  static controlPoints(bx: number, by: number, h: number, tipDisp: number) {
    const sign = tipDisp >= 0 ? 1 : -1
    const absTip = Math.abs(tipDisp)
    const cp1off = sign * absTip * 0.10
    const cp2off = sign * Math.min(absTip * 0.55, absTip * 0.88)
    return {
      cp1x: bx + cp1off,  cp1y: by - h * 0.33,
      cp2x: bx + cp2off,  cp2y: by - h * 0.72,
      tx: bx + tipDisp, ty:   by - h,    
    }
  }

  constructor(opts: BladeOptions) {
    this.x = opts.x
    this.baseY = opts.baseY
    this.height = opts.height
    this.width = opts.width
    this.lean = opts.lean
    this.colorSeed = opts.colorSeed
    this.phase = opts.phase
    this.growthTarget = opts.growthTarget
    this.currentHeight = opts.currentHeight
    this.damping = 0.88 + Math.random() * 0.06
    this.stiffness = 0.10 + Math.random() * 0.04
    this.growthRate = 18 + Math.random() * 16

    const t  = opts.colorSeed
    const rH = 108 + t * 14 | 0, rS = 52 + t * 12 | 0, rL = 16 + t * 7  | 0
    const tH = 86  + t * 24 | 0, tS = 62 + t * 18 | 0, tL = 40 + t * 16 | 0
    this.cRoot = `hsl(${rH},${rS}%,${rL}%)`
    this.cMid = `hsl(${rH+4},${rS+7}%,${rL+9}%)`
    this.cTip = `hsl(${tH},${tS}%,${tL}%)`
    this.cShad = `hsla(${rH-10},50%,4%,0.46)`
    this.cHl = `hsla(${tH},70%,82%,0.13)`
    this.midribColor = `hsla(${rH+8},38%,6%,0.52)`
  }

  applyForce(force: number) {
    this.velocity += force
  }

  update(dt: number, windStrength: number, time: number) {
    // Height growth/shrink toward target
    if (this.currentHeight < this.growthTarget) {
      this.currentHeight += dt * this.growthRate
      if (this.currentHeight > this.growthTarget) this.currentHeight = this.growthTarget
    } else if (this.currentHeight > this.growthTarget) {
      this.currentHeight -= dt * 4
      if (this.currentHeight < this.growthTarget) this.currentHeight = this.growthTarget
    }

    let windForce = 0
    if (windStrength > 0) {
      const wave  = Math.sin(time * 1.4 + this.x * 0.004 + this.phase)
      const micro = Math.sin(time * 3.2 + this.x * 0.011 + this.phase * 1.3) * 0.3
      windForce = (wave + micro) * windStrength
    }

    const heightFactor = Math.min(1, this.currentHeight / 60) // full effect by 60px
    const ambient = (Math.sin(time * 0.9  + this.x * 0.003 + this.phase)       * 0.32
                   + Math.sin(time * 1.7  + this.x * 0.007 + this.phase * 1.4) * 0.14)
                   * (0.3 + heightFactor * 0.7) // 30% amplitude even at zero height

    const spring = -this.stiffness * this.displacement
    const damp   = -(1.0 - this.damping) * this.velocity
    this.velocity     += (spring + damp + windForce + ambient) * dt * 60
    this.displacement += this.velocity * dt * 60

    const maxDisp = this.currentHeight * 0.42
    if (this.displacement >  maxDisp) { this.displacement =  maxDisp; this.velocity = Math.min(this.velocity, 0) }
    if (this.displacement < -maxDisp) { this.displacement = -maxDisp; this.velocity = Math.max(this.velocity, 0) }
  }

  draw(ctx: CanvasRenderingContext2D) {
    const h = this.currentHeight
    if (h < 4) return

    const tipDisp = this.displacement + this.lean * h * 0.3
    const bx = this.x, by = this.baseY
    const { cp1x, cp1y, cp2x, cp2y, tx, ty } =
      GrassBlade.controlPoints(bx, by, h, tipDisp)

    const hw    = this.width
    const STEPS = 10
    const left: [number, number][] = []
    const right: [number, number][] = []
    const spine: [number, number][] = []

    for (let i = 0; i <= STEPS; i++) {
      const f  = i / STEPS
      const sx = GrassBlade.bez(f, bx, cp1x, cp2x, tx)
      const sy = GrassBlade.bez(f, by, cp1y, cp2y, ty)
      spine.push([sx, sy])

      let w: number
      if (f < 0.55) w = hw * (1.0   - f * 0.12)
      else if (f < 0.74) w = hw * (0.934 + (f - 0.55) * 0.38)
      else w = hw * (1.006 - (f - 0.74) * 4.8)
      w = Math.max(w, 0)

      let tanx: number, tany: number
      if (i < STEPS) {
        tanx = GrassBlade.bez(f + 0.01, bx, cp1x, cp2x, tx) - sx
        tany = GrassBlade.bez(f + 0.01, by, cp1y, cp2y, ty) - sy
      } else {
        tanx = sx - spine[i - 1][0]
        tany = sy - spine[i - 1][1]
      }
      const tl = Math.sqrt(tanx * tanx + tany * tany) || 1
      const nx = -tany / tl, ny = tanx / tl
      left.push ([sx - nx * w, sy - ny * w])
      right.push([sx + nx * w, sy + ny * w])
    }

    // Body
    const grad = ctx.createLinearGradient(bx, by, tx, ty)
    grad.addColorStop(0, this.cRoot)
    grad.addColorStop(0.45, this.cMid)
    grad.addColorStop(1, this.cTip)
    ctx.beginPath()
    ctx.moveTo(left[0][0], left[0][1])
    for (let i = 1; i < left.length; i++) ctx.lineTo(left[i][0], left[i][1])
    ctx.lineTo(tx, ty)
    for (let i = right.length - 1; i >= 0; i--) ctx.lineTo(right[i][0], right[i][1])
    ctx.closePath()
    ctx.fillStyle = grad
    ctx.fill()

    ctx.beginPath()
    ctx.moveTo(spine[0][0], spine[0][1])
    for (let i = 1; i < spine.length; i++) ctx.lineTo(spine[i][0], spine[i][1])
    ctx.lineTo(tx, ty)
    for (let i = left.length - 1; i >= 0; i--) ctx.lineTo(left[i][0], left[i][1])
    ctx.closePath()
    ctx.fillStyle = this.cHl
    ctx.fill()

    ctx.beginPath()
    ctx.moveTo(spine[0][0], spine[0][1])
    for (let i = 1; i < spine.length; i++) ctx.lineTo(spine[i][0], spine[i][1])
    ctx.lineTo(tx, ty)
    for (let i = right.length - 1; i >= 0; i--) ctx.lineTo(right[i][0], right[i][1])
    ctx.closePath()
    ctx.fillStyle = this.cShad
    ctx.fill()

    ctx.beginPath()
    ctx.moveTo(bx, by)
    ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, tx, ty)
    ctx.strokeStyle = this.midribColor
    ctx.lineWidth = Math.max(0.5, hw * 0.16)
    ctx.stroke()
  }
}