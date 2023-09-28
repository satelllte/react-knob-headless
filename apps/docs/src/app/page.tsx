import {KnobAbletonPan} from '@/components/KnobAbletonPan';
import {KnobHeadlessDemo} from '../components/KnobHeadlessDemo';

function IndexPage() {
  return (
    <>
      <h1 className='px-4 py-8 text-center text-4xl'>React Knob Headless</h1>
      <div className='bg-black'>
        <div className='flex flex-col max-w-lg mx-auto items-center justify-center px-4 py-8 gap-4'>
          <AbletonPanCard title='Ableton: Pan knob' theme='mid-light' />
          <AbletonPanCard title='Ableton: Pan knob' theme='ableton-9' />
        </div>
      </div>
      <div className='flex flex-col px-4 py-8 pt-32 max-w-sm'>
        <h3>Playground</h3>
        <KnobHeadlessDemo />
      </div>
    </>
  );
}

function AbletonPanCard({
  title,
  theme,
}: {
  readonly title: string;
  readonly theme: 'mid-light' | 'ableton-9';
}) {
  return (
    <div className='flex-1 p-4 py-8 self-stretch bg-ableton-gray-light text-black'>
      <h3 className='text-black text-sm'>{title}</h3>
      <small className='text-stone-800 text-xs italic'>
        Theme: &quot;{theme}&quot;
      </small>
      <div className='flex pt-2 gap-1'>
        <KnobAbletonPan theme={theme} valueDefault={-1} />
        <KnobAbletonPan theme={theme} valueDefault={-0.5} />
        <KnobAbletonPan theme={theme} valueDefault={0} />
        <KnobAbletonPan theme={theme} valueDefault={0.5} />
        <KnobAbletonPan theme={theme} valueDefault={1} />
      </div>
    </div>
  );
}

export default IndexPage;
