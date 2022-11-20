import { useFetchAllProjectsQuery } from "@/generated/grahpql";
import {
  Container,
  Flex,
  Heading,
  List,
  ListItem,
  Text,
} from "@chakra-ui/react";
import React from "react";
import ProjectCardSM from "../projectCards/ProjectCardSM";

export default function FeaturedProjects() {
  const { data, error } = useFetchAllProjectsQuery();
  if (error || !data?.projects) return null;
  return (
    <Flex as="section" w="full" pt="7rem" pb="5rem">
      <Container maxW="7xl">
        <Flex direction="column" justifyContent="center" alignItems="center">
          <Text
            textAlign="center"
            fontSize="1.125rem"
            color="color_alt"
            mb="1rem"
          >
            Projects You Can Back
          </Text>
          <Heading textAlign="center" fontSize="3rem" mb="3rem">
            Featured Projects
          </Heading>
          <List
            display="flex"
            w="full"
            justifyContent="space-between"
            flexDirection={["column", "column", "row"]}
            flexWrap="nowrap"
          >
            {data.projects.slice(0, 3).map((proj) => (
              <ListItem m="auto" mb="1rem" key={proj.id}>
                <ProjectCardSM proj={proj as any} />
              </ListItem>
            ))}
          </List>
        </Flex>
      </Container>
    </Flex>
  );
}
