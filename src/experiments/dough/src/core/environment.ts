import * as THREE from 'three';

export type EnvPreset =
  'warm' | 'pink' | 'chrome' | 'space' | 'relic' | 'dontouch';

export function makeEnv(
  pmrem: THREE.PMREMGenerator,
  preset: EnvPreset
): THREE.Texture {
  const s = new THREE.Scene();
  const geo = new THREE.PlaneGeometry(10, 10);

  const addWall = (
    color: number,
    pos: [number, number, number],
    rot: [number, number, number]
  ): void => {
    const m = new THREE.Mesh(
      geo,
      new THREE.MeshBasicMaterial({ color, side: THREE.DoubleSide })
    );
    m.position.set(...pos);
    m.rotation.set(...rot);
    s.add(m);
  };

  const PI = Math.PI;

  if (preset === 'chrome') {
    addWall(0xffaa55, [0, 5, 0], [PI / 2, 0, 0]);
    addWall(0x111133, [0, -5, 0], [-PI / 2, 0, 0]);
    addWall(0xff88bb, [0, 0, -5], [0, 0, 0]);
    addWall(0xcc66ff, [0, 0, 5], [0, PI, 0]);
    addWall(0x3366aa, [-5, 0, 0], [0, PI / 2, 0]);
    addWall(0x224488, [5, 0, 0], [0, -PI / 2, 0]);
  } else if (preset === 'space') {
    addWall(0xffffff, [0, 6, 0], [PI / 2, 0, 0]);
    addWall(0x05080f, [0, -6, 0], [-PI / 2, 0, 0]);
    addWall(0x8899cc, [0, 0, -6], [0, 0, 0]);
    addWall(0x334466, [0, 0, 6], [0, PI, 0]);
    addWall(0x556677, [-6, 0, 0], [0, PI / 2, 0]);
    addWall(0x7788aa, [6, 0, 0], [0, -PI / 2, 0]);
  } else if (preset === 'relic') {
    addWall(0x3a4a3a, [0, 6, 0], [PI / 2, 0, 0]);
    addWall(0x05080a, [0, -6, 0], [-PI / 2, 0, 0]);
    addWall(0x1a2a1a, [0, 0, -6], [0, 0, 0]);
    addWall(0x0a1a10, [0, 0, 6], [0, PI, 0]);
    addWall(0x152a1a, [-6, 0, 0], [0, PI / 2, 0]);
    addWall(0x1a2a1a, [6, 0, 0], [0, -PI / 2, 0]);
  } else if (preset === 'dontouch') {
    addWall(0xffaa55, [0, 6, 0], [PI / 2, 0, 0]);
    addWall(0x111133, [0, -6, 0], [-PI / 2, 0, 0]);
    addWall(0xff88bb, [0, 0, -6], [0, 0, 0]);
    addWall(0xcc66ff, [0, 0, 6], [0, PI, 0]);
    addWall(0x3366aa, [-6, 0, 0], [0, PI / 2, 0]);
    addWall(0x224488, [6, 0, 0], [0, -PI / 2, 0]);
  } else {
    addWall(0xffffff, [0, 5, 0], [PI / 2, 0, 0]);
    addWall(0xffc8d8, [0, -5, 0], [-PI / 2, 0, 0]);
    addWall(0xffe0e8, [0, 0, -5], [0, 0, 0]);
    addWall(0xffd0dc, [0, 0, 5], [0, PI, 0]);
    addWall(0xffc0d0, [-5, 0, 0], [0, PI / 2, 0]);
    addWall(0xffd8e0, [5, 0, 0], [0, -PI / 2, 0]);
  }

  return pmrem.fromScene(s, 0.04).texture;
}
