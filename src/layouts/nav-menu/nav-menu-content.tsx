'use client';
import React, { Fragment } from 'react';
import { useNavMenu } from './nav-menu-context';
import cn from '@/utils/class-names';
import { useClientWidth } from '@/hooks/use-client-width';
import type {
  ContentWrapperRounded,
  ContentWrapperShadow,
  ItemContentRef,
  NavMenuContentProps,
} from './nav-menu-types';

export function NavMenuContent({ children }: NavMenuContentProps) {
  return <>{children}</>;
}

NavMenuContent.displayName = 'NavMenuContent';

const menuContentClassNames = {
  base: 'content-wrapper rounded-lg shadow-lg bg-white dark:bg-gray-100 transform-gpu shadow-gray-400/10 overflow-hidden duration-300',
  rounded: {
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    none: 'rounded-none',
  },
  shadow: {
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
    none: 'shadow-none',
  },
};

type NavMenuContentWrapperProps = {
  items: (ItemContentRef | null | undefined)[];
  menuContentClassName?: string;
  fullscreen?: boolean;
  floatingOffset: number;
};

export function NavMenuContentWrapper({
  items,
  menuContentClassName,
  fullscreen = false,
  floatingOffset,
}: NavMenuContentWrapperProps) {
  const clientWidth = useClientWidth();

  const {
    hovering,
    contentRefs,
    contentUiPropsRefs,
    popoverLeft,
    hoveringWidth,
    hoveringElRect,
    popoverHeight,
    popoverWidth,
    dir,
  } = useNavMenu();

  const roundedKey = (contentUiPropsRefs.current[hovering!]?.rounded ||
    'md') as ContentWrapperRounded;
  const shadowKey = (contentUiPropsRefs.current[hovering!]?.shadow ||
    'md') as ContentWrapperShadow;

  const negativeXLtrValue =
    clientWidth - hoveringElRect?.x! - floatingOffset < popoverWidth!
      ? popoverWidth! -
        (clientWidth - hoveringElRect?.x! - floatingOffset)! +
        floatingOffset
      : 0;

  const leftRtl =
    popoverWidth! > hoveringElRect?.x! + hoveringWidth! - floatingOffset
      ? popoverLeft! +
        hoveringWidth! -
        hoveringWidth! -
        hoveringElRect?.x! +
        floatingOffset
      : popoverLeft! + hoveringWidth! - popoverWidth!;

  return (
    <>
      <div
        style={{
          ...{ '--client-width': `${clientWidth}px` },
          ...(!fullscreen
            ? {
                left:
                  dir === 'ltr'
                    ? popoverLeft! - Math.abs(negativeXLtrValue)
                    : leftRtl!,
                width: popoverWidth || 0,
                position: 'absolute',
              }
            : {
                width: 'var(--client-width)',
                position: 'fixed',
                insetInlineStart: 0,
              }),
          transformOrigin: 'top',
          height: popoverHeight || 0,
        }}
        className={cn(
          menuContentClassNames.base,
          menuContentClassNames.rounded[roundedKey],
          menuContentClassNames.shadow[shadowKey],
          menuContentClassName,
          hovering !== null
            ? 'visible scale-y-100 opacity-100 transition-all'
            : 'invisible scale-y-95 opacity-0',
          !items[hovering!]?.component && 'border-none opacity-0 shadow-none'
        )}
      >
        {items.map((item, index) => {
          const uiProps = {
            // @ts-ignore
            rounded: item?.component?.props?.rounded || null,
            // @ts-ignore
            shadow: item?.component?.props?.shadow || null,
          };
          return (
            <Fragment key={index}>
              <Wrapper
                fullscreen={fullscreen}
                hovering={hovering}
                index={index}
              >
                <div
                  ref={(element) => {
                    contentUiPropsRefs.current[index] = uiProps;
                    contentRefs.current[index] = element;
                  }}
                  className={cn(
                    'w-32',
                    // @ts-ignore
                    item?.component?.props?.children?.props?.className
                  )}
                >
                  {/* children of <NavMenu.Content></NavMenu.Content>*/}
                  {/* @ts-ignore */}
                  {item?.component?.props?.children?.props?.children}
                </div>
              </Wrapper>
            </Fragment>
          );
        })}
      </div>
    </>
  );
}

type WrapperProps = {
  children: React.ReactNode;
  hovering: number | null;
  index: number;
  fullscreen: boolean;
};

function Wrapper(props: WrapperProps) {
  return (
    <div
      className={cn(
        'absolute start-0 top-0 w-full overflow-hidden transition-all duration-300 ease-in-out',
        props.hovering === props.index
          ? 'opacity-100'
          : 'pointer-events-none translate-x-0 opacity-0',
        props.hovering === props.index
          ? 'transform-none'
          : props.hovering! > props.index
            ? '-translate-x-1/4'
            : 'translate-x-1/4',
        props.hovering === null && 'translate-x-0 opacity-0'
      )}
    >
      {props.children}
    </div>
  );
}
