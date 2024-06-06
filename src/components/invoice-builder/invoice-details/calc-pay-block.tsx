'use client';

import { useFormContext } from 'react-hook-form';
import { InvoiceInput } from './invoice-forms/invoice-input';

export default function CalcPayBlock({
  subTotal,
  totalTax,
}: {
  subTotal: number;
  totalTax: number;
}) {
  const { register } = useFormContext();
  let total = subTotal + totalTax;
  return (
    <div className="mt-4">
      <div className="ms-auto w-full max-w-xs divide-y dark:divide-muted/20">
        <div className="grid grid-cols-2 items-center gap-2 pb-2">
          <div>
            <InvoiceInput
              placeholder="Subtotal"
              inputClassName="font-medium"
              {...register('finalCalculations.subTotalLabel')}
            />
          </div>
          <div className="text-end text-gray-900 dark:text-gray-0">
            {subTotal ? `$${subTotal}` : '--'}
          </div>
        </div>
        <div className="grid grid-cols-2 items-center gap-2 py-2">
          <div>
            <InvoiceInput
              placeholder="Tax"
              inputClassName="font-medium"
              {...register('finalCalculations.taxLabel')}
            />
          </div>
          <div className="text-end text-gray-900 dark:text-gray-0">
            {totalTax ? `$${totalTax}` : '--'}
          </div>
        </div>
        <div className="grid grid-cols-2 items-center gap-2 pt-2">
          <div>
            <InvoiceInput
              placeholder="Total"
              inputClassName="font-semibold"
              {...register('finalCalculations.totalLabel')}
            />
          </div>
          <div className="text-end font-semibold text-gray-900 dark:text-gray-0">
            {total ? `$${total}` : '--'}
          </div>
        </div>
      </div>
      <div className="max-w-sm space-y-0.5">
        <InvoiceInput
          placeholder="Payments"
          inputClassName="font-semibold text-base"
          {...register('payments.label')}
        />
        <InvoiceInput
          placeholder="Bank Name"
          {...register('payments.bankName')}
        />
        <InvoiceInput
          placeholder="Account No."
          {...register('payments.accountNo')}
        />
      </div>
    </div>
  );
}
