import { useEffect, useState } from 'react';
import { Select } from 'rizzui';
import {
  InitialStateType,
  maxHOAOptions,
} from '@/app/shared/explore-listing/listing-filters/filter-utils';

export default function MaxHOAFilter({
  state,
  applyFilter,
}: {
  state: InitialStateType;
  applyFilter: (query: string, value: any) => void;
}) {
  const [selected, setSelected] = useState('any');

  useEffect(() => {
    if (state.maxHoA) setSelected(state.maxHoA);
  }, [state.maxHoA]);

  return (
    <Select
      dropdownClassName="!z-[1]"
      selectClassName="w-full"
      label="Max HOA"
      labelClassName="text-start text-sm 2xl:text-base font-semibold text-gray-900 mb-5 font-lexend"
      placeholder="No min"
      options={maxHOAOptions}
      value={selected}
      onChange={(value: string) => {
        setSelected(value);
        applyFilter('maxHoA', value);
      }}
      getOptionValue={(option) => option.value}
      displayValue={(selected) =>
        maxHOAOptions?.find((mhoa) => mhoa.value === selected)?.label ?? ''
      }
      inPortal={false}
    />
  );
}
