'use server';

import { axiosClient } from '../api';
import { Language } from '../models/language';
import { SeasonDetails } from '../models/season';

export async function details(
  seriesId: number,
  seasonNumber: number,
  language: Language
) {
  const { data } = await axiosClient.get<SeasonDetails>(
    `/tv/${seriesId}/season/${seasonNumber}`,
    {
      params: {
        language,
      },
    }
  );

  // console.log('INSIDE SEASON DETAILS');

  return data;
}
