import React, { Suspense } from "react";
import DashboardLoading from "./loading";
import Sidebar from "@/components/Sidebar/Sidebar";
import { auth } from "../../auth";
import { redirect } from "next/navigation";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();

  if(session){
    const {user} = session  
    if(user && !user.emailVerified){
      redirect("/auth")
    }

  }else{
    redirect("/auth/login")
  }

  return (
    <main className="dashboard-layout w-full h-screen flex gap-[2px]">
      <Sidebar />
      <Suspense fallback={<DashboardLoading />}>{children}</Suspense>
    </main>
  );
};

export default DashboardLayout;
