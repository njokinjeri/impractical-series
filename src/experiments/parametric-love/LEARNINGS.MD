# Parametric Love

## What this is?

An interactive 3D experiment that explores the intersection of mathematical shapes and fluid dynamics. It features a procedurally generated heart that "fills" with liquid as the user interacts with it, culminating in a particle-based burst effect.

## Initial Inspiration

The primary goal was to challenge the convention of using primitive containers (cubes/cylinders) for liquid simulations. This project aims to see if a complex, non-primitive shape like a heart could be used as a functional container for a clipping-plane-based simulation while maintaining visual accuracy.

## Concept

The core concept relies on Parametric Geometry manipulation. By taking a standard sphere and applying mathematical offsets to its vertices (x, y, z), we sculpt the heart shape.

By animating a clipping plane's constant value with a downward-facing normal (0,−1,0), we create the illusion of a container being filled with a glowing, emissive substance. This requires precise synchronization between the 3D space and the UI overlay.

## Tools Used

- Three.js: For 3D rendering and vertex manipulation.

- TypeScript: To ensure type safety and modular architecture.

- GLSL (Clipping Planes): For the liquid fill effect.

- Pointer Events API: For a unified, lag-free interaction experience across mobile and desktop.

## Key Concepts Encountered

- Bounding Box Mapping: Learned that hardcoding UI values (like 0 to 100) leads to "dead zones" in 3D. Using geometry.computeBoundingBox() allowed us to map the UI 1:1 to the actual physical limits of the mesh.

- Vertex Manipulation: Used sine waves and power functions to transform a sphere into a heart shape in real-time.

- Modular Architecture: Refactoring from a single script to a HeartEngine class to separate rendering logic from state management.

- Z-Fighting & GPU Artifacts: Encountered and solved rendering glitches by using polygonOffset and managed the localClippingEnabled state during animations.

## What didn't work

- Standard Click Listeners: These felt sluggish on mobile due to the 300ms delay. Had to pivot to the Pointer Events API for instant feedback.

- Hardcoded Fill Ranges: Initially, the liquid started filling before the heart tip, creating an empty visual gap. This was fixed by ditching magic numbers in favor of dynamic bounds.

- Simple Scaling for Bursting: Simply hiding the mesh during the burst caused clipping ghosts. Learned the necessity of explicitly toggling the renderer's clipping state during particle sequences.
