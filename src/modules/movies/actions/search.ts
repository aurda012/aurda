'use server';

import { axiosClient } from '../api';

import { Language } from '../models/language';
import { MovieWithMediaType } from '../models/movie';
import { TvSeriesWithMediaType } from '../models/tv-series';
import { PersonWithMediaType } from '../models/person';

import { ListResponse } from '../utils/list-response';

export async function multi(query: string, language: Language) {
  const { data } = await axiosClient.get<
    ListResponse<
      MovieWithMediaType | TvSeriesWithMediaType | PersonWithMediaType
    >
  >('/search/multi', {
    params: {
      query,
      language,
    },
  });

  // console.log('INSIDE SEARCH MULTI');

  return data;
}
