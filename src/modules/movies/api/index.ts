import axios from 'axios';
import {
  credits,
  genres,
  images,
  keywords,
  languages,
  videos,
} from '../actions';
import { movies } from './movies';
import { collections } from './collections';
import { tv } from './tv';
import { person } from './person';
import { search } from './search';
import { season } from './season';
import { watchProviders } from './watch-providers';

const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

export const axiosClient = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${TMDB_API_KEY}`,
  },
});

export const tmdb = {
  collections,
  credits,
  genres,
  images,
  keywords,
  languages,
  movies,
  search,
  season,
  tv,
  videos,
  watchProviders,
  person,
};

export * from '../models';
export * from '../actions';
export {
  type DiscoverMovieFilters,
  type MovieListType,
  type MovieRelatedType,
} from '../actions/movies';
export {
  type TvSeriesListType,
  type DiscoverTvSeriesFilters,
} from '../actions/tv-series';
