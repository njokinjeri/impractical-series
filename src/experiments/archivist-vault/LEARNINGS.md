# Archivist Vault

## What this is?

A 3D Digital Lock experiment. It’s a procedurally generated library where the user must discover and tilt three specific books in the correct sequence to trigger a hidden mechanism and reveal a secret vault.

## Initial Inspiration

The goal was to move away from standard "input field" security and recreate the "hidden chamber" trope from classic mystery films. I wanted to see if a physical interaction—tilting books, could act as a combination key.

The sequence 1370 → 1920 → 0042 was chosen to represent the evolution of our perspective on knowledge and the scale of the universe:

### Combination Breakdown

- **1370**: A reference to the era of medieval libraries where knowledge was rare, physical, and literally chained to shelves.
- **1920**: The year of "The Great Debate" in astronomy, where science first revealed our galaxy was just one of countless others in a vast universe.
- **0042**: A nod to The Hitchhiker's Guide to the Galaxy, representing the digital absurdity of seeking the "Ultimate Answer" to an infinite cosmos.

## Concept

The project was built in three distinct structural phases:

1. The Library Frame: Using CSS Grid and Flexbox to create a three-tier bookshelf that feels sturdy and physical.
2. The Procedural Books: An engine that generates 30 unique book objects, randomizing their colors and heights so no two "vaults" look identical.
3. The Secret Mechanism: A state-machine that listens for the specific sequence. When the final "key" is tilted, it triggers the CSS 3D transition to slide the entire library unit, revealing the vault behind it.

## Tools Used

- Typescript
- CSS 3D Transforms
- Module Pattern (IIFE)

## Key Concepts Encountered

- MIME Type Enforcement: Learned that modern browsers require strict application/javascript headers for modules. Encountered the video/mp2t error when trying to run raw .ts files, leading to the migration to a proper build-tool (Vite).

- Non-Null Assertions vs. Union Types: Explored the difference between using ! (authority) and | null (safety) when selecting DOM elements in TypeScript.

- Event Delegation & DOM Lifecycle: Implemented DOMContentLoaded listeners to ensure the "Engine" only ignites once the structural "Vault" (HTML) is fully rendered.

- Procedural Layout Constraints: Solved the "Mobile Cutoff" problem by programmatically pinning secret indices to the leftmost side of the shelves.

## What didn't work

- Internal State Exposure: Initially, the "found" books were stored in a global variable. This allowed anyone to open the vault via the console. Refactoring to a private closure solved this.

- CSS Transition Conflicts: Using display: none to hide the secret door caused the 3D transition to "snap" rather than slide. Switched to transform: scaleX(0) and opacity for a cinematic opening effect.

- Manual TSC Compilation: Trying to manually compile every change was slowing down the creative flow. Integrating Vite's HMR (Hot Module Replacement) allowed for real-time visual tweaking of the 3D tilt angles.
