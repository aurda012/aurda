'use client';

import { ClerkProvider } from '@clerk/nextjs';
import { useTheme } from 'next-themes';
import { dark } from '@clerk/themes';
import DarkModeSwitcher from '@/components/common/dark-mode-switcher';
import Header from './header';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { theme } = useTheme();

  return (
    // <ClerkProvider
    //   appearance={{
    //     baseTheme: theme === 'dark' ? dark : undefined,
    //     elements: {
    //       formFieldInput: 'rounded-md bg-background border-primary',
    //       formButtonPrimary: 'bg-primary',
    //       footerActionLink: 'hover:text-primary',
    //     },
    //   }}
    // >
    <>
      {/* <Header /> */}
      <div className="flex h-full w-full flex-col items-center justify-center gap-8 pb-12 pt-6 sm:pb-4">
        <h2 className="text-center text-lg font-bold">
          {`This Demo Requires An Account. Sign Up and test it out! It doesn't
          bite.`}
        </h2>
        {children}
        {/* <DarkModeSwitcher /> */}
      </div>
    </>
    // </ClerkProvider>
  );
}
