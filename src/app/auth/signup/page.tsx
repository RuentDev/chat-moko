import { Forms } from "@/components";
import { Center } from "@chakra-ui/react";
import { NextPage } from "next";
import React from "react";


const SignupPage:NextPage = async () => {

  return (
    <div className="w-full h-screen">
      <Center height={"100vh"}>
        <Forms.SignupForm />
      </Center>
    </div>
  )
};

export default SignupPage;