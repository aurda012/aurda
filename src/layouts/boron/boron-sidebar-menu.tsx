'use client';

import Link from 'next/link';
import { Fragment } from 'react';
import { usePathname } from 'next/navigation';
import { Title, Collapse } from 'rizzui';
import cn from '@/utils/class-names';
import { PiCaretDownBold, PiCommand } from 'react-icons/pi';
import { menuItems } from '@/layouts/boron/boron-menu-items';
import { useBoronKbdShortcuts } from '@/layouts/boron/boron-utils';
import { useColorPresetName } from '@/hooks/use-theme-color';
import { useTheme } from 'next-themes';

export function BoronSidebarMenu() {
  const pathname = usePathname();
  const { theme } = useTheme();
  const { colorPresetName } = useColorPresetName();

  useBoronKbdShortcuts();

  return (
    <div className="mt-4 pb-3 2xl:pt-1.5 3xl:mt-6">
      {menuItems.map((item, index) => {
        const Icon = item.icon;
        const isActive = pathname === (item?.href as string);
        const pathnameExistInDropdowns: any = item?.dropdownItems?.filter(
          (dropdownItem) => dropdownItem.href === pathname
        );
        const isDropdownOpen = Boolean(pathnameExistInDropdowns?.length);

        return (
          <Fragment key={item.name + '-' + index}>
            {item?.href ? (
              <>
                {item?.dropdownItems ? (
                  <Collapse
                    defaultOpen={isDropdownOpen}
                    header={({ open, toggle }) => (
                      <div
                        onClick={toggle}
                        className={cn(
                          'group relative mx-3 flex cursor-pointer items-center justify-between rounded-md px-3 py-2 font-medium lg:my-1 2xl:mx-5 2xl:my-2',
                          isDropdownOpen
                            ? colorPresetName === 'black' && theme === 'dark'
                              ? 'bg-gray-900 text-gray-0'
                              : 'bg-primary text-gray-0'
                            : 'text-gray-700 transition-colors duration-200 hover:bg-gray-100 dark:text-gray-700/90 dark:hover:text-gray-700'
                        )}
                      >
                        <span className="flex items-center">
                          {Icon && (
                            <span
                              className={cn(
                                'me-2 inline-flex h-5 w-5 items-center justify-center rounded-md [&>svg]:h-[20px] [&>svg]:w-[20px]',
                                isDropdownOpen
                                  ? 'text-gray-0'
                                  : 'text-gray-800 dark:text-gray-500 dark:group-hover:text-gray-700'
                              )}
                            >
                              <Icon />
                            </span>
                          )}
                          {item.name}
                        </span>

                        <PiCaretDownBold
                          strokeWidth={3}
                          className={cn(
                            'h-3.5 w-3.5 -rotate-90 transition-transform duration-200 rtl:rotate-90',
                            open && 'rotate-0 rtl:rotate-0',
                            isDropdownOpen
                              ? colorPresetName === 'black' && theme === 'dark'
                                ? 'text-gray-0 dark:text-gray-0'
                                : 'text-gray-0'
                              : 'text-gray-800 dark:text-gray-500 dark:group-hover:text-gray-700'
                          )}
                        />
                      </div>
                    )}
                  >
                    {item?.dropdownItems?.map((dropdownItem, index) => {
                      const isChildActive =
                        pathname === (dropdownItem?.href as string);

                      return (
                        <Link
                          href={dropdownItem?.href}
                          key={dropdownItem?.name + index}
                          className={cn(
                            'mx-3.5 mb-0.5 flex items-center justify-between rounded-md px-3.5 py-2 font-medium capitalize last-of-type:mb-1 lg:last-of-type:mb-2 2xl:mx-5',
                            isChildActive
                              ? 'text-primary'
                              : 'text-gray-500 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-900'
                          )}
                        >
                          <div className="flex items-center truncate">
                            <span
                              className={cn(
                                'me-[18px] ms-1 inline-flex h-1 w-1 rounded-full bg-current transition-all duration-200',
                                isChildActive
                                  ? 'bg-primary ring-[1px] ring-primary'
                                  : 'opacity-40'
                              )}
                            />{' '}
                            <span className="truncate">
                              {dropdownItem?.name}
                            </span>
                          </div>
                        </Link>
                      );
                    })}
                  </Collapse>
                ) : (
                  <Link
                    href={item?.href}
                    className={cn(
                      'group relative mx-3 my-0.5 flex items-center justify-between rounded-md px-3 py-2 font-medium capitalize lg:my-1 2xl:mx-5 2xl:my-2',
                      isActive
                        ? 'bg-primary text-gray-0'
                        : 'text-gray-700 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-700/90'
                    )}
                  >
                    <div className="flex w-full items-center truncate">
                      {Icon && (
                        <span
                          className={cn(
                            'me-2 inline-flex h-5 w-5 items-center justify-center rounded-md duration-200 [&>svg]:h-[20px] [&>svg]:w-[20px]',
                            isActive
                              ? 'text-gray-0'
                              : 'text-gray-800 dark:text-gray-500 dark:group-hover:text-gray-700'
                          )}
                        >
                          <Icon />
                        </span>
                      )}
                      <span className="truncate">{item.name}</span>
                      {!!item.shortcut && (
                        <span
                          className={cn(
                            'ms-auto hidden items-center gap-1 rounded px-1 duration-200 xl:inline-flex',
                            isActive
                              ? 'bg-gray-100/30 dark:bg-gray-0/20'
                              : 'bg-gray-100 group-hover:bg-gray-300'
                          )}
                        >
                          <kbd>
                            <PiCommand
                              strokeWidth={1.3}
                              className="h-[15px] w-[15px]"
                            />
                          </kbd>
                          <kbd>{item.shortcut?.key}</kbd>
                        </span>
                      )}
                    </div>
                  </Link>
                )}
              </>
            ) : (
              <Title
                as="h6"
                className={cn(
                  'mx-6 mb-2 truncate text-xs font-normal uppercase tracking-widest text-gray-500 2xl:mx-8',
                  index !== 0 &&
                    'mt-6 border-t border-gray-100 pt-6 2xl:pt-8 3xl:mt-7'
                )}
              >
                {item.name}
              </Title>
            )}
          </Fragment>
        );
      })}
    </div>
  );
}
