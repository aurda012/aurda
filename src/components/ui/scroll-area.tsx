'use client';

import * as React from 'react';
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';

import { cn } from '@/lib/utils';

interface ScrollAreaProps
  extends React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root> {
  scrollShadow?: boolean;
}

const ScrollArea = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  ScrollAreaProps
>(({ className, children, scrollShadow = true, ...props }, ref) => {
  const [isTopShadowVisible, setIsTopShadowVisible] =
    React.useState<boolean>(false);
  const [isBottomShadowVisible, setIsBottomShadowVisible] =
    React.useState<boolean>(true);

  const handleScroll = (event: React.UIEvent) => {
    const { scrollTop, scrollHeight, clientHeight } = event.currentTarget;
    setIsTopShadowVisible(scrollTop > 0);
    setIsBottomShadowVisible(scrollTop + clientHeight < scrollHeight);
  };

  return (
    <ScrollAreaPrimitive.Root
      ref={ref}
      className={cn('relative overflow-hidden', className)}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport
        className="h-full w-full rounded-[inherit]"
        onScroll={handleScroll}
      >
        {children}
        {scrollShadow && (
          <>
            <div
              className={cn(
                'absolute left-0 right-0 top-0 h-10 w-full rounded-[inherit] bg-gradient-to-b from-background to-transparent opacity-0 transition-opacity',
                {
                  'opacity-100': isTopShadowVisible,
                }
              )}
            />
            <div
              className={cn(
                'absolute bottom-0 left-0 right-0 h-10 w-full rounded-[inherit] bg-gradient-to-t from-background to-transparent opacity-0 transition-opacity',
                {
                  'opacity-100': isBottomShadowVisible,
                }
              )}
            />
          </>
        )}
      </ScrollAreaPrimitive.Viewport>
      <ScrollBar />
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  );
});
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName;

const ScrollBar = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>
>(({ className, orientation = 'vertical', ...props }, ref) => (
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    ref={ref}
    orientation={orientation}
    className={cn(
      'flex touch-none select-none transition-colors',
      orientation === 'vertical' &&
        'h-full w-2.5 border-l border-l-transparent p-[1px]',
      orientation === 'horizontal' &&
        'h-2.5 flex-col border-t border-t-transparent p-[1px]',
      className
    )}
    {...props}
  >
    <ScrollAreaPrimitive.ScrollAreaThumb className="bg-border relative flex-1 rounded-full" />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
));
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName;

export { ScrollArea, ScrollBar };
