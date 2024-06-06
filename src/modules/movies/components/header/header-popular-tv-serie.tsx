'use client';

import { Language } from '../../types/languages';
import { tmdbImage } from '../../utils/tmdb/image';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';
import { tmdb } from '../../api';

type HeaderPopularTvSerieProps = {
  language: Language;
};

export const HeaderPopularTvSerie = ({
  language,
}: HeaderPopularTvSerieProps) => {
  console.log('Inside HeaderPopularTvSerie');
  const { data, isLoading } = useQuery({
    queryKey: ['trending-tv', language],
    queryFn: async () =>
      await tmdb.tv.trending({
        language,
      }),
  });

  if (!data || isLoading)
    return (
      <Skeleton className="aspect-[2/3] w-1/3 overflow-hidden rounded-md border shadow" />
    );

  const tvSerie = data.results[0];

  return (
    <Link
      className="relative aspect-[2/3] w-1/3 overflow-hidden rounded-md border shadow"
      href={`/movies/tv-series/${tvSerie.id}`}
    >
      <Image src={tmdbImage(tvSerie.poster_path)} alt={tvSerie.name} fill />
    </Link>
  );
};
