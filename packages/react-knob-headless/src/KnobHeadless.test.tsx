/**
 * @vitest-environment jsdom
 */
import React, {createRef} from 'react';
import {afterEach, describe, expect, it} from 'vitest';
import {render, screen, cleanup} from '@testing-library/react';
import {KnobHeadlessLabel} from './KnobHeadlessLabel';
import {KnobHeadless} from './KnobHeadless';

const min = -5;
const max = 5;
const step = 1;
const stepLarge = 2;
const dragSensitivity = 0.006;
const valueRaw = 2.25;
const onValueRawChange = () => {};
const valueRawRoundFn = Math.round;
const valueRawDisplayFn = (valueRaw: number) =>
  `${valueRawRoundFn(valueRaw)} units`;

const props = {
  min,
  max,
  step,
  stepLarge,
  dragSensitivity,
  valueRaw,
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
        <div className='child'>Child</div>
      </KnobHeadless>,
    );

    const knob = screen.getByRole('slider', {name: 'Test Knob'});

    expect(knob.querySelector('.child')).toMatchInlineSnapshot(`
      <div
        class="child"
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
        className='test-class-1 test-class-2'
      ></KnobHeadless>,
    );

    const knob = screen.getByRole('slider', {name: 'Test Knob'});

    expect(knob.className).toMatchInlineSnapshot('"test-class-1 test-class-2"');
    expect(knob.classList).toMatchInlineSnapshot(`
      DOMTokenList {
        "0": "test-class-1",
        "1": "test-class-2",
      }
    `);
  });

  it('merges custom style', () => {
    const {rerender} = render(
      <KnobHeadless
        {...props}
        aria-label='Test Knob'
        style={{color: 'red'}}
      ></KnobHeadless>,
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
      ></KnobHeadless>,
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
