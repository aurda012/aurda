import Nav from '@/modules/awesome-ui/components/nav';
import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-[calc(100vh-3.5rem)] flex-1 lg:grid lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
      <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto overflow-x-hidden lg:sticky lg:block">
        <Nav />
      </aside>
      {children}
    </div>
  );
}
