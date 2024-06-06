'use client';

import SimpleBar from '@/components/ui/simplebar';
import LayoutSwitcher from '@/components/settings/layout-switcher';
import ColorOptions from '@/components/settings/color-options';
import ThemeSwitcher from '@/components/settings/theme-switcher';

export default function SettingsDrawer() {
  return (
    <>
      <SimpleBar className="h-[calc(100%-138px)]">
        <div className="px-5 py-6">
          <ThemeSwitcher />
          <LayoutSwitcher />
          <ColorOptions />
        </div>
      </SimpleBar>
    </>
  );
}
