'use client';

import { siteConfig } from '@/config/site';
import { useTheme } from 'next-themes';
import Image from 'next/image';

export const Loading = ({ message }: { message?: string }) => {
  const { theme } = useTheme();
  return (
    <div className="fixed left-0 top-0 z-[9999] flex h-screen w-screen flex-col items-center justify-center bg-white/30 backdrop-blur-sm dark:bg-black/30">
      <Image
        src={siteConfig.logo}
        alt={siteConfig.title}
        className="dark:invert"
        priority
      />
      {message && (
        <p className="paragraph-semibold text-dark200_light900 mt-5">
          {message}
        </p>
      )}
    </div>
  );
};

export default Loading;
