import CredentialsProvider from "next-auth/providers/credentials";
import FacebookProvider from "next-auth/providers/facebook";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { Adapter } from "next-auth/adapters";
import NextAuth, { CredentialsSignin } from "next-auth";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();
const adapter = PrismaAdapter(prisma) as Adapter;

export const { handlers, signIn, signOut, auth } = NextAuth({
  debug: process.env.NODE_ENV !== "production" ? true : false,
  secret: process.env.NEXTAUTH_SECRET as string,
  adapter: adapter,
  pages: {
    signIn: "/auth/login",
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID as string,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      id: "app-login",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials): Promise<any> => {
        try {
          const { email, password }: any = credentials;

          // logic to verify if user exists
          const user = await prisma.user.findUnique({
            where: {
              email: email,
            },
          });

          if (!user || !user.password) {
            return null;
          }
          

          if (!user) {
            // No user found, so this is their first attempt to login
            // meaning this is also the place you could do registration
            throw new Error("User not found.")
          }

          const isPasswordMatched = await bcrypt.compare(password, user.password);

          if (!isPasswordMatched) {
            
            return null
          }

          return user;
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async authorized(params): Promise<boolean> {
      console.log("params.auth", params.auth)
      console.log("params.json", params.request.json())
      return true
    },
    async jwt({ token, trigger, session, account, user }): Promise<any> {
      const userData = {
        ...user,
      };

      return { ...token, ...userData };
    },
    async session({ session, trigger, user, token }): Promise<any> {
      // Send properties to the client, like an access_token and user id from a provider.
      
      const newSession = {
        ...session,
        user: {
          ...session.user,
          ...user,
          ...token,
          password: null,
        },
      };

      return newSession
    },
    
  },
  experimental: {
    enableWebAuthn: true,
  },
  
});
