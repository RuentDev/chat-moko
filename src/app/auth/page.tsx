import { Forms } from "@/components";
import { Center } from "@chakra-ui/react";
import { NextPage } from "next";
import React from "react";
// import { authOptions } from "../auth";
// import { getServerSession } from "next-auth/next";
// import { redirect } from "next/navigation";


const AuthPage:NextPage = async () => {
  // const session = await getServerSession(authOptions)
  
  // if(session){
  //   const isVerfied = session.user.emailVerified
  //   if(isVerfied) {
  //     redirect("/auth/login")
  //   }
  // }

  return (
    <Center height={"100vh"}>
      {/* <Forms.AuthForm session={session} /> */}
    </Center>
  )
};

export default AuthPage;