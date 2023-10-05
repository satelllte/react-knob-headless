'use client';
import {useId, useState} from 'react';
import clsx from 'clsx';
import {KnobHeadless, KnobHeadlessOutput} from 'react-knob-headless';

type KnobAbletonVolumeProps = {
  readonly theme: 'mid-light' | 'ableton-9';
  readonly valueDefault?: number;
};

export function KnobAbletonVolume({
  theme,
  valueDefault = 0,
}: KnobAbletonVolumeProps) {
  const knobId = useId();
  const [valueRaw, setValueRaw] = useState(valueDefault);
  const value01 = mapTo01Linear(valueRaw, min, max);

  const backgroundColorClass = clsx(
    theme === 'mid-light' && 'bg-ableton-white',
    theme === 'ableton-9' && 'bg-ableton-9-white',
  );
  const backgroundColorAccentClass = clsx(
    theme === 'mid-light' && 'bg-ableton-blue',
    theme === 'ableton-9' && 'bg-ableton-9-orange',
  );
  const borderColorClass = clsx(
    theme === 'mid-light' && 'border-ableton-gray',
    theme === 'ableton-9' &&
      'border-ableton-9-gray focus:border-ableton-9-gray-dark',
  );
  const focusOutlineClass = clsx(
    theme === 'mid-light' && 'focus:outline-ableton-gray-dark',
    theme === 'ableton-9' && 'focus:outline-ableton-9-gray-dark',
  );
  const textColorClass = clsx(
    theme === 'mid-light' && 'text-ableton-gray-dark',
    theme === 'ableton-9' && 'text-ableton-9-gray-dark',
  );

  return (
    <div className='flex flex-col gap-2 items-center'>
      <KnobHeadless
        id={knobId}
        aria-label='Volume'
        className={clsx(
          'relative w-14 h-4 border flex items-center justify-center overflow-hidden focus:outline focus:outline-1',
          backgroundColorClass,
          borderColorClass,
          focusOutlineClass,
        )}
        min={min}
        max={max}
        step={step}
        stepLarge={stepLarge}
        valueRaw={valueRaw}
        dragSensitivity={dragSensitivity}
        valueRawRoundFn={valueRawRoundFn}
        valueRawDisplayFn={valueRawDisplayFn}
        onValueRawChange={setValueRaw}
      >
        <div
          className={clsx(
            'absolute inset-0 w-full',
            backgroundColorAccentClass,
          )}
        >
          <div
            className={clsx('absolute inset-0', backgroundColorClass)}
            style={{transform: `translateX(${value01 * 100}%)`}}
          />
        </div>
        <KnobHeadlessOutput
          htmlFor={knobId}
          className={clsx(
            'relative pointer-events-none select-none text-xs',
            textColorClass,
          )}
        >
          {valueRawDisplayFn(valueRaw)}
        </KnobHeadlessOutput>
      </KnobHeadless>
    </div>
  );
}

const min = -70;
const max = 6;
const step = 0.1;
const stepLarge = 1;
const dragSensitivity = 0.005;
const valueRawRoundFn = (x: number): number => Math.round(x * 10) / 10;
const valueRawDisplayFn = (valueRaw: number): string => {
  const value = valueRawRoundFn(valueRaw);
  if (value <= min) {
    return '-inf dB';
  }

  return `${valueRawRoundFn(valueRaw).toFixed(1)} dB`;
};

const mapTo01Linear = (x: number, min: number, max: number): number =>
  (x - min) / (max - min);
