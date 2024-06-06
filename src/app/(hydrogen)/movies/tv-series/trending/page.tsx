import { TvSeriesList } from '@/modules/movies/components/tv-series-list';
import { PageProps } from '@/modules/movies/types/languages';
import { Container } from '@/modules/movies/components/container';
import { createMetadata } from '@/config/site';

const TrendingTvSeriesPage = async ({ params: { lang } }: PageProps) => {
  return (
    <Container>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Trending</h1>
          <p className="text-muted-foreground">
            These are the shows everyone is talking about right now.
          </p>
        </div>
      </div>

      <TvSeriesList variant="trending" />
    </Container>
  );
};

export default TrendingTvSeriesPage;

export const metadata = createMetadata(
  'Trending Shows | dashfusion',
  'Discover top trending shows of the week! Find out what to watch next.',
  ['next.js', 'nextjs', 'tv shows app', 'discover shows', 'shows']
);
