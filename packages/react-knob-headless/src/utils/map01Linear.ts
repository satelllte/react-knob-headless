/**
 * Maps "x" value in [0..1] range onto [min..max] range linearly
 */
export const mapFrom01Linear = (x: number, min: number, max: number): number =>
  (max - min) * x + min;

/**
 * Maps "x" value in [min..max] range onto [0..1] range linearly
 */
export const mapTo01Linear = (x: number, min: number, max: number): number =>
  (x - min) / (max - min);
