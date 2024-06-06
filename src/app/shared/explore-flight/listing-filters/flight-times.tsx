'use client';

import { Title, Tab } from 'rizzui';
import cn from '@/utils/class-names';
import PriceFilter from '@/app/shared/explore-flight/listing-filters/time-filter';

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

export default function FlightTimes({
  title,
  name,
  data,
  isTabs,
  state,
  applyFilter,
  clearFilter,
}: FlightTimesProps) {
  return (
    <>
      <div className="py-5">
        <Title
          as="h6"
          className={cn(
            'flex items-center gap-1 font-inter font-semibold',
            isTabs && 'mb-4'
          )}
        >
          {title}
        </Title>

        {isTabs ? (
          <Tab>
            <Tab.List>
              <Tab.ListItem>Take-off</Tab.ListItem>
              <Tab.ListItem>Landing</Tab.ListItem>
            </Tab.List>
            <Tab.Panels className="mt-2">
              <Tab.Panel className="py-2 text-sm leading-6 text-gray-500">
                <div className="flex flex-col">
                  <span>Take-off from DAC</span>
                  <PriceFilter state={state} applyFilter={applyFilter} />
                </div>
                <div className="flex flex-col pt-3">
                  <span>Take-off from JFK</span>
                  <PriceFilter state={state} applyFilter={applyFilter} />
                </div>
              </Tab.Panel>
              <Tab.Panel className="py-2 text-sm leading-6 text-gray-500">
                <div className="flex flex-col">
                  <span>Take-off from JFK</span>
                  <PriceFilter state={state} applyFilter={applyFilter} />
                </div>
                <div className="flex flex-col pt-3">
                  <span>Take-off from DAC</span>
                  <PriceFilter state={state} applyFilter={applyFilter} />
                </div>
              </Tab.Panel>
            </Tab.Panels>
          </Tab>
        ) : (
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
        )}
      </div>
    </>
  );
}
