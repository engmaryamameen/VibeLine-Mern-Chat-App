'use client';

import { Avatar } from '@vibeline/ui';
import { formatClock } from '@vibeline/utils';
import { cn } from '@vibeline/utils';

import type { Message } from '@vibeline/types';

type MessageItemProps = {
  message: Message;
  showAvatar?: boolean;
  isFirstInGroup?: boolean;
};

export const MessageItem = ({
  message,
  showAvatar = true,
  isFirstInGroup = true
}: MessageItemProps) => (
  <article
    className={cn(
      'group relative flex gap-3 px-4 transition-colors duration-100 hover:bg-surface-hover/50',
      isFirstInGroup ? 'pt-2' : 'pt-0.5'
    )}
  >
    <div className="w-8 shrink-0">
      {showAvatar ? (
        <Avatar name={message.authorId} size="md" />
      ) : (
        <time className="hidden text-[10px] text-content-muted opacity-0 transition-opacity group-hover:opacity-100">
          {formatClock(message.createdAt)}
        </time>
      )}
    </div>

    <div className="min-w-0 flex-1 pb-1">
      {isFirstInGroup && (
        <div className="flex items-baseline gap-2">
          <span className="text-sm font-semibold text-content-primary">
            {message.authorId}
          </span>
          <time className="text-xs text-content-muted">
            {formatClock(message.createdAt)}
          </time>
        </div>
      )}
      <p
        className={cn(
          'text-sm leading-relaxed text-content-primary',
          isFirstInGroup ? 'mt-0.5' : ''
        )}
      >
        {message.body}
      </p>
    </div>
  </article>
);
