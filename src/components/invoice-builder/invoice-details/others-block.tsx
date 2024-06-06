import { useFormContext } from 'react-hook-form';
import { InvoiceInput } from './invoice-forms/invoice-input';
import { InvoiceTextarea } from './invoice-forms/invoice-textarea';

export default function OthersBlock() {
  const { register } = useFormContext();
  return (
    <div className="mt-12">
      <div className="grid grid-cols-1 gap-0.5">
        <InvoiceInput
          placeholder="Note"
          className="font-semibold"
          {...register('note.noteLabel')}
        />
        <InvoiceTextarea
          rows={4}
          variant="outline"
          placeholder="Some info about the note..."
          {...register(`note.note`)}
        />
      </div>
      <div className="mt-6 grid grid-cols-1 gap-0.5">
        <InvoiceInput
          placeholder="Note"
          className="font-semibold"
          {...register('terms.termsLabel')}
        />
        <InvoiceTextarea
          rows={4}
          variant="outline"
          placeholder="Some info about the note..."
          {...register(`terms.terms`)}
        />
      </div>
      <div className="ms-auto mt-12 grid w-full max-w-64 grid-cols-1 gap-1 [&_input]:text-center">
        <InvoiceInput
          placeholder="Name"
          inputClassName="text-lg"
          className="font-semibold"
          {...register('signature.name')}
        />
        <InvoiceInput
          placeholder="Label"
          className="border-t pt-1 dark:border-muted/20"
          {...register('signature.label')}
        />
      </div>

      <div className="mt-6 border-t border-muted pt-4 text-center text-gray-900 dark:border-muted/20 dark:text-gray-0">
        Powered By <span className="font-bold">REDQ</span>
      </div>
    </div>
  );
}
