import { useMemo } from 'react';

import { useChatStore } from '@/src/store/chat.store';

export const useChat = (roomId?: string) => {
  const rooms = useChatStore((state) => state.rooms);
  const messagesByRoom = useChatStore((state) => state.messagesByRoom);

  const messages = useMemo(() => {
    if (!roomId) return [];
    return messagesByRoom[roomId] ?? [];
  }, [messagesByRoom, roomId]);

  return {
    rooms,
    messages
  };
};
