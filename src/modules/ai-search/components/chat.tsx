'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { ChatPanel } from './chat-panel';
import { ChatMessages } from './chat-messages';
import { useUIState, useAIState } from 'ai/rsc';

type ChatProps = {
  id?: string;
};

export function Chat({ id }: ChatProps) {
  const router = useRouter();
  const path = usePathname();
  const [messages] = useUIState();
  const [aiState] = useAIState();

  useEffect(() => {
    if (!path.includes('search') && messages.length === 1) {
      window.history.replaceState({}, '', `/search/${id}`);
    }
  }, [id, path, messages]);

  useEffect(() => {
    if (aiState.messages[aiState.messages.length - 1]?.type === 'followup') {
      // Refresh the page to chat history updates
      router.refresh();
    }
  }, [aiState, router]);

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col space-y-3 px-3 pb-2 pt-2 sm:px-12 md:space-y-4 md:pb-6 md:pt-6">
      <ChatMessages messages={messages} />
      <ChatPanel messages={messages} />
    </div>
  );
}
