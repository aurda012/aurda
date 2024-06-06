'use client';

import WidgetCard from '@/components/cards/widget-card';
import { Tooltip } from 'rizzui';
import cn from '@/utils/class-names';

function calculatePercentage(total: number, value: number) {
  const percentage = (value / total) * 100;
  return percentage.toFixed(2);
}

const rulerSteps = [
  '00',
  '1K',
  '2K',
  '3K',
  '4K',
  '5K',
  '6K',
  '7K',
  '8K',
  '9K',
  '10K',
];

function Ruler({ total, value }: { total: number; value: number }) {
  const percentage = calculatePercentage(total, value);
  return (
    <div>
      <div className="relative flex h-10  flex-col justify-end overflow-hidden rounded-[10px] bg-gray-100">
        <div
          className="absolute bottom-0 left-0 top-0 z-10 h-full bg-[#1477EB]"
          style={{ width: `${percentage}%` }}
        />
        <div className="relative z-20 mt-auto flex w-full items-end justify-between [&>:nth-child(10n+1)]:!h-4">
          {Array.from({ length: 101 }).map((_, index) => (
            <span
              key={index}
              className="h-2.5 w-[1px] bg-gray-900 dark:bg-gray-300"
            />
          ))}
        </div>
      </div>
      <div className="mt-1.5 flex justify-between">
        {rulerSteps.map((item, index) => (
          <div
            key={index}
            className="flex w-[1px] justify-center first-of-type:justify-start last-of-type:justify-end"
          >
            <span className="text-xs text-gray-500">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Slider({
  title,
  total,
  value,
}: {
  title: string;
  total: number;
  value: number;
}) {
  const percentage = calculatePercentage(total, value);
  return (
    <div className="group">
      <div className="mb-2.5 flex items-center justify-between">
        <p className="font-medium text-gray-900">{title}</p>
        <div className="flex items-center">
          <span className="font-medium text-gray-900">${value}</span> &nbsp;
          <span>/${total}</span>
        </div>
      </div>
      <div className="relative h-2.5 w-full rounded-lg bg-gray-100">
        <div
          style={{ width: `${percentage}%` }}
          className="h-full rounded-lg bg-[#1477EB]"
        />
        <div className="absolute left-0 top-1/2 flex h-0 w-full -translate-y-1/2 items-center bg-black/50">
          <div className="max-auto relative w-full">
            <Tooltip
              className="dark:bg-gray-200 dark:text-gray-900"
              placement="top"
              content={<span>{percentage}%</span>}
            >
              <span
                style={{ left: `${percentage}%` }}
                className="absolute top-1/2 block h-5 w-5 -translate-x-1/2 -translate-y-1/2 scale-75 cursor-pointer rounded-full border-[5.5px] border-gray-0  bg-[#1477EB] opacity-0 shadow-md duration-100 group-hover:scale-100 group-hover:opacity-100 dark:border-muted"
              />
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BudgetStatus({ className }: { className?: string }) {
  return (
    <WidgetCard
      title="Budget Status"
      headerClassName="flex @[30rem]:flex-row flex-col"
      actionClassName="ps-0 mb-4 @[30rem]:mb-4"
      titleClassName="text-gray-700 font-normal sm:text-sm font-inter mt-1 mb-2.5 @[30rem]:mb-7"
      className={cn('', className)}
      action={
        <div className="flex items-center gap-1 @[30rem]:gap-2">
          <span className="text-lg font-semibold text-gray-900 @[30rem]:text-xl">
            $7,590
          </span>
          <span className="text-gray-500">out of</span>
          <span className="text-lg font-semibold text-gray-900 @[30rem]:text-xl">
            $10,000
          </span>
        </div>
      }
    >
      <Ruler total={10000} value={7590} />
      <div className="mt-12 space-y-7">
        <Slider title="Desler Inc & Co." total={350} value={108.9} />
        <Slider title="Matro Private Ltd." total={580} value={413.5} />
        <Slider title="Hanry & Brothers" total={350} value={108.9} />
        <Slider title="Ammey Beauty Parler" total={1250} value={893.7} />
      </div>
    </WidgetCard>
  );
}
