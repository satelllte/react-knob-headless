import {describe, expect, it} from 'vitest';
import {mapFrom01Linear, mapTo01Linear} from './map01Linear';

describe('mapFrom01Linear', () => {
  it('should correctly map values within the [0..1] range to [MIN..MAX] linearly', () => {
    expect(mapFrom01Linear(0, 10, 20)).toBe(10);
    expect(mapFrom01Linear(0.2, -10, 10)).toBeCloseTo(-6);
    expect(mapFrom01Linear(0.5, 0, 100)).toBe(50);
    expect(mapFrom01Linear(1, -50, 50)).toBe(50);
  });

  it('should return MIN when X = 0', () => {
    expect(mapFrom01Linear(0, 5, 15)).toBe(5);
    expect(mapFrom01Linear(0, -20, -10)).toBe(-20);
  });

  it('should return MAX when X = 1', () => {
    expect(mapFrom01Linear(1, 5, 15)).toBe(15);
    expect(mapFrom01Linear(1, -20, -10)).toBe(-10);
  });
});

describe('mapTo01Linear', () => {
  it('should correctly map values within the [MIN..MAX] range to [0..1] linearly', () => {
    expect(mapTo01Linear(10, 10, 20)).toBe(0);
    expect(mapTo01Linear(15, 10, 20)).toBe(0.5);
    expect(mapTo01Linear(20, 10, 20)).toBe(1);
    expect(mapTo01Linear(-5, -10, 10)).toBe(0.25);
  });

  it('should return 0 when X = MIN', () => {
    expect(mapTo01Linear(0, 0, 100)).toBe(0);
    expect(mapTo01Linear(-50, -50, 50)).toBe(0);
  });

  it('should return 1 when X = MAX', () => {
    expect(mapTo01Linear(100, 0, 100)).toBe(1);
    expect(mapTo01Linear(50, -50, 50)).toBe(1);
  });
});
