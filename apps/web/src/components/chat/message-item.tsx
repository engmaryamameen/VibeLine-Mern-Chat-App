import { Avatar } from '@vibeline/ui';
import { formatClock } from '@vibeline/utils';

import type { Message } from '@vibeline/types';

type MessageItemProps = {
  message: Message;
};

export const MessageItem = ({ message }: MessageItemProps) => (
  <article className="group grid grid-cols-[auto,1fr] gap-3 rounded-xl px-2 py-2 hover:bg-slate-900/40">
    <Avatar name={message.authorId} />

    <div>
      <div className="flex items-center gap-2">
        <p className="text-sm font-semibold">{message.authorId}</p>
        <time className="text-xs text-[rgb(var(--text-secondary))]">{formatClock(message.createdAt)}</time>
      </div>
      <p className="mt-1 text-sm leading-relaxed text-[rgb(var(--text-primary))]">{message.body}</p>
    </div>
  </article>
);
