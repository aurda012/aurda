'use client';
import { Badge, ActionIcon } from 'rizzui';
import { SignedIn, UserButton } from '@clerk/nextjs';
import cn from '@/utils/class-names';
import MessagesDropdown from '@/layouts/messages-dropdown';
import NotificationDropdown from '@/layouts/notification-dropdown';
// import ProfileMenu from '@/layouts/profile-menu';
import SettingsButton from '@/components/settings/settings-button';
import { PiGearFill, PiChatText, PiBellRinging } from 'react-icons/pi';
import { useColorPresetName } from '@/hooks/use-theme-color';

export default function HeaderMenuRight() {
  const { colorPresetName } = useColorPresetName();

  return (
    <div className="ms-auto flex shrink-0 items-center gap-2 text-gray-700 xs:gap-3 xl:gap-3">
      <SignedIn>
        <UserButton
          appearance={{
            elements: {
              avatarBox: 'h-8 w-8',
            },
          }}
        />
      </SignedIn>
      <SettingsButton
        className={cn(
          'inline-flex h-[unset] w-[unset] gap-2 rounded-md bg-primary-dark px-2.5 py-2 text-gray-200 hover:bg-primary-dark/80 hover:text-gray-200 dark:bg-primary dark:text-gray-0 md:ms-3 md:h-auto md:w-auto xl:ms-4 xl:px-3.5 xl:py-2.5',
          colorPresetName === 'black' &&
            'bg-gray-0 text-gray-900 hover:bg-gray-0 hover:text-gray-900 dark:bg-gray-900 dark:text-gray-0 dark:hover:bg-gray-900 dark:hover:text-gray-0',
          'dark:text-white'
        )}
      >
        <PiGearFill className="h-[18px] w-auto animate-spin-slow xl:h-5" />
        <span className="hidden xl:inline"> Customize</span>
      </SettingsButton>
    </div>
  );
}
