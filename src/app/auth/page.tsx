import { Forms } from "@/components";
import { Center } from "@chakra-ui/react";
import { NextPage } from "next";
import React from "react";
import { auth } from "../lib/auth";
import { redirect } from "next/navigation";

const AuthPage: NextPage = async () => {
  const session = await auth();

  // const router = useRouter

  if (session) {
    const { user } = session;
    if (user.emailVerified) {
      redirect("/");
    }
  } else {
    redirect("/auth/login");
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
