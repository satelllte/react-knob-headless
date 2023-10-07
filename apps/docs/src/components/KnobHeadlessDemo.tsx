'use client';
import {useId, useState} from 'react';
import {KnobHeadless, KnobHeadlessLabel} from 'react-knob-headless';

const min = 0;
const max = 100;
const step = 1;
const stepLarge = 10;
const dragSensitivity = 0.006;
const valueDefault = 70;
const angleMin = -145; // The minumum knob position angle, when x = 0
const angleMax = 145; // The maximum knob position angle, when x = 1
const valueRawRoundFn = Math.round;
const valueRawDisplayFn = (valueRaw: number): string =>
  `${valueRawRoundFn(valueRaw)}%`;

export function KnobHeadlessDemo() {
  const labelId = useId();
  const [valueRaw, setValueRaw] = useState(valueDefault);
  const value01 = mapTo01Linear(valueRaw, min, max);
  const angle = mapFrom01Linear(value01, angleMin, angleMax);
  return (
    <div className='flex flex-col gap-2 items-center'>
      <KnobHeadlessLabel id={labelId} className='text-xs'>
        Demo knob
      </KnobHeadlessLabel>
      <KnobHeadless
        includeIntoTabOrder
        aria-labelledby={labelId}
        className='relative w-12 h-12'
        min={min}
        max={max}
        step={step}
        stepLarge={stepLarge}
        dragSensitivity={dragSensitivity}
        valueRaw={valueRaw}
        valueRawRoundFn={valueRawRoundFn}
        valueRawDisplayFn={valueRawDisplayFn}
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
