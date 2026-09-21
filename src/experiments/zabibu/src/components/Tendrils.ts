import * as THREE from 'three';
import {
  MAIN_BRANCH_CURVE,
  BOTANICAL_COLORS,
  PALETTES,
} from '../config/constants';
import type { BotanicalPalette } from '../types';

export class Tendrils {
  public tendrilGroup: THREE.Group;
  public tendrilMaterial: THREE.ShaderMaterial;

  constructor(scene: THREE.Scene, baseShaderMaterial: THREE.ShaderMaterial) {
    this.tendrilGroup = new THREE.Group();

    const initialPalette = PALETTES[0];
    this.tendrilMaterial = baseShaderMaterial.clone();
    this.tendrilMaterial.uniforms = THREE.UniformsUtils.clone(
      baseShaderMaterial.uniforms
    );
    this.tendrilMaterial.side = THREE.DoubleSide;

    this.setTendrilColors(
      initialPalette.mode,
      BOTANICAL_COLORS.tendrilBase,
      BOTANICAL_COLORS.tendrilHighlight
    );

    this.createWrappingVine();

    this.createHangingTendrils();

    scene.add(this.tendrilGroup);
  }

  private createWrappingVine(): void {
    const vinePoints: THREE.Vector3[] = [];
    const steps = 140;
    const turns = 14;
    const radius = 0.16;

    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const pointOnBranch = MAIN_BRANCH_CURVE.getPoint(t);
      const tangent = MAIN_BRANCH_CURVE.getTangent(t).normalize();

      let up = new THREE.Vector3(0, 1, 0);
      if (Math.abs(tangent.y) > 0.9) up = new THREE.Vector3(1, 0, 0);
      const binormal = new THREE.Vector3()
        .crossVectors(tangent, up)
        .normalize();
      const normal = new THREE.Vector3()
        .crossVectors(binormal, tangent)
        .normalize();

      const angle = t * Math.PI * 2 * turns;
      const offsetX = Math.cos(angle) * radius;
      const offsetY = Math.sin(angle) * radius;

      const spiralPoint = pointOnBranch
        .clone()
        .add(normal.clone().multiplyScalar(offsetX))
        .add(binormal.clone().multiplyScalar(offsetY));

      vinePoints.push(spiralPoint);
    }

    const vineCurve = new THREE.CatmullRomCurve3(vinePoints);
    const vineGeo = new THREE.TubeGeometry(vineCurve, 120, 0.025, 6, false);
    const vineMesh = new THREE.Mesh(vineGeo, this.tendrilMaterial);
    this.tendrilGroup.add(vineMesh);
  }

  private createHangingTendrils(): void {
    const attachmentPoints = [
      { t: 0.12, length: 0.75, curlRadius: 0.18, turns: 2.2, dir: -1 },
      { t: 0.28, length: 0.9, curlRadius: 0.22, turns: 2.8, dir: 1 },
      { t: 0.42, length: 0.65, curlRadius: 0.15, turns: 1.8, dir: -1 },
      { t: 0.62, length: 0.85, curlRadius: 0.2, turns: 2.5, dir: 1 },
      { t: 0.82, length: 0.7, curlRadius: 0.16, turns: 2.0, dir: -1 },
    ];

    attachmentPoints.forEach((config) => {
      const origin = MAIN_BRANCH_CURVE.getPoint(config.t);
      const points: THREE.Vector3[] = [];
      const numPoints = 30;

      for (let i = 0; i <= numPoints; i++) {
        const progress = i / numPoints;
        const angle = progress * Math.PI * 2 * config.turns;
        const currentRadius = config.curlRadius * (1 - progress * 0.6);

        const x = origin.x + Math.sin(angle * config.dir) * currentRadius;
        const y = origin.y - progress * config.length;
        const z = origin.z + Math.cos(angle) * currentRadius * 0.7;

        points.push(new THREE.Vector3(x, y, z));
      }

      const tendrilCurve = new THREE.CatmullRomCurve3(points);
      const tendrilGeo = new THREE.TubeGeometry(
        tendrilCurve,
        28,
        0.02,
        6,
        false
      );
      const tendrilMesh = new THREE.Mesh(tendrilGeo, this.tendrilMaterial);
      this.tendrilGroup.add(tendrilMesh);
    });
  }

  public updatePalette(palette: BotanicalPalette): void {
    if (palette.mode === 0.0) {
      this.setTendrilColors(0.0, palette.stemBase, palette.stemHighlight);
    } else {
      this.setTendrilColors(
        1.0,
        BOTANICAL_COLORS.tendrilBase,
        BOTANICAL_COLORS.tendrilHighlight
      );
    }
  }

  private setTendrilColors(
    mode: number,
    baseHex: number,
    highlightHex: number
  ): void {
    this.tendrilMaterial.uniforms.uColorMode.value = mode;
    this.tendrilMaterial.uniforms.uBaseColor.value.setHex(baseHex);
    this.tendrilMaterial.uniforms.uHighlightColor.value.setHex(highlightHex);
  }
}
