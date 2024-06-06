'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FiSave } from 'react-icons/fi';
import { Button } from 'rizzui';
import cn from '@/utils/class-names';
import { useMedia } from '@/hooks/use-media';
import { siteConfig } from '@/config/site';

interface FooterProps {
  className?: string;
}

export default function Header({ className }: FooterProps) {
  const isMobile = useMedia('(max-width: 767px)', false);
  return (
    <header
      className={cn(
        'flex w-full items-center justify-center px-4 py-5 sm:justify-between md:h-20 md:px-5 lg:px-8 4xl:px-10',
        className
      )}
    >
      <Image
        src={siteConfig.logo}
        alt={siteConfig.title}
        className="dark:invert"
        priority
      />
    </header>
  );
}
