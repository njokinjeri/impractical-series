import * as THREE from 'three';
import type { EngineSettings } from '../config/settings';

export class MaterialManager {
  public lineMaterial: THREE.LineBasicMaterial;
  public pointMaterial: THREE.PointsMaterial;

  constructor(settings: EngineSettings) {
    const initialColor = new THREE.Color(settings.color);

    this.lineMaterial = new THREE.LineBasicMaterial({
      color: initialColor,
      transparent: true,
      opacity: settings.lineOpacity,
      side: THREE.DoubleSide,
    });

    this.pointMaterial = new THREE.PointsMaterial({
      color: initialColor,
      size: settings.particleSize,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.9,
      side: THREE.DoubleSide,
    });
  }

  public setColor(colorHex: string): void {
    this.lineMaterial.color.set(colorHex);
    this.pointMaterial.color.set(colorHex);
  }

  public setLineOpacity(opacity: number): void {
    this.lineMaterial.opacity = opacity;
  }

  public setParticleSize(size: number): void {
    this.pointMaterial.size = size;
  }

  public dispose(): void {
    this.lineMaterial.dispose();
    this.pointMaterial.dispose();
  }
}