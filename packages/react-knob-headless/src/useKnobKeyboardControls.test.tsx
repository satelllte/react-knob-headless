/**
 * @vitest-environment jsdom
 */
import {afterEach, describe, expect, it, vi} from 'vitest';
import {act, cleanup, render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {useState} from 'react';
import {KnobHeadless} from './KnobHeadless';
import {useKnobKeyboardControls} from './useKnobKeyboardControls';

describe('useKnobKeyboardControls', () => {
  afterEach(() => {
    cleanup();
  });

  it('increases value by step when ArrowUp pressed', async () => {
    const user = userEvent.setup();

    render(<TestComponent />);

    const knob = screen.getByRole('slider', {name: 'Test Knob'});

    await act(async () => {
      await user.click(knob);
      await user.keyboard('{ArrowUp}');
    });

    expect(knob).toMatchInlineSnapshot(`
      <div
        aria-label="Test Knob"
        aria-orientation="vertical"
        aria-valuemax="100"
        aria-valuemin="0"
        aria-valuenow="51"
        aria-valuetext="51 units"
        role="slider"
        tabindex="-1"
      />
    `);
  });

  it('increases value by step when ArrowRight pressed', async () => {
    const user = userEvent.setup();

    render(<TestComponent />);

    const knob = screen.getByRole('slider', {name: 'Test Knob'});

    await act(async () => {
      await user.click(knob);
      await user.keyboard('{ArrowRight}');
    });

    expect(knob).toMatchInlineSnapshot(`
      <div
        aria-label="Test Knob"
        aria-orientation="vertical"
        aria-valuemax="100"
        aria-valuemin="0"
        aria-valuenow="51"
        aria-valuetext="51 units"
        role="slider"
        tabindex="-1"
      />
    `);
  });

  it('decreases value by step when ArrowDown pressed', async () => {
    const user = userEvent.setup();

    render(<TestComponent />);

    const knob = screen.getByRole('slider', {name: 'Test Knob'});

    await act(async () => {
      await user.click(knob);
      await user.keyboard('{ArrowDown}');
    });

    expect(knob).toMatchInlineSnapshot(`
      <div
        aria-label="Test Knob"
        aria-orientation="vertical"
        aria-valuemax="100"
        aria-valuemin="0"
        aria-valuenow="49"
        aria-valuetext="49 units"
        role="slider"
        tabindex="-1"
      />
    `);
  });

  it('decreases value by step when ArrowLeft pressed', async () => {
    const user = userEvent.setup();

    render(<TestComponent />);

    const knob = screen.getByRole('slider', {name: 'Test Knob'});

    await act(async () => {
      await user.click(knob);
      await user.keyboard('{ArrowLeft}');
    });

    expect(knob).toMatchInlineSnapshot(`
      <div
        aria-label="Test Knob"
        aria-orientation="vertical"
        aria-valuemax="100"
        aria-valuemin="0"
        aria-valuenow="49"
        aria-valuetext="49 units"
        role="slider"
        tabindex="-1"
      />
    `);
  });

  it('increases value by larger step when PageUp pressed', async () => {
    const user = userEvent.setup();

    render(<TestComponent />);

    const knob = screen.getByRole('slider', {name: 'Test Knob'});

    await act(async () => {
      await user.click(knob);
      await user.keyboard('{PageUp}');
    });

    expect(knob).toMatchInlineSnapshot(`
      <div
        aria-label="Test Knob"
        aria-orientation="vertical"
        aria-valuemax="100"
        aria-valuemin="0"
        aria-valuenow="60"
        aria-valuetext="60 units"
        role="slider"
        tabindex="-1"
      />
    `);
  });

  it('decreases value by larger step when PageDown pressed', async () => {
    const user = userEvent.setup();

    render(<TestComponent />);

    const knob = screen.getByRole('slider', {name: 'Test Knob'});

    await act(async () => {
      await user.click(knob);
      await user.keyboard('{PageDown}');
    });

    expect(knob).toMatchInlineSnapshot(`
      <div
        aria-label="Test Knob"
        aria-orientation="vertical"
        aria-valuemax="100"
        aria-valuemin="0"
        aria-valuenow="40"
        aria-valuetext="40 units"
        role="slider"
        tabindex="-1"
      />
    `);
  });

  it('sets min value when Home pressed', async () => {
    const user = userEvent.setup();

    render(<TestComponent />);

    const knob = screen.getByRole('slider', {name: 'Test Knob'});

    await act(async () => {
      await user.click(knob);
      await user.keyboard('{Home}');
    });

    expect(knob).toMatchInlineSnapshot(`
      <div
        aria-label="Test Knob"
        aria-orientation="vertical"
        aria-valuemax="100"
        aria-valuemin="0"
        aria-valuenow="0"
        aria-valuetext="0 units"
        role="slider"
        tabindex="-1"
      />
    `);
  });

  it('sets max value when End pressed', async () => {
    const user = userEvent.setup();

    render(<TestComponent />);

    const knob = screen.getByRole('slider', {name: 'Test Knob'});

    await act(async () => {
      await user.click(knob);
      await user.keyboard('{End}');
    });

    expect(knob).toMatchInlineSnapshot(`
      <div
        aria-label="Test Knob"
        aria-orientation="vertical"
        aria-valuemax="100"
        aria-valuemin="0"
        aria-valuenow="100"
        aria-valuetext="100 units"
        role="slider"
        tabindex="-1"
      />
    `);
  });

  it('clamps value to min', async () => {
    const user = userEvent.setup();

    render(<TestComponent />);

    const knob = screen.getByRole('slider', {name: 'Test Knob'});

    await act(async () => {
      await user.click(knob);
      await user.keyboard('{Home}');
    });
    await act(async () => {
      await user.keyboard('{ArrowUp}');
    });

    expect(knob).toMatchInlineSnapshot(`
      <div
        aria-label="Test Knob"
        aria-orientation="vertical"
        aria-valuemax="100"
        aria-valuemin="0"
        aria-valuenow="1"
        aria-valuetext="1 units"
        role="slider"
        tabindex="-1"
      />
    `);

    await act(async () => {
      await user.keyboard('{ArrowDown}');
    });
    await act(async () => {
      await user.keyboard('{ArrowDown}');
    });

    expect(knob).toMatchInlineSnapshot(`
      <div
        aria-label="Test Knob"
        aria-orientation="vertical"
        aria-valuemax="100"
        aria-valuemin="0"
        aria-valuenow="0"
        aria-valuetext="0 units"
        role="slider"
        tabindex="-1"
      />
    `);
  });

  it('clamps value to max', async () => {
    const user = userEvent.setup();

    render(<TestComponent />);

    const knob = screen.getByRole('slider', {name: 'Test Knob'});

    await act(async () => {
      await user.click(knob);
      await user.keyboard('{End}');
    });
    await act(async () => {
      await user.keyboard('{ArrowDown}');
    });

    expect(knob).toMatchInlineSnapshot(`
      <div
        aria-label="Test Knob"
        aria-orientation="vertical"
        aria-valuemax="100"
        aria-valuemin="0"
        aria-valuenow="99"
        aria-valuetext="99 units"
        role="slider"
        tabindex="-1"
      />
    `);

    await act(async () => {
      await user.keyboard('{ArrowUp}');
    });
    await act(async () => {
      await user.keyboard('{ArrowUp}');
    });

    expect(knob).toMatchInlineSnapshot(`
      <div
        aria-label="Test Knob"
        aria-orientation="vertical"
        aria-valuemax="100"
        aria-valuemin="0"
        aria-valuenow="100"
        aria-valuetext="100 units"
        role="slider"
        tabindex="-1"
      />
    `);
  });

  it('fires preventDefault() on keydown to prevent scrolling', () => {
    const preventDefaultFn = vi.fn();

    const {onKeyDown} = useKnobKeyboardControls({
      valueRaw: valueRawDefault,
      valueMin,
      valueMax,
      step,
      stepLarger,
      // eslint-disable-next-line @typescript-eslint/no-empty-function, object-shorthand
      onValueRawChange: (newValueRaw, event) => {},
    });

    // @ts-expect-error Mocking event
    onKeyDown({
      code: 'ArrowUp',
      preventDefault: preventDefaultFn,
    });

    expect(preventDefaultFn).toHaveBeenCalledTimes(1);
  });

  it("doesn't fire preventDefault() on keydown when [noDefaultPrevention=true]", () => {
    const preventDefaultFn = vi.fn();

    const {onKeyDown} = useKnobKeyboardControls({
      noDefaultPrevention: true,
      valueRaw: valueRawDefault,
      valueMin,
      valueMax,
      step,
      stepLarger,
      // eslint-disable-next-line @typescript-eslint/no-empty-function, object-shorthand
      onValueRawChange: (newValueRaw, event) => {},
    });

    // @ts-expect-error Mocking event
    onKeyDown({
      code: 'ArrowUp',
      preventDefault: preventDefaultFn,
    });

    expect(preventDefaultFn).toHaveBeenCalledTimes(0);
  });
});

function TestComponent() {
  const [valueRaw, setValueRaw] = useState<number>(valueRawDefault);
  const keyboardControlHandlers = useKnobKeyboardControls({
    valueRaw,
    valueMin,
    valueMax,
    step,
    stepLarger,
    onValueRawChange: setValueRaw,
  });

  return (
    <KnobHeadless
      aria-label='Test Knob'
      dragSensitivity={dragSensitivity}
      valueRaw={valueRaw}
      valueMin={valueMin}
      valueMax={valueMax}
      valueRawRoundFn={valueRawRoundFn}
      valueRawDisplayFn={valueRawDisplayFn}
      onValueRawChange={setValueRaw}
      {...keyboardControlHandlers}
    />
  );
}

const dragSensitivity = 0.006;
const valueRawDefault = 50;
const valueMin = 0;
const valueMax = 100;
const step = 1;
const stepLarger = 10;
const valueRawRoundFn = (valueRaw: number) => Math.round(valueRaw);
const valueRawDisplayFn = (valueRaw: number) =>
  `${valueRawRoundFn(valueRaw)} units`;
