import { PageProps } from '@/modules/movies/types/languages';
import { TvSerieDetails } from '@/modules/movies/components/tv-series-details/tv-serie-details';
import { getTvSeriesPagesIds } from '@/modules/movies/utils/seo/get-tv-series-pages-ids';
import { Metadata } from 'next';
import { tmdb } from '@/modules/movies/api';
import { createMetadata } from '@/config/site';

export type TvSeriePageProps = PageProps & {
  params: { id: string };
};

export async function generateStaticParams({
  params: { lang },
}: TvSeriePageProps) {
  const tvSeriesIds = await getTvSeriesPagesIds(lang);

  return tvSeriesIds.map((id) => ({ id }));
}

export async function generateMetadata({
  params: { id, lang },
}: TvSeriePageProps): Promise<Metadata> {
  const { name, overview } = await tmdb.tv.details(Number(id), lang);

  const keywords = await tmdb.keywords('tv', Number(id));

  const meta = createMetadata(
    `${name} | dashfusion`,
    overview,
    keywords
      ? keywords.map((keyword) => keyword.name)
      : [name, 'movie', 'discover movies']
  );

  return meta;
}

const TvSeriePage = ({ params }: TvSeriePageProps) => {
  return <TvSerieDetails id={Number(params.id)} language={params.lang} />;
};

export default TvSeriePage;
