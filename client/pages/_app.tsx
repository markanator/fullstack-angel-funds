import { ApolloProvider } from "@apollo/client";
import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import "@splidejs/splide/dist/css/splide-core.min.css";
import "typeface-dancing-script";
import "typeface-montserrat";
import "typeface-roboto";
import "../styles/globals.css";
// locals
import theme from "../theme";
import { client } from "../utils/apolloClient";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider resetCSS theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </ApolloProvider>
  );
}

export default MyApp;
