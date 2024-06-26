import { SpeedInsights } from "@vercel/speed-insights/next";
import { fonts } from '../font'
import type { Metadata } from "next";
import "./globals.css";
import {
  ApolloProviderComponent,
  ChakraProviderComponent,
  NextAuthProvider,
  ReduxProvider,
} from "@/components";
import ToastContainerProvider from "@/components/ToastContainerProvider";
import { ColorModeScript } from "@chakra-ui/react";
import theme from '@/chakra/theme'

export const metadata: Metadata = {
  title: "ChatMoko | Messaging",
  description: "Free Messaging Application",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={fonts.rubik.variable}>
      <body>
        <ChakraProviderComponent>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <ApolloProviderComponent>
            <NextAuthProvider>
                <ToastContainerProvider>
                  <ReduxProvider>
                    {children}
                  </ReduxProvider>
                </ToastContainerProvider>
            </NextAuthProvider>
          </ApolloProviderComponent>
          <SpeedInsights />
        </ChakraProviderComponent>
      </body>
    </html>
  );
}
