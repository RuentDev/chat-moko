import { authOptions } from "@/app/auth";
import { Forms } from "@/components";
import { Center } from "@chakra-ui/react";
import { NextPage } from "next";
import { getServerSession } from "next-auth";
import React from "react";


const SignupPage:NextPage = async () => {

  const session = await getServerSession(authOptions)
  return (
    <div className="w-full h-screen">
      <Center height={"100vh"}>
        <Forms.SignupForm />
      </Center>
    </div>
  )
};

export default SignupPage;