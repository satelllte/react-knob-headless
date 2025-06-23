import {GitHubLogoIcon} from '@radix-ui/react-icons';
import {KnobDecorative} from '@/components/knobs/KnobDecorative';
import {KnobFrequency} from '@/components/knobs/KnobFrequency';
import {KnobPercentage} from '@/components/knobs/KnobPercentage';
import {KnobPercentageHorizontal} from '@/components/knobs/KnobPercentageHorizontal';
import {KnobPercentageVerticalHorizontal} from '@/components/knobs/KnobPercentageVerticalHorizontal';
import {ExternalLinkUnstyled} from '@/components/ui/ExternalLinkUnstyled';
import {TableApi} from '@/components/ui/TableApi';

function IndexPage() {
  return (
    <div className='max-w-3xl px-4 mx-auto pb-12 sm:pb-16'>
      <div className='absolute inset-x-4 top-4 flex justify-center sm:justify-end'>
        <ExternalLinkUnstyled
          className='inline-flex items-center gap-2 font-semibold text-sm sm:text-lg text-stone-400 rounded-md'
          href='https://github.com/satelllte/react-knob-headless'
        >
          <GitHubLogoIcon
            aria-label='GitHub repository'
            width={20}
            height={20}
          />
          <span>satelllte/react-knob-headless</span>
        </ExternalLinkUnstyled>
      </div>
      <div className='pt-20'>
        <h1 className='font-bold text-3xl sm:text-4xl md:text-5xl'>
          React Knob Headless
        </h1>
        <p className='font-semibold text-xl sm:text-2xl pt-3 text-stone-400'>
          Unstyled & accessible <b>knob</b> primitive for React.
        </p>
        <div className='pt-6 flex flex-wrap gap-3'>
          <KnobDecorative theme='stone' valueDefault={0} />
          <KnobDecorative theme='pink' valueDefault={40} />
          <KnobDecorative theme='green' valueDefault={80} />
          <KnobDecorative theme='sky' valueDefault={100} />
        </div>
      </div>
      <Section title='Features'>
        <Ul>
          <Li>
            Knob primitive component. Tailored for audio applications in React.
          </Li>
          <Li>
            Unstyled. Can be styled with any styling solution: Vanilla CSS,
            Tailwind, Emotion, anything.
          </Li>
          <Li>
            Smooth drag gesture, which supports mouse & touch devices. Powered
            by{' '}
            <ExternalLinkUnstyled
              className='underline'
              href='https://use-gesture.netlify.app/'
            >
              @use-gesture
            </ExternalLinkUnstyled>
            .
          </Li>
          <Li>
            Accessibility support. Follows{' '}
            <ExternalLinkUnstyled
              className='underline'
              href='https://www.w3.org/WAI/ARIA/apg/patterns/slider/'
            >
              ARIA Slider
            </ExternalLinkUnstyled>{' '}
            pattern.
          </Li>
        </Ul>
      </Section>
      <Section title='Installation'>
        <Paragraph>Install the component from your command line.</Paragraph>
        <Code>npm install --save-exact react-knob-headless</Code>
      </Section>
      <Section title='Examples'>
        <div className='pt-2 flex flex-col gap-10'>
          <Example
            title='Simple linear knob'
            description='By default, the knob interpolation occurs linearly, which is useful for values like "sustain", "dry/wet", "pan", etc.'
            source='https://github.com/satelllte/react-knob-headless/blob/main/apps/docs/src/components/knobs/KnobPercentage.tsx'
          >
            <KnobPercentage label='Dry/Wet' theme='sky' />
          </Example>
          <Example
            title='Interpolated knob'
            description='A custom interpolation can be made whenever knob values should distribute non-linearly. It achieved by consuming a pair of "mapTo01" & "mapFrom01" props. This is useful for values like "frequency", "attack", "release", etc.'
            source='https://github.com/satelllte/react-knob-headless/blob/main/apps/docs/src/components/knobs/KnobFrequency.tsx'
          >
            <KnobFrequency label='Frequency' theme='green' />
          </Example>
          <Example
            title='Horizontal orientation'
            description="The knob gesture can occur along horizontal (X) axis instead of vertical (Y) one, but it's not common in audio applications."
            source='https://github.com/satelllte/react-knob-headless/blob/main/apps/docs/src/components/knobs/KnobPercentageHorizontal.tsx'
          >
            <KnobPercentageHorizontal label='X' theme='stone' />
          </Example>
          <Example
            title='Vertical and horizontal orientation'
            description='The knob gesture can occur along both vertical (Y) and horizontal (X) axis.'
            source='https://github.com/satelllte/react-knob-headless/blob/main/apps/docs/src/components/knobs/KnobPercentageVerticalHorizontal.tsx'
          >
            <KnobPercentageVerticalHorizontal label='XY' theme='pink' />
          </Example>
        </div>
      </Section>
      <Section title='Gotchas'>
        <Ul>
          <Li>
            The package is not in stable version yet. So, just in case,
            it&apos;s recommended to lock its version in your
            &quot;package.json&quot; file by installing it via
            &quot;--save-exact&quot; flag.
          </Li>
        </Ul>
      </Section>
      <Section title='API'>
        <div className='flex flex-col gap-20'>
          <ComponentDocumentation
            name='KnobHeadless'
            about='The primary knob primitive. This is the place where interaction happens.'
            properties={[
              {
                name: 'valueRaw',
                type: 'number',
                description: "Current value. Make sure it's not rounded.",
              },
              {
                name: 'valueMin',
                type: 'number',
                description: 'Minimum value.',
              },
              {
                name: 'valueMax',
                type: 'number',
                description: 'Maximum value.',
              },
              {
                name: 'dragSensitivity',
                type: 'number',
                description:
                  'The sensitivity of the drag gesture. Must be a positive float value. Play with this value in different browsers to find the best one for your use case. Recommended value: 0.006 (quite optimal for most scenarios, so far).',
              },
              {
                name: 'valueRawRoundFn',
                type: 'function',
                description: 'The rounding function for the raw value.',
              },
              {
                name: 'valueRawDisplayFn',
                type: 'function',
                description:
                  'The function for mapping raw value to the human-readable text.',
              },
              {
                name: 'onValueRawChange',
                type: 'function',
                description:
                  'Callback for when the raw value changes. Note, that you shouldn\'t round the value here, instead, you have to do it inside "valueRawRoundFn".',
              },
              {
                name: 'orientation',
                type: 'union',
                defaultValue: 'vertical',
                deprecationNotice: 'use "axis" instead.',
                description:
                  'Orientation of the knob and its gesture. Can be "vertical" or "horizontal".',
              },
              {
                name: 'axis',
                type: 'union',
                defaultValue: 'y',
                description:
                  'Orientation of the knob and its gesture. Can be "x", "y", or "xy".',
              },
              {
                name: 'includeIntoTabOrder',
                type: 'boolean',
                defaultValue: 'false',
                description:
                  "Whether to include the element into the sequential tab order. If true, the element will be focusable via the keyboard by tabbing. In most audio applications, the knob is usually controlled by the mouse / touch, so it's not needed.",
              },
              {
                name: 'mapTo01',
                type: 'function',
                defaultValue: 'mapTo01Linear()',
                description:
                  'Used for mapping the value to the normalized knob position (number from 0 to 1). This is the place for making the interpolation, if non-linear one is required. Example: logarithmic scale of frequency input, when knob center position 0.5 corresponds to ~ 1 kHz (instead of 10.1 kHz which is the "linear" center of frequency range).',
              },
              {
                name: 'mapFrom01',
                type: 'function',
                defaultValue: 'mapFrom01Linear()',
                description: 'Opposite of "mapTo01".',
              },
              {
                name: 'aria-label | aria-labelledby',
                type: 'string',
                description: 'Labelling for accesibility purposes.',
              },
              {
                name: '...rest',
                type: '...',
                description: 'The rest of HTML "div" element props.',
              },
            ]}
          />
          <ComponentDocumentation
            name='KnobHeadlessLabel'
            about='The optional primitive for visual accessive labelling of the knob.'
            properties={[
              {
                name: 'id',
                type: 'string',
                description:
                  'Unique identifier for HTML "label" element. Must be provided to the knob via "aria-labelledby".',
              },
              {
                name: '...rest',
                type: '...',
                description: 'The rest of HTML "label" element props.',
              },
            ]}
          />
          <ComponentDocumentation
            name='KnobHeadlessOutput'
            about='The optional primitive for visual accessive output display of the knob.'
            properties={[
              {
                name: 'htmlFor',
                type: 'string',
                description:
                  'Unique identifier of the knob to relate the output with. Must be provided to the knob via "id".',
              },
              {
                name: '...rest',
                type: '...',
                description: 'The rest of HTML "output" element props.',
              },
            ]}
          />
          <ComponentDocumentation
            name='useKnobKeyboardControls'
            about='A primitive for enabling keyboard controls.'
            properties={[
              {
                name: 'valueRaw',
                type: 'number',
                description: 'Same as "valueRaw" prop of "KnobHeadless".',
              },
              {
                name: 'valueMin',
                type: 'number',
                description: 'Same as "valueMin" prop of "KnobHeadless".',
              },
              {
                name: 'valueMax',
                type: 'number',
                description: 'Same as "valueMax" prop of "KnobHeadless".',
              },
              {
                name: 'step',
                type: 'number',
                description: "Step value. Typically it's 1% of the range.",
              },
              {
                name: 'stepLarger',
                type: 'number',
                description:
                  "Larger step value. Typically it's 10% of the range.",
              },
              {
                name: 'onValueRawChange',
                type: 'function',
                description:
                  'Same callback as "KnobHeadless" has, with "event" in 2nd argument.',
              },
              {
                name: 'noDefaultPrevention',
                type: 'boolean',
                defaultValue: 'false',
                description:
                  'To prevent scrolling, "event.preventDefault()" is called when the value changes, but for most cases you don\'t need to change this behaviour. However, if your application needs some more customized one, you can set this prop to true and handle scroll prevention on your own.',
              },
            ]}
          />
        </div>
      </Section>
    </div>
  );
}

function SectionContainer({children}: {readonly children: React.ReactNode}) {
  return <div className='pt-12 md:pt-16'>{children}</div>;
}

function Section({
  title,
  children,
}: {
  readonly title: string;
  readonly children: React.ReactNode;
}) {
  return (
    <SectionContainer>
      <H2>{title}</H2>
      <div className='pt-2'>{children}</div>
    </SectionContainer>
  );
}

function H2({children}: {readonly children: React.ReactNode}) {
  return <h2 className='font-semibold text-xl sm:text-2xl'>{children}</h2>;
}

function H3({children}: {readonly children: React.ReactNode}) {
  return <h3 className='font-semibold text-base sm:text-xl'>{children}</h3>;
}

function Paragraph({children}: {readonly children: React.ReactNode}) {
  return <p className='text-sm sm:text-base'>{children}</p>;
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
  source,
  children,
}: {
  readonly title: string;
  readonly description: string;
  readonly source: string;
  readonly children: React.ReactNode;
}) {
  return (
    <div>
      <H3>{title}</H3>
      <div className='pt-1'>
        <Paragraph>{description}</Paragraph>
      </div>
      <div className='pt-4 flex gap-4'>{children}</div>
      <div className='pt-2'>
        <ExternalLinkUnstyled className='text-sm underline' href={source}>
          View source
        </ExternalLinkUnstyled>
      </div>
    </div>
  );
}

function Ul({children}: {readonly children: React.ReactNode}) {
  return (
    <ul className='pl-1 list-disc list-inside flex flex-col gap-2'>
      {children}
    </ul>
  );
}

function Li({children}: {readonly children: React.ReactNode}) {
  return <li className='text-sm sm:text-base'>{children}</li>;
}

function ComponentDocumentation({
  name,
  about,
  properties,
}: {
  readonly name: string;
  readonly about: string;
  readonly properties: React.ComponentProps<typeof TableApi>['properties'];
}) {
  return (
    <div>
      <H3>{name}</H3>
      <div className='pt-2 pb-8'>
        <Paragraph>{about}</Paragraph>
      </div>
      <TableApi properties={properties} />
    </div>
  );
}

export default IndexPage;
