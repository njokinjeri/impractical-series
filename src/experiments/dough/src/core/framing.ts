import * as THREE from 'three';

export function frameDonut(
  camera: THREE.PerspectiveCamera,
  outerRadius: number,
  padding = 1.4
): number {
  const vFov = (camera.fov * Math.PI) / 180;
  const vDist = (outerRadius * padding) / Math.tan(vFov / 2);

  const hFov = 2 * Math.atan(Math.tan(vFov / 2) * camera.aspect);
  const hDist = (outerRadius * padding) / Math.tan(hFov / 2);

  const fitDist = Math.max(vDist, hDist);
  camera.position.z = fitDist;
  camera.lookAt(0, 0, 0);
  return fitDist;
}

export function fitDistance(
  camera: THREE.PerspectiveCamera,
  outerRadius: number,
  padding = 1.4
): number {
  const vFov = (camera.fov * Math.PI) / 180;
  const vDist = (outerRadius * padding) / Math.tan(vFov / 2);

  const hFov = 2 * Math.atan(Math.tan(vFov / 2) * camera.aspect);
  const hDist = (outerRadius * padding) / Math.tan(hFov / 2);

  return Math.max(vDist, hDist);
}
