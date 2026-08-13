import * as THREE from 'three';
import type { TunnelSettings } from '../config/settings';

export class MaterialManager {
  public lineMaterial: THREE.LineBasicMaterial;
  public particleMaterial: THREE.PointsMaterial;

  constructor(settings: TunnelSettings) {
    const initialColor = new THREE.Color(settings.color);

    this.lineMaterial = new THREE.LineBasicMaterial({
      color: initialColor,
      transparent: true,
      opacity: settings.lineOpacity,
    });

    this.particleMaterial = new THREE.PointsMaterial({
      color: initialColor,
      size: settings.particleSize,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.9,
    });
  }

  public updateColor(colorStr: string): void {
    this.lineMaterial.color.set(colorStr);
    this.particleMaterial.color.set(colorStr);
  }

  public setDoubleSided(doubleSided: boolean): void {
    const side = doubleSided ? THREE.DoubleSide : THREE.FrontSide;
    this.lineMaterial.side = side;
    this.particleMaterial.side = side;
  }
}
