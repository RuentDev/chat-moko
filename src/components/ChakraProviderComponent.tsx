"use client"
import { ChakraProvider } from "@chakra-ui/react"
import theme from "@/chakra/theme"

const ChakraProviderComponent = ({ children }: { children: React.ReactNode }) => {
  return (
    <ChakraProvider theme={theme}>
      {children}
    </ChakraProvider>
  )
}
export default ChakraProviderComponent
