/* eslint-disable @typescript-eslint/no-explicit-any */
import * as THREE from 'three/webgpu';

export type ShapeType = 'knot' | 'blob' | 'torus' | 'trefoil' | 'lissajous';

export interface RefractalParams {
  shape: ShapeType;
  displacementScale: number;
  frequency: number;
  speed: number;
  mouseInfluence: number;
  colorA: string;
  colorB: string;
  transmission: number;
  ior: number;
}

export interface ShaderUniforms {
  uDisplacementScale: any;
  uFrequency: any;
  uSpeed: any;
  uMouseInfluence: any;
  uMousePos: any;
  uColorA: any;
  uColorB: any;
}