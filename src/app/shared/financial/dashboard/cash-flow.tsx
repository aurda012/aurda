'use client';

import WidgetCard from '@/components/cards/widget-card';
import { Title } from 'rizzui';
import cn from '@/utils/class-names';
import {
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ComposedChart,
} from 'recharts';
import { CustomTooltip } from '@/components/charts/custom-tooltip';
import SimpleBar from '@/components/ui/simplebar';
import DropdownAction from '@/components/charts/dropdown-action';
import TrendingUpIcon from '@/components/icons/trending-up';

type Props = {
  className?: string;
};

const data = [
  {
    label: 'Jan',
    income: 665,
    outgoing: 454,
  },
  {
    label: 'Feb',
    income: 589,
    outgoing: 351,
  },
  {
    label: 'Mar',
    income: 470,
    outgoing: -100,
  },
  {
    label: 'Apr',
    income: 571,
    outgoing: -283,
  },
  {
    label: 'May',
    income: 1050,
    outgoing: 850,
  },
  {
    label: 'Jun',
    income: 750,
    outgoing: -190,
  },
  {
    label: 'Jul',
    income: 875,
    outgoing: 700,
  },
  {
    label: 'Aug',
    income: 568,
    outgoing: 410,
  },
  {
    label: 'Sep',
    income: 775,
    outgoing: 550,
  },
  {
    label: 'Oct',
    income: 680,
    outgoing: 488,
  },
  {
    label: 'Nov',
    income: 580,
    outgoing: 390,
  },
  {
    label: 'Dec',
    income: 438,
    outgoing: 250,
  },
];

const legend = [{ name: 'Income' }, { name: 'Outgoings' }];
const COLORS = ['#00766B', '#89BAB5'];
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

function CustomLegend({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'mt-2 flex flex-wrap items-start gap-3 lg:gap-7',
        className
      )}
    >
      {legend.map((item, index) => (
        <div key={item.name} className="flex items-center gap-1.5">
          <span
            className="h-3 w-3 rounded-full"
            style={{ backgroundColor: COLORS[index] }}
          />
          <span>{item.name}</span>
        </div>
      ))}
    </div>
  );
}

export default function CashFlow({ className }: Props) {
  function handleChange(viewType: string) {
    console.log('viewType', viewType);
  }

  return (
    <WidgetCard
      title="Cash Flow"
      titleClassName="text-gray-700 font-normal sm:text-sm font-inter"
      headerClassName="items-center"
      className={cn('min-h-[28rem]', className)}
      action={
        <div className="flex gap-5">
          <CustomLegend className="hidden @[28rem]:inline-flex" />
          <DropdownAction
            onChange={handleChange}
            className="rounded-md border"
            options={viewOptions}
            dropdownClassName="!z-0"
          />
        </div>
      }
    >
      <div className="mb-3 mt-1 flex items-center gap-2 @[28rem]:mb-4">
        <Title as="h2" className="font-semibold">
          $78.45k
        </Title>
        <span className="flex items-center gap-1 text-green-dark">
          <TrendingUpIcon className="h-auto w-5" />
          <span className="font-medium leading-none"> +52.40%</span>
        </span>
      </div>
      <CustomLegend className="-mt-0 mb-4 inline-flex @[28rem]:hidden" />
      <div className="w-full lg:mt-7">
        <SimpleBar>
          <div className="h-[24rem] w-full pt-6 @lg:pt-8">
            <ResponsiveContainer width="100%" height="100%" minWidth={1450}>
              <ComposedChart
                barGap={8}
                data={data}
                margin={{
                  left: -20,
                  top: 20,
                }}
                className="[&_.recharts-tooltip-cursor]:fill-opacity-20 dark:[&_.recharts-tooltip-cursor]:fill-opacity-10 [&_.recharts-bar]:translate-x-4 [&_.recharts-cartesian-axis-tick-value]:fill-gray-500 [&_.recharts-cartesian-axis.yAxis]:-translate-y-3 [&_.recharts-cartesian-axis.yAxis]:translate-x-2.5 rtl:[&_.recharts-cartesian-axis.yAxis]:-translate-x-12 [&_.recharts-xAxis.xAxis]:translate-x-[14px] [&_.recharts-xAxis.xAxis]:translate-y-2.5 [&_path.recharts-rectangle]:!stroke-none"
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
                  dataKey="income"
                  fill={COLORS[0]}
                  barSize={28}
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  type="natural"
                  dataKey="outgoing"
                  fill={COLORS[1]}
                  barSize={28}
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
