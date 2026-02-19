import type { ReactNode } from 'react';

import '@/app/globals.css';
import { AdminShell } from '@/src/components/layout/admin-shell';

type RootLayoutProps = {
  children: ReactNode;
};

const RootLayout = ({ children }: RootLayoutProps) => (
  <html lang="en">
    <body>
      <AdminShell>{children}</AdminShell>
    </body>
  </html>
);

export default RootLayout;
