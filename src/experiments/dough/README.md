# 🍩 #dough

A gallery of 14 procedurally generated donuts, built with **Three.js** and **TypeScript**.

Each donut is a small experiment in a different rendering technique, shader-driven glaze, instanced fur, transmission materials, raycast interaction, chrome reflections, and more. They all share the same renderer, camera, lighting architecture, and UI. Only the donut itself differs.

**[Live demo]🍩(https://njokinjeri.github.io/impractical-series/src/experiments/dough/#glitter)**

---

## Inspiration & Origins

This series was inspired by my procrastination to pick up the classic Blender donut tutorial by Blender Guru. Figuring code was more fun than modeling, I decided to take a sideways approach (though it feels a bit like cheating). I'll pick up Blender eventually—before I turn gray.

Special thanks for the heavy visual inspiration drawn from [this ArtStation concept artwork](https://www.artstation.com/artwork/xYkwWR), to which I added my own technical twists.


---

## The donuts

| # | Donut | Technique |
|---|---|---|
| 01 | **Glitter** | 10k instanced gems over a shader-painted glaze |
| 02 | **Strawberry** | Noise-masked glaze with 420 seated sprinkles |
| 03 | **Brûlée** | Vertex-color dough, procedural drizzle, rough sugar cubes |
| 04 | **Painter's** | 32 splats placed in fragment shader space |
| 05 | **K-pop** | Neon wireframes, dual grids, metallic orbiting trinkets |
| 06 | **Football** | Canvas pentagon texture + 45 orbiting mini footballs |
| 07 | **Fluff** | 55,000 instanced curved strands |
| 08 | **Earth** | 3-map textured torus with a drifting cloud layer |
| 09 | **Space** | Eroded ceramic shell over a wireframe lattice, chrome debris |
| 10 | **Ice** | Transmission materials (dough + frosting + cubes) |
| 11 | **Relic** | 22 hand-placed stone blocks, moss zones, shadows |
| 12 | **Rotten** | Vertex-colored decay, mushrooms, moss, rot spots |
| 13 | **Don't Touch** | Liquid chrome + Venice sunset HDRI reflections |
| 14 | **Cluster** | 50 mini donuts, raycast click-impulse |

---

## Architecture

```text
src/
├── core/       # Shared renderer, camera, lighting, controls, state
├── donuts/     # 14 self-contained donut builders + registry
├── ui/         # Label, nav accordion, keyboard, hint
└── styles/     # Global reset + UI CSS
```

### Every donut is the same shape

Each file in `src/donuts/` exports a single `buildXxx(): THREE.Group` function and a matching `animateXxx(root, elapsed, dt)` for per-frame updates. Nothing else.

```ts
export function buildGlitter(): THREE.Group {
  const root = new THREE.Group();
  // ...geometry, materials, children...
  return root;
}

export function animateGlitter(root, elapsed, dt): void {
  // ...update children...
}
```

The builder returns a group. The animate function mutates that group. Nothing in the donut file knows about the renderer, the camera, the lights, the UI, or which donut is currently active. That's `core/`'s job.

### The registry

`src/donuts/index.ts` holds a single `DONUTS` array. Every donut is configured in one object:

```ts
{
  id: "glitter",
  name: "Glitter Donut",
  shortName: "Glitter",
  subtitle: "Pirate approved.",
  accent: "#ff5fa8",
  spinSpeed: 0.2,
  lighting: "warm",
  env: "warm",
  background: { type: "radial", stops: [...] },
  bloom: { strength: 0.32, radius: 0.60, threshold: 0.90 },
  outerRadius: 1.64,
  outerPadding: 1.35,
  build: buildGlitter,
}
```

Everything the donut needs - lights, environment, background, bloom, camera framing, spin speed, is declared here. The donut file itself only holds geometry and animation, keeping each donut's visual identity strictly modular.

### Adding a donut

1. Create `src/donuts/myDonut.ts` with `buildMyDonut` and `animateMyDonut`.
2. Add an entry to `DONUTS` in `src/donuts/index.ts`.
3. Add a `} else if (donut.id === "mydonut") {` branch in `main.ts` inside the animate dispatch.

That's it. The renderer, camera, lights, background, bloom, camera framing, nav, label, and URL hash all work automatically.

---

## Local development

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173`. Vite HMR is on.

Build for production:
```bash
npm run build
```

Outputs to `dist/`. Deploy that folder to Vercel, Netlify, Cloudflare Pages, or any static host.

---

## Navigation

- **Right panel** — Click any donut name
- **🍩 emblem** — Opens the accordion on mobile
- **Arrow keys** — `←` / `→` cycle through donuts
- **URL hash** — Deep-link to a donut: `#glitter`, `#cluster`, etc.

---

## Tech notes

* **Three.js 0.163** — Uses `PCFShadowMap` (`PCFSoftShadowMap` was removed in 0.163) and `Clock` (deprecated but functional; `Timer` has API edge cases with donut switching).
* **TypeScript strict mode** — `tsc --noEmit` with `noUnusedLocals` and `noUnusedParameters` enabled.
* **Zero runtime dependencies** — Only Three.js. No React, no state libraries, no CSS frameworks.
* **Per-donut rebuild** — Renderer, camera, lights, background, and bloom are torn down and rebuilt on every switch. Costs 300–500ms of synchronous work, which is fine for a gallery.
* **Renderer handoff** — *Football*, *Earth*, and *Don't Touch* need the renderer at build time, so they receive it via `setXxxRenderer(renderer)` called once at boot. This keeps the `build(): THREE.Group` signature clean for all 14 donuts.
* **Async assets** — *Earth* (4 textures) and *Don't Touch* (Venice HDRI) load remote assets on first visit and cache after. A plain fallback renders for ~1s while they download.

---

## Known limitations

* `THREE.Clock` deprecation warning in console when switching donuts (cosmetic).
* `[Violation]` warnings during donut switches. Chrome's threshold is 50ms; switches take 100–500ms. Not a bug - heavy initialization.
* Earth has a visible UV seam at the back of the torus, squeezed by half a texel in the shader but not eliminated. Fixing properly requires a seamless Earth texture outside the standard NASA set.
* Cluster's *"Find the golden one"* subtitle - there is no golden one. It's a joke.


---

## Contributing

Feel free to fork, build on this, or make the donut series better than my version! Pull requests and community iterations are more than welcome.

*This was fun.* 🍩