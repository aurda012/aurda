'use client';

import { Toaster } from 'sonner';
import { ModalProvider } from '@/modules/blog-generator/components/modal/provider';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Toaster className="dark:hidden" />
      <Toaster theme="dark" className="hidden dark:block" />
      <ModalProvider>{children}</ModalProvider>
    </>
  );
}
