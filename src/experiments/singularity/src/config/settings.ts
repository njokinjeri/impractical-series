export type RenderMode = 'Wireframe' | 'Particles' | 'Hybrid';
export type CameraPerspective = 'Interior Flight' | 'External Chase';

export type TunnelArchitecture = 'Vortex' | 'Tunnel' | 'Grid';

export interface TunnelSettings {
  [key: string]: string | number | boolean;
  architecture: TunnelArchitecture;
  perspective: CameraPerspective;
  renderMode: RenderMode;
  color: string;
  lineOpacity: number;
  particleSize: number;
  speed: number;
  chaseDistance: number;
  chaseHeight: number;
  lookAhead: number;
  insideFog: number;
  chaseFog: number;
  bloom: number;
  motionTrails: number;
  paused: boolean;
}

export const DEFAULT_SETTINGS: TunnelSettings = {
  architecture: 'Vortex',        
  perspective: 'External Chase',  
  renderMode: 'Hybrid',
  color: '#4b5571',
  lineOpacity: 0.85,
  particleSize: 0.035,
  speed: 0.08,
  chaseDistance: 4.5,
  chaseHeight: 1.8,
  lookAhead: 0.06,
  insideFog: 0.18,
  chaseFog: 0.05,
  bloom: 2.5,                      
  motionTrails: 0.86,              
  paused: false,
};