'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useActions, useUIState } from 'ai/rsc';
import type { AI } from '@/app/(hydrogen)/ai-search/actions';
import { UserMessage } from './user-message';
import { ArrowRight } from 'lucide-react';

export function FollowupPanel() {
  const [input, setInput] = useState('');
  const { submit } = useActions();
  const [, setMessages] = useUIState<typeof AI>();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget as HTMLFormElement);

    const userMessage = {
      id: Date.now(),
      isGenerating: false,
      component: <UserMessage message={input} />,
    };

    const responseMessage = await submit(formData);
    setMessages((currentMessages) => [
      ...currentMessages,
      userMessage,
      responseMessage,
    ]);

    setInput('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative flex items-center space-x-1"
    >
      <Input
        type="text"
        name="input"
        placeholder="Ask a follow-up question..."
        value={input}
        className="h-12 pr-14  focus-visible:border-white focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 dark:placeholder:!text-white/65"
        onChange={(e) => setInput(e.target.value)}
      />
      <Button
        type="submit"
        size={'icon'}
        disabled={input.length === 0}
        variant={'ghost'}
        className="absolute right-1"
      >
        <ArrowRight size={20} />
      </Button>
    </form>
  );
}
