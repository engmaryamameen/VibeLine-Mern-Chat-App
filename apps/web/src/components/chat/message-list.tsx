'use client';

import { useEffect, useRef } from 'react';

import type { Message } from '@vibeline/types';

import { MessageItem } from '@/src/components/chat/message-item';

type MessageListProps = {
  messages: Message[];
};

export const MessageList = ({ messages }: MessageListProps) => {
  const tailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    tailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages]);

  if (messages.length === 0) {
    return (
      <div className="grid h-full place-items-center px-4 text-center text-sm text-[rgb(var(--text-secondary))]">
        No messages yet. Start the thread.
      </div>
    );
  }

  return (
    <div aria-live="polite" className="space-y-1 overflow-y-auto px-4 pb-4 pt-2" role="log">
      {messages.map((message) => (
        <MessageItem key={message.id} message={message} />
      ))}
      <div ref={tailRef} />
    </div>
  );
};
