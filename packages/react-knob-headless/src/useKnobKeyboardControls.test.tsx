import {describe, it} from 'vitest';
import {useKnobKeyboardControls} from './useKnobKeyboardControls';

describe('useKnobKeyboardControls', () => {
  it.todo('increases value by step when ArrowUp pressed');
  it.todo('increases value by step when ArrowRight pressed');
  it.todo('decreases value by step when ArrowDown pressed');
  it.todo('decreases value by step when ArrowLeft pressed');
  it.todo('increases value by larger step when PageUp pressed');
  it.todo('decreases value by larger step when PageDown pressed');
  it.todo('sets min value when Home pressed');
  it.todo('sets max value when End pressed');
  it.todo('fires preventDefault() on keydown to prevent scrolling');
  it.todo(
    "doesn't fire preventDefault() on keydown when [noDefaultPrevention=true]",
  );
  it.todo('clamps value to min');
  it.todo('clamps value to max');
});
