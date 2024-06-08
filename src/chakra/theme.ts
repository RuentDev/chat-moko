import { ThemeConfig, extendTheme, ComponentStyleConfig, defineStyleConfig } from "@chakra-ui/react"

const config: ThemeConfig = {
  initialColorMode: "dark",
}

const ContainerStyle = {
  // style object for base or default style
  baseStyle: {
    borderColor: "#2C3E61",
    borderWidth: 1,
    paddingTop: 2,
    paddingBottom: 2,
  },
  // styles for different sizes ("sm", "md", "lg")
  sizes: {},
  // styles for different visual variants ("outline", "solid")
  variants: {},
  // default values for 'size', 'variant' and 'colorScheme'
  defaultProps: {
    size: '',
    variant: '',
    colorScheme: '',
  },
}
const IconButtonStyle = {
  // style object for base or default style
  baseStyle: {},
  // styles for different sizes ("sm", "md", "lg")
  sizes: {},
  // styles for different visual variants ("outline", "solid")
  variants: {},
  // default values for 'size', 'variant' and 'colorScheme'
  defaultProps: {
    size: '',
    variant: 'outline',
    colorScheme: '',
  },
}

const theme = extendTheme({
  components: {
    Container: ContainerStyle,
    IconButton: IconButtonStyle
  },
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
     
    }
  },
})

export default theme;