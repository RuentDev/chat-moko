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
import theme from '@/chakra/theme';
import { ColorModeScript } from '@chakra-ui/react';

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

  // console.log(theme.config.initialColorMode)
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <ColorModeScript initialColorMode={theme.config.initialColorMode}/> */}
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
