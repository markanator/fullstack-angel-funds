import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react'
import 'typeface-roboto';
import 'typeface-montserrat';
import 'typeface-dancing-script';
import '@splidejs/splide/dist/css/splide-core.min.css';
// locals
import theme from '../theme';
import "../styles/globals.css"

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider resetCSS theme={theme}>
        <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
