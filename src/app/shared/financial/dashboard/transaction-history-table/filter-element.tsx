'use client';
import StatusField from '@/components/controlled-table/status-field';
import { Badge, Text, Button } from 'rizzui';
import { transactionTypes } from '@/data/transaction-history';
import { PiTrashDuotone } from 'react-icons/pi';

const transactionTypesOptions = Object.entries(transactionTypes).map(
  ([value, label]) => ({ label, value })
);

const statusOptions = [
  {
    value: 'complete',
    label: 'Complete',
  },
  {
    value: 'pending',
    label: 'Pending',
  },
  {
    value: 'canceled',
    label: 'Canceled',
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
    <div className="flex w-full flex-col items-center gap-3 @[29rem]:flex-row @[42rem]:w-auto @[57rem]:-ms-4">
      <div className="flex w-full flex-col gap-3  @[22rem]:flex-row @[42rem]:w-auto">
        <StatusField
          dropdownClassName="!z-10"
          className="w-full min-w-[158px] @[42rem]:w-auto"
          placeholder="Select type"
          options={transactionTypesOptions}
          value={filters['type']}
          onChange={(value: string) => {
            updateFilter('type', value);
          }}
          getOptionValue={(option: { value: any }) => option.value}
          displayValue={(selected: string) =>
            transactionTypesOptions.find((option) => option.label === selected)
              ?.label ?? ''
          }
          placement="bottom-start"
        />
        <StatusField
          dropdownClassName="!z-10"
          className="w-full min-w-[145px] @[42rem]:w-auto"
          options={statusOptions}
          value={filters['status']}
          onChange={(value: string) => {
            updateFilter('status', value);
          }}
          getOptionValue={(option: { value: any }) => option.value}
          getOptionDisplayValue={(option: { value: any }) =>
            renderOptionDisplayValue(option.value as string)
          }
          displayValue={(selected: string) =>
            renderOptionDisplayValue(selected)
          }
        />
      </div>
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
    </div>
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
    case 'complete':
      return (
        <div className="flex items-center">
          <Badge color="success" renderAsDot />
          <Text className="ms-2 font-medium capitalize text-green-dark">
            {value}
          </Text>
        </div>
      );
    case 'canceled':
      return (
        <div className="flex items-center">
          <Badge color="danger" renderAsDot />
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
