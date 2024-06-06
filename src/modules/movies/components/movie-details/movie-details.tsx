import { format } from 'date-fns';
import { tmdb } from '@/modules/movies/api';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';

import { Videos } from '@/modules/movies/components/videos';
import { Images } from '@/modules/movies/components/images';
import { Banner } from '@/modules/movies/components/banner';
import { Poster } from '@/modules/movies/components/poster';

import { WatchProviders } from '@/modules/movies/components/watch-providers';
import { Credits } from '@/modules/movies/components/credits';

import { MovieRelated } from './movie-related';
import { MovieCollection } from './movie-collection';

import { getDictionary } from '@/modules/movies/utils/dictionaries';
import { locale } from '@/modules/movies/utils/date/locale';
import { tmdbImage } from '@/modules/movies/utils/tmdb/image';

import { Language } from '@/modules/movies/types/languages';
import { cn } from '@/lib/utils';

type MovieDetailsProps = {
  id: number;
  language: Language;
  embed?: boolean;
};

export const MovieDetails = async ({
  id,
  language,
  embed,
}: MovieDetailsProps) => {
  const movie = await tmdb.movies.details(id, language);
  const dictionary = await getDictionary(language);

  return (
    <div className={cn('mx-auto max-w-6xl', embed ? 'p-0' : 'md:pt-4')}>
      <Banner
        url={tmdbImage(movie.backdrop_path)}
        className={embed ? 'max-h-[20vh] md:max-h-[50vh]' : undefined}
      />

      <div className="mx-auto my-8 max-w-4xl space-y-8 p-4 md:space-y-12 md:p-0">
        <main className="flex flex-col gap-4 md:flex-row">
          <aside className="-mt-24 w-full space-y-2 md:-mt-32 md:w-1/3">
            <Poster url={movie.poster_path} alt={movie.title} />
          </aside>

          <article className="flex w-full flex-col gap-2 md:w-2/3">
            {movie.release_date && (
              <span className="text-xs text-muted-foreground">
                {format(new Date(movie.release_date), 'PPP', {
                  locale: locale[language],
                })}
              </span>
            )}

            <h1 className="text-lg font-bold md:text-4xl">{movie.title}</h1>

            <div className="flex flex-wrap items-center gap-2">
              {movie.genres.length > 0 && (
                <>
                  {movie.genres.map((genre) => {
                    return (
                      <Badge
                        key={genre.id}
                        variant="outline"
                        className="whitespace-nowrap"
                      >
                        {genre.name}
                      </Badge>
                    );
                  })}

                  <Separator orientation="vertical" className="h-6" />
                </>
              )}

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Badge>{movie.vote_average.toFixed(1)}</Badge>
                  </TooltipTrigger>

                  <TooltipContent>
                    <p>{movie.vote_count} votes</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            <p className="text-xs leading-5 text-muted-foreground md:text-sm md:leading-6">
              {movie.overview}
            </p>

            <div className="space-x-1">
              <WatchProviders id={id} variant="movie" language={language} />
            </div>
          </article>
        </main>

        {movie.belongs_to_collection && (
          <MovieCollection
            collectionId={movie.belongs_to_collection.id}
            language={language}
          />
        )}

        <Tabs defaultValue="credits" className="w-full">
          <div className="md:m-none p-none scrollbar-hide -mx-4 max-w-[100vw] overflow-x-scroll px-4">
            <TabsList>
              <TabsTrigger value="credits">
                {dictionary.tabs.credits}
              </TabsTrigger>
              <TabsTrigger value="recommendations">
                {dictionary.tabs.recommendations}
              </TabsTrigger>
              <TabsTrigger value="similar">
                {dictionary.tabs.similar}
              </TabsTrigger>
              <TabsTrigger value="images">{dictionary.tabs.images}</TabsTrigger>
              <TabsTrigger value="videos">{dictionary.tabs.videos}</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="credits" className="mt-4">
            <Credits variant="movie" id={movie.id} language={language} />
          </TabsContent>

          <TabsContent value="recommendations" className="mt-4">
            <MovieRelated
              movieId={movie.id}
              variant="recommendations"
              language={language}
            />
          </TabsContent>

          <TabsContent value="similar" className="mt-4">
            <MovieRelated
              movieId={movie.id}
              variant="similar"
              language={language}
            />
          </TabsContent>

          <TabsContent value="images" className="mt-4">
            <Images tmdbId={movie.id} variant="movie" />
          </TabsContent>

          <TabsContent value="videos" className="mt-4">
            <Videos tmdbId={movie.id} variant="movie" />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
