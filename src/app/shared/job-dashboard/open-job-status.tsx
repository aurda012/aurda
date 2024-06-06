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
    jobViewed: 980,
    jobApplied: 800,
  },
  {
    label: 'Sun',
    jobViewed: 870,
    jobApplied: 490,
  },
  {
    label: 'Mon',
    jobViewed: 500,
    jobApplied: 860,
  },
  {
    label: 'Tue',
    jobViewed: 450,
    jobApplied: 680,
  },
  {
    label: 'Wed',
    jobViewed: 250,
    jobApplied: 380,
  },
  {
    label: 'Thu',
    jobViewed: 800,
    jobApplied: 590,
  },
  {
    label: 'Fri',
    jobViewed: 870,
    jobApplied: 480,
  },
];

const monthlyData = [
  {
    label: 'Jan',
    jobViewed: 56500,
    jobApplied: 45400,
  },
  {
    label: 'Feb',
    jobViewed: 18900,
    jobApplied: 55100,
  },
  {
    label: 'Mar',
    jobViewed: 43000,
    jobApplied: 30000,
  },
  {
    label: 'Apr',
    jobViewed: 57100,
    jobApplied: 58300,
  },
  {
    label: 'May',
    jobViewed: 37100,
    jobApplied: 38300,
  },
  {
    label: 'Jun',
    jobViewed: 27100,
    jobApplied: 28300,
  },
];

const ticketStatus = [{ name: 'Job Viewed' }, { name: 'Job Applied' }];

const COLORS = ['#3962F7', '#BBD6FF'];

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

export default function OpenJobOverview({ className }: { className?: string }) {
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
      title="Open Job Stats"
      className={cn('min-h-[28rem] @container', className)}
      titleClassName="font-normal text-sm sm:text-sm text-gray-500 mb-2.5 font-inter"
      action={
        <div className="flex items-center gap-5">
          <Legend className="hidden @xl:flex" />
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
          750.45k
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
      <Legend className="my-4 flex @sm:justify-end @xl:hidden" />
      <SimpleBar>
        <div className="h-[20rem] w-full pt-6 @lg:pt-8 lg:h-[24rem] 3xl:h-[25rem]">
          <ResponsiveContainer
            width="100%"
            height="100%"
            {...(isTab && { minWidth: '700px' })}
          >
            <ComposedChart
              data={data}
              margin={{
                left: -15,
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
                  id="jobViewed"
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
                  id="jobApplied"
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
                dataKey="jobViewed"
                fill="url(#jobViewed)"
                stroke={COLORS[0]}
                barSize={28}
                radius={[4, 4, 0, 0]}
              />
              <Bar
                type="natural"
                dataKey="jobApplied"
                fill="url(#jobApplied)"
                stroke={COLORS[1]}
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
