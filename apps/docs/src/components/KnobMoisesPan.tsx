'use client';
import {useId, useState} from 'react';
import clsx from 'clsx';
import {KnobHeadless} from 'react-knob-headless';

type KnobMoisesPanProps = {
  readonly valueDefault?: number;
};

export function KnobMoisesPan({valueDefault = 0}: KnobMoisesPanProps) {
  const knobId = useId();
  const [valueRaw, setValueRaw] = useState(valueDefault);
  const value = valueRawRoundFn(valueRaw);
  const angle = value * 180;
  return (
    <div className='flex flex-col'>
      <KnobHeadless
        id={knobId}
        aria-label='Moises Pan Knob'
        className='relative w-9 h-9 bg-moises-gray rounded-full flex items-center justify-center overflow-hidden outline-none'
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
          className={clsx('absolute inset-0', angle < 0 && '-scale-x-100')}
          style={{
            background: `conic-gradient(${
              '#63fb97' /* Make sure the color is "moises-green" */
            } ${Math.abs(angle / 3.6)}%, transparent 0)`,
          }}
        />
        <div className='absolute inset-[1px] bg-moises-gray-dark rounded-full' />
        <div className='absolute inset-0' style={{rotate: `${angle}deg`}}>
          <div
            className={clsx(
              'absolute left-1/2 top-0 h-1/2 w-px -translate-x-1/2',
              angle === 0 ? 'bg-moises-gray' : 'bg-moises-green',
            )}
          />
        </div>
      </KnobHeadless>
      <div className='flex justify-between items-center px-0.5 text-xs text-moises-gray select-none'>
        <span>L</span>
        <span>R</span>
      </div>
    </div>
  );
}

const min = -1;
const max = 1;
const step = 0.05;
const stepLarge = 0.2;
const dragSensitivity = 0.007;
const valueRawRoundFn = (x: number): number => Math.round(x * 20) / 20;
const valueRawDisplayFn = (valueRaw: number): string => {
  const pan = Math.round(valueRawRoundFn(valueRaw) * 50);
  if (pan === 0) {
    return 'C';
  }

  const direction = pan < 0 ? 'L' : 'R';
  return `${Math.abs(pan)}${direction}`;
};
