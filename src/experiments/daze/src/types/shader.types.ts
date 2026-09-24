export type PaletteMode = 0 | 1 | 2;
export interface ShaderUniforms {
  uResolution: WebGLUniformLocation | null;
  uTime: WebGLUniformLocation | null;
  uTouch: WebGLUniformLocation | null;
  uTouchDelta: WebGLUniformLocation | null;
  uTouchActive: WebGLUniformLocation | null;
  uGrain: WebGLUniformLocation | null;
  uPalette: WebGLUniformLocation | null;
  uPatternIndex: WebGLUniformLocation | null;
}
