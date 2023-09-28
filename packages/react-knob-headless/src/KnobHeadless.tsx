import {forwardRef} from 'react';
import {useDrag} from '@use-gesture/react';
import {mapFrom01Linear, mapTo01Linear} from './utils/map01Linear';
import {clamp, clamp01} from './utils/clamp';

type NativeDivProps = React.ComponentProps<'div'>;

type NativeDivPropsToExtend = Omit<
  NativeDivProps,
  | 'role' // We don't want to allow overriding this
  | 'aria-valuemin' // This is already set by "min" prop
  | 'aria-valuemax' // This is already set by "max" prop
  | 'aria-orientation' // We don't want to allow overriding this
>;

const mapTo01Default = mapTo01Linear;
const mapFrom01Default = mapFrom01Linear;

type KnobHeadlessProps = NativeDivPropsToExtend & {
  readonly min: number;
  readonly max: number;
  readonly valueRaw: number;
  readonly valueDefault: number;
  /**
   * Callback for when the raw value changes.
   * NOTE: you shouldn't round the value here, instead, you have to do it inside `roundFn`.
   */
  readonly onValueRawChange: (newValueRaw: number) => void;
  /**
   * The rounding function for the raw value.
   */
  readonly roundFn: (valueRaw: number) => number;
  /**
   * The function for mapping the raw value to human-readable text.
   */
  readonly toText: (valueRaw: number) => string;
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
};

export const KnobHeadless = forwardRef<HTMLDivElement, KnobHeadlessProps>(
  (
    {
      style,
      min,
      max,
      valueRaw,
      valueDefault,
      onValueRawChange,
      roundFn,
      toText,
      mapTo01 = mapTo01Default,
      mapFrom01 = mapFrom01Default,
      ...rest
    },
    forwardedRef,
  ) => {
    const value = roundFn(valueRaw);

    const bindDrag = useDrag(
      ({delta}) => {
        const diff01 = delta[1] * -0.006; // Multiplying by negative sensitivity. Vertical axis (Y) direction of the screen is inverted.
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
        aria-valuetext={toText(valueRaw)}
        style={style ? {...defaultStyle, ...style} : defaultStyle}
        {...rest}
        {...bindDrag()}
      />
    );
  },
);

KnobHeadless.displayName = 'KnobHeadless';

KnobHeadless.defaultProps = {
  mapTo01: mapTo01Default,
  mapFrom01: mapFrom01Default,
};

const defaultStyle: React.CSSProperties = {
  touchAction: 'none', // It's recommended to disable "touch-action" for use-gesture: https://use-gesture.netlify.app/docs/extras/#touch-action
};
