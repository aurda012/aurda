'use server';

import { axiosClient } from '../api';
import { Language } from '../models/language';

export async function details(id: number, language: Language) {
  const { data } = await axiosClient.get(`/collection/${id}`, {
    params: {
      language,
    },
  });

  // console.log('INSIDE COLLECTION DETAILS');

  return data;
}
