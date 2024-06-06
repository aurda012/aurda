'use client';

import Image from 'next/image';
import { Tabs } from './tabs';

export function TabsDemo() {
  const tabs = [
    {
      title: 'Product',
      value: 'product',
      content: (
        <div className="relative h-full w-full overflow-hidden rounded-2xl bg-gradient-to-br from-purple-700 to-violet-900 p-10 text-xl font-bold text-white md:text-4xl">
          <p>Product Tab</p>
          <DummyContent />
        </div>
      ),
    },
    {
      title: 'Services',
      value: 'services',
      content: (
        <div className="relative h-full w-full overflow-hidden rounded-2xl bg-gradient-to-br from-purple-700 to-violet-900 p-10 text-xl font-bold text-white md:text-4xl">
          <p>Services tab</p>
          <DummyContent />
        </div>
      ),
    },
    {
      title: 'Playground',
      value: 'playground',
      content: (
        <div className="relative h-full w-full overflow-hidden rounded-2xl bg-gradient-to-br from-purple-700 to-violet-900 p-10 text-xl font-bold text-white md:text-4xl">
          <p>Playground tab</p>
          <DummyContent />
        </div>
      ),
    },
    {
      title: 'Content',
      value: 'content',
      content: (
        <div className="relative h-full w-full overflow-hidden rounded-2xl bg-gradient-to-br from-purple-700 to-violet-900 p-10 text-xl font-bold text-white md:text-4xl">
          <p>Content tab</p>
          <DummyContent />
        </div>
      ),
    },
    {
      title: 'Random',
      value: 'random',
      content: (
        <div className="relative h-full w-full overflow-hidden rounded-2xl bg-gradient-to-br from-purple-700 to-violet-900 p-10 text-xl font-bold text-white md:text-4xl">
          <p>Random tab</p>
          <DummyContent />
        </div>
      ),
    },
  ];

  return (
    <div className="b relative mx-auto mb-40 mt-2 flex h-[20rem] w-full max-w-5xl flex-col items-start  justify-start [perspective:1000px] md:h-[40rem]">
      <Tabs tabs={tabs} />
    </div>
  );
}

const DummyContent = () => {
  return (
    <Image
      src="/components/macbook-scroll-screen.png"
      alt="dummy image"
      width="1000"
      height="1000"
      className="absolute inset-x-0 -bottom-10  mx-auto h-[60%] w-[90%] rounded-xl object-cover object-left-top md:h-[90%]"
    />
  );
};
