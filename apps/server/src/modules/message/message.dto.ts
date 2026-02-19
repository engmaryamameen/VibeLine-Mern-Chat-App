import type { Message } from '@vibeline/types';

export interface SendMessageDto {
  body: string;
}

export interface MessageListResponseDto {
  messages: Message[];
}
