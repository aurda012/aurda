'use client';

import { useState } from 'react';
import WidgetCard from '@/components/cards/widget-card';
import { CustomTooltip } from '@/components/charts/custom-tooltip';
import { CustomYAxisTick } from '@/components/charts/custom-yaxis-tick';
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
import { Title, Text } from 'rizzui';
import cn from '@/utils/class-names';
import TrendingUpIcon from '@/components/icons/trending-up';
import { formatNumber } from '@/utils/format-number';

const dailyData = [
  {
    label: 'Sat',
    activeJobs: 9800,
    onHold: 8000,
    shortlisted: 1800,
  },
  {
    label: 'Sun',
    activeJobs: 8700,
    onHold: 4900,
    shortlisted: 1600,
  },
  {
    label: 'Mon',
    activeJobs: 5000,
    onHold: 8600,
    shortlisted: 3200,
  },
  {
    label: 'Tue',
    activeJobs: 4500,
    onHold: 6800,
    shortlisted: 1200,
  },
  {
    label: 'Wed',
    activeJobs: 2500,
    onHold: 3800,
    shortlisted: 1000,
  },
  {
    label: 'Thu',
    activeJobs: 8000,
    onHold: 5900,
    shortlisted: 1200,
  },
  {
    label: 'Fri',
    activeJobs: 8700,
    onHold: 4800,
    shortlisted: 1600,
  },
];

const monthlyData = [
  {
    label: 'Jan',
    activeJobs: 5650,
    onHold: 4540,
    shortlisted: 3200,
  },
  {
    label: 'Feb',
    activeJobs: 1890,
    onHold: 5510,
    shortlisted: 680,
  },
  {
    label: 'Mar',
    activeJobs: 4300,
    onHold: 3000,
    shortlisted: 1500,
  },
  {
    label: 'Apr',
    activeJobs: 5710,
    onHold: 5830,
    shortlisted: 2300,
  },
  {
    label: 'May',
    activeJobs: 5710,
    onHold: 5830,
    shortlisted: 2300,
  },
  {
    label: 'Jun',
    activeJobs: 5710,
    onHold: 5830,
    shortlisted: 2300,
  },
];

const ticketStatus = [
  { name: 'Active Job' },
  { name: 'On Hold' },
  { name: 'Shortlisted' },
];

const COLORS = ['#3962F7', '#2750AF', '#BBD6FF'];

const viewOptions = [
  {
    label: 'Weekly',
    value: 'week',
  },
  {
    label: 'Monthly',
    value: 'month',
  },
];

export default function JobOverview({ className }: { className?: string }) {
  const [data, setData] = useState(dailyData);
  const isTab = useMedia('(max-width: 768px)', false);

  function handleChange(viewType: string) {
    if (viewType === 'month') {
      setData(monthlyData);
    } else {
      setData(dailyData);
    }
  }

  return (
    <WidgetCard
      title="Job Overview"
      className={cn('min-h-[28rem]', className)}
      titleClassName="font-normal text-sm sm:text-sm text-gray-500 mb-2.5 font-inter"
      action={
        <div className="flex items-center gap-5">
          <Legend className="hidden @2xl:flex" />
          <DropdownAction
            className="rounded-md border"
            options={viewOptions}
            onChange={handleChange}
            dropdownClassName="!z-0"
          />
        </div>
      }
    >
      <div className="flex items-center justify-start">
        <Title as="h2" className="me-2 text-2xl">
          80,345
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
      <Legend className="my-4 flex @md:justify-end @2xl:hidden" />
      <SimpleBar>
        <div className="h-[20rem] w-full pt-6 @lg:pt-8 lg:h-[24rem] 3xl:h-[25rem]">
          <ResponsiveContainer
            width="100%"
            height="100%"
            {...(isTab && { minWidth: '1100px' })}
          >
            <ComposedChart
              data={data}
              margin={{
                left: -6,
              }}
              className="[&_.recharts-tooltip-cursor]:fill-opacity-20 dark:[&_.recharts-tooltip-cursor]:fill-opacity-10 [&_.recharts-cartesian-axis-tick-value]:fill-gray-500 [&_.recharts-cartesian-axis.yAxis]:-translate-y-3 rtl:[&_.recharts-cartesian-axis.yAxis]:-translate-x-12"
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
                tick={({ payload, ...rest }) => {
                  const pl = {
                    ...payload,
                    value: formatNumber(Number(payload.value)),
                  };
                  return (
                    <CustomYAxisTick prefix={'$'} payload={pl} {...rest} />
                  );
                }}
              />
              <Tooltip content={<CustomTooltip formattedNumber />} />

              <defs>
                <linearGradient
                  id="activeJobs"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="100%"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0" stopColor="#3962F7" />
                  <stop offset="0.8" stopColor="#3962F7" />
                  <stop offset="1" stopColor="#3962F7" />
                </linearGradient>
              </defs>

              <defs>
                <linearGradient
                  id="onHold"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="100%"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0" stopColor="#2750AF" />
                  <stop offset="0.8" stopColor="#2750AF" />
                  <stop offset="1" stopColor="#2750AF" />
                </linearGradient>
              </defs>

              <defs>
                <linearGradient
                  id="shortlisted"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="100%"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0" stopColor="#BBD6FF" />
                  <stop offset="0.8" stopColor="#BBD6FF" />
                  <stop offset="1" stopColor="#BBD6FF" />
                </linearGradient>
              </defs>

              <Bar
                dataKey="activeJobs"
                fill="url(#activeJobs)"
                stroke={COLORS[0]}
                barSize={28}
                radius={[4, 4, 0, 0]}
              />
              <Bar
                type="natural"
                dataKey="onHold"
                fill="url(#onHold)"
                stroke={COLORS[1]}
                barSize={28}
                radius={[4, 4, 0, 0]}
              />
              <Bar
                type="natural"
                dataKey="shortlisted"
                fill="url(#shortlisted)"
                stroke={COLORS[2]}
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

function Legend({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'flex flex-wrap items-start gap-3 text-xs @3xl:text-sm lg:gap-4',
        className
      )}
    >
      {ticketStatus.map((item, index) => (
        <div key={item.name} className="flex items-center gap-1.5">
          <span
            className="h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: COLORS[index] }}
          />
          <span>{item.name}</span>
        </div>
      ))}
    </div>
  );
}
