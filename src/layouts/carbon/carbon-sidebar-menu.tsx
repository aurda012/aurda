import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { ElementType, Fragment, useState } from 'react';
import { carbonMenuItems } from '@/layouts/carbon/carbon-menu-items';
import { Text } from 'rizzui';
import cn from '@/utils/class-names';
import { PiCaretDownBold } from 'react-icons/pi';
import Menu from '@/components/ui/menu/dropdown/menu';
import StatusBadge from '@/components/get-status-badge';
import { SortableList } from '@/components/dnd-sortable/dnd-sortable-list';
import { useColorPresetName } from '@/hooks/use-theme-color';
import { DragEndEvent } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';

export function CarbonSidebarMenu() {
  const pathname = usePathname();
  const [items, setItems] = useState(carbonMenuItems);
  const { colorPresetName } = useColorPresetName();

  function handleChange(event: DragEndEvent) {
    const { active, over } = event;
    if (!active || !over) return;
    const oldIndex = items.findIndex((item) => item.id === active.id);
    const newIndex = items.findIndex((item) => item.id === over.id);
    setItems((items) => arrayMove(items, oldIndex, newIndex));
  }

  return (
    <div className="mb-auto">
      <Text
        as="span"
        className="block px-[25px] pt-5 font-lexend text-xs uppercase text-gray-400 dark:text-gray-600"
      >
        Menu
      </Text>

      <ul className="pb-12">
        <SortableList items={items} onChange={handleChange}>
          {items.map((item, index) => {
            const Icon = item.icon;
            const pathnameExistInDropdowns: boolean = item?.menuItems?.some(
              (dropdownItem) =>
                dropdownItem.href === pathname ||
                dropdownItem.subMenuItems?.some(
                  (subMenuItem) => subMenuItem.href === pathname
                )
            );
            const isDropdownOpen = Boolean(pathnameExistInDropdowns);
            return (
              <Fragment key={'sortable-menu' + item.name + '-' + index}>
                <SortableList.Item id={item.id}>
                  <Menu
                    trigger="hover"
                    placement="right-start"
                    offset={2}
                    closeDelay={0}
                  >
                    <Menu.Trigger>
                      <div
                        className={cn(
                          'group relative mx-3.5 flex grow cursor-pointer items-center justify-between overflow-hidden rounded-md px-3 py-2.5 font-medium transition-all hover:ps-7 lg:my-1 2xl:my-2 2xl:me-5',
                          isDropdownOpen
                            ? 'bg-primary text-gray-0'
                            : 'text-gray-700 transition-all duration-200 hover:bg-gray-100 dark:text-gray-700/90 dark:hover:text-gray-700'
                        )}
                      >
                        <span className="flex items-center">
                          <SortableList.DragHandle
                            className={cn(
                              'inset-t-0 absolute me-1 h-5 w-5 -translate-x-7 text-gray-900 transition-all group-hover:-translate-x-6 [&>svg]:h-[20px] [&>svg]:w-[20px]',
                              isDropdownOpen ? 'text-gray-0' : 'text-gray-900'
                            )}
                          />
                          {Icon && (
                            <span
                              className={cn(
                                'me-2 inline-flex h-6 w-6 items-center justify-center rounded-md transition-all [&>svg]:h-[24px] [&>svg]:w-[24px]',
                                isDropdownOpen
                                  ? 'text-gray-0'
                                  : 'text-gray-400 dark:text-gray-500 dark:group-hover:text-gray-700'
                              )}
                            >
                              <Icon />
                            </span>
                          )}
                          {item.name}
                        </span>

                        <div className="flex items-center transition-all group-hover:gap-1">
                          <PiCaretDownBold
                            strokeWidth={3}
                            className={cn(
                              'h-3.5 w-3.5 -rotate-90 transition-transform duration-200 rtl:rotate-90',
                              isDropdownOpen ? 'text-gray-0' : 'text-gray-900'
                            )}
                          />
                        </div>
                      </div>
                    </Menu.Trigger>
                    <Menu.List className="relative w-[280px] !border-transparent  !px-2 !py-3 after:absolute after:-start-5 after:top-0 after:h-full after:w-5 dark:border-gray-300">
                      {item?.menuItems?.map((dropdownItem, index) => {
                        const isChildActive =
                          pathname === (dropdownItem?.href as string);
                        const pathnameExistInChildDropdowns: any =
                          dropdownItem?.subMenuItems?.filter(
                            (dropdownItem) => dropdownItem.href === pathname
                          );
                        const isChildDropdownActive = Boolean(
                          pathnameExistInChildDropdowns?.length
                        );
                        const DropdownIcon = dropdownItem?.icon;

                        return (
                          <Menu.Item
                            key={'dropdown' + dropdownItem?.name + index}
                            className={cn(
                              'px-0 py-0 transition-all data-[hover=true]:dark:bg-gray-200',
                              isChildDropdownActive &&
                                'bg-gray-100 dark:bg-gray-200'
                            )}
                          >
                            {dropdownItem?.subMenuItems?.length ? (
                              <ul className="w-full">
                                <Menu
                                  trigger="hover"
                                  placement="right-start"
                                  offset={0}
                                  closeDelay={0}
                                >
                                  <Menu.Trigger>
                                    <li
                                      className={cn(
                                        'group relative flex cursor-pointer items-center justify-between rounded-md px-3.5 py-2 font-medium',
                                        isChildDropdownActive
                                          ? 'before:top-2/5 rounded-md bg-gray-100 text-primary before:absolute before:start-0 before:block before:h-4/5 before:w-1 before:rounded-ee-md before:rounded-se-md before:bg-primary dark:bg-gray-200 2xl:before:start-0'
                                          : 'text-gray-700 transition-all duration-200 hover:bg-gray-100 dark:text-gray-700/90 hover:dark:bg-gray-200 dark:hover:text-gray-700'
                                      )}
                                    >
                                      <span className="flex items-center">
                                        {DropdownIcon && (
                                          <span
                                            className={cn(
                                              'me-2 inline-flex h-5 w-5 items-center justify-center rounded-md [&>svg]:h-[20px] [&>svg]:w-[20px]',
                                              isChildDropdownActive
                                                ? 'text-primary'
                                                : 'text-gray-400 dark:text-gray-500 dark:group-hover:text-gray-700'
                                            )}
                                          >
                                            <DropdownIcon />
                                          </span>
                                        )}
                                        {dropdownItem.name}
                                      </span>

                                      <PiCaretDownBold
                                        strokeWidth={3}
                                        className={cn(
                                          'h-3.5 w-3.5 -rotate-90 transition-transform duration-200 rtl:rotate-90',
                                          isChildDropdownActive
                                            ? 'text-primary'
                                            : 'text-gray-900'
                                        )}
                                      />
                                    </li>
                                  </Menu.Trigger>
                                  <Menu.List className="!border-transparent dark:border-gray-300 dark:bg-gray-100">
                                    {dropdownItem?.subMenuItems?.map(
                                      (subMenuItem, index) => {
                                        const isChildActive =
                                          pathname ===
                                          (subMenuItem?.href as string);

                                        return (
                                          <Menu.Item
                                            key={
                                              'sub-menu' +
                                              subMenuItem?.name +
                                              index
                                            }
                                            className="px-0 py-0"
                                          >
                                            <Link
                                              href={subMenuItem?.href}
                                              className={cn(
                                                'relative flex w-full items-center justify-between rounded-md px-3.5 py-2 font-medium capitalize text-gray-900',
                                                isChildActive
                                                  ? 'text-primary'
                                                  : 'text-gray-900 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-200'
                                              )}
                                            >
                                              <span className="flex items-center truncate">
                                                <span className="truncate">
                                                  {subMenuItem?.name}
                                                </span>
                                              </span>
                                              {subMenuItem?.badge?.length ? (
                                                <StatusBadge
                                                  status={subMenuItem?.badge!}
                                                />
                                              ) : null}
                                            </Link>
                                          </Menu.Item>
                                        );
                                      }
                                    )}
                                  </Menu.List>
                                </Menu>
                              </ul>
                            ) : (
                              <MenuLink
                                item={dropdownItem}
                                isChildActive={isChildActive}
                                isDropdownOpen={isDropdownOpen}
                              />
                            )}
                          </Menu.Item>
                        );
                      })}
                    </Menu.List>
                  </Menu>
                </SortableList.Item>
              </Fragment>
            );
          })}
        </SortableList>
      </ul>
    </div>
  );
}

type MenuItemsProps = {
  as?: ElementType;
  item: any;
  isChildActive?: boolean;
  isDropdownOpen?: boolean;
  className?: string;
};

function MenuLink({ item, isChildActive }: MenuItemsProps) {
  const Icon = item?.icon;

  return (
    <Link
      href={item?.href}
      className={cn(
        'relative flex w-full items-center justify-between rounded-md px-3.5 py-2 font-medium capitalize text-gray-900',
        isChildActive
          ? 'before:top-2/5 bg-gray-100 text-primary before:absolute before:-start-2.5 before:block before:h-4/5 before:w-1 before:rounded-ee-md before:rounded-se-md before:bg-primary dark:bg-gray-200 2xl:before:-start-2.5'
          : 'text-gray-900 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-700/90 dark:hover:bg-gray-200'
      )}
    >
      <div className="flex items-center truncate">
        {Icon && (
          <span
            className={cn(
              'me-3 inline-flex h-5 w-5 items-center justify-center rounded-md [&>svg]:h-[20px] [&>svg]:w-[20px]',
              isChildActive
                ? 'text-primary'
                : 'text-gray-400 dark:text-gray-500 dark:group-hover:text-gray-700'
            )}
          >
            <Icon />
          </span>
        )}
        <span className="truncate">{item?.name}</span>
      </div>
      {item?.badge?.length ? <StatusBadge status={item?.badge} /> : null}
    </Link>
  );
}
