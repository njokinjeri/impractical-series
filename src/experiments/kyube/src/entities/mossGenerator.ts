import * as THREE from 'three';

interface MossCluster {
  center: THREE.Vector3;
  radius: number;
  density: number;
  type: 'top' | 'bottom' | 'corner' | 'side';
}

export function buildClusteredCubeMoss(
  material: THREE.Material,
  totalTufts = 11000
): THREE.InstancedMesh {
  const baseTuftGeom = new THREE.ConeGeometry(0.024, 0.048, 6);
  baseTuftGeom.translate(0, 0.024, 0);

  const instancedMesh = new THREE.InstancedMesh(
    baseTuftGeom,
    material,
    totalTufts
  );
  const dummy = new THREE.Object3D();
  const cubeHalf = 1.02;
  let count = 0;

  const clusters: MossCluster[] = [];

  for (let i = 0; i < 16; i++) {
    const angle = (i / 16) * Math.PI * 2;
    const dist = 0.1 + Math.random() * 0.7;
    clusters.push({
      center: new THREE.Vector3(
        Math.cos(angle) * dist,
        cubeHalf,
        Math.sin(angle) * dist
      ),
      radius: 0.45,
      density: 1.1,
      type: 'top'
    });
  }

  for (let i = 0; i < 16; i++) {
    const angle = (i / 16) * Math.PI * 2;
    const dist = 0.1 + Math.random() * 0.7;
    clusters.push({
      center: new THREE.Vector3(
        Math.cos(angle) * dist,
        -cubeHalf,
        Math.sin(angle) * dist
      ),
      radius: 0.45,
      density: 1.1,
      type: 'bottom'
    });
  }

  const cornerPositions = [
    { x:  cubeHalf, z:  cubeHalf },
    { x: -cubeHalf, z:  cubeHalf },
    { x:  cubeHalf, z: -cubeHalf },
    { x: -cubeHalf, z: -cubeHalf }
  ];

  cornerPositions.forEach((c) => {
    for (let s = 0; s < 12; s++) {
      const yProgress = s / 11;
      clusters.push({
        center: new THREE.Vector3(
          c.x * 1.05,
          cubeHalf - yProgress * (cubeHalf * 2),
          c.z * 1.05
        ),
        radius: 0.35,
        density: 1.0,
        type: 'corner'
      });
    }
  });

  const sideSeams = [
    { x: 0, y:  0.3, z:  cubeHalf },
    { x: 0, y:  0.2, z: -cubeHalf },
    { x:  cubeHalf, y:  0.4, z: 0 },
    { x: -cubeHalf, y:  0.1, z: 0 },
    { x: 0, y: -0.4, z:  cubeHalf },
    { x: 0, y: -0.3, z: -cubeHalf },
    { x:  cubeHalf, y: -0.3, z: 0 },
    { x: -cubeHalf, y: -0.4, z: 0 }
  ];
  sideSeams.forEach((s) => {
    clusters.push({
      center: new THREE.Vector3(s.x, s.y, s.z),
      radius: 0.45,
      density: 0.9,
      type: 'side'
    });
  });

  const upVec = new THREE.Vector3(0, 1, 0);

  clusters.forEach((cl) => {
    const tuftCountForCluster = Math.floor(
      (totalTufts / clusters.length) * cl.density * 1.2
    );

    for (let i = 0; i < tuftCountForCluster && count < totalTufts; i++) {
      const r = Math.pow(Math.random(), 0.5) * cl.radius;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI;

      let px = cl.center.x + r * Math.cos(theta);
      let py = cl.center.y + (
        cl.type === 'top' || cl.type === 'bottom'
          ? (Math.random() - 0.5) * 0.12
          : r * Math.sin(phi)
      );
      let pz = cl.center.z + r * Math.sin(theta);

      const normal = new THREE.Vector3();

      if (cl.type === 'top') {
        py = cubeHalf + 0.01 + Math.random() * 0.04;
        normal.set(0, 1, 0);
      } else if (cl.type === 'bottom') {
        py = -cubeHalf - 0.01 - Math.random() * 0.04;
        normal.set(0, -1, 0);
      } else {
        const absX = Math.abs(px);
        const absY = Math.abs(py);
        const absZ = Math.abs(pz);
        const maxVal = Math.max(absX, absY, absZ);

        if (maxVal === absX) {
          px = Math.sign(px) * (cubeHalf + Math.random() * 0.04);
          normal.set(Math.sign(px), 0, 0);
        } else if (maxVal === absY) {
          py = Math.sign(py) * (cubeHalf + Math.random() * 0.04);
          normal.set(0, Math.sign(py), 0);
        } else {
          pz = Math.sign(pz) * (cubeHalf + Math.random() * 0.04);
          normal.set(0, 0, Math.sign(pz));
        }
      }

      dummy.position.set(px, py, pz);
      const alignQuat = new THREE.Quaternion().setFromUnitVectors(upVec, normal);
      dummy.rotation.setFromQuaternion(alignQuat);
      dummy.rotateY(Math.random() * Math.PI * 2);
      dummy.rotateX((Math.random() - 0.5) * 0.4);

      const falloff = 1.0 - r / cl.radius;
      const scale = (0.75 + Math.random() * 0.6) * (0.6 + falloff * 0.7);
      dummy.scale.set(scale, scale * (1.1 + Math.random() * 0.5), scale);

      dummy.updateMatrix();
      instancedMesh.setMatrixAt(count++, dummy.matrix);
    }
  });

  instancedMesh.instanceMatrix.needsUpdate = true;
  instancedMesh.castShadow = true;
  instancedMesh.receiveShadow = true;
  return instancedMesh;
}