'use client';

import { Button } from 'rizzui';
import cn from '@/utils/class-names';
import { useScrollableSlider } from '@/hooks/use-scrollable-slider';
import {
  PiBank,
  PiCaretLeftBold,
  PiCaretRightBold,
  PiCube,
  PiCurrencyCircleDollar,
  PiFolder,
} from 'react-icons/pi';
import TransactionCard, {
  TransactionType,
} from '@/components/cards/transaction-card';

type FileStatsType = {
  className?: string;
};

const statData: TransactionType[] = [
  {
    title: 'Total Income',
    amount: '$16,085k',
    increased: true,
    percentage: '32.45',
    icon: PiBank,
    iconWrapperFill: '#8A63D2',
  },
  {
    title: 'Total Orders',
    amount: '$25,786k',
    increased: false,
    percentage: '32.45',
    icon: PiCube,
    iconWrapperFill: '#00CEC9',
  },
  {
    title: 'Net Profit',
    amount: '$38,503k',
    increased: true,
    percentage: '32.45',
    icon: PiCurrencyCircleDollar,
    iconWrapperFill: '#0070F3',
  },
  {
    title: 'Total Expense',
    amount: '$27,432k',
    increased: false,
    percentage: '32.45',
    icon: PiFolder,
    iconWrapperFill: '#F5A623',
  },
];

export function StatGrid() {
  return (
    <>
      {statData.map((stat: any, index: number) => {
        return (
          <TransactionCard
            key={'transaction-card-' + index}
            transaction={stat}
            className="min-w-[300px]"
          />
        );
      })}
    </>
  );
}

export default function FileStats({ className }: FileStatsType) {
  const {
    sliderEl,
    sliderPrevBtn,
    sliderNextBtn,
    scrollToTheRight,
    scrollToTheLeft,
  } = useScrollableSlider();

  return (
    <div
      className={cn(
        'relative flex w-auto items-center overflow-hidden',
        className
      )}
    >
      <Button
        title="Prev"
        variant="text"
        ref={sliderPrevBtn}
        onClick={() => scrollToTheLeft()}
        className="!absolute -left-1 top-0 z-10 !h-full w-20 !justify-start rounded-none bg-gradient-to-r from-gray-0 via-gray-0/70 to-transparent px-0 ps-1 text-gray-500 hover:text-gray-900 dark:from-gray-50 dark:via-gray-50/70 3xl:hidden"
      >
        <PiCaretLeftBold className="h-5 w-5" />
      </Button>
      <div className="w-full overflow-hidden">
        <div
          ref={sliderEl}
          className="custom-scrollbar-x grid grid-flow-col gap-5 overflow-x-auto scroll-smooth 2xl:gap-6 "
        >
          <StatGrid />
        </div>
      </div>
      <Button
        title="Next"
        variant="text"
        ref={sliderNextBtn}
        onClick={() => scrollToTheRight()}
        className="dark: !absolute -right-2 top-0 z-10 !h-full w-20 !justify-end rounded-none bg-gradient-to-l from-gray-0 via-gray-0/70 to-transparent px-0 pe-2 text-gray-500 hover:text-gray-900 dark:from-gray-50 dark:via-gray-50/70 3xl:hidden "
      >
        <PiCaretRightBold className="h-5 w-5" />
      </Button>
    </div>
  );
}
