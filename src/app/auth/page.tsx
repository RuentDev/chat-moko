import { Forms } from "@/components";
import { Center } from "@chakra-ui/react";
import { NextPage } from "next";
import React from "react";
import { authOptions } from "../auth";
import { getServerSession } from "next-auth/next";


const AuthPage:NextPage = async () => {
  const session = await getServerSession(authOptions)
  return (
    <Center height={"100vh"}>
      <Forms.AuthForm session={session} />
    </Center>
  )
};

export default AuthPage;