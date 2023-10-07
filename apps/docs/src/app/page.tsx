import {KnobDecorative} from '@/components/knobs/KnobDecorative';

function IndexPage() {
  return (
    <div className='max-w-3xl px-4 mx-auto'>
      <div className='pt-12 md:pt-16'>
        <h1 className='text-3xl sm:text-4xl md:text-5xl'>
          React Knob Headless
        </h1>
        <p className='text-xl sm:text-2xl pt-3 text-stone-400'>
          Unstyled & accessible <b>knob</b> primitive for React.
        </p>
      </div>
      <div className='pt-8 md:pt-12 flex flex-wrap gap-3'>
        <KnobDecorative
          aria-label='Decorative knob with "stone" theme'
          theme='stone'
          valueDefault={0}
        />
        <KnobDecorative
          aria-label='Decorative knob with "pink" theme'
          theme='pink'
          valueDefault={40}
        />
        <KnobDecorative
          aria-label='Decorative knob with "green" theme'
          theme='green'
          valueDefault={80}
        />
        <KnobDecorative
          aria-label='Decorative knob with "sky" theme'
          theme='sky'
          valueDefault={100}
        />
      </div>
    </div>
  );
}

export default IndexPage;
