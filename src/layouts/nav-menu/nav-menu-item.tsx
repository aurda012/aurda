'use client';
import React from 'react';
import cn from '@/utils/class-names';
import { NavMenuTrigger, NavMenuTriggerWrapper } from './nav-menu-trigger';
import { NavMenuContent, NavMenuContentWrapper } from './nav-menu-content';
import { useNavMenu } from './nav-menu-context';
import { ItemRef } from './nav-menu-types';

type NavMenuItemProps = {
  children: React.ReactNode;
};

export function NavMenuItem({ children }: NavMenuItemProps) {
  return (
    <>
      {React.Children.map(children, (child) => {
        if (
          React.isValidElement(child) &&
          (child.type === NavMenuTrigger || child.type === NavMenuContent)
        ) {
          return child;
        }
        return null;
      })}
    </>
  );
}

NavMenuItem.displayName = 'NavMenuItem';

type NavMenuItemWrapperProps = {
  className?: string;
  menuClassName?: string;
  menuContentClassName?: string;
  children: React.ReactNode;
  fullscreen: boolean;
  floatingOffset: number;
};

export function NavMenuItemWrapper(props: NavMenuItemWrapperProps) {
  const {
    className,
    menuClassName,
    menuContentClassName,
    children,
    fullscreen,
    floatingOffset,
  } = props;
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const { items, set } = useNavMenu();

  React.Children.map(children, (child, idx) => {
    const itemObj: ItemRef = {
      trigger: { component: null, props: null },
      content: { component: null, props: null },
    };

    if (
      React.isValidElement(child) &&
      child.props &&
      child.props.children &&
      child.props.children.length
    ) {
      child?.props?.children?.map((item: React.ReactNode) => {
        if (React.isValidElement(item)) {
          if (item.type === NavMenuTrigger) {
            itemObj.trigger.component = item;
            itemObj.trigger.props = item.props;
          } else if (item.type === NavMenuContent) {
            itemObj.content.component = item;
            itemObj.content.props = item.props;
          }
        }
      });
      items.current[idx] = itemObj;
    } else if (
      React.isValidElement(child) &&
      child.props &&
      // @ts-ignore
      child.props.children
    ) {
      // @ts-ignore
      const item = child.props.children;
      if (item.type === NavMenuTrigger) {
        itemObj.trigger.component = item;
        itemObj.trigger.props = item.props;
      } else if (item.type === NavMenuContent) {
        itemObj.content.component = item;
        itemObj.content.props = item.props;
      }
      items.current[idx] = itemObj;
    }
  });

  const triggers = items.current.map((item) => item?.trigger);
  const contents = items.current.map((item) => item?.content);

  // console.log({ triggers, contents });

  return (
    <nav
      className={cn('relative', className)}
      ref={wrapperRef}
      onMouseLeave={() => set({ hovering: null })}
    >
      <NavMenuTriggerWrapper menuClassName={menuClassName} items={triggers} />
      <NavMenuContentWrapper
        floatingOffset={floatingOffset}
        fullscreen={fullscreen}
        menuContentClassName={menuContentClassName}
        items={contents}
      />
    </nav>
  );
}
