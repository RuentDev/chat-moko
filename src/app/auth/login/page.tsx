import { Forms } from "@/components";
import { Center } from "@chakra-ui/react";
import { NextPage } from "next";
import React from "react";

const LoginPage:NextPage = async () => {

  return (
    <main className="w-full h-screen">
      <Center height={"100vh"}>
        <Forms.LoginForm />
      </Center>
    </main>
  )
};

export default LoginPage;