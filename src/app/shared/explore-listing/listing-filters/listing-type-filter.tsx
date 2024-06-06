'use client';

import { AdvancedRadio, RadioGroup } from 'rizzui';
import { useEffect, useState } from 'react';
import { useIsMounted } from '@/hooks/use-is-mounted';
import { InitialStateType } from '@/app/shared/explore-listing/listing-filters/filter-utils';

const advanceRadioStyles = {
  className:
    'bg-transparent py-0 duration-100 [&_.rizzui-advanced-radio:hover]:border-0 [&_.rizzui-advanced-radio:hover]:bg-primary/[0.05] [&_.rizzui-advanced-radio]:min-h-[unset] [&_.rizzui-advanced-radio]:min-w-[unset] [&_.rizzui-advanced-radio]:rounded-none [&_.rizzui-advanced-radio]:border-0 [&_.rizzui-advanced-radio]:bg-transparent [&_.rizzui-advanced-radio]:text-center [&_.rizzui-advanced-radio]:text-gray-900 [&_input:checked~.rizzui-advanced-radio]:text-gray-0 dark:[&_input:checked~.rizzui-advanced-radio]:text-gray-900 [&_.rizzui-advanced-radio]:duration-100 [&_input:checked~.rizzui-advanced-radio]:bg-primary',
  inputClassName:
    '[&:checked~.rizzui-advanced-radio]:border-0 [&:checked~.rizzui-advanced-radio]:ring-0',
};

export default function ListingTypeFilter({
  state,
  applyFilter,
}: {
  state: InitialStateType;
  applyFilter: (query: string, value: any) => void;
}) {
  const [selected, setSelected] = useState('owner-0');
  const isMounted = useIsMounted();

  useEffect(() => {
    if (state.listing_type) setSelected(state.listing_type);
  }, [state.listing_type]);

  useEffect(() => {
    isMounted && applyFilter('listing_type', selected);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  return (
    <RadioGroup
      value={selected}
      setValue={setSelected}
      className="grid grid-cols-2 items-center rounded-md border border-gray-300 [&>label:last-of-type>span]:border-0"
    >
      <AdvancedRadio
        name="listing_type"
        value="agent-0"
        {...advanceRadioStyles}
      >
        By Agent (0)
      </AdvancedRadio>
      <AdvancedRadio
        name="listing_type"
        value="owner-0"
        {...advanceRadioStyles}
      >
        By Owner & Other (0)
      </AdvancedRadio>
    </RadioGroup>
  );
}
