import clsx from 'clsx';
import {mapFrom01Linear} from 'react-knob-headless/utils';

type KnobBaseThumbProps = {
  readonly theme: 'stone' | 'pink' | 'green' | 'sky';
  readonly value01: number;
};

export function KnobBaseThumb({theme, value01}: KnobBaseThumbProps) {
  const angleMin = -145;
  const angleMax = 145;
  const angle = mapFrom01Linear(value01, angleMin, angleMax);
  return (
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
  );
}
