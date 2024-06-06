import { format } from 'date-fns';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import { Banner } from '@/modules/movies/components/banner';
import { Poster } from '@/modules/movies/components/poster';
import { Images } from '@/modules/movies/components/images';
import { Videos } from '@/modules/movies/components/videos';

import { WatchProviders } from '@/modules/movies/components/watch-providers';
import { Credits } from '@/modules/movies/components/credits';

import { TvSerieSeasons } from './tv-serie-seasons';
import { TvSerieRelated } from './tv-serie-related';

import { tmdbImage } from '@/modules/movies/utils/tmdb/image';
import { locale } from '@/modules/movies/utils/date/locale';
import { getDictionary } from '@/modules/movies/utils/dictionaries';

import { Language } from '@/modules/movies/types/languages';
import { cn } from '@/lib/utils';
import { tmdb } from '@/modules/movies/api';

type TvSerieDetailsProps = {
  id: number;
  language: Language;
  embed?: boolean;
};

export const TvSerieDetails = async ({
  id,
  language,
  embed = false,
}: TvSerieDetailsProps) => {
  const tvSerie = await tmdb.tv.details(id, language);
  const dictionary = await getDictionary(language);

  return (
    <div className={cn('mx-auto max-w-6xl md:pt-4', embed && 'pt-0')}>
      <Banner url={tmdbImage(tvSerie.backdrop_path)} />

      <div className="mx-auto my-8 max-w-4xl space-y-8 px-4 md:space-y-12 md:px-0">
        <main className="flex flex-col gap-4 md:flex-row">
          <aside className="-mt-24 w-full space-y-2 md:-mt-32 md:w-1/3">
            <Poster url={tvSerie.poster_path} alt={tvSerie.name} />
          </aside>

          <article className="flex w-full flex-col gap-2 md:w-2/3">
            {tvSerie.first_air_date && (
              <span className="text-xs text-muted-foreground">
                {format(new Date(tvSerie.first_air_date), 'PPP', {
                  locale: locale[language],
                })}
              </span>
            )}

            <h1 className="text-4xl font-bold">{tvSerie.name}</h1>

            <div className="flex flex-wrap items-center gap-1.5">
              {tvSerie.genres.map((genre) => {
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

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Badge>{tvSerie.vote_average.toFixed(1)}</Badge>
                  </TooltipTrigger>

                  <TooltipContent>
                    <p>{tvSerie.vote_count} votes</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            <p className="text-xs leading-5 text-muted-foreground md:text-sm md:leading-6">
              {tvSerie.overview}
            </p>

            <div className="space-x-1">
              <WatchProviders
                id={tvSerie.id}
                variant="tv"
                language={language}
              />
            </div>
          </article>
        </main>

        <Tabs defaultValue="seasons" className="w-full">
          <div className="md:m-none p-none scrollbar-hide -mx-4 max-w-[100vw] overflow-x-scroll px-4">
            <TabsList>
              <TabsTrigger value="seasons">
                {dictionary.tabs.seasons}
              </TabsTrigger>
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

          <TabsContent value="seasons" className="mt-4">
            <TvSerieSeasons
              seasons={tvSerie.seasons}
              id={id}
              language={language}
            />
          </TabsContent>

          <TabsContent value="credits" className="mt-4">
            <Credits variant="tv" id={id} language={language} />
          </TabsContent>

          <TabsContent value="recommendations" className="mt-4">
            <TvSerieRelated
              id={id}
              variant="recommendations"
              language={language}
            />
          </TabsContent>

          <TabsContent value="similar" className="mt-4">
            <TvSerieRelated id={id} variant="similar" language={language} />
          </TabsContent>

          <TabsContent value="images" className="mt-4">
            <Images tmdbId={id} variant="tv" />
          </TabsContent>

          <TabsContent value="videos" className="mt-4">
            <Videos tmdbId={id} variant="tv" />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
