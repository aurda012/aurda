'use client';

import dynamic from 'next/dynamic';
import { useColumn } from '@/hooks/use-column';
import ControlledTable from '@/components/controlled-table';
import { categories } from '@/data/product-categories';
import { useCallback, useMemo, useState } from 'react';
import { useTable } from '@/hooks/use-table';
import { getColumns } from '@/app/shared/ecommerce/category/category-list/columns';
// dynamic import
const TableFooter = dynamic(
  () => import('@/app/shared/ecommerce/category/category-list/table-footer'),
  { ssr: false }
);

export default function CategoryTable() {
  const [pageSize, setPageSize] = useState(10);

  const onHeaderCellClick = (value: string) => ({
    onClick: () => {
      handleSort(value);
    },
  });

  const onDeleteItem = useCallback((id: string) => {
    handleDelete(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const onChecked = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    if (event.target.checked) {
      setCheckedItems((prevItems) => [...prevItems, id]);
    } else {
      setCheckedItems((prevItems) => prevItems.filter((item) => item !== id));
    }
  };

  const {
    isLoading,
    isFiltered,
    tableData,
    currentPage,
    totalItems,
    handlePaginate,
    searchTerm,
    handleSearch,
    sortConfig,
    handleSort,
    handleDelete,
  } = useTable(categories, pageSize);

  const columns = useMemo(
    () =>
      getColumns({ sortConfig, onHeaderCellClick, onDeleteItem, onChecked }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      onHeaderCellClick,
      sortConfig.key,
      sortConfig.direction,
      onDeleteItem,
      onChecked,
    ]
  );

  const { visibleColumns, checkedColumns, setCheckedColumns } =
    useColumn(columns);

  return (
    <ControlledTable
      variant="modern"
      isLoading={isLoading}
      showLoadingText={true}
      data={tableData}
      // @ts-ignore
      columns={visibleColumns}
      paginatorOptions={{
        pageSize,
        setPageSize,
        total: totalItems,
        current: currentPage,
        onChange: (page: number) => handlePaginate(page),
      }}
      filterOptions={{
        searchTerm,
        onSearchClear: () => {
          handleSearch('');
        },
        onSearchChange: (event) => {
          handleSearch(event.target.value);
        },
        hasSearched: isFiltered,
        columns,
        checkedColumns,
        setCheckedColumns,
      }}
      tableFooter={
        <TableFooter
          checkedItems={checkedItems}
          handleDelete={(ids: string[]) => {
            handleDelete(ids);
            setCheckedItems([]);
          }}
        />
      }
      className="rounded-md border border-muted text-sm shadow-sm [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:h-60 [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:justify-center [&_.rc-table-row:last-child_td.rc-table-cell]:border-b-0 [&_thead.rc-table-thead]:border-t-0"
    />
  );
}
