'use client';

import PriceFilter from '@/app/shared/explore-flight/listing-filters/time-filter';
import { Collapse } from 'rizzui';
import cn from '@/utils/class-names';
import { PiCaretDownBold } from 'react-icons/pi';

type TimeOptions = {
  name: string;
  content?: number;
};

interface FlightTimesProps {
  title: string;
  name: string;
  data: TimeOptions[];
  state: any;
  isTabs?: boolean;
  isAccordion?: boolean;
  applyFilter: (query: string, value: any) => void;
  clearFilter?: (key: string[]) => void;
}

export default function FlightTimesWithAccordion({
  title,
  state,
  applyFilter,
}: FlightTimesProps) {
  return (
    <>
      <Collapse
        className="py-5"
        header={({ open, toggle }) => (
          <button
            type="button"
            onClick={toggle}
            className="flex w-full cursor-pointer items-center justify-between text-base font-semibold text-gray-900"
          >
            {title}
            <PiCaretDownBold
              strokeWidth={3}
              className={cn(
                'h-3.5 w-3.5 -rotate-90 text-gray-500 transition-transform duration-200 rtl:rotate-90',
                open && 'rotate-0 rtl:rotate-0'
              )}
            />
          </button>
        )}
      >
        <div className="py-2 text-sm leading-6 text-gray-500">
          <div className="flex flex-col">
            <span>Take-off from DAC</span>
            <PriceFilter state={state} applyFilter={applyFilter} />
          </div>
          <div className="flex flex-col pt-3">
            <span>Take-off from JFK</span>
            <PriceFilter state={state} applyFilter={applyFilter} />
          </div>
        </div>
      </Collapse>
    </>
  );
}
