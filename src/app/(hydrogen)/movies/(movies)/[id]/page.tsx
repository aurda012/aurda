import { getMoviesPagesIds } from '@/modules/movies/utils/seo/get-movies-pages-ids';

import { MovieDetails } from '@/modules/movies/components/movie-details/movie-details';
import { PageProps } from '@/modules/movies/types/languages';
import { Metadata } from 'next';
import { tmdb } from '@/modules/movies/api';
import { createMetadata } from '@/config/site';

type MoviePageProps = {
  params: { id: string };
} & PageProps;

export async function generateStaticParams({
  params: { lang },
}: MoviePageProps) {
  const moviesIds = await getMoviesPagesIds(lang);

  return moviesIds.map((id) => ({ id }));
}

export async function generateMetadata({
  params: { id },
}: MoviePageProps): Promise<Metadata> {
  const { title, overview } = await tmdb.movies.details(Number(id), 'en-US');

  const keywords = await tmdb.keywords('movie', Number(id));

  const meta = createMetadata(
    `${title} | dashfusion`,
    overview,
    keywords
      ? keywords.map((keyword) => keyword.name)
      : [title, 'movie', 'discover movies']
  );

  return meta;
}

const MoviePage = ({ params }: MoviePageProps) => {
  const { id, lang } = params;

  return <MovieDetails id={Number(id)} language={lang} />;
};

export default MoviePage;
