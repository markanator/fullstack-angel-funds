import { Container, Flex, List, ListItem } from "@chakra-ui/react";
import ProjectCardSM from "components/ProjectCardSM";
import {
  GetProjectsByUserIdQuery,
  ProjectResponseWAuthorFragment,
  useGetProjectsByUserIdQuery,
} from "generated/grahpql";
import React from "react";
import { useIsAuth } from "utils/useIsAuth";
import AuthBanner from "../../../components/authShared/AuthBanner";
import Layout from "../../../components/Layout";
import AccountNavbar from "../../../components/myAccountShared/AccountNavbar";

interface IProjectsProps {}

export default function Projects({}: IProjectsProps) {
  const { isLoggedIn, user } = useIsAuth();

  const { data, error } = useGetProjectsByUserIdQuery({
    variables: { id: user?.id ?? -1 },
    skip: !user?.id,
  });

  if (!isLoggedIn) {
    // no logged user, redirect
    return <Layout SEO={{ title: "Loading - Angel Funds" }}>Loading...</Layout>;
  }

  return (
    <Layout SEO={{ title: "My Projects - Angel Funds" }}>
      <AuthBanner bgImage="/images/breadcrumb.png" title="My Projects" />
      <Flex bgColor="white">
        <Container maxW="7xl" py="2rem">
          <AccountNavbar />
          <Flex direction="row" my="3rem">
            <List>
              {data?.getProjectsByUserID &&
                data?.getProjectsByUserID?.map(
                  (proj: ProjectResponseWAuthorFragment) => (
                    <ListItem key={proj?.id} m="auto" mb="1rem">
                      <ProjectCardSM proj={proj} />
                    </ListItem>
                  )
                )}
            </List>
          </Flex>
        </Container>
      </Flex>
    </Layout>
  );
}
