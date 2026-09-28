import * as THREE from 'three';

export function createStarsGas(glowTexture: THREE.Texture): THREE.Group {
  const gasGroup = new THREE.Group();
  const starCount = 400;
  const starGeom = new THREE.BufferGeometry();
  const starPos = new Float32Array(starCount * 3);

  for (let i = 0; i < starCount * 3; i += 3) {
    starPos[i]     = (Math.random() - 0.5) * 16;
    starPos[i + 1] = (Math.random() - 0.5) * 16;
    starPos[i + 2] = (Math.random() - 0.5) * 16;
  }
  starGeom.setAttribute('position', new THREE.BufferAttribute(starPos, 3));

  const gasMaterial = new THREE.PointsMaterial({
    size: 0.2,
    map: glowTexture,
    transparent: true,
    opacity: 0.65,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });
  const gasParticles = new THREE.Points(starGeom, gasMaterial);
  gasGroup.add(gasParticles);
  return gasGroup;
}