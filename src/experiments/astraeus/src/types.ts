import * as THREE from 'three';

export const GenesisState = {
    IDLE: 0,
    IGNITING: 1,
    ACTIVE: 2
} as const;

export type GenesisStateType = typeof GenesisState[keyof typeof GenesisState];

export interface AstraeusConfig {
    particleCount: number;
    coreRadius: number;
    shellRadius: number;
    colors: {
        base: THREE.Color;
        accent: THREE.Color;
        ignited: THREE.Color;
    };
    simulationSpeed: number;
    noiseFrequency: number;
}

export interface ParticleBuffers {
    positions: Float32Array;
    colors: Float32Array;
    sizes: Float32Array;
    states: Uint8Array;
}

export interface InteractionPoint {
    position: THREE.Vector3;
    intensity: number;
    radius: number;
    isActive: boolean;
}

export interface UIState {
    intensity: number;
    expansionSpeed: number;
    bloomStrength: number;
    isGenesisTriggered: boolean;
    showGlobe: boolean;
}