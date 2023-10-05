'use client';
import {KnobAbleton} from './KnobAbleton';

type KnobAbletonProps = React.ComponentProps<typeof KnobAbleton>;
type KnobAbletonVolumeProps = Omit<
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

export function KnobAbletonVolume({
  theme,
  'aria-label': ariaLabel,
}: KnobAbletonVolumeProps) {
  return (
    <KnobAbleton
      theme={theme}
      fill='full'
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

const min = -70;
const max = 6;
const valueDefault = 0;
const step = 0.1;
const stepLarge = 1;
const valueRawRoundFn = (x: number): number => Math.round(x * 10) / 10;
const valueRawDisplayFn = (valueRaw: number): string => {
  const value = valueRawRoundFn(valueRaw);
  if (value <= min) {
    return '-inf dB';
  }

  return `${valueRawRoundFn(valueRaw).toFixed(1)} dB`;
};
