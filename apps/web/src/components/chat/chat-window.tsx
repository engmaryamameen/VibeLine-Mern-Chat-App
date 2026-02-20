'use client';

import { Hash, Users } from 'lucide-react';

import type { Message } from '@vibeline/types';

import { useChat } from '@/src/hooks/use-chat';
import { MessageInput } from '@/src/components/chat/message-input';
import { MessageList } from '@/src/components/chat/message-list';
import { TypingIndicator } from '@/src/components/chat/typing-indicator';
import { ApiError, apiClient } from '@/src/lib/api-client';
import { useAuthStore } from '@/src/store/auth.store';
import { useChatStore } from '@/src/store/chat.store';

type ChatWindowProps = {
  roomId: string;
};

export const ChatWindow = ({ roomId }: ChatWindowProps) => {
  const { messages, rooms } = useChat(roomId);
  const appendMessage = useChatStore((state) => state.appendMessage);
  const clearChat = useChatStore((state) => state.clearChat);
  const typingUserIds = useChatStore((state) => state.typingUserIds);
  const token = useAuthStore((state) => state.token);
  const clearSession = useAuthStore((state) => state.clearSession);

  const room = rooms.find((item) => item.id === roomId);

  const handleSend = async (body: string) => {
    if (!token) return;

    try {
      const response = await apiClient<{ message: Message }>(`/rooms/${roomId}/messages`, {
        method: 'POST',
        body: { body },
        token
      });
      appendMessage(response.message);
    } catch (error) {
      if (error instanceof ApiError && error.status === 401) {
        clearChat();
        clearSession();
      }
    }
  };

  return (
    <div className="flex h-full flex-col animate-fade-in">
      <header className="flex h-12 shrink-0 items-center justify-between border-b border-border bg-surface-panel px-4">
        <div className="flex items-center gap-2">
          <Hash className="h-4 w-4 text-content-muted" />
          <div>
            <h2 className="text-sm font-semibold text-content-primary">
              {room?.name ?? 'Unknown'}
            </h2>
          </div>
          {room?.topic && (
            <>
              <span className="text-content-muted">·</span>
              <p className="text-sm text-content-secondary">{room.topic}</p>
            </>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-content-secondary transition-colors hover:bg-surface-hover hover:text-content-primary"
          >
            <Users className="h-3.5 w-3.5" />
            <span>Members</span>
          </button>
        </div>
      </header>

      <div className="min-h-0 flex-1 overflow-hidden">
        <MessageList messages={messages} />
      </div>

      <TypingIndicator names={typingUserIds} />

      <MessageInput onSend={handleSend} />
    </div>
  );
};
