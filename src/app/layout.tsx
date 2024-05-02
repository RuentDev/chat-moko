
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";
import { 
  ApolloProviderComponent, 
  ChakraProviderComponent, 
  NextAuthProvider, 
  ReduxProvider 
} from '@/components';
import { getServerSession } from 'next-auth';
import { authOptions } from './auth';
import { redirect } from 'next/navigation';

const inter = Inter({
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "ChatMoko | Messaging",
  description: "",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <ApolloProviderComponent>
          <ChakraProviderComponent>
            <NextAuthProvider>
                <ReduxProvider>
                  {children}
                </ReduxProvider>
            </NextAuthProvider>
          </ChakraProviderComponent>
        </ApolloProviderComponent>
        <SpeedInsights />
      </body>
    </html >
  );
}
