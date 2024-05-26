import { Forms } from "@/components";
import { Center } from "@chakra-ui/react";
import { NextPage } from "next";
import React from "react";
import { auth } from "../lib/auth";

const AuthPage: NextPage = async () => {
  const session = await auth();
  return (
    <div>
      <Center height={"100vh"}>
        <Forms.AuthForm session={session} />
      </Center>
    </div>
  );
};

export default AuthPage;
