'use client';

import { useState } from 'react';
import { DatePicker } from '@/components/ui/datepicker';
import WidgetCard from '@/components/cards/widget-card';
import { motion } from 'framer-motion';
import {
  CircleTextType,
  CustomCircleChartDataType,
  NthType,
  COLORS,
  getCircleStyles,
} from '@/app/shared/financial/dashboard/investment/investment-utils';
import { useDirection } from '@/hooks/use-direction';
import { Title } from 'rizzui';
import cn from '@/utils/class-names';

type InvestmentProps = {
  className?: string;
};

function calculatePercentage(total: number, value: number) {
  return (value / total) * 100;
}

type CustomCircleProps = {
  className?: string;
  percentage: number;
  value: number;
  circleTextType?: CircleTextType;
  dataLen: number;
  nth: NthType;
};

function CustomCircle({
  nth,
  className,
  percentage,
  value,
  dataLen,
  circleTextType = 'percentage',
}: CustomCircleProps) {
  const { direction } = useDirection();
  const zIndex = nth + 2;
  const styles = getCircleStyles(nth, dataLen, direction);
  const minHeight = 48;
  const height = (130 / 100) * percentage;

  const circleText =
    circleTextType === 'percentage'
      ? `${percentage.toFixed(0)}%`
      : `${value.toFixed(0)}`;

  return (
    <div
      style={{
        minHeight,
        zIndex,
        maxHeight: '100%',
        height: `${height}%`,
        ...styles,
      }}
      className={cn(
        'absolute bottom-full flex aspect-square items-center justify-center rounded-full border-4 border-gray-50 font-bold text-gray-0 duration-1000 dark:border-gray-100 dark:text-white',
        className
      )}
    >
      {circleText}
    </div>
  );
}

type CustomCircleChartProps = {
  data: CustomCircleChartDataType;
  circleTextType?: CircleTextType;
};

// we are not using this for now. will take care about it later.
function CustomCircleChart({ data, circleTextType }: CustomCircleChartProps) {
  const total = data.reduce((acc, curr) => acc + curr.value, 0);
  const sortedData = data.sort((a, b) => b.value - a.value);
  const colors = Object.values(COLORS);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        exit={{ opacity: 0, scale: 0.5 }}
        key={total}
        className="relative mx-auto mb-8 mt-16 aspect-[280/224] w-full max-w-[350px] overflow-hidden"
      >
        {sortedData.map((item, i) => (
          <CustomCircle
            key={item.label}
            circleTextType={circleTextType}
            value={item.value}
            percentage={calculatePercentage(total, item.value)}
            dataLen={sortedData.length}
            nth={(i + 1) as NthType}
          />
        ))}
      </motion.div>
      <div className="flex flex-col flex-wrap justify-center gap-2 text-sm text-gray-500 @[24rem]:mx-auto @[24rem]:flex-row @[24rem]:gap-x-6 @[24rem]:gap-y-3">
        {sortedData.map((item, i) => (
          <div className="flex items-center gap-1" key={item.label + i}>
            <span
              style={{ backgroundColor: colors[i] }}
              className="-mb-[2px] h-3 w-3 rounded-full"
            />
            {item.label}
          </div>
        ))}
      </div>
    </>
  );
}

const data: CustomCircleChartDataType[] = [
  [
    {
      value: 6500,
      label: 'Stock Market',
    },
  ],
  [
    {
      value: 1000,
      label: 'Stock Market',
    },
    {
      value: 4000,
      label: 'Office Management',
    },
  ],
  [
    {
      value: 7000,
      label: 'Stock Market',
    },
    {
      value: 5000,
      label: 'Office Management',
    },
    {
      value: 6500,
      label: 'ERP Project',
    },
  ],
  [
    {
      value: 3200,
      label: 'Stock Market',
    },
    {
      value: 6500,
      label: 'Office Management',
    },
    {
      value: 1500,
      label: 'ERP Project',
    },
    {
      value: 6500,
      label: 'HRM Project',
    },
  ],
  [
    {
      value: 3200,
      label: 'Stock Market',
    },
    {
      value: 6500,
      label: 'Office Management',
    },
    {
      value: 1500,
      label: 'ERP Project',
    },
    {
      value: 6500,
      label: 'HRM Project',
    },
    {
      value: 2000,
      label: 'CRM Project',
    },
  ],
];

export default function Investment({ className }: InvestmentProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [chartData, setChartData] = useState<CustomCircleChartDataType>(
    data[2]
  );

  const total = (
    chartData.reduce((acc, curr) => acc + curr.value, 0) / 1000
  ).toFixed(2);

  function handleChange(date: Date) {
    console.log('date', date);
    setStartDate(date);
    if (activeIndex == 4) {
      setActiveIndex(0);
      setChartData(data[activeIndex]);
    } else {
      setChartData(data[activeIndex]);
      setActiveIndex((prev) => prev + 1);
    }
  }

  return (
    <WidgetCard
      title="Investment"
      titleClassName="text-gray-700 font-normal sm:text-sm font-inter"
      headerClassName="items-center"
      className={cn(
        'flex h-full w-full flex-col justify-between @container',
        className
      )}
      action={
        <DatePicker
          selected={startDate}
          onChange={(date: Date) => handleChange(date)}
          dateFormat="MMM, yyyy"
          placeholderText="Select Month"
          showMonthYearPicker
          popperPlacement="bottom-end"
          inputProps={{
            variant: 'text',
            inputClassName: 'p-0 px-1 h-auto [&_input]:text-ellipsis',
          }}
          className="w-40 rounded border [&_.rizzui-input-container]:px-3 [&_.rizzui-input-container]:py-1.5 "
        />
      }
    >
      <div className="flex h-full w-full flex-col justify-between">
        <div className="mb-4 mt-1 flex items-center gap-2">
          <Title as="h2" className="font-semibold">
            ${total}k
          </Title>
        </div>
        <div className="flex w-full flex-col justify-between">
          {/* <CustomCircleChart data={chartData} /> */}
          <CustomCircleChartStatic />
        </div>
      </div>
    </WidgetCard>
  );
}

function CustomCircleChartStatic() {
  return (
    <div>
      <div className="relative mx-auto mb-16 mt-8 aspect-[310/232] w-full max-w-[310px] rounded-lg ">
        <div className="absolute bottom-0 left-0 flex aspect-square w-[64%] items-center justify-center rounded-full border-4 border-gray-0 bg-[#4A3AFF] text-4xl font-bold text-gray-0 dark:text-gray-900">
          70%
        </div>
        <div className="absolute right-0 top-0 flex aspect-square w-[48%] items-center justify-center rounded-full border-4 border-gray-0 bg-[#C893FD] text-3xl font-bold text-gray-0 dark:text-gray-900">
          20%
        </div>
        <div className="absolute bottom-[5%] right-[14%] flex aspect-square w-[35%] items-center justify-center rounded-full border-4 border-gray-0 bg-[#1E1B39] text-2xl font-bold text-gray-0 dark:bg-gray-400 dark:text-gray-900">
          10%
        </div>
      </div>
      <div className="flex flex-col flex-wrap justify-center gap-2 text-sm text-gray-500 @[24rem]:mx-auto @[24rem]:flex-row @[24rem]:gap-x-6 @[24rem]:gap-y-3 dark:text-gray-900">
        <div className="flex items-center gap-1">
          <span className="h-3 w-3 rounded-full bg-[#4A3AFF]" />
          Real State
        </div>
        <div className="flex items-center gap-1">
          <span className="h-3 w-3 rounded-full bg-[#C893FD]" />
          Stock Market
        </div>
        <div className="flex items-center gap-1">
          <span className="h-3 w-3 rounded-full bg-[#1E1B39] dark:bg-gray-500" />
          Fintech
        </div>
      </div>
    </div>
  );
}
