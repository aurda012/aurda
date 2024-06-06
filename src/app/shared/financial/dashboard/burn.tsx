'use client';

import WidgetCard from '@/components/cards/widget-card';
import DropdownAction from '@/components/charts/dropdown-action';
import { Title } from 'rizzui';
import cn from '@/utils/class-names';
import SimpleBar from '@/components/ui/simplebar';
import { useMedia } from '@/hooks/use-media';

import { CustomTooltip } from '@/components/charts/custom-tooltip';
import {
  Bar,
  XAxis,
  Tooltip,
  ComposedChart,
  ResponsiveContainer,
} from 'recharts';

const data = [
  {
    label: 'Mon',
    amount: 1200,
  },
  {
    label: 'Tue',
    amount: 1300,
  },
  {
    label: 'Thu',
    amount: 1150,
  },
  {
    label: 'Wed',
    amount: 700,
  },
  {
    label: 'Fri',
    amount: 900,
  },
  {
    label: 'Sat',
    amount: 600,
  },
  {
    label: 'Sun',
    amount: 790,
  },
];

const viewOptions = [
  {
    value: 'Daily',
    label: 'Daily',
  },
  {
    value: 'Monthly',
    label: 'Monthly',
  },
];

function Description({ className }: { className?: string }) {
  return (
    <div className={cn('mt-1 space-y-3', className)}>
      <Title as="h2" className="font-semibold text-white">
        $83.45k
      </Title>
      <p className="text-gray-300 dark:text-gray-600">
        Access your weekly statement quickly and easily. You can also download
        the statement in pdf or excel format.
      </p>
    </div>
  );
}

export default function Burn({ className }: { className?: string }) {
  const isTablet = useMedia('(max-width: 820px)', false);
  function handleChange(viewType: string) {
    console.log('viewType', viewType);
  }

  return (
    <WidgetCard
      title="Burn"
      titleClassName="text-gray-0 dark:text-gray-900 mt-[6px] font-normal sm:text-sm font-inter"
      className={cn(
        'flex h-full flex-col @container [background:linear-gradient(29deg,#0E1012_12.96%,#6C4F3E_94.88%)]',
        className
      )}
      action={
        <DropdownAction
          prefixIconClassName="text-white"
          selectClassName="hover:text-white dark:hover:text-white"
          className="rounded-md border border-white  text-white hover:text-white dark:border-white/0"
          options={viewOptions}
          dropdownClassName="!z-0"
          onChange={handleChange}
        />
      }
    >
      <div className="flex h-full flex-col justify-between">
        <Description />
        <SimpleBar>
          <div className="h-[20rem] w-full pt-9  @lg:pt-8">
            <ResponsiveContainer
              width="100%"
              height="100%"
              {...(isTablet && { minWidth: '500px' })}
            >
              <ComposedChart
                data={data}
                margin={{
                  left: 0,
                  top: 27,
                }}
                className="[&_.recharts-tooltip-cursor]:fill-opacity-20 dark:[&_.recharts-tooltip-cursor]:fill-opacity-10 [&_.recharts-cartesian-axis-tick-value]:fill-gray-300 dark:[&_.recharts-cartesian-axis-tick-value]:fill-gray-500 [&_.recharts-cartesian-axis.xAxis]:translate-y-2 [&_.recharts-cartesian-axis.yAxis]:-translate-y-3 rtl:[&_.recharts-cartesian-axis.yAxis]:-translate-x-12 [&_.recharts-label-list]:-translate-y-1 [&_path.recharts-rectangle]:!stroke-none"
              >
                <XAxis dataKey="label" axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} cursor={false} />
                <Bar
                  dataKey="amount"
                  fill="#F88B11"
                  barSize={36}
                  stroke="#FF7A2F"
                  label={{ position: 'top', fill: '#DFDFDF', fontSize: 12 }}
                  radius={[4, 4, 0, 0]}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </SimpleBar>
      </div>
    </WidgetCard>
  );
}
