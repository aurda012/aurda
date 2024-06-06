import { MovieList } from '@/modules/movies/components/movie-list';
import { PageProps } from '@/modules/movies/types/languages';
import { getDictionary } from '@/modules/movies/utils/dictionaries';
import { Container } from '@/modules/movies/components/container';
import { createMetadata } from '@/config/site';

const TopRatedMoviesPage = async ({ params: { lang } }: PageProps) => {
  const dictionary = await getDictionary(lang);

  return (
    <Container>
      <div>
        <h1 className="text-2xl font-bold">
          {dictionary.movie_pages.top_rated.title}
        </h1>

        <p className="text-muted-foreground">
          {dictionary.movie_pages.top_rated.description}
        </p>
      </div>

      <MovieList variant="top_rated" language={lang} />
    </Container>
  );
};

export default TopRatedMoviesPage;

export const metadata = createMetadata(
  'Top-Rated Movies | dashfusion',
  'Discover top-rated movies.',
  [
    'next.js',
    'nextjs',
    'movies app',
    'discover movies',
    'movies',
    'top-rated movies',
  ]
);
