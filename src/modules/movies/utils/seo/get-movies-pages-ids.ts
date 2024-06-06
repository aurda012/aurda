import { tmdb } from '@/modules/movies/api';

import { Language } from '@/modules/movies/types/languages';

export const homeMovies: Record<Language, string> = {
  'en-US': '27205',
  'es-ES': '1417',
  'fr-FR': '194',
  'de-DE': '582',
  'it-IT': '637',
  'pt-BR': '598',
  'ja-JP': '129',
};

export const getMoviesPagesIds = async (language: Language) => {
  const movieListTypes = [
    'now_playing',
    'popular',
    'top_rated',
    'upcoming',
  ] as const;

  const movieLists = await Promise.all(
    movieListTypes.map((listType) =>
      tmdb.movies.list({ language, list: listType, page: 1 })
    )
  );

  const moviesIds = movieLists.flatMap((movieList) =>
    movieList.results.map((movie) => String(movie.id))
  );

  const combinedIds = [...Object.values(homeMovies), ...moviesIds];
  const uniqueIds = Array.from(new Set(combinedIds));

  return uniqueIds;
};
