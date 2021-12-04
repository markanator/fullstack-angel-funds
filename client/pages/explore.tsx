import { getAllProjects } from "@/async/projects";
import Banner from "@/components/authShared/AuthBanner";
import Layout from "@/components/Layout";
import ProjectCardLG from "@/components/ProjectCardLG";
import { Flex, Heading, Text, Container } from "@chakra-ui/react";
import React from "react";
import { useQuery } from "react-query";
import { Project } from "../types";

interface IExploreProps {
  projects?: any[] | null;
}

export default function explore() {
  const { data, error, isLoading } = useQuery('exporeProjects', () => getAllProjects());

  if (isLoading) {
    return (
      <Layout SEO={{ title: "Loading... - VR Funds" }}>
        <Heading as="h1">Loading...</Heading>
      </Layout>
    );
  }
  if (!isLoading && error) {
    return (
      <Layout>
        <Heading>Error loading content</Heading>
        <Text>
          There was an error loading the content...
          <br />
          {(error as any)?.message}
        </Text>
      </Layout>
    );
  }

  console.table(data);

  return (
    <Layout SEO={{ title: "Explore Projects - VR Funds" }}>
      <Banner title="Explore" />
      <Flex w="full" h="full">
        <Container maxW="7xl" py="4rem">
          <Flex width='100%' flexWrap='wrap'>
            {
              data && data.map((proj) => (
                  <ProjectCardLG key={`project-${proj.id}`} project={proj} />
                )
              )
            }
          </Flex>
        </Container>
      </Flex>
    </Layout>
  );
}
