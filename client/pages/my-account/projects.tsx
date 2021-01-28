import { ApolloCache, ApolloClient, useApolloClient } from "@apollo/client";
import { Container, Flex, List, ListItem, Text } from "@chakra-ui/react";
import ProjectCardSM from "components/ProjectCardSM";
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
        <AuthBanner bgImage="/images/breadcrumb.png" title="My Projects" />
        <Flex bgColor="white">
          <Container maxW="7xl" py="2rem">
            <AccountNavbar />
            <Flex direction="row" my="3rem">
              <List>
                {data?.getProjectsByUserID.map((proj) => (
                  <ListItem m="auto" mb="1rem">
                    <ProjectCardSM proj={proj} />
                  </ListItem>
                ))}
              </List>
            </Flex>
          </Container>
        </Flex>
      </Layout>
    );
  }

  // no logged user, redirect
  return <Layout SEO={{ title: "Loading - VR Funds" }}>Loading...</Layout>;
}
