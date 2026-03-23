# Penumbra 

## What this is?

An interactive window blind simulation built entirely from HTML, divs, CSS 3D transforms and gradient blend modes.

The blinds respond to cursor position, tilting up to 75° from a resting angle of 45°. As the slats rotate, chromatic light is cast across their surface, simulating coloured light flooding through a window. The user can toggle between vertical and horizontal orientations.

## Initial Inspiration

The idea came from venetian blinds, more specifically the way light behaves differently depending on the tilt angle. A slight tilt lets in a silver of warm light, a full tilt floods the room with color and shadow.

With that could we actualize that using only the browser's compositing model, without touching a single drawing API. The constraint became the premise.

## Concept
This project is built around CSS 3D perspective transforms, which are applied to a set of div elements acting as slats.

Key ideas behind the concept:
- Simulate physics depth using `rotateY()`/ `rotateX()` inside a CSS perspective container.
- Paint chromatic cast light using stacked `radial-gradient` overlay divs composited with `mix-blend-mode:multiply` and `screen`.
- Animate entirely through a single lerped value written to CSS each frame.



## Tools Used
- HTML/CSS
- Canvas API - for the grain texture only
- Typescript


## Key Concepts Encountered

**CSS 3D perspective**: slats are plain divs rotated with `rotateY()` / `rotateX()` inside a container with `perspective: 1400px`. The browser handles all projection math; foreshortening, depth, the physical tilt, with no additional library.

**mix-blend-mode as a compositing engine**: the cast light is four overlay divs with `radial-gradient` backgrounds composited with `multiply` and `screen` blend modes. `multiply` darkens, simulating coloured light landing on a white surface. `screen` lightens, producing the hot bloom at the source edge.

**Exponential lerp as an animation system**: the entire animation is `current += (target - current) * speed`. One number, one operation per frame. Target is set by mouse position and everything visual is derived from that single value.


## What didn't work

- The first version of the cast light used a generic warm/cool two-colour split, it read as a default gradient effect rather than a specific light source. Expanding the palette to a full sunset spectrum periwinkle, orange, deep red through to near-black navy gave the cast a distinct colour temperature and made it feel intentional.

- The initial version opened at 0° with the mouse driving the full −75° to +75° range. The flat resting state made the piece feel unfinished. Constraining the mouse to ±30° around a 45° rest resolved this the blinds never go fully flat, and the cast light is visible from the first frame.

- Over-modularising this particular project seemed like overkill. Lesson learnt- only split when a module has reason to change independently, not on a "just because basis."