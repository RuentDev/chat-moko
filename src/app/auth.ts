import NextAuth, { NextAuthOptions } from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import GoogleProvider from "next-auth/providers/google";
// import GitHubProvider from "next-auth/providers/github";
import { Adapter } from "next-auth/adapters";

const prisma = new PrismaClient()

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      
    }),
    // GitHubProvider({
    //   clientId: "",
    //   clientSecret: "",
    // })
  ],
  secret: process.env.NEXTAUTH_SECRET as string,
}

export const handler = NextAuth(authOptions)