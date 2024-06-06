'use client';

import { DatePicker } from '@/components/ui/datepicker';
import { Controller, useFormContext } from 'react-hook-form';
import { InvoiceInput } from './invoice-forms/invoice-input';

export default function SecondBlock() {
  const { register, control } = useFormContext();
  return (
    <div className="mt-12 grid grid-cols-2 gap-8">
      <div className="space-y-0.5">
        <InvoiceInput
          placeholder="Invoice To:"
          inputClassName="font-medium"
          {...register('client.clientSectionLabel')}
        />
        <InvoiceInput
          placeholder="Name"
          className="!mb-4"
          inputClassName="text-2xl font-semibold"
          {...register('client.name')}
        />
        <InvoiceInput
          placeholder="Contact No"
          {...register('client.contact')}
        />
        <InvoiceInput
          placeholder="Email Address"
          {...register('client.email')}
        />
        <InvoiceInput placeholder="Address" {...register('client.address')} />
      </div>

      <div className="space-y-0.5 [&_input]:text-end">
        <InvoiceInput
          placeholder="Invoice No:"
          inputClassName="font-medium"
          {...register('invoice.InvoiceNumberLabel')}
        />
        <InvoiceInput
          placeholder="INV-0001-0001-0001"
          {...register('invoice.number')}
        />

        <InvoiceInput
          className="!mt-4"
          placeholder="Invoice Date"
          inputClassName="font-medium"
          {...register('invoice.InvoiceDateLabel')}
        />
        <Controller
          name="invoice.date"
          control={control}
          render={({ field: { value, onChange } }) => (
            <DatePicker
              selected={value}
              onChange={onChange}
              placeholderText="Date 17 Aug 2024"
              inputProps={{
                inputClassName:
                  'shadow-none ring-0 h-auto py-1 border-transparent hover:border-primary px-2 text-gray-900 dark:text-gray-0',
                prefixClassName: 'hidden',
              }}
            />
          )}
        />
      </div>
    </div>
  );
}
