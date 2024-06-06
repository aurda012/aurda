import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Menu, History as HistoryIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import HistoryItem from './history-item';
import { Chat } from '@/modules/ai-search/lib/types';
import { ClearHistory } from './clear-history';

type HistoryProps = {
  location: 'sidebar' | 'header';
  chats: Chat[];
};

export function History({ location, chats }: HistoryProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn({
            'rounded-full text-foreground/70': location === 'sidebar',
          })}
        >
          {location === 'header' ? <Menu /> : <ChevronLeft size={16} />}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-64 rounded-bl-xl rounded-tl-xl">
        <SheetHeader>
          <SheetTitle className="mb-2 flex items-center gap-1 text-sm font-normal">
            <HistoryIcon size={14} />
            History
          </SheetTitle>
        </SheetHeader>
        <div className="my-2 h-[calc(100vh-7.5rem)] overflow-y-auto">
          {!chats?.length ? (
            <div className="py-4 text-center text-sm text-foreground/30">
              No search history
            </div>
          ) : (
            chats?.map(
              (chat: Chat) => chat && <HistoryItem key={chat.id} chat={chat} />
            )
          )}
        </div>
        <SheetFooter>
          <ClearHistory empty={!chats?.length} />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
