# Bloom

## What this is?

An interactive 3D flower renderer built from mathematics. Visually presented are the five flowers: Jazmin, Lotus, Rose, Dahlia, and Water Lily, which are generated as point clouds using parametric surface equations and rendered on a plain 2D canvas. No 3D engine, no meshes. Just thousands of glowing dots placed where the math says they should be, forming shapes you can orbit, zoom, and watch bloom.


## Initial Inspiration
What happens when you take a mathematical formula and ask it to describe the surface of a flower? The goal was to explore parametric geometry as an aesthetic exercise to see whether pure mathematics, stripped of any rendering engine, could produce something that feels alive.


## Concept

Each flower is defined by a parametric equation describing its surface in 3D space. The computer evaluates that equation thousands of times, each producing a single point with x, y, z coordinates. Those points, rendered as 2×2 pixel squares on a canvas, collectively form the flower shape.
 
The 3D effect is built from three pieces of arithmetic per frame:
 
- Two rotation matrices to spin the point cloud in response to drag
- A perspective divide to make farther points appear smaller
- A painter's algorithm depth sort so closer points draw in front

The density slider controls how frequently the formula is evaluated, fewer evaluations means a more delicate strand-like look, more means a denser flower. Technically the same math just different resolution.



## Tools Used
- HTML5 Canvas API
- TypeScript 
- Parametric Math

## Key concepts encountered
- Parametric Geometry: Learned how to translate polar coordinates (radius, angle) into 3D Cartesian coordinates (x, y, z) to create organic, non-linear petal distributions.

- Depth Sorting (Painter’s Algorithm): Encountered the classic problem of 3D objects appearing "inside out" on a 2D plane; solved by sorting points by their Z-axis depth before rendering each frame.

- High-DPI Rendering: Managed the balance between visual density (number of points) and frame rate, using a dynamic density scalar to ensure smooth performance.

- Event Normalization: Learned to bypass browser scroll defaults using touch-action: none and native movementX/Y APIs to ensure a fluid 1:1 rotation experience.


## What didn't work

- I tried adding a bit of diversification with the flower selection from Anthurium, Tulip, Plumeria, Passionflower, Fritillary, and Hibiscus but they didn't quite fit.
- Adjusting HSL values without seeing output caused several wrong turns. The glow mode multiplies lightness by a depth scalar, which amplifies saturated inner stops aggressively on warm mode. The fix was matching the lightness range of a working colour (42–68) rather than tuning hue alone.
- Red flash on flower switch — switching flowers triggered one frame where the new palette applied to the old point cloud. Fixed by clearing state.pts = [] before updating state.flower.


## Attribution
This project wouldn't exist without the mathematical foundations laid by these brilliant developers whom I took great inspiration from.

- **János Karsai** - original parametric flower math
  - [University of Szeged](http://www.model.u-szeged.hu)
  - [Notebook Archive](https://notebookarchive.org/flowers-in-mathematica--2018-10-10qzu3x/)
- **Kazuki Umeda** - [3D Math Flowers Playlist](https://www.youtube.com/watch?v=8fgJ6i96fTY&list=PLRD0f8kJKduJ2GT90yme_SKcgn7lqsiUC)
- **Sam Brunacini** - [Parametric Flowers](http://sambrunacini.com/parametric-flowers/)


## Performance - Ongoing
rAF frames take ~54ms on dense flowers, the cost is inherent to sorting and drawing 40k points per frame via fillRect. Tried pre-caching all flowers and staggering builds across setTimeout tasks to reduce INP, but the frame cost itself remains. The real fix is switching from fillRect to ImageData pixel writes, one flush per frame instead of one API call per point, estimated 3–5x faster. This is yet to be implemented.