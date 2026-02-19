'use client';

import { getSocket } from '@/src/lib/socket-client';
import { useChat } from '@/src/hooks/use-chat';
import { MessageInput } from '@/src/components/chat/message-input';
import { MessageList } from '@/src/components/chat/message-list';
import { TypingIndicator } from '@/src/components/chat/typing-indicator';
import { useAuthStore } from '@/src/store/auth.store';
import { useChatStore } from '@/src/store/chat.store';

type ChatWindowProps = {
  roomId: string;
};

export const ChatWindow = ({ roomId }: ChatWindowProps) => {
  const { messages, rooms } = useChat(roomId);
  const appendMessage = useChatStore((state) => state.appendMessage);
  const typingUserIds = useChatStore((state) => state.typingUserIds);
  const userId = useAuthStore((state) => state.currentUser?.id ?? 'you');

  const room = rooms.find((item) => item.id === roomId);

  return (
    <section className="flex h-full flex-col animate-slide-in">
      <header className="border-b border-slate-800 px-4 py-3">
        <h2 className="text-base font-semibold">#{room?.name ?? 'Unknown room'}</h2>
        <p className="text-xs text-[rgb(var(--text-secondary))]">{room?.topic ?? 'Live discussion'}</p>
      </header>

      <div className="min-h-0 flex-1">
        <MessageList messages={messages} />
      </div>

      <TypingIndicator names={typingUserIds} />

      <MessageInput
        onSend={(body) => {
          appendMessage({
            id: crypto.randomUUID(),
            roomId,
            authorId: userId,
            body,
            createdAt: new Date().toISOString()
          });

          getSocket()?.emit('message:send', { roomId, body });
        }}
      />
    </section>
  );
};
