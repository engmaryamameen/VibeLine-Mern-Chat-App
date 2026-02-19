import type { ReactNode } from 'react';

import '@/app/globals.css';
import { SocketProvider } from '@/src/components/providers/socket-provider';
import { ThemeProvider } from '@/src/components/providers/theme-provider';

type RootLayoutProps = {
  children: ReactNode;
};

const RootLayout = ({ children }: RootLayoutProps) => (
  <html lang="en" suppressHydrationWarning>
    <body>
      <ThemeProvider>
        <SocketProvider>{children}</SocketProvider>
      </ThemeProvider>
    </body>
  </html>
);

export default RootLayout;
