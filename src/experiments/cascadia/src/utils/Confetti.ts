export class Confetti {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private particles: Particle[] = [];
  private animationId: number | null = null;
  private isRunning: boolean = false;
  private isActive: boolean = false;

  constructor() {
    this.canvas = document.createElement('canvas');
    this.canvas.style.position = 'fixed';
    this.canvas.style.top = '0';
    this.canvas.style.left = '0';
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
    this.canvas.style.pointerEvents = 'none';
    this.canvas.style.zIndex = '9999';
    this.ctx = this.canvas.getContext('2d')!;
    this.resize();
    window.addEventListener('resize', () => this.resize());
    document.body.appendChild(this.canvas);
  }

  private resize(): void {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  fire(count: number = 200): void {
    this.isActive = true;

    const colors = [
      '#ff6b6b',
      '#ffd93d',
      '#6bcb77',
      '#4d96ff',
      '#ff6bff',
      '#ff9f43',
      '#00d2d3',
      '#f368e0',
      '#ff4757',
      '#2ed573',
      '#1e90ff',
      '#ffa502',
      '#a29bfe',
      '#fd79a8',
      '#00cec9',
      '#fdcb6e',
    ];

    for (let i = 0; i < count; i++) {
      const color = colors[Math.floor(Math.random() * colors.length)];
      const x = Math.random() * this.canvas.width;
      const y = Math.random() * this.canvas.height * 0.3;
      const size = Math.random() * 8 + 4;
      const speedX = (Math.random() - 0.5) * 8;
      const speedY = Math.random() * 6 + 2;
      const rotation = Math.random() * 360;
      const rotationSpeed = (Math.random() - 0.5) * 12;
      const shape = Math.floor(Math.random() * 3);

      this.particles.push({
        x,
        y,
        size,
        speedX,
        speedY,
        rotation,
        rotationSpeed,
        color,
        shape,
        gravity: 0.12 + Math.random() * 0.08,
        wobble: Math.random() * 10,
        wobbleSpeed: 0.02 + Math.random() * 0.03,
      });
    }

    if (!this.isRunning) {
      this.isRunning = true;
      this.animate();
    }
  }

  private animate(): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    let hasParticles = false;

    for (const p of this.particles) {
      p.x += p.speedX;
      p.y += p.speedY;
      p.speedY += p.gravity;
      p.rotation += p.rotationSpeed;

      p.speedX += Math.sin(p.y * p.wobbleSpeed) * 0.04;

      // Bounce off walls
      if (p.x < 0 || p.x > this.canvas.width) {
        p.speedX *= -0.5;
        p.x = Math.max(0, Math.min(this.canvas.width, p.x));
      }

      // Reset particles that fall off the bottom
      if (p.y > this.canvas.height + 50) {
        p.y = -20 - Math.random() * 50;
        p.x = Math.random() * this.canvas.width;
        p.speedX = (Math.random() - 0.5) * 6;
        p.speedY = Math.random() * 4 + 2;
      }

      hasParticles = true;
      this.drawParticle(p);
    }

    if (hasParticles && this.isActive) {
      this.animationId = requestAnimationFrame(() => this.animate());
    } else {
      this.isRunning = false;
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }

  private drawParticle(p: Particle): void {
    this.ctx.save();
    this.ctx.translate(p.x, p.y);
    this.ctx.rotate((p.rotation * Math.PI) / 180);
    this.ctx.globalAlpha = 0.9;

    const size = p.size;
    this.ctx.fillStyle = p.color;

    switch (p.shape) {
      case 0:
        this.ctx.beginPath();
        this.ctx.arc(0, 0, size / 2, 0, Math.PI * 2);
        this.ctx.fill();
        break;
      case 1:
        this.ctx.fillRect(-size / 2, -size / 2, size, size);
        break;
      case 2:
        this.ctx.beginPath();
        this.ctx.moveTo(0, -size / 2);
        this.ctx.lineTo(-size / 2, size / 2);
        this.ctx.lineTo(size / 2, size / 2);
        this.ctx.closePath();
        this.ctx.fill();
        break;
    }

    this.ctx.restore();
  }

  stop(): void {
    this.isActive = false;
    this.particles = [];
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
    this.isRunning = false;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  dispose(): void {
    this.stop();
    if (this.canvas.parentNode) {
      this.canvas.parentNode.removeChild(this.canvas);
    }
  }
}

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  rotation: number;
  rotationSpeed: number;
  color: string;
  shape: number;
  gravity: number;
  wobble: number;
  wobbleSpeed: number;
}
