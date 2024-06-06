import { z } from 'zod';
import { createId } from '@paralleldrive/cuid2';

export const INVOICE_TABLE_DEFAULT_DATA = [
  {
    id: createId(),
    title: 'Product 1',
    quantity: 1,
    rate: 120,
    tax: 15,
  },
  {
    id: createId(),
    title: 'Product 2',
    quantity: 3,
    rate: 60,
    tax: 12,
  },
];

export const INVOICE_BUILDER_DEFAULT_VALUE = {
  documentTitle: 'INVOICE',
  company: {
    name: 'RedQ Tech',
  },
  client: {
    name: 'Jhon Doe',
    clientSectionLabel: 'Invoice To:',
    contact: '+8801712345678',
    email: 'admin@admin.com',
    address: 'New York, USA',
  },
  invoice: {
    number: 'INV-001-002-003',
    date: new Date(),
    InvoiceNumberLabel: 'Invoice No.',
    InvoiceDateLabel: 'Invoice Date',
    InvoiceDueDateLabel: 'Due Date',
  },
  invoiceTableHeader: {
    title: 'Item Description',
    quantity: 'Qty',
    rate: 'Rate',
    tax: 'Tax',
    amount: 'Amount',
  },
  invoiceTable: INVOICE_TABLE_DEFAULT_DATA,
  payments: {
    label: 'Payment Method',
    bankName: 'Bank Name: National Bank',
    accountNo: 'Account No: 1234567890',
  },
  finalCalculations: {
    subTotalLabel: 'Subtotal:',
    taxLabel: 'Tax:',
    totalLabel: 'Total:',
  },
  note: {
    noteLabel: 'Note',
    note: '',
  },
  terms: {
    termsLabel: 'Terms & Conditions',
    terms: '',
  },
  signature: {
    label: 'Administrator',
    name: 'Jhon Doe',
  },
};

export const invoiceBuilderSchema = z.object({
  documentTitle: z.string(),
  logo: z.string().optional(),
  qrCode: z.string().optional(),
  company: z.object({
    name: z.string().optional(),
    agent: z.string().optional(),
    address: z.string().optional(),
    state: z.string().optional(),
    country: z.string().optional(),
  }),
  client: z.object({
    name: z.string().optional(),
    contact: z.string().optional(),
    email: z.string().optional(),
    agent: z.string().optional(),
    address: z.string().optional(),
    state: z.string().optional(),
    country: z.string().optional(),
    clientSectionLabel: z.string().optional(),
  }),
  invoice: z.object({
    number: z.string().optional(),
    date: z.date().optional(),
    dueDate: z.date().optional(),
    InvoiceNumberLabel: z.string().optional(),
    InvoiceDateLabel: z.string().optional(),
    InvoiceDueDateLabel: z.string().optional(),
  }),
  invoiceTableHeader: z.object({
    title: z.string().optional(),
    quantity: z.string().optional(),
    rate: z.string().optional(),
    tax: z.string().optional(),
    amount: z.string().optional(),
  }),
  invoiceTable: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      quantity: z.number(),
      rate: z.number(),
      tax: z.number(),
    })
  ),
  payments: z.object({
    label: z.string().optional(),
    bankName: z.string().optional(),
    accountNo: z.string().optional(),
  }),
  finalCalculations: z.object({
    subTotalLabel: z.string().optional(),
    taxLabel: z.string().optional(),
    totalLabel: z.string().optional(),
  }),
  note: z.object({
    noteLabel: z.string().optional(),
    note: z.string().optional(),
  }),
  terms: z.object({
    termsLabel: z.string().optional(),
    terms: z.string().optional(),
  }),
  signature: z.object({
    label: z.string().optional(),
    name: z.string().optional(),
  }),
});

export type InvoiceType = z.infer<typeof invoiceBuilderSchema>;
