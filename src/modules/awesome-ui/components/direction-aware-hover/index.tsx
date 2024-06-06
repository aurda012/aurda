'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { DirectionAwareHover } from './direction-aware-hover';

export function DirectionAwareHoverDemo() {
  const imageUrl =
    'https://images.unsplash.com/photo-1663765970236-f2acfde22237?q=80&w=3542&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
  return (
    <div className="relative flex  h-[40rem] items-center justify-center">
      <DirectionAwareHover imageUrl={imageUrl}>
        <p className="text-xl font-bold">In the mountains</p>
        <p className="text-sm font-normal">$1299 / night</p>
      </DirectionAwareHover>
    </div>
  );
}
