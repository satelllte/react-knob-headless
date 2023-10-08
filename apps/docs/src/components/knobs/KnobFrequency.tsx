'use client';
import clsx from 'clsx';
import {useId, useState} from 'react';
import {
  KnobHeadless,
  KnobHeadlessLabel,
  KnobHeadlessOutput,
} from 'react-knob-headless';
import {mapFrom01Linear} from 'react-knob-headless/utils';
import {NormalisableRange} from '@/utils/math/NormalisableRange';

type KnobFrequencyProps = {
  readonly label: string;
  readonly theme: 'stone' | 'pink' | 'green' | 'sky';
};

export function KnobFrequency({label, theme}: KnobFrequencyProps) {
  const knobId = useId();
  const labelId = useId();
  const [valueRaw, setValueRaw] = useState<number>(valueDefault);
  const value01 = mapTo01(valueRaw);
  const angle = mapFrom01Linear(value01, angleMin, angleMax);
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
        step={step}
        stepLarge={stepLarge}
        dragSensitivity={dragSensitivity}
        valueRaw={valueRaw}
        valueRawRoundFn={valueRawRoundFn}
        valueRawDisplayFn={valueRawDisplayFn}
        mapTo01={mapTo01}
        mapFrom01={mapFrom01}
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
          <div
            className='absolute h-full w-full'
            style={{rotate: `${angle}deg`}}
          >
            <div className='absolute left-1/2 top-0 h-1/2 w-[2px] -translate-x-1/2 rounded-sm bg-stone-950' />
          </div>
        </div>
      </KnobHeadless>
      <KnobHeadlessOutput htmlFor={knobId}>
        {valueRawDisplayFn(valueRaw)}
      </KnobHeadlessOutput>
    </div>
  );
}

const min = 20;
const max = 20000;
const valueDefault = 440;
const step = 1;
const stepLarge = 10;
const dragSensitivity = 0.006;
const angleMin = -145; // The minumum knob position angle, when x = 0
const angleMax = 145; // The maximum knob position angle, when x = 1
const valueRawRoundFn = (x: number): number => x;
const valueRawDisplayFn = (hz: number): string => {
  if (hz < 100) {
    return `${hz.toFixed(1)} Hz`;
  }

  if (hz < 1000) {
    return `${hz.toFixed(0)} Hz`;
  }

  const kHz = hz / 1000;

  if (hz < 10000) {
    return `${kHz.toFixed(2)} kHz`;
  }

  return `${kHz.toFixed(1)} kHz`;
};

const normalisableRange = new NormalisableRange(min, max, 1000);
const mapTo01 = (x: number) => normalisableRange.mapTo01(x);
const mapFrom01 = (x: number) => normalisableRange.mapFrom01(x);
