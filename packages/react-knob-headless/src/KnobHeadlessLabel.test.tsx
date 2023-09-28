/**
 * @vitest-environment jsdom
 */
import React from 'react';
import {afterEach, describe, expect, it} from 'vitest';
import {render, screen, cleanup} from '@testing-library/react';
import {KnobHeadlessLabel} from './KnobHeadlessLabel';

describe('KnobHeadlessLabel', () => {
  afterEach(() => {
    cleanup();
  });

  it('has display name "KnobHeadlessLabel"', () => {
    expect(KnobHeadlessLabel.displayName).toBe('KnobHeadlessLabel');
  });

  it.todo('forwards ref');

  it('renders correctly with default props', () => {
    render(<KnobHeadlessLabel id='label-id'>Test knob</KnobHeadlessLabel>);

    const label = screen.getByText('Test knob');

    expect(label).toMatchInlineSnapshot(`
      <label
        id="label-id"
      >
        Test knob
      </label>
    `);
  });
});
