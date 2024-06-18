import React from "react";
import { auth } from "../../auth";
import { redirect } from "next/navigation";
import NavbarProvider from "@/components/NavbarProvider";
import { CookiesProvider } from 'next-client-cookies/server';
import { Container } from "@chakra-ui/react";

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
    <Container 
      p={0} 
      m={0} 
      maxW="100%" 
      height="100vh" 
      border={0}
    >
      <NavbarProvider>
        <CookiesProvider>
          {children}
        </CookiesProvider>
      </NavbarProvider>
    </Container>
  );
};

export default DashboardLayout;
