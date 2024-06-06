'use client';

import { Dictionary } from '../../utils/dictionaries';
import { CommandSearch } from '../command-search';
import { HeaderNavigationMenu } from './header-navigation-menu';
import { HeaderNavigationDrawer } from './header-navigation-drawer';

export const Header = ({ dictionary }: { dictionary: Dictionary }) => {
  return (
    <>
      <header className="hidden justify-between lg:flex">
        <HeaderNavigationMenu dictionary={dictionary} />
        <CommandSearch />
      </header>
      <header className="flex w-full items-center justify-between lg:hidden">
        <HeaderNavigationDrawer />
      </header>
    </>
  );
};
