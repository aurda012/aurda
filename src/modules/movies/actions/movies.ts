'use server';

import { axiosClient } from '../api';
import { Language } from '../models/language';
import { Movie, MovieDetails } from '../models/movie';
import { ListResponse } from '../utils/list-response';

/*
|-----------------------------------------------------------------------------
| Details
| 
| References:
| https://developer.themoviedb.org/reference/movie-details
| 
|-----------------------------------------------------------------------------
*/

export async function details(id: number, language: Language) {
  const { data } = await axiosClient.get<MovieDetails>(`/movie/${id}`, {
    params: {
      language,
    },
  });

  // console.log('INSIDE MOVIE DETAILS');

  return data;
}

/*
|-----------------------------------------------------------------------------
| Discover movie
| 
| References:
| https://developer.themoviedb.org/reference/discover-movie
| 
|-----------------------------------------------------------------------------
*/

type DiscoverMovieFilters = Partial<
  Record<
    | 'with_genres'
    | 'release_date.gte'
    | 'release_date.lte'
    | 'with_original_language'
    | 'sort_by'
    | 'with_watch_providers'
    | 'with_keywords'
    | 'watch_region'
    | 'vote_average.gte'
    | 'vote_average.lte'
    | 'vote_count.gte',
    string | null
  >
>;

type DiscoverOptions = {
  language: Language;
  page: number;
  filters: DiscoverMovieFilters;
};

export async function discover(options: DiscoverOptions) {
  const { page, language, filters } = options;

  const { data } = await axiosClient.get<ListResponse<Movie>>(
    `/discover/movie`,
    {
      params: {
        page,
        language,
        ...filters,
      },
    }
  );

  // console.log('INSIDE MOVIE DISCOVER');

  return data;
}

/*
|-----------------------------------------------------------------------------
| Movie lists
| 
| References:
| 1. https://developer.themoviedb.org/reference/movie-now-playing-list
| 2. https://developer.themoviedb.org/reference/movie-popular-list
| 3. https://developer.themoviedb.org/reference/movie-top-rated-list
| 4. https://developer.themoviedb.org/reference/movie-upcoming-list
| 
|-----------------------------------------------------------------------------
*/

type MovieListType = 'popular' | 'now_playing' | 'top_rated' | 'upcoming';
type ListOptions = {
  list: MovieListType;
  language: Language;
  page: number;
};

export async function list(options: ListOptions) {
  const { list, page = 1, language } = options;

  const { data } = await axiosClient.get<ListResponse<Movie>>(
    `/movie/${list}`,
    {
      params: {
        language,
        page,
      },
    }
  );

  // console.log('INSIDE MOVIES LIST');

  return data;
}

/*
|-----------------------------------------------------------------------------
| Trending Movies
| 
| References:
| 1. https://developer.themoviedb.org/reference/trending-movies
| 
|-----------------------------------------------------------------------------
*/

type TrendingOptions = {
  language: Language;
};

export async function trending(options: TrendingOptions) {
  // console.log('INSIDE MOVIES TRENDING');

  const { language } = options;

  const { data } = await axiosClient.get<ListResponse<Movie>>(
    'trending/movie/week',
    {
      params: {
        language,
      },
    }
  );

  return data;
}

/*
|-----------------------------------------------------------------------------
| Movie related (similar & recommendations)
| 
| References:
| 1. https://developer.themoviedb.org/reference/movie-recommendations
| 2. https://developer.themoviedb.org/reference/movie-similar
| 
|-----------------------------------------------------------------------------
*/

type MovieRelatedType = 'recommendations' | 'similar';
type RelatedResponse = ListResponse<Movie>;

export async function related(
  id: number,
  type: MovieRelatedType,
  language: Language
) {
  const { data } = await axiosClient.get<RelatedResponse>(
    `/movie/${id}/${type}`,

    {
      params: {
        language,
      },
    }
  );

  // console.log('INSIDE MOVIES RELATED');

  return data;
}

export { type DiscoverMovieFilters, type MovieListType, type MovieRelatedType };
