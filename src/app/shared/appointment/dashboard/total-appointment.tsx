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
  LabelList,
} from 'recharts';
import { useMedia } from '@/hooks/use-media';
import SimpleBar from '@/components/ui/simplebar';
import DropdownAction from '@/components/charts/dropdown-action';
import { Title } from 'rizzui';
import cn from '@/utils/class-names';
import TrendingUpIcon from '@/components/icons/trending-up';
import { useTheme } from 'next-themes';
import { formatNumber } from '@/utils/format-number';

const data = [
  {
    label: 'Sun',
    booking: 806,
    visitors: 584,
  },
  {
    label: 'Mon',
    booking: 740,
    visitors: 923,
  },
  {
    label: 'Tue',
    booking: 627,
    visitors: 784,
  },
  {
    label: 'Wed',
    booking: 915,
    visitors: 759,
  },
  {
    label: 'Thu',
    booking: 850,
    visitors: 923,
  },

  {
    label: 'Fri',
    booking: 703,
    visitors: 587,
  },
  {
    label: 'Sat',
    booking: 923,
    visitors: 805,
  },
];

const appointmentLegend = [{ name: 'Today’s Booking' }, { name: 'Visitors' }];

interface ColorMap {
  dark: string;
  light: string;
  [key: string]: string;
}
const COLORS: ColorMap[] = [
  { dark: '#2B7F75', light: '#2B7F75' },
  { dark: '#FFD66B', light: '#FFD66B' },
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

export default function TotalAppointment({
  className,
}: {
  className?: string;
}) {
  const { theme } = useTheme();
  const isTablet = useMedia('(max-width: 800px)', false);

  function handleChange(viewType: string) {
    console.log('viewType', viewType);
  }

  return (
    <WidgetCard
      title="Total Appointment"
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
      className={cn('min-h-[20rem] @container', className)}
    >
      <div className="mb-4 mt-1 flex items-center gap-2">
        <Title as="h2" className="font-inter font-bold">
          2834
        </Title>
        <span className="flex items-center gap-1 text-green-dark">
          <TrendingUpIcon className="h-auto w-5" />
          <span className="font-semibold leading-none"> +28.00%</span>
        </span>
      </div>
      <CustomLegend className="mb-4 mt-0 inline-flex @[28rem]:hidden" />
      <SimpleBar>
        <div className="h-[18rem] w-full pt-1">
          <ResponsiveContainer
            width="100%"
            height="100%"
            {...(isTablet && { minWidth: '1100px' })}
          >
            <ComposedChart
              barGap={8}
              data={data}
              margin={{
                left: -15,
                top: 20,
              }}
              className="[&_.recharts-tooltip-cursor]:fill-opacity-20 dark:[&_.recharts-tooltip-cursor]:fill-opacity-10 [&_.recharts-cartesian-axis-tick-value]:fill-gray-500 rtl:[&_.recharts-cartesian-axis.yAxis]:-translate-x-12 [&_.recharts-xAxis.xAxis]:translate-y-2.5 [&_path.recharts-rectangle]:!stroke-none"
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
                tickFormatter={(label) => label}
              />
              <Tooltip content={<CustomTooltip />} cursor={false} />
              <Bar
                dataKey="booking"
                {...(theme && {
                  fill: COLORS[0][theme],
                  stroke: COLORS[0][theme],
                })}
                barSize={40}
                radius={[10, 10, 10, 10]}
              >
                <LabelList dataKey="booking" content={<CustomizedLabel />} />
              </Bar>
              <Bar
                type="natural"
                dataKey="visitors"
                {...(theme && {
                  fill: COLORS[1][theme],
                  stroke: COLORS[1][theme],
                })}
                barSize={40}
                radius={[10, 10, 10, 10]}
              >
                <LabelList dataKey="visitors" content={<CustomizedLabel />} />
              </Bar>
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
        'mt-2 flex flex-wrap items-start gap-3 lg:gap-5',
        className
      )}
    >
      {appointmentLegend.map((item, index) => (
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

function CustomizedLabel(props: any) {
  const { x, y, width, height, value } = props;
  const radius = 8;

  return (
    <g>
      <rect
        x={x + 3}
        y={y + 3}
        width={width - 6}
        height={20}
        rx={radius}
        fill="#ffffff"
      />
      <text
        x={x + width / 2}
        y={y + 14}
        fill="currentColor"
        className="text-xs font-medium text-gray-800 dark:text-gray-200"
        textAnchor="middle"
        dominantBaseline="middle"
      >
        {formatNumber(value)}
      </text>
    </g>
  );
}
