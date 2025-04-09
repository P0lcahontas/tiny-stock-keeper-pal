
import { ReactNode } from "react";
import Navbar from "@/components/layout/Navbar";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-gradient-to-br from-secondary to-white">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
