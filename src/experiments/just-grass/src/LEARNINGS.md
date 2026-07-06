# Just Grass

## What this is?

Just grass serves as a real-time interactive field simulation built on HTML canvas. The field reacts to touch and movement, grows wild when left alone, and sways in user-controlled wind.

## Initial Inspiration

Laziness to actually go an touch some grass outside. So I thought how about I grow some of my own on the browser, which proved to be quite fun physics puzzle to solve.

## Concept

The project started as a simple 1D prototype just plain single lines swaying back and forth. While the math worked, it looked flat and dead. To add flavor and realism, we upgraded it to full 2D blade geometry, giving each blade a physical body that tapers from a thick root to a pointy tip.

The final piece moves naturally between three interactive states:

- Agitation: Waving your cursor or finger through the field pushes the grass away based on your speed and distance. Each blade is its own independent physics object that parts, springs back, and leaves a realistic trail of motion.

- Overgrowth: If you leave the field completely alone for a few seconds, the grass enters a wild state. It rapidly grows past its normal height and a natural background storm kicks in.

- Wind: A toggleable, user-controlled layer. You can dial the strength from a gentle breeze to a heavy storm. The wind doesn't hit everything at once; it is staggered across the screen so it rolls through the field in realistic waves.

## Tools Used

- HTML Canvas 2D API: all rendering, no WebGL
- TypeScript: class-based architecture split across GrassBlade and GrassField
- Bezier Curve Geometry: cubic bezier control points calculated per frame to guide the spine and silhouette of each blade, sampled at 10 points for a realistic width profile
- Kinematic Physics: custom implementation of Hooke's Law (spring force) paired with a damping term for air drag, each blade running its own independent simulation
- CSS transitions: UI state changes (wind toggle, overgrowth text, slider reveal) handled purely in CSS

## Key concepts encountered

- The Slicing Curve Bug (Bezier Overlap): When wind or mouse forces pushed a blade too hard, its mathematical control points would bend past the tip, causing the blade to fold backward into a sharp, glitched wedge. I fixed this by capping how far the control points can travel relative to the blade's tip.

- Separating Growth from Physics: Initially, I tried to keep the grass inside its boundaries by constantly capping its height inside the physics loop, which caused the tall grass to twitch and clip. I fixed this by separating the two forces: height is strictly controlled by natural growth, while wind and touch only manipulate the physical tilt (displacement).

- Spine-Based Interaction: Testing mouse touches only against the bottom root of a blade meant tall stalks wouldn't react when you brushed their tips. I fixed this by sampling four distinct points up the actual curved spine of the blade, so touching the tip triggers a response just as easily as touching the base.

- Wind as a Wave Front: Pushing every blade with the exact same wind value at the same time made the screen look like a household fan was blowing on it. By offsetting the wind's timing (phase) based on each blade's horizontal position (X coordinate), the wind rolls across the field as a fluid, cascading wave.

- Fake 3D Depth Sorting: By simply sorting the blades by their vertical position (Y coordinate) before rendering, farther blades are automatically drawn first and layered behind closer ones. This creates a rich 3D environment using simple 2D math.

- Pre-Baking Colors for Speed: Generating complex HSL color code text strings inside a 60 FPS drawing loop was putting a heavy load on the browser's memory management, causing micro-stutters. Moving the color generation to the constructor completely smoothed out the frame rate.

## What still doesn't work!!!

- There is still a minor bug where if the grass is fully overgrown and you slice through it with your cursor at maximum speed, the blade shapes can briefly tear or stretch unnaturally under the aggressive physics calculation. It is partially fixed, but not completely gone.

### Considerable mentions

- The grass goes through a quiet phase right after it sprouts where it barely moves. Short blades simply don't have much range to swing through, the taller they get, the more they can move. So the field naturally comes alive as it grows. It looks like something is broken at first but it's actually the physics doing the right thing.

- There is an awkward pause right after you stop interacting before the field settles back into its natural sway. The grass is mid-physics transition, it was being pushed, now it's recovering, and that handoff takes a beat. We reduced it but couldn't fully eliminate it without making the blades feel rubbery during interaction. Still an open problem.

- Some might hold their stance on the simulation not mimicking grass but I'd consider maybe closing one eye, and leaning back in your chair you will finally see it - haha.
