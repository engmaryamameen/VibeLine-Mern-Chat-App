export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto extends LoginDto {
  displayName: string;
}

export interface CreateRoomDto {
  name: string;
  topic?: string;
}

export interface SendMessageDto {
  roomId: string;
  body: string;
}
