import clsx from 'clsx';
import {useId, useState} from 'react';
import {KnobHeadless, KnobHeadlessOutput} from 'react-knob-headless';

type KnobHeadlessProps = React.ComponentProps<typeof KnobHeadless>;

type KnobAbletonProps = Pick<
  KnobHeadlessProps,
  'min' | 'max' | 'step' | 'stepLarge' | 'valueRawRoundFn' | 'valueRawDisplayFn'
> & {
  readonly theme: 'mid-light' | 'ableton-9';
  readonly fill: 'full' | 'half';
  readonly 'aria-label': string;
  readonly valueDefault: number;
};

export function KnobAbleton({
  theme,
  fill,
  'aria-label': ariaLabel,
  valueDefault,
  min,
  max,
  step,
  stepLarge,
  valueRawRoundFn,
  valueRawDisplayFn,
}: KnobAbletonProps) {
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
        aria-label={ariaLabel}
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
            'absolute inset-0',
            backgroundColorAccentClass,
            fill === 'full' ? 'w-full' : 'w-1/2',
            fill === 'half' && value01 >= 0.5 && 'left-1/2',
          )}
        >
          <div
            className={clsx('absolute inset-0', backgroundColorClass)}
            style={{
              transform:
                fill === 'full'
                  ? `translateX(${value01 * 100}%)`
                  : `translateX(${(value01 * 2 - 1) * 100}%)`,
            }}
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

const dragSensitivity = 0.005;

const mapTo01Linear = (x: number, min: number, max: number): number =>
  (x - min) / (max - min);
