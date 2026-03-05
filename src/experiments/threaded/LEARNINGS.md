# Threaded

## What this is?
A visual simulation of how programming languages, despite their widely different syntax, collapse into the same binary at the machine level.

As visualized the selected threads of source code flow from the left, converge at a single point and fan out as binary on the right.


## Initial Inspiration
The idea began with Hello World, the universal ritual of programming. Every developer writes it first, regardless of the language they start with.

The question became: what if many “Hello World” programs appeared at once, and we could watch them collapse into the same binary underneath?


## Concept
- Left side: source code threads, one per language, each a different color
- Centre: convergence point - all threads merge here, characters flash to binary
- Right side: binary exits along the same thread paths, symmetric to the left
- Bottom bar: the full Hello, World! translation builds byte by byte as the piece runs
- Log panel: accumulates every language seen across rounds


## Tools Used

- Vite 
- TypeScript
- Canvas API
- Bezier curves


## Key concepts encountered
- `requestAnimationFrame` for frame-based animation loops
- Canvas trail fading using a semi-transparent `fillRect` on every frame
- Cubic Bézier curve calculation implemented from scratch
- Responsive canvas handling, recalculating geometry on window resize
- Glowing text rendering using a double-pass draw (blurred layer + sharp layer)



## What didn't work

- The initial version lacked labels and logs, which made the experience confusing as elements appeared and disappeared without clear explanation.
- Displaying all 16 languages at once also made the interface cluttered, so I introduced a round-based rotation to keep the visualization readable.
