import * as THREE from 'three';

export interface Palette {
    name: string;
    paperBg: string;
    motifFill: string;
    motifStroke: string;
    emissive: number;
    capColor: number;
    lightColor: number;
}

export interface LanternUserData {
    bodyMat: THREE.MeshStandardMaterial;
    topCapMat: THREE.MeshStandardMaterial;
    pointLight: THREE.PointLight;
    flameMesh: THREE.Mesh;
    flameMat: THREE.MeshBasicMaterial;
    paletteIndex: number;
    isLit: boolean;
    seed: number;
    speedY: number;
    swaySpeed: number;
    swayRadius: number;
    rotSpeed: number;
}

export type CameraMode = 'orbit' | 'follow' | 'drone';

export type PaletteMode = 'random' | '0' | '1' | '2' | '3';