import React, { cache } from 'react';
import { History } from './history';
import { getChats } from '@/modules/ai-search/lib/actions/chat';

type HistoryContainerProps = {
  location: 'sidebar' | 'header';
};
const loadChats = cache(async (userId?: string) => {
  return await getChats(userId);
});

const HistoryContainer: React.FC<HistoryContainerProps> = async ({
  location,
}) => {
  const chats = await loadChats('anonymous');
  return (
    <div className="block sm:hidden">
      <History location={location} chats={chats} />
    </div>
  );
};

export default HistoryContainer;
