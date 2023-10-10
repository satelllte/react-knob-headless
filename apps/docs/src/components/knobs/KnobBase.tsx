'use client';
import clsx from 'clsx';
import {useId, useState} from 'react';
import {
  KnobHeadless,
  KnobHeadlessLabel,
  KnobHeadlessOutput,
} from 'react-knob-headless';
import {mapFrom01Linear, mapTo01Linear} from '@dsp-ts/math';
import {KnobBaseThumb} from './KnobBaseThumb';

type KnobHeadlessProps = React.ComponentProps<typeof KnobHeadless>;
type KnobBaseThumbProps = React.ComponentProps<typeof KnobBaseThumb>;
type KnobBaseProps = Pick<
  KnobHeadlessProps,
  | 'valueMin'
  | 'valueMax'
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
  valueMin,
  valueMax,
  valueRawRoundFn,
  valueRawDisplayFn,
  mapTo01 = mapTo01Linear,
  mapFrom01 = mapFrom01Linear,
}: KnobBaseProps) {
  const knobId = useId();
  const labelId = useId();
  const [valueRaw, setValueRaw] = useState<number>(valueDefault);
  const value01 = mapTo01(valueRaw, valueMin, valueMax);
  const dragSensitivity = 0.006;
  return (
    <div
      className={clsx(
        'w-16 flex flex-col gap-0.5 justify-center items-center text-xs select-none',
        'outline-none focus-within:outline-1 focus-within:outline-offset-4 focus-within:outline-stone-300',
      )}
    >
      <KnobHeadlessLabel id={labelId}>{label}</KnobHeadlessLabel>
      <KnobHeadless
        id={knobId}
        aria-labelledby={labelId}
        className='relative w-16 h-16 outline-none'
        valueMin={valueMin}
        valueMax={valueMax}
        valueRaw={valueRaw}
        valueRawRoundFn={valueRawRoundFn}
        valueRawDisplayFn={valueRawDisplayFn}
        dragSensitivity={dragSensitivity}
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
