'use client';
import {KnobAbleton} from './KnobAbleton';

type KnobAbletonProps = React.ComponentProps<typeof KnobAbleton>;
type KnobAbletonPanProps = Omit<
  KnobAbletonProps,
  | 'fill'
  | 'valueDefault'
  | 'min'
  | 'max'
  | 'step'
  | 'stepLarge'
  | 'valueRawRoundFn'
  | 'valueRawDisplayFn'
>;

export function KnobAbletonPan({
  theme,
  'aria-label': ariaLabel,
}: KnobAbletonPanProps) {
  return (
    <KnobAbleton
      theme={theme}
      fill='half'
      aria-label={ariaLabel}
      valueDefault={valueDefault}
      min={min}
      max={max}
      step={step}
      stepLarge={stepLarge}
      valueRawRoundFn={valueRawRoundFn}
      valueRawDisplayFn={valueRawDisplayFn}
    />
  );
}

const min = -1;
const max = 1;
const valueDefault = 0;
const step = 0.02;
const stepLarge = 0.2;
const valueRawRoundFn = (x: number): number => Math.round(x * 100) / 100;
const valueRawDisplayFn = (valueRaw: number): string => {
  const pan = Math.round(valueRawRoundFn(valueRaw) * 50);
  if (pan === 0) {
    return 'C';
  }

  const direction = pan < 0 ? 'L' : 'R';
  return `${Math.abs(pan)}${direction}`;
};
