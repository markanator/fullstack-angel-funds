import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_BACKEND || "http://localhost:7777/graphql",
  cache: new InMemoryCache(),
  credentials: "include",
})