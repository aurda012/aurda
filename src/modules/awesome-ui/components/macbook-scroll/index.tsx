import React from 'react';
import { MacbookScroll } from './macbook-scroll';

export default function MacbookScrollDemo() {
  return (
    <div className="w-full overflow-hidden bg-white dark:bg-[#0B0B0F]">
      <MacbookScroll
        title={
          <span>
            This Macbook is built with Tailwindcss. <br /> No kidding.
          </span>
        }
        src={`/components/macbook-scroll-screen.png`}
        showGradient={false}
      />
    </div>
  );
}
