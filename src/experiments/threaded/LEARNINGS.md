# Threaded

## What this is?
A visual simulation of how programming languages, despite their widely different syntax, collapse into the same binary at the machine level.
As seem the threads of source code flow from the left, converge at a single point and fan out as binary on the right.


## Initial Inspiration
The idea spawned from the thinking about Hello World as a universal ritual in programming. Every programmer writes it first, in whatever language they learn. The question became: what if many “Hello World” programs appeared at once, and we could watch them collapse into the same binary underneath?


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
- `requestAnimationFrame` loop and frame-based timing
- Canvas trail fade via semi-transparent fillRect each frame
- Cubic bezier path calculation from scratch
- Responsive canvas, resize handler recalculates all geometry
- Glow text via double draw: blurred pass + sharp pass



## What didn't work

- The initial version lacked labels and logs, which made the experience confusing—elements appeared and disappeared without clear explanation.
- Displaying all 14 languages at once also made the interface cluttered, so I introduced a round-based rotation to keep the visualization readable.

