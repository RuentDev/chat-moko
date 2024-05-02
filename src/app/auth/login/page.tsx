import { authOptions } from "@/app/auth";
import { Forms } from "@/components";
import { Center } from "@chakra-ui/react";
import { NextPage } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

const LoginPage:NextPage = async () => {
  
  const session = await getServerSession(authOptions)

  if(session) redirect("/auth")

  return (
    <main className="w-full h-screen">
      <Center height={"100vh"}>
        <Forms.LoginForm />
      </Center>
    </main>
  )
};

export default LoginPage;