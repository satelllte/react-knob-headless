import {forwardRef} from 'react';
import {useDrag} from '@use-gesture/react';
import mergeProps from 'merge-props';
import {mapFrom01Linear, mapTo01Linear} from './utils/map01Linear';
import {clamp, clamp01} from './utils/clamp';

type NativeDivProps = React.ComponentProps<'div'>;

type NativeDivPropsToExtend = Omit<
  NativeDivProps,
  | 'role' // Constant. We don't want to allow overriding this
  | 'aria-valuemin' // Handled by "min"
  | 'aria-valuemax' // Handled by "max"
  | 'aria-valuenow' // Handled by "value"
  | 'aria-valuetext' // Handled by "valueRawDisplayFn"
  | 'aria-orientation' // Constant. We don't want to allow overriding this
  | 'aria-label' // Handled by "KnobHeadlessLabelProps"
  | 'aria-labelledby' // Handled by "KnobHeadlessLabelProps"
  | 'tabIndex' // Handled by "includeIntoTabOrder"
>;

const mapTo01Default = mapTo01Linear;
const mapFrom01Default = mapFrom01Linear;
const includeIntoTabOrderDefault = false;
const disabledKeyboardDefault = false;
const dragSensitivityDefault = 0.006;
const styleDefault: React.CSSProperties = {
  touchAction: 'none', // It's recommended to disable "touch-action" for use-gesture: https://use-gesture.netlify.app/docs/extras/#touch-action
};

type KnobHeadlessLabelProps =
  | {
      readonly 'aria-label': string;
    }
  | {
      readonly 'aria-labelledby': string;
    };

type KnobHeadlessProps = NativeDivPropsToExtend &
  KnobHeadlessLabelProps & {
    readonly min: number;
    readonly max: number;
    readonly valueRaw: number;
    readonly valueDefault: number;
    readonly step: number;
    readonly stepLarge: number;
    /**
     * Callback for when the raw value changes.
     * NOTE: you shouldn't round the value here, instead, you have to do it inside `valueRawRoundFn`.
     */
    readonly onValueRawChange: (newValueRaw: number) => void;
    /**
     * The rounding function for the raw value.
     */
    readonly valueRawRoundFn: (valueRaw: number) => number;
    /**
     * The function for mapping the raw value to human-readable text.
     */
    readonly valueRawDisplayFn: (valueRaw: number) => string;
    /**
     * Used for mapping the value to the knob position (number from 0 to 1).
     * This is the place for making the interpolation, if non-linear one is required.
     * Example: logarithmic scale of frequency input, when knob center position 0.5 corresponds to ~ 1 kHz (instead of 10.1 kHz which is the "linear" center of frequency range).
     */
    readonly mapTo01?: (x: number, min: number, max: number) => number;
    /**
     * Opposite of `mapTo01`.
     */
    readonly mapFrom01?: (x: number, min: number, max: number) => number;
    /**
     * Whether to include the element into the sequential tab order.
     * If true, the element will be focusable via the keyboard by tabbing.
     * In most audio applications, usually the knob is controlled by the mouse / touch, so it's not needed.
     */
    readonly includeIntoTabOrder?: boolean;
    /**
     * Disables the keyboard interaction.
     */
    readonly disabledKeyboard?: boolean;
    /**
     * The sensitivity of the drag gesture. Must be a positive float value.
     * Play with this value in different browsers to find the best one for your use case.
     * Default value: 0.006 (quite optimal for most scenarios, so far).
     */
    readonly dragSensitivity?: number;
  };

export const KnobHeadless = forwardRef<HTMLDivElement, KnobHeadlessProps>(
  (
    {
      min,
      max,
      valueRaw,
      valueDefault,
      step,
      stepLarge,
      onValueRawChange,
      valueRawRoundFn,
      valueRawDisplayFn,
      mapTo01 = mapTo01Default,
      mapFrom01 = mapFrom01Default,
      includeIntoTabOrder = includeIntoTabOrderDefault,
      disabledKeyboard = disabledKeyboardDefault,
      dragSensitivity = dragSensitivityDefault,
      ...rest
    },
    forwardedRef,
  ) => {
    const value = valueRawRoundFn(valueRaw);

    const onKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
      if (disabledKeyboard) {
        return;
      }

      const updateValue = (newValueRaw: number) => {
        event.preventDefault(); // Prevent page scrolling
        onValueRawChange(clamp(newValueRaw, min, max));
      };

      switch (event.code) {
        case 'Home':
          updateValue(min);
          break;
        case 'End':
          updateValue(max);
          break;
        case 'ArrowDown':
        case 'ArrowLeft':
          updateValue(value - step);
          break;
        case 'ArrowUp':
        case 'ArrowRight':
          updateValue(value + step);
          break;
        case 'PageDown':
          updateValue(value - stepLarge);
          break;
        case 'PageUp':
          updateValue(value + stepLarge);
          break;
        default:
          break;
      }
    };

    const bindDrag = useDrag(
      ({delta}) => {
        // Negating the sensitivity for vertical axis (Y),
        // since the direction of it goes top down on computer screens.
        const diff01 = delta[1] * -dragSensitivity;

        // Conversion of the raw value to 0-1 range
        // makes the sensitivity to be independent from min-max values range,
        // as well as it allows to use non-linear mapping functions.
        const value01 = mapTo01(valueRaw, min, max);
        const newValue01 = clamp01(value01 + diff01);
        const newValueRaw = clamp(mapFrom01(newValue01, min, max), min, max);

        onValueRawChange(newValueRaw);
      },
      {
        pointer: {keys: false},
      },
    );

    return (
      <div
        ref={forwardedRef}
        role='slider'
        aria-valuenow={value}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-orientation='vertical'
        aria-valuetext={valueRawDisplayFn(valueRaw)}
        tabIndex={includeIntoTabOrder ? 0 : -1}
        {...mergeProps(
          bindDrag(),
          {
            style: styleDefault,
            onKeyDown,
            onPointerDown(event: React.PointerEvent<HTMLElement>) {
              // Touch devices have a delay before focusing so it won't focus if touch immediately moves away from target (sliding). We want thumb to focus regardless.
              // See, for reference, Radix UI Slider does the same: https://github.com/radix-ui/primitives/blob/eca6babd188df465f64f23f3584738b85dba610e/packages/react/slider/src/Slider.tsx#L442-L445
              event.currentTarget.focus();
            },
          },
          rest,
        )}
      />
    );
  },
);

KnobHeadless.displayName = 'KnobHeadless';

KnobHeadless.defaultProps = {
  mapTo01: mapTo01Default,
  mapFrom01: mapFrom01Default,
  includeIntoTabOrder: includeIntoTabOrderDefault,
  disabledKeyboard: disabledKeyboardDefault,
  dragSensitivity: dragSensitivityDefault,
};
