'use client';

import { format } from 'date-fns';
import Link from 'next/link';
import { ColumnDef } from '@tanstack/react-table';
import { CombinedCredit } from '@/modules/movies/api';

import { TableColumnHeader } from '@/modules/movies/components/table';

import { Dictionary } from '@/modules/movies/utils/dictionaries';
import { Language } from '@/modules/movies/types/languages';

type Columns = (
  dictionary: Dictionary,
  language: Language
) => ColumnDef<CombinedCredit>[];

export const columns: Columns = (dictionary, language) => [
  {
    id: dictionary.credits_columns.year,
    accessorKey: 'date',
    header: ({ column }) => (
      <TableColumnHeader
        column={column}
        title={dictionary.credits_columns.year}
        className="ml-2 w-[10ch]"
      />
    ),
    cell: ({ row }) => {
      const { date } = row.original;

      return (
        <span className="select-none font-bold text-muted-foreground">
          {date === '' ? '-' : format(new Date(date), 'yyyy')}
        </span>
      );
    },
    enableSorting: true,
    enableHiding: false,
  },
  {
    id: dictionary.credits_columns.title,
    accessorKey: 'title',
    header: ({ column }) => (
      <TableColumnHeader
        column={column}
        title={dictionary.credits_columns.title}
        className="w-[100px]"
      />
    ),
    cell: ({ row }) => {
      const { media_type: type, id, title } = row.original;

      const href = `/${type === 'tv' ? 'movies/tv-series' : 'movies'}/${id}`;

      return (
        <Link href={href} className="underline-offset-4 hover:underline">
          {title}
        </Link>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: dictionary.credits_columns.role,
    accessorKey: 'role',
    header: ({ column }) => (
      <TableColumnHeader
        column={column}
        title={dictionary.credits_columns.role}
      />
    ),
    cell: ({ row }) => {
      const { role } = row.original;

      return (
        <p className="text-sm text-muted-foreground">
          {role === '' ? '-' : role}
        </p>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
];
