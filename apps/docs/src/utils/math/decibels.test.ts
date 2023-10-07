import {describe, expect, it} from 'vitest';
import {gainToDecibels, dbMin} from './decibels';

describe('gainToDecibels', () => {
  it('should convert gain to decibels correctly', () => {
    expect(gainToDecibels(10)).toBeCloseTo(20.0);
    expect(gainToDecibels(2)).toBeCloseTo(6.02);
    expect(gainToDecibels(1)).toBeCloseTo(0);
    expect(gainToDecibels(0.5)).toBeCloseTo(-6.02);
    expect(gainToDecibels(0.25)).toBeCloseTo(-12.04);
    expect(gainToDecibels(0.125)).toBeCloseTo(-18.06);
    expect(gainToDecibels(0.01)).toBeCloseTo(-40);
    expect(gainToDecibels(0.001)).toBeCloseTo(-60);
  });

  it(`should return ${dbMin} for extremely low values`, () => {
    expect(gainToDecibels(1e-10)).toBeCloseTo(dbMin);
    expect(gainToDecibels(1e-20)).toBeCloseTo(dbMin);
    expect(gainToDecibels(1e-30)).toBeCloseTo(dbMin);
    expect(gainToDecibels(1e-40)).toBeCloseTo(dbMin);
    expect(gainToDecibels(0)).toBeCloseTo(dbMin);
  });
});
