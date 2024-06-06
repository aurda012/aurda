import { useEffect, useState } from 'react';
import { Select, Title } from 'rizzui';
import { PiMinus } from 'react-icons/pi';
import {
  InitialStateType,
  squareFeetOptions,
} from '@/app/shared/explore-listing/listing-filters/filter-utils';

export default function SquareFeetFilter({
  state,
  applyFilter,
}: {
  state: InitialStateType;
  applyFilter: (query: string, value: any) => void;
}) {
  const [minSquareFeet, setMinSquareFeet] = useState('500');
  const [maxSquareFeet, setMaxSquareFeet] = useState('1000');

  useEffect(() => {
    if (
      typeof state.square_feet_min === 'string' &&
      typeof state.square_feet_max === 'string'
    ) {
      setMinSquareFeet(state.square_feet_min);
      setMaxSquareFeet(state.square_feet_max);
    }
  }, [state.square_feet_min, state.square_feet_max]);

  return (
    <div>
      <Title as="h6" className="mb-5 font-semibold">
        Square Feet
      </Title>
      <div className="grid grid-cols-[1fr_20px_1fr] items-center gap-3">
        <Select
          dropdownClassName="!z-0"
          placeholder="No min"
          options={squareFeetOptions}
          value={minSquareFeet}
          onChange={(value: string) => {
            setMinSquareFeet(value);
            applyFilter('square_feet_min', value);
          }}
          getOptionValue={(option) => option.value}
          displayValue={(selected) =>
            squareFeetOptions?.find((minsf) => minsf.value === selected)
              ?.label ?? ''
          }
          inPortal={false}
        />
        <span className="relative top-0 inline-flex flex-shrink-0 items-center justify-center text-center">
          <PiMinus className=" w-3" />
        </span>
        <Select
          dropdownClassName="!z-0"
          placeholder="No max"
          options={squareFeetOptions}
          value={maxSquareFeet}
          onChange={(value: string) => {
            setMaxSquareFeet(value);
            applyFilter('square_feet_max', value);
          }}
          getOptionValue={(option) => option.value}
          displayValue={(selected) =>
            squareFeetOptions?.find((maxsf) => maxsf.value === selected)
              ?.label ?? ''
          }
          inPortal={false}
        />
      </div>
    </div>
  );
}
