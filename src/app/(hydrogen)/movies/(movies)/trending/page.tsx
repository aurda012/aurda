import { MovieList } from '@/modules/movies/components/movie-list';
import { PageProps } from '@/modules/movies/types/languages';
import { getDictionary } from '@/modules/movies/utils/dictionaries';
import { Container } from '@/modules/movies/components/container';
import { createMetadata } from '@/config/site';

const TrendingMoviesPage = async ({ params: { lang } }: PageProps) => {
  const dictionary = await getDictionary('en-US');

  return (
    <Container>
      <div>
        <h1 className="text-2xl font-bold">Trending</h1>

        <p className="text-muted-foreground">
          These are the movies everyone is talking about right now.
        </p>
      </div>

      <MovieList variant="trending" language={lang} />
    </Container>
  );
};

export default TrendingMoviesPage;

export const metadata = createMetadata(
  'Trending Movies | dashfusion',
  'Discover movies everyone is watching right now.',
  [
    'next.js',
    'nextjs',
    'movies app',
    'discover movies',
    'movies',
    'trending movies',
  ]
);
