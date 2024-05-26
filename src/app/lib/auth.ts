import { PrismaAdapter } from "@auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";
import { Adapter } from "next-auth/adapters";
import NextAuth from "next-auth";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();
const adapter = PrismaAdapter(prisma) as Adapter;

export const { handlers, signIn, signOut, auth } = NextAuth({
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

          const isPasswordMatched = bcrypt.compare(password, user.password);

          if (!isPasswordMatched) {
            return null;
          }

          return user;
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }): Promise<any> {
      const userData = {
        ...user,
      };

      return { ...token, ...userData };
    },
    async session({ session, trigger, newSession, user, token }): Promise<any> {
      // Send properties to the client, like an access_token and user id from a provider.
      return {
        ...session,
        user: {
          ...session.user,
          ...user,
          ...token,
          password: null,
          verification_code: null,
        },
      };
    },
  },
});
