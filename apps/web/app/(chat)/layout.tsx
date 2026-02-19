import type { ReactNode } from 'react';

import { ChatLayout } from '@/src/components/layout/chat-layout';

type ChatGroupLayoutProps = {
  children: ReactNode;
};

const ChatGroupLayout = ({ children }: ChatGroupLayoutProps) => <ChatLayout>{children}</ChatLayout>;

export default ChatGroupLayout;
