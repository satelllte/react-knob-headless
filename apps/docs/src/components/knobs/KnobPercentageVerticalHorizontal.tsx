'use client';
import {KnobPercentage} from './KnobPercentage';

type KnobPercentageProps = React.ComponentProps<typeof KnobPercentage>;
type KnobPercentageVerticalHorizontalProps = Omit<KnobPercentageProps, 'orientation'>;

export function KnobPercentageVerticalHorizontal(props: KnobPercentageVerticalHorizontalProps) {
  return <KnobPercentage orientation='vertical-horizontal' {...props} />;
}
