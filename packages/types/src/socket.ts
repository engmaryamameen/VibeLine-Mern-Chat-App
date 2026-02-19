import type { Message, Room } from './chat';

export interface ClientToServerEvents {
  'room:join': (payload: { roomId: string }) => void;
  'room:leave': (payload: { roomId: string }) => void;
  'message:send': (payload: { roomId: string; body: string }) => void;
  'typing:start': (payload: { roomId: string }) => void;
  'typing:stop': (payload: { roomId: string }) => void;
}

export interface ServerToClientEvents {
  'message:new': (payload: Message) => void;
  'room:created': (payload: Room) => void;
  'typing:update': (payload: { roomId: string; userId: string; isTyping: boolean }) => void;
}
