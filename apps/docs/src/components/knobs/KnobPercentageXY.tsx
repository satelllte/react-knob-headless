'use client';
import {KnobPercentage} from './KnobPercentage';

type KnobPercentageProps = React.ComponentProps<typeof KnobPercentage>;
type KnobPercentageXYProps = Omit<KnobPercentageProps, 'axis'>; // eslint-disable-line @typescript-eslint/naming-convention

// eslint-disable-next-line @typescript-eslint/naming-convention
export function KnobPercentageXY(props: KnobPercentageXYProps) {
  return <KnobPercentage axis='xy' {...props} />;
}
