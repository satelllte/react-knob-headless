'use client';
import {KnobAbleton} from './KnobAbleton';

type KnobAbletonProps = React.ComponentProps<typeof KnobAbleton>;
type KnobAbletonPercentageProps = Omit<
  KnobAbletonProps,
  | 'fillMode'
  | 'valueDefault'
  | 'min'
  | 'max'
  | 'step'
  | 'stepLarge'
  | 'valueRawRoundFn'
  | 'valueRawDisplayFn'
>;

export function KnobAbletonPercentage({
  theme,
  'aria-label': ariaLabel,
}: KnobAbletonPercentageProps) {
  return (
    <KnobAbleton
      theme={theme}
      fillMode='full'
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

const min = 0;
const max = 100;
const valueDefault = 50;
const step = 1;
const stepLarge = 5;
const valueRawRoundFn = (x: number): number => Math.round(x * 10) / 10;
const valueRawDisplayFn = (valueRaw: number): string => {
  const value = valueRawRoundFn(valueRaw);
  return `${value < 10 ? value.toFixed(1) : value.toFixed(0)} %`;
};
