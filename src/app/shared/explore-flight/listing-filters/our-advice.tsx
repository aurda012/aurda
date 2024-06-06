'use client';

import { BiTrendingUp } from 'react-icons/bi';
import { BsExclamationCircle } from 'react-icons/bs';
import { Tooltip, Button, Switch, Text, Title } from 'rizzui';

function OurAdvice({ reset }: { reset: () => void }) {
  return (
    <div className="pb-5">
      <div className="rounded-lg border border-muted">
        <div className="p-4">
          <div className="flex items-center justify-between pb-1 text-xs font-semibold text-gray-900">
            <span>Our Advice</span>
            <BiTrendingUp className="h-4 w-4" />
          </div>
          <Title as="h6" className="pb-2 text-primary">
            Buy Now
          </Title>
          <div className="flex items-end gap-1">
            <Text className="w-[156px]">
              Prices are unlikely to decrease within 7 days
            </Text>
            <Tooltip
              content={
                <p className='className="max-w-[100px] xs:max-w-[160px]'>
                  Best prices for the next week based on current and past
                  analyses, but like weather forecasts, 100% certainty
                  isn&apos;t guaranteed in our advisory.
                </p>
              }
              placement="right"
            >
              <Button variant="text" className="mb-1 h-4 p-0">
                <BsExclamationCircle className="h-4 w-4" />
              </Button>
            </Tooltip>
          </div>
        </div>
        <div className="flex items-center justify-between border-t border-muted p-4">
          <Text as="span" className="text-sm font-semibold">
            Track Prices
          </Text>
          <Switch label="Off" />
        </div>
      </div>
      <div className="pt-4 text-sm text-gray-900">
        969 of{' '}
        <span
          className="cursor-pointer font-semibold text-primary"
          onClick={() => reset()}
        >
          1202 flights
        </span>
      </div>
    </div>
  );
}

export default OurAdvice;
