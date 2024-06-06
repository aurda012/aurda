import { SignedIn, UserButton } from '@clerk/nextjs';
import SettingsButton from '@/components/settings/settings-button';

export default function HeaderMenuRight() {
  return (
    <div className="ms-auto flex shrink-0 items-center gap-2 text-gray-700 xs:gap-3 xl:gap-4">
      <SettingsButton />
      <SignedIn>
        <UserButton
          appearance={{
            elements: {
              avatarBox: 'h-8 w-8',
            },
          }}
        />
      </SignedIn>
    </div>
  );
}
