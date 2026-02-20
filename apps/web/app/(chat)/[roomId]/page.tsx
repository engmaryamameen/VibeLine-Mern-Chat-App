'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';

import type { Message } from '@vibeline/types';

import { ChatWindow } from '@/src/components/chat/chat-window';
import { ApiError, apiClient } from '@/src/lib/api-client';
import { useAuthStore } from '@/src/store/auth.store';
import { useChatStore } from '@/src/store/chat.store';

const RoomPage = () => {
  const router = useRouter();
  const params = useParams<{ roomId: string }>();
  const roomId = params.roomId;
  const token = useAuthStore((state) => state.token);
  const clearSession = useAuthStore((state) => state.clearSession);
  const clearChat = useChatStore((state) => state.clearChat);
  const setActiveRoom = useChatStore((state) => state.setActiveRoom);
  const setRoomMessages = useChatStore((state) => state.setRoomMessages);

  useEffect(() => {
    if (!roomId) return;
    setActiveRoom(roomId);
  }, [roomId, setActiveRoom]);

  useEffect(() => {
    if (!roomId || !token) return;

    let active = true;
    apiClient<{ messages: Message[] }>(`/rooms/${roomId}/messages`, { token })
      .then((response) => {
        if (!active) return;
        setRoomMessages(roomId, response.messages);
      })
      .catch((error) => {
        if (!active) return;
        if (error instanceof ApiError && error.status === 401) {
          clearChat();
          clearSession();
          router.replace('/login');
        }
      });

    return () => {
      active = false;
    };
  }, [clearChat, clearSession, roomId, router, setRoomMessages, token]);

  if (!roomId) return null;
  return <ChatWindow roomId={roomId} />;
};

export default RoomPage;
