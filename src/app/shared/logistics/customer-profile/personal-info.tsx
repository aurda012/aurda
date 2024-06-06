'use client';

import Image from 'next/image';
import { Text } from 'rizzui';
import cn from '@/utils/class-names';
import { HeaderCell } from '@/components/ui/Table/table';
import BasicTableWidget from '@/components/controlled-table/basic-table-widget';

interface PersonalInfoProps {
  className?: string;
}

const data = [
  {
    id: 1,
    country: {
      name: 'Germany',
      code: 'de',
    },
    address: '37831 Hodkiewicz Track, Minnesota 27750',
    phone: '(169) 492-2884',
    company: 'Schiller - Wisozk',
    source: 'Email',
    grade: 1,
  },
];

export const getColumns = () => [
  {
    title: <HeaderCell title="Country" className="ms-6" />,
    dataIndex: 'country',
    key: 'country',
    width: 100,
    render: ({ name, code }: { name: string; code: string }) => (
      <div className="ms-6 flex items-center gap-2">
        <figure className="relative h-10 w-10">
          <Image
            fill
            quality={100}
            alt={`${name} Flag icon`}
            className="object-contain"
            src={`https://flagcdn.com/${code.toLowerCase()}.svg`}
          />
        </figure>

        <Text as="span" className="whitespace-nowrap">
          {name}
        </Text>
      </div>
    ),
  },
  {
    title: <HeaderCell title="Address" />,
    dataIndex: 'address',
    key: 'address',
    width: 300,
    render: (address: string) => <Text>{address}</Text>,
  },
  {
    title: <HeaderCell title="Phone" />,
    dataIndex: 'phone',
    key: 'phone',
    width: 200,
    render: (phone: string) => <Text>{phone}</Text>,
  },
  {
    title: <HeaderCell title="Company" />,
    dataIndex: 'company',
    key: 'company',
    width: 200,
    render: (company: string) => <Text>{company}</Text>,
  },
  {
    title: <HeaderCell title="Source" />,
    dataIndex: 'source',
    key: 'source',
    width: 150,
    render: (source: string) => <Text>{source}</Text>,
  },
  {
    title: <HeaderCell title="Grade" className="me-6 justify-end" />,
    dataIndex: 'grade',
    key: 'grade',
    align: 'right',
    width: 150,
    render: (grade: number) => (
      <Text className="me-6 font-medium text-gray-800">{grade}</Text>
    ),
  },
];

export default function PersonalInformation({ className }: PersonalInfoProps) {
  return (
    <BasicTableWidget
      title="Personal Information"
      className={cn(
        'mt-14 pb-0 lg:pb-0 [&_.rc-table-row:last-child_td]:border-b-0',
        className
      )}
      data={data}
      getColumns={getColumns}
      noGutter
      enableSearch={false}
      scroll={{
        x: 900,
      }}
    />
  );
}
