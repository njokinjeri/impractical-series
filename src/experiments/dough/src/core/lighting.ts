import * as THREE from 'three';

export type LightingPreset =
  'warm' | 'pink' | 'chrome' | 'chocolate' | 'relic' | 'space' | 'ice';

export function createLighting(
  parent: THREE.Object3D,
  preset: LightingPreset
): void {
  switch (preset) {
    case 'warm':
      parent.add(new THREE.AmbientLight(0xfff4f8, 0.55));
      parent.add(new THREE.HemisphereLight(0xfff0f5, 0xd9a066, 0.55));
      addDirectional(parent, 0xfff2e8, 1.8, [4, 7, 5]);
      addDirectional(parent, 0xff90c0, 0.7, [-4, 2, -5]);
      addDirectional(parent, 0xffe0d0, 0.5, [-3, -3, 3]);
      break;

    case 'pink':
      parent.add(new THREE.AmbientLight(0xffffff, 0.35));
      parent.add(new THREE.HemisphereLight(0xffd0e8, 0xaa5599, 0.7));
      addDirectional(parent, 0xffd0e0, 1.4, [4, 6, 5]);
      addDirectional(parent, 0xff88c8, 0.6, [-4, 2, -5]);
      break;

    case 'chrome':
      parent.add(new THREE.AmbientLight(0xffffff, 0.12));
      addDirectional(parent, 0xffffff, 0.6, [4, 6, 5]);
      addDirectional(parent, 0xaaccff, 0.4, [-5, 1, -5]);
      break;

    case 'chocolate':
      parent.add(new THREE.AmbientLight(0xfff0e0, 0.55));
      parent.add(new THREE.HemisphereLight(0xfff0e0, 0xb87840, 0.7));
      addDirectional(parent, 0xfff0d8, 2.2, [4, 7, 5]);
      addDirectional(parent, 0xffc880, 0.6, [-4, 2, -5]);
      addDirectional(parent, 0xffe0c0, 0.4, [-3, -3, 3]);
      addPoint(parent, 0xffc890, 0.8, [0, -1.8, 0]);
      break;

    case 'relic':
      parent.add(new THREE.AmbientLight(0xb8c8a8, 1.0));
      parent.add(new THREE.HemisphereLight(0xc8d8b8, 0x2a3a1a, 0.6));
      addDirectional(parent, 0xfff4d0, 3.2, [3, 8, 4], true);
      addDirectional(parent, 0xa07a4a, 0.8, [5, -2, 4]);
      addDirectional(parent, 0x6a8a7a, 0.6, [-5, 2, -4]);
      break;

    case 'space':
      parent.add(new THREE.AmbientLight(0x8899cc, 0.35));
      addDirectional(parent, 0xffffff, 2.2, [5, 8, 5]);
      addDirectional(parent, 0x88aaff, 1.4, [-5, 3, -5]);
      addDirectional(parent, 0xccbbff, 0.4, [-3, -3, 3]);
      break;

    case 'ice':
      parent.add(new THREE.AmbientLight(0xccddee, 0.6));
      parent.add(new THREE.HemisphereLight(0xe0f4ff, 0x3366aa, 0.8));
      addDirectional(parent, 0xffffff, 3.0, [5, 8, 5]);
      addDirectional(parent, 0x88ccff, 1.5, [-5, 3, -5]);
      addDirectional(parent, 0xaaddff, 0.8, [0, -4, 0]);
      break;
  }
}

function addDirectional(
  parent: THREE.Object3D,
  color: number,
  intensity: number,
  position: [number, number, number],
  castShadow = false
): void {
  const light = new THREE.DirectionalLight(color, intensity);
  light.position.set(...position);

  if (castShadow) {
    light.castShadow = true;
    light.shadow.mapSize.set(2048, 2048);
    light.shadow.camera.near = 1;
    light.shadow.camera.far = 20;
    light.shadow.camera.left = -3;
    light.shadow.camera.right = 3;
    light.shadow.camera.top = 3;
    light.shadow.camera.bottom = -3;
    light.shadow.bias = -0.0005;
    light.shadow.radius = 4;
  }

  parent.add(light);
}

function addPoint(
  parent: THREE.Object3D,
  color: number,
  intensity: number,
  position: [number, number, number]
): void {
  const light = new THREE.PointLight(color, intensity, 3.5, 1.6);
  light.position.set(...position);
  parent.add(light);
}
