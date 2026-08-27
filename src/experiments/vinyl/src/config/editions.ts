export interface EditionConfig {
  color: string;
  roughness: number;
  transmission: number;
  specular: number;
  anisotropicStrength: number;
  labelBrightness: number;
  specIntensity: number;
}

export const EDITIONS: Record<string, EditionConfig> = {
  frosted: {
    color: '#8a9ba8',
    roughness: 0.50,
    transmission: 0.78,
    specular: 1.5,
    anisotropicStrength: 0.65,
    labelBrightness: 0.3,
    specIntensity: 0.3, 
  },
  mercury: {
    color: '#7a7f8a',
    roughness: 0.5,
    transmission: 0.40,
    specular: 1.0,
    anisotropicStrength: 0.90,
    labelBrightness: 0.3,
    specIntensity: 0.5, 
  },
  cobalt: {
    color: '#1a488c',
    roughness: 0.5,
    transmission: 0.02,
    specular: 2.0,
    anisotropicStrength: 0.50,
    labelBrightness: 0.1,
    specIntensity: 0.3, 
  },
  onyx: {
    color: '#0c0d0f',
    roughness: 0.5,
    transmission: 0.02,
    specular: 2.0,
    anisotropicStrength: 0.50,
    labelBrightness: 0.1,
    specIntensity: 0.3, 
  },
};

export type EditionKey = keyof typeof EDITIONS;