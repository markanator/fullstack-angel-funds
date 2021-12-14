import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "typeface-dancing-script";
import "typeface-montserrat";
import "typeface-roboto";
import "../styles/globals.css";
// locals
import theme from "../theme";
const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider resetCSS theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
