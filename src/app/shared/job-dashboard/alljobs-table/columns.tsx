'use client';

import { HeaderCell } from '@/components/ui/Table/table';
import { Text, Checkbox, ActionIcon, Tooltip, Select } from 'rizzui';
import PencilIcon from '@/components/icons/pencil';
import EyeIcon from '@/components/icons/eye';
import DeletePopover from '@/app/shared/delete-popover';
import DateCell from '@/components/ui/date-cell';
import { useState } from 'react';
import { PiCheckCircleBold, PiPlusCircle } from 'react-icons/pi';

const statusOptions = [
  { label: 'Live', value: 'Live' },
  { label: 'Closed', value: 'Closed' },
];

type Columns = {
  data: any[];
  sortConfig?: any;
  handleSelectAll: any;
  checkedItems: string[];
  onDeleteItem: (id: string) => void;
  onHeaderCellClick: (value: string) => void;
  onChecked?: (id: string) => void;
};

export const getColumns = ({
  data,
  onChecked,
  sortConfig,
  checkedItems,
  onDeleteItem,
  handleSelectAll,
  onHeaderCellClick,
}: Columns) => [
  {
    title: (
      <div className="ps-3.5">
        <Checkbox
          title={'Select All'}
          onChange={handleSelectAll}
          checked={checkedItems.length === data.length}
          className="cursor-pointer"
        />
      </div>
    ),
    dataIndex: 'checked',
    key: 'checked',
    width: 30,
    render: (_: any, row: any) => (
      <div className="inline-flex ps-3.5">
        <Checkbox
          aria-label={'ID'}
          className="cursor-pointer"
          checked={checkedItems.includes(row.id)}
          {...(onChecked && { onChange: () => onChecked(row.id) })}
        />
      </div>
    ),
  },
  {
    title: <HeaderCell title="JOB ID" />,
    dataIndex: 'id',
    key: 'id',
    width: 90,
    render: (id: string) => <Text>#{id}</Text>,
  },
  {
    title: <HeaderCell title="Created" className="uppercase" />,
    dataIndex: 'date',
    key: 'date',
    width: 230,
    render: (date: Date) => <DateCell date={date} />,
  },
  {
    title: <HeaderCell title="Job Title" />,
    dataIndex: 'title',
    key: 'title',
    width: 250,
    render: (title: string) => (
      <Text className="text-sm font-semibold text-gray-900 dark:text-gray-700">
        {title}
      </Text>
    ),
  },
  {
    title: <HeaderCell title="Candidates" />,
    dataIndex: 'candidates',
    key: 'candidates',
    width: 120,
    render: (candidates: number) => <Text>{candidates}</Text>,
  },
  {
    title: <HeaderCell title="In Process" />,
    dataIndex: 'inProcess',
    key: 'inProcess',
    width: 120,
    render: (inProcess: number) => <Text>{inProcess}</Text>,
  },
  {
    title: <HeaderCell title="Hired" />,
    dataIndex: 'hired',
    key: 'hired',
    width: 80,
    render: (hired: number) => <Text>{hired}</Text>,
  },
  {
    title: <HeaderCell title="Category" />,
    dataIndex: 'category',
    key: 'category',
    width: 260,
    render: (category: string[]) => {
      let print = category?.slice(0, 2);
      let more = category.length - category.slice(0, 2).length;
      return (
        <div className="flex h-auto flex-wrap gap-2">
          {print.map((item: string, index: number) => (
            <span
              key={index}
              className="rounded-full bg-gray-100 px-2 py-1 text-xs"
            >
              {item}
            </span>
          ))}
          <span className="rounded-full bg-gray-100 px-2 py-1 text-xs">
            +{more}
          </span>
        </div>
      );
    },
  },
  {
    title: (
      <HeaderCell
        title="Status"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'status'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('status'),
    dataIndex: 'status',
    key: 'status',
    width: 180,
    render: (status: string) => {
      return <StatusSelect selectItem={status} />;
    },
  },
  {
    // Need to avoid this issue -> <td> elements in a large <table> do not have table headers.
    title: <HeaderCell title="Actions" className="opacity-0" />,
    dataIndex: 'action',
    key: 'action',
    width: 180,
    render: (_: string, row: any) => (
      <div className="flex items-center justify-end gap-3 pe-3">
        <Tooltip size="sm" content={'Edit'} placement="top" color="invert">
          <ActionIcon
            as="span"
            size="sm"
            variant="outline"
            aria-label={'Edit Appointment'}
            className="hover:!border-gray-900 hover:text-gray-700"
          >
            <PencilIcon className="h-4 w-4" />
          </ActionIcon>
        </Tooltip>
        <Tooltip size="sm" content={'View'} placement="top" color="invert">
          <ActionIcon
            as="span"
            size="sm"
            variant="outline"
            aria-label={'View Appointment'}
            className="hover:!border-gray-900 hover:text-gray-700"
          >
            <EyeIcon className="h-4 w-4" />
          </ActionIcon>
        </Tooltip>
        <DeletePopover
          title={`Delete the job post`}
          description={`Are you sure you want to delete this ${row.id} job post?`}
          onDelete={() => onDeleteItem(row.id)}
        />
      </div>
    ),
  },
];

function StatusSelect({ selectItem }: { selectItem?: string }) {
  const selectItemValue = statusOptions.find(
    (option) => option.value === selectItem
  );
  const [value, setValue] = useState(selectItemValue);
  return (
    <Select
      dropdownClassName="!z-10"
      className="min-w-[140px]"
      inPortal={false}
      placeholder="Select Role"
      options={statusOptions}
      value={value}
      onChange={setValue}
      displayValue={(option: { value: any }) =>
        renderOptionDisplayValue(option.value as string)
      }
    />
  );
}

function renderOptionDisplayValue(value: string) {
  switch (value) {
    case 'Closed':
      return (
        <div className="flex items-center">
          <PiPlusCircle className="shrink-0 rotate-45 fill-red-dark text-lg" />
          <Text className="ms-1.5 text-sm font-medium capitalize text-gray-700">
            {value}
          </Text>
        </div>
      );
    default:
      return (
        <div className="flex items-center">
          <PiCheckCircleBold className="shrink-0 fill-green-dark text-lg" />
          <Text className="ms-1.5 text-sm font-medium capitalize text-gray-700">
            {value}
          </Text>
        </div>
      );
  }
}
