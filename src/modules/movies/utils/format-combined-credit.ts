/* eslint-disable camelcase */
import { CombinedCredit, RawMovieCredit, RawTvSeriesCredit } from '../models';

export const formatCombinedCredit = (
  credit: RawMovieCredit | RawTvSeriesCredit
): CombinedCredit => {
  if ((credit as RawTvSeriesCredit).name) {
    const {
      first_air_date: date,
      id,
      name,
      character,
      vote_average,
      vote_count,
      backdrop_path,
    } = credit as RawTvSeriesCredit;

    return {
      date,
      id,
      title: name,
      media_type: 'tv',
      role: character,
      vote_average,
      vote_count,
      backdrop_path,
    };
  }

  const {
    title,
    id,
    character,
    release_date: date,
    vote_average,
    vote_count,
    backdrop_path,
  } = credit as RawMovieCredit;

  return {
    title,
    id,
    date,

    media_type: 'movie',
    role: character,
    vote_count,
    vote_average,
    backdrop_path,
  };
};
