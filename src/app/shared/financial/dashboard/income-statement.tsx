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
  Line,
} from 'recharts';
import SimpleBar from '@/components/ui/simplebar';
import DropdownAction from '@/components/charts/dropdown-action';
import { Text, Title } from 'rizzui';
import cn from '@/utils/class-names';
import TrendingUpIcon from '@/components/icons/trending-up';
import { useTheme } from 'next-themes';

const data = [
  {
    label: 'Jan',
    revenue: 400,
    expense: 300,
    grossMargin: 280,
    netProfit: 300,
  },
  {
    label: 'Feb',
    revenue: 500,
    expense: 400,
    grossMargin: 300,
    netProfit: 350,
  },
  {
    label: 'Mar',
    revenue: 510,
    expense: 355,
    grossMargin: 410,
    netProfit: 210,
  },
  {
    label: 'Apr',
    revenue: 600,
    expense: 400,
    grossMargin: 550,
    netProfit: 450,
  },
  {
    label: 'May',
    revenue: 570,
    expense: 450,
    grossMargin: 350,
    netProfit: 400,
  },
  {
    label: 'Jun',
    revenue: 600,
    expense: 355,
    grossMargin: 480,
    netProfit: 455,
  },
  {
    label: 'Jul',
    revenue: 510,
    expense: 225,
    grossMargin: 410,
    netProfit: 350,
  },
  {
    label: 'Aug',
    revenue: 530,
    expense: 275,
    grossMargin: 330,
    netProfit: 370,
  },
  {
    label: 'Sep',
    revenue: 600,
    expense: 325,
    grossMargin: 370,
    netProfit: 490,
  },
  {
    label: 'Oct',
    revenue: 660,
    expense: 495,
    grossMargin: 400,
    netProfit: 365,
  },
  {
    label: 'Nov',
    revenue: 500,
    expense: 395,
    grossMargin: 300,
    netProfit: 450,
  },
  {
    label: 'Dec',
    revenue: 480,
    expense: 305,
    grossMargin: 400,
    netProfit: 300,
  },
];

const ticketStatus = [
  { name: 'Revenue' },
  { name: 'Expenses' },
  { name: 'Gross margin' },
  { name: 'Net Profit' },
];

interface ColorMap {
  dark: string;
  light: string;
  [key: string]: string;
}
const COLORS: ColorMap[] = [
  { dark: '#38CC79', light: '#38CC79' },
  { dark: '#31404e', light: '#111A23' },
  {
    dark: '#6C8EE0',
    light: '#6C8EE0',
  },
  {
    dark: '#F5A623',
    light: '#F5A623',
  },
];

const viewOptions = [
  {
    value: 'Yearly',
    label: 'Yearly',
  },
  {
    value: 'Daily',
    label: 'Daily',
  },
];

function Legend({ className }: { className?: string }) {
  const { theme } = useTheme();
  return (
    <div
      className={cn('hidden flex-wrap items-center gap-3 lg:gap-7 ', className)}
    >
      {ticketStatus.map((item, index) => (
        <div key={item.name} className="flex items-center gap-1.5">
          <span
            className="h-2.5 w-2.5 rounded-full"
            {...(theme && {
              style: {
                backgroundColor: COLORS[index][theme],
              },
            })}
          />
          <Text as="span">{item.name}</Text>
        </div>
      ))}
    </div>
  );
}

export default function IncomeStatement({ className }: { className?: string }) {
  const { theme } = useTheme();
  function handleChange(viewType: string) {
    console.log('viewType', viewType);
  }

  return (
    <WidgetCard
      title="Income Statement"
      titleClassName="text-gray-700 font-normal sm:text-sm font-inter"
      headerClassName="items-center"
      className={cn('min-h-[28rem]', className)}
      action={
        <div className="flex gap-5">
          <Legend className="hidden @[46rem]:inline-flex" />
          <DropdownAction
            className="rounded-md border"
            options={viewOptions}
            onChange={handleChange}
            dropdownClassName="!z-0"
          />
        </div>
      }
    >
      <div className="mb-3 mt-1 flex items-center gap-2 @[46rem]:mb-4">
        <Title as="h2" className="font-semibold">
          $78.45k
        </Title>
        <Text as="span" className="flex items-center gap-1 text-green-dark">
          <TrendingUpIcon className="h-auto w-5" />
          <Text as="span" className="font-medium leading-none">
            {' '}
            +42.40%
          </Text>
        </Text>
      </div>
      <Legend className="mb-3 inline-flex @[46rem]:hidden" />
      <SimpleBar>
        <div className="h-[32rem]  w-full pt-6 @lg:pt-8">
          <ResponsiveContainer width="100%" height="100%" minWidth="1610px">
            <ComposedChart
              data={data}
              barGap={8}
              margin={{
                left: 0,
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
              <Tooltip
                content={
                  <CustomTooltip className="[&_.chart-tooltip-item:last-child]:hidden" />
                }
                cursor={false}
              />

              <Bar
                dataKey="revenue"
                {...(theme && {
                  fill: COLORS[0][theme],
                })}
                barSize={28}
                radius={[4, 4, 0, 0]}
              />
              <Bar
                type="natural"
                dataKey="expense"
                {...(theme && {
                  fill: COLORS[1][theme],
                })}
                barSize={28}
                radius={[4, 4, 0, 0]}
              />
              <Bar
                type="natural"
                dataKey="grossMargin"
                {...(theme && {
                  fill: COLORS[2][theme],
                })}
                barSize={28}
                radius={[4, 4, 0, 0]}
              />

              <Line
                dataKey="netProfit"
                type={'natural'}
                stroke="#F5A623"
                strokeWidth={2}
                activeDot={false}
                dot={false}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </SimpleBar>
    </WidgetCard>
  );
}
