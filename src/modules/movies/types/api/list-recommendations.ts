import { Movie, TvSeries } from '@/modules/movies/api';

export type ListRecommendations = {
  movies: Movie[];
  tv: TvSeries[];
};
