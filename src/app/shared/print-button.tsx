'use client';

import cn from '@/utils/class-names';
import { PiPrinterBold } from 'react-icons/pi';
import { Button, ButtonProps } from 'rizzui';

export default function PrintButton({ className, ...props }: ButtonProps) {
  return (
    <Button
      variant="outline"
      className={cn('w-full @lg:w-auto', className)}
      {...props}
    >
      <PiPrinterBold className="me-1.5 h-[17px] w-[17px]" />
      Print
    </Button>
  );
}
