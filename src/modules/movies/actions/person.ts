'use server';

import {
  Language,
  PersonDetails,
  PersonWithMediaType,
  axiosClient,
} from '../api';
import {
  CombinedCredits,
  CombinedCreditsResponse,
} from '../models/combined-credits';
import { formatCombinedCredit } from '../utils/format-combined-credit';
import { ListResponse } from '../utils/list-response';

/*
|-----------------------------------------------------------------------------
| Popular
| 
| References:
| https://developer.themoviedb.org/reference/person-popular-list
|
|-----------------------------------------------------------------------------
*/

type PopularPeopleQueryParams = {
  language: Language;
  page: number;
};

export async function popular(queryParams: PopularPeopleQueryParams) {
  const { data } = await axiosClient.get<ListResponse<PersonWithMediaType>>(
    '/person/popular',
    {
      params: {
        ...queryParams,
      },
    }
  );

  // console.log('INSIDE PERSON POPULAR');

  return JSON.parse(JSON.stringify(data));
}

/*
|-----------------------------------------------------------------------------
| Details
| 
| References:
| https://developer.themoviedb.org/reference/person-details
|
|-----------------------------------------------------------------------------
*/

export async function details(personId: number, language: Language) {
  const { data } = await axiosClient.get<PersonDetails>(`/person/${personId}`, {
    params: {
      language,
    },
  });

  // console.log('INSIDE PERSON DETAILS');

  return JSON.parse(JSON.stringify(data));
}

/*
|-----------------------------------------------------------------------------
| Combined credits
| 
| References:
| https://developer.themoviedb.org/reference/person-details
|
|-----------------------------------------------------------------------------
*/

export async function combinedCredits(personId: number, language: Language) {
  const { data } = await axiosClient.get<CombinedCreditsResponse>(
    `/person/${personId}/combined_credits`,
    {
      params: {
        language,
      },
    }
  );

  const formattedResponse: CombinedCredits = {
    cast: data.cast.map((credit) => formatCombinedCredit(credit)),
    crew: data.cast.map((credit) => formatCombinedCredit(credit)),
  };

  // console.log('INSIDE PERSON COMBINED CREDITS');

  return formattedResponse;
}
