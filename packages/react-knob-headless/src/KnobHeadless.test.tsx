/**
 * @vitest-environment jsdom
 */
import {createRef} from 'react';
import {afterEach, describe, expect, it} from 'vitest';
import {render, screen, cleanup} from '@testing-library/react';
import {KnobHeadlessLabel} from './KnobHeadlessLabel';
import {KnobHeadless} from './KnobHeadless';

const valueMin = -5;
const valueMax = 5;
const valueRaw = 2.25;
const dragSensitivity = 0.006;
const onValueRawChange = () => {}; // eslint-disable-line @typescript-eslint/no-empty-function
const valueRawRoundFn = Math.round;
const valueRawDisplayFn = (valueRaw: number) =>
  `${valueRawRoundFn(valueRaw)} units`;

const props = {
  valueMin,
  valueMax,
  valueRaw,
  dragSensitivity,
  onValueRawChange,
  valueRawRoundFn,
  valueRawDisplayFn,
} as const;

describe('KnobHeadless', () => {
  afterEach(() => {
    cleanup();
  });

  it('has display name "KnobHeadless"', () => {
    expect(KnobHeadless.displayName).toBe('KnobHeadless');
  });

  it('forwards ref', () => {
    const ref = createRef<HTMLDivElement>();

    render(<KnobHeadless {...props} ref={ref} aria-label='Test Knob' />);

    const knob = screen.getByRole('slider', {name: 'Test Knob'});

    expect(knob).toBe(ref.current);
  });

  it('has correct attributes by default', () => {
    render(<KnobHeadless {...props} aria-label='Test Knob' />);

    const knob = screen.getByRole('slider', {name: 'Test Knob'});

    expect(knob).toMatchInlineSnapshot(`
      <div
        aria-label="Test Knob"
        aria-orientation="vertical"
        aria-valuemax="5"
        aria-valuemin="-5"
        aria-valuenow="2"
        aria-valuetext="2 units"
        role="slider"
        tabindex="-1"
      />
    `);

    expect(knob.style).toMatchInlineSnapshot(`
      CSSStyleDeclaration {
        "_importants": {},
        "_length": 0,
        "_onChange": [Function],
        "_values": {},
        "touchAction": "none",
      }
    `);
  });

  it('reacts to value change', () => {
    const {rerender} = render(
      <KnobHeadless {...props} aria-label='Test Knob' />,
    );

    const knob = screen.getByRole('slider', {name: 'Test Knob'});

    expect(knob).toMatchInlineSnapshot(`
      <div
        aria-label="Test Knob"
        aria-orientation="vertical"
        aria-valuemax="5"
        aria-valuemin="-5"
        aria-valuenow="2"
        aria-valuetext="2 units"
        role="slider"
        tabindex="-1"
      />
    `);

    rerender(
      <KnobHeadless {...props} valueRaw={-3.11424892} aria-label='Test Knob' />,
    );

    expect(knob).toMatchInlineSnapshot(`
      <div
        aria-label="Test Knob"
        aria-orientation="vertical"
        aria-valuemax="5"
        aria-valuemin="-5"
        aria-valuenow="-3"
        aria-valuetext="-3 units"
        role="slider"
        tabindex="-1"
      />
    `);
  });

  it('sets "aria-orientation" to "horizontal", when "axis" is "x"', () => {
    render(<KnobHeadless {...props} axis='x' aria-label='Test Knob' />);

    const knob = screen.getByRole('slider', {name: 'Test Knob'});

    expect(knob).toMatchInlineSnapshot(`
      <div
        aria-label="Test Knob"
        aria-orientation="horizontal"
        aria-valuemax="5"
        aria-valuemin="-5"
        aria-valuenow="2"
        aria-valuetext="2 units"
        role="slider"
        tabindex="-1"
      />
    `);
  });

  it('sets no "aria-orientation", when "axis" is "xy"', () => {
    render(<KnobHeadless {...props} axis='xy' aria-label='Test Knob' />);

    const knob = screen.getByRole('slider', {name: 'Test Knob'});

    expect(knob).toMatchInlineSnapshot(`
      <div
        aria-label="Test Knob"
        aria-valuemax="5"
        aria-valuemin="-5"
        aria-valuenow="2"
        aria-valuetext="2 units"
        role="slider"
        tabindex="-1"
      />
    `);
  });

  it('overrides "aria-orientation", when "orientation" is set on top of "axis"', () => {
    render(
      <KnobHeadless
        {...props}
        axis='x'
        orientation='vertical'
        aria-label='Test Knob'
      />,
    );

    const knob = screen.getByRole('slider', {name: 'Test Knob'});

    expect(knob).toMatchInlineSnapshot(`
      <div
        aria-label="Test Knob"
        aria-orientation="vertical"
        aria-valuemax="5"
        aria-valuemin="-5"
        aria-valuenow="2"
        aria-valuetext="2 units"
        role="slider"
        tabindex="-1"
      />
    `);
  });

  it('overrides "aria-orientation", when "orientation" is set on top of "axis" (2)', () => {
    render(
      <KnobHeadless
        {...props}
        axis='y'
        orientation='horizontal'
        aria-label='Test Knob'
      />,
    );

    const knob = screen.getByRole('slider', {name: 'Test Knob'});

    expect(knob).toMatchInlineSnapshot(`
      <div
        aria-label="Test Knob"
        aria-orientation="horizontal"
        aria-valuemax="5"
        aria-valuemin="-5"
        aria-valuenow="2"
        aria-valuetext="2 units"
        role="slider"
        tabindex="-1"
      />
    `);
  });

  it('sets tabIndex to 0, when "includeIntoTabOrder" is true', () => {
    render(
      <KnobHeadless {...props} includeIntoTabOrder aria-label='Test Knob' />,
    );

    const knob = screen.getByRole('slider', {name: 'Test Knob'});

    expect(knob).toMatchInlineSnapshot(`
      <div
        aria-label="Test Knob"
        aria-orientation="vertical"
        aria-valuemax="5"
        aria-valuemin="-5"
        aria-valuenow="2"
        aria-valuetext="2 units"
        role="slider"
        tabindex="0"
      />
    `);
  });

  it('can render children', () => {
    render(
      <KnobHeadless {...props} aria-label='Test Knob'>
        <div className='absolute'>Child</div>
      </KnobHeadless>,
    );

    const knob = screen.getByRole('slider', {name: 'Test Knob'});

    expect(knob.querySelector('.absolute')).toMatchInlineSnapshot(`
      <div
        class="absolute"
      >
        Child
      </div>
    `);
  });

  it('sets className', () => {
    render(
      <KnobHeadless
        {...props}
        aria-label='Test Knob'
        className='mx-auto p-8'
      />,
    );

    const knob = screen.getByRole('slider', {name: 'Test Knob'});

    expect(knob.className).toMatchInlineSnapshot('"mx-auto p-8"');
    expect(knob.classList).toMatchInlineSnapshot(`
      DOMTokenList {
        "0": "mx-auto",
        "1": "p-8",
      }
    `);
  });

  it('merges custom style', () => {
    const {rerender} = render(
      <KnobHeadless {...props} aria-label='Test Knob' style={{color: 'red'}} />,
    );

    const knob = screen.getByRole('slider', {name: 'Test Knob'});

    expect(knob.style).toMatchInlineSnapshot(`
      CSSStyleDeclaration {
        "0": "color",
        "_importants": {
          "color": undefined,
        },
        "_length": 1,
        "_onChange": [Function],
        "_values": {
          "color": "red",
        },
        "touchAction": "none",
      }
    `);

    rerender(
      <KnobHeadless
        {...props}
        aria-label='Test Knob'
        style={{touchAction: 'pan-x'}}
      />,
    );

    expect(knob.style).toMatchInlineSnapshot(`
      CSSStyleDeclaration {
        "_importants": {},
        "_length": 0,
        "_onChange": [Function],
        "_values": {},
        "touchAction": "pan-x",
      }
    `);
  });

  it('can be labelled by external label', () => {
    const labelId = 'label-id';

    render(
      <>
        <KnobHeadless
          {...props}
          aria-labelledby={labelId}
          style={{color: 'red'}}
        />
        <KnobHeadlessLabel id={labelId}>Knob Name</KnobHeadlessLabel>
      </>,
    );

    const knob = screen.getByRole('slider', {
      name: 'Knob Name',
    });

    expect(knob).toMatchInlineSnapshot(`
      <div
        aria-labelledby="label-id"
        aria-orientation="vertical"
        aria-valuemax="5"
        aria-valuemin="-5"
        aria-valuenow="2"
        aria-valuetext="2 units"
        role="slider"
        style="color: red;"
        tabindex="-1"
      />
    `);
  });
});
