import type { ShaderUniforms } from '../types';

export function initPointerTracking(uniforms: ShaderUniforms) {
  window.addEventListener('pointermove', (event: PointerEvent) => {
    const x = (event.clientX / window.innerWidth) * 2 - 1;
    const y = -(event.clientY / window.innerHeight) * 2 + 1;
    uniforms.uMousePos.value.set(x, y);
  });
}
