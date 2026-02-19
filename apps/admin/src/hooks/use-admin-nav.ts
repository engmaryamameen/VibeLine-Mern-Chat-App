import { usePathname } from 'next/navigation';

export const useAdminNav = () => {
  const pathname = usePathname();

  return {
    isDashboard: pathname === '/dashboard',
    isUsers: pathname === '/users',
    isReports: pathname === '/reports'
  };
};
