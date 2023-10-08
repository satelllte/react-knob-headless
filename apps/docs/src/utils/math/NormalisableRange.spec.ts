import {describe, expect, it} from 'vitest';
import {NormalisableRange} from './NormalisableRange';

describe('NormalisableRange', () => {
  it('works linearly when perfectly centered', () => {
    const nr = new NormalisableRange(10000, 20000, 15000);

    expect(nr.mapTo01(10000)).toBe(0);
    expect(nr.mapTo01(12500)).toBe(0.25);
    expect(nr.mapTo01(15000)).toBe(0.5);
    expect(nr.mapTo01(20000)).toBe(1);

    expect(nr.mapFrom01(0)).toBe(10000);
    expect(nr.mapFrom01(0.5)).toBe(15000);
    expect(nr.mapFrom01(0.75)).toBe(17500);
    expect(nr.mapFrom01(1)).toBe(20000);
  });

  it('interpolates with skew when the center is off', () => {
    const nr = new NormalisableRange(100, 200, 110);

    expect(nr.mapTo01(100)).toBe(0);
    expect(nr.mapTo01(105)).toBeCloseTo(0.405);
    expect(nr.mapTo01(110)).toBe(0.5);
    expect(nr.mapTo01(150)).toBeCloseTo(0.81);
    expect(nr.mapTo01(200)).toBe(1);

    expect(nr.mapFrom01(0)).toBe(100);
    expect(nr.mapFrom01(0.25)).toBeCloseTo(101);
    expect(nr.mapFrom01(0.5)).toBe(110);
    expect(nr.mapFrom01(0.75)).toBeCloseTo(138.46);
    expect(nr.mapFrom01(1)).toBe(200);
  });
});
