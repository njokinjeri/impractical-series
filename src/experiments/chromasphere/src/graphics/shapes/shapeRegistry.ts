import * as THREE from 'three';
import { SimplexNoise } from 'three/addons/math/SimplexNoise.js';
import { Cluster } from './Cluster';
import { Ribbon } from './Ribbon';
import { Spiked } from './Spiked';
import type { ShapeMode, ColorMode, Palette } from '../../types/state';
import vertSrc from '../shaders/dispersion.vert?raw';
import fragSrc from '../shaders/dispersion.frag?raw';

const simplex = new SimplexNoise();

export interface CoreStarUniforms {
  uTime: { value: number };
  uAudioFreq: { value: number };
  uColorPrimary: { value: THREE.Color };
  uColorSecondary: { value: THREE.Color };
}

export class ShapeRegistry {
  readonly cluster: Cluster;
  readonly ribbon: Ribbon;
  readonly spiked: Spiked;

  readonly mainMesh: THREE.Mesh;
  readonly coreStar: THREE.Mesh;
  readonly coreStarGeometry: THREE.SphereGeometry;
  readonly coreStarBase: Float32Array;
  readonly coreUniforms: CoreStarUniforms;

  private current: ShapeMode = 'cluster';
  private colorMode: ColorMode = 'dark';

  constructor(
    glassMaterial: THREE.Material,
    palette: Palette,
  ) {
    this.cluster = new Cluster(glassMaterial);
    this.ribbon = new Ribbon();
    this.spiked = new Spiked();

    this.mainMesh = new THREE.Mesh(this.cluster.geometry, glassMaterial);

    this.coreStarGeometry = this.buildCoreGeometry();
    this.coreStarBase =
      this.coreStarGeometry.attributes.position.array.slice() as Float32Array;

    this.coreUniforms = {
      uTime: { value: 0 },
      uAudioFreq: { value: 0.1 },
      uColorPrimary:   { value: palette.mid.clone() },
      uColorSecondary: { value: palette.pastel.clone() },
    };

    const coreMat = new THREE.ShaderMaterial({
      uniforms: this.coreUniforms as unknown as { [k: string]: THREE.IUniform },
      vertexShader: vertSrc,
      fragmentShader: fragSrc,
      transparent: true,
      depthWrite: true,
      depthTest: true,
      blending: THREE.AdditiveBlending,
      side: THREE.FrontSide,
    });

    this.coreStar = new THREE.Mesh(this.coreStarGeometry, coreMat);
    this.coreStar.visible = false;

    this.applyMode('cluster');
  }

  private buildCoreGeometry(): THREE.SphereGeometry {
    const CORE_BASE_RADIUS = 0.62;
    const geo = new THREE.SphereGeometry(CORE_BASE_RADIUS, 64, 64);
    const pos = geo.attributes.position;
    const v = new THREE.Vector3();

    for (let i = 0; i < pos.count; i++) {
      v.fromBufferAttribute(pos, i).normalize();

      const n1 = simplex.noise3d(v.x * 1.6, v.y * 1.6, v.z * 1.6) * 0.30;
      const n2 = simplex.noise3d(v.x * 3.6, v.y * 3.6, v.z * 3.6) * 0.09;
      const r = CORE_BASE_RADIUS * (1.0 + n1 + n2);

      pos.setXYZ(i, v.x * r, v.y * r, v.z * r);
    }
    geo.computeVertexNormals();
    return geo;
  }

  private applyMode(mode: ShapeMode) {
    this.current = mode;

    const glass = this.mainMesh.material as THREE.MeshPhysicalMaterial;

    switch (mode) {
      case 'cluster':
        this.mainMesh.geometry = this.cluster.geometry;
        this.cluster.group.visible = true;
        this.coreStar.visible = false;
        glass.depthWrite = true;
        break;

      case 'ribbon':
        this.mainMesh.geometry = this.ribbon.geometry;
        this.cluster.group.visible = false;
        this.coreStar.visible = true;
        glass.depthWrite = false;
        break;

      case 'spiked':
        this.mainMesh.geometry = this.spiked.geometry;
        this.cluster.group.visible = false;
        this.coreStar.visible = false;
        glass.depthWrite = true;
        break;
    }

    glass.needsUpdate = true;
  }

  setShape(mode: ShapeMode) {
    this.applyMode(mode);
  }

  setColorMode(mode: ColorMode) {
    this.colorMode = mode;
    const mat = this.coreStar.material as THREE.ShaderMaterial;
    mat.blending = (mode === 'dark') ? THREE.AdditiveBlending : THREE.NormalBlending;
    mat.needsUpdate = true;
  }

  setPalette(palette: Palette) {
    this.coreUniforms.uColorPrimary.value.copy(palette.mid);
    this.coreUniforms.uColorSecondary.value.copy(palette.pastel);
  }

  getActiveChildren(): THREE.Object3D[] {
    switch (this.current) {
      case 'cluster':
        return [this.mainMesh, this.cluster.group];
      case 'ribbon':
        return [this.mainMesh, this.coreStar];
      case 'spiked':
        return [this.mainMesh];
    }
  }

  update(elapsed: number, freq: number) {
    this.coreUniforms.uTime.value = elapsed;

    if (this.current === 'cluster') {
      this.cluster.update(elapsed, freq);
    }

    if (this.current === 'ribbon') {
      const pos = this.coreStarGeometry.attributes.position;
      const base = this.coreStarBase;

      const audioAmp = Math.min(freq * 2.0, 0.6);
      const waveAmp = 0.13 * (1.0 + audioAmp);

      for (let i = 0; i < pos.count; i++) {
        const sx = base[i * 3];
        const sy = base[i * 3 + 1];
        const sz = base[i * 3 + 2];

        const len = Math.hypot(sx, sy, sz) || 1;
        const nx = sx / len, ny = sy / len, nz = sz / len;

        const n = simplex.noise3d(
          sx * 2.0 + elapsed * 0.8,
          sy * 2.0 + elapsed * 0.9,
          sz * 2.0,
        );

        const d = n * waveAmp;
        pos.setXYZ(i, sx + nx * d, sy + ny * d, sz + nz * d);
      }
      pos.needsUpdate = true;
      this.coreStarGeometry.computeVertexNormals();
    }
  }
}