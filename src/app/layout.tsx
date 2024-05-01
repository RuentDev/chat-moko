import ApolloProviderComponent from "@/components/ApolloProviderComponent";
import FontAwesomeProvider from "@/components/FontAwesomeProviders";
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
            <FontAwesomeProvider>
              <ReduxProvider>
                {children}
              </ReduxProvider>
            </FontAwesomeProvider>
          </ApolloProviderComponent>
        </SessionProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
