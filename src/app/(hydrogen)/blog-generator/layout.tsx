import { ReactNode, Suspense } from 'react';
import Nav from '@/modules/blog-generator/components/nav';
import { Providers } from './providers';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <Providers>
      <div>
        <Nav />
        <div className="min-h-full sm:pl-60">{children}</div>
      </div>
    </Providers>
  );
}
