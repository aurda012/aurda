'use client';

import { HeaderCell } from '@/components/ui/Table/table';
import { Text, Checkbox, ActionIcon, Tooltip } from 'rizzui';
import cn from '@/utils/class-names';
import { StatusType } from '@/data/transaction-history';
import PencilIcon from '@/components/icons/pencil';
import EyeIcon from '@/components/icons/eye';
import AvatarCard from '@/components/ui/avatar-card';
import DeletePopover from '@/app/shared/delete-popover';
import DateCell from '@/components/ui/date-cell';
import MasterCardIcon from '@/components/icons/mastercard';
import VisaIcon from '@/components/icons/visa';

const statusColorClassName = {
  Complete: 'text-green-dark before:bg-green-dark',
  Pending: 'before:bg-orange text-orange-dark',
  Canceled: 'text-red-dark before:bg-red-dark',
};

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
  handleSelectAll,
  sortConfig,
  onDeleteItem,
  onHeaderCellClick,
  data,
  checkedItems,
  onChecked,
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
    title: <HeaderCell title="User Id" />,
    onHeaderCell: () => onHeaderCellClick('id'),
    dataIndex: 'id',
    key: 'id',
    width: 180,
    render: (id: string) => <Text>#{id}</Text>,
  },
  {
    title: (
      <HeaderCell title={<span className="whitespace-nowrap">Date</span>} />
    ),
    dataIndex: 'date',
    key: 'date',
    width: 400,
    render: (createdDate: Date) => <DateCell date={createdDate} />,
  },
  {
    title: <HeaderCell title="Recipient" />,
    onHeaderCell: () => onHeaderCellClick('user.name'),
    dataIndex: 'user',
    key: 'user',
    width: 450,
    render: (user: { name: string; email: string; avatar: string }) => (
      <AvatarCard src={user.avatar} name={user.name} description={user.email} />
    ),
  },
  {
    title: (
      <HeaderCell
        title={<span className="whitespace-nowrap">Type</span>}
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'type'
        }
      />
    ),
    dataIndex: 'type',
    key: 'type',
    width: 250,
    onHeaderCell: () => onHeaderCellClick('type'),
    render: (ticketsCount: number) => (
      <Text className="whitespace-nowrap font-medium text-gray-900">
        {ticketsCount}
      </Text>
    ),
  },
  {
    title: (
      <HeaderCell
        title="Amount"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'amount'
        }
      />
    ),
    dataIndex: 'amount',
    key: 'amount',
    onHeaderCell: () => onHeaderCellClick('amount'),
    width: 300,
    render: (amount: number) => (
      <span className="whitespace-nowrap font-semibold">${amount}</span>
    ),
  },
  {
    title: <HeaderCell title="Currency" />,
    dataIndex: 'currency',
    key: 'currency',
    width: 300,

    render: (currency: string) => (
      <span className="whitespace-nowrap font-semibold">{currency}</span>
    ),
  },

  {
    title: <HeaderCell title="Method" />,
    dataIndex: 'paymentMethod',
    key: 'paymentMethod',
    width: 300,
    render: ({
      cardType,
      lastCardNo,
    }: {
      cardType: 'mastercard' | 'visa';
      lastCardNo: string;
    }) => {
      return <PaymentMethodCell cardType={cardType} lastCardNo={lastCardNo} />;
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
    dataIndex: 'status',
    key: 'status',
    width: 300,
    onHeaderCell: () => onHeaderCellClick('status'),
    render: (status: StatusType) => {
      return (
        <Text
          className={cn(
            'relative w-[90px] whitespace-nowrap ps-3 font-medium before:absolute before:left-0 before:top-[7px] before:h-[6px] before:w-[6px] before:rounded-full',
            statusColorClassName[status]
          )}
        >
          {status}
        </Text>
      );
    },
  },

  {
    // Need to avoid this issue -> <td> elements in a large <table> do not have table headers.
    title: <HeaderCell title="Actions" className="opacity-0" />,
    dataIndex: 'action',
    key: 'action',
    width: 200,
    render: (_: string, row: any) => (
      <div className="flex items-center justify-end gap-3 pe-3">
        <Tooltip
          size="sm"
          content={'Edit Customer'}
          placement="top"
          color="invert"
        >
          <ActionIcon
            as="span"
            size="sm"
            variant="outline"
            aria-label={'Edit Customer'}
            className="hover:!border-gray-900 hover:text-gray-700"
          >
            <PencilIcon className="h-4 w-4" />
          </ActionIcon>
        </Tooltip>
        <Tooltip
          size="sm"
          content={'View Customer'}
          placement="top"
          color="invert"
        >
          <ActionIcon
            as="span"
            size="sm"
            variant="outline"
            aria-label={'View Customer'}
            className="hover:!border-gray-900 hover:text-gray-700"
          >
            <EyeIcon className="h-4 w-4" />
          </ActionIcon>
        </Tooltip>
        <DeletePopover
          title={`Delete the transaction`}
          description={`Are you sure you want to delete this #{row.id} transaction?`}
          onDelete={() => onDeleteItem(row.id)}
        />
      </div>
    ),
  },
];

function PaymentMethodCell({
  cardType,
  lastCardNo,
}: {
  cardType: string;
  lastCardNo: string;
}) {
  return (
    <span className="flex gap-3">
      {cardType === 'Mastercard' ? (
        <MasterCardIcon className="h-auto w-6" />
      ) : (
        <VisaIcon className="h-auto w-6" />
      )}
      <Text className="font-semibold text-gray-900">***{lastCardNo}</Text>
    </span>
  );
}
