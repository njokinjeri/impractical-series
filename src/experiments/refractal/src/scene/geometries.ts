import * as THREE from 'three/webgpu';
import type { ShapeType } from '../types';

export function createGeometries(): Record<ShapeType, THREE.BufferGeometry> {
    return {
        knot: new THREE.TorusKnotGeometry(0.9, 0.22, 256, 48, 2, 3),
        blob: new THREE.IcosahedronGeometry(1.2, 64),
        torus: new THREE.TorusGeometry(1.0, 0.4, 64, 128)
    };
}