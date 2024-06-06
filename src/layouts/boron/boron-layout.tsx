import BoronHeader from '@/layouts/boron/boron-header';
import BoronSidebar from '@/layouts/boron/boron-sidebar';
import Footer from '../footer';

export default function BoronLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen flex-grow">
      <BoronSidebar className="fixed hidden dark:bg-gray-50 xl:block" />
      <BoronHeader />
      <div className="flex w-full flex-col xl:ms-[270px] xl:w-[calc(100%-270px)] 2xl:ms-72 2xl:w-[calc(100%-288px)]">
        <div className="flex min-h-[90vh] flex-grow flex-col justify-between px-4 pb-1 pt-[82px] sm:pt-[92px] md:px-5 lg:px-6 2xl:pt-[104px] 3xl:px-8 3xl:pt-28 4xl:px-10">
          {children}
          <Footer />
        </div>
      </div>
    </main>
  );
}
