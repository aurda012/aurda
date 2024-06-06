import { tmdb } from '@/modules/movies/api';

import { Language } from '@/modules/movies/types/languages';

export const getTvSeriesPagesIds = async (language: Language) => {
  const tvSeriesListTypes = [
    'airing_today',
    'on_the_air',
    'popular',
    'top_rated',
  ] as const;

  const tvSeriesLists = await Promise.all(
    tvSeriesListTypes.map((listType) =>
      tmdb.tv.list({ language, list: listType, page: 1 })
    )
  );

  const tvSeriesIds = tvSeriesLists.flatMap((movieList) =>
    movieList.results.map((movie) => String(movie.id))
  );

  const uniqueIds = Array.from(new Set(tvSeriesIds));

  return uniqueIds;
};
