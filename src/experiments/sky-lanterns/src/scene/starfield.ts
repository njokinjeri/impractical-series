import * as THREE from 'three';

const STAR_COUNT = 1200;

export interface Starfield {
  points: THREE.Points;
  toggle: (enabled: boolean) => void;
}

export function createStarfield(): Starfield {
  const starGeo = new THREE.BufferGeometry();
  const starPositions = new Float32Array(STAR_COUNT * 3);
  const starSizes = new Float32Array(STAR_COUNT);

  for (let i = 0; i < STAR_COUNT; i++) {
    const r = 250 + Math.random() * 500;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(Math.random() * 2 - 1);

    starPositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    starPositions[i * 3 + 1] = Math.abs(r * Math.cos(phi));
    starPositions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
    starSizes[i] = 1.5 + Math.random() * 2.5;
  }

  starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
  starGeo.setAttribute('size', new THREE.BufferAttribute(starSizes, 1));

  const starMat = new THREE.PointsMaterial({
    color: 0x80deea,
    size: 1.8,
    transparent: true,
    opacity: 0.85,
    sizeAttenuation: true,
  });

  const points = new THREE.Points(starGeo, starMat);

  return {
    points,
    toggle: (enabled: boolean) => {
      points.visible = enabled;
    },
  };
}
