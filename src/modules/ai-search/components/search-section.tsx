'use client';

import { SearchResults } from './search-results';
import { SearchSkeleton } from './search-skeleton';
import { SearchResultsImageSection } from './search-results-image';
import { Section } from './section';
import { ToolBadge } from './tool-badge';
import type { SearchResults as TypeSearchResults } from '@/modules/ai-search/lib/types';
import { StreamableValue, useStreamableValue } from 'ai/rsc';

export type SearchSectionProps = {
  result?: StreamableValue<string>;
};

export function SearchSection({ result }: SearchSectionProps) {
  const [data, error, pending] = useStreamableValue(result);
  const searchResults: TypeSearchResults | undefined = data
    ? (JSON.parse(data) as TypeSearchResults)
    : undefined;
  return (
    <div>
      {!pending && data && searchResults ? (
        <>
          <Section size="sm" className="pb-0 pt-2">
            <ToolBadge
              className="bg-primary dark:text-white"
              tool="search"
            >{`${searchResults.query}`}</ToolBadge>
          </Section>
          {searchResults.images && searchResults.images.length > 0 && (
            <Section title="Images">
              <SearchResultsImageSection
                images={searchResults.images}
                query={searchResults.query}
              />
            </Section>
          )}
          <Section title="Results">
            <SearchResults results={searchResults.results} />
          </Section>
        </>
      ) : (
        <Section className="pb-0 pt-2">
          <SearchSkeleton />
        </Section>
      )}
    </div>
  );
}
