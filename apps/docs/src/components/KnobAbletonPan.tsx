'use client';
import {useState} from 'react';
import clsx from 'clsx';
import {KnobHeadless} from 'react-knob-headless';

const min = -1;
const max = 1;
const valueDefault = 0;
const roundFn = (x: number): number => Math.round(x * 100) / 100;
const toText = (valueRaw: number): string => {
  const pan = Math.round(roundFn(valueRaw) * 50);
  if (pan === 0) {
    return 'C';
  }

  const direction = pan < 0 ? 'L' : 'R';
  return `${Math.abs(pan)}${direction}`;
};

export function KnobAbletonPan() {
  const [valueRaw, setValueRaw] = useState(valueDefault);
  const value = roundFn(valueRaw);

  return (
    <div className='flex flex-col gap-2 items-center'>
      <KnobHeadless
        className='relative w-12 h-4 border border-ableton-gray bg-ableton-white flex items-center justify-center overflow-hidden'
        min={min}
        max={max}
        valueRaw={valueRaw}
        valueDefault={valueDefault}
        roundFn={roundFn}
        toText={toText}
        aria-label='Pan'
        onValueRawChange={setValueRaw}
      >
        <div
          className={clsx(
            'absolute inset-0 w-1/2 bg-ableton-blue',
            value > 0 && 'left-1/2',
          )}
        >
          <div
            className='absolute inset-0 bg-ableton-white'
            style={{transform: `translateX(${value * 100}%)`}}
          />
        </div>
        <output className='relative pointer-events-none select-none text-xs text-ableton-gray'>
          {toText(valueRaw)}
        </output>
      </KnobHeadless>
    </div>
  );
}
