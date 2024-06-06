import { TvSeriesList } from '@/modules/movies/components/tv-series-list';
import { TvSeriesListFilters } from '@/modules/movies/components/tv-series-list-filters';
import { PageProps } from '@/modules/movies/types/languages';
import { getDictionary } from '@/modules/movies/utils/dictionaries';
import { Container } from '@/modules/movies/components/container';
import { createMetadata } from '@/config/site';

const DiscoverTvSeriesPage = async ({ params: { lang } }: PageProps) => {
  const {
    tv_serie_pages: {
      discover: { title, description },
    },
  } = await getDictionary(lang);

  return (
    <Container>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="text-muted-foreground">{description}</p>
        </div>

        <TvSeriesListFilters />
      </div>

      <TvSeriesList variant="discover" />
    </Container>
  );
};

export default DiscoverTvSeriesPage;

export const metadata = createMetadata(
  'Discover Shows | dashfusion',
  'Discover shows based on your unique filters! Find out what to watch next.',
  ['next.js', 'nextjs', 'tv shows app', 'discover shows', 'shows']
);
