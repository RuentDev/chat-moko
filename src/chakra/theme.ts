import { ThemeConfig, extendTheme, ComponentStyleConfig, defineStyleConfig } from "@chakra-ui/react"

const config: ThemeConfig = {
  initialColorMode: "dark",
}

const theme = extendTheme({
  fonts: {
    heading: 'var(--font-rubik)',
    body: 'var(--font-rubik)',
  },
  colors: {
    brand: {
      100: "#2C3E61",
    },
  },
  styles: {
    global: () => {
      body: {
        bg: "whiteAlpha.200"
      }
    }
  },
})

export default theme;