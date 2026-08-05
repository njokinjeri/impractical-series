/* eslint-disable @typescript-eslint/no-explicit-any */
//Polyfill missing WebGPU constants for Firefox / WebGL2 fallback backend
if (typeof window !== 'undefined') {
  if (!(window as any).GPUShaderStage) {
    (window as any).GPUShaderStage = {
      VERTEX: 0x1,
      FRAGMENT: 0x2,
      COMPUTE: 0x4,
    };
  }
  if (!(window as any).GPUBufferUsage) {
    (window as any).GPUBufferUsage = {
      MAP_READ: 0x0001,
      MAP_WRITE: 0x0002,
      COPY_SRC: 0x0004,
      COPY_DST: 0x0008,
      INDEX: 0x0010,
      VERTEX: 0x0020,
      UNIFORM: 0x0040,
      STORAGE: 0x0080,
      INDIRECT: 0x0100,
      QUERY_RESOLVE: 0x0200,
    };
  }
}


import * as THREE from 'three/webgpu';
import { initScene } from './scene/sceneSetup';
import { createGeometries } from './scene/geometries';
import { createRefractalMaterial } from './shaders/refractalMaterial';
import { initPointerTracking } from './interaction/pointer';
import { setupControls } from './ui/controls';
import type { RefractalParams, ShapeType } from './types';

async function bootstrap() {
  const canvas = document.getElementById('canvas') as HTMLCanvasElement;
  const { scene, camera, renderer, controls } = await initScene(canvas);

  const geometries = createGeometries();
  const { material, uniforms } = createRefractalMaterial();

  const currentMesh = new THREE.Mesh(geometries.knot, material);
  scene.add(currentMesh);

  initPointerTracking(uniforms);

  const params: RefractalParams = {
    shape: 'knot',
    displacementScale: 0,
    frequency: 8.0,
    speed: 2.5,
    mouseInfluence: 0.3,
    colorA: '#0055ff',
    colorB: '#ff0055',
    transmission: 0.85,
    ior: 1.45,
  };

  setupControls(params, uniforms, material, (newShape: ShapeType) => {
    currentMesh.geometry = geometries[newShape];
  });

  function animate() {
    requestAnimationFrame(animate);

    currentMesh.rotation.y += 0.003;
    currentMesh.rotation.x += 0.001;

    controls.update();
    renderer.render(scene, camera);
  }

  animate();
}

bootstrap();
