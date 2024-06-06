import { cache } from 'react';
import { History } from './history';
import { getChats } from '@/modules/ai-search/lib/actions/chat';

const loadChats = cache(async (userId?: string) => {
  return await getChats(userId);
});

export async function Sidebar() {
  const chats = await loadChats('anonymous');
  console.log('history loaded');
  return (
    <div className="fixed right-0 top-0 hidden h-screen flex-col justify-center p-2 pb-24 sm:flex">
      <History location="sidebar" chats={chats} />
    </div>
  );
}
