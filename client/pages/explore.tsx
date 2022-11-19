import Banner from "@/components/authShared/AuthBanner";
import Layout from "@/components/Layout";
import ProjectCardLG from "@/components/ProjectCardLG";
import { useFetchAllProjectsQuery } from "@/generated/grahpql";
import { Flex, Heading, Text, Container } from "@chakra-ui/react";
import React from "react";

interface IExploreProps {
  projects?: any[] | null;
}

export default function Explore({ projects }: IExploreProps) {
  console.log("data", projects);
  const { data, error, loading } = useFetchAllProjectsQuery();

  if (loading) {
    return (
      <Layout SEO={{ title: "Loading... - Angel Funds" }}>
        <Heading as="h1">Loading...</Heading>
      </Layout>
    );
  }
  if (!loading && error) {
    return (
      <Layout>
        <Heading>Error loading content</Heading>
        <Text>
          There was an error loading the content...
          <br />
          {error?.message}
        </Text>
      </Layout>
    );
  }

  return (
    <Layout SEO={{ title: "Explore Projects - Angel Funds" }}>
      <Banner title="Explore" />
      <Flex w="full" h="full">
        <Container maxW="7xl" py="4rem">
          <Flex>
            {data &&
              data.projects.map((proj: any) => (
                <ProjectCardLG key={`project-${proj.id}`} project={proj} />
              ))}
          </Flex>
        </Container>
      </Flex>
    </Layout>
  );
}
