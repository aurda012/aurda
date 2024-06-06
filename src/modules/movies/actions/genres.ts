'use server';

import { axiosClient } from '../api';
import { GetGenresResponse } from '../models/genres';
import { Language } from '../models/language';

export async function genres(type: 'movie' | 'tv', language: Language) {
  const { data } = await axiosClient.get<GetGenresResponse>(
    `/genre/${type}/list`,
    {
      params: {
        language,
      },
    }
  );

  // console.log('INSIDE GENRES');

  return data;
}
