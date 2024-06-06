'use client';

import { Dispatch, SetStateAction, useState } from 'react';
import {
  PiCaretDown,
  PiChartLineUpLight,
  PiCurrencyDollarBold,
  PiCurrencyEurBold,
  PiCurrencyJpyBold,
  PiWalletLight,
} from 'react-icons/pi';
import { Input, Button, Popover, Title, Text } from 'rizzui';
import cn from '@/utils/class-names';
import ExchangeIcon from '@/components/icons/exchange';
import WidgetCard from '@/components/cards/widget-card';

type Currency = {
  id: number;
  name: string;
  icon: React.ReactNode;
};

const currencies: Currency[] = [
  {
    id: 1,
    name: 'USD',
    icon: (
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange text-white">
        <PiCurrencyDollarBold className="h-auto w-[18px]" />
      </span>
    ),
  },
  {
    id: 2,
    name: 'YEN',
    icon: (
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#FF7272] text-white">
        <PiCurrencyJpyBold className="h-auto w-[18px]" />
      </span>
    ),
  },
  {
    id: 3,
    name: 'EURO',
    icon: (
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#a658ff] text-white">
        <PiCurrencyEurBold className="h-auto w-[18px]" />
      </span>
    ),
  },
];

function ExchangeInput({
  className,
  onSelect,
  selected,
}: {
  className?: string;
  selected: Currency;
  onSelect: Dispatch<SetStateAction<Currency>>;
}) {
  function handleSelect(currency: Currency) {
    onSelect(currency);
  }

  return (
    <div className={className}>
      <Input
        rounded="lg"
        className="[&_.rizzui-input-container]:h-16 [&_.rizzui-input-container]:bg-gray-50 [&_.rizzui-input-container]:px-2 [&_.rizzui-input-container]:py-2 [&_.rizzui-input-container]:pe-7 [&_.rizzui-input-field]:text-right"
        size="xl"
        type="number"
        prefix={
          <Popover placement="bottom-start" showArrow={false}>
            <Popover.Trigger>
              <button className="flex items-center justify-center gap-3 rounded-lg bg-background p-1.5 pe-3 shadow dark:bg-gray-100/80 dark:backdrop-blur-lg">
                {selected.icon}
                <span className="font-semibold text-gray-900">
                  {selected.name}
                </span>
                <PiCaretDown />
              </button>
            </Popover.Trigger>
            <Popover.Content className="flex items-center gap-2 rounded-md px-2 py-2">
              {({ setOpen }) => (
                <div>
                  {currencies.map((currency) => (
                    <div
                      key={currency.id}
                      className={cn(
                        'flex cursor-pointer items-center gap-3 rounded-md p-1.5 pe-3 duration-200 ',
                        currency === selected
                          ? 'bg-gray-100 dark:bg-gray-50/70'
                          : 'hover:bg-gray-50 dark:hover:bg-gray-100'
                      )}
                      onClick={() => {
                        setOpen(false);
                        handleSelect(currency);
                      }}
                    >
                      {currency.icon}
                      <span className="font-semibold text-gray-900">
                        {currency.name}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </Popover.Content>
          </Popover>
        }
      />
    </div>
  );
}

export default function Exchange({ className }: { className?: string }) {
  const [currencyFrom, setCurrencyFrom] = useState(currencies[0]);
  const [currencyTo, setCurrencyTo] = useState(currencies[1]);
  return (
    <WidgetCard
      title="Exchange"
      titleClassName="text-gray-700 font-bold text-2xl sm:text-2xl font-inter mb-5"
      className={cn('flex h-full w-full flex-col justify-between', className)}
    >
      <div className="flex h-full w-full flex-col justify-between gap-5">
        <p>
          Seamless currency swap: precise rates, instant transactions.
          Experience the future in just 30 words.
        </p>
        <div className="mb-6 mt-4 flex flex-wrap items-start gap-5">
          <div className="flex items-start">
            <div className="me-3 rounded bg-[#F0EBF9] p-2 text-[#8A63D2] dark:bg-[#8A63D2]/20">
              <PiChartLineUpLight className="h-6 w-6" />
            </div>
            <div>
              <Title
                as="h6"
                className="font-lexend font-semibold text-gray-900"
              >
                23.74%
              </Title>
              <Text className="text-gray-500">Exchange Rate</Text>
            </div>
          </div>
          <div className="flex items-start">
            <div className="me-3 rounded bg-[#F0EBF9] p-2 text-[#8A63D2] dark:bg-[#8A63D2]/20">
              <PiWalletLight className="h-6 w-6" />
            </div>
            <div>
              <Title
                as="h6"
                className="font-lexend font-semibold text-gray-900"
              >
                $1,906k
              </Title>
              <Text className="text-gray-500">Current Balance</Text>
            </div>
          </div>
        </div>
        <div className="w-full">
          <ExchangeInput selected={currencyFrom} onSelect={setCurrencyFrom} />
          <div className="relative z-10 -mt-2.5 flex justify-center">
            <div className="inline-flex items-center justify-center rounded-full bg-gray-0 p-3 text-gray-500 shadow">
              <ExchangeIcon className="h-auto w-4 rotate-90" />
            </div>
          </div>
          <ExchangeInput
            selected={currencyTo}
            onSelect={setCurrencyTo}
            className="relative z-0 -mt-2.5"
          />
          <p className="mb-10 mt-3.5 text-right text-[13px] italic text-gray-500">
            Last price updated at 24 July 2023 09:48 PM
          </p>
          <Button size="xl" className="w-full">
            Send Money
          </Button>
        </div>
      </div>
    </WidgetCard>
  );
}
