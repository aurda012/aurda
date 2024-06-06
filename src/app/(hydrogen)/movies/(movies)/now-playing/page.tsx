import { MovieList } from '@/modules/movies/components/movie-list';
import { PageProps } from '@/modules/movies/types/languages';
import { getDictionary } from '@/modules/movies/utils/dictionaries';
import { Container } from '@/modules/movies/components/container';
import { createMetadata } from '@/config/site';

const NowPlayingMoviesPage = async ({ params: { lang } }: PageProps) => {
  const dictionary = await getDictionary('en-US');

  return (
    <Container>
      <div>
        <h1 className="text-2xl font-bold">
          {dictionary.movie_pages.now_playing.title}
        </h1>

        <p className="text-muted-foreground">
          {dictionary.movie_pages.now_playing.description}
        </p>
      </div>

      <MovieList variant="now_playing" language={lang} />
    </Container>
  );
};

export default NowPlayingMoviesPage;

export const metadata = createMetadata(
  'Movies Now Playing | dashfusion',
  'Discover movies playing in theaters now.',
  [
    'next.js',
    'nextjs',
    'movies app',
    'discover movies',
    'movies',
    'now-playing',
    'theaters',
  ]
);
