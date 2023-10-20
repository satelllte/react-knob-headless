'use client';
import {KnobPercentage} from './KnobPercentage';

type KnobPercentageProps = React.ComponentProps<typeof KnobPercentage>;
type KnobPercentageHorizontalProps = Omit<KnobPercentageProps, 'orientation'>;

export function KnobPercentageHorizontal(props: KnobPercentageHorizontalProps) {
  return <KnobPercentage orientation='horizontal' {...props} />;
}
