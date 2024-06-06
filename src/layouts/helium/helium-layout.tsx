import Header from '@/layouts/helium/helium-header';
import Sidebar from '@/layouts/helium/helium-sidebar';
import Footer from '../footer';

export default function HeliumLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen flex-grow">
      <Sidebar className="fixed hidden dark:bg-gray-50 xl:block" />
      <div className="flex w-full flex-col xl:ms-[270px] xl:w-[calc(100%-270px)] 2xl:ms-72 2xl:w-[calc(100%-288px)]">
        <Header />
        <div className="flex min-h-[90vh] flex-grow flex-col justify-between px-4 pb-2 pt-2 md:px-5 lg:px-6 lg:pb-2 xl:pl-3 2xl:pl-6 3xl:px-8 3xl:pl-6 3xl:pt-4 4xl:px-10 4xl:pb-4 4xl:pl-9">
          {children}
          <Footer />
        </div>
      </div>
    </main>
  );
}
