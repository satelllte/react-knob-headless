import {forwardRef} from 'react';

type NativeOutputProps = React.ComponentProps<'output'>;

type NativeOutputPropsToExtend = Omit<
  NativeOutputProps,
  'htmlFor' // We are overriding this to make it required
>;

type KnobHeadlessOutputProps = NativeOutputPropsToExtend & {
  readonly htmlFor: string;
};

export const KnobHeadlessOutput = forwardRef<
  HTMLOutputElement,
  KnobHeadlessOutputProps
>((props, forwardedRef) => <output ref={forwardedRef} {...props} />);

KnobHeadlessOutput.displayName = 'KnobHeadlessOutput';
