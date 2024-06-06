'use client';

import { Surface } from '../ui/Surface';
import { Toolbar } from '../ui/Toolbar';
import { Icon } from '../ui/Icon';
import { useTheme } from 'next-themes';

const DarkModeSwitcher = ({ isNav = false }: { isNav?: boolean }) => {
  const { setTheme, theme } = useTheme();
  return (
    <Surface
      className={`fixed bottom-4 right-[calc(50vw-41px)] flex items-center gap-1 ${
        isNav ? 'sm:hidden' : ''
      }
    z-[99999] rounded-[5px] p-1 sm:bottom-5 sm:right-6`}
    >
      <Toolbar.Button
        onClick={() => setTheme('light')}
        active={theme === 'light'}
        className="rounded-[5px]"
      >
        <Icon name="Sun" />
      </Toolbar.Button>
      <Toolbar.Button
        onClick={() => setTheme('dark')}
        active={theme === 'dark'}
        className="rounded-[5px]"
      >
        <Icon name="Moon" />
      </Toolbar.Button>
    </Surface>
  );
};
export default DarkModeSwitcher;
