import { PageProps } from '@/modules/movies/types/languages';
import { getDictionary } from '@/modules/movies/utils/dictionaries';
import { MoviesListFilters } from '@/modules/movies/components/movies-list-filters';
import { MovieList } from '@/modules/movies/components/movie-list';
import { Metadata } from 'next';
import { Container } from '@/modules/movies/components/container';
import { createMetadata } from '@/config/site';

const DiscoverMoviesPage = async () => {
  const dictionary = await getDictionary('en-US');

  return (
    <Container>
      <div className="flex items-center justify-between gap-2">
        <div>
          <h1 className="text-2xl font-bold">
            {dictionary.movie_pages.discover.title}
          </h1>

          <p className="text-muted-foreground">
            {dictionary.movie_pages.discover.description}
          </p>
        </div>

        <MoviesListFilters />
      </div>

      <MovieList variant="discover" language={'en-US'} />
    </Container>
  );
};

export default DiscoverMoviesPage;

export const metadata = createMetadata(
  'Discover Movies | dashfusion',
  'Discover movies based on your unique filters.',
  ['next.js', 'nextjs', 'movies app', 'discover', 'movies']
);
