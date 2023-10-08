'use client';
import {useState} from 'react';
import {KnobHeadless} from 'react-knob-headless';
import {mapTo01Linear} from 'react-knob-headless/utils';
import {KnobBaseThumb} from './KnobBaseThumb';

type KnobBaseThumbProps = React.ComponentProps<typeof KnobBaseThumb>;
type KnobDecorativeProps = Pick<KnobBaseThumbProps, 'theme'> & {
  readonly valueDefault: number;
};

export function KnobDecorative({theme, valueDefault}: KnobDecorativeProps) {
  const [valueRaw, setValueRaw] = useState<number>(valueDefault);
  const value01 = mapTo01Linear(valueRaw, min, max);
  return (
    <KnobHeadless
      className='relative outline-none w-16 h-16'
      aria-label={`Decorative knob with "${theme}" theme`}
      min={min}
      max={max}
      dragSensitivity={dragSensitivity}
      valueRaw={valueRaw}
      valueRawRoundFn={valueRawRoundFn}
      valueRawDisplayFn={valueRawDisplayFn}
      onValueRawChange={setValueRaw}
    >
      <KnobBaseThumb theme={theme} value01={value01} />
    </KnobHeadless>
  );
}

const min = 0;
const max = 100;
const dragSensitivity = 0.006;
const valueRawRoundFn = Math.round;
const valueRawDisplayFn = (valueRaw: number): string =>
  `${valueRawRoundFn(valueRaw)} units`;
