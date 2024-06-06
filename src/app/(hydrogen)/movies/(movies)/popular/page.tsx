import { MovieList } from '@/modules/movies/components/movie-list';
import { PageProps } from '@/modules/movies/types/languages';
import { getDictionary } from '@/modules/movies/utils/dictionaries';
import { Container } from '@/modules/movies/components/container';
import { createMetadata } from '@/config/site';

const PopularMoviesPage = async ({ params: { lang } }: PageProps) => {
  const dictionary = await getDictionary(lang);

  return (
    <Container>
      <div>
        <h1 className="text-2xl font-bold">
          {dictionary.movie_pages.popular.title}
        </h1>

        <p className="text-muted-foreground">
          {dictionary.movie_pages.popular.description}
        </p>
      </div>

      <MovieList variant="popular" language={lang} />
    </Container>
  );
};

export default PopularMoviesPage;

export const metadata = createMetadata(
  'Popular Movies | dashfusion',
  'Discover movies based on popularity.',
  [
    'next.js',
    'nextjs',
    'movies app',
    'discover movies',
    'movies',
    'popular movies',
  ]
);
