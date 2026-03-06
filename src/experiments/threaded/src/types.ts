export interface Language {
    name: string;
    code: string;
    color: string;
    _charIndex: number;
    _spawnTimer: number;
    _spawnDelay: number;
}

export interface Particle {
    langIdx: number;
    char: string;
    isShared: boolean;
    color: string;
    nibble: string;
    progress: number;
    speed: number;
}

export interface StampedNibble {
    x: number;
    y: number;
    nibble: string;
    color: string;
    alpha: number
}

export interface HelloByte {
    char: string;
    nibble: string;
}

export type Phase = 'FLOWING' | 'HOLDING' | 'FADING'
export type DeviceType = 'mobile' | 'tablet' | 'desktop'

export interface CanvasState {
    W: number;
    H: number;
    CX: number;
    CY: number;
    device: DeviceType;
    threadCount: number;
    vertical: boolean;
}