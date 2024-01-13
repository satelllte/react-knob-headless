import {clamp} from '@dsp-ts/math';

type UseKnobKeyboardControlProps = {
  /**
   * Same as `valueRaw` prop of `KnobHeadless`.
   */
  readonly valueRaw: number;
  /**
   * Same as `valueMin` prop of `KnobHeadless`.
   */
  readonly valueMin: number;
  /**
   * Same as `valueMax` prop of `KnobHeadless`.
   */
  readonly valueMax: number;
  /**
   * Step value. Typically it's 1% of the range.
   */
  readonly step: number;
  /**
   * Larger step value. Typically it's 10% of the range.
   */
  readonly stepLarger: number;
  /**
   * Same callback as `KnobHeadless` has, with "event" in 2nd argument.
   */
  readonly onValueRawChange: (
    newValueRaw: number,
    event: React.KeyboardEvent,
  ) => void;
  /**
   * To prevent scrolling, "event.preventDefault()" is called when the value changes,
   * but for most cases you don't need to change this behaviour.
   * However, if your application needs some more customized one, you can set this prop to true and handle scroll prevention on your own.
   */
  readonly noDefaultPrevention?: boolean;
};

export const useKnobKeyboardControl = ({
  valueRaw,
  valueMin,
  valueMax,
  step,
  stepLarger,
  onValueRawChange,
  noDefaultPrevention = false,
}: UseKnobKeyboardControlProps): {onKeyDown: React.KeyboardEventHandler} => {
  const onKeyDown: React.KeyboardEventHandler = (event) => {
    const {code} = event;
    switch (code) {
      case 'ArrowUp':
      case 'ArrowRight':
        onValueRawChange(clamp(valueRaw + step, valueMin, valueMax), event);
        maybePreventDefault({event, noDefaultPrevention});
        break;
      case 'ArrowDown':
      case 'ArrowLeft':
        onValueRawChange(clamp(valueRaw - step, valueMin, valueMax), event);
        maybePreventDefault({event, noDefaultPrevention});
        break;
      case 'PageUp':
        onValueRawChange(
          clamp(valueRaw + stepLarger, valueMin, valueMax),
          event,
        );
        maybePreventDefault({event, noDefaultPrevention});
        break;
      case 'PageDown':
        onValueRawChange(
          clamp(valueRaw - stepLarger, valueMin, valueMax),
          event,
        );
        maybePreventDefault({event, noDefaultPrevention});
        break;
      case 'Home':
        onValueRawChange(valueMin, event);
        maybePreventDefault({event, noDefaultPrevention});
        break;
      case 'End':
        onValueRawChange(valueMax, event);
        maybePreventDefault({event, noDefaultPrevention});
        break;
      default:
        break;
    }
  };

  return {onKeyDown};
};

const maybePreventDefault = ({
  event,
  noDefaultPrevention,
}: {
  event: React.KeyboardEvent;
  noDefaultPrevention: boolean;
}): void => {
  if (noDefaultPrevention) return;
  event.preventDefault();
};
