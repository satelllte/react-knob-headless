'use client';
import {KnobPercentage} from './KnobPercentage';

type KnobPercentageProps = React.ComponentProps<typeof KnobPercentage>;
type KnobPercentageVerticalHorizontalProps = Omit<KnobPercentageProps, 'axis'>;

export function KnobPercentageVerticalHorizontal(
  props: KnobPercentageVerticalHorizontalProps,
) {
  return <KnobPercentage axis='xy' {...props} />;
}
