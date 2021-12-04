import {
  Container,
  Flex,
  Heading,
  List,
  ListItem,
  Text
} from "@chakra-ui/react";
import { getAllProjects } from "async/projects";
import React from "react";
import { useQuery } from "react-query";
import ProjectCardSM from "../ProjectCardSM";

export default function FeaturedProjects() {
  const {isLoading, data} = useQuery('featuredProjects', () => getAllProjects())
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
            {
              data && data.slice(0,3).map((proj)=> (
                <ListItem m="auto" mb="1rem" key={proj.id}>
                  <ProjectCardSM proj={proj} />
                </ListItem>
              ))
            }
          </List>
        </Flex>
      </Container>
    </Flex>
  );
}
