'use client';
import clsx from 'clsx';
import {useId, useState} from 'react';
import {
  KnobHeadless,
  KnobHeadlessLabel,
  KnobHeadlessOutput,
} from 'react-knob-headless';
import {mapFrom01Linear, mapTo01Linear} from 'react-knob-headless/utils';
import {KnobBaseThumb} from './KnobBaseThumb';

type KnobHeadlessProps = React.ComponentProps<typeof KnobHeadless>;
type KnobBaseThumbProps = React.ComponentProps<typeof KnobBaseThumb>;
type KnobBaseProps = Pick<
  KnobHeadlessProps,
  | 'min'
  | 'max'
  | 'valueRawRoundFn'
  | 'valueRawDisplayFn'
  | 'mapTo01'
  | 'mapFrom01'
> &
  Pick<KnobBaseThumbProps, 'theme'> & {
    readonly label: string;
    readonly valueDefault: number;
  };

export function KnobBase({
  theme,
  label,
  valueDefault,
  min,
  max,
  valueRawRoundFn,
  valueRawDisplayFn,
  mapTo01 = mapTo01Linear,
  mapFrom01 = mapFrom01Linear,
}: KnobBaseProps) {
  const knobId = useId();
  const labelId = useId();
  const [valueRaw, setValueRaw] = useState<number>(valueDefault);
  const value01 = mapTo01(valueRaw, min, max);
  const dragSensitivity = 0.006;
  return (
    <div
      className={clsx(
        'w-16 flex flex-col justify-center items-center text-sm select-none',
        'outline-none focus-within:outline-1 focus-within:outline-offset-4 focus-within:outline-stone-300',
      )}
    >
      <KnobHeadlessLabel id={labelId}>{label}</KnobHeadlessLabel>
      <KnobHeadless
        id={knobId}
        aria-labelledby={labelId}
        className='relative w-16 h-16 outline-none'
        min={min}
        max={max}
        dragSensitivity={dragSensitivity}
        valueRaw={valueRaw}
        valueRawRoundFn={valueRawRoundFn}
        valueRawDisplayFn={valueRawDisplayFn}
        mapTo01={mapTo01}
        mapFrom01={mapFrom01}
        onValueRawChange={setValueRaw}
      >
        <KnobBaseThumb theme={theme} value01={value01} />
      </KnobHeadless>
      <KnobHeadlessOutput htmlFor={knobId}>
        {valueRawDisplayFn(valueRaw)}
      </KnobHeadlessOutput>
    </div>
  );
}
