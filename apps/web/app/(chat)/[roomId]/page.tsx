'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';

import { ChatWindow } from '@/src/components/chat/chat-window';
import { useChatStore } from '@/src/store/chat.store';

const RoomPage = () => {
  const params = useParams<{ roomId: string }>();
  const roomId = params.roomId;
  const setActiveRoom = useChatStore((state) => state.setActiveRoom);

  useEffect(() => {
    if (!roomId) return;
    setActiveRoom(roomId);
  }, [roomId, setActiveRoom]);

  if (!roomId) return null;
  return <ChatWindow roomId={roomId} />;
};

export default RoomPage;
