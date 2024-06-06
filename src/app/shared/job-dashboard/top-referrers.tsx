'use client';

import WidgetCard from '@/components/cards/widget-card';

import DropdownAction from '@/components/charts/dropdown-action';
import { Text, Title } from 'rizzui';
import TrendingUpIcon from '@/components/icons/trending-up';
import cn from '@/utils/class-names';

const data = [
  {
    country: 'Instagram',
    count: 67345,
  },
  {
    country: 'Linkedin',
    count: 80940,
  },
  {
    country: 'Pinterest',
    count: 67345,
  },
  {
    country: 'Google Search',
    count: 38095,
  },
  {
    country: 'Others',
    count: 38095,
  },
];

const viewOptions = [
  {
    label: 'Weekly',
    value: 'weekly',
  },
  {
    label: 'Monthly',
    value: 'monthly',
  },
];

export default function TopReferrers({ className }: { className?: string }) {
  return (
    <WidgetCard
      title="Top Referrers"
      titleClassName="text-gray-700 font-normal text-sm sm:text-sm font-inter"
      action={
        <div className="flex items-center gap-5">
          <DropdownAction
            options={viewOptions}
            dropdownClassName="!z-0"
            className="rounded-md border"
            onChange={(v) => console.log(v)}
          />
        </div>
      }
      className={cn('flex flex-col', className)}
    >
      <div className="flex items-center justify-start">
        <Title as="h2" className="me-2 mt-1 text-2xl font-semibold">
          75,045k
        </Title>
        <Text className="flex items-center leading-none text-gray-500">
          <Text
            as="span"
            className={cn(
              'me-2 inline-flex items-center font-medium text-green'
            )}
          >
            <TrendingUpIcon className="me-1 h-4 w-4" />
            32.40%
          </Text>
        </Text>
      </div>
      <div className="mt-8 flex grow flex-col gap-4 md:gap-6">
        {data.map((item) => (
          <SingleBar key={item.country} item={item} />
        ))}
      </div>
    </WidgetCard>
  );
}

function SingleBar({
  item,
}: {
  item?: {
    country?: string;
    count?: number;
  };
}) {
  let percentage = item?.count && (item?.count / 1000).toFixed();

  return (
    <div className="relative">
      <Text className="mb-1 font-medium text-gray-900 dark:text-gray-600">
        {item?.country}
      </Text>
      <div className="flex items-center gap-2">
        <div
          className="h-[30px] rounded bg-primary shadow"
          style={{
            width: `${percentage}%`,
          }}
        />
        <Text className="shrink-0 font-medium text-gray-900">
          {percentage}K
        </Text>
      </div>
    </div>
  );
}
