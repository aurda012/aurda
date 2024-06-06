'use client';

import React, { Fragment } from 'react';
import { useNavMenu } from './nav-menu-context';
import cn from '@/utils/class-names';
import { ItemTriggerRef, NavMenuTriggerProps } from './nav-menu-types';

export const NavMenuTrigger = React.forwardRef<
  HTMLButtonElement,
  NavMenuTriggerProps
>(({ triggerType = 'hover', className, children, ...props }, ref) => {
  /*
    REASON OF IGNORING TS ERROR: Noted below. 
    */
  // @ts-ignore
  const { index, ...restProps } = props;

  const { handleMouseEnter: trigger } = useNavMenu();
  const NavMenuButton: React.ElementType = 'li' as React.ElementType;

  function handleClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    props.onClick && props.onClick(e);
    triggerType === 'click' && trigger(index as number, e.currentTarget);
  }

  function handleMouseEnter(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    props.onMouseEnter && props.onMouseEnter(e);
    triggerType === 'hover' && trigger(index as number, e.currentTarget);
  }

  return (
    <NavMenuButton
      ref={ref}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      className={cn('cursor-pointer', className)}
      {...restProps}
    >
      {children}
    </NavMenuButton>
  );
});

NavMenuTrigger.displayName = 'NavMenuTrigger';

type NavMenuTriggerWrapperProps = {
  items: (ItemTriggerRef | null | undefined)[];
  menuClassName?: string;
};

export function NavMenuTriggerWrapper({
  items,
  menuClassName,
}: NavMenuTriggerWrapperProps) {
  const wrapperRef = React.useRef<any>();
  const { set } = useNavMenu();

  React.useEffect(() => {
    set({
      itemWrapperLeft:
        wrapperRef.current.getBoundingClientRect().left + window.scrollX,
      itemWrapperRight:
        wrapperRef.current.getBoundingClientRect().right + window.scrollX,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <menu
      className={cn('nav-menu-trigger-wrapper flex gap-6', menuClassName)}
      ref={wrapperRef}
    >
      {items.map((item, index: number) => {
        return (
          <Fragment key={index}>
            {React.Children.map(item?.component, (child) => {
              if (React.isValidElement(child)) {
                return React.cloneElement(child, {
                  ...item?.props,
                  /*
                  REASON OF IGNORING TS ERROR:
                  We need the index of the individual item in the <NavMenu.Trigger></NavMenu.Trigger> Component internally to handle the content/dropdown slide animation. Users won't need these props. if the user pass this props and we use the user provided index props for our internal logic then the UI interaction might not work properly. in our cases if user passed `index` props , user provided index props will not effect the UI. because we are internally managing this props based on our internal logic. and in typescript project, user will get a typescript error. So, last of all what is happening here? we are here able to passing and getting the Index props internally but user is not able to pass the index props from their end. */
                  // @ts-ignore
                  index: index,
                });
              }
              return null;
            })}
          </Fragment>
        );
      })}
    </menu>
  );
}
