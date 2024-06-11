import React from "react";
import { auth } from "../../auth";
import { redirect } from "next/navigation";
import NavbarProvider from "@/components/NavbarProvider";
import { CookiesProvider } from 'next-client-cookies/server';

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
      <CookiesProvider>
        {children}
      </CookiesProvider>
    </NavbarProvider>
  );
};

export default DashboardLayout;
