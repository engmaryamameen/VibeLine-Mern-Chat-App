import { create } from 'zustand';

import type { Message, Room } from '@vibeline/types';

type MessageMap = Record<string, Message[]>;

type ChatState = {
  rooms: Room[];
  messagesByRoom: MessageMap;
  activeRoomId: string | null;
  typingUserIds: string[];
  setRooms: (rooms: Room[]) => void;
  setRoomMessages: (roomId: string, messages: Message[]) => void;
  setActiveRoom: (roomId: string) => void;
  appendMessage: (message: Message) => void;
  setTypingUsers: (userIds: string[]) => void;
  clearChat: () => void;
};

export const useChatStore = create<ChatState>((set) => ({
  rooms: [],
  messagesByRoom: {},
  activeRoomId: null,
  typingUserIds: [],
  setRooms: (rooms) =>
    set((state) => {
      const hasActiveRoom = state.activeRoomId ? rooms.some((room) => room.id === state.activeRoomId) : false;
      return {
        rooms,
        activeRoomId: hasActiveRoom ? state.activeRoomId : (rooms[0]?.id ?? null)
      };
    }),
  setRoomMessages: (roomId, messages) =>
    set((state) => ({
      messagesByRoom: {
        ...state.messagesByRoom,
        [roomId]: messages
      }
    })),
  setActiveRoom: (roomId) => set({ activeRoomId: roomId }),
  appendMessage: (message) =>
    set((state) => {
      const currentRoomMessages = state.messagesByRoom[message.roomId] ?? [];
      return {
        messagesByRoom: {
          ...state.messagesByRoom,
          [message.roomId]: currentRoomMessages.some((item) => item.id === message.id)
            ? currentRoomMessages
            : [...currentRoomMessages, message]
        }
      };
    }),
  setTypingUsers: (typingUserIds) => set({ typingUserIds }),
  clearChat: () => set({ rooms: [], messagesByRoom: {}, activeRoomId: null, typingUserIds: [] })
}));
