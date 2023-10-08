import {KnobDecorative} from '@/components/knobs/KnobDecorative';
import {KnobFrequency} from '@/components/knobs/KnobFrequency';
import {KnobPercentage} from '@/components/knobs/KnobPercentage';

function IndexPage() {
  return (
    <div className='max-w-3xl px-4 mx-auto pb-12 sm:pb-16'>
      <Section>
        <h1 className='font-bold text-3xl sm:text-4xl md:text-5xl'>
          React Knob Headless
        </h1>
        <p className='font-semibold text-xl sm:text-2xl pt-3 text-stone-400'>
          Unstyled & accessible <b>knob</b> primitive for React.
        </p>
        <div className='pt-8 flex flex-wrap gap-3'>
          <KnobDecorative theme='stone' valueDefault={0} />
          <KnobDecorative theme='pink' valueDefault={40} />
          <KnobDecorative theme='green' valueDefault={80} />
          <KnobDecorative theme='sky' valueDefault={100} />
        </div>
      </Section>
      <Section>
        <H2>Installation</H2>
        <Paragraph>Install the component from your command line.</Paragraph>
        <Code>npm install --save-exact react-knob-headless</Code>
      </Section>
      <Section>
        <H2>Examples</H2>
        <div className='pt-2 flex flex-col gap-10'>
          <Example
            title='Simple linear knob'
            description='By default, the knob interpolation occurs linearly, which is useful for values like "sustain", "dry/wet", "pan", etc.'
          >
            <KnobPercentage label='Dry/Wet' theme='sky' />
          </Example>
          <Example
            title='Custom interpolation'
            description='A custom interpolation can be made whenever knob values should distribute non-linearly. This is useful for values like "frequency", "attack", "release", etc.'
          >
            <KnobFrequency label='Frequency' theme='green' />
          </Example>
        </div>
      </Section>
    </div>
  );
}

function Section({children}: {readonly children: React.ReactNode}) {
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

function Example({
  title,
  description,
  children,
}: {
  readonly title: string;
  readonly description: string;
  readonly children: React.ReactNode;
}) {
  return (
    <div>
      <H3>{title}</H3>
      <Paragraph>{description}</Paragraph>
      <div className='pt-6 flex gap-4'>{children}</div>
    </div>
  );
}

export default IndexPage;
