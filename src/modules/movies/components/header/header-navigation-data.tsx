import {
  Calendar,
  Clapperboard,
  Heart,
  LucideIcon,
  Play,
  Sparkles,
  Star,
  Tv,
  TrendingUp,
} from 'lucide-react';

import { Dictionary } from '../../utils/dictionaries';

type NavigationItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  description?: string;
  items?: NavigationItem[];
};

type buildLanguageNavigation = (dictionary: Dictionary) => NavigationItem[];

export const buildLanguageNavigation: buildLanguageNavigation = (
  dictionary
) => [
  {
    label: dictionary.navigation.movies,
    href: '/movies',
    icon: Clapperboard,
    items: [
      {
        label: dictionary.navigation.discover,
        description: dictionary.navigation.discover_description,
        href: '/movies',
        icon: Sparkles,
      },
      {
        label: 'Trending',
        description:
          "See what's trending! These are the movies everyone is watching right now.",
        href: '/movies/trending',
        icon: TrendingUp,
      },
      {
        label: dictionary.navigation.now_playing,
        description: dictionary.navigation.now_playing_description,
        href: '/movies/now-playing',
        icon: Play,
      },
      {
        label: dictionary.navigation.popular,
        description:
          'See popular movies! These are the movies everyone has watched.',
        href: '/movies/popular',
        icon: Heart,
      },
      {
        label: dictionary.navigation.top_rated,
        description: dictionary.navigation.top_rated_description,
        href: '/movies/top-rated',
        icon: Star,
      },
      {
        label: dictionary.navigation.upcoming,
        description: dictionary.navigation.upcoming_description,
        href: '/movies/upcoming',
        icon: Calendar,
      },
    ],
  },
  {
    label: dictionary.navigation.tv_series,
    href: '/movies/tv-series',
    icon: Tv,
    items: [
      {
        label: dictionary.navigation.discover,
        description: dictionary.navigation.discover_description,
        href: '/movies/tv-series/discover',
        icon: Sparkles,
      },
      {
        label: 'Trending',
        description:
          "See what's trending! These are the shows everyone is watching right now.",
        href: '/movies/tv-series/trending',
        icon: TrendingUp,
      },
      {
        label: dictionary.navigation.airing_today,
        description: dictionary.navigation.airing_today_description,
        href: '/movies/tv-series/airing-today',
        icon: Play,
      },
      {
        label: dictionary.navigation.on_the_air,
        description: dictionary.navigation.on_the_air_description,
        href: '/movies/tv-series/on-the-air',
        icon: Tv,
      },
      {
        label: dictionary.navigation.popular,
        description:
          'See popular shows! These are the shows everyone has watched.',
        href: '/movies/tv-series/popular',
        icon: Heart,
      },
      {
        label: dictionary.navigation.top_rated,
        description: dictionary.navigation.top_rated_description,
        href: '/movies/tv-series/top-rated',
        icon: Star,
      },
    ],
  },
];
