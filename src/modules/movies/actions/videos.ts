'use server';

import { axiosClient } from '../api';
import { GetVideosResponse } from '../models/videos';

type Variant = 'movie' | 'tv';

export async function videos(variant: Variant, id: number) {
  const { data } = await axiosClient.get<GetVideosResponse>(
    `/${variant}/${id}/videos`
  );

  // console.log('INSIDE VIDEOS');

  return data;
}
