import type { BaseSolidType } from '../geometry/StellationGenerator';

export interface AppConfig {
  activeGeometry: BaseSolidType;
  stellationFactor: number;
  frameInset: number; 
  hatchFrequency: number;
  inkColor: string;
  paperColor: '#f4eee1',
}

export const DEFAULT_CONFIG: AppConfig = {
  activeGeometry: 'octahedron',
  stellationFactor: 0.6,
  frameInset: 0.3,
  hatchFrequency: 90.0,
  inkColor: '#2b261f',
  paperColor: '#f4eee1',
};