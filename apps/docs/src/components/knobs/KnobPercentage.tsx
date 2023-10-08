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
      valueMin={valueMin}
      valueMax={valueMax}
      valueRawRoundFn={valueRawRoundFn}
      valueRawDisplayFn={valueRawDisplayFn}
    />
  );
}

const valueMin = 0;
const valueMax = 100;
const valueDefault = 50;
const valueRawRoundFn = Math.round;
const valueRawDisplayFn = (valueRaw: number): string =>
  `${valueRawRoundFn(valueRaw)}%`;
