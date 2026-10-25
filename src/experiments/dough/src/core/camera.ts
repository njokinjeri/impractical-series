import * as THREE from 'three';

export function createCamera(): THREE.PerspectiveCamera {
  const camera = new THREE.PerspectiveCamera(
    38,
    innerWidth / innerHeight,
    0.1,
    100
  );
  camera.position.set(0, 0.5, 5.6);
  return camera;
}
