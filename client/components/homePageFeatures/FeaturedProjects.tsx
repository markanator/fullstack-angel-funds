import {
  Container,
  Flex,
  Heading,
  List,
  ListItem,
  Text,
} from "@chakra-ui/react";
import React from "react";
import ProjectCardSM from "../ProjectCardSM";

export default function FeaturedProjects() {
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
            <ListItem m="auto" mb="1rem">
              <ProjectCardSM
                proj={{
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
            </ListItem>
            <ListItem m="auto" mb="1rem">
              <ProjectCardSM
                proj={{
                  category: "Tech",
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
            </ListItem>
            <ListItem m="auto" mb="1rem">
              <ProjectCardSM
                proj={{
                  category: "Medical",
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
            </ListItem>
          </List>
        </Flex>
      </Container>
    </Flex>
  );
}
