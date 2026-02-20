'use client';

import { useEffect, useRef, useCallback } from 'react';
import { MessageCircle } from 'lucide-react';

import type { Message } from '@vibeline/types';

import { MessageItem } from '@/src/components/chat/message-item';

type MessageListProps = {
  messages: Message[];
};

const EmptyMessages = () => (
  <div className="flex h-full flex-col items-center justify-center px-4 text-center">
    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-surface-soft">
      <MessageCircle className="h-6 w-6 text-content-muted" />
    </div>
    <h3 className="mt-4 text-sm font-medium text-content-primary">No messages yet</h3>
    <p className="mt-1 text-sm text-content-muted">
      Be the first to start the conversation
    </p>
  </div>
);

const MessageSkeleton = () => (
  <div className="flex gap-3 px-4 py-2">
    <div className="skeleton h-8 w-8 shrink-0 rounded-full" />
    <div className="flex-1 space-y-2">
      <div className="flex items-center gap-2">
        <div className="skeleton h-4 w-24 rounded" />
        <div className="skeleton h-3 w-12 rounded" />
      </div>
      <div className="skeleton h-4 w-3/4 rounded" />
    </div>
  </div>
);

export const MessageList = ({ messages }: MessageListProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const tailRef = useRef<HTMLDivElement>(null);
  const shouldAutoScrollRef = useRef(true);

  const checkShouldAutoScroll = useCallback(() => {
    const container = containerRef.current;
    if (!container) return true;

    const threshold = 100;
    const distanceFromBottom =
      container.scrollHeight - container.scrollTop - container.clientHeight;
    return distanceFromBottom < threshold;
  }, []);

  const scrollToBottom = useCallback((smooth = true) => {
    tailRef.current?.scrollIntoView({
      behavior: smooth ? 'smooth' : 'instant',
      block: 'end'
    });
  }, []);

  useEffect(() => {
    if (shouldAutoScrollRef.current) {
      scrollToBottom();
    }
  }, [messages, scrollToBottom]);

  const handleScroll = useCallback(() => {
    shouldAutoScrollRef.current = checkShouldAutoScroll();
  }, [checkShouldAutoScroll]);

  if (messages.length === 0) {
    return <EmptyMessages />;
  }

  return (
    <div
      ref={containerRef}
      aria-live="polite"
      className="h-full overflow-y-auto"
      onScroll={handleScroll}
      role="log"
    >
      <div className="flex min-h-full flex-col justify-end py-4">
        <div className="space-y-0.5">
          {messages.map((message, index) => {
            const prevMessage = messages[index - 1];
            const showAvatar =
              !prevMessage || prevMessage.authorId !== message.authorId;
            const isFirstInGroup = showAvatar;

            return (
              <MessageItem
                key={message.id}
                message={message}
                showAvatar={showAvatar}
                isFirstInGroup={isFirstInGroup}
              />
            );
          })}
        </div>
        <div ref={tailRef} className="h-px" />
      </div>
    </div>
  );
};

export { MessageSkeleton };
