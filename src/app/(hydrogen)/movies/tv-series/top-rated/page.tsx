import { getDictionary } from '@/modules/movies/utils/dictionaries';
import { PageProps } from '@/modules/movies/types/languages';
import { TvSeriesList } from '@/modules/movies/components/tv-series-list';
import { Container } from '@/modules/movies/components/container';
import { createMetadata } from '@/config/site';

const TopRatedTvSeriesPage = async ({ params: { lang } }: PageProps) => {
  const {
    tv_serie_pages: {
      top_rated: { title, description },
    },
  } = await getDictionary(lang);

  return (
    <Container>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="text-muted-foreground">{description}</p>
        </div>
      </div>

      <TvSeriesList variant="top_rated" />
    </Container>
  );
};

export default TopRatedTvSeriesPage;

export const metadata = createMetadata(
  'Top-Rated Shows | dashfusion',
  'Discover top rated shows! Find out what to watch next.',
  ['next.js', 'nextjs', 'tv shows app', 'discover shows', 'shows']
);
