"use client"
import { ChakraProvider } from "@chakra-ui/react"
import theme from "@/chakra/theme"
// 
export const ChakraProviderComponent = ({ children }: { children: React.ReactNode }) => {
  return (
    <ChakraProvider theme={theme}>
      {children}
    </ChakraProvider>
  )
}
