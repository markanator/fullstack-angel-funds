import { ApolloProvider } from "@apollo/client";
import { ChakraProvider } from "@chakra-ui/react";
import "@splidejs/splide/dist/css/splide-core.min.css";
import { AppProps } from "next/app";
import "typeface-dancing-script";
import "typeface-montserrat";
import "typeface-roboto";
import { useApollo } from "utils/apolloClient";
import "../styles/globals.css";
// locals
import theme from "../theme";

function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps);

  return (
    <ApolloProvider client={apolloClient}>
      <ChakraProvider resetCSS theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </ApolloProvider>
  );
}

export default MyApp;
