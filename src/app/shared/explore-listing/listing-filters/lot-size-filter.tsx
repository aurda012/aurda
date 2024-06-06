'use client';

import { Select, Title } from 'rizzui';
import { useEffect, useState } from 'react';
import { PiMinus } from 'react-icons/pi';
import {
  InitialStateType,
  lotSizeOptions,
} from '@/app/shared/explore-listing/listing-filters/filter-utils';

export default function LotSizeFilter({
  state,
  applyFilter,
}: {
  state: InitialStateType;
  applyFilter: (query: string, value: any) => void;
}) {
  const [minLotSize, setMinLotSize] = useState('750');
  const [maxLotSize, setMaxLotSize] = useState('1250');

  useEffect(() => {
    if (
      typeof state.lot_size_min === 'string' &&
      typeof state.lot_size_max === 'string'
    ) {
      setMinLotSize(state.lot_size_min);
      setMaxLotSize(state.lot_size_max);
    }
  }, [state.lot_size_min, state.lot_size_max]);

  return (
    <div>
      <Title as="h6" className="mb-5 font-semibold">
        Lot Size
      </Title>
      <div className="grid grid-cols-[1fr_20px_1fr] items-center gap-3">
        <Select
          dropdownClassName="!z-[1]"
          placeholder="No min"
          options={lotSizeOptions}
          value={minLotSize}
          onChange={(value: string) => {
            setMinLotSize(value);
            applyFilter('lot_size_min', value);
          }}
          getOptionValue={(option) => option.value}
          displayValue={(selected) =>
            lotSizeOptions?.find((minls) => minls.value === selected)?.label ??
            ''
          }
          inPortal={false}
        />
        <span className="relative top-0 inline-flex flex-shrink-0 items-center justify-center text-center">
          <PiMinus className=" w-3" />
        </span>
        <Select
          dropdownClassName="!z-0"
          placeholder="No max"
          options={lotSizeOptions}
          value={maxLotSize}
          onChange={(value: string) => {
            setMaxLotSize(value);
            applyFilter('lot_size_max', value);
          }}
          getOptionValue={(option) => option.value}
          displayValue={(selected) =>
            lotSizeOptions?.find((maxls) => maxls.value === selected)?.label ??
            ''
          }
          inPortal={false}
        />
      </div>
    </div>
  );
}
