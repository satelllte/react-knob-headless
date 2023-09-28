'use client';
import {useId, useState} from 'react';
import clsx from 'clsx';
import {KnobHeadless, KnobHeadlessOutput} from 'react-knob-headless';

type KnobAbletonPanProps = {
  readonly theme: 'mid-light' | 'ableton-9';
  readonly valueDefault?: number;
};

export function KnobAbletonPan({theme, valueDefault = 0}: KnobAbletonPanProps) {
  const knobId = useId();
  const [valueRaw, setValueRaw] = useState(valueDefault);
  const value = roundFn(valueRaw);

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
        aria-label='Pan'
        className={clsx(
          'relative w-12 h-4 border flex items-center justify-center overflow-hidden focus:outline focus:outline-1',
          backgroundColorClass,
          borderColorClass,
          focusOutlineClass,
        )}
        min={min}
        max={max}
        valueRaw={valueRaw}
        valueDefault={valueDefault}
        roundFn={roundFn}
        toText={toText}
        onValueRawChange={setValueRaw}
      >
        <div
          className={clsx(
            'absolute inset-0 w-1/2',
            backgroundColorAccentClass,
            value > 0 && 'left-1/2',
          )}
        >
          <div
            className={clsx('absolute inset-0', backgroundColorClass)}
            style={{transform: `translateX(${value * 100}%)`}}
          />
        </div>
        <KnobHeadlessOutput
          htmlFor={knobId}
          className={clsx(
            'relative pointer-events-none select-none text-xs',
            textColorClass,
          )}
        >
          {toText(valueRaw)}
        </KnobHeadlessOutput>
      </KnobHeadless>
    </div>
  );
}

const min = -1;
const max = 1;
const roundFn = (x: number): number => Math.round(x * 100) / 100;
const toText = (valueRaw: number): string => {
  const pan = Math.round(roundFn(valueRaw) * 50);
  if (pan === 0) {
    return 'C';
  }

  const direction = pan < 0 ? 'L' : 'R';
  return `${Math.abs(pan)}${direction}`;
};
