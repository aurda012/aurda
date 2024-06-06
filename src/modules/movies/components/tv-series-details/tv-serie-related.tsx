import { TvSerieCard } from '@/modules/movies/components/tv-serie-card';
import { Language } from '@/modules/movies/types/languages';
import { tmdb } from '@/modules/movies/api';

type TvSerieRelatedProps = {
  id: number;
  variant: 'similar' | 'recommendations';
  language: Language;
};

export const TvSerieRelated = async ({
  id,
  variant,
  language,
}: TvSerieRelatedProps) => {
  const { results } = await tmdb.tv.related(id, variant, language);

  return (
    <div className="grid w-full grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-3">
      {results.map((tvSerie) => (
        <TvSerieCard tvSerie={tvSerie} key={tvSerie.id} />
      ))}
    </div>
  );
};
