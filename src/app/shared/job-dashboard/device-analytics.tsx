'use client';

import { useState } from 'react';
import { DatePicker } from '@/components/ui/datepicker';
import WidgetCard from '@/components/cards/widget-card';
import { RadialBarChart, RadialBar, ResponsiveContainer } from 'recharts';
import cn from '@/utils/class-names';
import { Title } from 'rizzui';
import TrendingUpIcon from '@/components/icons/trending-up';
import SimpleBar from 'simplebar-react';

const data = [
  {
    name: 'Desktop',
    devices: 12723,
    fill: '#3962F7',
  },
  {
    name: 'Tablet',
    devices: 9304,
    fill: '#2750AF',
  },
  {
    name: 'Mobile',
    devices: 8530,
    fill: '#E6B9DE',
  },
];

export default function DeviceAnalytics({ className }: { className?: string }) {
  const [startDate, setStartDate] = useState<Date>(new Date());
  return (
    <WidgetCard
      title="Device Analytics"
      titleClassName="text-gray-500 font-normal text-sm sm:text-sm font-inter"
      className={cn('flex h-full w-full flex-col @container', className)}
      action={
        <DatePicker
          selected={startDate}
          onChange={(date: Date) => setStartDate(date)}
          dateFormat="MMM, yyyy"
          placeholderText="Select Month"
          showMonthYearPicker
          popperPlacement="bottom-end"
          inputProps={{
            variant: 'outline',
            inputClassName: 'px-2 py-1 h-auto [&_input]:text-ellipsis ring-0',
          }}
          className="w-36"
        />
      }
    >
      <div className="mb-3 mt-1 flex items-center gap-2">
        <Title as="h2" className="font-inter text-2xl">
          2,87,095
        </Title>
        <span className="flex items-center gap-1 text-green-dark">
          <TrendingUpIcon className="h-auto w-5" />
          <span className="font-semibold leading-none"> +32.40%</span>
        </span>
      </div>
      <div className="w-full grow items-center justify-between gap-4 @sm:flex @lg:pt-4 @xl:justify-center @xl:pb-0">
        <SimpleBar className="w-full @sm:w-3/5">
          <div className="flex h-80 w-full justify-center @sm:h-80">
            <ResponsiveContainer
              width="100%"
              height="100%"
              className=" [&_.recharts-default-legend]:flex [&_.recharts-default-legend]:flex-col [&_.recharts-default-legend]:flex-wrap [&_.recharts-legend-wrapper]:!static [&_.recharts-legend-wrapper]:!-mt-[22px]  [&_.recharts-legend-wrapper]:!leading-[22px] @xs:[&_.recharts-legend-wrapper]:!mt-0 @xl:[&_.recharts-legend-wrapper]:!absolute @xl:[&_.recharts-legend-wrapper]:!end-0 @xl:[&_.recharts-legend-wrapper]:!start-auto @xl:[&_.recharts-legend-wrapper]:!top-1/2 @xl:[&_.recharts-legend-wrapper]:!-translate-y-1/2 @xl:[&_.recharts-legend-wrapper]:!translate-x-0 @xl:[&_.recharts-legend-wrapper]:!leading-9"
            >
              <RadialBarChart
                data={data}
                barSize={16}
                innerRadius="35%"
                outerRadius="110%"
                className="@sm:[&_>svg]:-ms-2"
              >
                <RadialBar
                  background
                  cornerRadius={20}
                  dataKey="devices"
                  className=" [&_.recharts-radial-bar-background-sector]:fill-gray-100"
                />
              </RadialBarChart>
            </ResponsiveContainer>
          </div>
        </SimpleBar>
        <CustomLegend className="shrink-0 @sm:w-36" />
      </div>
    </WidgetCard>
  );
}

function CustomLegend({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'flex flex-wrap justify-center gap-5 pt-5 @sm:flex-col @sm:items-center @sm:pt-0 @md:justify-start lg:gap-7',
        className
      )}
    >
      {data.map((item) => (
        <div
          key={item.name}
          className="flex w-2/5 flex-col items-center text-gray-500 @sm:items-start"
        >
          <div className="relative">
            <span
              className="absolute start-0 top-1/2 h-3 w-3 -translate-x-6 -translate-y-1/2 rounded rtl:translate-x-6"
              style={{ backgroundColor: item?.fill }}
            />
            <span className="block">{item.name}</span>
            <span className="font-inter text-base font-semibold leading-none text-gray-900 @sm:text-xl">
              {item.devices}+
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
