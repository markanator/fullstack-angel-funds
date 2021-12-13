import useFetchAllProjects from "@/Queries/useFetchAllProjects";
import { useIsAuth } from "@/Queries/useIsAuth";
import { Container, Flex, List, ListItem } from "@chakra-ui/react";
import ProjectCardSM from "components/ProjectCardSM";
import React from "react";
import AuthBanner from "../../components/authShared/AuthBanner";
import Layout from "../../components/Layout";
import AccountNavbar from "../../components/myAccountShared/AccountNavbar";

interface IProjectsProps {}

export default function Projects({}: IProjectsProps) {
  const {checksOut,authUserData} = useIsAuth()
  const {data: projects, isLoading: isFetchingProjects} = useFetchAllProjects({
    isOwner: authUserData?.data?.id},
    authUserData?.data?.id);

  if (authUserData && !isFetchingProjects) {
    return (
      <Layout SEO={{ title: "My Projects - VR Funds" }}>
        <AuthBanner bgImage="/images/breadcrumb.png" title="My Projects" />
        <Flex bgColor="gray.200">
          <Container maxW="7xl" py="2rem">
            <AccountNavbar />
            <Flex direction="row" my="3rem">
              <List display='flex' flexDirection='row' flexWrap='wrap'>
                {projects.map((proj) => (
                  <ListItem m="auto" mb="1rem" key={proj.id}>
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
