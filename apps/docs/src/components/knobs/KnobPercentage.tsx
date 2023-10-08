'use client';
import {KnobBase} from './KnobBase';

type KnobBaseProps = React.ComponentProps<typeof KnobBase>;
type KnobPercentageProps = Pick<KnobBaseProps, 'theme' | 'label'>;

export function KnobPercentage({theme, label}: KnobPercentageProps) {
  return (
    <KnobBase
      theme={theme}
      label={label}
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
const stepLarge = 10;
const valueRawRoundFn = Math.round;
const valueRawDisplayFn = (valueRaw: number): string =>
  `${valueRawRoundFn(valueRaw)}%`;
