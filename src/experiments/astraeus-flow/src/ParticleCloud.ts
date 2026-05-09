import * as THREE from 'three';
import { createNoise3D } from 'simplex-noise';

export class ParticleCloud {
  private scene: THREE.Scene;
  private config: any;
  private noise = createNoise3D();
  private positions: Float32Array;
  private velocities: Float32Array;
  private homes: Float32Array;
  private geometry: THREE.BufferGeometry;
  private count: number;
  
  public motionLevel: number = 0;

  constructor(scene: THREE.Scene, config: any) {
    this.scene = scene;
    this.config = config;
    this.count = config.particleCount;
    
    this.positions = new Float32Array(this.count * 3);
    this.velocities = new Float32Array(this.count * 3);
    this.homes = new Float32Array(this.count * 3);
    this.geometry = new THREE.BufferGeometry();
    
    this.init();
  }

  private init() {
    for (let i = 0; i < this.count; i++) {
      const i3 = i * 3;
      const radius = 25 + Math.random() * 5; 
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      this.homes[i3] = radius * Math.sin(phi) * Math.cos(theta);
      this.homes[i3+1] = radius * Math.sin(phi) * Math.sin(theta);
      this.homes[i3+2] = radius * Math.cos(phi);

      this.positions[i3] = this.homes[i3];
      this.positions[i3+1] = this.homes[i3+1];
      this.positions[i3+2] = this.homes[i3+2];
    }

    this.geometry.setAttribute('position', new THREE.BufferAttribute(this.positions, 3));
    const mat = new THREE.PointsMaterial({
      color: 0x00ff88,
      size: 0.14,
      blending: THREE.AdditiveBlending,
      transparent: true,
      depthWrite: false,
      sizeAttenuation: true
    });

    this.scene.add(new THREE.Points(this.geometry, mat));
  }

  update(time: number, interaction: any) {
    const { explosionForce, collapseSpeed, noiseScale } = this.config;
    let totalMotion = 0;

    for (let i = 0; i < this.count; i++) {
      const i3 = i * 3;

      const dx = this.positions[i3] - interaction.mouse.x;
      const dy = this.positions[i3+1] - interaction.mouse.y;
      const dz = this.positions[i3+2] - interaction.mouse.z;
      const distSq = dx*dx + dy*dy + dz*dz;

      if (distSq < 1000) {
        const dist = Math.sqrt(distSq) + 0.1;
        const force = (1.0 - dist / 32) * explosionForce;
        if (force > 0) {
          this.velocities[i3] += (dx / dist) * force;
          this.velocities[i3+1] += (dy / dist) * force;
          this.velocities[i3+2] += (dz / dist) * force;
        }
      }

      const hx = this.homes[i3] - this.positions[i3];
      const hy = this.homes[i3+1] - this.positions[i3+1];
      const hz = this.homes[i3+2] - this.positions[i3+2];
      
      this.velocities[i3] += hx * collapseSpeed;
      this.velocities[i3+1] += hy * collapseSpeed;
      this.velocities[i3+2] += hz * collapseSpeed;

      const n = this.noise(this.positions[i3] * 0.05, this.positions[i3+1] * 0.05, time);
      this.velocities[i3] += n * noiseScale;

      this.velocities[i3] *= 0.95;
      this.velocities[i3+1] *= 0.95;
      this.velocities[i3+2] *= 0.95;

      this.positions[i3] += this.velocities[i3];
      this.positions[i3+1] += this.velocities[i3+1];
      this.positions[i3+2] += this.velocities[i3+2];

      totalMotion += Math.abs(this.velocities[i3]) + Math.abs(this.velocities[i3+1]);
    }

    this.motionLevel = totalMotion / this.count;
    this.geometry.attributes.position.needsUpdate = true;
  }
}