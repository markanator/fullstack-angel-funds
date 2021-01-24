import { ApolloCache, ApolloClient, useApolloClient } from "@apollo/client";
import { Container, Flex, Text } from "@chakra-ui/react";
import {
  FetchMeDocument,
  useGetProjectsByUserIdQuery,
} from "generated/grahpql";
import React from "react";
import { useIsAuth } from "utils/useIsAuth";
import AuthBanner from "../../components/authShared/AuthBanner";
import Layout from "../../components/Layout";
import AccountNavbar from "../../components/myAccountShared/AccountNavbar";

interface IProjectsProps {}

export default function projects({}: IProjectsProps) {
  const { checksOut } = useIsAuth();
  const apc = useApolloClient();

  const meCache = apc.cache.read<{ me: any }>({
    query: FetchMeDocument,
    optimistic: true,
  });

  const { data, error } = useGetProjectsByUserIdQuery({
    variables: { id: meCache?.me?.id },
  });

  // TODO map though and render to screen
  console.log("user's projects[]:::", data?.getProjectsByUserID);

  if (checksOut) {
    return (
      <Layout SEO={{ title: "My Projects - VR Funds" }}>
        <AuthBanner
          bgImage="https://gaviaspreview.com/wp/krowd/wp-content/uploads/2015/12/breadcrumb.jpg"
          title="My Projects"
        />
        <Container maxW="7xl" bgColor="gray.200" py="2rem">
          <AccountNavbar />
          <Flex direction="column" my="3rem">
            {data?.getProjectsByUserID.map((proj) => (
              <Flex>
                <Text>{JSON.stringify(proj, null, 2)}</Text>
              </Flex>
            ))}
          </Flex>
        </Container>
        USER projects
      </Layout>
    );
  }

  // no logged user, redirect
  return <Layout SEO={{ title: "Loading - VR Funds" }}>Loading...</Layout>;
}
