import { useIsAuth } from "@/utils/useIsAuth";
import { useApolloClient } from "@apollo/client/react";
import { Box, Container, Flex, Heading, Link, List } from "@chakra-ui/react";
import { useFetchMeQuery, useLogoutMutation } from "generated/grahpql";
import { useRouter } from "next/router";
import React from "react";
import { isServer } from "utils/isServer";
import ALink from "../ALink";

interface INavbarProps {
  user: any | null;
}

export default function Navbar() {
  const router = useRouter();
  const { data } = useFetchMeQuery({
    skip: isServer(),
  });
  const [logout] = useLogoutMutation();
  const apolloClient = useApolloClient();

  const handleLogout = async () => {
    const res = await logout();
    if (res.data?.logout?.valueOf()) {
      await apolloClient.clearStore();
      router.push("/");
    }
  };

  // console.log("navbar props.user:: ", data);

  return (
    <Flex as="header" w="full" direction="column" boxShadow="md">
      {/* TOP */}
      <Flex
        direction="row"
        bgColor="color_primary"
        color="white"
        w="full"
        display={["none", "none", "block"]}
      >
        <Container
          maxW="7xl"
          display="flex"
          flexDirection="row"
          py=".5rem"
          fontSize=".875rem"
          color="white"
        >
          {/* LEFT */}
          <Flex w="50%" direction="row">
            <ALink href="mailto:hey@markambrocio.com" mr="2rem">
              contact@vrfunds.com
            </ALink>
            <ALink href="/#">123 Main St., Chicago, IL</ALink>
          </Flex>
          {/* RIGHT */}
          <Flex w="50%" justifyContent="flex-end" direction="row">
            {!!data?.me ? (
              <>
                <ALink href="/my-account" mr="2rem">
                  Dashboard
                </ALink>
                <Link onClick={handleLogout}>Logout</Link>
              </>
            ) : (
              <ALink href="/auth">Sign In or Register</ALink>
            )}

            <ALink href="/my-account/projects/create" ml="2rem">
              Add a Project
            </ALink>
          </Flex>
        </Container>
      </Flex>
      {/* NAVIGATION */}
      <Container as="nav" maxW="7xl" display="flex" flexDirection="row" py="1.5rem">
        <Box w="50%">
          <Box display="inline-block">
            <ALink color="text_primary" href="/">
              <Heading as="p" fontSize="20px" color="text_primary">
                Virtual Reality Funds
              </Heading>
            </ALink>
          </Box>
        </Box>
        <List.Root w="50%" display="inline-flex" justifyContent="flex-end">
          <List.Item mr="1rem" listStyleType="none">
            <ALink href="/" color="white">
              Home
            </ALink>
          </List.Item>
          <List.Item mr="1rem" listStyleType="none">
            <ALink href="/explore" color="white">
              Explore
            </ALink>
          </List.Item>
          <List.Item mr="1rem" listStyleType="none">
            <ALink href="/about" color="white">
              About
            </ALink>
          </List.Item>
          <List.Item listStyleType="none">
            <ALink href="/contact" color="white">
              Contact
            </ALink>
          </List.Item>
        </List.Root>
      </Container>
    </Flex>
  );
}
