'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useActions, useStreamableValue, useUIState } from 'ai/rsc';
import { AI } from '@/app/(hydrogen)/ai-search/actions';
import { UserMessage } from './user-message';
import { PartialRelated } from '@/modules/ai-search/lib/schema/related';

export interface SearchRelatedProps {
  relatedQueries: PartialRelated;
}

export const SearchRelated: React.FC<SearchRelatedProps> = ({
  relatedQueries,
}) => {
  const { submit } = useActions();
  const [, setMessages] = useUIState<typeof AI>();
  const [data, error, pending] =
    useStreamableValue<PartialRelated>(relatedQueries);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget as HTMLFormElement);

    // // Get the submitter of the form
    const submitter = (event.nativeEvent as SubmitEvent)
      .submitter as HTMLInputElement;
    let query = '';
    if (submitter) {
      formData.append(submitter.name, submitter.value);
      query = submitter.value;
    }

    const userMessage = {
      id: Date.now(),
      component: <UserMessage message={query} />,
    };

    const responseMessage = await submit(formData);
    setMessages((currentMessages) => [
      ...currentMessages,
      userMessage,
      responseMessage,
    ]);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap">
      {data?.items
        ?.filter((item) => item?.query !== '')
        .map((item, index) => (
          <div className="flex w-full items-start" key={index}>
            <ArrowRight className="text-accent-foreground/50 mr-2 mt-1 h-4 w-4 flex-shrink-0" />
            <Button
              variant="link"
              className="text-accent-foreground/50 h-fit flex-1 justify-start whitespace-normal px-0 py-1 text-left text-[1rem] font-semibold"
              type="submit"
              name={'related_query'}
              value={item?.query}
            >
              {item?.query}
            </Button>
          </div>
        ))}
    </form>
  );
};

export default SearchRelated;
