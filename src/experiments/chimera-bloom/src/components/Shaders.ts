export const PetalShader = {
  vertex: `
    uniform float uTime;
    uniform float uHover;
    uniform float uFlexibility;
    varying vec2 vUv;

    void main() {
      vUv = uv;
      vec3 pos = position;
      
      // ALIVE LOOK: Subtle sine wave based on time and vertical position
      // Higher Y = more movement
      float wave = sin(pos.y * 1.5 + uTime * 2.0) * (pos.y * 0.1) * uFlexibility;
      pos.z += wave;

      // INTERACTION: The "Flinch" - curl back when hovered
      float curl = pow(pos.y, 2.0) * uHover * 1.5;
      pos.z += curl;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  fragment: `
    uniform vec3 uColor;
    varying vec2 vUv;

    void main() {
      // Gradient: darker/saturated at base, brighter/translucent at tip
      float gradient = smoothstep(0.0, 1.0, vUv.y);
      vec3 finalColor = mix(uColor * 0.5, uColor, gradient);
      
      // Simulating Subsurface Scattering (SSS) by reducing alpha at edges
      float alpha = smoothstep(0.1, 0.9, vUv.x) * smoothstep(0.0, 1.0, vUv.y);
      
      gl_FragColor = vec4(finalColor, alpha * 0.9);
    }
  `
};



