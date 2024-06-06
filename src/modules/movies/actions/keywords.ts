'use server';

import { axiosClient } from '../api';
import { GetKeywordsResponse } from '../models/keywords';

export async function keywords(type: 'tv' | 'movie', id: number) {
  const { data } = await axiosClient.get<GetKeywordsResponse>(
    `/${type}/${id}/keywords`
  );

  // console.log('INSIDE KEYWORDS');

  return data.keywords || data.results;
}
