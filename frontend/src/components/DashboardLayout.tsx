import { ReactNode } from "react";
import DashboardSidebar from "./DashboardSidebar";
import MessagesPanel from "./MessagesPanel";
import { useLocation } from "react-router-dom";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <div className="flex h-screen bg-base-200">
      <DashboardSidebar />
      {isHomePage && <MessagesPanel />}
      <main className={`flex-1 overflow-y-auto ${isHomePage ? "ml-[391px]" : "ml-[54px]"}`}>
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;

