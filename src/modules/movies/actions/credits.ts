'use server';

import { axiosClient } from '../api';
import { Credits } from '../models/credits';
import { Language } from '../models/language';

export async function credits(
  variant: 'movie' | 'tv',
  id: number,
  language: Language
) {
  const { data } = await axiosClient.get<Credits>(`/${variant}/${id}/credits`, {
    params: {
      language,
    },
  });

  // console.log('INSIDE CREDITS');

  return data;
}
