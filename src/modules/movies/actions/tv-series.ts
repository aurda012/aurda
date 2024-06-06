'use server';

import { Language } from '../models/language';
import { axiosClient } from '../api';
import { TvSeries, TvSeriesDetails } from '../models/tv-series';
import { ListResponse } from '../utils/list-response';

/*
|-----------------------------------------------------------------------------
| Details
| 
| References:
| https://developer.themoviedb.org/reference/tv-series-details
| 
|-----------------------------------------------------------------------------
*/

export async function details(id: number, language: Language) {
  const { data } = await axiosClient.get<TvSeriesDetails>(`/tv/${id}`, {
    params: {
      language,
    },
  });

  // console.log('INSIDE TV DETAILS');

  return data;
}

/*
|-----------------------------------------------------------------------------
| Discover
| 
| References:
| https://developer.themoviedb.org/reference/discover-tv
| 
|-----------------------------------------------------------------------------
*/

type DiscoverTvSeriesFilters = Partial<
  Record<
    | 'air_date.gte'
    | 'air_date.lte'
    | 'sort_by'
    | 'with_genres'
    | 'with_original_language'
    | 'with_keywords'
    | 'with_watch_providers'
    | 'watch_region'
    | 'vote_average.gte'
    | 'vote_average.lte'
    | 'vote_count.gte',
    string | null
  >
>;

type DiscoverTvSeriesOptions = {
  language: Language;
  page: number;
  filters?: DiscoverTvSeriesFilters;
};

export async function discover(options: DiscoverTvSeriesOptions) {
  const { page, language, filters } = options;

  const { data } = await axiosClient.get<ListResponse<TvSeries>>(
    `/discover/tv`,
    {
      params: {
        page,
        language,
        ...filters,
      },
    }
  );

  // console.log('INSIDE TV DISCOVER');

  return data;
}

/*
|-----------------------------------------------------------------------------
| List
| 
| References:
| https://developer.themoviedb.org/reference/tv-series-airing-today-list
| https://developer.themoviedb.org/reference/tv-series-on-the-air-list
| https://developer.themoviedb.org/reference/tv-series-popular-list
| https://developer.themoviedb.org/reference/tv-series-top-rated-list
| 
|-----------------------------------------------------------------------------
*/

type TvSeriesListType = 'airing_today' | 'on_the_air' | 'popular' | 'top_rated';

type ListQueryParams = {
  list: TvSeriesListType;
  language: Language;
  page: number;
};

export async function list(params: ListQueryParams) {
  const { list, language, page } = params;

  const { data } = await axiosClient.get<ListResponse<TvSeries>>(
    `/tv/${list}`,
    {
      params: {
        language,
        page,
      },
    }
  );

  // console.log('INSIDE TV LIST');

  return data;
}

/*
|-----------------------------------------------------------------------------
| Trending
| 
| References:
| https://developer.themoviedb.org/reference/trending-tv
| 
|-----------------------------------------------------------------------------
*/

type TrendingOptions = {
  language: Language;
};

export async function trending(params: TrendingOptions) {
  const { language } = params;

  const { data } = await axiosClient.get<ListResponse<TvSeries>>(
    '/trending/tv/week',
    {
      params: {
        language,
      },
    }
  );

  // console.log('INSIDE TV TRENDING');

  return data;
}

/*
|-----------------------------------------------------------------------------
| Related
| 
| References:
| https://developer.themoviedb.org/reference/tv-series-recommendations
| https://developer.themoviedb.org/reference/tv-series-similar
| 
|-----------------------------------------------------------------------------
*/

export async function related(
  id: number,
  type: 'recommendations' | 'similar',
  language: Language
) {
  const { data } = await axiosClient.get<ListResponse<TvSeries>>(
    `/tv/${id}/${type}`,

    {
      params: {
        language,
      },
    }
  );

  // console.log('INSIDE TV RELATED');

  return data;
}

export { type TvSeriesListType, type DiscoverTvSeriesFilters };
