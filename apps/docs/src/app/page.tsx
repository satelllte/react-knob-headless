import {KnobHeadless} from 'react-knob-headless';

function IndexPage() {
  return (
    <>
      <h1 className='px-4 py-8 text-center text-4xl'>React Knob Headless</h1>
      <div className='flex items-center justify-center bg-stone-800 px-4 py-8'>
        <KnobHeadless />
      </div>
    </>
  );
}

export default IndexPage;
