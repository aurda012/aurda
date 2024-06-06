import { Chat } from '@/modules/ai-search/components/chat';
import { nanoid } from 'ai';
import { AI } from './actions';

export const maxDuration = 60;

export default function Page() {
  const id = nanoid();
  return (
    <AI initialAIState={{ chatId: id, messages: [] }}>
      <Chat id={id} />
    </AI>
  );
}
