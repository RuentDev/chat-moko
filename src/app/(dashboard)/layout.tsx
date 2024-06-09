import React from "react";
import Sidebar from "@/components/Sidebars/Sidebar";
import { auth } from "../../auth";
import { redirect } from "next/navigation";
import NavbarProvider from "@/components/NavbarProvider";

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
    <NavbarProvider>
      {children}
    </NavbarProvider>
  );
};

export default DashboardLayout;
