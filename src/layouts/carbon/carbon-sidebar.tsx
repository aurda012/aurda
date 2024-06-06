'use client';

import cn from '@/utils/class-names';
import Link from 'next/link';
import Logo from '@/components/logo';
import ProfileCardMenu from '@/layouts/carbon/profile-card-menu';
import { PiDotsThreeVerticalBold, PiHeadsetBold } from 'react-icons/pi';
import dynamic from 'next/dynamic';
import SimpleBar from 'simplebar-react';
import WorkSpaceSwitcher from '@/layouts/carbon/work-space-switcher';
import { CarbonSidebarMenu } from './carbon-sidebar-menu';

const NeedSupport = dynamic(() => import('@/layouts/carbon/need-support'), {
  ssr: false,
});

export function CarbonSidebar({ className }: { className?: string }) {
  return (
    <aside
      className={cn(
        'fixed bottom-0 start-0 z-50 h-full w-[270px] border-e-2 border-gray-100 bg-white dark:bg-gray-100/50 2xl:w-72',
        className
      )}
    >
      <div className="sticky top-0 z-40 bg-gray-0/10 px-6 pb-5 pt-5 dark:bg-gray-100/5 2xl:px-8 2xl:pt-6">
        <Link
          href={'/'}
          aria-label="Site Logo"
          className="text-gray-800 hover:text-gray-900"
        >
          <Logo className="max-w-[155px]" />
        </Link>
      </div>

      <WorkSpaceSwitcher
        className="px-6 pb-3.5 pt-3.5"
        suffixClassName="text-gray-500 w-5 h-5"
      />

      <SimpleBar
        className={cn(
          'h-[calc(100%-265px)] [&_.simplebar-content]:flex [&_.simplebar-content]:h-full [&_.simplebar-content]:flex-col [&_.simplebar-content]:justify-between'
        )}
      >
        <CarbonSidebarMenu />

        <div className="sticky bottom-0 bg-gray-0 dark:bg-gray-50 ">
          <NeedSupport
            title="Need Support?"
            text="Contact with one of our experts to get support."
            prefixIcon={<PiHeadsetBold className="h-5 w-5 text-gray-400" />}
            className="relative mx-6 before:absolute before:-start-6 before:bottom-full before:end-0 before:h-10 before:w-[calc(100%+48px)] before:bg-gradient-to-t before:from-gray-0 before:to-gray-0/30 before:dark:from-gray-50 before:dark:to-gray-50/30"
          />
        </div>
      </SimpleBar>

      <div className="bg-gray-0 px-6 pb-3 dark:bg-gray-50">
        <ProfileCardMenu
          title="Elsie Burnett"
          designation="Chief Officer"
          placement="top"
          image="https://isomorphic-furyroad.s3.amazonaws.com/public/avatars/avatar-11.webp"
          avatarClassName="!w-10 !h-10"
          icon={
            <PiDotsThreeVerticalBold
              className={cn(
                'h-7 w-7 text-gray-400 transition-all group-hover:text-primary'
              )}
            />
          }
          className={cn('mt-5 px-0 py-0')}
          buttonClassName="border-0 !border-t !border-gray-200 pt-5 px-0 rounded-none"
        />
      </div>
    </aside>
  );
}
