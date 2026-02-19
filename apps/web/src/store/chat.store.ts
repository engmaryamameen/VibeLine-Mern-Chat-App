import { create } from 'zustand';

import type { Message, Room } from '@vibeline/types';

const seedRooms: Room[] = [
  {
    id: 'general',
    name: 'General',
    topic: 'Company-wide updates',
    memberCount: 18,
    createdAt: new Date().toISOString()
  },
  {
    id: 'design',
    name: 'Design Reviews',
    topic: 'UI critiques and experiments',
    memberCount: 7,
    createdAt: new Date().toISOString()
  }
];

type MessageMap = Record<string, Message[]>;

type ChatState = {
  rooms: Room[];
  messagesByRoom: MessageMap;
  activeRoomId: string | null;
  typingUserIds: string[];
  setActiveRoom: (roomId: string) => void;
  appendMessage: (message: Message) => void;
  setTypingUsers: (userIds: string[]) => void;
};

const seededMessages: MessageMap = {
  general: [
    {
      id: 'm-1',
      roomId: 'general',
      authorId: 'u-1',
      body: 'Welcome to VibeLine 2.0.',
      createdAt: new Date(Date.now() - 5 * 60000).toISOString()
    }
  ],
  design: []
};

export const useChatStore = create<ChatState>((set) => ({
  rooms: seedRooms,
  messagesByRoom: seededMessages,
  activeRoomId: 'general',
  typingUserIds: [],
  setActiveRoom: (roomId) => set({ activeRoomId: roomId }),
  appendMessage: (message) =>
    set((state) => ({
      messagesByRoom: {
        ...state.messagesByRoom,
        [message.roomId]: [...(state.messagesByRoom[message.roomId] ?? []), message]
      }
    })),
  setTypingUsers: (typingUserIds) => set({ typingUserIds })
}));
