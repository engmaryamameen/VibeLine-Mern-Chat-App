import type { ReactNode } from 'react';

import { AuthGuard } from '@/src/components/auth/auth-guard';
import { ChatLayout } from '@/src/components/layout/chat-layout';

type ChatGroupLayoutProps = {
  children: ReactNode;
};

const ChatGroupLayout = ({ children }: ChatGroupLayoutProps) => (
  <AuthGuard mode="protected">
    <ChatLayout>{children}</ChatLayout>
  </AuthGuard>
);

export default ChatGroupLayout;
