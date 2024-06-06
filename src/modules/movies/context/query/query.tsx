'use client';

import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export const APP_QUERY_CLIENT = new QueryClient();

type QueryWrapperProps = {
  children: ReactNode;
};

export const QueryWrapper = ({ children }: QueryWrapperProps) => {
  return (
    <QueryClientProvider client={APP_QUERY_CLIENT}>
      {children}
    </QueryClientProvider>
  );
};
