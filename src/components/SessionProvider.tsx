import { auth } from "../auth";
import { redirect } from "next/navigation";
import React from "react";

interface SessionProviderProps {
  children: React.ReactNode;
}

const SessionProvider: React.FC<SessionProviderProps> = async ({ children }) => {

  // const session = await auth();

  // if(session){
  //   const {user} = session
  //   // if(user && !user.emailVerified){
  //   //   redirect("/auth")
  //   // }

  //   if(user) {
  //     redirect("/")
  //   }

  // }else{
  //   redirect("/auth/login")
  // }
  
  return <>{children}</>;
};

export default SessionProvider;
