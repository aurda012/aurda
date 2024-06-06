import { Season } from '@/modules/movies/api';

import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { Poster } from '@/modules/movies/components/poster';
import { Language } from '@/modules/movies/types/languages';

import { TvSerieSeasonDetails } from './tv-serie-season-details';

type TvSerieSeasonsProps = {
  seasons: Season[];
  id: number;
  language: Language;
};

type TvSerieSeasonProps = { season: Season; id: number; language: Language };
const TvSerieSeason = ({ season, id, language }: TvSerieSeasonProps) => {
  const {
    poster_path: poster,
    name,
    overview,
    vote_average: voteAverage,
    season_number: seasonNumber,
  } = season;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="group cursor-pointer space-y-2">
          <div className="w-full">
            <Poster url={poster} alt={name} />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between space-x-2 space-y-0">
              <h6 className="underline-offset-1.5 text-sm group-hover:underline">
                {name}
              </h6>

              <div>
                <Badge variant="outline">{voteAverage?.toFixed(1)}</Badge>
              </div>
            </div>

            <p className="line-clamp-3 text-xs text-muted-foreground">
              {overview}
            </p>
          </div>
        </div>
      </DialogTrigger>

      <DialogContent className="max-h-[75vh] overflow-y-auto sm:max-w-[1080px]">
        <DialogHeader className="text-start">
          <div className="flex items-center gap-4">
            <DialogTitle>{name}</DialogTitle>
          </div>

          <DialogDescription>{overview}</DialogDescription>
        </DialogHeader>

        <TvSerieSeasonDetails
          seasonNumber={seasonNumber}
          id={id}
          language={language}
        />
      </DialogContent>
    </Dialog>
  );
};

export const TvSerieSeasons = ({
  seasons,
  id,
  language,
}: TvSerieSeasonsProps) => {
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4">
      {seasons.map((season) => (
        <TvSerieSeason
          season={season}
          key={season.id}
          id={id}
          language={language}
        />
      ))}
    </div>
  );
};
