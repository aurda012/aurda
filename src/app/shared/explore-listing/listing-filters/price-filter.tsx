import { useEffect, useState } from 'react';
import { RadioGroup, Button, AdvancedRadio, Select } from 'rizzui';
import { PiMinus } from 'react-icons/pi';
import { useMedia } from '@/hooks/use-media';
import {
  InitialStateType,
  noMaximumData,
  noMinimumData,
} from '@/app/shared/explore-listing/listing-filters/filter-utils';
import { useIsMounted } from '@/hooks/use-is-mounted';

export default function PriceFilter({
  state,
  applyFilter,
  setOpen,
}: {
  state: InitialStateType;
  applyFilter: (query: string, value: any) => void;
  setOpen?: any;
}) {
  const [pricing, setPricing] = useState('last-price');
  const [price, setPrice] = useState<number[]>([0, 100000]);
  const isWide = useMedia('(min-width: 1537px)', false);
  const isMounted = useIsMounted();

  useEffect(() => {
    if (typeof state.price === 'string') {
      setPrice(state.price?.split(',').map((n: string) => +n));
    }
    if (state.pricing && typeof state.pricing === 'string') {
      setPricing(state.pricing);
    }
  }, [state.price, state.pricing]);

  useEffect(() => {
    isMounted && applyFilter('pricing', pricing);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pricing]);

  return (
    <>
      <RadioGroup
        value={pricing}
        setValue={setPricing}
        className="grid grid-cols-2 items-center gap-2 rounded-md border border-gray-300 p-2 text-center"
      >
        <AdvancedRadio
          name="pricing"
          value="last-price"
          className="min-w-[unset]"
        >
          List Price
        </AdvancedRadio>
        <AdvancedRadio
          name="pricing"
          value="monthly-payment"
          className="min-w-[unset]"
        >
          Monthly Payment
        </AdvancedRadio>
      </RadioGroup>
      <div className="mt-5 grid grid-cols-[1fr_12px_1fr] items-center gap-3">
        <Select
          dropdownClassName="!z-[1]"
          inPortal={false}
          selectClassName=""
          label="Minimum"
          labelClassName="text-start"
          placeholder="No min"
          options={noMinimumData}
          value={price[0]}
          onChange={(value: number) => {
            setPrice((prev) => [value, prev[1]]);
            !isWide && applyFilter('price', [value, price[1]]);
          }}
          getOptionValue={(option) => option.value}
          displayValue={(selected) =>
            noMinimumData?.find((nmin) => nmin.value === selected)?.label ?? ''
          }
        />
        <PiMinus className="relative top-3 w-3 flex-shrink-0" />
        <Select
          dropdownClassName="!z-[1]"
          inPortal={false}
          selectClassName=""
          label="Maximum"
          labelClassName="text-start"
          placeholder="No max"
          options={noMaximumData}
          value={price[1]}
          onChange={(value: number) => {
            setPrice((prev) => [prev[0], value]);
            !isWide && applyFilter('price', [price[0], value]);
          }}
          getOptionValue={(option) => option.value}
          displayValue={(selected) =>
            noMaximumData?.find((nmax) => nmax.value === selected)?.label ?? ''
          }
        />
      </div>
      {isWide && (
        <Button
          onClick={() => {
            setOpen(false);
            applyFilter('price', price);
          }}
          className="mt-5 w-full rounded-md dark:bg-gray-50 dark:text-white"
        >
          Apply
        </Button>
      )}
    </>
  );
}
