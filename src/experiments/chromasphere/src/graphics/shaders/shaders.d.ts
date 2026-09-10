/**
 * Type declarations for GLSL shader files imported via Vite's `?raw` suffix.
 * Each import resolves to the shader source as a plain string.
 */

declare module '*.vert?raw' {
  const source: string;
  export default source;
}

declare module '*.frag?raw' {
  const source: string;
  export default source;
}

declare module '*.glsl?raw' {
  const source: string;
  export default source;
}