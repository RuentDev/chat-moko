import ApolloProviderComponent from "@/components/ApolloProviderComponent";
import { SpeedInsights } from '@vercel/speed-insights/next';
import ReduxProvider from "@/components/ReduxProvider";
const inter = Inter({ subsets: ["latin"] });
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";
import SessionProvider from "@/components/SessionProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth";

export const metadata: Metadata = {
  title: "ChatMoko | Messaging",
  description: "",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions)
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
          <ApolloProviderComponent>
            <ReduxProvider>
              {children}
            </ReduxProvider>
          </ApolloProviderComponent>
        </SessionProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
