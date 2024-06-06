import { tmdb } from '@/modules/movies/api';

import { MovieCollectionDialog } from './movie-collection-dialog';

import { tmdbImage } from '@/modules/movies/utils/tmdb/image';
import { getDictionary } from '@/modules/movies/utils/dictionaries';

import { Language } from '@/modules/movies/types/languages';
type MovieCollectionProps = {
  collectionId: number;
  language: Language;
};

export const MovieCollection = async ({
  collectionId,
  language,
}: MovieCollectionProps) => {
  const collection = await tmdb.collections.details(collectionId, language);
  const backdropURL = tmdbImage(collection.backdrop_path);
  const dictionary = await getDictionary(language);

  return (
    <div className="relative h-[40vh] overflow-hidden rounded-md border p-6 md:p-8">
      <div
        style={{
          backgroundImage: `url('${backdropURL}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        className="absolute left-0 top-0 -z-10 h-full w-full brightness-[25%]"
      />

      <div className="flex h-full flex-col justify-end space-y-4">
        <div className="flex flex-col">
          <span className="text-xs text-white md:text-sm">
            {dictionary.movie_collection.part_of}
          </span>

          <span className="text-lg font-bold text-white md:text-2xl">
            {collection.name}
          </span>
        </div>

        <div className="mt-2">
          <MovieCollectionDialog collection={collection} />
        </div>
      </div>
    </div>
  );
};
