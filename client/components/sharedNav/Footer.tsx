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
import ALink from "components/ALink";

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
      >
        <Flex
          mt={12}
          textColor="text_four"
          mb={8}
          alignItems="start"
          textAlign="left"
          w="full"
        >
          <Box w="25%">
            <Link mb="1.5rem">
              <Heading fontSize="2rem" fontWeight="500">
                VR Funding
              </Heading>
            </Link>
          </Box>
          <Box w="25%" mt="1rem">
            <Heading fontSize="1.25rem" mb="1.5rem">
              Company
            </Heading>
            <List display="flex" flexDirection="column">
              <ListItem>
                <ALink href="/#">About</ALink>
              </ListItem>
              <ListItem>
                <ALink href="/#">Causes</ALink>
              </ListItem>
              <ListItem>
                <ALink href="/#">Blog</ALink>
              </ListItem>
              <ListItem>
                <ALink href="/#">Terms of Use</ALink>
              </ListItem>
              <ListItem>
                <ALink href="/#">Privacy Policy</ALink>
              </ListItem>
              <ListItem>
                <ALink href="/#">Sitemap</ALink>
              </ListItem>
            </List>
          </Box>
          <Box w="25%" mt="1rem">
            <Heading fontSize="1.25rem" mb={2}>
              Find Us
            </Heading>
            <List display="flex" flexDirection="row" fontSize="2xl">
              <ListItem mr={2}>
                <Link>
                  <FaTwitch />
                </Link>
              </ListItem>
              <ListItem mr={2}>
                <Link>
                  <FiTwitter />
                </Link>
              </ListItem>
              <ListItem mr={2}>
                <Link>
                  <FiSlack />
                </Link>
              </ListItem>
              <ListItem>
                <Link>
                  <FiGithub />
                </Link>
              </ListItem>
            </List>
          </Box>
          <Box w="25%" mt="1rem">
            <Heading fontSize="1.25rem" mb="1.5rem">
              Newsletter
            </Heading>
            <Text fontSize="sm">
              We respect your privacy and won't annoy you.
            </Text>
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
