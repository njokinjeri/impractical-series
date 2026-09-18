import * as THREE from 'three';
import { createLantern, getTexture, PALETTES } from '../scene/lanterns';
import { setRitualWind } from '../stage/ritual';
import type { CameraMode, PaletteMode } from '../types';

export interface Swarm {
    lanterns: THREE.Group[];
    activeCount: number;
    maxCount: number;
    paletteMode: PaletteMode;
    cameraMode: CameraMode;
    reveal: () => void;
    selectDensity: (count: number) => void;
    setCameraMode: (mode: CameraMode) => void;
    setPaletteMode: (mode: PaletteMode) => void;
    rerandomize: () => void;
}

const MAX_LANTERNS = 150;

const lanterns: THREE.Group[] = [];
let activeCount = 45;
let currentPaletteMode: PaletteMode = 'random';
let currentCameraMode: CameraMode = 'orbit';
let revealed = false;

let windVectorX = 0;
let windVectorZ = 0;

function resetLanternPosition(lantern: THREE.Group, initial = false): void {
    const palIndex = currentPaletteMode === 'random'
        ? Math.floor(Math.random() * PALETTES.length)
        : parseInt(currentPaletteMode, 10);
    const pal = PALETTES[palIndex];
    const tex = getTexture(palIndex);

    const u = lantern.userData;

    u.bodyMat.map = tex;
    u.bodyMat.emissiveMap = tex;
    u.bodyMat.emissive.setHex(pal.emissive);
    u.bodyMat.emissiveIntensity = 0.85;

    u.topCapMat.map = tex;
    u.topCapMat.emissiveMap = tex;
    u.topCapMat.emissive.setHex(pal.capColor);
    u.topCapMat.emissiveIntensity = 0.80;

    u.pointLight.color.setHex(pal.lightColor);
    u.pointLight.intensity = 2.5;
    u.flameMat.opacity = 0.9;

    const scale = 0.5 + Math.random() * 0.4;
    lantern.scale.set(scale, scale, scale);

    const radius = 8 + Math.random() * 32;
    const angle = Math.random() * Math.PI * 2;

    lantern.position.x = Math.cos(angle) * radius;
    lantern.position.z = Math.sin(angle) * radius;
    lantern.position.y = initial
        ? (Math.random() * 32 - 12)
        : -14 - Math.random() * 5;
}

export function initSwarm(): Swarm {
    for (let i = 0; i < MAX_LANTERNS; i++) {
        const lantern = createLantern(0);
        resetLanternPosition(lantern, true);
        lantern.userData.isLit = true;
        lantern.visible = false;
        lanterns.push(lantern);
    }

    updateWindFromInputs();

    const swarm: Swarm = {
        lanterns,
        activeCount,
        maxCount: MAX_LANTERNS,
        paletteMode: currentPaletteMode,
        cameraMode: currentCameraMode,
        reveal,
        selectDensity,
        setCameraMode,
        setPaletteMode,
        rerandomize
    };

    return swarm;
}

export function addLanternsToScene(scene: THREE.Scene): void {
    for (let i = 0; i < lanterns.length; i++) {
        scene.add(lanterns[i]);
    }
}


function reveal(): void {
    if (revealed) return;
    revealed = true;
    for (let i = 0; i < activeCount; i++) {
        lanterns[i].visible = true;
    }
}

function selectDensity(count: number): void {
    activeCount = count;
    for (let i = 0; i < MAX_LANTERNS; i++) {
        lanterns[i].visible = revealed && i < activeCount;
    }
}

function setCameraMode(mode: CameraMode): void {
    currentCameraMode = mode;
}

function setPaletteMode(mode: PaletteMode): void {
    currentPaletteMode = mode;
    lanterns.forEach(l => resetLanternPosition(l, true));
}

function rerandomize(): void {
    lanterns.forEach(l => resetLanternPosition(l, true));
}

export function updateWindFromInputs(): void {
    const angleEl = document.getElementById('windAngle') as HTMLInputElement;
    const speedEl = document.getElementById('windSpeed') as HTMLInputElement;
    const angleDeg = parseFloat(angleEl.value);
    const speed = parseFloat(speedEl.value);

    const rad = (angleDeg * Math.PI) / 180;
    windVectorX = Math.sin(rad) * speed;
    windVectorZ = Math.cos(rad) * speed;

    setRitualWind(windVectorX, windVectorZ);
}

export function tickSwarm(delta: number, time: number): void {
    if (!revealed) return;

    for (let i = 0; i < activeCount; i++) {
        const l = lanterns[i];
        if (!l.visible) continue;

        const u = l.userData;

        const flicker =
            Math.sin(time * 12.0 + u.seed) * 0.08 +
            Math.cos(time * 19.0 + u.seed) * 0.05;
        u.flameMesh.scale.set(
            1.0 + flicker * 0.2,
            1.0 + flicker * 0.4,
            1.0 + flicker * 0.2
        );
        u.pointLight.intensity = 2.5 + flicker * 1.0;

        l.position.y += u.speedY * delta * 2.0;

        const swayX = Math.sin(time * u.swaySpeed + u.seed) * u.swayRadius * delta;
        const swayZ = Math.cos(time * (u.swaySpeed * 0.8) + u.seed) * u.swayRadius * delta;

        l.position.x += swayX + windVectorX * delta * 3.0;
        l.position.z += swayZ + windVectorZ * delta * 3.0;

        l.rotation.z = -windVectorX * 0.2 + Math.sin(time * u.swaySpeed + u.seed) * 0.05;
        l.rotation.x = windVectorZ * 0.2 + Math.cos(time * u.swaySpeed + u.seed) * 0.05;
        l.rotation.y += u.rotSpeed * delta;

        if (l.position.y > 22) resetLanternPosition(l, false);
        if (l.position.x > 40) l.position.x = -40;
        if (l.position.x < -40) l.position.x = 40;
        if (l.position.z > 40) l.position.z = -40;
        if (l.position.z < -40) l.position.z = 40;
    }
}

export function getWindVectors(): { x: number; z: number } {
    return { x: windVectorX, z: windVectorZ };
}