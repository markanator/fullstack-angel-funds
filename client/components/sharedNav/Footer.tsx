import ALink from "@/components/ALink";
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
import { FaLinkedin } from "react-icons/fa";
import { FiGithub, FiTwitter } from "react-icons/fi";

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
                Angel Funds
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
                <Link
                  href="https://www.linkedin.com/in/mark-ambrocio"
                  isExternal
                >
                  <FaLinkedin />
                </Link>
              </ListItem>
              <ListItem fontSize="4xl" mr={3}>
                <Link href="https://www.twitter.com/_mark_ambro" isExternal>
                  <FiTwitter />
                </Link>
              </ListItem>
              <ListItem fontSize="4xl">
                <Link href="https://www.github.com/markanator" isExternal>
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
          Copyright © 2020-{new Date().getFullYear()} Mark Ambrocio. All rights
          reserved. | Made with{" "}
          <span role="img" aria-label="brains" title="brains">
            🧠{" "}
          </span>
          in Chicago,IL.
        </Text>
      </Container>
    </Flex>
  );
};
