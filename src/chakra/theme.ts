import { ThemeConfig, extendTheme } from "@chakra-ui/react"

const config: ThemeConfig = {
  initialColorMode: "dark",
  // useSystemColorMode: false,
}

const theme = extendTheme({ config }, {
  fonts: {
    heading: 'var(--font-rubik)',
    body: 'var(--font-rubik)',
  },
  colors: {
    brand: {
      100: "#f7fafc",
    },
  },
  styles: {
    global: () => {
      body: {
        bg: "whiteAlpha.200"
      }
    }
  }
})

export default theme;