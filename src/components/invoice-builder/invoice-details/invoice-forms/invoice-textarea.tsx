import cn from '@/utils/class-names';
import { forwardRef } from 'react';
import { Textarea, TextareaProps } from 'rizzui';

export const InvoiceTextarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ textareaClassName, ...props }, ref) => {
    return (
      <Textarea
        ref={ref}
        textareaClassName={cn(
          'shadow-none ring-0 h-auto py-1 border-transparent hover:border-primary text-gray-900 dark:text-gray-0',
          textareaClassName
        )}
        {...props}
      />
    );
  }
);

InvoiceTextarea.displayName = 'InvoiceTextarea';
