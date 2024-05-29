import { Forms } from "@/components";
import { Center } from "@chakra-ui/react";
import { NextPage } from "next";
import React from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
const AuthPage: NextPage = async () => {
  const session = await auth();

  if(!session){
    redirect("/auth/login")
  }else{
    const {user} = session
    if(user && user.emailVerified){
      redirect("/")
    }
  }

  return (
    <div>
      <Center height={"100vh"}>
        <Forms.AuthForm session={session} />
      </Center>
    </div>
  );
};

export default AuthPage;
