import Image from 'next/image';
import { forwardRef } from 'react';
import { Text, Title } from 'rizzui';
import cn from '@/utils/class-names';
import { InvoiceType } from '@/utils/validators/invoice-builder.schema';

interface InvoicePrintProps {
  data: InvoiceType;
  totalTax: number;
  subTotal: number;
}

export const InvoicePrint = forwardRef<HTMLDivElement, InvoicePrintProps>(
  ({ data, totalTax, subTotal }, ref) => {
    return (
      <div className="hidden">
        <div ref={ref}>
          <div className="print-container px-16">
            <table className="w-full">
              <thead>
                <tr>
                  <td>
                    <div className="h-10"></div>
                  </td>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>
                    {/* first section  */}
                    <div
                      className={cn(
                        'flex items-center justify-end',
                        data.logo && 'justify-between'
                      )}
                    >
                      {data.logo && (
                        <Image
                          alt="logo"
                          width={80}
                          height={80}
                          src={data.logo!}
                          className="h-24 w-32 object-contain"
                        />
                      )}
                      <div className="text-end">
                        {data.company.name && (
                          <Text className="text-lg font-medium text-gray-900">
                            {data.company.name}
                          </Text>
                        )}
                        <Title className="text-4xl font-semibold">
                          {data.documentTitle}
                        </Title>
                      </div>
                    </div>

                    {/* second section  */}
                    <div className="mt-12 grid grid-cols-2 gap-8">
                      {/* left side */}
                      <div>
                        <Text className="mb-1 font-medium">
                          {data.client.clientSectionLabel}
                        </Text>
                        <Title className="mb-3 text-xl font-semibold">
                          {data.client.name}
                        </Title>
                        <div className="space-y-1">
                          <Text>{data.client.contact}</Text>
                          <Text>{data.client.email}</Text>
                          <Text>{data.client.address}</Text>
                        </div>
                      </div>
                      {/* right side */}
                      <div className="text-end">
                        <Text className="mb-1 font-medium text-gray-900">
                          {data.invoice.InvoiceNumberLabel}
                        </Text>
                        <Text className="mb-5">{data.invoice.number}</Text>
                        <Text className="mb-1 font-medium text-gray-900">
                          {data.invoice.InvoiceDateLabel}
                        </Text>
                        <Text>
                          {data.invoice.date?.toDateString() ?? '-- --'}
                        </Text>
                      </div>
                    </div>

                    {/* table section  */}
                    <div className="mt-12 w-full break-inside-auto border-b">
                      <div className="invoice-print-table-header !mb-2 grid break-inside-avoid grid-cols-12 gap-2 px-2 font-medium">
                        <span className="col-span-4 block py-2 text-start">
                          {data.invoiceTableHeader.title}
                        </span>
                        <span className="col-span-2 block py-2 text-end">
                          {data.invoiceTableHeader.quantity}
                        </span>
                        <span className="col-span-2 block py-2 text-end">
                          {data.invoiceTableHeader.rate}
                        </span>
                        <span className="col-span-2 block py-2 text-end">
                          {data.invoiceTableHeader.tax}
                        </span>
                        <span className="col-span-2 block py-2 text-end">
                          {data.invoiceTableHeader.amount}
                        </span>
                      </div>
                      {data.invoiceTable.map((item, index) => (
                        <div
                          key={index}
                          className="!mb-2 grid break-inside-avoid grid-cols-12 gap-2 px-2"
                        >
                          <span className="col-span-4 block py-2">
                            {item.title}
                          </span>
                          <span className="col-span-2 block py-2 text-end">
                            {item.quantity}
                          </span>
                          <span className="col-span-2 block py-2 text-end">
                            {item.rate}
                          </span>
                          <span className="col-span-2 block py-2 text-end">
                            {item.tax}
                          </span>
                          <span className="col-span-2 block py-2 text-end">
                            {item.quantity * item.rate}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* total section  */}
                    <div className="ms-auto mt-4 w-full max-w-[240px] break-inside-avoid divide-y font-medium">
                      <div className="flex items-center justify-between gap-6 pb-2">
                        <span className="block">
                          {data.finalCalculations.subTotalLabel}
                        </span>
                        <span className="block text-gray-900">${subTotal}</span>
                      </div>
                      <div className="flex items-center justify-between gap-6 py-2">
                        <span className="block">
                          {data.finalCalculations.taxLabel}
                        </span>
                        <span className="block text-gray-900">${totalTax}</span>
                      </div>
                      <div className="flex items-center justify-between gap-6 pt-2">
                        <span className="block text-gray-900">
                          {data.finalCalculations.totalLabel}
                        </span>
                        <span className="block text-gray-900">
                          ${subTotal + totalTax}
                        </span>
                      </div>
                    </div>

                    {/* payment section  */}
                    <div className="break-before-auto break-inside-avoid-page space-y-2">
                      <Text className="text-lg font-semibold text-gray-900">
                        {data.payments.label}
                      </Text>
                      <Text>{data.payments.bankName}</Text>
                      <Text>{data.payments.accountNo}</Text>
                    </div>

                    {/* note section  */}
                    {data.note.note && (
                      <div className="mt-12 break-before-auto break-inside-avoid-page">
                        <Text className="mb-1 font-medium text-gray-900">
                          {data.note.noteLabel}
                        </Text>
                        <Text className="break-words">{data.note.note}</Text>
                      </div>
                    )}

                    {/* terms section  */}
                    {data.terms.terms && (
                      <div className="mt-12 break-before-auto break-inside-avoid-page">
                        <Text className="mb-1 font-medium text-gray-900">
                          {data.terms.termsLabel}
                        </Text>
                        <Text className="break-words">{data.terms.terms}</Text>
                      </div>
                    )}

                    {/*signature section */}
                    <div className="!mt-20 ms-auto grid w-full max-w-64 break-inside-avoid grid-cols-1 gap-1 text-center">
                      <Text className="text-lg font-semibold text-gray-900">
                        {data.signature.name}
                      </Text>
                      <Text className="mt-1 border-t pt-2">
                        {data.signature.label}
                      </Text>
                    </div>
                  </td>
                </tr>
              </tbody>

              {/* footer gap for every page break end */}
              <tfoot>
                <tr>
                  <td>
                    <div className="h-16"></div>
                  </td>
                </tr>
              </tfoot>
            </table>
            {/* powered by section  */}
            <div className="fixed bottom-4 start-0 mt-6 w-full border-t border-muted pt-4 text-center text-gray-900 dark:text-gray-0">
              Powered By <span className="font-bold">REDQ</span>
            </div>
            {/* footer gap for every page break end */}
          </div>
        </div>
      </div>
    );
  }
);

InvoicePrint.displayName = 'InvoicePrint';
