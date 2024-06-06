import type { Metadata, Viewport } from 'next';
import { Sidebar } from '@/modules/ai-search/components/sidebar';
import { Toaster } from '@/components/ui/sonner';

const title = 'AI Search Engine';
const description =
  'A fully open-source AI-powered answer engine with a generative UI.';

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
  },
  twitter: {
    title,
    description,
    card: 'summary_large_image',
    creator: '@miiura',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
      <Sidebar />
      <Toaster />
    </>
  );
}
