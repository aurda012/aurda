import { Metadata } from 'next';
import logoImg from '@public/logo.svg';
import { LAYOUT_OPTIONS } from '@/config/enums';
import logoIconImg from '@public/logo-short.svg';
import { OpenGraph } from 'next/dist/lib/metadata/types/opengraph-types';
import { ReferrerEnum } from 'next/dist/lib/metadata/types/metadata-types';

enum MODE {
  DARK = 'dark',
  LIGHT = 'light',
}

export const siteConfig = {
  title: 'dashfusion | App Dashboard',
  description: `dashfusion is an all-in-one dashboard filled with fully functional apps. It's a modern, beautiful, and customizable dashboard that showcases the power of development.`,
  logo: logoImg,
  icon: logoIconImg,
  mode: MODE.LIGHT,
  layout: LAYOUT_OPTIONS.HYDROGEN,
  // TODO: favicon
};

export const metaObject = (
  title?: string,
  openGraph?: OpenGraph,
  description: string = siteConfig.description
): Metadata => {
  return {
    title: title ? `${title} | dashfusion` : siteConfig.title,
    description,
    openGraph: openGraph ?? {
      title: title ? `${title} | dashfusion` : title,
      description,
      url: 'https://dashfusion.vercel.app/',
      siteName: 'dashfusion',
      images: {
        url: 'https://dashfusion.vercel.app/og-banner.png',
        width: 1200,
        height: 630,
      },
      locale: 'en_US',
      type: 'website',
    },
  };
};

export const createMetadata = (
  title: string,
  description: string,
  keywords: string[]
) => {
  return {
    generator: 'CodeLounge',
    applicationName: 'CodeLounge',
    referrer: 'origin-when-cross-origin' as ReferrerEnum,
    title: title,
    description: description,
    keywords: keywords,
    metadataBase: new URL('https://codelounge.vercel.app'),
    openGraph: {
      title: title,
      description: description,
      url: 'https://codelounge.vercel.app',
      siteName: 'CodeLounge',
      images: [
        {
          url: 'https://codelounge.vercel.app/images/og-image-1200x628.png', // Must be an absolute URL
          width: 1200,
          height: 628,
          alt: 'CodeLounge OG Image',
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: description,
      images: ['https://codelounge.vercel.app/images/og-image-1200x628.png'], // Must be an absolute URL
    },
    icons: {
      icon: '/images/site-logo.svg',
      shortcut: '/images/favicon-32x32.png',
      apple: '/images/apple-touch-icon.png',
    },
    robots: {
      index: true,
      follow: false,
      nocache: true,
      googleBot: {
        index: true,
        follow: false,
      },
    },
    verification: {
      google: 'google',
      yandex: 'yandex',
      yahoo: 'yahoo',
      other: {
        me: ['my-email', 'my-link'],
      },
    },
    category: 'software',
  };
};
