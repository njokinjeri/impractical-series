import GUI from 'lil-gui';
import * as THREE from 'three/webgpu';
import type { RefractalParams, ShaderUniforms, ShapeType } from '../types';

export function setupControls(
  params: RefractalParams,
  uniforms: ShaderUniforms,
  material: THREE.MeshPhysicalNodeMaterial,
  onShapeChange: (newShape: ShapeType) => void
): GUI {
  const gui = new GUI({ title: 'Refractal Lab' });

  gui
    .add(params, 'shape', {
      'Knot': 'knot',
      'Blob Cluster': 'blob',
      'Torus': 'torus',
      'Trefoil': 'trefoil',
      'Lissajous': 'lissajous',
    })
    .name('Topology')
    .onChange(onShapeChange);

  const waveFolder = gui.addFolder('TSL Wave Math');
  waveFolder
    .add(params, 'displacementScale', 0.0, 0.25, 0.01)
    .name('Scale')
    .onChange((v: number) => (uniforms.uDisplacementScale.value = v));
  waveFolder
    .add(params, 'frequency', 1.0, 20.0, 0.5)
    .name('Frequency')
    .onChange((v: number) => (uniforms.uFrequency.value = v));
  waveFolder
    .add(params, 'speed', 0.0, 8.0, 0.1)
    .name('Speed')
    .onChange((v: number) => (uniforms.uSpeed.value = v));
  waveFolder
    .add(params, 'mouseInfluence', 0.0, 1.0, 0.05)
    .name('Cursor Ripple')
    .onChange((v: number) => (uniforms.uMouseInfluence.value = v));

  const glassFolder = gui.addFolder('Glass Aesthetics');
  glassFolder
    .addColor(params, 'colorA')
    .name('Color A')
    .onChange((v: string) => uniforms.uColorA.value.set(v));
  glassFolder
    .addColor(params, 'colorB')
    .name('Color B')
    .onChange((v: string) => uniforms.uColorB.value.set(v));
  glassFolder
    .add(params, 'transmission', 0.0, 1.0, 0.05)
    .name('Transmission')
    .onChange((v: number) => (material.transmission = v));
  glassFolder
    .add(params, 'ior', 1.0, 2.33, 0.01)
    .name('IOR (Refraction)')
    .onChange((v: number) => (material.thickness = v));

  gui.open();
  return gui;
}
