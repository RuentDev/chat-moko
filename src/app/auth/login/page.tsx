import { auth } from "@/app/lib/auth";
import { Forms } from "@/components";
import { Center } from "@chakra-ui/react";
import { NextPage } from "next";
import { redirect } from "next/navigation";
import React from "react";

const LoginPage: NextPage = async () => {
  const session = await auth();

  if (session) {
    const {user} = session

    if(user && user.emailVerified){
      redirect("/");
    }else{
      redirect("/auth");
    }
  }

  return (
    <main className="w-full h-screen">
      <Center height={"100vh"}>
        <Forms.LoginForm />
      </Center>
    </main>
  );
};

export default LoginPage;
