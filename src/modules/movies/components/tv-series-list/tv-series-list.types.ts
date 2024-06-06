import { TvSeriesListType } from '@/modules/movies/api';

export type TvSeriesListVariant = TvSeriesListType | 'discover' | 'trending';
export type TvSeriesListProps = {
  variant: TvSeriesListVariant;
};
