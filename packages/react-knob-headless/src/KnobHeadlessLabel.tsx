import {forwardRef} from 'react';

type NativeLabelProps = React.ComponentProps<'label'>;

type NativeLabelPropsToExtend = Omit<
  NativeLabelProps,
  'id' // We are overriding this to make it required
>;

type KnobHeadlessLabelProps = NativeLabelPropsToExtend & {
  readonly id: string;
};

export const KnobHeadlessLabel = forwardRef<
  HTMLLabelElement,
  KnobHeadlessLabelProps
>((props, forwardedRef) => <label ref={forwardedRef} {...props} />);

KnobHeadlessLabel.displayName = 'KnobHeadlessLabel';
