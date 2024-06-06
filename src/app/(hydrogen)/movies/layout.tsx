import { Header } from '@/modules/movies/components/header';
import { LanguageContextProvider } from '@/modules/movies/context/language';
import { QueryWrapper } from '@/modules/movies/context/query';
import { getDictionary } from '@/modules/movies/utils/dictionaries';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export const APP_QUERY_CLIENT = new QueryClient();

export const dynamic = 'force-dynamic';

type MoviesLayoutProps = {
  children: React.ReactNode;
};

export default async function MoviesLayout({ children }: MoviesLayoutProps) {
  const dictionary = await getDictionary('en-US');

  return (
    <QueryWrapper>
      <LanguageContextProvider language="en-US" dictionary={dictionary}>
        <div className="flex flex-col">
          <div className="w-full border-b p-4">
            <div className="mx-auto w-full max-w-6xl">
              <Header dictionary={dictionary} />
            </div>
          </div>

          <main className="w-full">{children}</main>
        </div>
      </LanguageContextProvider>
    </QueryWrapper>
  );
}
