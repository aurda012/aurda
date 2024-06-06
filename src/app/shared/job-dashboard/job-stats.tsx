'use client';

import CountUp from 'react-countup';
import cn from '@/utils/class-names';
import { IconType } from 'react-icons/lib';
import {
  PiCheckCircle,
  PiPauseCircle,
  PiArrowUpRightBold,
  PiArrowDownRightBold,
  PiDownloadSimple,
  PiClock,
} from 'react-icons/pi';
import SimpleBar from 'simplebar-react';

type JobStatsType = {
  className?: string;
};

const statData: StatType[] = [
  {
    title: 'Active Jobs',
    amount: 15786,
    increased: true,
    percentage: '32.40',
    icon: PiCheckCircle,
  },
  {
    title: 'Published Jobs',
    amount: 20129,
    increased: true,
    percentage: '40.29',
    icon: PiDownloadSimple,
  },
  {
    title: 'Shortlisted',
    amount: 8503,
    increased: false,
    percentage: '32.40',
    icon: PiClock,
  },
  {
    title: 'On Hold',
    amount: 2430,
    increased: true,
    percentage: '32.40',
    icon: PiPauseCircle,
  },
];

export type StatType = {
  icon: IconType;
  title: string;
  amount: number;
  increased: boolean;
  percentage: string;
  iconWrapperFill?: string;
  className?: string;
};

export type StatCardProps = {
  className?: string;
  transaction: StatType;
};

function StatCard({ className, transaction }: StatCardProps) {
  const { icon, title, amount, increased, percentage, iconWrapperFill } =
    transaction;
  const Icon = icon;
  return (
    <div
      className={cn('w-full rounded-lg border border-gray-300 p-5', className)}
    >
      <div className="mb-4 flex items-start gap-5">
        <span className="flex rounded-lg bg-[#E2EEFF] p-3 text-[#3962F7] dark:bg-[#75A1E3]/10 dark:text-[#3b66ec] ">
          <Icon className="h-auto w-[28px]" strokeWidth={4} />
        </span>
        <div>
          <p className="font-medium text-gray-500">{title}</p>
          <p className="text-[22px] font-bold text-gray-900 dark:text-gray-700 2xl:text-[20px] 3xl:text-3xl">
            <CountUp end={amount} duration={5} />
          </p>
        </div>
      </div>
      <div className="flex items-center gap-1.5">
        <div
          className={cn(
            'flex items-center gap-1 ',
            increased ? 'text-green-dark ' : 'text-red-dark'
          )}
        >
          <span
            className={cn(
              'flex rounded-full  px-2.5 py-1.5',
              increased
                ? 'bg-green-lighter/70 dark:bg-green-dark/30'
                : 'bg-red-lighter/70 dark:bg-red-dark/30'
            )}
          >
            {increased ? (
              <PiArrowUpRightBold className="h-auto w-4" />
            ) : (
              <PiArrowDownRightBold className="h-auto w-4" />
            )}
          </span>
          <span className="font-semibold leading-none">
            {increased ? '+' : '-'}
            {percentage}%
          </span>
        </div>
        <span className="truncate leading-none text-gray-500">
          {increased ? 'Increased' : 'Decreased'}&nbsp;last month
        </span>
      </div>
    </div>
  );
}

export default function JobStats({ className }: JobStatsType) {
  return (
    <div className={className}>
      <SimpleBar>
        <div className="flex items-start gap-6">
          {statData.map((stat: StatType, index: number) => {
            return (
              <StatCard
                key={'stat-card-' + index}
                transaction={stat}
                className="w-full"
              />
            );
          })}
        </div>
      </SimpleBar>
    </div>
  );
}
