'use client';

import { useFormContext } from 'react-hook-form';
import { InvoiceInput } from './invoice-forms/invoice-input';
import InvoiceImageUploader from '@/components/ui/file-upload/invoice-image-uploader';

export default function FirstBlock({ setValue }: { setValue: any }) {
  const { register } = useFormContext();

  return (
    <div className="grid grid-cols-2 items-center">
      <InvoiceImageUploader name="logo" setValue={setValue} />
      <div className="space-y-1">
        <InvoiceInput
          className="ms-auto max-w-xs"
          {...register('company.name')}
          placeholder="Your Company Name"
          inputClassName="[&_input]:text-end text-lg font-medium"
        />
        <InvoiceInput
          placeholder="Invoice"
          className="ms-auto max-w-xs"
          {...register('documentTitle')}
          inputClassName="text-4xl [&_input]:text-end font-semibold"
        />
      </div>
    </div>
  );
}
