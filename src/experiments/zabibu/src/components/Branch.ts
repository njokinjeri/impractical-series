import * as THREE from 'three';
import { MAIN_BRANCH_CURVE, RACHIS_CURVE } from '../config/constants';

export class Branch {
  public branchMesh: THREE.Mesh;
  public rachisMesh: THREE.Mesh;
  public woodMaterial: THREE.ShaderMaterial;

  constructor(scene: THREE.Scene, baseShaderMaterial: THREE.ShaderMaterial) {
    this.woodMaterial = baseShaderMaterial.clone();
    this.woodMaterial.uniforms = THREE.UniformsUtils.clone(baseShaderMaterial.uniforms);
    this.woodMaterial.side = THREE.DoubleSide;

    const branchGeo = new THREE.TubeGeometry(MAIN_BRANCH_CURVE, 64, 0.13, 10, false);
    this.branchMesh = new THREE.Mesh(branchGeo, this.woodMaterial);
    scene.add(this.branchMesh);

    const rachisGeo = new THREE.TubeGeometry(RACHIS_CURVE, 24, 0.05, 8, false);
    this.rachisMesh = new THREE.Mesh(rachisGeo, this.woodMaterial);
    scene.add(this.rachisMesh);
  }

  public updatePalette(mode: number, stemBase: number, stemHighlight: number) {
    this.woodMaterial.uniforms.uColorMode.value = mode;
    this.woodMaterial.uniforms.uBaseColor.value.setHex(stemBase);
    this.woodMaterial.uniforms.uHighlightColor.value.setHex(stemHighlight);
  }
}