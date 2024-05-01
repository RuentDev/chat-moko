
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
          <NextAuthProvider>
            <ChakraProviderComponent>
              <ReduxProvider>
                {children}
              </ReduxProvider>
            </ChakraProviderComponent>
          </NextAuthProvider>
        </ApolloProviderComponent>
        <SpeedInsights />
      </body>
    </html >
  );
}
