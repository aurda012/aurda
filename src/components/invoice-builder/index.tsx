'use client';

import { useRef } from 'react';
import { Button } from 'rizzui';
import SimpleBar from 'simplebar-react';
import { routes } from '@/config/routes';
import { InvoicePrint } from './invoice-print';
import { useReactToPrint } from 'react-to-print';
import PageHeader from '@/app/shared/page-header';
import PrintButton from '@/app/shared/print-button';
import { PiDownloadSimpleBold } from 'react-icons/pi';
import TableBlock from './invoice-details/table-block';
import FirstBlock from './invoice-details/first-block';
import SecondBlock from './invoice-details/second-block';
import OthersBlock from './invoice-details/others-block';
import {
  InvoiceType,
  invoiceBuilderSchema,
  INVOICE_BUILDER_DEFAULT_VALUE,
} from '@/utils/validators/invoice-builder.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import CalcPayBlock from './invoice-details/calc-pay-block';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

const pageHeader = {
  title: 'Invoice Builder',
  breadcrumb: [
    {
      href: routes.eCommerce.dashboard,
      name: 'Home',
    },
    {
      href: routes.invoice.home,
      name: 'Invoice',
    },
    {
      name: 'Builder',
    },
  ],
};

export default function InvoiceBuilder() {
  const printRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  const methods = useForm<InvoiceType>({
    mode: 'onChange',
    defaultValues: INVOICE_BUILDER_DEFAULT_VALUE,
    resolver: zodResolver(invoiceBuilderSchema),
  });

  const onSubmit: SubmitHandler<InvoiceType> = (data) => {};

  let subTotal = methods.watch('invoiceTable').reduce((acc, item) => {
    if (!item.quantity || !item.rate) return acc;
    return acc + item.quantity * item.rate;
  }, 0);

  let totalTax = methods.watch('invoiceTable').reduce((acc, item) => {
    return acc + item.tax;
  }, 0);

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <PrintButton onClick={handlePrint} />
          <Button className="w-full @lg:w-auto">
            <PiDownloadSimpleBold className="me-1.5 h-[17px] w-[17px]" />
            Download
          </Button>
        </div>
      </PageHeader>
      <InvoicePrint
        ref={printRef}
        subTotal={subTotal}
        totalTax={totalTax}
        data={methods.watch()}
      />
      <div className="rounded-2xl p-8">
        <SimpleBar className="w-full">
          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              className="mx-auto w-[840px] rounded-xl border border-gray-200 bg-white p-10 shadow-sm"
            >
              <FirstBlock setValue={methods.setValue} />
              <SecondBlock />
              <TableBlock />
              <CalcPayBlock subTotal={subTotal} totalTax={totalTax} />
              <OthersBlock />
            </form>
          </FormProvider>
        </SimpleBar>
      </div>
    </>
  );
}
