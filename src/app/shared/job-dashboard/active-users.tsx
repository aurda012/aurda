'use client';

import { useState } from 'react';
import WorldMap, { type CountryContext } from 'react-svg-worldmap';
import WidgetCard from '@/components/cards/widget-card';
import { Badge, Text } from 'rizzui';
import cn from '@/utils/class-names';
import { DatePicker } from '@/components/ui/datepicker';

const data = [
  {
    country: 'US',
    name: 'United States',
    value: 40,
    style: 'bg-[#E6B9DE]',
    colorCode: '#E6B9DE',
  },
  {
    country: 'CN',
    name: 'China',
    value: 20,
    style: 'bg-[#2750AF]',
    colorCode: '#2750AF',
  },
  {
    country: 'RU',
    name: 'Russia',
    value: 15,
    style: 'bg-[#3962F7]',
    colorCode: '#3962F7',
  },
  {
    country: 'CA',
    name: 'Canada',
    value: 5,
    style: 'bg-[#BBD6FF]',
    colorCode: '#BBD6FF',
  },
];

const getFillColor = (countryCode: string) => {
  const country = data.find((c) => c.country === countryCode);
  return country ? country.colorCode : '#DFDFDF';
};

const getStyle = ({ countryCode }: CountryContext) => ({
  fill: getFillColor(countryCode),
  stroke: '#FFFFFF',
  strokeWidth: 1,
  strokeOpacity: 1,
});

export default function ActiveUsers({ className }: { className?: string }) {
  const [startDate, setStartDate] = useState<Date>(new Date());
  return (
    <WidgetCard
      title="Active Users"
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
      className={cn(
        'relative grid grid-cols-1 place-content-between gap-3',
        className
      )}
    >
      <div className="col-span-full flex justify-center overflow-hidden [&_figure]:!bg-transparent">
        <WorldMap
          size={'lg'}
          data={data}
          color="#2750AF"
          valueSuffix="%"
          styleFunction={getStyle}
        />
      </div>

      <div className="col-span-full -mx-5 border-t border-dashed border-muted px-5 pt-5 lg:-mx-7 lg:px-7">
        <div className="mx-auto flex w-full max-w-md flex-wrap justify-center gap-x-3 gap-y-1.5 text-center">
          {data.map((country) => (
            <div key={country.name} className="flex items-center gap-1">
              <Badge renderAsDot className={cn(country.style)} />
              <Text className="text-gray-500 dark:text-gray-600">
                {country.name}
                <Text
                  as="span"
                  className="ms-1 font-lexend font-medium text-gray-700"
                >
                  {`${country.value}%`}
                </Text>
              </Text>
            </div>
          ))}
        </div>
      </div>
    </WidgetCard>
  );
}
