# Hypnosis Spiral

## What this is?
An interactive canvas-based hypnosis spiral designed to simulate aftereffect.

The spiral continuously rotates while giving the user control over parameters such as:
- Rotation speed, 
- Line width
- Color

With these controls, the viewer is able to experiment with how the visual motion and contrast influence the strength of the illusion.

## Initial Inspiration
The idea came from classic “hypnosis spiral” visuals often used in cartoons and movies. 
They are usually presented as a gimmick, but the underlying phenomenon relates to real perceptual effects in human vision.

I wanted to recreate the visual digitally and explore whether the illusion could reproduce the motion aftereffect-the sensation where stationary objects appear to move after staring at a moving pattern for a period of time.

Rather than simply rendering the spiral, I added controls so the viewer can manipulate the parameters and test how different configurations affect the illusion.


## Concept
The project is built around parametric spiral rendered on a canvas.

Key ideas behind the concept:
- Generate a spiral using polar coordinates
- Animate the spiral through continuous rotation
- Provide real-time parameter controls that modify the rendering loop
- Explore perceptual effects produced by repetitive high-contrast motion


## Tools Used

- Canvas API
- Typescript


## Key concepts encountered

**Archimedean Spiral**:the spiral is drawn using polar coordinates where radius grows linearly with angle (`r = a * growth`). Each arm is a closed filled path with an outer and inner edge, tapered at the center.

**requestAnimationFrame**:the animation loop runs via `requestAnimationFrame` rather than `setInterval`. It syncs to the screen refresh rate (~60fps) and automatically pauses when the tab is backgrounded.

**Canvas state management**:`ctx.save()` and `ctx.restore()` wrap each frame so transformations like `translate` and `rotate` don't accumulate across frames.

**The rotation illusion**: the outward motion effect comes purely from `ctx.rotate(angle)` incrementing each frame. The spiral geometry is static; the brain misreads the rotating curve as bands travelling outward.

**DPR scaling**: on high-density screens the canvas must be scaled by `window.devicePixelRatio` to avoid blurry rendering. The drawing buffer is multiplied by DPR while CSS dimensions stay in logical pixels.

**Canvas wipe on resize**: setting `canvas.width` or `canvas.height` resets the entire drawing buffer and context state. A `ResizeObserver` handles this by syncing the buffer to the element's display size on every resize.

**Derived vs stored values**: `growth` (arm spacing) was initially stored in settings but caused bugs on resize. Moving it to be computed fresh inside `drawSpiralShape()` from `clientWidth` and `clientHeight` each frame eliminated the issue entirely.

**CSS transitions on display:none**: `display: none` cannot be animated. Replaced with `max-height` and `opacity` transitions to achieve smooth open/close on the info panel and controls drawer.

**localStorage for persistence**: user settings are serialised to `localStorage` on every input change and merged with defaults on load using a spread pattern (`{ ...defaults, ...loadSettings() }`), so new settings added in future don't break existing saved data.


## What didn't work

- An earlier UX idea was to prevent the spiral from auto-starting and instead prompt the user if they were ready. In practice this slowed the experience, so the design was changed to auto-start on page load.

- The first spiral implementation used concentric rings drawn with `arc()` and an animated phase offset. It produced a wiper effect rather than the intended outward illusion because the color boundary was shifting along the angle rather than the radius.

- `growth` was initially a user-facing setting but was removed after it caused the spiral to break on resize. It is now derived from canvas size and loop count on every frame.

- `maxThickness` was hardcoded at `16px`, causing arms to overlap and merge into a filled circle at high loop counts. It now scales proportionally with `growth` so the gap between arms stays consistent across the full range.