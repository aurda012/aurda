'use client';

import { ClerkProvider } from '@clerk/nextjs';
import { LAYOUT_OPTIONS } from '@/config/enums';
import { dark } from '@clerk/themes';
import { useLayout } from '@/hooks/use-layout';
import HydrogenLayout from '@/layouts/hydrogen/layout';
import HeliumLayout from '@/layouts/helium/helium-layout';
import BerylLiumLayout from '@/layouts/beryllium/beryllium-layout';

import { useIsMounted } from '@/hooks/use-is-mounted';
import LithiumLayout from '@/layouts/lithium/lithium-layout';
import CarbonLayout from '@/layouts/carbon/carbon-layout';
import BoronLayout from '@/layouts/boron/boron-layout';
import { useTheme } from 'next-themes';

type LayoutProps = {
  children: React.ReactNode;
};

export default function DefaultLayout({ children }: LayoutProps) {
  return <LayoutProvider>{children}</LayoutProvider>;
}

function LayoutProvider({ children }: LayoutProps) {
  const { theme } = useTheme();
  const { layout } = useLayout();
  const isMounted = useIsMounted();

  if (!isMounted) {
    return null;
  }

  if (layout === LAYOUT_OPTIONS.HELIUM) {
    return (
      <ClerkProvider
        appearance={{
          baseTheme: theme === 'dark' ? dark : undefined,
          elements: {
            formFieldInput: 'rounded-md bg-background border-primary',
            formButtonPrimary: 'bg-primary',
            footerActionLink: 'hover:text-primary',
          },
        }}
      >
        {' '}
        <HeliumLayout>{children}</HeliumLayout>
      </ClerkProvider>
    );
  }
  // if (layout === LAYOUT_OPTIONS.LITHIUM) {
  //   return (
  //     <ClerkProvider>
  //       <LithiumLayout>{children}</LithiumLayout>
  //     </ClerkProvider>
  //   );
  // }
  // if (layout === LAYOUT_OPTIONS.BERYLLIUM) {
  //   return (
  //     <ClerkProvider>
  //       <BerylLiumLayout>{children}</BerylLiumLayout>
  //     </ClerkProvider>
  //   );
  // }
  if (layout === LAYOUT_OPTIONS.BORON) {
    return (
      <ClerkProvider
        appearance={{
          baseTheme: theme === 'dark' ? dark : undefined,
          elements: {
            formFieldInput: 'rounded-md bg-background border-primary',
            formButtonPrimary: 'bg-primary',
            footerActionLink: 'hover:text-primary',
          },
        }}
      >
        {' '}
        <BoronLayout>{children}</BoronLayout>
      </ClerkProvider>
    );
  }
  // if (layout === LAYOUT_OPTIONS.CARBON) {
  //   return (
  //     <ClerkProvider>
  //       <CarbonLayout>{children}</CarbonLayout>
  //     </ClerkProvider>
  //   );
  // }

  return (
    <ClerkProvider
      appearance={{
        baseTheme: theme === 'dark' ? dark : undefined,
        elements: {
          formFieldInput: 'rounded-md bg-background border-primary',
          formButtonPrimary: 'bg-primary',
          footerActionLink: 'hover:text-primary',
        },
      }}
    >
      {' '}
      <HydrogenLayout>{children}</HydrogenLayout>
    </ClerkProvider>
  );
}
