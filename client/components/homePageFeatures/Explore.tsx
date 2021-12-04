import useFetchAllProjects from "@/Queries/useFetchAllProjects";
import { Container, Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";
import ProjectCardLG from "../ProjectCardLG";

export default function Explore() {
  const {isLoading, data} = useFetchAllProjects()
  return (
    <Flex as="section" py="6rem">
      <Container maxW="7xl">
        <Flex direction="column">
          <Text
            textAlign="center"
            fontSize="1.125rem"
            color="color_alt"
            mb="1rem"
          >
            Projects you can back
          </Text>
          <Heading textAlign="center" fontSize="3.5rem" mb="3rem">
            Explore Projects
          </Heading>
          <Flex
            w="full"
            flexDirection={["column", "column", "row"]}
            justifyContent={["space-between"]}
            alignItems="center"
          >
            {data && data.slice(0, 3).map((proj)=> (<ProjectCardLG key={proj.id} project={proj} />))}
          </Flex>
        </Flex>
      </Container>
    </Flex>
  );
}
