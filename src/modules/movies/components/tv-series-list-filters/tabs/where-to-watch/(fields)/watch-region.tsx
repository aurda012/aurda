import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import ReactCountryFlag from 'react-country-flag';
import { useFormContext } from 'react-hook-form';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { useLanguage } from '@/modules/movies/context/language';
import { MoviesListFiltersFormValues } from '@/modules/movies/components/movies-list-filters';
import { tmdb } from '@/modules/movies/api';

type RegionOption = {
  label: string;
  value: string;
};

export const WatchRegion = () => {
  const {
    language,
    dictionary: {
      movies_list_filters: {
        watch_region_field: { label, placeholder },
      },
    },
  } = useLanguage();
  const { control } = useFormContext<MoviesListFiltersFormValues>();

  const { data: regions } = useQuery({
    queryKey: ['available-regions'],
    queryFn: async () =>
      await tmdb.watchProviders.regions({
        language,
      }),
  });

  const regionsOptions: RegionOption[] = useMemo(
    () =>
      regions
        ? regions.map((region) => ({
            label: region.english_name,
            value: region.iso_3166_1,
          }))
        : [],
    [regions]
  );

  return (
    <FormField
      control={control}
      name="watch_region"
      render={({ field: { value } }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>

          <FormControl>
            <Select disabled value={value}>
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>

              <SelectContent>
                {regionsOptions.map((regionOption) => (
                  <SelectItem
                    value={regionOption.value}
                    key={regionOption.value}
                  >
                    <ReactCountryFlag
                      countryCode={regionOption.value}
                      svg
                      className="mr-2"
                    />

                    {regionOption.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
        </FormItem>
      )}
    />
  );
};
