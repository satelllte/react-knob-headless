import {KnobDecorative} from '@/components/knobs/KnobDecorative';
import {KnobPercentage} from '@/components/knobs/KnobPercentage';

function IndexPage() {
  return (
    <div className='max-w-3xl px-4 mx-auto'>
      <SectionContainer>
        <h1 className='font-bold text-3xl sm:text-4xl md:text-5xl'>
          React Knob Headless
        </h1>
        <p className='font-semibold text-xl sm:text-2xl pt-3 text-stone-400'>
          Unstyled & accessible <b>knob</b> primitive for React.
        </p>
        <div className='pt-8 flex flex-wrap gap-3'>
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
      </SectionContainer>
      <SectionContainer>
        <H2>Installation</H2>
        <Paragraph>Install the component from your command line.</Paragraph>
        <Code>npm install --save-exact react-knob-headless</Code>
      </SectionContainer>
      <SectionContainer>
        <H2>Examples</H2>
        <div className='pt-2'>
          <H3>Percentage knob</H3>
          <Paragraph>
            Represents the percentage. Useful for values like
            &quot;sustain&quot;, &quot;dry/wet&quot;, macros, etc.
          </Paragraph>
          <div className='pt-6 flex gap-4'>
            <KnobPercentage label='Sustain' theme='stone' />
            <KnobPercentage label='Dry/Wet' theme='sky' />
          </div>
        </div>
      </SectionContainer>
    </div>
  );
}

function SectionContainer({children}: {readonly children: React.ReactNode}) {
  return <div className='pt-12 md:pt-16'>{children}</div>;
}

function H2({children}: {readonly children: React.ReactNode}) {
  return <h2 className='font-semibold text-xl sm:text-2xl'>{children}</h2>;
}

function H3({children}: {readonly children: React.ReactNode}) {
  return <h3 className='font-semibold text-base sm:text-xl'>{children}</h3>;
}

function Paragraph({children}: {readonly children: React.ReactNode}) {
  return <p className='pt-2 text-sm sm:text-base'>{children}</p>;
}

function Code({children}: {readonly children: React.ReactNode}) {
  return (
    <pre className='mt-4 py-3 px-4 border border-stone-400 text-stone-400 rounded-md text-xs sm:text-sm overflow-auto'>
      <code>{children}</code>
    </pre>
  );
}

export default IndexPage;
