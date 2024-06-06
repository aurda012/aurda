'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import type { AI, UIState } from '@/app/(hydrogen)/ai-search/actions';
import { useUIState, useActions } from 'ai/rsc';
import { cn } from '@/lib/utils';
import { UserMessage } from './user-message';
import { Button } from '@/components/ui/button';
import { ArrowRight, Plus } from 'lucide-react';
import { EmptyScreen } from './empty-screen';
import Textarea from 'react-textarea-autosize';
import { nanoid } from 'ai';

interface ChatPanelProps {
  messages: UIState;
}

export function ChatPanel({ messages }: ChatPanelProps) {
  const [input, setInput] = useState('');
  const [, setMessages] = useUIState<typeof AI>();
  const { submit } = useActions();
  const [isButtonPressed, setIsButtonPressed] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [showEmptyScreen, setShowEmptyScreen] = useState(false);
  const router = useRouter();
  // Focus on input when button is pressed
  useEffect(() => {
    if (isButtonPressed) {
      inputRef.current?.focus();
      setIsButtonPressed(false);
    }
  }, [isButtonPressed]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Clear messages if button is pressed
    if (isButtonPressed) {
      handleClear();
      setIsButtonPressed(false);
    }

    // Add user message to UI state
    setMessages((currentMessages) => [
      ...currentMessages,
      {
        id: nanoid(),
        component: <UserMessage message={input} />,
      },
    ]);

    // Submit and get response message
    const formData = new FormData(e.currentTarget);
    const responseMessage = await submit(formData);
    setMessages((currentMessages) => [
      ...currentMessages,
      responseMessage as any,
    ]);
  };

  // Clear messages
  const handleClear = () => {
    router.push('/ai-search');
  };

  useEffect(() => {
    // focus on input when the page loads
    inputRef.current?.focus();
  }, []);

  // If there are messages and the new button has not been pressed, display the new Button
  if (messages.length > 0 && !isButtonPressed) {
    return (
      <div className="pointer-events-none fixed bottom-2 left-0 right-0 mx-auto flex items-center justify-center md:bottom-8 xl:left-[270px]">
        <Button
          type="button"
          variant={'secondary'}
          className="group pointer-events-auto rounded-full bg-primary/80 transition-all hover:scale-105 hover:bg-primary"
          onClick={() => handleClear()}
        >
          <span className="animate-in fade-in mr-2 hidden text-sm duration-300 group-hover:block">
            New
          </span>
          <Plus size={18} className="transition-all group-hover:rotate-90" />
        </Button>
      </div>
    );
  }

  return (
    <div
      className={
        'ml-[-8vw] flex h-[80vh] w-full flex-col items-center justify-center xs:mx-auto'
      }
    >
      <form onSubmit={handleSubmit} className="w-full max-w-2xl px-6">
        <div className="relative flex w-[80vw] items-center xs:w-[400px]">
          <Textarea
            ref={inputRef}
            name="input"
            rows={1}
            maxRows={5}
            tabIndex={0}
            placeholder="Ask a question..."
            spellCheck={false}
            value={input}
            className="rounded-fill border-input focus-visible:ring-ring disabled:opacity-50' min-h-12 w-full resize-none border bg-muted pb-1 pl-4 pr-10 pt-3 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:border-black/50 focus-visible:outline-none  focus-visible:ring-0 disabled:cursor-not-allowed placeholder:dark:!text-white/65 focus-visible:dark:border-white/65"
            onChange={(e) => {
              setInput(e.target.value);
              setShowEmptyScreen(e.target.value.length === 0);
            }}
            onKeyDown={(e) => {
              // Enter should submit the form
              if (
                e.key === 'Enter' &&
                !e.shiftKey &&
                !e.nativeEvent.isComposing
              ) {
                // Prevent the default action to avoid adding a new line
                e.preventDefault();
                const textarea = e.target as HTMLTextAreaElement;
                textarea.form?.requestSubmit();
              }
            }}
            onHeightChange={(height) => {
              // Ensure inputRef.current is defined
              if (!inputRef.current) return;

              // The initial height and left padding is 70px and 2rem
              const initialHeight = 70;
              // The initial border radius is 32px
              const initialBorder = 32;
              // The height is incremented by multiples of 20px
              const multiple = (height - initialHeight) / 20;

              // Decrease the border radius by 4px for each 20px height increase
              const newBorder = initialBorder - 4 * multiple;
              // The lowest border radius will be 8px
              inputRef.current.style.borderRadius =
                Math.max(8, newBorder) + 'px';
            }}
            onFocus={() => setShowEmptyScreen(true)}
            onBlur={() => setShowEmptyScreen(false)}
          />
          <Button
            type="submit"
            size={'icon'}
            variant={'ghost'}
            className="absolute right-2 top-1/2 -translate-y-1/2 transform"
            disabled={input.length === 0}
          >
            <ArrowRight size={20} />
          </Button>
        </div>
        <EmptyScreen
          submitMessage={(message) => {
            setInput(message);
          }}
          className={cn(showEmptyScreen ? 'visible' : 'invisible')}
        />
      </form>
    </div>
  );
}
