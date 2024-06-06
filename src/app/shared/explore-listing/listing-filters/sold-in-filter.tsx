import { useEffect, useState } from 'react';
import { Select } from 'rizzui';
import {
  InitialStateType,
  soldInLastOptions,
} from '@/app/shared/explore-listing/listing-filters/filter-utils';

export default function SoldInFilter({
  state,
  applyFilter,
}: {
  state: InitialStateType;
  applyFilter: (query: string, value: any) => void;
}) {
  const [soldInValue, setSoldInValue] = useState('any');

  useEffect(() => {
    if (state.sold_in_last) setSoldInValue(state.sold_in_last);
  }, [state.sold_in_last]);

  return (
    <div className="space-y-3">
      <Select
        dropdownClassName="!z-0"
        selectClassName="w-full"
        label="Sold In Last"
        labelClassName="text-start text-sm 2xl:text-base font-semibold text-gray-900 mb-5 font-lexend"
        placeholder="No min"
        options={soldInLastOptions}
        value={soldInValue}
        onChange={(value: string) => {
          setSoldInValue(value);
          applyFilter('sold_in_last', value);
        }}
        getOptionValue={(option) => option.value}
        displayValue={(selected) =>
          soldInLastOptions?.find((sld) => sld.value === selected)?.label ?? ''
        }
        inPortal={false}
      />
    </div>
  );
}
