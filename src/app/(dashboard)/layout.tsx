import React, { Suspense } from "react";
import DashboardLoading from "./loading";
import Sidebar from "@/components/Sidebar/Sidebar";
import { SessionProvider } from "@/components";
const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="dashboard-layout w-full h-screen flex gap-[2px]">
      <Sidebar />
      <Suspense fallback={<DashboardLoading />}>
        <SessionProvider>{children}</SessionProvider>
      </Suspense>
    </main>
  );
};

export default DashboardLayout;
