/**
 * @vitest-environment jsdom
 */
import React from 'react';
import {afterEach, describe, expect, it} from 'vitest';
import {render, screen, cleanup} from '@testing-library/react';
import {KnobHeadlessOutput} from './KnobHeadlessOutput';

describe('KnobHeadlessOutput', () => {
  afterEach(() => {
    cleanup();
  });

  it('has display name "KnobHeadlessOutput"', () => {
    expect(KnobHeadlessOutput.displayName).toBe('KnobHeadlessOutput');
  });

  it.todo('forwards ref');

  it('renders correctly with default props', () => {
    render(
      <KnobHeadlessOutput htmlFor='knob-id'>245 units</KnobHeadlessOutput>,
    );

    const output = screen.getByRole('status');

    expect(output).toMatchInlineSnapshot(`
      <output
        for="knob-id"
      >
        245 units
      </output>
    `);
  });

  it('renders correctly with custom props', () => {
    render(
      <KnobHeadlessOutput
        htmlFor='knob-id'
        className='test-class-1 test-class-2'
        style={{color: 'red'}}
        aria-live='off'
      >
        245 units
      </KnobHeadlessOutput>,
    );

    const output = screen.getByRole('status');

    expect(output).toMatchInlineSnapshot(`
      <output
        aria-live="off"
        class="test-class-1 test-class-2"
        for="knob-id"
        style="color: red;"
      >
        245 units
      </output>
    `);
  });
});
