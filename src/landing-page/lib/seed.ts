/**
 *
 * Provides deterministic randomness for generative art.
 * Standard Math.random() is unpredictable. This file allows us to use a word
 * (like 'about' or 'contact') to generate a sequence of "random" numbers that
 * look chaotic, but will be identical every single time the page reloads.
 */

export function slugSeed(slug: string): number {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    const characterCode = slug.charCodeAt(i);
    hash = (Math.imul(31, hash) + characterCode) | 0;
  }
  return Math.abs(hash);
}

export function seededRandom(seed: number): () => number {
  let state = seed;

  return function generateNextFloat() {
    state |= 0;

    state = (state + 0x6d2b79f5) | 0;

    let scramble = Math.imul(state ^ (state >>> 15), 1 | state);
    scramble =
      (scramble + Math.imul(scramble ^ (scramble >>> 7), 61 | scramble)) ^
      scramble;

    return ((scramble ^ (scramble >>> 14)) >>> 0) / 4294967296;
  };
}

export function syncedHeartIndex(): 0 | 1 | 2 {
  const currentSystemTimeMs = Date.now();
  const timeBlockIndex = Math.floor(currentSystemTimeMs / 1400);

  return (timeBlockIndex % 3) as 0 | 1 | 2;
}
