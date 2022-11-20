import { Container, Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";
import ProjectCardLG from "../projectCards/ProjectCardLG";

export default function Explore() {
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
          >
            <ProjectCardLG
              project={{
                id: 1,
                slug: "test",
                title: "test",
                category: "Test",
                currentFunds: 123,
                fundTarget: 2000,
                image:
                  "https://images.unsplash.com/photo-1606787366608-8c9b7d14ad90?ixid=MXwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
                publishDate: "1611468000000",
                targetDate: "1611986400000",
              }}
            />
            <ProjectCardLG
              project={{
                id: 22,
                slug: "test",
                title: "test",
                category: "Test",
                currentFunds: 4567,
                fundTarget: 5000,
                image:
                  "https://images.unsplash.com/photo-1606787366608-8c9b7d14ad90?ixid=MXwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
                publishDate: "1611468000000",
                targetDate: "1611986400000",
              }}
            />
            <ProjectCardLG
              project={{
                id: 33,
                slug: "test",
                title: "test",
                category: "Test",
                currentFunds: 123,
                fundTarget: 2000,
                image:
                  "https://images.unsplash.com/photo-1606787366608-8c9b7d14ad90?ixid=MXwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
                publishDate: "1611468000000",
                targetDate: "1611986400000",
              }}
            />
            {/* <ProjectCardLG
              project={{
                id: 2,
                category: "Test",
                currentFunds: 123,
                fundTarget: 2000,
                image:
                  "https://images.unsplash.com/photo-1606787366608-8c9b7d14ad90?ixid=MXwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
                slug: "test",
                title: "test",
                publishDate: "1611468000000",
                targetDate: "1611986400000",
              }}
            />
            <ProjectCardLG
              project={{
                id: 3,
                category: "Test",
                currentFunds: 123,
                fundTarget: 2000,
                image:
                  "https://images.unsplash.com/photo-1606787366608-8c9b7d14ad90?ixid=MXwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
                slug: "test",
                title: "test",
                publishDate: "1611468000000",
                targetDate: "1611986400000",
              }}
            /> */}
          </Flex>
        </Flex>
      </Container>
    </Flex>
  );
}
