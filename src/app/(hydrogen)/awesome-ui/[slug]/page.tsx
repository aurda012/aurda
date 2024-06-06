'use client';

import { components } from '@/modules/awesome-ui/components';
import { useEffect } from 'react';

const ComponentPage = ({ params }: { params: { slug: string } }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const comp = components.find((c) => c.path === `/awesome-ui/${params.slug}`);
  if (!comp) {
    return (
      <main className="relative py-6 lg:gap-10 lg:py-8">
        <div className="mx-auto w-full min-w-0">
          <div className="space-y-2">
            <h1 className="scroll-m-20 text-4xl font-bold tracking-tight text-black dark:text-white">
              Nothing To See Here...
            </h1>
          </div>
        </div>
      </main>
    );
  }
  return (
    <main className="relative w-full py-6 lg:gap-10 lg:py-8">
      <div className="mx-auto w-full min-w-0">
        <div className="space-y-2">
          <h1 className="scroll-m-20 text-4xl font-bold tracking-tight text-black dark:text-white">
            {comp.name}
          </h1>
          <p className="text-lg text-muted-foreground">{comp.description}</p>
        </div>
        {/* Preview */}
        <div className="pb-12 pt-8">
          <div className="preview border-border flex min-h-[350px] w-full items-center justify-center rounded-md border-[1px] p-2 sm:p-10">
            {comp.component}
          </div>
        </div>
      </div>
    </main>
  );
};
export default ComponentPage;
