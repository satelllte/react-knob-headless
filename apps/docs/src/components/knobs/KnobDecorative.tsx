'use client';
import clsx from 'clsx';
import {useState} from 'react';
import {KnobHeadless} from 'react-knob-headless';
import {mapFrom01Linear, mapTo01Linear} from 'react-knob-headless/utils';

type KnobDecorativeProps = {
  readonly valueDefault: number;
  readonly theme: 'stone' | 'pink' | 'green' | 'sky';
};

export function KnobDecorative({valueDefault, theme}: KnobDecorativeProps) {
  const [valueRaw, setValueRaw] = useState<number>(valueDefault);
  const value01 = mapTo01Linear(valueRaw, min, max);
  const angle = mapFrom01Linear(value01, angleMin, angleMax);
  return (
    <KnobHeadless
      className='relative outline-none w-16 h-16'
      aria-label={`Decorative knob with "${theme}" theme`}
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
      <div
        className={clsx(
          'absolute h-full w-full rounded-full',
          theme === 'stone' && 'bg-stone-300',
          theme === 'pink' && 'bg-pink-300',
          theme === 'green' && 'bg-green-300',
          theme === 'sky' && 'bg-sky-300',
        )}
      >
        <div className='absolute h-full w-full' style={{rotate: `${angle}deg`}}>
          <div className='absolute left-1/2 top-0 h-1/2 w-[2px] -translate-x-1/2 rounded-sm bg-stone-950' />
        </div>
      </div>
    </KnobHeadless>
  );
}

const min = 0;
const max = 100;
const step = 1;
const stepLarge = 10;
const dragSensitivity = 0.006;
const angleMin = -145; // The minumum knob position angle, when x = 0
const angleMax = 145; // The maximum knob position angle, when x = 1
const valueRawRoundFn = Math.round;
const valueRawDisplayFn = (valueRaw: number): string =>
  `${valueRawRoundFn(valueRaw)}%`;
