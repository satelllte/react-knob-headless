'use client';
import {KnobPercentage} from './KnobPercentage';

type KnobPercentageProps = React.ComponentProps<typeof KnobPercentage>;
type KnobPercentageXProps = Omit<KnobPercentageProps, 'axis'>; // eslint-disable-line @typescript-eslint/naming-convention

export function KnobPercentageX(props: KnobPercentageXProps) {
  return <KnobPercentage axis='x' {...props} />;
}
