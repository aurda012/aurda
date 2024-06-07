import React from 'react';
import { ChatShare } from './chat-share';

type UserMessageProps = {
  message: string;
  chatId?: string;
  showShare?: boolean;
};

export const UserMessage: React.FC<UserMessageProps> = ({
  message,
  chatId,
  showShare = false,
}) => {
  const enableShare = process.env.ENABLE_SHARE === 'true';
  return (
    <div className="mt-2 flex min-h-10 min-w-full items-center space-x-1">
      <div className="flex-1 text-xl">{message}</div>
      {enableShare && showShare && chatId && <ChatShare chatId={chatId} />}
    </div>
  );
};
