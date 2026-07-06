# Astraeus Flow

## What this is?

Astreaus Flow represents a real-time visualization of the Genesis Effect - this a speculative physics concept from Star Trek II, that re-imagines rapid planetary creation through expanding waves of transformative energy.

Our implementation transforms the Genesis Effect into a live physics playground where 15,000 particles exist in a constant tug-of-war between structure and chaos. Users act as the catalyst, using the Energy, Tension, and Drift controls to manipulate how matter scatters, snaps back, and vibrates in real-time.

## Initial Inspiration

The project was born from the "Genesis Effect" from Star Trek II: The Wrath of Khan. I wanted to capture that moment where matter is disrupted and reorganized instantly. The name Astraeus (the Titan god of dusk and stars) was chosen, befittingly so.

## Concept

The project is built on the idea of Resilient Geometry, a digital star-system that remembers its shape.

- Initial particle circle: Each particle is tethered to a specific coordinate. This represents a Genesis Matrix, where matter always tries to return to a stable, pre-defined order.

- User Interaction: The user acts as the disruptive force. Using mouse-repulsion math, you temporarily override the blueprint, scattering particles based on distance and speed.

- Flow: We use Simplex Noise to give the particles a pulse. This ensures the starfield never looks static, simulating a living energy field rather than dead pixels.

## Tools Used

- Three.js
- TypeScript:
- Simplex Noise (Math) - Algorithm used for generating organic, non-linear motion.
- GLSL/Shaders: Custom logic for calculating particle positioning and velocity.
- Vector Physics: Manual implementation of attraction and repulsion forces.

## Key Concepts Encountered

- Simplex Noise vs. randomness - learned to use noise functions instead of random numbers to create smooth, flow-like drift that looks more natural than jittery.

- Ray-to-Sphere Interaction: Learned that mouse interaction isn't just about X and Y. We had to implement a distance-check formula to ensure only the particles "hit" by the mouse reacted, preventing the whole screen from exploding at once.

- Normalizing Performance: Discovered that updating 15,000 objects in a standard array is slow. Alternatively, picked up on Typed Arrays (Float32Array) to talk to the GPU more efficiently which helped in preventing any lags to the browser.

- State-Driven HUD Mapping: DOM manipulation is expensive. Instead of searching for elements every frame, I mapped our variables to a labelMap object, ensuring the UI only updates when the user actually moves a slider.

## What didn't work

The Perfection Trap: I fell into a significant procrastination cycle trying to define what a perfect execution of the Genesis Effect should look like. In my own analysis, I spent more time theorizing about the physics of a terraforming wave than actually writing the code, which delayed the initial progress I could have made.
