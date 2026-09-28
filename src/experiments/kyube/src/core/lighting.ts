import * as THREE from 'three';

export interface LightingRig {
  coreLight: THREE.PointLight;
  coreOrbMesh: THREE.Mesh;
  sunKeyLight: THREE.DirectionalLight;
  sunShaftLight: THREE.DirectionalLight;
  ambientLight: THREE.AmbientLight;
}

export function createLighting(rootGroup: THREE.Group, scene: THREE.Scene): LightingRig {
  const coreLight = new THREE.PointLight(0xffaa44, 9.5, 16.0);
  coreLight.position.set(0, 0, 0);
  coreLight.castShadow = true;
  rootGroup.add(coreLight);

  const coreOrbMesh = new THREE.Mesh(
    new THREE.SphereGeometry(0.022, 16, 16),
    new THREE.MeshBasicMaterial({ color: 0xffd088 })
  );
  rootGroup.add(coreOrbMesh);

  const sunKeyLight = new THREE.DirectionalLight(0xfff7ea, 1.8);
  sunKeyLight.position.set(3.5, 5.0, 4.0);
  sunKeyLight.castShadow = true;
  scene.add(sunKeyLight);

  const sunShaftLight = new THREE.DirectionalLight(0xffedd8, 0.5);
  sunShaftLight.position.set(-4.0, -3.0, -3.0);
  scene.add(sunShaftLight);

  const ambientLight = new THREE.AmbientLight(0xffe0c0, 0.45);
  scene.add(ambientLight);

  return { coreLight, coreOrbMesh, sunKeyLight, sunShaftLight, ambientLight };
}