import { TvSeriesList } from '@/modules/movies/components/tv-series-list';
import { getDictionary } from '@/modules/movies/utils/dictionaries';
import { PageProps } from '@/modules/movies/types/languages';
import { Container } from '@/modules/movies/components/container';
import { createMetadata } from '@/config/site';

const OnTheAirTvSeriesPage = async ({ params: { lang } }: PageProps) => {
  const {
    tv_serie_pages: {
      on_the_air: { title, description },
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

      <TvSeriesList variant="on_the_air" />
    </Container>
  );
};

export default OnTheAirTvSeriesPage;

export const metadata = createMetadata(
  'Shows On The Air | dashfusion',
  'Discover shows on the air! Find out what to watch next.',
  ['next.js', 'nextjs', 'tv shows app', 'discover shows', 'shows']
);
