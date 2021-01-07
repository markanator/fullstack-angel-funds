import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react'
import 'typeface-roboto';
import 'typeface-montserrat';
import 'typeface-dancing-script';
// locals
import theme from '../theme';
import "../styles/globals.css"

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <ColorModeProvider
        options={{
          useSystemColorMode: false,
        }}
      >
        <Component {...pageProps} />
      </ColorModeProvider>
    </ChakraProvider>
  )
}

export default MyApp
