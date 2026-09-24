export class Renderer {
  public canvas: HTMLCanvasElement;
  public gl: WebGLRenderingContext;
  private positionBuffer: WebGLBuffer | null = null;

  constructor(canvasId: string) {
    const canvasEl = document.getElementById(canvasId) as HTMLCanvasElement;
    if (!canvasEl) {
      throw new Error(`Canvas with id "${canvasId}" not found.`);
    }
    this.canvas = canvasEl;

    const context =
      this.canvas.getContext('webgl') ||
      this.canvas.getContext('experimental-webgl');
    if (!context) {
      throw new Error('WebGL is not supported in this browser.');
    }
    this.gl = context as WebGLRenderingContext;

    this.initBuffers();
    this.resize();
    window.addEventListener('resize', () => this.resize());
  }

  private initBuffers(): void {
    this.positionBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer);

    const positions = new Float32Array([
      -1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1,
    ]);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, positions, this.gl.STATIC_DRAW);
  }

  public resize(): void {
    const dpr = Math.min(window.devicePixelRatio, 1.5);
    this.canvas.width = window.innerWidth * dpr;
    this.canvas.height = window.innerHeight * dpr;
    this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
  }

  public bindQuad(attributeLocation: number): void {
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer);
    this.gl.enableVertexAttribArray(attributeLocation);
    this.gl.vertexAttribPointer(
      attributeLocation,
      2,
      this.gl.FLOAT,
      false,
      0,
      0
    );
  }

  public draw(): void {
    this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);
  }
}
