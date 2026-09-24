import type { ShaderUniforms } from '../types/shader.types';

export class ShaderProgram {
  private gl: WebGLRenderingContext;
  public program: WebGLProgram | null = null;
  public uniforms: ShaderUniforms = {
    uResolution: null,
    uTime: null,
    uTouch: null,
    uTouchDelta: null,
    uTouchActive: null,
    uGrain: null,
    uPalette: null,
    uPatternIndex: null,
  };

  constructor(
    gl: WebGLRenderingContext,
    vertSource: string,
    fragSource: string
  ) {
    this.gl = gl;
    this.init(vertSource, fragSource);
  }

  private compileShader(type: number, source: string): WebGLShader | null {
    const shader = this.gl.createShader(type);
    if (!shader) return null;
    this.gl.shaderSource(shader, source);
    this.gl.compileShader(shader);

    if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
      console.error(
        'Shader compilation error:',
        this.gl.getShaderInfoLog(shader)
      );
      this.gl.deleteShader(shader);
      return null;
    }
    return shader;
  }

  public init(vertSource: string, fragSource: string): void {
    const vert = this.compileShader(this.gl.VERTEX_SHADER, vertSource);
    const frag = this.compileShader(this.gl.FRAGMENT_SHADER, fragSource);
    if (!vert || !frag) return;

    const prog = this.gl.createProgram();
    if (!prog) return;

    this.gl.attachShader(prog, vert);
    this.gl.attachShader(prog, frag);
    this.gl.linkProgram(prog);

    if (!this.gl.getProgramParameter(prog, this.gl.LINK_STATUS)) {
      console.error('Program linking error:', this.gl.getProgramInfoLog(prog));
      return;
    }

    this.program = prog;
    this.cacheUniforms();
  }

  private cacheUniforms(): void {
    if (!this.program) return;
    this.uniforms = {
      uResolution: this.gl.getUniformLocation(this.program, 'uResolution'),
      uTime: this.gl.getUniformLocation(this.program, 'uTime'),
      uTouch: this.gl.getUniformLocation(this.program, 'uTouch'),
      uTouchDelta: this.gl.getUniformLocation(this.program, 'uTouchDelta'),
      uTouchActive: this.gl.getUniformLocation(this.program, 'uTouchActive'),
      uGrain: this.gl.getUniformLocation(this.program, 'uGrain'),
      uPalette: this.gl.getUniformLocation(this.program, 'uPalette'),
      uPatternIndex: this.gl.getUniformLocation(this.program, 'uPatternIndex'),
    };
  }

  public use(): void {
    if (this.program) {
      this.gl.useProgram(this.program);
    }
  }

  public dispose(): void {
    if (this.program) {
      this.gl.deleteProgram(this.program);
      this.program = null;
    }
  }
}
