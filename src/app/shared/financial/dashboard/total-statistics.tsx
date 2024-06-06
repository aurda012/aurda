'use client';

import WidgetCard from '@/components/cards/widget-card';
import { CustomTooltip } from '@/components/charts/custom-tooltip';
import {
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ComposedChart,
  ResponsiveContainer,
} from 'recharts';
import { useMedia } from '@/hooks/use-media';
import SimpleBar from '@/components/ui/simplebar';
import DropdownAction from '@/components/charts/dropdown-action';
import { Title } from 'rizzui';
import cn from '@/utils/class-names';
import TrendingUpIcon from '@/components/icons/trending-up';
import { useTheme } from 'next-themes';

const data = [
  {
    label: 'Mon',
    revenue: 98,
    expenses: 80,
  },
  {
    label: 'Tue',
    revenue: 87,
    expenses: 49,
  },
  {
    label: 'Thu',
    revenue: 50,
    expenses: 86,
  },
  {
    label: 'Wed',
    revenue: 45,
    expenses: 68,
  },
  {
    label: 'Fri',
    revenue: 25,
    expenses: 38,
  },
  {
    label: 'Sat',
    revenue: 80,
    expenses: 59,
  },
  {
    label: 'Sun',
    revenue: 87,
    expenses: 48,
  },
];

const transactionLegend = [{ name: 'Revenue' }, { name: 'Expenses' }];

interface ColorMap {
  dark: string;
  light: string;
  [key: string]: string;
}
const COLORS: ColorMap[] = [
  { dark: '#28D775', light: '#28D775' },
  { dark: '#273849', light: '#111A23' },
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

export default function TotalStatistics({ className }: { className?: string }) {
  const { theme } = useTheme();
  const isTablet = useMedia('(max-width: 800px)', false);

  function handleChange(viewType: string) {
    console.log('viewType', viewType);
  }

  return (
    <WidgetCard
      title="Total Statistics"
      titleClassName="text-gray-700 font-normal sm:text-sm font-inter"
      headerClassName="items-center"
      action={
        <div className="flex items-center gap-5">
          <CustomLegend className="hidden @[28rem]:mt-0 @[28rem]:inline-flex" />
          <DropdownAction
            className="rounded-md border"
            options={viewOptions}
            onChange={handleChange}
            dropdownClassName="!z-0"
          />
        </div>
      }
      className={cn('min-h-[28rem] @container', className)}
    >
      <div className="mb-3 mt-1 flex items-center gap-2 @[28rem]:mb-4">
        <Title as="h2" className="font-semibold">
          $83.45k
        </Title>
        <span className="flex items-center gap-1 text-green-dark">
          <TrendingUpIcon className="h-auto w-5" />
          <span className="font-medium leading-none"> +32.40%</span>
        </span>
      </div>
      <CustomLegend className="mb-4 mt-0 inline-flex @[28rem]:hidden" />
      <SimpleBar>
        <div className="h-[24rem] w-full pt-6 @lg:pt-8">
          <ResponsiveContainer
            width="100%"
            height="100%"
            {...(isTablet && { minWidth: '1100px' })}
          >
            <ComposedChart
              barGap={8}
              data={data}
              margin={{
                left: -17,
                top: 20,
              }}
              className="[&_.recharts-tooltip-cursor]:fill-opacity-20 dark:[&_.recharts-tooltip-cursor]:fill-opacity-10 [&_.recharts-cartesian-axis-tick-value]:fill-gray-500  [&_.recharts-cartesian-axis.yAxis]:-translate-y-3 rtl:[&_.recharts-cartesian-axis.yAxis]:-translate-x-12 [&_.recharts-xAxis.xAxis]:translate-y-2.5 [&_path.recharts-rectangle]:!stroke-none"
            >
              <CartesianGrid
                vertical={false}
                strokeOpacity={0.435}
                strokeDasharray="8 10"
              />
              <XAxis dataKey="label" axisLine={false} tickLine={false} />
              <YAxis
                axisLine={false}
                tickLine={false}
                tickFormatter={(label) => `$${label}k`}
              />
              <Tooltip content={<CustomTooltip />} cursor={false} />
              <Bar
                dataKey="revenue"
                {...(theme && {
                  fill: COLORS[0][theme],
                  stroke: COLORS[0][theme],
                })}
                barSize={28}
                radius={[4, 4, 0, 0]}
              />
              <Bar
                type="natural"
                dataKey="expenses"
                {...(theme && {
                  fill: COLORS[1][theme],
                  stroke: COLORS[1][theme],
                })}
                barSize={28}
                radius={[4, 4, 0, 0]}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </SimpleBar>
    </WidgetCard>
  );
}

function CustomLegend({ className }: { className?: string }) {
  const { theme } = useTheme();
  return (
    <div
      className={cn(
        'mt-2 flex flex-wrap items-start gap-3 lg:gap-7',
        className
      )}
    >
      {transactionLegend.map((item, index) => (
        <div key={item.name} className="flex items-center gap-1.5">
          <span
            className="-mt-0.5 h-3 w-3 rounded-full"
            {...(theme && {
              style: {
                backgroundColor: COLORS[index][theme],
              },
            })}
          />
          <span>{item.name}</span>
        </div>
      ))}
    </div>
  );
}
