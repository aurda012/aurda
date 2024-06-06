'use client';
import { Avatar, Button, Popover, Title, Text } from 'rizzui';
import cn from '@/utils/class-names';
import { ReactNode, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { routes } from '@/config/routes';
import Link from 'next/link';
import { Placement } from '@floating-ui/react';

type ProfileCardMenuProps = {
  className?: string;
  buttonClassName?: string;
  avatarClassName?: string;
  placement?: Placement;
  icon?: ReactNode;
  title?: string;
  designation?: string;
  initial?: string;
  image?: string;
};

const menuItems = [
  {
    name: 'My Profile',
    href: routes.profile,
  },
  {
    name: 'Account Settings',
    href: routes.forms.profileSettings,
  },
  {
    name: 'Activity Log',
    href: '#',
  },
];

function DropdownMenu({
  image,
  initial,
  title,
  designation,
}: ProfileCardMenuProps) {
  return (
    <div className="w-64 text-left rtl:text-right">
      <div className="flex items-center border-b border-gray-300 px-6 pb-5 pt-6">
        <Avatar
          src={image && image}
          name={title! && title}
          initials={initial && initial}
        />
        <div className="ms-3">
          {title && (
            <Title as="h6" className="font-semibold">
              {title}
            </Title>
          )}
          {designation && <Text className="text-gray-600">{designation}</Text>}
        </div>
      </div>
      <div className="grid px-3.5 py-3.5 font-medium text-gray-700">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="group my-0.5 flex items-center rounded-md px-2.5 py-2 hover:bg-gray-100 focus:outline-none hover:dark:bg-gray-50/50"
          >
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function ProfileCardMenu({
  className,
  buttonClassName,
  avatarClassName,
  placement = 'bottom-start',
  icon,
  title,
  designation,
  image,
  initial = 'P',
}: ProfileCardMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      <div className={cn('px-6 py-5', className)}>
        <Popover
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          shadow="sm"
          placement={placement}
        >
          <Popover.Trigger>
            <Button
              variant="outline"
              className={cn(
                'flex-items-center group flex h-auto w-full max-w-full justify-between gap-3 border-2 border-gray-100 px-5 py-3.5 text-left',
                buttonClassName
              )}
            >
              <span className="flex items-center gap-3">
                <div>
                  <Avatar
                    src={image && image}
                    name={title!}
                    initials={initial && initial}
                    size="sm"
                    className={cn(avatarClassName)}
                  />
                </div>
                <span className="flex max-w-[120px] flex-col">
                  {title && (
                    <Title
                      as="h6"
                      className="text-sm font-semibold text-gray-900"
                    >
                      {title}
                    </Title>
                  )}
                  {designation && (
                    <Text className="truncate text-gray-600">
                      {designation}
                    </Text>
                  )}
                </span>
              </span>
              {icon && icon}
            </Button>
          </Popover.Trigger>

          <Popover.Content className="z-[9999] p-0 dark:bg-gray-100 [&>svg]:dark:fill-gray-100">
            <DropdownMenu
              image={image}
              initial={initial}
              title={title}
              designation={designation}
            />
          </Popover.Content>
        </Popover>
      </div>
    </>
  );
}
