/**
 * Clamps "x" value in [min..max] range
 */
export const clamp = (x: number, min: number, max: number): number =>
  Math.max(min, Math.min(max, x));

/**
 * Clamps "x" value in [0..1] range
 */
export const clamp01 = (x: number): number => clamp(x, 0, 1);
