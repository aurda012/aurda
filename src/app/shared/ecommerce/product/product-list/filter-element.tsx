'use client';

import React from 'react';
import { PiTrashDuotone } from 'react-icons/pi';
import StatusField from '@/components/controlled-table/status-field';
import { Button, Badge, Text } from 'rizzui';
import DateFiled from '@/components/controlled-table/date-field';
import PriceField from '@/components/controlled-table/price-field';
import { getDateRangeStateValues } from '@/utils/get-formatted-date';

const statusOptions = [
  {
    value: 'publish',
    label: 'Publish',
  },
  {
    value: 'pending',
    label: 'Pending',
  },
  {
    value: 'draft',
    label: 'Draft',
  },
];

type FilterElementProps = {
  isFiltered: boolean;
  filters: { [key: string]: any };
  updateFilter: (columnId: string, filterValue: string | any[]) => void;
  handleReset: () => void;
};

export default function FilterElement({
  isFiltered,
  filters,
  updateFilter,
  handleReset,
}: FilterElementProps) {
  return (
    <>
      <PriceField
        value={filters['price']}
        onChange={(data) => updateFilter('price', data)}
      />
      <DateFiled
        selected={getDateRangeStateValues(filters['createdAt'][0])}
        startDate={getDateRangeStateValues(filters['createdAt'][0])}
        endDate={getDateRangeStateValues(filters['createdAt'][1])}
        onChange={(date: any) => {
          updateFilter('createdAt', date);
        }}
        className="w-full"
        placeholderText="Select created date"
        inputProps={{
          label: 'Created Date',
          labelClassName: 'font-medium text-gray-700',
        }}
      />
      <StatusField
        label="Status"
        options={statusOptions}
        value={filters['status']}
        onChange={(value: string) => {
          updateFilter('status', value);
        }}
        getOptionValue={(option: { value: any }) => option.value}
        getOptionDisplayValue={(option: { value: any }) =>
          renderOptionDisplayValue(option.value as string)
        }
        displayValue={(selected: string) => renderOptionDisplayValue(selected)}
      />
      {isFiltered ? (
        <Button
          size="sm"
          onClick={() => {
            handleReset();
          }}
          className="h-8 bg-gray-200/70"
          variant="flat"
        >
          <PiTrashDuotone className="me-1.5 h-[17px] w-[17px]" /> Clear
        </Button>
      ) : null}
    </>
  );
}

function renderOptionDisplayValue(value: string) {
  switch (value.toLowerCase()) {
    case 'pending':
      return (
        <div className="flex items-center">
          <Badge color="warning" renderAsDot />
          <Text className="ms-2 font-medium capitalize text-orange-dark">
            {value}
          </Text>
        </div>
      );
    case 'publish':
      return (
        <div className="flex items-center">
          <Badge color="success" renderAsDot />
          <Text className="ms-2 font-medium capitalize text-green-dark">
            {value}
          </Text>
        </div>
      );

    default:
      return (
        <div className="flex items-center">
          <Badge renderAsDot className="bg-gray-400" />
          <Text className="ms-2 font-medium capitalize text-gray-600">
            {value}
          </Text>
        </div>
      );
  }
}
