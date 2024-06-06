'use client';

import { useEffect, useState } from 'react';
import { useDebounce } from '@uidotdev/usehooks';
import { usePathname } from 'next/navigation';

import { useQuery } from '@tanstack/react-query';

import { useLanguage } from '@/modules/movies/context/language';

import { Button } from '@/components/ui/button';
import {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
} from '@/components/ui/command';
import {
  CommandSearchMovie,
  CommandSearchPerson,
  CommandSearchGroup,
  CommandSearchSkeleton,
  CommandSearchTvSerie,
} from '../command-search';
import {
  MovieWithMediaType,
  PersonWithMediaType,
  TvSeriesWithMediaType,
  tmdb,
} from '@/modules/movies/api';
import { CommandSearchIcon } from './command-search-icon';
import { Search } from 'lucide-react';

export const CommandSearch = () => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);
  const pathName = usePathname();
  const { language, dictionary } = useLanguage();

  const { data, isLoading } = useQuery({
    queryKey: ['search', debouncedSearch],
    queryFn: async () => await tmdb.search.multi(debouncedSearch, language),
    staleTime: 1000,
  });

  // useEffect(() => {
  //   const down = (e: KeyboardEvent) => {
  //     if ((e.key === 'k' || e.key === 'K') && (e.metaKey || e.ctrlKey)) {
  //       e.preventDefault();

  //       setOpen((open) => !open);
  //     }
  //   };

  //   document.addEventListener('keydown', down);
  //   return () => document.removeEventListener('keydown', down);
  // }, []);

  useEffect(() => {
    if (open) setOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathName]);

  const [movies, tvSeries, people] = [
    data?.results.filter(
      (result) => result.media_type === 'movie'
    ) as MovieWithMediaType[],

    data?.results.filter(
      (result) => result.media_type === 'tv'
    ) as TvSeriesWithMediaType[],

    data?.results.filter(
      (result) => result.media_type === 'person'
    ) as PersonWithMediaType[],
  ];

  const [hasMovies, hasTvSeries, hasPeople] = [
    Boolean(movies?.length),
    Boolean(tvSeries?.length),
    Boolean(people?.length),
  ];

  const hasResults = hasMovies || hasTvSeries || hasPeople;

  return (
    <>
      <Button
        variant="outline"
        className="mx-auto flex max-w-[325px] flex-1 gap-2 pr-2 text-sm text-muted-foreground md:mx-0 md:justify-between"
        onClick={() => setOpen(true)}
      >
        {dictionary.sidebar_search.search_everything}

        <Search className="h-5 w-5" />
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command>
          <CommandInput
            placeholder={dictionary.sidebar_search.placeholder}
            onValueChange={setSearch}
            value={search}
            className="focus:border-none focus:ring-0"
          />

          <CommandList className="">
            {isLoading && (
              <div className="space-y-8">
                <CommandSearchGroup heading={dictionary.sidebar_search.movies}>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <CommandSearchSkeleton key={index} />
                  ))}
                </CommandSearchGroup>

                <CommandSearchGroup
                  heading={dictionary.sidebar_search.tv_series}
                >
                  {Array.from({ length: 5 }).map((_, index) => (
                    <CommandSearchSkeleton key={index} />
                  ))}
                </CommandSearchGroup>
              </div>
            )}

            {hasResults ? (
              <div className="">
                {hasMovies && (
                  <CommandSearchGroup
                    heading={dictionary.sidebar_search.movies}
                  >
                    {movies?.map((movie) => (
                      <CommandSearchMovie
                        item={movie}
                        language={language}
                        key={movie.id}
                      />
                    ))}
                  </CommandSearchGroup>
                )}

                {hasTvSeries && (
                  <CommandSearchGroup
                    heading={dictionary.sidebar_search.tv_series}
                  >
                    {tvSeries?.map((tvSerie) => (
                      <CommandSearchTvSerie
                        item={tvSerie}
                        language={language}
                        key={tvSerie.id}
                      />
                    ))}
                  </CommandSearchGroup>
                )}

                {hasPeople && (
                  <CommandSearchGroup
                    heading={dictionary.sidebar_search.people}
                  >
                    {people?.map((person) => (
                      <CommandSearchPerson
                        item={person}
                        language={language}
                        key={person.id}
                      />
                    ))}
                  </CommandSearchGroup>
                )}
              </div>
            ) : (
              <p className="p-8 text-center">
                {dictionary.list_command.no_results}
              </p>
            )}
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  );
};
