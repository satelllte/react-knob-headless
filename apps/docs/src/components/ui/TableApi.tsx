type Property = {
  name: string;
  type: string;
  defaultValue?: string;
  description: string;
};

type TableApiProps = {
  readonly properties: Property[];
};

export function TableApi({properties}: TableApiProps) {
  return (
    <table className='w-full text-sm'>
      <thead>
        <tr className='max-md:hidden'>
          <th className='text-left underline md:pb-3 pr-8 pb-1'>Prop</th>
          <th className='text-left underline md:pb-3 pr-8 pb-1'>Type</th>
          <th className='text-left underline md:pb-3 pr-8 pb-1'>Default</th>
          <th className='text-left underline md:pb-3'>Description</th>
        </tr>
      </thead>
      <tbody className='max-md:flex max-md:flex-col max-md:gap-6'>
        {properties.map((property) => (
          <tr key={property.name} className='max-md:flex max-md:flex-col'>
            <td className='text-left align-baseline font-normal pb-1 md:pb-4 pr-8 max-md:flex'>
              <span className='md:hidden underline font-bold block w-32'>
                Prop
              </span>
              <code className='text-sky-500'>{property.name}</code>
            </td>
            <td className='text-left align-baseline font-normal pb-1 md:pb-4 pr-8 max-md:flex'>
              <span className='md:hidden underline font-bold block w-32'>
                Type
              </span>
              <code className='text-purple-500'>{property.type}</code>
            </td>
            <td className='text-left align-baseline font-normal pb-1 md:pb-4 pr-8 max-md:flex'>
              <span className='md:hidden underline font-bold block w-32'>
                Default
              </span>
              {property.defaultValue ? (
                <code className='text-orange-500'>{property.defaultValue}</code>
              ) : (
                <span className='text-stone-300'>—</span>
              )}
            </td>
            <td className='text-left align-baseline font-normal pb-1 md:pb-4 md:w-1/3'>
              <span className='text-stone-300'>{property.description}</span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
