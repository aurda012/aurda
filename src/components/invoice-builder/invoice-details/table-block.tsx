'use client';

import { Button } from 'rizzui';
import { Fragment } from 'react';
import cn from '@/utils/class-names';
import { DragEndEvent } from '@dnd-kit/core';
import { createId } from '@paralleldrive/cuid2';
import { InvoiceInput } from './invoice-forms/invoice-input';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { InvoiceTextarea } from './invoice-forms/invoice-textarea';
import { SortableList } from '@/components/dnd-sortable/dnd-sortable-list';
import {
  PiPlusCircle,
  PiTrashBold,
  PiArrowsOutCardinalBold,
} from 'react-icons/pi';

export default function TableBlock() {
  const { control, register, getValues } = useFormContext();
  const { fields, append, remove, move } = useFieldArray({
    control: control,
    name: 'invoiceTable',
  });

  function handleChange(event: DragEndEvent) {
    const { active, over } = event;
    if (!active || !over) return;
    const oldIndex = fields.findIndex((item) => item.id === active.id);
    const newIndex = fields.findIndex((item) => item.id === over.id);
    move(oldIndex, newIndex);
  }

  return (
    <div className="relative mt-12">
      <div className="grid grid-cols-12 gap-2 rounded-t-md bg-gray-100 p-2 dark:bg-gray-900">
        <TableHeaderCell className="col-span-4 ps-2">
          <InvoiceInput
            placeholder="Item Description"
            {...register('invoiceTableHeader.title')}
          />
        </TableHeaderCell>
        <TableHeaderCell className="col-span-2 justify-end">
          <InvoiceInput
            placeholder="Qty"
            inputClassName="[&_input]:text-end"
            {...register('invoiceTableHeader.quantity')}
          />
        </TableHeaderCell>
        <TableHeaderCell className="col-span-2 justify-end">
          <InvoiceInput
            placeholder="Rate"
            inputClassName="[&_input]:text-end"
            {...register('invoiceTableHeader.rate')}
          />
        </TableHeaderCell>
        <TableHeaderCell className="col-span-2 justify-end">
          <InvoiceInput
            placeholder="Tax"
            inputClassName="[&_input]:text-end"
            {...register('invoiceTableHeader.tax')}
          />
        </TableHeaderCell>
        <TableHeaderCell className="col-span-2 justify-end">
          <InvoiceInput
            placeholder="Amount"
            inputClassName="[&_input]:text-end"
            {...register('invoiceTableHeader.amount')}
          />
        </TableHeaderCell>
      </div>
      <ul>
        <SortableList items={fields} onChange={handleChange}>
          {fields?.map((field, index) => {
            let q = getValues(`invoiceTable.${index}.quantity`);
            let r = getValues(`invoiceTable.${index}.rate`);
            let total = q * r;
            return (
              <Fragment key={`invoice-table-${index}`}>
                <SortableList.Item id={field.id}>
                  <div className="group grid min-h-10 grid-cols-12 gap-0 border-b border-muted dark:border-muted/20">
                    <div className="col-span-4 py-2 pe-2">
                      <InvoiceTextarea
                        rows={2}
                        className="grow"
                        variant="outline"
                        placeholder="Item details"
                        {...register(`invoiceTable.${index}.title`)}
                      />
                    </div>
                    <div className="col-span-2 p-2">
                      <InvoiceInput
                        type="number"
                        placeholder="1"
                        inputClassName="[&_input]:text-end"
                        {...register(`invoiceTable.${index}.quantity`, {
                          valueAsNumber: true,
                        })}
                      />
                    </div>
                    <div className="col-span-2 p-2">
                      <InvoiceInput
                        type="number"
                        placeholder="120"
                        inputClassName="[&_input]:text-end"
                        {...register(`invoiceTable.${index}.rate`, {
                          valueAsNumber: true,
                        })}
                      />
                    </div>
                    <div className="col-span-2 p-2">
                      <InvoiceInput
                        type="number"
                        placeholder="5%"
                        inputClassName="[&_input]:text-end"
                        {...register(`invoiceTable.${index}.tax`, {
                          valueAsNumber: true,
                        })}
                      />
                    </div>
                    <div className="relative col-span-2 w-full p-2 pe-4 pt-3 text-end text-gray-900 dark:text-gray-0">
                      {total ? total : 0}
                      <div className="absolute end-0 top-0 hidden translate-x-full grid-cols-1 gap-0 overflow-hidden rounded-md border bg-white shadow-[0px_1px_4px_rgba(0,0,0,0.16)] group-hover:grid dark:border-muted/20">
                        <SortableList.DragHandle className="flex h-auto w-full items-center justify-center p-1.5 text-lg hover:bg-gray-100 dark:text-gray-50 dark:hover:bg-gray-700">
                          <PiArrowsOutCardinalBold className="size-4" />
                        </SortableList.DragHandle>
                        <button
                          type="button"
                          className="flex h-full w-full items-center justify-center p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700"
                          onClick={() => remove(index)}
                        >
                          <PiTrashBold className="size-4 text-red-dark dark:text-red" />
                        </button>
                      </div>
                    </div>
                  </div>
                </SortableList.Item>
              </Fragment>
            );
          })}
        </SortableList>
      </ul>

      <Button
        type="button"
        variant="text"
        className="absolute bottom-0 start-0 translate-y-full gap-2 ps-0 active:enabled:translate-y-full dark:text-gray-400"
        onClick={() =>
          append({
            id: createId(),
            title: '',
            quantity: 0,
            rate: 0,
            tax: 0,
          })
        }
      >
        <PiPlusCircle className="size-5" />
        Add Item
      </Button>
    </div>
  );
}

function TableHeaderCell({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        'font-semibold [&_input]:uppercase [&_input]:text-gray-500 dark:[&_input]:text-gray-400',
        className
      )}
    >
      {children}
    </div>
  );
}
