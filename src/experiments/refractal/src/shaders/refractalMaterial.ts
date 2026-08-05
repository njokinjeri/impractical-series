import * as THREE from 'three/webgpu';
import { 
  positionLocal, 
  normalLocal, 
  time, 
  sin, 
  cos, 
  mix, 
  length, 
  uniform, 
  vec2, 
  Fn 
} from 'three/tsl';
import type { ShaderUniforms } from '../types';

export function createRefractalMaterial(): { 
  material: THREE.MeshPhysicalNodeMaterial; 
  uniforms: ShaderUniforms 
} {
  const uDisplacementScale = uniform(0.0);
  const uFrequency = uniform(8.0);
  const uSpeed = uniform(2.5);
  const uMouseInfluence = uniform(0.3);
  const uMousePos = uniform(vec2(0.0, 0.0));
  const uColorA = uniform(new THREE.Color(0x0055ff));
  const uColorB = uniform(new THREE.Color(0xff0055));

  const material = new THREE.MeshPhysicalNodeMaterial();
  material.roughness = 0.05;
  material.metalness = 0.1;
  material.transmission = 0.85;
  material.thickness = 1.2;
  material.ior = 1.45;
  material.transparent = true;
  material.side = THREE.DoubleSide;

  material.positionNode = Fn(() => {
    const pos = positionLocal;
    const norm = normalLocal;

    const wave1 = sin(time.mul(uSpeed).add(pos.y.mul(uFrequency)));
    const wave2 = cos(time.mul(uSpeed.mul(1.4)).add(pos.x.mul(uFrequency.mul(1.8))));
    const wave3 = sin(time.mul(uSpeed.mul(0.8)).add(pos.z.mul(uFrequency.mul(1.2))));

    const distToMouse = length(pos.xy.sub(uMousePos));
    const mouseRipple = sin(distToMouse.mul(10.0).sub(time.mul(4.0))).mul(uMouseInfluence);

    const totalDisplacement = wave1.add(wave2).add(wave3)
      .mul(0.33)
      .add(mouseRipple)
      .mul(uDisplacementScale);

    return pos.add(norm.mul(totalDisplacement));
  })();

  const gradientFactor = sin(positionLocal.length().mul(4.0).add(time.mul(uSpeed)))
    .mul(0.5)
    .add(0.5);
  
  const finalColor = mix(uColorA, uColorB, gradientFactor);
  material.colorNode = finalColor;
  material.emissiveNode = finalColor.mul(0.25);

  return {
    material,
    uniforms: {
      uDisplacementScale,
      uFrequency,
      uSpeed,
      uMouseInfluence,
      uMousePos,
      uColorA,
      uColorB
    }
  };
}