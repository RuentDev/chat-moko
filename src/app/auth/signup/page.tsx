import { authOptions } from "@/app/auth";
import { Forms } from "@/components";
import { Center } from "@chakra-ui/react";
import { NextPage } from "next";
import { getServerSession } from "next-auth";
import React from "react";

interface IProps {

};

const SignupPage:NextPage = async (props: IProps) => {

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