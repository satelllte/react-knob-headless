'use client';
import {KnobPercentage} from './KnobPercentage';

type KnobPercentageProps = React.ComponentProps<typeof KnobPercentage>;
type KnobPercentageHorizontalProps = Omit<KnobPercentageProps, 'axis'>;

export function KnobPercentageHorizontal(props: KnobPercentageHorizontalProps) {
  return <KnobPercentage axis='x' {...props} />;
}
