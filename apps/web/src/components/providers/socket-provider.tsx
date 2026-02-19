'use client';

import type { ReactNode } from 'react';
import { useEffect } from 'react';

import type { Message } from '@vibeline/types';

import { connectSocket, disconnectSocket } from '@/src/lib/socket-client';
import { useAuthStore } from '@/src/store/auth.store';
import { useChatStore } from '@/src/store/chat.store';

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const token = useAuthStore((state) => state.token);
  const appendMessage = useChatStore((state) => state.appendMessage);

  useEffect(() => {
    if (!token) return;

    const socket = connectSocket(token);

    socket.on('message:new', (message: Message) => {
      appendMessage(message);
    });

    return () => {
      socket.removeAllListeners();
      disconnectSocket();
    };
  }, [appendMessage, token]);

  return children;
};
