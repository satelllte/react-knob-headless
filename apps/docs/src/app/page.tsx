import {KnobAbletonPan} from '@/components/KnobAbletonPan';
import {KnobHeadlessDemo} from '../components/KnobHeadlessDemo';

function IndexPage() {
  return (
    <>
      <h1 className='px-4 py-8 text-center text-4xl'>React Knob Headless</h1>
      <div className='flex flex-col items-center justify-center bg-stone-800 px-4 py-8'>
        <KnobHeadlessDemo />
        <KnobHeadlessDemo />
      </div>
      <div className='flex items-center justify-center px-4 py-8 bg-ableton-gray-light'>
        <KnobAbletonPan />
      </div>
    </>
  );
}

export default IndexPage;
