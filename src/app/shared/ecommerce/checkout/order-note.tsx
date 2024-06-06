import { useFormContext } from 'react-hook-form';
import { Textarea } from 'rizzui';
import cn from '@/utils/class-names';

interface OrderNoteProps {
  className?: string;
}

export default function OrderNote({ className }: OrderNoteProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div
      className={cn('border-t border-muted pt-4 @xs:pt-6 @5xl:pt-7', className)}
    >
      <Textarea
        label="Order Note (optional)"
        placeholder="Notes about your order, e.g. special notes for delivery."
        {...register('note')}
        error={errors.note?.message as string}
        textareaClassName="h-20"
      />
    </div>
  );
}
