import React, {forwardRef, useState} from 'react';
import {useDrag} from '@use-gesture/react';

type NativeDivProps = React.ComponentProps<'div'>;

type NativeDivPropsToExtend = Omit<
  NativeDivProps,
  | 'role' // We don't want to allow overriding this
  | 'aria-valuemin' // This is already set by "min" prop
  | 'aria-valuemax' // This is already set by "max" prop
  | 'aria-orientation' // We don't want to allow overriding this
>;

type KnobHeadlessProps = NativeDivPropsToExtend & {
  readonly min?: number;
  readonly max?: number;
  readonly valueDefault: number;
};

export const KnobHeadless = forwardRef<HTMLDivElement, KnobHeadlessProps>(
  ({style, min, max, valueDefault, ...rest}, forwardedRef) => {
    const [value, setValue] = useState(valueDefault);

    const bindDrag = useDrag(({delta}) => {
      const diff01 = delta[1] * -0.006; // Multiplying by negative sensitivity. Vertical axis (Y) direction of the screen is inverted.
      console.info('diff01: ', diff01);
      setValue((value) => value + diff01);
    });

    return (
      <div
        ref={forwardedRef}
        role='slider'
        aria-valuenow={value}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-orientation='vertical'
        aria-valuetext='5 kHz'
        style={style ? {...defaultStyle, ...style} : defaultStyle}
        {...rest}
        {...bindDrag()}
      />
    );
  },
);

KnobHeadless.displayName = 'KnobHeadless';

KnobHeadless.defaultProps = {
  min: 0,
  max: 1,
};

const defaultStyle: React.CSSProperties = {
  touchAction: 'none', // It's recommended to disable "touch-action" for use-gesture: https://use-gesture.netlify.app/docs/extras/#touch-action
};
