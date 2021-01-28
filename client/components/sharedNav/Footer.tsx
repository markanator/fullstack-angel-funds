import {
  Box,
  Container,
  Flex,
  Heading,
  Link,
  List,
  ListItem,
  Text,
} from "@chakra-ui/react";
import { FiTwitter, FiSlack, FiGithub } from "react-icons/fi";
import { FaTwitch } from "react-icons/fa";
import ALink from "@/components/ALink";

export const Footer = () => {
  return (
    <Flex
      as="footer"
      w="100%"
      direction="column"
      textAlign="center"
      m="auto"
      bgColor="text_primary"
    >
      <Container
        maxW="7xl"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        // pt="4rem"
      >
        <Flex
          py="5rem"
          textColor="text_four"
          alignItems="start"
          textAlign="left"
          w="full"
        >
          <Box w="33%">
            <ALink href="/" mb="1.5rem">
              <Heading fontSize="2rem" fontWeight="500">
                VR Funding
              </Heading>
            </ALink>
          </Box>
          <Box w="33%" mt="1rem">
            <Heading fontSize="1.25rem" mb="1rem">
              Company
            </Heading>
            <List display="flex" flexDirection="column">
              <ListItem>
                <ALink href="/explore">Explore</ALink>
              </ListItem>
              <ListItem>
                <ALink href="/about">About</ALink>
              </ListItem>
              <ListItem>
                <ALink href="/contact">Contact</ALink>
              </ListItem>
              <ListItem>
                <ALink href="/#">Terms of Use</ALink>
              </ListItem>
              <ListItem>
                <ALink href="/#">Privacy Policy</ALink>
              </ListItem>
            </List>
          </Box>
          <Box w="33%" mt="1rem">
            <Heading fontSize="1.25rem">Find Us</Heading>
            <List
              mt={2}
              w="full"
              display="flex"
              flexDirection="row"
              // justifyContent="space-between"
              // fontSize="2xl"
              pr="2rem"
            >
              <ListItem fontSize="4xl" mr={3}>
                <Link href="https://www.twitch.tv/palante_mark" isExternal>
                  <FaTwitch />
                </Link>
              </ListItem>
              <ListItem fontSize="4xl" mr={3}>
                <Link href="https://twitter.com/_mark_ambro" isExternal>
                  <FiTwitter />
                </Link>
              </ListItem>
              <ListItem fontSize="4xl">
                <Link href="https://github.com/markanator" isExternal>
                  <FiGithub />
                </Link>
              </ListItem>
            </List>
          </Box>
        </Flex>
        <Text
          textColor="text_four"
          py="1.5rem"
          borderTop="2px solid var(--text_tertiary)"
          w="full"
        >
          Copyright © 2020 Mark Ambrocio. All rights reserved. | Made with{" "}
          <span role="img" aria-label="brains" title="brains">
            🧠
          </span>
          in Chicago,IL.
        </Text>
      </Container>
    </Flex>
  );
};
