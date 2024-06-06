'use server';

import { axiosClient } from '../api';
import { GetLanguagesResponse } from '../models/language';

export async function languages() {
  const { data } = await axiosClient.get<GetLanguagesResponse>(
    '/configuration/languages'
  );

  // console.log('INSIDE LANGUAGES');

  return data;
}
