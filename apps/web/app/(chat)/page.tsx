'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { EmptyChatState } from '@/src/components/chat/empty-chat-state';
import { useChatStore } from '@/src/store/chat.store';

const ChatLandingPage = () => {
  const router = useRouter();
  const rooms = useChatStore((state) => state.rooms);

  useEffect(() => {
    const firstRoom = rooms[0];
    if (!firstRoom) return;
    router.replace(`/${firstRoom.id}`);
  }, [rooms, router]);

  return <EmptyChatState />;
};

export default ChatLandingPage;
