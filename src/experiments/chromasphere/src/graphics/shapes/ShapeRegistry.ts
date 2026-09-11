import * as THREE from 'three';
import { Cube } from './Cube';
import { Star } from './Star';
import { Spiked } from './Spiked';
import type { ShapeMode, ColorMode } from '../../types/state';

export class ShapeRegistry {
  readonly cube: Cube;
  readonly star: Star;
  readonly spiked: Spiked;

  readonly mainMesh: THREE.Mesh;
  private current: ShapeMode = 'cube';

  constructor(glassMaterial: THREE.Material, mobile = false) {
    this.cube = new Cube(glassMaterial, mobile);
    this.spiked = new Spiked(glassMaterial, mobile);
    this.star = new Star(glassMaterial, mobile);

    this.mainMesh = new THREE.Mesh(this.cube.geometry, glassMaterial);

    this.applyMode('cube');
  }

  private applyMode(mode: ShapeMode) {
    this.current = mode;

    const glass = this.mainMesh.material as THREE.MeshPhysicalMaterial;

    switch (mode) {
      case 'cube':
        this.mainMesh.geometry = this.cube.geometry;
        this.mainMesh.visible = true;
        this.cube.group.visible = true;
        this.spiked.group.visible = false;
        this.star.group.visible = false;
        glass.depthWrite = true;
        break;

      case 'star':
        this.mainMesh.geometry = this.star.geometry;
        this.mainMesh.visible = true;
        this.cube.group.visible = false;
        this.spiked.group.visible = false;
        this.star.group.visible = true;
        glass.depthWrite = true;
        break;

      case 'spiked':
        this.mainMesh.geometry = this.spiked.geometry;
        this.mainMesh.visible = true;
        this.cube.group.visible = false;
        this.spiked.group.visible = true;
        this.star.group.visible = false;
        glass.depthWrite = true;
        break;
    }

    glass.needsUpdate = true;
  }

  setShape(mode: ShapeMode) {
    this.applyMode(mode);
  }

  setColorMode(_mode: ColorMode) {
  }

  getActiveChildren(): THREE.Object3D[] {
    switch (this.current) {
      case 'cube':
        return [this.mainMesh, this.cube.group];
      case 'star':
        return [this.mainMesh, this.star.group];
      case 'spiked':
        return [this.mainMesh, this.spiked.group];
    }
  }

  update(elapsed: number, freq: number, bass: number) {
    if (this.current === 'cube') {
      this.cube.update(elapsed, freq, bass);
    }

    if (this.current === 'spiked') {
      this.spiked.update(elapsed, freq, bass);
    }

    if (this.current === 'star') {
      this.star.update(elapsed, freq, bass);
    }
  }
}