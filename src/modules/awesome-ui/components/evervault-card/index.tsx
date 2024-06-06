import React from 'react';
import { EvervaultCard, Icon } from './evervault-card';

export function EvervaultCardDemo() {
  return (
    <div className="relative mx-auto flex h-[30rem] max-w-sm flex-col items-start border border-black/[0.2] p-4 dark:border-white/[0.2]">
      <Icon className="absolute -left-3 -top-3 h-6 w-6 text-black dark:text-white" />
      <Icon className="absolute -bottom-3 -left-3 h-6 w-6 text-black dark:text-white" />
      <Icon className="absolute -right-3 -top-3 h-6 w-6 text-black dark:text-white" />
      <Icon className="absolute -bottom-3 -right-3 h-6 w-6 text-black dark:text-white" />

      <EvervaultCard text="hover" />

      <h2 className="mt-4 text-sm font-light text-black dark:text-white">
        Hover over this card to reveal an awesome effect. Running out of copy
        here.
      </h2>
    </div>
  );
}
