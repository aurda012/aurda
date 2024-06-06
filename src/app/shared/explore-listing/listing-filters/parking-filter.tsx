import { Checkbox, Select } from 'rizzui';
import { useEffect, useState } from 'react';
import {
  InitialStateType,
  parkingSpotsData,
} from '@/app/shared/explore-listing/listing-filters/filter-utils';

export default function ParkingFilter({
  state,
  applyFilter,
}: {
  state: InitialStateType;
  applyFilter: (query: string, value: any) => void;
}) {
  const [selected, setSelected] = useState('any');

  useEffect(() => {
    if (state.parking_spots) setSelected(state.parking_spots);
  }, [state.parking_spots]);

  return (
    <div className="space-y-3">
      <Select
        dropdownClassName="!z-[1]"
        selectClassName="w-full"
        label="Parking Spots"
        labelClassName="text-start text-sm 2xl:text-base font-semibold text-gray-900 mb-5 font-lexend"
        placeholder="No min"
        options={parkingSpotsData}
        value={selected}
        onChange={(value: string) => {
          setSelected(value);
          applyFilter('parking_spots', value);
        }}
        getOptionValue={(option) => option.value}
        displayValue={(selected) =>
          parkingSpotsData?.find((prk) => prk.value === selected)?.label ?? ''
        }
        inPortal={false}
      />
      <Checkbox
        label={
          <div className="flex items-center justify-between text-gray-800">
            Must Have Garages
          </div>
        }
        labelClassName="w-full"
        name="garages"
        onChange={({ target }) => applyFilter('garages', target.value)}
        defaultChecked={false}
      />
    </div>
  );
}
