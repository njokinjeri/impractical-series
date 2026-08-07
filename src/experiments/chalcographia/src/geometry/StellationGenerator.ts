import * as THREE from 'three/webgpu';

export type BaseSolidType =
  'tetrahedron' | 'cube' | 'octahedron' | 'dodecahedron' | 'icosahedron';

export class StellationGenerator {
  public static createGeometry(
    baseType: BaseSolidType,
    stellationFactor: number = 0.5,
    strutThickness: number = 0.25
  ): THREE.BufferGeometry {
    let baseGeo: THREE.BufferGeometry;

    switch (baseType) {
      case 'tetrahedron':
        baseGeo = new THREE.TetrahedronGeometry(1, 0);
        break;
      case 'cube':
        baseGeo = new THREE.BoxGeometry(1, 1, 1);
        break;
      case 'dodecahedron':
        baseGeo = new THREE.DodecahedronGeometry(1, 0);
        break;
      case 'icosahedron':
        baseGeo = new THREE.IcosahedronGeometry(1, 0);
        break;
      case 'octahedron':
      default:
        baseGeo = new THREE.OctahedronGeometry(1, 0);
        break;
    }

    const nonIndexed = baseGeo.index ? baseGeo.toNonIndexed() : baseGeo.clone();
    const posAttr = nonIndexed.attributes.position;
    const triangleCount = posAttr.count / 3;

    interface FaceGroup {
      normal: THREE.Vector3;
      vertices: THREE.Vector3[];
    }

    const faceGroups: FaceGroup[] = [];
    const vA = new THREE.Vector3();
    const vB = new THREE.Vector3();
    const vC = new THREE.Vector3();
    const triNormal = new THREE.Vector3();

    for (let i = 0; i < triangleCount; i++) {
      vA.fromBufferAttribute(posAttr, i * 3);
      vB.fromBufferAttribute(posAttr, i * 3 + 1);
      vC.fromBufferAttribute(posAttr, i * 3 + 2);

      const e1 = vB.clone().sub(vA);
      const e2 = vC.clone().sub(vA);
      triNormal.crossVectors(e1, e2);

      if (triNormal.lengthSq() < 1e-10) continue;
      triNormal.normalize();

      let match = faceGroups.find((g) => g.normal.distanceTo(triNormal) < 0.05);
      if (!match) {
        match = { normal: triNormal.clone(), vertices: [] };
        faceGroups.push(match);
      }

      [vA, vB, vC].forEach((v) => {
        if (
          !match!.vertices.some((existing) => existing.distanceTo(v) < 0.001)
        ) {
          match!.vertices.push(v.clone());
        }
      });
    }

    const positions: number[] = [];

    const pushTri = (
      p1: THREE.Vector3,
      p2: THREE.Vector3,
      p3: THREE.Vector3
    ) => {
      if (
        Number.isNaN(p1.x) ||
        Number.isNaN(p1.y) ||
        Number.isNaN(p1.z) ||
        Number.isNaN(p2.x) ||
        Number.isNaN(p2.y) ||
        Number.isNaN(p2.z) ||
        Number.isNaN(p3.x) ||
        Number.isNaN(p3.y) ||
        Number.isNaN(p3.z)
      )
        return;

      positions.push(p1.x, p1.y, p1.z, p2.x, p2.y, p2.z, p3.x, p3.y, p3.z);
    };

    const pushQuad = (
      p1: THREE.Vector3,
      p2: THREE.Vector3,
      p3: THREE.Vector3,
      p4: THREE.Vector3
    ) => {
      pushTri(p1, p2, p3);
      pushTri(p1, p3, p4);
    };

    faceGroups.forEach((group) => {
      if (group.vertices.length < 3) return;

      const centroid = new THREE.Vector3();
      group.vertices.forEach((v) => centroid.add(v));
      centroid.divideScalar(group.vertices.length);

      const basisX = new THREE.Vector3();
      const basisY = new THREE.Vector3();

      if (Math.abs(group.normal.x) > 0.9) {
        basisX.set(0, 1, 0);
      } else {
        basisX.set(1, 0, 0);
      }

      basisY.crossVectors(group.normal, basisX);
      if (basisY.lengthSq() > 1e-10) basisY.normalize();

      basisX.crossVectors(basisY, group.normal);
      if (basisX.lengthSq() > 1e-10) basisX.normalize();

      group.vertices.sort((a, b) => {
        const dirA = a.clone().sub(centroid);
        const dirB = b.clone().sub(centroid);
        const angleA = Math.atan2(dirA.dot(basisY), dirA.dot(basisX));
        const angleB = Math.atan2(dirB.dot(basisY), dirB.dot(basisX));
        return angleA - angleB;
      });

      const apex = centroid
        .clone()
        .addScaledVector(group.normal, stellationFactor * 1.2);
      const n = group.vertices.length;

      const insetRatio = Math.min(Math.max(strutThickness, 0.0), 0.48);
      const innerVertices: THREE.Vector3[] = [];
      for (let i = 0; i < n; i++) {
        innerVertices.push(
          group.vertices[i].clone().lerp(centroid, insetRatio)
        );
      }

      for (let i = 0; i < n; i++) {
        const curr = group.vertices[i];
        const next = group.vertices[(i + 1) % n];
        const inCurr = innerVertices[i];
        const inNext = innerVertices[(i + 1) % n];

        if (insetRatio > 0.001) {
          pushQuad(curr, next, inNext, inCurr);
        }
        pushTri(inCurr, inNext, apex);
      }
    });

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(positions, 3)
    );
    geometry.computeVertexNormals();
    geometry.computeBoundingSphere();

    baseGeo.dispose();
    nonIndexed.dispose();

    return geometry;
  }
}
