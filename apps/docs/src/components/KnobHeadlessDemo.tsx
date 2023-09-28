'use client';
import {useState} from 'react';
import {KnobHeadless} from 'react-knob-headless';

const min = 0;
const max = 100;
const valueDefault = 70;
const angleMin = -145; // The minumum knob position angle, when x = 0
const angleMax = 145; // The maximum knob position angle, when x = 1
const roundFn = Math.round;
const toText = (valueRaw: number): string => `${roundFn(valueRaw)}%`;

export function KnobHeadlessDemo() {
  const [valueRaw, setValueRaw] = useState(valueDefault);
  const value01 = mapTo01Linear(valueRaw, min, max);
  const angle = mapFrom01Linear(value01, angleMin, angleMax);
  return (
    <div className='flex flex-col gap-2 items-center'>
      <KnobHeadless
        includeIntoTabOrder
        className='relative w-12 h-12'
        min={min}
        max={max}
        valueRaw={valueRaw}
        valueDefault={valueDefault}
        roundFn={roundFn}
        toText={toText}
        onValueRawChange={setValueRaw}
      >
        <div className='absolute h-full w-full rounded-full bg-gray-800'>
          <div
            className='absolute h-full w-full'
            style={{rotate: `${angle}deg`}}
          >
            <div className='absolute left-1/2 top-0 h-1/2 w-[2px] -translate-x-1/2 rounded-sm bg-gray-500' />
          </div>
        </div>
      </KnobHeadless>
      <button
        type='button'
        className='p-2 border border-gray-500 rounded-sm'
        onClick={() => {
          setValueRaw(10);
        }}
      >
        set to 10%
      </button>
    </div>
  );
}

const mapFrom01Linear = (x: number, min: number, max: number): number =>
  (max - min) * x + min;

const mapTo01Linear = (x: number, min: number, max: number): number =>
  (x - min) / (max - min);
