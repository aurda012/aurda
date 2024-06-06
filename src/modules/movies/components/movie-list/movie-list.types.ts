import { Language } from '../../types/languages';
import { MovieListType } from '../../api';

export type MovieListVariant = MovieListType | 'discover' | 'trending';
export type MovieListProps = {
  variant: MovieListVariant;
  language: Language;
};
