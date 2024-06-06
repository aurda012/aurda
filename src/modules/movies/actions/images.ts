'use server';

import { axiosClient } from '../api';
import { GetImagesResponse } from '../models/images';

export async function images(variant: 'movie' | 'tv' | 'person', id: number) {
  const { data } = await axiosClient.get<GetImagesResponse>(
    `/${variant}/${id}/images`
  );

  // console.log('INSIDE IMAGES');

  return data;
}
