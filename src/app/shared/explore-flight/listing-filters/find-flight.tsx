'use client';

import dynamic from 'next/dynamic';
import { Popover, Button, ActionIcon, Title } from 'rizzui';
import cn from '@/utils/class-names';
import { useFilterControls } from '@/hooks/use-filter-control';
import { initialState } from '@/data/flight-filter-data';
import {
  PiAirplaneTakeoffBold,
  PiFunnelBold,
  PiX,
  PiXBold,
} from 'react-icons/pi';
import SimpleBar from '@/components/ui/simplebar';
import { useDrawer } from '@/app/shared/drawer-views/use-drawer';
import FlightFilter from '@/app/shared/explore-flight/listing-filters/flight-filter';
import hasSearchedParams from '@/utils/has-searched-params';

const FlightFilterSidebar = dynamic(
  () => import('@/app/shared/explore-flight/flight-filter-sidebar'),
  {
    ssr: false,
  }
);

export default function FindFlight() {
  const { openDrawer } = useDrawer();
  const { state, applyFilter, reset } = useFilterControls<
    typeof initialState,
    any
  >(initialState);

  return (
    <div className="mt-4 flex items-center gap-3 @lg:mt-0">
      <Popover placement="bottom-end" shadow="sm">
        <Popover.Trigger>
          <Button type="button" className="w-full @lg:w-auto">
            <PiAirplaneTakeoffBold className="me-2 text-lg" />
            Find Flight
          </Button>
        </Popover.Trigger>
        <Popover.Content className="!z-0 p-0 dark:bg-[#181818] [&>svg]:dark:fill-[#181818]">
          {({ setOpen }) => (
            <div
              className={cn(
                'w-[calc(100vw-32px)] p-5 @container sm:w-[524px] lg:p-7'
              )}
            >
              <div className="flex items-center justify-between gap-4 pb-6">
                <Title
                  as="h4"
                  className="text-start font-semibold capitalize text-gray-900"
                >
                  Filters
                </Title>
                <PiX
                  className="h-6 w-6 cursor-pointer"
                  onClick={() => setOpen(false)}
                />
              </div>
              <FlightFilter
                state={state}
                applyFilter={applyFilter}
                setOpen={setOpen}
              />
            </div>
          )}
        </Popover.Content>
      </Popover>
      <ActionIcon
        variant="outline"
        onClick={() =>
          openDrawer({
            view: <FlightFilterDrawerView reset={reset} />,
            placement: 'right',
          })
        }
        className="inline-flex @5xl:hidden"
      >
        <PiFunnelBold className="text-lg" />
      </ActionIcon>
    </div>
  );
}

function FlightFilterDrawerView({ reset }: any) {
  const { closeDrawer } = useDrawer();
  return (
    <div className="relative flex h-full w-full flex-col bg-white px-5 py-3.5 dark:bg-gray-50">
      <div className="-mx-5 mb-6 flex items-center justify-between border-b border-muted px-4 pb-4">
        <Title as="h5" className="font-semibold">
          Filters
        </Title>
        <ActionIcon
          size="sm"
          rounded="full"
          variant="text"
          onClick={() => closeDrawer()}
        >
          <PiXBold className="h-4 w-4" />
        </ActionIcon>
      </div>
      <SimpleBar className="-mx-5 min-h-[calc(100%-10rem)]">
        <div className="px-5">
          <FlightFilterSidebar />
        </div>
      </SimpleBar>

      <div className="sticky bottom-0 flex items-center justify-center gap-3 bg-white pb-3 pt-5 dark:bg-gray-50">
        {hasSearchedParams() ? (
          <Button
            size="lg"
            variant="outline"
            onClick={() => {
              reset();
              closeDrawer();
            }}
            className="flex-shrink-0"
          >
            Reset All
          </Button>
        ) : null}
        <Button size="lg" className="w-full" onClick={() => closeDrawer()}>
          Show results
        </Button>
      </div>
    </div>
  );
}
